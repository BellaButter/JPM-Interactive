"use client";

import dynamic from "next/dynamic";
import WhoWeAreSection from "@/sections/WhoWeAreSection";
import ServicesSection from "@/sections/ServicesSection";
import WorksSection from "@/sections/WorksSection";
import ScrollToTop from "@/components/utils/ScrollToTop";
import HeroPlaceholder from "@/components/placeholders/HeroPlaceholder";
import CTAPlaceholder from "@/components/placeholders/CTAPlaceholder";
import ThHomeMiddleSections from "@/sections/home/ThHomeMiddleSections";
import { useMotion } from "@/system/motion/useMotion";

const HeroSection = dynamic(
  () => import("@/sections/HeroSection"),
  { ssr: false, loading: () => <HeroPlaceholder /> }
);

const CTASection = dynamic(
  () => import("@/sections/CTASection"),
  { ssr: false, loading: () => <CTAPlaceholder /> }
);

export default function ThHomeContent() {
  const { isReady } = useMotion();

  return (
    <main className="relative min-h-full w-full max-w-[100vw] overflow-x-hidden flex flex-col items-center">
      <div
        className="fixed inset-0 w-full h-full bg-white -z-[1]"
        aria-hidden
      />
      <ScrollToTop />
      <HeroSection />
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
        <ThHomeMiddleSections />
      </div>
      {!isReady ? <CTAPlaceholder /> : <CTASection />}
    </main>
  );
}
