"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { VEHICLE_TYPES } from "@/lib/constants";
import type { Service, VehicleType } from "@/lib/types";

export default function ServicesAdmin() {
  const [rows, setRows] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => { reload(); }, []);

  async function reload() {
    if (!supabase) return;
    setLoading(true);
    const { data } = await supabase.from("services").select("*").order("sort_order", { ascending: true });
    setRows((data as unknown as Service[]) || []);
    setLoading(false);
  }

  async function save(s: Service) {
    if (!supabase) return;
    setSavingId(s.id);
    await supabase.from("services").update({
      name: s.name,
      description: s.description,
      prices: s.prices,
      active: s.active,
      sort_order: s.sort_order,
    }).eq("id", s.id);
    setSavingId(null);
  }

  function update(id: string, patch: Partial<Service>) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  function updatePrice(id: string, vt: VehicleType, value: number) {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, prices: { ...r.prices, [vt]: value } } : r,
      ),
    );
  }

  if (loading) return <div className="text-[var(--muted)]">Loading...</div>;

  return (
    <div>
      <h1 className="display text-4xl mb-6">Services.</h1>
      <p className="text-sm text-[var(--muted)] mb-8">
        Edit prices and visibility. Bot and website both read from this table.
      </p>

      <div className="space-y-5">
        {rows.map((s) => (
          <div key={s.id} className="card p-6">
            <div className="grid md:grid-cols-12 gap-4 mb-4">
              <div className="md:col-span-3">
                <label>Name</label>
                <input
                  type="text"
                  value={s.name}
                  onChange={(e) => update(s.id, { name: e.target.value })}
                  className="w-full mt-1"
                />
              </div>
              <div className="md:col-span-7">
                <label>Description</label>
                <input
                  type="text"
                  value={s.description}
                  onChange={(e) => update(s.id, { description: e.target.value })}
                  className="w-full mt-1"
                />
              </div>
              <div className="md:col-span-1">
                <label>Order</label>
                <input
                  type="number"
                  value={s.sort_order}
                  onChange={(e) => update(s.id, { sort_order: Number(e.target.value) })}
                  className="w-full mt-1"
                />
              </div>
              <div className="md:col-span-1 flex items-end">
                <label className="flex items-center gap-2 normal-case">
                  <input
                    type="checkbox"
                    checked={s.active}
                    onChange={(e) => update(s.id, { active: e.target.checked })}
                  />
                  <span>Active</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {VEHICLE_TYPES.map((vt) => (
                <div key={vt.id}>
                  <label>{vt.name}</label>
                  <input
                    type="number"
                    value={(s.prices as Record<string, number>)?.[vt.id] ?? 0}
                    onChange={(e) => updatePrice(s.id, vt.id as VehicleType, Number(e.target.value))}
                    className="w-full mt-1"
                  />
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => save(s)}
                disabled={savingId === s.id}
                className="btn-accent px-5 py-2 rounded-full text-sm font-semibold disabled:opacity-50"
              >
                {savingId === s.id ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
