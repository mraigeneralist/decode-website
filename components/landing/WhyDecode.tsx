const FEATURES = [
  {
    title: "Pro-grade products",
    body: "Genuine 9H ceramic coatings, TPU paint protection film, and pH-neutral foam shampoos — no bargain-bin chemistry.",
  },
  {
    title: "Real paint correction",
    body: "Multi-stage machine polish on a calibrated DA polisher. Swirl marks, holograms, and oxidation — gone.",
  },
  {
    title: "Calm, by-appointment service",
    body: "One car at a time. No waiting room chaos. Drop off, get a slot, get notified when it's ready.",
  },
  {
    title: "Transparent pricing",
    body: "Per-vehicle pricing on the website. No surprise add-ons. Quote before work begins.",
  },
];

export default function WhyDecode() {
  return (
    <section className="py-24 px-5 sm:px-8 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4">
            <div className="text-xs uppercase tracking-[0.3em] text-[var(--muted)] mb-3">
              <span className="inline-block w-8 h-px bg-[var(--accent)] mr-3 align-middle" />
              Why Decode
            </div>
            <h2 className="display text-[clamp(36px,6vw,72px)]">
              Detailing,<br />done right.
            </h2>
            <p className="mt-6 text-[var(--foreground)]/70 leading-relaxed">
              We don't rush. We don't use kitchen-sink chemistry. We don't pretend a wax pass is a coating.
            </p>
          </div>

          <div className="md:col-span-8 grid sm:grid-cols-2 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="card p-7">
                <div className="display text-2xl mb-3" style={{ color: "var(--accent)" }}>
                  {f.title}
                </div>
                <p className="text-sm text-[var(--foreground)]/75 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
