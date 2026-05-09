import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-server";
import type { Service } from "@/lib/types";
import { formatPrice } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";

async function fetchServices(): Promise<Service[]> {
  if (!supabaseAdmin) return [];
  const { data } = await supabaseAdmin
    .from("services")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });
  return (data as unknown as Service[]) || [];
}

const ICONS: Record<string, React.ReactElement> = {
  "basic-wash": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 21V11a4 4 0 014-4h6a4 4 0 014 4v10" />
      <circle cx="9" cy="17" r="2" />
      <circle cx="15" cy="17" r="2" />
    </svg>
  ),
  "exterior-deep": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 22v-4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M22 12h-4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  "interior-deep": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9h18M3 9V7a2 2 0 012-2h14a2 2 0 012 2v2M3 9v9a2 2 0 002 2h14a2 2 0 002-2V9" />
      <path d="M9 9v11M15 9v11" />
    </svg>
  ),
  "full-detailing": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" />
      <path d="M12 7l4.5 2.5v5L12 17l-4.5-2.5v-5L12 7z" />
    </svg>
  ),
  "ceramic-coating": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  "paint-protection": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <rect x="5" y="7" width="14" height="10" rx="1" />
      <path d="M2 10h20" />
    </svg>
  ),
  "sun-film": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  ),
};

const FALLBACK_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

export default async function ServicesPreview() {
  const services = await fetchServices();
  const featured = services.slice(0, 6);

  return (
    <section id="services" className="py-24 max-[640px]:py-16 g-tex">
      <div className="max-w-[1240px] mx-auto px-8 max-[640px]:px-5">
        <ScrollReveal>
          <p className="eyebrow mb-4">What We Do</p>
        </ScrollReveal>
        <ScrollReveal delay={1}>
          <h2 className="display text-[clamp(2.4rem,6vw,4.4rem)] mb-4">
            Built for the cars<br />you actually care about.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={2}>
          <p className="max-w-[540px] text-[var(--muted-2)] text-[0.95rem] leading-[1.8]">
            Every service is performed at studio standards — no rushed jobs, no surprise add-ons,
            no kitchen-sink chemistry.
          </p>
        </ScrollReveal>

        {featured.length === 0 ? (
          <div className="card-flat p-10 text-[var(--muted)] text-sm mt-12">
            Services will appear here once Supabase is connected and seeded.
          </div>
        ) : (
          <div className="grid grid-cols-3 mt-14 max-[900px]:grid-cols-2 max-[640px]:grid-cols-1">
            {featured.map((s, i) => {
              const cheapest = Math.min(
                ...Object.values(s.prices || {}).filter((p) => Number(p) > 0).map(Number),
              );
              const flagship = i === 0;
              return (
                <ScrollReveal key={s.id} delay={(i % 3) as 0 | 1 | 2} className="h-full">
                  <Link
                    href="/services"
                    className={`group h-full bg-[var(--bg-card)] p-9 max-[640px]:p-6 relative overflow-hidden transition-colors duration-300 hover:bg-[var(--bg-float)] border border-[var(--border)] -mt-px -ml-px block ${
                      flagship ? "border-l-2 border-l-[var(--accent)]" : ""
                    }`}
                  >
                    {flagship && (
                      <span className="inline-block text-[0.58rem] font-bold tracking-[0.16em] uppercase text-white bg-[var(--accent)] px-[10px] py-[3px] rounded-[2px] mb-5">
                        Most popular
                      </span>
                    )}
                    <div className="w-9 h-9 text-[var(--accent-bright)] mb-5">
                      {ICONS[s.id] || FALLBACK_ICON}
                    </div>
                    <h3 className="display text-[1.5rem] mb-2">{s.name}</h3>
                    <p className="text-[0.85rem] text-[var(--muted-2)] leading-[1.7] mb-5 line-clamp-3">
                      {s.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[0.78rem] text-[var(--accent-bright)] font-semibold tracking-[0.05em]">
                        {Number.isFinite(cheapest) && cheapest > 0
                          ? `from ${formatPrice(cheapest)}`
                          : "Quote on inspection"}
                      </span>
                      <span className="inline-flex items-center gap-2.5 pl-3.5 pr-3 py-1.5 border border-[var(--accent)]/45 rounded-[2px] text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[var(--accent-bright)] group-hover:bg-[var(--accent)] group-hover:text-white group-hover:border-[var(--accent)] transition-colors duration-300">
                        Details
                        <svg
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                          width="12" height="12" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"
                        >
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>

                    <span className="bracket-tl" />
                    <span className="bracket-tr" />
                    <span className="bracket-bl" />
                    <span className="bracket-br" />
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        <div className="mt-14 flex justify-center">
          <Link href="/services" className="btn-link">
            See full catalog →
          </Link>
        </div>
      </div>
    </section>
  );
}
