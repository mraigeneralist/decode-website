import ScrollReveal from "@/components/ui/ScrollReveal";

const FEATURES = [
  {
    n: "01",
    title: "Pro-grade products",
    body: "Genuine 9H ceramic coatings, TPU paint protection film, pH-neutral foam shampoos. No bargain-bin chemistry.",
  },
  {
    n: "02",
    title: "Real paint correction",
    body: "Multi-stage machine polish on a calibrated DA polisher. Swirl marks, holograms, oxidation — gone.",
  },
  {
    n: "03",
    title: "By appointment, one car at a time",
    body: "No waiting room chaos. Drop off, get a slot, get notified when the work is ready.",
  },
  {
    n: "04",
    title: "Transparent pricing",
    body: "Per-vehicle pricing posted up front. Quote before work begins. No surprise add-ons.",
  },
];

export default function WhyDecode() {
  return (
    <section className="py-24 max-[640px]:py-16 px-8 max-[640px]:px-5 border-t border-[var(--border)]">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-12 gap-14 items-start">
        <div className="md:col-span-5">
          <ScrollReveal>
            <p className="eyebrow mb-4">Why Decode</p>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <h2 className="display text-[clamp(2.4rem,5.5vw,4.2rem)]">
              Detailing,<br />done right.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <p className="mt-6 text-[var(--muted-2)] leading-[1.8] text-[0.95rem]">
              We don't rush. We don't use kitchen-sink chemistry. We don't pretend a wax pass is a coating.
              Drop your car off and pick it up actually fixed.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={3}>
            <div className="mt-10 flex items-center gap-4 text-[0.7rem] uppercase tracking-[0.18em] text-[var(--muted)]">
              <span className="w-12 h-px bg-[var(--accent)]" />
              <span>Studio philosophy</span>
            </div>
          </ScrollReveal>
        </div>

        <div className="md:col-span-7 grid sm:grid-cols-2 gap-px bg-[var(--border)]">
          {FEATURES.map((f, i) => (
            <ScrollReveal key={f.title} delay={(i % 2 === 0 ? 1 : 2) as 1 | 2}>
              <div className="group h-full bg-[var(--bg-card)] p-8 max-[640px]:p-6 relative overflow-hidden hover:bg-[var(--bg-float)] transition-colors duration-300">
                <div className="display text-[2.4rem] text-[var(--accent-bright)] leading-none mb-4">
                  {f.n}
                </div>
                <h3 className="text-[1rem] font-semibold tracking-[-0.005em] mb-2">
                  {f.title}
                </h3>
                <p className="text-[0.85rem] text-[var(--muted-2)] leading-[1.7]">
                  {f.body}
                </p>
                <span className="bracket-tl" />
                <span className="bracket-br" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
