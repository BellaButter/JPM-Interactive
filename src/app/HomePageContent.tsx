"use client";

import dynamic from "next/dynamic";
import ScrollToTop from "@/components/utils/ScrollToTop";
import HeroPlaceholder from "@/components/placeholders/HeroPlaceholder";
import CTAPlaceholder from "@/components/placeholders/CTAPlaceholder";
import { useMotion } from "@/system/motion/useMotion";

const HeroSection = dynamic(
  () => import("@/sections/HeroSection"),
  { ssr: false, loading: () => <HeroPlaceholder /> }
);

const WhoWeAreSection = dynamic(() => import("@/sections/WhoWeAreSection"));
const ServicesSection = dynamic(() => import("@/sections/ServicesSection"));
const WorksSection = dynamic(() => import("@/sections/WorksSection"));
const EnHomeMiddleSections = dynamic(() => import("@/sections/home/EnHomeMiddleSections"));

const CTASection = dynamic(
  () => import("@/sections/CTASection"),
  { ssr: false, loading: () => <CTAPlaceholder /> }
);

export default function HomePageContent() {
  const { isReady } = useMotion();

  return (
    <main className="relative min-h-full w-full max-w-[100vw] overflow-x-hidden flex flex-col items-center min-w-0">
      {/* พื้นหลัง fixed — สีขาวทั้งหมด */}
      <div
        className="fixed inset-0 w-full h-full bg-white -z-[1]"
        aria-hidden
      />
      <ScrollToTop />
      {/* Hero เต็มความกว้าง - lazy loaded for faster mobile first paint */}
      <HeroSection />
      {/* เนื้อหากลางมี padding ด้านข้าง — overflow-y-visible ป้องกัน internal scrollbar */}
      <div
        className="relative z-0 w-full flex flex-col items-center box-border max-w-[1600px] mx-auto w-full overflow-y-visible"
        style={{
          paddingLeft: "clamp(1.25rem, 5vw, 2rem)",
          paddingRight: "clamp(1.25rem, 5vw, 2rem)",
        }}
      >
        <WhoWeAreSection />
      </div>
      {/* Services เต็มความกว้างจอ เพื่อให้เส้นโค้งเริ่มจากขอบจอ */}
      <ServicesSection />
      <div
        className="relative z-0 w-full flex flex-col items-center box-border max-w-[1600px] mx-auto w-full"
        style={{
          paddingLeft: "clamp(1.25rem, 5vw, 2rem)",
          paddingRight: "clamp(1.25rem, 5vw, 2rem)",
        }}
      >
        <WorksSection />
        <EnHomeMiddleSections />
      </div>
      {/* CTA: unified responsive section (no video) */}
      {!isReady ? <CTAPlaceholder /> : <CTASection />}
    </main>
  );
}
