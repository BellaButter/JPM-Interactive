import HeroSection from "@/sections/HeroSection";
// import HeroV2 from "@/sections/home/hero/HeroV2";
import WhoWeAreSection from "@/sections/WhoWeAreSection";
import ServicesSection from "@/sections/ServicesSection";
import WorksSection from "@/sections/WorksSection";
import CTASection from "@/sections/CTASection";
import ScrollToTop from "@/components/utils/ScrollToTop";

export default function HomePage() {
  return (
    <main className="relative min-h-full w-full max-w-[100vw] overflow-x-hidden flex flex-col items-center">
      {/* พื้นหลัง fixed — สีขาวทั้งหมด */}
      <div
        className="fixed inset-0 w-full h-full bg-white -z-[1]"
        aria-hidden
      />
      <div className="relative z-0 w-full flex flex-col items-center">
        <ScrollToTop />
        <HeroSection />
        <WhoWeAreSection />
        <ServicesSection />
        <WorksSection />
        <CTASection />
      </div>
    </main>
  );
}
