"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

interface AvailRow {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  slot_minutes: number;
  active: boolean;
}

interface Blocked {
  id: string;
  blocked_date: string;
  reason: string | null;
}

export default function AvailabilityPage() {
  const [avail, setAvail] = useState<AvailRow[]>([]);
  const [blocked, setBlocked] = useState<Blocked[]>([]);
  const [newBlockDate, setNewBlockDate] = useState("");
  const [newBlockReason, setNewBlockReason] = useState("");

  useEffect(() => { reload(); }, []);

  async function reload() {
    if (!supabase) return;
    const [a, b] = await Promise.all([
      supabase.from("availability").select("*").order("day_of_week", { ascending: true }),
      supabase.from("blocked_dates").select("*").order("blocked_date", { ascending: true }),
    ]);
    setAvail((a.data as unknown as AvailRow[]) || []);
    setBlocked((b.data as unknown as Blocked[]) || []);
  }

  async function saveAvail(row: AvailRow) {
    if (!supabase) return;
    await supabase.from("availability").update({
      start_time: row.start_time,
      end_time: row.end_time,
      slot_minutes: row.slot_minutes,
      active: row.active,
    }).eq("id", row.id);
  }

  async function addBlock() {
    if (!supabase || !newBlockDate) return;
    await supabase.from("blocked_dates").insert({
      blocked_date: newBlockDate,
      reason: newBlockReason || null,
    });
    setNewBlockDate("");
    setNewBlockReason("");
    reload();
  }

  async function removeBlock(id: string) {
    if (!supabase) return;
    await supabase.from("blocked_dates").delete().eq("id", id);
    reload();
  }

  function update(id: string, patch: Partial<AvailRow>) {
    setAvail((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  return (
    <div>
      <h1 className="display text-4xl mb-6">Availability.</h1>

      <h2 className="display text-2xl mb-4">Weekly schedule</h2>
      <div className="card overflow-x-auto mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-[0.15em] text-[var(--muted)] border-b border-[var(--border)]">
              <th className="px-4 py-3">Day</th>
              <th className="px-4 py-3">Open</th>
              <th className="px-4 py-3">Close</th>
              <th className="px-4 py-3">Slot (min)</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {avail.map((row) => (
              <tr key={row.id} className="border-b border-[var(--border)] last:border-0">
                <td className="px-4 py-3">{DAYS[row.day_of_week]}</td>
                <td className="px-4 py-3">
                  <input type="time" value={row.start_time}
                    onChange={(e) => update(row.id, { start_time: e.target.value })}
                    className="w-32" />
                </td>
                <td className="px-4 py-3">
                  <input type="time" value={row.end_time}
                    onChange={(e) => update(row.id, { end_time: e.target.value })}
                    className="w-32" />
                </td>
                <td className="px-4 py-3">
                  <input type="number" value={row.slot_minutes}
                    onChange={(e) => update(row.id, { slot_minutes: Number(e.target.value) })}
                    className="w-24" />
                </td>
                <td className="px-4 py-3">
                  <input type="checkbox" checked={row.active}
                    onChange={(e) => update(row.id, { active: e.target.checked })} />
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => saveAvail(row)} className="btn-accent px-4 py-1.5 rounded-full text-xs font-semibold">
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="display text-2xl mb-4">Blocked dates</h2>
      <div className="card p-5 mb-4 flex flex-wrap gap-3 items-end">
        <div>
          <label>Date</label>
          <input type="date" value={newBlockDate} onChange={(e) => setNewBlockDate(e.target.value)} className="mt-1 block" />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label>Reason (optional)</label>
          <input type="text" value={newBlockReason} onChange={(e) => setNewBlockReason(e.target.value)}
            placeholder="Holiday, training, etc." className="mt-1 w-full" />
        </div>
        <button onClick={addBlock} disabled={!newBlockDate}
          className="btn-accent px-5 py-2.5 rounded-full text-sm font-semibold disabled:opacity-50">
          Block date
        </button>
      </div>

      {blocked.length === 0 ? (
        <div className="text-[var(--muted)] text-sm">No blocked dates.</div>
      ) : (
        <div className="card divide-y divide-[var(--border)]">
          {blocked.map((b) => (
            <div key={b.id} className="px-5 py-3 flex justify-between items-center">
              <div>
                <div>{b.blocked_date}</div>
                {b.reason && <div className="text-xs text-[var(--muted)]">{b.reason}</div>}
              </div>
              <button onClick={() => removeBlock(b.id)} className="text-xs text-[var(--destructive)] hover:underline">
                Unblock
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
