export const VEHICLE_TYPES = [
  { id: "hatchback", name: "Hatchback", desc: "Compact 2/4-door cars" },
  { id: "sedan",     name: "Sedan",     desc: "Standard 4-door saloons" },
  { id: "suv",       name: "SUV",       desc: "Compact and mid-size SUVs" },
  { id: "lengthy",   name: "Lengthy",   desc: "Full-size sedans, large SUVs, MPVs" },
] as const;

export const FALLBACK_TIME_SLOTS = [
  "10:00", "11:00", "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00", "18:00", "19:00",
] as const;

export const MAX_BOOKINGS_PER_PHONE_PER_DAY = 2;
export const OTP_TTL_MINUTES = 5;
export const OTP_MAX_ATTEMPTS = 3;

export const BUSINESS_NAME = "Decode Detailing Studio";
export const BUSINESS_TAGLINE = "Feel the real detailing";
export const OWNER_WHATSAPP_NUMBER = "+917200039437";
export const INSTAGRAM_URL = "https://instagram.com/decodedetailingstudio";

export function formatTime(slot: string): string {
  const [h, m] = slot.split(":").map(Number);
  const suffix = h < 12 ? "AM" : "PM";
  const display = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${display}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function formatPrice(rupees: number): string {
  if (!rupees) return "Quote on inspection";
  return `₹${rupees.toLocaleString("en-IN")}`;
}

export function formatPhoneIN(phone: string): string {
  const digits = (phone || "").replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return phone;
}

export function normalizePhoneIN(input: string): string | null {
  const digits = (input || "").replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return digits;
  if (digits.length === 13 && digits.startsWith("091")) return digits.slice(1);
  return null;
}
