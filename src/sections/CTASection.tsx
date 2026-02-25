"use client";

import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { useLocale } from "@/context/LocaleContext";
import { prefixPath } from "@/i18n/config";

/* ─── Lazy-load 3D ────────────────────────────────────────────── */
const CTAScene3D = dynamic(() => import("@/sections/cta/CTAScene3D"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-[#6B9FF7]/30 border-t-[#6B9FF7] animate-spin" />
        </div>
    ),
});

const BG = "#ffffff";

/* ─── Decorative background ───────────────────────────────────── */
function Background() {
    return (
        <>
            {/* Subtle dot-grid only */}
            <div className="absolute inset-0 opacity-[0.09]" aria-hidden
                style={{
                    backgroundImage: "radial-gradient(rgba(107,159,247,.7) 1px, transparent 1px)",
                    backgroundSize: "clamp(24px,4vw,40px) clamp(24px,4vw,40px)",
                }} />
        </>
    );
}

/* ─── Floating badge pill ─────────────────────────────────────── */
function FloatingBadge({
    label, x, y, delay, color,
}: {
    label: string; x: string; y: string; delay: number; color: string;
}) {
    return (
        // Outer: entrance only (spring ok — only 2 keyframes: initial→whileInView)
        <motion.div
            className="absolute hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap pointer-events-none select-none"
            style={{
                left: x, top: y,
                background: `${color}18`,
                border: `1px solid ${color}55`,
                color,
                boxShadow: `0 4px 18px ${color}22`,
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
        >
            {/* Inner: continuous float — use ease, NOT spring */}
            <motion.span
                className="flex items-center gap-1.5"
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3 + delay * 0.5, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
            >
                <span className="text-[10px]">✦</span>
                {label}
            </motion.span>
        </motion.div>
    );
}

/* ─── Sparkle / star accent ───────────────────────────────────── */
function Sparkle({ x, y, size = 6, delay = 0 }: { x: string; y: string; size?: number; delay?: number }) {
    return (
        /* Entrance wrapper — tween only, 2 keyframes */
        <motion.div
            className="absolute pointer-events-none hidden sm:block"
            style={{ left: x, top: y, width: size, height: size }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            {/* Continuous spin + pulse — ease only, no spring */}
            <motion.svg
                viewBox="0 0 24 24" fill="currentColor"
                style={{ color: "#9C84F7", width: "100%", height: "100%" }}
                animate={{ rotate: 360, opacity: [1, 0.32, 1] }}
                transition={{
                    rotate: { duration: 5 + delay, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay },
                }}
            >
                <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
            </motion.svg>
        </motion.div>
    );
}

/* ─── CTA button ──────────────────────────────────────────────── */
function CTAButton() {
    const { t, locale } = useLocale();
    return (
        <Link href={prefixPath(locale, "/contact")} className="inline-block">
            <motion.button
                className="relative group inline-flex items-center gap-3 font-bold rounded-full overflow-hidden"
                style={{ cursor: "pointer", padding: "16px 36px", fontSize: "1rem" }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
                <span className="absolute inset-0 bg-gradient-to-r from-[#6B9FF7] via-[#8B6CF7] to-[#C084FC]" />
                <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: "-100%" }} whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
                <span className="relative z-10 text-white">{t("sections.getInTouch")}</span>
                <span className="relative z-10 text-white">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </span>
            </motion.button>
        </Link>
    );
}

/* ─── Ghost secondary link ────────────────────────────────────── */
function GhostLink() {
    const { locale } = useLocale();
    return (
        <Link href={prefixPath(locale, "/case-studies")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#6B9FF7] transition-colors duration-200 group">
            <span>See our work</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </Link>
    );
}

/* ─── Service tags ────────────────────────────────────────────── */
const SERVICES = ["Interactive Installation", "Immersive Experience", "Multimedia & Creative Technology"];

/* ═══════════════════════════════════════════════════════════════ */
/* MAIN CTA SECTION                                                 */
/* 200vh sticky — scroll spins the 3D character                    */
/* ═══════════════════════════════════════════════════════════════ */
export default function CTASection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const scrollProgressRef = useRef(0);
    const { t } = useLocale();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    scrollYProgress.on("change", (v) => { scrollProgressRef.current = v; });

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-x-hidden min-w-0"
            style={{
                height: "100vh",
                minHeight: "100vh",
                background: BG,
                marginTop: "clamp(2.5rem, 10vw, 5rem)",
                paddingTop: "clamp(2rem, 8vw, 4rem)",
                paddingBottom: "clamp(5rem, 18vw, 6rem)",
                paddingLeft: "max(1rem, env(safe-area-inset-left))",
                paddingRight: "max(1rem, env(safe-area-inset-right))",
            }}
        >
            <div className="h-full min-h-0 w-full overflow-x-hidden overflow-y-auto lg:overflow-hidden scrollbar-hide
                            flex flex-col-reverse lg:flex-row items-stretch min-w-0">
                <Background />

                {/* LEFT / BOTTOM — Text content (lower z so 3D stays visible on mobile) */}
                <div
                    className="relative z-[5] lg:z-10 min-w-0 max-w-full flex-none lg:flex-1
                               flex flex-col justify-center items-center lg:items-start
                               text-center lg:text-left"
                    style={{
                        paddingLeft: "clamp(1.25rem, 5vw, 7.5rem)",
                        paddingRight: "clamp(1.25rem, 5vw, 4rem)",
                        paddingBottom: "clamp(5rem, 16vw, 6rem)",
                        gap: "clamp(1.5rem, 3vw, 2.5rem)",
                    }}
                >


                    {/* Headline */}
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="font-bold tracking-tight"
                        style={{ fontSize: "clamp(2rem, 5.5vw, 4.2rem)", lineHeight: 1.6 }}
                    >
                        <span className="text-slate-800">{t("sections.cta.singleAct.headlinePart1")}</span><br />
                        <span style={{ display: "inline-flex", flexDirection: "column", gap: "5px", verticalAlign: "bottom" }}>
                            <span className="bg-gradient-to-r from-[#6B9FF7] to-[#C084FC] bg-clip-text text-transparent">
                                {t("sections.cta.singleAct.headlineHighlight")}
                            </span>
                            <motion.span
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ duration: 0.75, delay: 0.9, ease: "easeOut" }}
                                viewport={{ once: true }}
                                style={{
                                    display: "block",
                                    height: "3px",
                                    borderRadius: "9999px",
                                    background: "linear-gradient(to right, #6B9FF7, #C084FC)",
                                    originX: 0,
                                }}
                            />
                        </span><br />
                        <span className="text-slate-800 sm:whitespace-nowrap">
                            {t("sections.cta.singleAct.headlinePart3")}
                        </span>
                    </motion.h2>

                    {/* Sub */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.28 }}
                        viewport={{ once: true }}
                        className="text-sm sm:text-base lg:text-lg text-slate-500 leading-relaxed max-w-[30rem]"
                    >
                        {t("sections.cta.singleAct.subtitle")}
                    </motion.p>

                    {/* Service tags row */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center lg:justify-start gap-3"
                    >
                        {SERVICES.map((svc, i) => (
                            <motion.span
                                key={svc}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.45 + i * 0.07 }}
                                viewport={{ once: true }}
                                className="rounded-full font-medium text-slate-600"
                                style={{
                                    background: "rgba(107,159,247,.09)",
                                    border: "1px solid rgba(107,159,247,.2)",
                                    padding: "10px 20px",
                                    fontSize: "0.8rem",
                                    letterSpacing: "0.01em",
                                }}
                            >
                                {svc}
                            </motion.span>
                        ))}
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.55 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row items-center gap-5"
                    >
                        <CTAButton />
                        <GhostLink />
                    </motion.div>


                </div>

                {/*
                    RIGHT / TOP — 3D Scene + floating badges (higher z on mobile so not covered by text)
                ══════════════════════════════════════════════ */}
                <div className="relative z-20 lg:z-10
                                flex-1 lg:flex-1 w-full shrink-0
                                h-[42vh] min-h-[260px] sm:h-[48vw] sm:min-h-[280px] lg:h-full lg:min-h-0
                                max-h-[400px] lg:max-h-none">

                    {/* Purple halo behind character */}
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 55%,rgba(139,156,248,.18) 0%,transparent 70%)" }} />

                    {/* 3D Canvas */}
                    <CTAScene3D scrollProgress={scrollProgressRef} />

                    {/* Sparkle accents */}
                    <Sparkle x="12%" y="18%" size={8} delay={0} />
                    <Sparkle x="78%" y="12%" size={6} delay={0.4} />
                    <Sparkle x="88%" y="72%" size={10} delay={0.9} />
                    <Sparkle x="6%" y="80%" size={5} delay={1.4} />

                    {/* Floating service badges around character */}
                    <FloatingBadge label="Interactive Installation" x="2%" y="22%" delay={0.2} color="#6B9FF7" />
                    <FloatingBadge label="Immersive Experience" x="2%" y="65%" delay={0.5} color="#9C84F7" />
                    <FloatingBadge label="Multimedia & Creative" x="64%" y="8%" delay={0.35} color="#B57CF7" />
                    <FloatingBadge label="Creative Technology" x="60%" y="82%" delay={0.7} color="#C084FC" />
                </div>
            </div>
        </section>
    );
}
