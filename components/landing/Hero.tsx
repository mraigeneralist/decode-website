import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#040404]">
      <div
        className="absolute inset-0 animate-[fadeIn_0.8s_ease_both]"
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 78% 50%, rgba(200,48,46,0.10) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 5% 80%, rgba(200,48,46,0.06) 0%, transparent 55%),
            radial-gradient(ellipse 50% 50% at 50% 0%, rgba(255,255,255,0.025) 0%, transparent 50%),
            #060606
          `,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute top-0 right-[15%] w-px h-full"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(200,48,46,0.45) 40%, rgba(200,48,46,0.1) 70%, transparent 100%)",
            transform: "rotate(-8deg) translateX(60px)",
          }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
        <div
          className="absolute w-px right-[22%] top-[20%] h-[60%]"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(200,48,46,0.28), transparent)",
            transform: "rotate(-12deg)",
          }}
        />
        <div
          className="absolute w-px right-[28%] top-[30%] h-[40%]"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(200,48,46,0.22), transparent)",
            transform: "rotate(-12deg)",
          }}
        />
        <div
          className="absolute w-px left-[18%] top-[35%] h-[50%]"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(200,48,46,0.16), transparent)",
            transform: "rotate(8deg)",
          }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none z-[2] noise" />

      <div className="relative z-[3] px-8 max-[640px]:px-5 pb-20 max-[640px]:pb-12 max-w-[1240px] mx-auto w-full pt-[calc(var(--nav-h)+5rem)] max-[640px]:pt-[calc(var(--nav-h)+3rem)]">
        <p className="au1 eyebrow mb-7 max-[640px]:mb-4">
          Decode Detailing Studio &nbsp;·&nbsp; By Appointment
        </p>

        <h1 className="au2 display font-black tracking-[-0.02em] mb-8 text-[clamp(3.6rem,9vw,8.4rem)] max-[640px]:text-[clamp(2.6rem,12vw,3.6rem)] max-[640px]:mb-5">
          <span className="block text-[var(--foreground)]">FEEL THE</span>
          <span
            className="block text-transparent"
            style={{ WebkitTextStroke: "2px rgba(200,48,46,0.95)" }}
          >
            REAL DETAILING.
          </span>
        </h1>

        <p className="au3 max-w-[540px] text-[0.975rem] text-[var(--muted-2)] leading-[1.8] mb-10 max-[640px]:text-[0.9rem] max-[640px]:mb-7">
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

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[3] hidden md:flex flex-col items-center gap-2 text-[var(--muted)]">
        <div className="text-[0.6rem] tracking-[0.3em] uppercase">Scroll</div>
        <div className="w-px h-10 bg-gradient-to-b from-[var(--accent-bright)] to-transparent" />
      </div>
    </section>
  );
}
