import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-[calc(var(--nav-h)+5rem)] pb-20 px-8 max-[640px]:px-5">
        <div className="max-w-[1240px] mx-auto">
          <ScrollReveal>
            <p className="eyebrow mb-4">About</p>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <h1 className="display text-[clamp(3rem,9vw,8rem)] mb-12">
              <span className="block">Decode Detailing.</span>
              <span
                className="block text-transparent"
                style={{ WebkitTextStroke: "2px rgba(226,60,58,0.98)" }}
              >
                Built for cars.
              </span>
            </h1>
          </ScrollReveal>

          <div className="grid md:grid-cols-12 gap-12 max-w-[1100px]">
            <div className="md:col-span-7 space-y-6 text-[0.96rem] leading-[1.85] text-[var(--muted-2)]">
              <ScrollReveal delay={2}>
                <p>
                  Decode Detailing Studio is a specialist car care studio. We don't run a service centre.
                  We don't sell tyres. We work on one car at a time, by appointment, with the products and
                  process the job actually needs.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={3}>
                <p>
                  Our work splits into three lanes: paint correction & coating (machine polish, ceramic, PPF),
                  interior restoration (deep extraction, leather conditioning, plastic re-blacking), and routine
                  refresh (foam wash, wax, sun film). Pricing is per-vehicle and posted up front.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={4}>
                <p>
                  <strong style={{ color: "var(--foreground)" }}>Feel the real detailing.</strong>{" "}
                  That's our promise — not a wax pass dressed up as a coating, not a kitchen-sink chemical mix
                  passed off as restoration. Every job gets a clear scope, a real quote, and the products we'd
                  use on our own cars.
                </p>
              </ScrollReveal>
            </div>

            <div className="md:col-span-5">
              <ScrollReveal delay={2}>
                <div className="grid grid-cols-2 gap-px bg-[var(--border)]">
                  <Stat n="1" label="Car at a time" />
                  <Stat n="9H" label="Ceramic grade" />
                  <Stat n="3yr" label="Coating warranty" />
                  <Stat n="0" label="Hidden charges" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        <div className="mt-24 max-w-[1240px] mx-auto">
          <ScrollReveal>
            <p className="eyebrow mb-4">Inside the Studio</p>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <h2 className="display text-[clamp(2.2rem,5vw,3.6rem)] mb-8">A space built for paint.</h2>
          </ScrollReveal>

          <div className="grid grid-cols-12 gap-px bg-[var(--border)]">
            <ScrollReveal className="col-span-12 md:col-span-8">
              <div className="relative aspect-[16/10] bg-[var(--bg-card)] overflow-hidden">
                <Image
                  src="/images/hero-image.webp"
                  alt="Decode Detailing studio interior, LED ceiling and brand wall"
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={1} className="col-span-12 md:col-span-4">
              <div className="relative aspect-[16/10] md:aspect-auto md:h-full bg-[var(--bg-card)] overflow-hidden">
                <Image
                  src="/images/img-2.webp"
                  alt="Tata Nexon under studio lights"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={1} className="col-span-6 md:col-span-4">
              <div className="relative aspect-square bg-[var(--bg-card)] overflow-hidden">
                <Image
                  src="/images/img-3.webp"
                  alt="Honda Amaze polish reflection"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={2} className="col-span-6 md:col-span-4">
              <div className="relative aspect-square bg-[var(--bg-card)] overflow-hidden">
                <Image
                  src="/images/img-4.webp"
                  alt="Mahindra Thar in the bay"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={3} className="col-span-12 md:col-span-4">
              <div className="relative aspect-square bg-[var(--bg-card)] overflow-hidden">
                <Image
                  src="/images/img-5.webp"
                  alt="Maruti Swift, finished"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="bg-[var(--bg-card)] p-7 group hover:bg-[var(--bg-float)] transition-colors duration-300 relative overflow-hidden">
      <div className="display text-[3rem] leading-none mb-2" style={{ color: "var(--accent-bright)" }}>
        {n}
      </div>
      <div className="text-[0.65rem] uppercase tracking-[0.18em] text-[var(--muted)]">{label}</div>
      <span className="bracket-tl" />
      <span className="bracket-br" />
    </div>
  );
}
