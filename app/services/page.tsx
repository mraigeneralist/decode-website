import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-server";
import type { Service } from "@/lib/types";
import { VEHICLE_TYPES } from "@/lib/constants";

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
      <main className="flex-1 pt-[calc(var(--nav-h)+5rem)] pb-20 px-8 max-[640px]:px-5">
        <div className="max-w-[1240px] mx-auto">
          <header className="mb-14">
            <p className="eyebrow mb-4">Catalog</p>
            <h1 className="display text-[clamp(2.8rem,8vw,7rem)]">Services & Pricing.</h1>
            <p className="mt-5 max-w-2xl text-[var(--muted-2)] leading-[1.8] text-[0.95rem]">
              Per-vehicle pricing, inclusive of consumables. Final price depends on vehicle category and condition.
              Pick yours, then book online or message us on WhatsApp.
            </p>
          </header>

          {services.length === 0 ? (
            <div className="card p-10 text-[var(--muted)]">
              No services yet — connect Supabase and run <code>seed.sql</code> to populate this page.
            </div>
          ) : (
            <div className="space-y-10">
              {services.map((s, i) => (
                <article
                  key={s.id}
                  className="group bg-[var(--bg-card)] border border-[var(--border)] p-8 max-[640px]:p-6 relative overflow-hidden hover:bg-[var(--bg-float)] transition-colors duration-300"
                >
                  <div className="grid md:grid-cols-12 gap-8">
                    <div className="md:col-span-4">
                      <div className="display text-[2.4rem] max-[640px]:text-[1.8rem] mb-2">{s.name}</div>
                      <div className="text-[0.65rem] tracking-[0.22em] uppercase text-[var(--muted)] mb-4">
                        {String(i + 1).padStart(2, "0")} / {services.length.toString().padStart(2, "0")}
                      </div>
                      <p className="text-[0.9rem] text-[var(--muted-2)] leading-[1.8]">{s.description}</p>
                    </div>
                    <div className="md:col-span-8">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[var(--border)]">
                        {VEHICLE_TYPES.map((vt) => {
                          const price = (s.prices as Record<string, number>)?.[vt.id] ?? 0;
                          return (
                            <div
                              key={vt.id}
                              className="bg-[var(--bg-card)] p-5 text-center"
                            >
                              <div className="text-[0.6rem] uppercase tracking-[0.18em] text-[var(--muted)] mb-2">
                                {vt.name}
                              </div>
                              <div className="display text-[1.4rem]" style={price ? { color: "var(--foreground)" } : { color: "var(--muted)" }}>
                                {price ? `₹${price.toLocaleString("en-IN")}` : "Quote"}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-6 flex justify-end">
                        <Link
                          href={`/book?service=${s.id}`}
                          className="btn-link"
                        >
                          Book {s.name} →
                        </Link>
                      </div>
                    </div>
                  </div>
                  <span className="bracket-tl" />
                  <span className="bracket-br" />
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
