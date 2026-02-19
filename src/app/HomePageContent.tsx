"use client";

import dynamic from "next/dynamic";
import WhoWeAreSection from "@/sections/WhoWeAreSection";
import ServicesSection from "@/sections/ServicesSection";
import WorksSection from "@/sections/WorksSection";
import ScrollToTop from "@/components/utils/ScrollToTop";
import HeroPlaceholder from "@/components/placeholders/HeroPlaceholder";
import CTAPlaceholder from "@/components/placeholders/CTAPlaceholder";
import { useMotion } from "@/system/motion/useMotion";

const HeroSection = dynamic(
  () => import("@/sections/HeroSection"),
  { ssr: false, loading: () => <HeroPlaceholder /> }
);

const CTASection = dynamic(
  () => import("@/sections/CTASection"),
  { ssr: false, loading: () => <CTAPlaceholder /> }
);

const CTASectionMobile = dynamic(
  () => import("@/sections/CTASectionMobile"),
  { ssr: false, loading: () => <CTAPlaceholder /> }
);

export default function HomePageContent() {
  const { isReady, isPhone } = useMotion();

  return (
    <main className="relative min-h-full w-full max-w-[100vw] overflow-x-hidden flex flex-col items-center">
      {/* พื้นหลัง fixed — สีขาวทั้งหมด */}
      <div
        className="fixed inset-0 w-full h-full bg-white -z-[1]"
        aria-hidden
      />
      <ScrollToTop />
      {/* Hero เต็มความกว้าง - lazy loaded for faster mobile first paint */}
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
      {/* CTA: phone = lightweight (no Canvas/GSAP), PC/iPad = full */}
      {!isReady ? (
        <CTAPlaceholder />
      ) : isPhone ? (
        <CTASectionMobile />
      ) : (
        <CTASection />
      )}
    </main>
  );
}
