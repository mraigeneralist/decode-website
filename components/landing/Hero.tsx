import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center g-tex overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[520px] h-[520px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-16 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <div className="au1 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[var(--muted)] mb-6">
            <span className="w-8 h-px bg-[var(--accent)]" />
            Decode Detailing Studio
          </div>

          <h1 className="au2 display text-[clamp(48px,9vw,128px)] text-[var(--foreground)]">
            Feel the<br />
            <span style={{ color: "var(--accent)" }}>Real</span> Detailing.
          </h1>

          <p className="au3 mt-6 text-lg max-w-xl text-[var(--foreground)]/80 leading-relaxed">
            Pro-grade ceramic coating, paint protection film, and machine-polish detailing —
            for owners who actually care what's under the swirl marks.
          </p>

          <div className="au4 mt-10 flex flex-wrap gap-4">
            <Link
              href="/book"
              className="btn-accent px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide"
            >
              Book a Slot
            </Link>
            <Link
              href="/services"
              className="px-7 py-3.5 rounded-full border border-[var(--border-mid)] text-sm font-semibold hover:border-[var(--accent)] transition-colors"
            >
              View Services
            </Link>
          </div>

          <div className="au4 mt-12 flex flex-wrap gap-x-10 gap-y-4 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
            <span>9H Ceramic</span>
            <span>·</span>
            <span>TPU PPF</span>
            <span>·</span>
            <span>Paint Correction</span>
            <span>·</span>
            <span>IRR Sun Film</span>
          </div>
        </div>

        <div className="md:col-span-5 hidden md:flex justify-end">
          <div className="relative w-full aspect-square max-w-md">
            <div
              className="absolute inset-0 rounded-3xl border border-[var(--border-mid)]"
              style={{ background: "linear-gradient(140deg, var(--bg-float) 0%, var(--bg-card) 100%)" }}
            />
            <div className="absolute top-6 left-6 right-6 h-px bg-[var(--accent)]" />
            <div className="absolute bottom-6 left-6 right-6 h-px bg-[var(--accent)]" />
            <div className="absolute inset-6 flex flex-col justify-between p-6">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Open Now</div>
                <div className="display text-5xl mt-3">10–8</div>
                <div className="text-sm text-[var(--muted)] mt-2">Mon–Sun · By appointment</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted)]">Ceramic Coating</span>
                  <span>from ₹18,999</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted)]">Full Detailing</span>
                  <span>from ₹5,999</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted)]">Sun Film</span>
                  <span>from ₹4,999</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
