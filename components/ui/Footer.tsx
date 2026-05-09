import Link from "next/link";
import Image from "next/image";
import { BUSINESS_NAME, BUSINESS_TAGLINE, OWNER_WHATSAPP_NUMBER, INSTAGRAM_URL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[#040404] mt-24">
      <div className="max-w-[1240px] mx-auto px-8 max-[640px]:px-5 py-16 grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link href="/" aria-label="Decode Detailing — Home">
            <Image
              src="/logo.jpg"
              alt="Decode Detailing"
              width={260}
              height={64}
              className="h-12 w-auto mb-5"
            />
          </Link>
          <p className="text-[var(--muted-2)] text-[0.9rem] leading-[1.8] max-w-md">
            {BUSINESS_TAGLINE}. Premium ceramic coating, paint protection film, machine polish, and interior care.
          </p>

          <div className="mt-7 flex items-center gap-3 flex-wrap">
            <a
              href={`https://wa.me/${OWNER_WHATSAPP_NUMBER.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[3px] border border-[var(--border-mid)] text-[0.72rem] uppercase tracking-[0.16em] font-semibold hover:border-[var(--accent)] hover:text-[var(--accent-bright)] transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[3px] border border-[var(--border-mid)] text-[0.72rem] uppercase tracking-[0.16em] font-semibold hover:border-[var(--accent)] hover:text-[var(--accent-bright)] transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="eyebrow-muted mb-5">Studio</div>
          <ul className="space-y-3 text-[0.92rem]">
            <li><Link href="/services" className="hover:text-[var(--accent-bright)] transition-colors">Services</Link></li>
            <li><Link href="/packages" className="hover:text-[var(--accent-bright)] transition-colors">Packages</Link></li>
            <li><Link href="/gallery"  className="hover:text-[var(--accent-bright)] transition-colors">Gallery</Link></li>
            <li><Link href="/about"    className="hover:text-[var(--accent-bright)] transition-colors">About</Link></li>
            <li><Link href="/contact"  className="hover:text-[var(--accent-bright)] transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="eyebrow-muted mb-5">Hours</div>
          <ul className="space-y-2 text-[0.92rem] text-[var(--muted-2)]">
            <li className="flex justify-between">
              <span>Monday – Sunday</span>
              <span className="text-[var(--foreground)]">10:00 AM – 8:00 PM</span>
            </li>
            <li className="text-[var(--muted)] text-[0.78rem] mt-3">By appointment only.</li>
          </ul>

          <div className="eyebrow-muted mt-8 mb-3">Legal</div>
          <ul className="flex gap-5 text-[0.78rem] text-[var(--muted-2)]">
            <li><Link href="/privacy" className="hover:text-[var(--accent-bright)]">Privacy</Link></li>
            <li><Link href="/terms"   className="hover:text-[var(--accent-bright)]">Terms</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--border)] py-5 px-8 max-[640px]:px-5 text-[0.72rem] text-[var(--muted)] flex flex-wrap justify-between gap-3 max-w-[1240px] mx-auto uppercase tracking-[0.14em]">
        <span>© {new Date().getFullYear()} {BUSINESS_NAME}.</span>
        <span>Built for performance.</span>
      </div>
    </footer>
  );
}
