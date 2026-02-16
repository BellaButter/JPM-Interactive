import HeroSection from "@/sections/HeroSection";
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
      <ScrollToTop />
      {/* Hero เต็มความกว้าง */}
      <HeroSection />
      {/* เนื้อหากลางมี padding ด้านข้าง */}
      <div
        className="relative z-0 w-full flex flex-col items-center box-border max-w-[1600px] mx-auto w-full"
        style={{
          paddingLeft: "clamp(1.25rem, 5vw, 2rem)",
          paddingRight: "clamp(1.25rem, 5vw, 2rem)",
        }}
      >
        <WhoWeAreSection />
        <ServicesSection />
        <WorksSection />
      </div>
      {/* CTA เต็มความกว้าง */}
      <CTASection />
    </main>
  );
}
