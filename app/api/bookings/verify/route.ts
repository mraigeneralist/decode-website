import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { notifyOwner } from "@/lib/whatsapp";
import { OTP_MAX_ATTEMPTS } from "@/lib/constants";

export async function POST(req: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const { booking_id, otp } = body as { booking_id?: string; otp?: string };
  if (!booking_id || !otp) {
    return NextResponse.json({ error: "Missing booking_id or otp" }, { status: 400 });
  }

  const { data: appt, error } = await supabaseAdmin
    .from("appointments")
    .select("*")
    .eq("id", booking_id)
    .maybeSingle();
  if (error || !appt) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

  if (appt.status !== "pending_otp") {
    return NextResponse.json({ error: "Booking already confirmed or cancelled" }, { status: 409 });
  }
  if (appt.otp_expires_at && new Date(appt.otp_expires_at as string) < new Date()) {
    return NextResponse.json({ error: "OTP expired — please rebook" }, { status: 410 });
  }
  if ((appt.otp_attempts as number) >= OTP_MAX_ATTEMPTS) {
    return NextResponse.json({ error: "Too many attempts — please rebook" }, { status: 429 });
  }

  if (String(appt.otp_code) !== String(otp).trim()) {
    await supabaseAdmin
      .from("appointments")
      .update({ otp_attempts: (appt.otp_attempts as number) + 1 })
      .eq("id", booking_id);
    return NextResponse.json({ error: "Incorrect code" }, { status: 401 });
  }

  const year = new Date().getFullYear();
  const { count } = await supabaseAdmin
    .from("appointments")
    .select("id", { count: "exact", head: true })
    .gte("created_at", `${year}-01-01`)
    .in("status", ["confirmed", "completed", "cancelled", "no_show"]);
  const booking_ref = `DD-${year}-${String((count ?? 0) + 1).padStart(3, "0")}`;

  await supabaseAdmin
    .from("appointments")
    .update({
      status: "confirmed",
      confirmed_at: new Date().toISOString(),
      otp_code: null,
      booking_ref,
    })
    .eq("id", booking_id);

  await notifyOwner("new_booking", { ...appt, booking_ref, status: "confirmed" });

  return NextResponse.json({ ok: true, booking_ref });
}
