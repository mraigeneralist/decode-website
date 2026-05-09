"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Setting {
  key: string;
  value: unknown;
}

const KNOWN_KEYS = [
  { key: "business_name",     label: "Business name" },
  { key: "business_phone",    label: "Business phone" },
  { key: "business_email",    label: "Business email" },
  { key: "business_address",  label: "Business address" },
  { key: "max_bookings_per_phone_per_day", label: "Max bookings per phone per day" },
];

export default function SettingsPage() {
  const [rows, setRows] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => { reload(); }, []);

  async function reload() {
    if (!supabase) return;
    const { data } = await supabase.from("settings").select("*");
    const map: Record<string, string> = {};
    for (const k of KNOWN_KEYS) map[k.key] = "";
    for (const r of (data as unknown as Setting[]) || []) {
      map[r.key] = typeof r.value === "string" ? r.value : JSON.stringify(r.value);
    }
    setRows(map);
    setLoading(false);
  }

  async function save() {
    if (!supabase) return;
    setSaving(true);
    for (const k of KNOWN_KEYS) {
      const v = rows[k.key] ?? "";
      let parsed: unknown = v;
      const n = Number(v);
      if (v !== "" && !Number.isNaN(n) && /^\d+$/.test(v)) parsed = n;
      await supabase.from("settings").upsert({ key: k.key, value: parsed, updated_at: new Date().toISOString() });
    }
    setSaving(false);
  }

  if (loading) return <div className="text-[var(--muted)]">Loading...</div>;

  return (
    <div>
      <h1 className="display text-4xl mb-6">Settings.</h1>
      <p className="text-sm text-[var(--muted)] mb-8">
        Owner-tunable values. The bot reads <code>business_name</code> for greetings.
      </p>

      <div className="card p-6 max-w-2xl space-y-4">
        {KNOWN_KEYS.map((k) => (
          <div key={k.key}>
            <label>{k.label}</label>
            <input
              type="text"
              value={rows[k.key] ?? ""}
              onChange={(e) => setRows((p) => ({ ...p, [k.key]: e.target.value }))}
              className="w-full mt-1"
            />
          </div>
        ))}
        <button
          onClick={save}
          disabled={saving}
          className="btn-accent px-6 py-2.5 rounded-full text-sm font-semibold disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save settings"}
        </button>
      </div>
    </div>
  );
}
