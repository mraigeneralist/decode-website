import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-server";
import type { Service } from "@/lib/types";
import { formatPrice } from "@/lib/constants";

async function fetchServices(): Promise<Service[]> {
  if (!supabaseAdmin) return [];
  const { data } = await supabaseAdmin
    .from("services")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });
  return (data as unknown as Service[]) || [];
}

export default async function ServicesPreview() {
  const services = await fetchServices();
  const featured = services.slice(0, 4);

  return (
    <section id="services" className="py-24 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[var(--muted)] mb-3">
              <span className="inline-block w-8 h-px bg-[var(--accent)] mr-3 align-middle" />
              What we do
            </div>
            <h2 className="display text-[clamp(36px,6vw,72px)]">Services.</h2>
          </div>
          <Link
            href="/services"
            className="text-sm uppercase tracking-[0.2em] text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          >
            See all →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.length === 0 && (
            <div className="col-span-full text-[var(--muted)] text-sm card p-8">
              Services will appear here once Supabase is connected and seeded.
            </div>
          )}
          {featured.map((s) => {
            const cheapest = Math.min(
              ...Object.values(s.prices || {}).filter((p) => Number(p) > 0).map(Number),
            );
            return (
              <Link
                key={s.id}
                href="/services"
                className="card p-7 hover:border-[var(--accent)] transition-colors group block"
              >
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-3">
                  {String(s.id).slice(0, 2).toUpperCase()}
                </div>
                <div className="display text-3xl mb-3 group-hover:text-[var(--accent)] transition-colors">
                  {s.name}
                </div>
                <p className="text-sm text-[var(--foreground)]/70 mb-6 line-clamp-3">
                  {s.description}
                </p>
                <div className="text-sm text-[var(--accent)]">
                  {Number.isFinite(cheapest) ? `from ${formatPrice(cheapest)}` : "Quote on inspection"}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
