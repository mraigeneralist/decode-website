import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-16 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--muted)] mb-3">
            <span className="inline-block w-8 h-px bg-[var(--accent)] mr-3 align-middle" />
            About
          </div>
          <h1 className="display text-[clamp(48px,8vw,108px)] mb-10">Decode Detailing.</h1>

          <div className="prose prose-invert max-w-none space-y-6 text-[var(--foreground)]/80 leading-relaxed">
            <p>
              Decode Detailing Studio is a specialist car care studio. We don't run a service centre.
              We don't sell tyres. We work on one car at a time, by appointment, with the products and
              process the job actually needs.
            </p>
            <p>
              Our work is split into three lanes: paint correction & coating (machine polish, ceramic,
              PPF), interior restoration (deep extraction, leather conditioning, plastic re-blacking),
              and routine refresh (foam wash, wax, sun film). Pricing is per-vehicle and posted up front.
            </p>
            <p>
              <strong style={{ color: "var(--accent)" }}>Feel the real detailing.</strong> That's our
              promise — not a wax pass dressed up as a coating, not a kitchen-sink chemical mix passed
              off as restoration. Every job gets a clear scope, a real quote, and the products we'd use
              on our own cars.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mt-16">
            <div className="card p-6">
              <div className="display text-4xl" style={{ color: "var(--accent)" }}>1</div>
              <div className="text-sm text-[var(--muted)] mt-2 uppercase tracking-[0.15em]">Car at a time</div>
              <p className="mt-3 text-sm">No queue chaos, no rushed jobs.</p>
            </div>
            <div className="card p-6">
              <div className="display text-4xl" style={{ color: "var(--accent)" }}>9H</div>
              <div className="text-sm text-[var(--muted)] mt-2 uppercase tracking-[0.15em]">Ceramic grade</div>
              <p className="mt-3 text-sm">Real coatings, not glorified sealants.</p>
            </div>
            <div className="card p-6">
              <div className="display text-4xl" style={{ color: "var(--accent)" }}>0</div>
              <div className="text-sm text-[var(--muted)] mt-2 uppercase tracking-[0.15em]">Hidden charges</div>
              <p className="mt-3 text-sm">Quote up front. No add-ons mid-job.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
