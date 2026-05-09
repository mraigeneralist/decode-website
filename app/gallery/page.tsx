import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const PLACEHOLDER_TILES = Array.from({ length: 12 }, (_, i) => i + 1);

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-[calc(var(--nav-h)+5rem)] pb-20 px-8 max-[640px]:px-5">
        <div className="max-w-[1240px] mx-auto">
          <header className="mb-14 max-w-3xl">
            <p className="eyebrow mb-4">Studio Work</p>
            <h1 className="display text-[clamp(2.8rem,8vw,7rem)]">Gallery.</h1>
            <p className="mt-5 text-[var(--muted-2)] leading-[1.8] text-[0.95rem]">
              Recent jobs. Drop images into <code className="text-[var(--accent-bright)]">public/gallery/</code> and update this page to surface them.
            </p>
          </header>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-[var(--border)]">
            {PLACEHOLDER_TILES.map((i) => (
              <div
                key={i}
                className="aspect-square bg-[var(--bg-card)] relative overflow-hidden group"
              >
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(${135 + i * 11}deg, var(--bg-card) 0%, var(--bg-float) 50%, var(--bg-elevated) 100%)`,
                  }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(200,48,46,0.18) 0%, transparent 60%)",
                  }}
                />
                <div className="absolute inset-0 flex items-end p-5">
                  <div className="display text-[1.6rem] text-[var(--muted)]">{String(i).padStart(2, "0")}</div>
                </div>
                <div
                  className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--accent-bright)" }}
                />
                <span className="bracket-tl" />
                <span className="bracket-br" />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
