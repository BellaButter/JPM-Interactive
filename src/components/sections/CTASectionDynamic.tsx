"use client";

import dynamic from "next/dynamic";
import CTAPlaceholder from "./CTAPlaceholder";

const CTASection = dynamic(
  () => import("@/sections/CTASection"),
  { ssr: false, loading: () => <CTAPlaceholder /> }
);

export default function CTASectionDynamic() {
  return <CTASection />;
}
