import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Link from "next/link";

const PACKAGES = [
  {
    id: "essential",
    name: "Essential",
    tagline: "Daily-driver refresh",
    price: "from ₹2,899",
    includes: [
      "Foam exterior wash with pH-neutral shampoo",
      "Tire dressing + wheel cleaner",
      "Interior vacuum + dashboard wipe",
      "Door jamb cleaning",
    ],
  },
  {
    id: "shine",
    name: "Shine",
    tagline: "Deep clean + protection",
    price: "from ₹5,999",
    includes: [
      "Everything in Essential",
      "Clay bar treatment",
      "Liquid wax application",
      "Interior shampoo on seats",
      "Plastic dressing + UV protectant",
    ],
    featured: true,
  },
  {
    id: "concours",
    name: "Concours",
    tagline: "Show-finish detailing",
    price: "from ₹14,999",
    includes: [
      "Everything in Shine",
      "Multi-stage paint correction",
      "12-month sealant or 1-year coating",
      "Engine bay deep clean",
      "Headlight restoration if needed",
    ],
  },
];

export default function PackagesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-16 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-14 max-w-3xl">
            <div className="text-xs uppercase tracking-[0.3em] text-[var(--muted)] mb-3">
              <span className="inline-block w-8 h-px bg-[var(--accent)] mr-3 align-middle" />
              Bundled
            </div>
            <h1 className="display text-[clamp(48px,8vw,108px)]">Packages.</h1>
            <p className="mt-5 text-[var(--foreground)]/75">
              Pre-bundled service tiers. Pick one, save vs. à-la-carte. All prices vary by vehicle.
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-6">
            {PACKAGES.map((p) => (
              <article
                key={p.id}
                className={`card p-7 flex flex-col ${
                  p.featured ? "border-[var(--accent)]" : ""
                }`}
              >
                {p.featured && (
                  <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-3">
                    Most popular
                  </div>
                )}
                <div className="display text-4xl mb-2">{p.name}</div>
                <div className="text-sm text-[var(--muted)] mb-5">{p.tagline}</div>
                <div className="text-xl font-semibold mb-6">{p.price}</div>
                <ul className="space-y-2 text-sm text-[var(--foreground)]/85 flex-1 mb-7">
                  {p.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span style={{ color: "var(--accent)" }}>—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/book"
                  className={
                    p.featured
                      ? "btn-accent text-center px-6 py-3 rounded-full text-sm font-semibold"
                      : "text-center px-6 py-3 rounded-full border border-[var(--border-mid)] hover:border-[var(--accent)] text-sm font-semibold transition-colors"
                  }
                >
                  Book {p.name}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
