import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import BookingFlow from "@/components/booking/BookingFlow";
import { supabaseAdmin } from "@/lib/supabase-server";
import type { Service } from "@/lib/types";

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

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const services = await fetchServices();
  const { service } = await searchParams;

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-16 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--muted)] mb-3">
            <span className="inline-block w-8 h-px bg-[var(--accent)] mr-3 align-middle" />
            Schedule
          </div>
          <h1 className="display text-[clamp(40px,7vw,84px)] mb-10">Book your slot.</h1>

          {services.length === 0 ? (
            <div className="card p-10 text-[var(--muted)]">
              Booking is unavailable — Supabase isn't connected. Run <code>schema.sql</code> +{" "}
              <code>seed.sql</code> and set environment variables.
            </div>
          ) : (
            <BookingFlow services={services} initialServiceId={service} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
