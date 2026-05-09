export type VehicleType = "hatchback" | "sedan" | "suv" | "lengthy";

export type AppointmentStatus =
  | "pending_otp"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no_show";

export type AppointmentSource =
  | "WEBSITE"
  | "WHATSAPP"
  | "TELEGRAM"
  | "PHONE"
  | "MANUAL";

export interface Service {
  id: string;
  name: string;
  description: string;
  prices: Record<VehicleType, number>;
  active: boolean;
  sort_order: number;
}

export interface Appointment {
  id: string;
  booking_ref: string | null;
  service_id: string | null;
  service_name: string | null;
  customer_name: string;
  customer_phone: string;
  email: string | null;
  vehicle_type: VehicleType;
  car_brand: string | null;
  car_model: string | null;
  car_year: number | null;
  price: number;
  appointment_date: string;
  appointment_time: string;
  status: AppointmentStatus;
  source: AppointmentSource;
  otp_code: string | null;
  otp_expires_at: string | null;
  otp_attempts: number;
  notes: string | null;
  reminder_1h_sent: boolean;
  reminder_30m_sent: boolean;
  reminder_10m_sent: boolean;
  confirmed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AvailabilityRow {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  slot_minutes: number;
  active: boolean;
}

export interface BlockedDate {
  id: string;
  blocked_date: string;
  reason: string | null;
}
