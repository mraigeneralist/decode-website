import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { FALLBACK_TIME_SLOTS } from "@/lib/constants";

function generateSlots(start: string, end: string, minutes: number): string[] {
  const out: string[] = [];
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  let cur = sh * 60 + sm;
  const stop = eh * 60 + em;
  while (cur + minutes <= stop) {
    const h = Math.floor(cur / 60);
    const m = cur % 60;
    out.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    cur += minutes;
  }
  return out;
}

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");
  if (!date) return NextResponse.json({ error: "Missing date" }, { status: 400 });

  if (!supabaseAdmin) {
    return NextResponse.json({ slots: [...FALLBACK_TIME_SLOTS], blocked: false });
  }

  const { data: blocked } = await supabaseAdmin
    .from("blocked_dates")
    .select("blocked_date")
    .eq("blocked_date", date)
    .maybeSingle();
  if (blocked) return NextResponse.json({ slots: [], blocked: true });

  const dow = new Date(`${date}T00:00:00+05:30`).getDay();
  const { data: avail } = await supabaseAdmin
    .from("availability")
    .select("*")
    .eq("day_of_week", dow)
    .eq("active", true)
    .maybeSingle();

  let slots: string[];
  if (avail) {
    slots = generateSlots(
      String(avail.start_time),
      String(avail.end_time),
      Number(avail.slot_minutes) || 60,
    );
  } else {
    slots = [...FALLBACK_TIME_SLOTS];
  }

  const { data: taken } = await supabaseAdmin
    .from("appointments")
    .select("appointment_time")
    .eq("appointment_date", date)
    .in("status", ["confirmed", "pending_otp"]);
  const takenSet = new Set((taken || []).map((r) => String(r.appointment_time)));
  const available = slots.filter((s) => !takenSet.has(s));

  return NextResponse.json({ slots: available, blocked: false });
}
