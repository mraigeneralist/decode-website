import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-16 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--muted)] mb-3">Legal</div>
          <h1 className="display text-5xl mb-8">Privacy Policy.</h1>

          <div className="space-y-6 text-[var(--foreground)]/80 leading-relaxed text-sm">
            <p>
              Decode Detailing Studio collects only what's needed to schedule and deliver your appointment:
              your name, phone number, vehicle make/model, and chosen service.
            </p>
            <p>
              We never sell your information. We never use it for marketing without explicit opt-in.
              We send appointment reminders via WhatsApp or Telegram only on the channel you booked through.
            </p>
            <p>
              Your data lives in our Supabase project (encrypted at rest, hosted in a secure region).
              You can request deletion at any time by messaging us on WhatsApp.
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
