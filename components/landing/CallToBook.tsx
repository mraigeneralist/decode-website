import Link from "next/link";
import { OWNER_WHATSAPP_NUMBER } from "@/lib/constants";

export default function CallToBook() {
  return (
    <section className="py-24 px-5 sm:px-8 border-t border-[var(--border)]">
      <div className="max-w-5xl mx-auto card-float p-10 sm:p-16 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 80% 20%, var(--accent) 0%, transparent 50%), radial-gradient(circle at 20% 80%, var(--accent) 0%, transparent 50%)",
          }}
        />
        <div className="relative">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--muted)] mb-3">
            <span className="inline-block w-8 h-px bg-[var(--accent)] mr-3 align-middle" />
            Ready when you are
          </div>
          <h2 className="display text-[clamp(40px,7vw,84px)]">Book your slot.</h2>
          <p className="mt-5 text-[var(--foreground)]/80 max-w-xl mx-auto">
            Pick a service, vehicle, date, and time. We'll confirm via WhatsApp.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/book"
              className="btn-accent px-8 py-4 rounded-full text-sm font-semibold tracking-wide"
            >
              Book Online
            </Link>
            <a
              href={`https://wa.me/${OWNER_WHATSAPP_NUMBER.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-full border border-[var(--border-mid)] text-sm font-semibold hover:border-[var(--accent)] transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
