import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollReveal from "@/components/ui/ScrollReveal";

const TILES = [
  { src: "/images/img-1.webp",  caption: "Orange custom build",       tag: "Detail" },
  { src: "/images/img-5.webp",  caption: "Maruti Swift — fresh out",  tag: "Polish" },
  { src: "/images/img-2.webp",  caption: "Tata Nexon — exterior",     tag: "Wash" },
  { src: "/images/img-4.webp",  caption: "Mahindra Thar",              tag: "Detail" },
  { src: "/images/img-3.webp",  caption: "Honda Amaze — paint pop",   tag: "Polish" },
  { src: "/images/img-8.webp",  caption: "Ducati Panigale",            tag: "Bike" },
  { src: "/images/img-9.webp",  caption: "Maruti Fronx",               tag: "Wash" },
  { src: "/images/img-6.webp",  caption: "Royal Enfield 650",          tag: "Bike" },
  { src: "/images/img-7.webp",  caption: "Pulsar pickup",              tag: "Bike" },
  { src: "/images/img-10.webp", caption: "Foam wash, in progress",     tag: "Wash" },
  { src: "/images/hero-image.webp", caption: "The studio",             tag: "Studio" },
];

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-[calc(var(--nav-h)+5rem)] pb-20 px-8 max-[640px]:px-5">
        <div className="max-w-[1240px] mx-auto">
          <header className="mb-14 max-w-3xl">
            <ScrollReveal>
              <p className="eyebrow mb-4">Studio Work</p>
            </ScrollReveal>
            <ScrollReveal delay={1}>
              <h1 className="display text-[clamp(2.8rem,8vw,7rem)]">Gallery.</h1>
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <p className="mt-5 text-[var(--muted-2)] leading-[1.8] text-[0.95rem]">
                Cars and bikes that came through the studio recently. Cars, SUVs, daily-drivers,
                weekend bikes, the occasional Ducati. Every job gets the same calm process.
              </p>
            </ScrollReveal>
          </header>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-[var(--border)]">
            {TILES.map((tile, i) => (
              <ScrollReveal key={tile.src} delay={(i % 4) as 0 | 1 | 2 | 3} className="h-full">
                <div className="aspect-square bg-[var(--bg-card)] relative overflow-hidden group">
                  <Image
                    src={tile.src}
                    alt={tile.caption}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(4,4,4,0.92) 0%, rgba(4,4,4,0.45) 45%, transparent 70%)",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="text-[0.6rem] uppercase tracking-[0.22em] text-[var(--accent-bright)] mb-1 font-semibold">
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
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-12 text-center text-[var(--muted)] text-[0.85rem]">
            More on{" "}
            <a
              href="https://instagram.com/decodedetailingstudio"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--accent-bright)] hover:text-[var(--accent)] transition-colors"
            >
              @decodedetailingstudio
            </a>
            .
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
