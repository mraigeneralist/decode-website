import Link from "next/link";
import { BUSINESS_NAME, BUSINESS_TAGLINE, OWNER_WHATSAPP_NUMBER, INSTAGRAM_URL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--border)] bg-[var(--bg-card)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="display text-3xl text-[var(--foreground)]">{BUSINESS_NAME.toUpperCase()}</div>
          <p className="mt-3 text-sm text-[var(--muted)] max-w-md">{BUSINESS_TAGLINE}.</p>
          <p className="mt-6 text-sm text-[var(--muted)]">
            Premium car detailing, ceramic coating, paint protection film, and interior care.
          </p>
        </div>

        <div>
          <div className="text-sm text-[var(--muted)] uppercase tracking-wider mb-4">Studio</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/services" className="hover:text-[var(--accent)]">Services</Link></li>
            <li><Link href="/packages" className="hover:text-[var(--accent)]">Packages</Link></li>
            <li><Link href="/gallery"  className="hover:text-[var(--accent)]">Gallery</Link></li>
            <li><Link href="/about"    className="hover:text-[var(--accent)]">About</Link></li>
            <li><Link href="/contact"  className="hover:text-[var(--accent)]">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-sm text-[var(--muted)] uppercase tracking-wider mb-4">Connect</div>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={`https://wa.me/${OWNER_WHATSAPP_NUMBER.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--accent)]"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-[var(--accent)]">
                Instagram
              </a>
            </li>
            <li><Link href="/privacy" className="hover:text-[var(--accent)]">Privacy</Link></li>
            <li><Link href="/terms"   className="hover:text-[var(--accent)]">Terms</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--border)] py-5 px-5 sm:px-8 text-xs text-[var(--muted)] flex flex-wrap justify-between gap-3 max-w-7xl mx-auto">
        <span>© {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.</span>
        <span>Built for performance.</span>
      </div>
    </footer>
  );
}
