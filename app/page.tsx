import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/landing/Hero";
import ServicesPreview from "@/components/landing/ServicesPreview";
import WhyDecode from "@/components/landing/WhyDecode";
import CallToBook from "@/components/landing/CallToBook";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ServicesPreview />
        <WhyDecode />
        <CallToBook />
      </main>
      <Footer />
    </>
  );
}
