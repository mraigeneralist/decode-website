import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const PLACEHOLDER_TILES = Array.from({ length: 12 }, (_, i) => i + 1);

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-16 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-14 max-w-3xl">
            <div className="text-xs uppercase tracking-[0.3em] text-[var(--muted)] mb-3">
              <span className="inline-block w-8 h-px bg-[var(--accent)] mr-3 align-middle" />
              Studio work
            </div>
            <h1 className="display text-[clamp(48px,8vw,108px)]">Gallery.</h1>
            <p className="mt-5 text-[var(--foreground)]/75">
              Recent jobs. Drop images into <code>public/gallery/</code> and update this page to surface them.
            </p>
          </header>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {PLACEHOLDER_TILES.map((i) => (
              <div
                key={i}
                className="aspect-square card-float relative overflow-hidden group"
              >
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{
                    background: `linear-gradient(${135 + i * 11}deg, var(--bg-card) 0%, var(--bg-float) 50%, var(--background) 100%)`,
                  }}
                />
                <div className="absolute inset-0 flex items-end p-4">
                  <div className="display text-2xl text-[var(--muted)]">{String(i).padStart(2, "0")}</div>
                </div>
                <div
                  className="absolute top-3 right-3 w-2 h-2 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
