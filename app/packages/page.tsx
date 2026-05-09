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
      <main className="flex-1 pt-[calc(var(--nav-h)+5rem)] pb-20 px-8 max-[640px]:px-5">
        <div className="max-w-[1240px] mx-auto">
          <header className="mb-14 max-w-3xl">
            <p className="eyebrow mb-4">Bundled</p>
            <h1 className="display text-[clamp(2.8rem,8vw,7rem)]">Packages.</h1>
            <p className="mt-5 text-[var(--muted-2)] leading-[1.8] text-[0.95rem]">
              Pre-bundled tiers. Pick one, save vs. à-la-carte. All prices vary by vehicle.
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-px bg-[var(--border)]">
            {PACKAGES.map((p, i) => (
              <article
                key={p.id}
                className={`group bg-[var(--bg-card)] p-8 max-[640px]:p-6 relative overflow-hidden flex flex-col hover:bg-[var(--bg-float)] transition-colors duration-300 ${
                  p.featured ? "border-l-2 border-l-[var(--accent)]" : ""
                }`}
              >
                {p.featured && (
                  <div className="text-[0.58rem] font-bold tracking-[0.18em] uppercase text-white bg-[var(--accent)] inline-block px-2 py-1 rounded-[2px] mb-5 self-start">
                    Most popular
                  </div>
                )}
                <div className="text-[0.62rem] tracking-[0.22em] uppercase text-[var(--muted)] mb-2">
                  Tier {String(i + 1).padStart(2, "0")}
                </div>
                <div className="display text-[3rem] leading-none mb-2">{p.name}</div>
                <div className="text-[0.85rem] text-[var(--muted-2)] mb-6">{p.tagline}</div>
                <div className="display text-[1.4rem] mb-7" style={{ color: "var(--accent-bright)" }}>
                  {p.price}
                </div>
                <ul className="space-y-3 text-[0.88rem] text-[var(--muted-2)] flex-1 mb-8 leading-[1.6]">
                  {p.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-[var(--accent-bright)] mt-px">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/book"
                  className={p.featured ? "btn btn-primary" : "btn btn-ghost"}
                >
                  Book {p.name}
                </Link>
                <span className="bracket-tl" />
                <span className="bracket-br" />
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
