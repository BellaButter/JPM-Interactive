"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/context/LocaleContext";

/* ─── Steps ──────────────────────────────────────────────────── */
const STEPS = [
    {
        id: "idea",
        number: "01",
        desc: "Your vision, your goals",
        color: "#6B9FF7",
        glow: "rgba(107,159,247,0.22)",
        bg: "rgba(107,159,247,0.08)",
        border: "rgba(107,159,247,0.3)",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.76-2.5C17.93 10.5 19 9 19 6a7 7 0 0 0-14 0c0 3 1.07 4.5 2.15 5.5 1.11.76 1.58 1.52 1.76 2.5" />
            </svg>
        ),
    },
    {
        id: "design",
        number: "02",
        desc: "Crafted pixel-by-pixel",
        color: "#9C84F7",
        glow: "rgba(156,132,247,0.22)",
        bg: "rgba(156,132,247,0.08)",
        border: "rgba(156,132,247,0.3)",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
        ),
    },
    {
        id: "build",
        number: "03",
        desc: "Engineered with care",
        color: "#B57CF7",
        glow: "rgba(181,124,247,0.22)",
        bg: "rgba(181,124,247,0.08)",
        border: "rgba(181,124,247,0.3)",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        ),
    },
    {
        id: "launch",
        number: "04",
        desc: "Live & ready to grow",
        color: "#C084FC",
        glow: "rgba(192,132,252,0.22)",
        bg: "rgba(192,132,252,0.08)",
        border: "rgba(192,132,252,0.3)",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <line x1="4" y1="22" x2="4" y2="15" />
            </svg>
        ),
    },
];

/* ─── Individual card ────────────────────────────────────────── */
function StepCard({ step, index }: { step: typeof STEPS[0]; index: number }) {
    const { t } = useLocale();
    return (
        <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col items-center gap-4 w-full"
        >
            {/* Icon circle */}
            <div
                className="relative w-[clamp(72px,10vw,96px)] h-[clamp(72px,10vw,96px)] rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                    background: step.bg,
                    border: `2px solid ${step.border}`,
                    boxShadow: `0 8px 32px ${step.glow}`,
                }}
            >
                {/* Spinning accent ring */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                        border: "2px solid transparent",
                        borderTopColor: step.color,
                        borderRightColor: `${step.color}44`,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <span style={{ color: step.color }}>{step.icon}</span>
            </div>

            {/* Number pill */}
            <span
                className="text-[10px] font-bold tracking-[0.22em] uppercase px-2.5 py-0.5 rounded-full"
                style={{
                    color: step.color,
                    background: step.bg,
                    border: `1px solid ${step.border}`,
                }}
            >
                {step.number}
            </span>

            {/* Label */}
            <span className="text-base sm:text-lg font-bold text-slate-700 text-center leading-snug">
                {t(`sections.cta.journey.${step.id}`)}
            </span>

            {/* Description */}
            <span className="text-xs sm:text-sm text-slate-400 text-center max-w-[140px] leading-relaxed">
                {step.desc}
            </span>
        </motion.div>
    );
}

/* ─── Horizontal connecting line (desktop only) ───────────────── */
function ConnectingLine() {
    return (
        /* Positioned over icon row; only visible on sm+ */
        <div className="absolute left-0 right-0 pointer-events-none hidden sm:block"
            style={{ top: "calc(clamp(72px,10vw,96px) / 2)" }}>
            <svg className="w-full h-5" viewBox="0 0 1000 20" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="wave-g2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6B9FF7" />
                        <stop offset="50%" stopColor="#9C84F7" />
                        <stop offset="100%" stopColor="#C084FC" />
                    </linearGradient>
                </defs>
                <motion.path
                    d="M 0 10 Q 250 2 500 10 Q 750 18 1000 10"
                    fill="none"
                    stroke="url(#wave-g2)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="7 7"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.4, delay: 0.3, ease: "easeInOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                />
            </svg>
        </div>
    );
}

/* ─── Title block ────────────────────────────────────────────── */
function JourneyTitle() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-14 sm:mb-20 px-4"
        >
            <span className="text-[10px] sm:text-xs tracking-[0.35em] uppercase font-bold text-[#6B9FF7]">
                How we work
            </span>
            <h3 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-bold text-slate-800 leading-tight">
                The{" "}
                <span className="bg-gradient-to-r from-[#6B9FF7] to-[#C084FC] bg-clip-text text-transparent">
                    Journey
                </span>
            </h3>
            <p className="mt-3 text-slate-500 text-sm sm:text-base max-w-sm sm:max-w-lg mx-auto leading-relaxed">
                From a spark of an idea to a live product — every step crafted with care.
            </p>
        </motion.div>
    );
}

/* ─── Export ─────────────────────────────────────────────────── */
export default function ScrollJourneySteps() {
    return (
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col items-center">
            <JourneyTitle />

            {/*
             * Mobile  (<sm): 2 × 2 grid   — 2 cards per row
             * Tablet  (≥sm): 4-column row — all cards in one line
             */}
            <div className="relative w-full
                            grid grid-cols-2 gap-y-12 gap-x-6
                            sm:grid-cols-4 sm:gap-y-0 sm:gap-x-0
                            items-start">
                {/* Connecting line sits over the icon row on desktop */}
                <ConnectingLine />

                {STEPS.map((step, i) => (
                    <StepCard key={step.id} step={step} index={i} />
                ))}
            </div>
        </div>
    );
}
