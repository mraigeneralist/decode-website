import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-server";
import type { Service } from "@/lib/types";
import { VEHICLE_TYPES, formatPrice } from "@/lib/constants";

export const dynamic = "force-dynamic";

async function fetchServices(): Promise<Service[]> {
  if (!supabaseAdmin) return [];
  const { data } = await supabaseAdmin
    .from("services")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });
  return (data as unknown as Service[]) || [];
}

export default async function ServicesPage() {
  const services = await fetchServices();

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-16 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-14">
            <div className="text-xs uppercase tracking-[0.3em] text-[var(--muted)] mb-3">
              <span className="inline-block w-8 h-px bg-[var(--accent)] mr-3 align-middle" />
              Catalog
            </div>
            <h1 className="display text-[clamp(48px,8vw,108px)]">Services & Pricing.</h1>
            <p className="mt-5 max-w-2xl text-[var(--foreground)]/75">
              All prices are inclusive of consumables. Final price depends on vehicle category.
              Pick yours, then book online or message us on WhatsApp.
            </p>
          </header>

          {services.length === 0 ? (
            <div className="card p-10 text-[var(--muted)]">
              No services yet — connect Supabase and run <code>seed.sql</code> to populate this page.
            </div>
          ) : (
            <div className="space-y-10">
              {services.map((s) => (
                <article key={s.id} className="card p-6 sm:p-10">
                  <div className="grid md:grid-cols-12 gap-6">
                    <div className="md:col-span-4">
                      <div className="display text-3xl sm:text-4xl mb-3">{s.name}</div>
                      <p className="text-sm text-[var(--foreground)]/75 leading-relaxed">{s.description}</p>
                    </div>
                    <div className="md:col-span-8">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {VEHICLE_TYPES.map((vt) => {
                          const price = (s.prices as Record<string, number>)?.[vt.id] ?? 0;
                          return (
                            <div
                              key={vt.id}
                              className="card-float p-4 text-center"
                            >
                              <div className="text-xs uppercase tracking-[0.15em] text-[var(--muted)] mb-2">
                                {vt.name}
                              </div>
                              <div className="text-lg font-semibold">{formatPrice(price)}</div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-6 flex justify-end">
                        <Link
                          href={`/book?service=${s.id}`}
                          className="btn-accent px-6 py-2.5 rounded-full text-sm font-semibold"
                        >
                          Book this →
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
