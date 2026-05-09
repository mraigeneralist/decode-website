import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#040404]">
      <Image
        src="/images/hero-image.webp"
        alt="Decode Detailing studio interior"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center select-none pointer-events-none"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(4,4,4,0.92) 0%, rgba(4,4,4,0.78) 28%, rgba(4,4,4,0.45) 55%, rgba(4,4,4,0.30) 80%, rgba(4,4,4,0.55) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(4,4,4,0.55) 0%, rgba(4,4,4,0) 25%, rgba(4,4,4,0) 65%, rgba(4,4,4,0.85) 100%)",
        }}
      />
      <div
        className="absolute inset-0 mix-blend-screen opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 18% 60%, rgba(200,48,46,0.18) 0%, transparent 65%)",
        }}
      />
      <div className="absolute inset-0 noise opacity-40 pointer-events-none" />

      <div className="absolute top-0 right-[10%] w-px h-full pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(200,48,46,0.32) 40%, rgba(200,48,46,0.08) 70%, transparent 100%)",
          transform: "rotate(-8deg) translateX(60px)",
        }}
      />

      <div className="relative z-[3] px-8 max-[640px]:px-5 pb-24 max-[640px]:pb-14 max-w-[1240px] mx-auto w-full pt-[calc(var(--nav-h)+5rem)] max-[640px]:pt-[calc(var(--nav-h)+3rem)]">
        <div className="max-w-[640px]">
          <p className="au1 eyebrow mb-7 max-[640px]:mb-4">
            Decode Detailing Studio &nbsp;·&nbsp; By Appointment
          </p>

          <h1 className="au2 display font-black tracking-[-0.02em] mb-8 text-[clamp(3.6rem,9vw,8.4rem)] max-[640px]:text-[clamp(2.6rem,12vw,3.6rem)] max-[640px]:mb-5 [text-shadow:0_2px_30px_rgba(0,0,0,0.6)]">
            <span className="block text-[var(--foreground)]">FEEL THE</span>
            <span
              className="block text-transparent"
              style={{ WebkitTextStroke: "2px rgba(226,60,58,0.98)" }}
            >
              REAL DETAILING.
            </span>
          </h1>

          <p className="au3 max-w-[520px] text-[1rem] text-[var(--muted-2)] leading-[1.8] mb-10 max-[640px]:text-[0.9rem] max-[640px]:mb-7 [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]">
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
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[3] hidden md:flex flex-col items-center gap-2 text-[var(--muted)]">
        <div className="text-[0.6rem] tracking-[0.3em] uppercase">Scroll</div>
        <div className="w-px h-10 bg-gradient-to-b from-[var(--accent-bright)] to-transparent" />
      </div>
    </section>
  );
}
