import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { OWNER_WHATSAPP_NUMBER, INSTAGRAM_URL } from "@/lib/constants";

export default function ContactPage() {
  const waNumber = OWNER_WHATSAPP_NUMBER.replace(/\D/g, "");
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-16 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--muted)] mb-3">
            <span className="inline-block w-8 h-px bg-[var(--accent)] mr-3 align-middle" />
            Reach out
          </div>
          <h1 className="display text-[clamp(48px,8vw,108px)] mb-10">Contact.</h1>

          <div className="grid md:grid-cols-2 gap-6">
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noreferrer"
              className="card p-8 hover:border-[var(--accent)] transition-colors"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-3">WhatsApp</div>
              <div className="display text-3xl mb-2 group-hover:text-[var(--accent)]">{OWNER_WHATSAPP_NUMBER}</div>
              <p className="text-sm text-[var(--foreground)]/75">
                Fastest channel. Tap to chat — we'll quote, schedule, and confirm in one thread.
              </p>
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="card p-8 hover:border-[var(--accent)] transition-colors"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-3">Instagram</div>
              <div className="display text-3xl mb-2">@decodedetailingstudio</div>
              <p className="text-sm text-[var(--foreground)]/75">
                Latest work, before/after shots, and studio updates.
              </p>
            </a>

            <div className="card p-8 md:col-span-2">
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-3">Studio hours</div>
              <div className="display text-3xl mb-2">Mon–Sun · 10:00 AM – 8:00 PM</div>
              <p className="text-sm text-[var(--foreground)]/75">
                By appointment only. Walk-ins accepted if a slot is open — but booking guarantees you the time.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
