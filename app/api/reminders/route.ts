import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { sendWhatsAppText } from "@/lib/whatsapp";
import { formatTime } from "@/lib/constants";

const RECENT_BOOKING_GRACE_MIN = 15;

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  const expected = `Bearer ${process.env.CRON_SECRET || ""}`;
  if (process.env.CRON_SECRET && auth !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const now = new Date();
  const istNow = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const todayStr = istNow.toLocaleDateString("en-CA");

  const { data: bookings } = await supabaseAdmin
    .from("appointments")
    .select("*")
    .eq("appointment_date", todayStr)
    .eq("status", "confirmed");

  let sent = 0;
  for (const b of bookings || []) {
    const phone = String(b.customer_phone || "").replace(/\D/g, "");
    if (!phone) continue;
    const [h, m] = String(b.appointment_time).split(":").map(Number);
    const apptDt = new Date(istNow);
    apptDt.setHours(h, m, 0, 0);
    const minutesUntil = (apptDt.getTime() - istNow.getTime()) / 60_000;

    const confirmed = b.confirmed_at ? new Date(String(b.confirmed_at)) : null;
    const tooRecent = confirmed && (now.getTime() - confirmed.getTime()) / 60_000 < RECENT_BOOKING_GRACE_MIN;

    const tier = (() => {
      if (minutesUntil >= 50 && minutesUntil <= 65 && !b.reminder_1h_sent)  return "1h";
      if (minutesUntil >= 25 && minutesUntil <= 35 && !b.reminder_30m_sent) return "30m";
      if (minutesUntil >= 5  && minutesUntil <= 15 && !b.reminder_10m_sent) return "10m";
      return null;
    })();
    if (!tier) continue;

    const flag = `reminder_${tier}_sent`;
    if (tooRecent) {
      await supabaseAdmin.from("appointments").update({ [flag]: true }).eq("id", b.id);
      continue;
    }

    const label = tier === "1h" ? "1 hour" : tier === "30m" ? "30 minutes" : "10 minutes";
    await sendWhatsAppText(
      phone,
      `*Decode Detailing — Reminder*\n\n` +
      `Hi ${b.customer_name}, your appointment is in *${label}*.\n\n` +
      `Service: ${b.service_name}\n` +
      `Time: ${formatTime(String(b.appointment_time))}\n\n` +
      `See you soon.`,
    );
    await supabaseAdmin.from("appointments").update({ [flag]: true }).eq("id", b.id);
    sent += 1;
  }

  return NextResponse.json({ ok: true, checked: (bookings || []).length, sent });
}
