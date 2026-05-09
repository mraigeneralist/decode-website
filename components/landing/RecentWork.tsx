import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

const TILES = [
  { src: "/images/img-5.webp", caption: "Maruti Swift", tag: "Polish" },
  { src: "/images/img-2.webp", caption: "Tata Nexon",   tag: "Detail" },
  { src: "/images/img-4.webp", caption: "Mahindra Thar", tag: "Detail" },
  { src: "/images/img-8.webp", caption: "Ducati Panigale", tag: "Bike" },
];

export default function RecentWork() {
  return (
    <section className="py-24 max-[640px]:py-16 px-8 max-[640px]:px-5 border-t border-[var(--border)]">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
          <div>
            <ScrollReveal>
              <p className="eyebrow mb-4">Studio Work</p>
            </ScrollReveal>
            <ScrollReveal delay={1}>
              <h2 className="display text-[clamp(2.4rem,6vw,4.4rem)]">Recent jobs.</h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={2}>
            <Link href="/gallery" className="btn-link">
              See full gallery →
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--border)]">
          {TILES.map((tile, i) => (
            <ScrollReveal key={tile.src} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <Link href="/gallery" className="block aspect-[4/5] bg-[var(--bg-card)] relative overflow-hidden group">
                <Image
                  src={tile.src}
                  alt={tile.caption}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(4,4,4,0.78) 0%, rgba(4,4,4,0.18) 50%, transparent 75%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="text-[0.58rem] uppercase tracking-[0.22em] text-[var(--accent-bright)] mb-1 font-bold">
                    {tile.tag}
                  </div>
                  <div className="text-[0.92rem] font-semibold">{tile.caption}</div>
                </div>
                <div
                  className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--accent-bright)" }}
                />
                <span className="bracket-tl" />
                <span className="bracket-br" />
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
