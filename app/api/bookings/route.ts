import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { sendOTP, generateOTP } from "@/lib/whatsapp";
import { normalizePhoneIN, OTP_TTL_MINUTES, MAX_BOOKINGS_PER_PHONE_PER_DAY } from "@/lib/constants";

export async function POST(req: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const {
    service_id,
    vehicle_type,
    car_brand,
    car_model,
    car_year,
    appointment_date,
    appointment_time,
    customer_name,
    customer_phone,
    email,
  } = body as Record<string, string | number>;

  if (
    !service_id || !vehicle_type || !appointment_date || !appointment_time ||
    !customer_name || !customer_phone
  ) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const phone = normalizePhoneIN(String(customer_phone));
  if (!phone) {
    return NextResponse.json({ error: "Invalid Indian phone number" }, { status: 400 });
  }

  const { data: service, error: svcErr } = await supabaseAdmin
    .from("services")
    .select("id, name, prices, active")
    .eq("id", service_id)
    .maybeSingle();
  if (svcErr || !service || !service.active) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 400 });
  }
  const price = (service.prices as Record<string, number>)?.[String(vehicle_type)] ?? 0;

  const { count } = await supabaseAdmin
    .from("appointments")
    .select("id", { count: "exact", head: true })
    .eq("customer_phone", phone)
    .eq("appointment_date", String(appointment_date))
    .in("status", ["pending_otp", "confirmed"]);
  if ((count ?? 0) >= MAX_BOOKINGS_PER_PHONE_PER_DAY) {
    return NextResponse.json(
      { error: "You already have the maximum bookings for this date" },
      { status: 409 },
    );
  }

  const { count: slotTaken } = await supabaseAdmin
    .from("appointments")
    .select("id", { count: "exact", head: true })
    .eq("appointment_date", String(appointment_date))
    .eq("appointment_time", String(appointment_time))
    .eq("status", "confirmed");
  if ((slotTaken ?? 0) > 0) {
    return NextResponse.json({ error: "Slot just got taken — please pick another time" }, { status: 409 });
  }

  const otp = generateOTP();
  const otp_expires_at = new Date(Date.now() + OTP_TTL_MINUTES * 60_000).toISOString();

  const { data: appt, error: insErr } = await supabaseAdmin
    .from("appointments")
    .insert({
      service_id,
      service_name: service.name,
      customer_name: String(customer_name).trim(),
      customer_phone: phone,
      email: email ? String(email).trim() : null,
      vehicle_type,
      car_brand: car_brand || null,
      car_model: car_model || null,
      car_year: car_year ? Number(car_year) : null,
      price,
      appointment_date,
      appointment_time,
      status: "pending_otp",
      source: "WEBSITE",
      otp_code: otp,
      otp_expires_at,
      otp_attempts: 0,
    })
    .select("id")
    .single();

  if (insErr || !appt) {
    return NextResponse.json({ error: insErr?.message || "Could not create booking" }, { status: 500 });
  }

  await sendOTP(phone, otp);

  return NextResponse.json({ booking_id: appt.id, ttl_minutes: OTP_TTL_MINUTES });
}
