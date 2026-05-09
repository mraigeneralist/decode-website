const WA_API_BASE = "https://graph.facebook.com/v19.0";

function token() {
  return process.env.WHATSAPP_ACCESS_TOKEN || "";
}
function phoneNumberId() {
  return process.env.WHATSAPP_PHONE_NUMBER_ID || "";
}

async function postWhatsApp(payload: Record<string, unknown>): Promise<void> {
  const t = token();
  const id = phoneNumberId();
  if (!t || !id) {
    console.warn("[whatsapp] credentials missing — skipping send");
    return;
  }
  const res = await fetch(`${WA_API_BASE}/${id}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${t}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const txt = await res.text();
    console.error("[whatsapp] send failed", res.status, txt);
  }
}

export async function sendWhatsAppText(to: string, body: string): Promise<void> {
  await postWhatsApp({
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: { body },
  });
}

export async function sendOTP(to: string, code: string): Promise<void> {
  const body =
    `*Decode Detailing — Booking Verification*\n\n` +
    `Your verification code is *${code}*.\n\n` +
    `Enter this on the website to confirm your booking. ` +
    `The code expires in 5 minutes.`;
  await sendWhatsAppText(to, body);
}

export async function notifyOwner(event: string, data: Record<string, unknown>): Promise<void> {
  const owner = process.env.OWNER_WHATSAPP_NUMBER?.replace(/\D/g, "") || "";
  if (!owner) return;

  let body: string;
  if (event === "new_booking") {
    body =
      `*New Booking — Decode Detailing*\n\n` +
      `Ref: ${data.booking_ref || data.id}\n` +
      `Customer: ${data.customer_name}\n` +
      `Phone: ${data.customer_phone}\n` +
      `Service: ${data.service_name}\n` +
      `Vehicle: ${data.vehicle_type}` +
      (data.car_brand ? ` — ${data.car_brand} ${data.car_model || ""}` : "") +
      `\nDate: ${data.appointment_date}\nTime: ${data.appointment_time}\n` +
      `Amount: ₹${Number(data.price || 0).toLocaleString("en-IN")}\n` +
      `Source: ${data.source}`;
  } else {
    body = `*${event}*\n\n${JSON.stringify(data, null, 2)}`;
  }
  await sendWhatsAppText(owner, body);
}

export function generateOTP(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}
