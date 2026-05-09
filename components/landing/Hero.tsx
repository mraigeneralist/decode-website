import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#040404]">
      {/* Mobile-only full-bleed image (hidden on md+) */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/images/img-1.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_30%] select-none pointer-events-none"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(4,4,4,0.85) 0%, rgba(4,4,4,0.7) 30%, rgba(4,4,4,0.55) 55%, rgba(4,4,4,0.92) 100%)",
          }}
        />
      </div>

      <div className="relative grid grid-cols-12 min-h-screen">
        {/* LEFT: text panel */}
        <div className="col-span-12 md:col-span-7 lg:col-span-6 relative flex items-center px-8 max-[640px]:px-5 pt-[calc(var(--nav-h)+4rem)] pb-20 max-[640px]:pt-[calc(var(--nav-h)+8rem)] max-[640px]:pb-16">
          {/* Background layers (desktop only — mobile uses the full-bleed image above) */}
          <div className="absolute inset-0 hidden md:block g-tex opacity-50 pointer-events-none" />
          <div
            className="absolute inset-0 hidden md:block pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 30% 70%, rgba(200,48,46,0.12) 0%, transparent 60%)",
            }}
          />
          <div className="absolute inset-0 noise opacity-30 pointer-events-none" />
          <div
            className="absolute top-0 right-0 hidden md:block w-px h-full pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(200,48,46,0.5) 40%, rgba(200,48,46,0.1) 70%, transparent 100%)",
              transform: "rotate(-4deg) translateX(20px)",
            }}
          />

          <div className="relative w-full max-w-[640px] md:ml-auto md:mr-12 max-[640px]:mr-0">
            <p className="au1 eyebrow mb-7 max-[640px]:mb-5">
              Decode Detailing Studio &nbsp;·&nbsp; By Appointment
            </p>

            <h1 className="au2 display tracking-[-0.02em] mb-8 max-[640px]:mb-5 [text-shadow:0_2px_28px_rgba(0,0,0,0.55)]">
              <span className="block text-[var(--foreground)] text-[clamp(2.6rem,6.5vw,5.6rem)] leading-[0.95]">
                FEEL THE
              </span>
              <span
                className="block text-transparent text-[clamp(3.2rem,9vw,8rem)] leading-[0.95] mt-1"
                style={{ WebkitTextStroke: "2px rgba(226,60,58,0.98)" }}
              >
                REAL
              </span>
              <span className="block text-[var(--foreground)] text-[clamp(3.2rem,9vw,8rem)] leading-[0.95]">
                DETAILING.
              </span>
            </h1>

            <p className="au3 max-w-[520px] text-[1rem] text-[var(--muted-2)] leading-[1.8] mb-10 max-[640px]:text-[0.92rem] max-[640px]:mb-7 [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]">
              Pro-grade ceramic coating, paint protection film, and machine-polish detailing.
              One car at a time, by appointment, with the products the job actually needs.
            </p>

            <div className="au4 flex gap-3 flex-wrap max-[640px]:flex-col max-[640px]:w-full">
              <Link href="/book" className="btn btn-primary max-[640px]:w-full">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Book a Slot
              </Link>
              <Link href="/services" className="btn btn-ghost max-[640px]:w-full">
                View Services
              </Link>
            </div>

            <div className="au4 mt-12 max-[640px]:mt-9 hidden md:flex items-center gap-5 text-[0.65rem] uppercase tracking-[0.22em] text-[var(--muted)]">
              <span className="w-12 h-px bg-[var(--accent-bright)]" />
              <span>Mon–Sun</span>
              <span className="opacity-50">/</span>
              <span>10:00 — 8:00 PM</span>
            </div>
          </div>
        </div>

        {/* RIGHT: image panel (desktop only) */}
        <div className="hidden md:block md:col-span-5 lg:col-span-6 relative">
          <Image
            src="/images/img-1.webp"
            alt="Custom orange build at Decode Detailing studio"
            fill
            priority
            sizes="(max-width: 768px) 0px, 50vw"
            className="object-cover object-[60%_40%] select-none pointer-events-none"
          />
          {/* Overall shade — dim the whole image so it reads as atmosphere, not a focal photo */}
          <div className="absolute inset-0 bg-black/45 pointer-events-none" />
          {/* Strong fade at the seam so the panels blend into one shaded surface */}
          <div
            className="absolute inset-y-0 left-0 w-1/2 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, rgba(4,4,4,0.98) 0%, rgba(4,4,4,0.7) 35%, rgba(4,4,4,0.25) 75%, rgba(4,4,4,0) 100%)",
            }}
          />
          <div
            className="absolute inset-y-0 right-0 w-32 pointer-events-none"
            style={{
              background:
                "linear-gradient(270deg, rgba(4,4,4,0.6) 0%, rgba(4,4,4,0) 100%)",
            }}
          />
          <div
            className="absolute inset-x-0 top-0 h-32 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(4,4,4,0.5) 0%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(4,4,4,0.85) 0%, transparent 100%)",
            }}
          />
          {/* Subtle red glow on the image so the shade still reads as branded */}
          <div
            className="absolute inset-0 mix-blend-screen opacity-50 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 50% 60% at 60% 50%, rgba(200,48,46,0.18) 0%, transparent 65%)",
            }}
          />
          {/* Floating caption card */}
          <div className="absolute bottom-8 right-8 hidden lg:block bg-[rgba(6,6,6,0.78)] backdrop-blur-md border border-[var(--border-mid)] px-5 py-4 max-w-[280px]">
            <div className="text-[0.58rem] tracking-[0.22em] uppercase text-[var(--accent-bright)] font-bold mb-1.5">
              Latest in studio
            </div>
            <div className="text-[0.92rem] font-semibold leading-snug">
              Custom orange build — full exterior detail
            </div>
            <span className="bracket-tl" />
            <span className="bracket-br" />
          </div>
        </div>
      </div>

      {/* Bottom hairline */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-60" />
    </section>
  );
}
