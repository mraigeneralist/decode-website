import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-[calc(var(--nav-h)+5rem)] pb-20 px-8 max-[640px]:px-5">
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="display text-[clamp(2.5rem,6vw,4.5rem)] mb-10">Terms of Service.</h1>

          <div className="space-y-6 text-[var(--muted-2)] leading-[1.85] text-[0.92rem]">
            <p>
              Bookings are confirmed only after WhatsApp OTP verification. If you don't verify within
              5 minutes the slot is automatically released.
            </p>
            <p>
              Walk-in cancellations or reschedules within 2 hours of the slot may be charged a flat
              ₹500 prep fee — we hold the slot and prep products specific to your vehicle.
            </p>
            <p>
              Final price may vary from the website estimate based on vehicle condition (heavy oxidation,
              deep scratches, biological soiling). Any variation will be quoted and approved before work
              begins — never after.
            </p>
            <p>
              Coatings and films carry manufacturer warranties separately. Decode Detailing warrants its
              workmanship for 30 days against defects in application.
            </p>
            <p className="text-[var(--muted)]">
              Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
