"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { serviceContent } from "@/data/servicePageContent";
import type { Locale } from "@/types/locale";
/* ─── Slug map ───────────────────────────────────────────── */
const serviceSlugMap = {
    interactive: "interactive-installation",
    visual: "immersive-experience",
    multimedia: "multimedia-systems",
} as const;

/* ─── Per-service visual config ─────────────────────────── */
const serviceConfig = {
    interactive: {
        gradient: "from-blue-500 to-violet-600",
        orb: "from-blue-400/20 to-violet-600/10",
        badge: "bg-blue-50 text-blue-600 border border-blue-200",
        iconStroke: "#6B9FF7",
        iconD: "M13 10V3L4 14h7v7l9-11h-7z",
    },
    visual: {
        gradient: "from-violet-500 to-purple-600",
        orb: "from-violet-400/20 to-fuchsia-600/10",
        badge: "bg-violet-50 text-violet-600 border border-violet-200",
        iconStroke: "#8B5CF6",
        iconD: "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
    },
    multimedia: {
        gradient: "from-cyan-500 to-blue-600",
        orb: "from-cyan-400/20 to-blue-600/10",
        badge: "bg-cyan-50 text-cyan-700 border border-cyan-200",
        iconStroke: "#06B6D4",
        iconD: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    },
} as const;

/* ─── Reusable fade-up animation ────────────────────────── */
function fadeUp(delay = 0) {
    return {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" as const },
        transition: { duration: 0.6, delay, ease: "easeOut" as const },
    };
}

/* ─── Service Card ───────────────────────────────────────── */
function ServiceCard({
    serviceKey,
    locale,
}: {
    serviceKey: keyof typeof serviceSlugMap;
    locale: Locale;
}) {
    const c = serviceContent[locale][serviceKey];
    const cfg = serviceConfig[serviceKey];
    const href = `/${locale}/services/${serviceSlugMap[serviceKey]}`;
    const isEN = locale === "en";

    return (
        <Link href={href} className="block h-full">
            <motion.div
                {...fadeUp(0)}
                className="relative flex h-full flex-col w-full rounded-2xl overflow-hidden border border-slate-200/60 bg-white shadow-md hover:shadow-xl hover:border-slate-300/60 transition-all duration-300 group cursor-pointer"
            >
                {/* Orb accent */}
                <div className={`pointer-events-none absolute top-0 right-0 w-72 h-72 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${cfg.orb} to-transparent rounded-full -translate-y-1/3 translate-x-1/3`} />

                <div className="relative flex flex-col flex-1 min-h-0" style={{ padding: "clamp(3.25rem, 8vw, 4rem)" }}>
                    {/* Icon + badge row */}
                    <div className="flex items-center gap-4" style={{ marginBottom: "3rem" }}>
                        <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${cfg.gradient} shadow-md`}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d={cfg.iconD} />
                            </svg>
                        </div>
                        <span className={`text-xs font-semibold uppercase tracking-wider rounded-full ${cfg.badge}`} style={{ padding: "0.5rem 1rem" }}>
                            {c.title}
                        </span>
                    </div>

                    {/* Headline block */}
                    <div className="mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight mb-6" style={{ lineHeight: 1.45, whiteSpace: "pre-line" }}>
                            {c.h1}
                        </h2>
                        <p className="text-slate-500 text-base" style={{ lineHeight: 2 }}>{c.description}</p>
                    </div>

                    {/* Solution previews - with visual separation */}
                    <div className="flex-1 border-t border-slate-200/60" style={{ paddingTop: "3rem", marginBottom: "2.5rem" }}>
                        <ul className="flex flex-col" style={{ gap: "1.5rem" }}>
                            {c.solutions.items.slice(0, 3).map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-slate-600" style={{ lineHeight: 1.7 }}>
                                    <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 bg-gradient-to-r ${cfg.gradient}`} />
                                    {item.title}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CTA */}
                    <div className="mt-auto" style={{ paddingTop: "2rem" }}>
                        <span
                            className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${cfg.gradient} bg-clip-text text-transparent group-hover:gap-3 transition-all duration-200`}
                        >
                            {isEN ? "Learn more" : "ดูรายละเอียด"}
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={cfg.iconStroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                            </svg>
                        </span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

/* ─── Shared layout wrapper (matches Navigation centering) ─── */
const LAYOUT_PADDING = {
    paddingLeft: "clamp(1.75rem, 6vw, 4rem)" as const,
    paddingRight: "clamp(1.75rem, 6vw, 4rem)" as const,
};

/* ─── Margin ระหว่าง section ───────────────────────────────── */
const SECTION_MARGIN = {
    marginTop: "clamp(1.5rem, 4vw, 2.25rem)" as const,
    marginBottom: "clamp(1.5rem, 4vw, 2.25rem)" as const,
};

/* ─── Main ───────────────────────────────────────────────── */
export function ServicesOverviewContent({ locale }: { locale: Locale }) {
    const isEN = locale === "en";

    return (
        <main className="relative bg-white min-h-screen overflow-x-hidden w-full max-w-[100vw] min-w-0">
            {/* ── HERO: full-width BG ───────────────────────────────────── */}
            <section className="relative w-full overflow-hidden" style={{ paddingTop: "clamp(5rem, 11vw, 8rem)", paddingBottom: "clamp(1rem, 4vw, 1.75rem)", marginBottom: "clamp(0.75rem, 2vw, 1rem)" }}>
                {/* Background - เต็มจอ */}
                <div className="pointer-events-none absolute inset-0 w-[100vw] left-1/2 -translate-x-1/2 bg-gradient-to-br from-blue-50/90 via-violet-50/70 to-cyan-50/80" aria-hidden style={{ maxWidth: "100vw" }} />
                <div className="pointer-events-none absolute inset-0 w-[100vw] left-1/2 -translate-x-1/2" aria-hidden style={{ maxWidth: "100vw" }}>
                    <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400/15 via-violet-400/10 to-transparent" />
                    <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-400/15 via-cyan-400/10 to-transparent" />
                </div>

                <div className="relative z-10 flex flex-col items-center text-center w-full" style={LAYOUT_PADDING}>
                    <motion.div {...fadeUp(0)}>
                        <span
                            className="inline-block rounded-full text-base font-semibold uppercase tracking-widest bg-white border border-slate-200 text-slate-500 shadow-sm text-center"
                            style={{ padding: "1rem 1.5rem", marginBottom: "3rem" }}
                        >
                            {isEN ? "What We Do" : "สิ่งที่เราทำ"}
                        </span>
                    </motion.div>

                    <motion.h1 {...fadeUp(0.06)} className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 tracking-tight mb-8 w-full" style={{ lineHeight: 1.25 }}>
                        {isEN ? (
                            <>
                                Interactive <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-purple-600 bg-clip-text text-transparent">Services</span>
                                {" "}for Your Vision
                            </>
                        ) : (
                            <>
                                บริการ<span className="bg-gradient-to-r from-blue-500 via-violet-500 to-purple-600 bg-clip-text text-transparent">ครบวงจร</span>
                                {" "}เพื่อวิสัยทัศน์ของคุณ
                            </>
                        )}
                    </motion.h1>

                    <motion.p {...fadeUp(0.12)} className="text-slate-500 text-base sm:text-lg md:text-xl max-w-2xl w-full text-center" style={{ lineHeight: 2 }}>
                        {isEN
                            ? "End-to-end Interactive Installation, Immersive Experience, and Multimedia Systems for organizations, exhibitions, and corporate spaces."
                            : "บริการ Interactive Installation, Immersive Experience และ Multimedia Systems แบบครบวงจรสำหรับองค์กร งานนิทรรศการ และพื้นที่จัดแสดง"}
                    </motion.p>

                    {/* Stats bar */}
                    <motion.div {...fadeUp(0.18)} className="mt-12 flex flex-wrap justify-center gap-8 sm:gap-12" style={{ marginBottom: "clamp(1.25rem, 4vw, 2.5rem)" }}>
                        {[
                            { n: "50+", label: isEN ? "Projects Delivered" : "โปรเจกต์สำเร็จ" },
                            { n: "5+", label: isEN ? "Years Experience" : "ปีประสบการณ์" },
                            { n: "30+", label: isEN ? "Happy Clients" : "ลูกค้าไว้ใจ" },
                        ].map((s) => (
                            <div key={s.n} className="text-center">
                                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">{s.n}</div>
                                <div className="text-xs text-slate-500 mt-0.5 font-medium">{s.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Outer: padding + flex center (same as Navigation) */}
            <div className="w-full flex justify-center" style={LAYOUT_PADDING}>
                <div className="w-full max-w-[1600px] flex flex-col">
                    {/* ── SERVICE CARDS ──────────────────────────────────── */}
                    <section className="relative z-10 w-full" style={{ ...SECTION_MARGIN, paddingTop: "clamp(1rem, 3vw, 1.75rem)", paddingBottom: "clamp(2rem, 6vw, 3.5rem)" }}>
                        {/* Tablet (iPad): 1 column to avoid narrow cards + vertical overflow; desktop: 3 columns */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 lg:items-stretch" style={{ gap: "clamp(2.5rem, 8vw, 5rem)" }}>
                            {(["interactive", "visual", "multimedia"] as const).map((key) => (
                                <ServiceCard key={key} serviceKey={key} locale={locale} />
                            ))}
                        </div>
                    </section>

                    {/* ── CTA BANNER ─────────────────────────────────────── */}
                    <section className="relative w-full" style={{ ...SECTION_MARGIN, paddingTop: "clamp(2rem, 6vw, 3.5rem)", paddingBottom: "clamp(2rem, 6vw, 3.5rem)" }}>
                        <motion.div
                            {...fadeUp(0)}
                            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4F46E5] via-[#6B9FF7] to-[#8B5CF6] text-center text-white shadow-2xl shadow-[#6B9FF7]/20"
                            style={{ padding: "clamp(3rem, 8vw, 5rem) clamp(2rem, 5vw, 3.5rem)" }}
                        >
                            {/* Orbs inside banner */}
                            <div className="pointer-events-none absolute top-0 left-0 w-64 h-64 rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent -translate-y-1/2 -translate-x-1/2" aria-hidden />
                            <div className="pointer-events-none absolute bottom-0 right-0 w-64 h-64 rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent translate-y-1/2 translate-x-1/2" aria-hidden />

                            <div className="relative z-10 flex flex-col items-center" style={{ textAlign: "center" }}>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-[1.3]">
                                    {isEN
                                        ? "Not sure which service fits your project?"
                                        : "ยังไม่แน่ใจว่าบริการไหนเหมาะกับโปรเจกต์ของคุณ?"}
                                </h2>
                                <p className="text-white/75 mx-auto mb-10 text-base sm:text-lg md:text-xl" style={{ lineHeight: 1.95, textAlign: "center", maxWidth: "42rem" }}>
                                    {isEN
                                        ? "Talk to us — we'll help you find the right solution for your space and goals."
                                        : <>ปรึกษาทีมเรา เราจะช่วยหาแนวทางที่เหมาะสมที่สุดสำหรับโปรเจกต์<span style={{ whiteSpace: "nowrap" }}>ของคุณ</span></>}
                                </p>
                                <Link
                                    href={`/${locale}/contact`}
                                    className="inline-flex items-center gap-2 rounded-full bg-white text-[#4F46E5] font-bold text-sm sm:text-base shadow-lg hover:bg-blue-50 hover:-translate-y-0.5 transition-all duration-300"
                                    style={{ padding: "clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)" }}
                                >
                                    {isEN ? "Get a Free Consultation" : "ปรึกษาฟรี"}
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </Link>
                            </div>
                        </motion.div>
                    </section>

                </div>
            </div>
        </main>
    );
}
