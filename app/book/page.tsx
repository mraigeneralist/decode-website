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
      <main className="flex-1 pt-[calc(var(--nav-h)+5rem)] pb-20 px-8 max-[640px]:px-5">
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow mb-4">Schedule</p>
          <h1 className="display text-[clamp(2.5rem,7vw,5.4rem)] mb-10">Book your slot.</h1>

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
