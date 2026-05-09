"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { formatTime } from "@/lib/constants";

const STATUSES = ["all", "pending_otp", "confirmed", "completed", "cancelled", "no_show"] as const;

interface Appt {
  id: string;
  booking_ref: string | null;
  customer_name: string;
  customer_phone: string;
  service_name: string | null;
  vehicle_type: string;
  car_brand: string | null;
  car_model: string | null;
  appointment_date: string;
  appointment_time: string;
  status: string;
  source: string;
  price: number;
  created_at: string;
}

export default function AppointmentsPage() {
  const [filter, setFilter] = useState<typeof STATUSES[number]>("all");
  const [rows, setRows] = useState<Appt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) return;
    setLoading(true);
    let q = supabase.from("appointments").select("*").order("appointment_date", { ascending: false }).order("appointment_time", { ascending: false }).limit(200);
    if (filter !== "all") q = q.eq("status", filter);
    q.then(({ data }) => {
      setRows((data as unknown as Appt[]) || []);
      setLoading(false);
    });
  }, [filter]);

  async function updateStatus(id: string, status: string) {
    if (!supabase) return;
    const updates: Record<string, unknown> = { status };
    if (status === "confirmed") updates.confirmed_at = new Date().toISOString();
    await supabase.from("appointments").update(updates).eq("id", id);
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  return (
    <div>
      <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
        <h1 className="display text-4xl">Appointments.</h1>
        <div className="flex gap-1 overflow-x-auto">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap border ${
                filter === s
                  ? "border-[var(--accent)] text-[var(--accent)]"
                  : "border-[var(--border-mid)] text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-[var(--muted)]">Loading...</div>
      ) : rows.length === 0 ? (
        <div className="card p-8 text-[var(--muted)]">No appointments found.</div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[0.15em] text-[var(--muted)] border-b border-[var(--border)]">
                <th className="px-4 py-3">Ref</th>
                <th className="px-4 py-3">Date / Time</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Vehicle</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((a) => (
                <tr key={a.id} className="border-b border-[var(--border)] last:border-0 align-top">
                  <td className="px-4 py-3 text-[var(--accent)] whitespace-nowrap">{a.booking_ref || "—"}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div>{a.appointment_date}</div>
                    <div className="text-xs text-[var(--muted)]">{formatTime(a.appointment_time)}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div>{a.customer_name}</div>
                    <div className="text-xs text-[var(--muted)]">{a.customer_phone}</div>
                  </td>
                  <td className="px-4 py-3">{a.service_name}</td>
                  <td className="px-4 py-3 text-xs">
                    <div>{a.vehicle_type}</div>
                    {a.car_brand && (
                      <div className="text-[var(--muted)]">{a.car_brand} {a.car_model}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs uppercase tracking-[0.15em] text-[var(--muted)]">{a.source}</td>
                  <td className="px-4 py-3">
                    <StatusPill status={a.status} />
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">₹{Number(a.price).toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3">
                    <select
                      value={a.status}
                      onChange={(e) => updateStatus(a.id, e.target.value)}
                      className="text-xs"
                    >
                      <option value="pending_otp">Pending OTP</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="no_show">No Show</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { bg: string; fg: string }> = {
    pending_otp: { bg: "rgba(245,158,11,0.15)", fg: "var(--warning)" },
    confirmed:   { bg: "rgba(37,211,102,0.12)", fg: "var(--success)" },
    completed:   { bg: "var(--bg-float)",       fg: "var(--muted)" },
    cancelled:   { bg: "rgba(239,68,68,0.12)",  fg: "var(--destructive)" },
    no_show:     { bg: "rgba(239,68,68,0.12)",  fg: "var(--destructive)" },
  };
  const s = map[status] || map.completed;
  return (
    <span
      className="px-2 py-1 rounded text-[10px] uppercase tracking-[0.15em]"
      style={{ background: s.bg, color: s.fg }}
    >
      {status.replace("_", " ")}
    </span>
  );
}
