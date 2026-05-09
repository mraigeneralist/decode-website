"use client";

import { useEffect, useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import type { Service, VehicleType } from "@/lib/types";
import { VEHICLE_TYPES, formatPrice, formatTime, normalizePhoneIN } from "@/lib/constants";
import { CAR_BRANDS, modelsForBrand, CAR_YEARS } from "@/lib/car-brands";

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const STEP_LABELS = [
  "Service",
  "Vehicle",
  "Car",
  "Date",
  "Time",
  "Details",
  "Confirm",
];

interface State {
  service: Service | null;
  vehicle_type: VehicleType | null;
  car_brand: string;
  car_model: string;
  car_year: string;
  date: Date | null;
  time: string;
  customer_name: string;
  customer_phone: string;
  email: string;
}

const EMPTY: State = {
  service: null,
  vehicle_type: null,
  car_brand: "",
  car_model: "",
  car_year: "",
  date: null,
  time: "",
  customer_name: "",
  customer_phone: "",
  email: "",
};

export default function BookingFlow({
  services,
  initialServiceId,
}: {
  services: Service[];
  initialServiceId?: string;
}) {
  const [step, setStep] = useState<Step>(0);
  const [state, setState] = useState<State>(() => {
    const initial = initialServiceId ? services.find((s) => s.id === initialServiceId) : null;
    return { ...EMPTY, service: initial || null };
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);
  const [otp, setOtp] = useState("");

  function go(n: Step) {
    setError(null);
    setStep(n);
  }

  if (confirmedRef) {
    return <Confirmed bookingRef={confirmedRef} state={state} />;
  }

  if (bookingId) {
    return (
      <OTPStep
        bookingId={bookingId}
        otp={otp}
        setOtp={setOtp}
        onConfirm={async () => {
          setSubmitting(true);
          setError(null);
          try {
            const res = await fetch("/api/bookings/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ booking_id: bookingId, otp }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Verification failed");
            setConfirmedRef(data.booking_ref);
          } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Verification failed");
          } finally {
            setSubmitting(false);
          }
        }}
        submitting={submitting}
        error={error}
      />
    );
  }

  return (
    <div>
      <Stepper step={step} />

      {step === 0 && (
        <StepWrap title="Pick a service">
          <div className="grid sm:grid-cols-2 gap-3">
            {services.map((s) => {
              const cheapest = Math.min(
                ...Object.values(s.prices || {}).filter((p) => Number(p) > 0).map(Number),
              );
              const active = state.service?.id === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setState((p) => ({ ...p, service: s }))}
                  className={`card p-5 text-left transition-colors ${
                    active ? "border-[var(--accent)]" : "hover:border-[var(--border-mid)]"
                  }`}
                >
                  <div className="display text-2xl mb-2">{s.name}</div>
                  <div className="text-xs text-[var(--muted)] mb-3 line-clamp-2">{s.description}</div>
                  <div className="text-sm" style={{ color: active ? "var(--accent)" : "var(--foreground)" }}>
                    {Number.isFinite(cheapest) ? `from ${formatPrice(cheapest)}` : "Quote on inspection"}
                  </div>
                </button>
              );
            })}
          </div>
          <Nav onNext={state.service ? () => go(1) : null} />
        </StepWrap>
      )}

      {step === 1 && (
        <StepWrap title="Vehicle category">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {VEHICLE_TYPES.map((vt) => {
              const price = (state.service?.prices as Record<string, number>)?.[vt.id];
              const active = state.vehicle_type === vt.id;
              return (
                <button
                  key={vt.id}
                  onClick={() => setState((p) => ({ ...p, vehicle_type: vt.id as VehicleType }))}
                  className={`card p-5 text-center transition-colors ${
                    active ? "border-[var(--accent)]" : "hover:border-[var(--border-mid)]"
                  }`}
                >
                  <div className="display text-xl">{vt.name}</div>
                  <div className="text-[10px] text-[var(--muted)] mt-1 uppercase tracking-[0.15em]">
                    {vt.desc}
                  </div>
                  <div className="text-sm mt-3" style={{ color: active ? "var(--accent)" : undefined }}>
                    {formatPrice(price ?? 0)}
                  </div>
                </button>
              );
            })}
          </div>
          <Nav onBack={() => go(0)} onNext={state.vehicle_type ? () => go(2) : null} />
        </StepWrap>
      )}

      {step === 2 && (
        <StepWrap title="Your car">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="mb-2">Brand</label>
              <select
                value={state.car_brand}
                onChange={(e) =>
                  setState((p) => ({ ...p, car_brand: e.target.value, car_model: "" }))
                }
              >
                <option value="">Select</option>
                {CAR_BRANDS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-2">Model</label>
              <select
                value={state.car_model}
                onChange={(e) => setState((p) => ({ ...p, car_model: e.target.value }))}
                disabled={!state.car_brand}
              >
                <option value="">Select</option>
                {state.car_brand && modelsForBrand(state.car_brand).map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-2">Year</label>
              <select
                value={state.car_year}
                onChange={(e) => setState((p) => ({ ...p, car_year: e.target.value }))}
              >
                <option value="">Select</option>
                {CAR_YEARS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
          <Nav
            onBack={() => go(1)}
            onNext={state.car_brand && state.car_model && state.car_year ? () => go(3) : null}
          />
        </StepWrap>
      )}

      {step === 3 && (
        <StepWrap title="Pick a date">
          <div className="card p-4 inline-block">
            <DayPicker
              mode="single"
              selected={state.date ?? undefined}
              onSelect={(d) => setState((p) => ({ ...p, date: d ?? null }))}
              disabled={{ before: new Date(new Date().setHours(0, 0, 0, 0)) }}
            />
          </div>
          <Nav onBack={() => go(2)} onNext={state.date ? () => go(4) : null} />
        </StepWrap>
      )}

      {step === 4 && (
        <TimeStep
          date={state.date!}
          selected={state.time}
          onSelect={(t) => setState((p) => ({ ...p, time: t }))}
          onBack={() => go(3)}
          onNext={() => go(5)}
        />
      )}

      {step === 5 && (
        <StepWrap title="Your details">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col sm:col-span-2">
              <label className="mb-2">Full name</label>
              <input
                type="text"
                value={state.customer_name}
                onChange={(e) => setState((p) => ({ ...p, customer_name: e.target.value }))}
                placeholder="Your name"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2">WhatsApp number</label>
              <input
                type="tel"
                value={state.customer_phone}
                onChange={(e) => setState((p) => ({ ...p, customer_phone: e.target.value }))}
                placeholder="+91 98xxx xxxxx"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2">Email (optional)</label>
              <input
                type="email"
                value={state.email}
                onChange={(e) => setState((p) => ({ ...p, email: e.target.value }))}
                placeholder="you@example.com"
              />
            </div>
          </div>
          <Nav
            onBack={() => go(4)}
            onNext={
              state.customer_name.trim() && normalizePhoneIN(state.customer_phone)
                ? () => go(6)
                : null
            }
          />
        </StepWrap>
      )}

      {step === 6 && (
        <StepWrap title="Confirm">
          <Summary state={state} />
          {error && (
            <div className="mt-4 p-4 rounded-lg border border-[var(--destructive)] text-[var(--destructive)] text-sm">
              {error}
            </div>
          )}
          <Nav
            onBack={() => go(5)}
            primaryLabel="Send WhatsApp OTP"
            onPrimary={async () => {
              setSubmitting(true);
              setError(null);
              try {
                const res = await fetch("/api/bookings", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    service_id: state.service!.id,
                    vehicle_type: state.vehicle_type,
                    car_brand: state.car_brand,
                    car_model: state.car_model,
                    car_year: Number(state.car_year),
                    appointment_date: state.date!.toISOString().slice(0, 10),
                    appointment_time: state.time,
                    customer_name: state.customer_name,
                    customer_phone: state.customer_phone,
                    email: state.email || null,
                  }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Could not start booking");
                setBookingId(data.booking_id);
              } catch (e: unknown) {
                setError(e instanceof Error ? e.message : "Could not start booking");
              } finally {
                setSubmitting(false);
              }
            }}
            primaryDisabled={submitting}
          />
        </StepWrap>
      )}
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <div className="mb-10 flex flex-wrap gap-2">
      {STEP_LABELS.map((label, i) => (
        <div
          key={label}
          className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] flex-1 min-w-0"
        >
          <span
            className="w-6 h-6 rounded-full border flex items-center justify-center font-semibold flex-shrink-0"
            style={{
              borderColor: i <= step ? "var(--accent)" : "var(--border-mid)",
              background: i < step ? "var(--accent)" : "transparent",
              color: i < step ? "#fff" : i === step ? "var(--accent)" : "var(--muted)",
            }}
          >
            {i + 1}
          </span>
          <span className="hidden sm:inline truncate" style={{
            color: i === step ? "var(--accent)" : i < step ? "var(--foreground)" : "var(--muted)",
          }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

function StepWrap({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="display text-3xl mb-6">{title}</h2>
      {children}
    </section>
  );
}

function Nav({
  onBack,
  onNext,
  onPrimary,
  primaryLabel,
  primaryDisabled,
}: {
  onBack?: () => void;
  onNext?: (() => void) | null;
  onPrimary?: () => void;
  primaryLabel?: string;
  primaryDisabled?: boolean;
}) {
  return (
    <div className="mt-8 flex justify-between">
      <button
        type="button"
        onClick={onBack}
        className="px-6 py-2.5 rounded-full border border-[var(--border-mid)] text-sm hover:border-[var(--foreground)] disabled:opacity-30"
        disabled={!onBack}
      >
        Back
      </button>
      <button
        type="button"
        onClick={onPrimary || (onNext as (() => void) | undefined)}
        className="btn-accent px-7 py-2.5 rounded-full text-sm font-semibold disabled:opacity-50"
        disabled={primaryDisabled || (!onPrimary && !onNext)}
      >
        {primaryLabel || "Continue"}
      </button>
    </div>
  );
}

function TimeStep({
  date,
  selected,
  onSelect,
  onBack,
  onNext,
}: {
  date: Date;
  selected: string;
  onSelect: (t: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const dateStr = useMemo(() => date.toISOString().slice(0, 10), [date]);
  const [slots, setSlots] = useState<string[] | null>(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    setSlots(null);
    fetch(`/api/availability?date=${dateStr}`)
      .then((r) => r.json())
      .then((d) => {
        setSlots(d.slots || []);
        setBlocked(!!d.blocked);
      })
      .catch(() => setSlots([]));
  }, [dateStr]);

  return (
    <StepWrap title="Pick a time">
      <div className="text-sm text-[var(--muted)] mb-4">
        {date.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
      </div>
      {slots === null && <div className="text-[var(--muted)] text-sm">Loading slots...</div>}
      {blocked && <div className="text-[var(--destructive)] text-sm">This date is blocked. Pick another.</div>}
      {slots && slots.length === 0 && !blocked && (
        <div className="text-[var(--muted)] text-sm">No slots available for this date.</div>
      )}
      {slots && slots.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {slots.map((slot) => (
            <button
              key={slot}
              onClick={() => onSelect(slot)}
              className={`card py-3 text-sm transition-colors ${
                selected === slot
                  ? "border-[var(--accent)] text-[var(--accent)]"
                  : "hover:border-[var(--border-mid)]"
              }`}
            >
              {formatTime(slot)}
            </button>
          ))}
        </div>
      )}
      <Nav onBack={onBack} onNext={selected ? onNext : null} />
    </StepWrap>
  );
}

function Summary({ state }: { state: State }) {
  const price = (state.service?.prices as Record<string, number>)?.[state.vehicle_type ?? ""];
  return (
    <dl className="card divide-y divide-[var(--border)] text-sm">
      <Row label="Service" value={state.service?.name ?? ""} />
      <Row label="Vehicle" value={VEHICLE_TYPES.find((v) => v.id === state.vehicle_type)?.name ?? ""} />
      <Row label="Car" value={`${state.car_brand} ${state.car_model} (${state.car_year})`} />
      <Row label="Date" value={state.date?.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) ?? ""} />
      <Row label="Time" value={formatTime(state.time)} />
      <Row label="Name" value={state.customer_name} />
      <Row label="Phone" value={state.customer_phone} />
      <Row label="Amount" value={formatPrice(price ?? 0)} highlight />
    </dl>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between gap-4 px-5 py-3.5">
      <dt className="text-[var(--muted)] uppercase tracking-[0.15em] text-[11px]">{label}</dt>
      <dd
        className={highlight ? "text-base font-semibold" : ""}
        style={highlight ? { color: "var(--accent)" } : undefined}
      >
        {value}
      </dd>
    </div>
  );
}

function OTPStep({
  bookingId,
  otp,
  setOtp,
  onConfirm,
  submitting,
  error,
}: {
  bookingId: string;
  otp: string;
  setOtp: (v: string) => void;
  onConfirm: () => void;
  submitting: boolean;
  error: string | null;
}) {
  return (
    <section>
      <h2 className="display text-3xl mb-3">Verify your number</h2>
      <p className="text-sm text-[var(--muted)] mb-6">
        We sent a 6-digit code to your WhatsApp. Enter it below to confirm. Code expires in 5 minutes.
      </p>
      <input
        type="text"
        inputMode="numeric"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
        placeholder="000000"
        className="text-center display text-3xl tracking-[0.4em] w-full"
      />
      {error && (
        <div className="mt-4 p-4 rounded-lg border border-[var(--destructive)] text-[var(--destructive)] text-sm">
          {error}
        </div>
      )}
      <button
        type="button"
        onClick={onConfirm}
        disabled={submitting || otp.length !== 6}
        className="btn-accent w-full mt-6 px-6 py-3.5 rounded-full text-sm font-semibold disabled:opacity-50"
      >
        {submitting ? "Verifying..." : "Confirm Booking"}
      </button>
      <div className="text-xs text-[var(--muted)] mt-3">Booking ID: {bookingId.slice(0, 8)}…</div>
    </section>
  );
}

function Confirmed({ bookingRef, state }: { bookingRef: string; state: State }) {
  return (
    <section className="text-center py-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
        style={{ background: "var(--accent-glow)", color: "var(--accent)", border: "1px solid var(--accent)" }}>
        ✓
      </div>
      <h2 className="display text-4xl sm:text-5xl mb-3">Booking confirmed.</h2>
      <p className="text-[var(--muted)] mb-6">
        Reference: <span style={{ color: "var(--accent)" }}>{bookingRef}</span>
      </p>
      <div className="card p-6 max-w-md mx-auto text-left text-sm space-y-2">
        <div className="flex justify-between">
          <span className="text-[var(--muted)]">Service</span>
          <span>{state.service?.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--muted)]">Date</span>
          <span>{state.date?.toLocaleDateString("en-IN")}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--muted)]">Time</span>
          <span>{formatTime(state.time)}</span>
        </div>
      </div>
      <p className="text-sm text-[var(--muted)] mt-8">
        We'll WhatsApp you a reminder before your slot.
      </p>
    </section>
  );
}
