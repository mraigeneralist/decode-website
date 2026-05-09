import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { OWNER_WHATSAPP_NUMBER } from "@/lib/constants";

export default function CallToBook() {
  const wa = OWNER_WHATSAPP_NUMBER.replace(/\D/g, "");
  return (
    <section className="py-28 max-[640px]:py-20 px-8 max-[640px]:px-5 relative overflow-hidden border-t border-[var(--border)]">
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(200,48,46,0.18) 0%, transparent 60%)",
        }}
      />
      <div className="absolute inset-0 pointer-events-none g-tex opacity-40" />

      <div className="relative max-w-[1100px] mx-auto text-center">
        <ScrollReveal>
          <p className="eyebrow mb-5 justify-center">Ready when you are</p>
        </ScrollReveal>
        <ScrollReveal delay={1}>
          <h2 className="display text-[clamp(2.6rem,8vw,6.4rem)] mb-6">
            <span className="block">Book your slot.</span>
            <span
              className="block text-transparent"
              style={{ WebkitTextStroke: "2px rgba(200,48,46,0.95)" }}
            >
              Skip the queue.
            </span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={2}>
          <p className="mt-2 text-[var(--muted-2)] max-w-xl mx-auto text-[0.95rem] leading-[1.8]">
            Pick a service, a vehicle, a date, and a time. We'll confirm via WhatsApp the second you do.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={3}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/book" className="btn btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Book Online
            </Link>
            <a
              href={`https://wa.me/${wa}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2.1-.4 0-.5-.1-.1-.6-1.6-.9-2.1-.2-.6-.5-.5-.6-.5h-.5c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2.1 3.2 5 4.5.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.6-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3z" />
                <path d="M12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.1 1.6 5.9L0 24l6.3-1.6c1.7.9 3.7 1.5 5.7 1.5 6.6 0 12-5.4 12-12S18.6 0 12 0zm0 22c-1.9 0-3.6-.5-5.2-1.4l-.4-.2-3.7.9.9-3.6-.2-.4C2.6 15.6 2 13.9 2 12c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
