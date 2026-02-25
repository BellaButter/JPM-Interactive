"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "@/context/LocaleContext";
import { useMotion } from "@/system/motion/useMotion";

const JOURNEY_STEPS = [
    { id: "idea", icon: "idea" },
    { id: "design", icon: "design" },
    { id: "build", icon: "build" },
    { id: "launch", icon: "launch" },
] as const;

function StepIcon({ type, size = 24 }: { type: string; size?: number }) {
    const stroke = size <= 18 ? 1.5 : 2;
    switch (type) {
        case "idea":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                    <path d="M15.09 14c.18-.98.65-1.74 1.76-2.5C17.93 10.5 19 9 19 6a7 7 0 0 0-14 0c0 3 1.07 4.5 2.15 5.5 1.11.76 1.58 1.52 1.76 2.5" />
                    <path d="M12 2v2" />
                    <path d="M4 12H2" />
                    <path d="M22 12h-2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 4.93-1.41 1.41" />
                </svg>
            );
        case "design":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
            );
        case "build":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
            );
        case "launch":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                    <path d="M4 22v-7" />
                </svg>
            );
        default:
            return null;
    }
}

export default function CTAVisualStory() {
    const { t } = useLocale();
    const { reducedMotion } = useMotion();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const pathLength = useTransform(
        scrollYProgress,
        [0, 0.2, 0.5, 0.8, 1],
        [0, 0.33, 0.66, 0.9, 1]
    );
    const lineOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

    // Stagger opacity for each step
    const step1Opacity = useTransform(scrollYProgress, [0.1, 0.25, 0.4], [0, 1, 1]);
    const step2Opacity = useTransform(scrollYProgress, [0.25, 0.4, 0.55], [0, 1, 1]);
    const step3Opacity = useTransform(scrollYProgress, [0.4, 0.55, 0.7], [0, 1, 1]);
    const step4Opacity = useTransform(scrollYProgress, [0.55, 0.7, 0.85], [0, 1, 1]);

    const stepOpacities = [step1Opacity, step2Opacity, step3Opacity, step4Opacity];

    // Horizontal path for desktop: M 0 50 Q 200 0 400 50 Q 600 100 800 50 Q 1000 0 1200 50
    const pathD = "M 0 50 Q 150 0 300 50 Q 450 100 600 50 Q 750 0 900 50 Q 1050 100 1200 50";

    return (
        <div ref={containerRef} className="w-full py-12 sm:py-16 md:py-20">
            {/* Desktop: horizontal path with steps */}
            <div className="hidden md:block relative w-full max-w-4xl mx-auto">
                <svg
                    className="absolute w-full h-24 top-1/2 -translate-y-1/2"
                    viewBox="0 0 1200 100"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="cta-path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#6B9FF7" />
                            <stop offset="50%" stopColor="#8B9FF8" />
                            <stop offset="100%" stopColor="#8B5CF6" />
                        </linearGradient>
                    </defs>
                    <motion.path
                        d={pathD}
                        fill="none"
                        stroke="url(#cta-path-gradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ pathLength, opacity: lineOpacity }}
                    />
                </svg>

                <div className="relative flex justify-between items-center">
                    {JOURNEY_STEPS.map((step, i) => (
                        <motion.div
                            key={step.id}
                            className="flex flex-col items-center gap-2"
                            style={reducedMotion ? {} : { opacity: stepOpacities[i] }}
                        >
                            <div className="w-14 h-14 rounded-full bg-white/90 shadow-lg border border-[#7BA9F7]/20 flex items-center justify-center text-[#6B9FF7]">
                                <StepIcon type={step.icon} />
                            </div>
                            <span className="text-sm font-semibold text-slate-700">
                                {t(`sections.cta.journey.${step.id}`)}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Mobile: vertical timeline */}
            <div className="md:hidden relative pl-8">
                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#6B9FF7] via-[#8B9FF8] to-[#8B5CF6] opacity-30" />
                {JOURNEY_STEPS.map((step, i) => (
                    <motion.div
                        key={step.id}
                        className="relative flex items-center gap-4 pb-8 last:pb-0"
                        initial={reducedMotion ? false : { opacity: 0, x: -20 }}
                        whileInView={reducedMotion ? {} : { opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                        <div className="absolute -left-4 w-8 h-8 rounded-full bg-white shadow-md border-2 border-[#7BA9F7]/30 flex items-center justify-center text-[#6B9FF7] z-10">
                            <StepIcon type={step.icon} size={18} />
                        </div>
                        <div className="flex-1 pt-1">
                            <span className="text-base font-semibold text-slate-700">
                                {t(`sections.cta.journey.${step.id}`)}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
