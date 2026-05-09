import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/landing/Hero";
import TrustBar from "@/components/landing/TrustBar";
import ServicesPreview from "@/components/landing/ServicesPreview";
import WhyDecode from "@/components/landing/WhyDecode";
import CallToBook from "@/components/landing/CallToBook";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <ServicesPreview />
        <WhyDecode />
        <CallToBook />
      </main>
      <Footer />
    </>
  );
}
