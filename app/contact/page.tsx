import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { OWNER_WHATSAPP_NUMBER, INSTAGRAM_URL } from "@/lib/constants";

export default function ContactPage() {
  const wa = OWNER_WHATSAPP_NUMBER.replace(/\D/g, "");
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-[calc(var(--nav-h)+5rem)] pb-20 px-8 max-[640px]:px-5">
        <div className="max-w-[1100px] mx-auto">
          <header className="mb-14">
            <p className="eyebrow mb-4">Reach Out</p>
            <h1 className="display text-[clamp(3rem,9vw,8rem)]">Contact.</h1>
          </header>

          <div className="grid md:grid-cols-2 gap-px bg-[var(--border)]">
            <a
              href={`https://wa.me/${wa}`}
              target="_blank"
              rel="noreferrer"
              className="group bg-[var(--bg-card)] p-9 max-[640px]:p-6 hover:bg-[var(--bg-float)] transition-colors duration-300 relative overflow-hidden"
            >
              <div className="text-[0.62rem] tracking-[0.22em] uppercase text-[var(--muted)] mb-3">WhatsApp</div>
              <div className="display text-[2rem] mb-3 group-hover:text-[var(--accent-bright)] transition-colors">{OWNER_WHATSAPP_NUMBER}</div>
              <p className="text-[0.88rem] text-[var(--muted-2)] leading-[1.7]">
                Fastest channel. Tap to chat — quote, schedule, and confirmation in one thread.
              </p>
              <span className="bracket-tl" />
              <span className="bracket-br" />
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="group bg-[var(--bg-card)] p-9 max-[640px]:p-6 hover:bg-[var(--bg-float)] transition-colors duration-300 relative overflow-hidden"
            >
              <div className="text-[0.62rem] tracking-[0.22em] uppercase text-[var(--muted)] mb-3">Instagram</div>
              <div className="display text-[2rem] mb-3 group-hover:text-[var(--accent-bright)] transition-colors">@decodedetailingstudio</div>
              <p className="text-[0.88rem] text-[var(--muted-2)] leading-[1.7]">
                Latest work, before/after shots, and studio updates.
              </p>
              <span className="bracket-tl" />
              <span className="bracket-br" />
            </a>

            <div className="md:col-span-2 group bg-[var(--bg-card)] p-9 max-[640px]:p-6 relative overflow-hidden">
              <div className="text-[0.62rem] tracking-[0.22em] uppercase text-[var(--muted)] mb-3">Studio Hours</div>
              <div className="display text-[2rem] mb-3">Mon – Sun &nbsp;·&nbsp; 10:00 AM – 8:00 PM</div>
              <p className="text-[0.88rem] text-[var(--muted-2)] leading-[1.7] max-w-2xl">
                By appointment only. Walk-ins welcome if a slot is open — but booking ahead guarantees the time and prep.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
