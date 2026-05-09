"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { formatTime } from "@/lib/constants";

interface Stats {
  today: number;
  upcoming: number;
  pending: number;
  cancelled: number;
}

interface AppointmentRow {
  id: string;
  booking_ref: string | null;
  customer_name: string;
  customer_phone: string;
  service_name: string | null;
  appointment_time: string;
  status: string;
  source: string;
  price: number;
}

export default function AdminOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [today, setToday] = useState<AppointmentRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) return;
    const todayStr = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
    (async () => {
      const [a, b, c, d, e] = await Promise.all([
        supabase!.from("appointments").select("id", { count: "exact", head: true })
          .eq("appointment_date", todayStr).eq("status", "confirmed"),
        supabase!.from("appointments").select("id", { count: "exact", head: true })
          .gte("appointment_date", todayStr).eq("status", "confirmed"),
        supabase!.from("appointments").select("id", { count: "exact", head: true })
          .eq("status", "pending_otp"),
        supabase!.from("appointments").select("id", { count: "exact", head: true })
          .eq("appointment_date", todayStr).eq("status", "cancelled"),
        supabase!.from("appointments").select("*")
          .eq("appointment_date", todayStr).eq("status", "confirmed")
          .order("appointment_time", { ascending: true }),
      ]);
      setStats({
        today: a.count ?? 0,
        upcoming: b.count ?? 0,
        pending: c.count ?? 0,
        cancelled: d.count ?? 0,
      });
      setToday((e.data as unknown as AppointmentRow[]) ?? []);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="text-[var(--muted)]">Loading...</div>;

  return (
    <div>
      <h1 className="display text-4xl mb-6">Overview.</h1>

      <div className="grid sm:grid-cols-4 gap-4 mb-8">
        <Stat label="Today (confirmed)" value={stats?.today ?? 0} />
        <Stat label="Upcoming"          value={stats?.upcoming ?? 0} />
        <Stat label="Pending OTP"       value={stats?.pending ?? 0} accent />
        <Stat label="Cancelled today"   value={stats?.cancelled ?? 0} />
      </div>

      <h2 className="display text-2xl mb-4">Today's appointments</h2>
      {today.length === 0 ? (
        <div className="card p-8 text-[var(--muted)]">No confirmed appointments today.</div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[0.15em] text-[var(--muted)] border-b border-[var(--border)]">
                <th className="px-4 py-3">Ref</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {today.map((a) => (
                <tr key={a.id} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-4 py-3 text-[var(--accent)]">{a.booking_ref || "—"}</td>
                  <td className="px-4 py-3">{formatTime(a.appointment_time)}</td>
                  <td className="px-4 py-3">
                    <div>{a.customer_name}</div>
                    <div className="text-xs text-[var(--muted)]">{a.customer_phone}</div>
                  </td>
                  <td className="px-4 py-3">{a.service_name}</td>
                  <td className="px-4 py-3 text-xs uppercase tracking-[0.15em] text-[var(--muted)]">{a.source}</td>
                  <td className="px-4 py-3 text-right">₹{Number(a.price).toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="card p-5">
      <div className="text-xs uppercase tracking-[0.15em] text-[var(--muted)]">{label}</div>
      <div
        className="display text-4xl mt-2"
        style={accent ? { color: "var(--accent)" } : undefined}
      >
        {value}
      </div>
    </div>
  );
}
