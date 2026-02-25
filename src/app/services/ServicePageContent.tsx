"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { serviceContent } from "@/data/servicePageContent";
import type { Locale } from "@/types/locale";
import Link from "next/link";

const LAYOUT_PADDING = {
  paddingLeft: "clamp(1.75rem, 6vw, 4rem)" as const,
  paddingRight: "clamp(1.75rem, 6vw, 4rem)" as const,
};

const SECTION_MARGIN = {
  marginTop: "clamp(1.5rem, 4vw, 2.25rem)" as const,
  marginBottom: "clamp(1.5rem, 4vw, 2.25rem)" as const,
};

const slugToKey = {
  "interactive-installation": "interactive" as const,
  "immersive-experience": "visual" as const,
  "multimedia-systems": "multimedia" as const,
};

const SLUG_ORDER: (keyof typeof slugToKey)[] = ["interactive-installation", "immersive-experience", "multimedia-systems"];

/* ─── Hero background config per service ─────────────────── */
const heroBgConfig = {
  interactive: {
    image: "/Image/Interactive Solutions.png",
    gradient: "from-blue-500 via-indigo-500 to-cyan-500",
    overlay: "bg-slate-900/55",
  },
  visual: {
    image: "/Image/Visual Experience.png",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    overlay: "bg-slate-900/55",
  },
  multimedia: {
    image: "/Image/Multimedia Design.png",
    gradient: "from-cyan-500 via-sky-500 to-blue-500",
    overlay: "bg-slate-900/55",
  },
} as const;

/* ─── Fade-up animation ──────────────────────────────────── */
function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" as const },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  };
}

/* ─── Service-specific icons ────────────────────────────── */
const serviceIcons = {
  interactive: {
    check: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    bullet: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
      </svg>
    ),
    card: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
      </svg>
    ),
  },
  visual: {
    check: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    bullet: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    card: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  multimedia: {
    check: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    bullet: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    card: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
  },
} as const;

/* ─── Main ───────────────────────────────────────────────── */
export function ServicePageContent({
  locale,
  slug,
}: {
  locale: Locale;
  slug: keyof typeof slugToKey;
}) {
  const key = slugToKey[slug];
  const c = serviceContent[locale][key];

    return (
    <main className="relative bg-white overflow-x-hidden w-full max-w-[100vw] min-w-0">
      {/* ══ HERO: full-width BG (service-specific image) ─══════════════ */}
      <section className="relative w-full overflow-hidden" style={{ paddingTop: "clamp(7rem, 15vw, 11rem)", paddingBottom: "clamp(2rem, 5vw, 3rem)", marginBottom: "clamp(1.5rem, 4vw, 2.25rem)" }}>
        {(() => {
          const bg = heroBgConfig[key];
          return (
            <>
              <div className="pointer-events-none absolute inset-0 w-[100vw] left-1/2 -translate-x-1/2" aria-hidden style={{ maxWidth: "100vw" }}>
                <div className="relative w-full h-full min-h-[280px]">
                  <Image
                    src={bg.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                  />
                </div>
              </div>
              <div className={`pointer-events-none absolute inset-0 w-[100vw] left-1/2 -translate-x-1/2 ${bg.overlay}`} aria-hidden style={{ maxWidth: "100vw" }} />
            </>
          );
        })()}

        <div className="relative z-10 flex flex-col items-center text-center w-full" style={LAYOUT_PADDING}>
          <motion.h1
            {...fadeUp(0)}
            className="font-bold text-white tracking-tight mb-8 w-full drop-shadow-lg"
            style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", lineHeight: 1.25 }}
          >
            <span className="text-white" style={{ whiteSpace: "pre-line" }}>
              {c.h1}
            </span>
          </motion.h1>
          <motion.p
            {...fadeUp(0.08)}
            className="text-white/90 text-lg sm:text-xl md:text-2xl max-w-3xl w-full text-center drop-shadow-md"
            style={{ lineHeight: 1.85 }}
          >
            {c.intro.body}
          </motion.p>
        </div>
      </section>

      {/* Outer: padding + flex center (same as Navigation) */}
      <div className="w-full flex justify-center" style={LAYOUT_PADDING}>
        <div className="w-full max-w-[1600px] flex flex-col">
          {/* ══ INTRO: highlights + what-is card ══════════════════ */}
          <section className="w-full bg-white" style={{ ...SECTION_MARGIN, padding: "clamp(2rem, 5vw, 3rem)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

            {/* Highlights */}
            <div>
              <motion.h2 {...fadeUp(0)} className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 tracking-tight leading-[1.3]" style={{ marginBottom: "2.5rem" }}>
                {c.intro.heading}
              </motion.h2>
              <div className="flex flex-col" style={{ gap: "1.25rem" }}>
                {c.intro.highlights.map((h, i) => (
                  <motion.div key={i} {...fadeUp(i * 0.07)} className="flex gap-4">
                    <div className="mt-1.5 w-7 h-7 shrink-0 rounded-full bg-[#7BA9F7]/15 text-[#6B9FF7] flex items-center justify-center">
                      {serviceIcons[key].check}
                    </div>
                    <p className="text-slate-600 text-base sm:text-lg" style={{ lineHeight: 1.75 }}>{h}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* What-is card */}
            <motion.div {...fadeUp(0.1)}>
              <div className="rounded-2xl border border-slate-200/60 bg-[#f7f9ff]" style={{ padding: "clamp(2rem, 5vw, 2.75rem)" }}>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 leading-[1.35]">{c.details.heading}</h3>
                <p className="text-slate-500 text-base sm:text-lg mb-6" style={{ lineHeight: 1.9 }}>{c.details.description}</p>
                <div className="flex flex-wrap gap-2">
                  {c.details.applications.map((app, i) => (
                    <span key={i} className="rounded-full border border-slate-200 bg-white text-slate-600 text-sm font-semibold uppercase tracking-wide shadow-sm" style={{ padding: "0.6rem 1.25rem" }}>
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
          </section>

          {/* ══ SOLUTIONS GRID ════════════════════════════════════ */}
          <section className="w-full" style={{ ...SECTION_MARGIN, padding: "clamp(2rem, 5vw, 3rem)" }}>
            <motion.h2 {...fadeUp(0)} className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 tracking-tight text-center leading-[1.3]" style={{ marginBottom: "3rem" }}>
            {c.solutions.heading}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {c.solutions.items.map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.07)}
                whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                whileTap={{ scale: 0.98 }}
                className={`relative rounded-2xl border overflow-hidden group cursor-default
                  ${item.isCustom
                    ? "bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6] text-white border-transparent shadow-lg shadow-[#6B9FF7]/25"
                    : "bg-white border-slate-200/60 shadow-md hover:border-[#7BA9F7]/50 hover:shadow-xl hover:shadow-[#6B9FF7]/15"
                  }`}
                style={{ padding: "clamp(1.75rem, 4vw, 2.25rem)", transition: "box-shadow 0.3s ease, border-color 0.3s ease" }}
              >
                {/* Hover glow overlay - white cards only */}
                {!item.isCustom && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6B9FF7]/0 to-[#8B5CF6]/0 group-hover:from-[#6B9FF7]/5 group-hover:to-[#8B5CF6]/5 transition-all duration-300 pointer-events-none rounded-2xl" />
                )}
                <motion.div
                  className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300
                    ${item.isCustom
                      ? "bg-white/15"
                      : "bg-[#7BA9F7]/10 text-[#6B9FF7] group-hover:bg-[#6B9FF7] group-hover:text-white"
                    }`}
                  style={{ marginBottom: "1.25rem" }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  {serviceIcons[key].card}
                </motion.div>
                <h3 className="relative text-lg sm:text-xl font-bold leading-snug" style={{ marginBottom: "0.75rem" }}>{item.title}</h3>
                <p className={`text-base sm:text-lg ${item.isCustom ? "text-white/85" : "text-slate-500"}`} style={{ lineHeight: 1.8 }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
          </section>

          {/* ══ BENEFITS + SUITABLE FOR ═══════════════════════════ */}
          <section className="w-full bg-white" style={{ ...SECTION_MARGIN, padding: "clamp(2rem, 5vw, 3rem)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Benefits */}
            <motion.div {...fadeUp(0)} className="rounded-2xl border border-slate-200/60 bg-[#f7f9ff]" style={{ padding: "clamp(2rem, 5vw, 2.75rem)" }}>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800" style={{ marginBottom: "2rem" }}>{c.benefits.heading}</h3>
              <div className="flex flex-col gap-2 mb-8">
                {c.benefits.items.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="mt-1.5 w-7 h-7 shrink-0 rounded-full bg-[#7BA9F7]/15 text-[#6B9FF7] flex items-center justify-center">
                      {serviceIcons[key].check}
                    </div>
                    <p className="text-slate-600 text-base sm:text-lg" style={{ lineHeight: 1.65 }}>{item}</p>
                  </div>
                ))}
              </div>
              <p className="text-slate-500 text-sm sm:text-base italic border-l-2 border-[#7BA9F7]/30 pl-4 py-1" style={{ lineHeight: 1.85 }}>
                {c.benefits.summary}
              </p>
            </motion.div>

            {/* Suitable for */}
            <motion.div {...fadeUp(0.1)} className="rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6] text-white shadow-xl shadow-[#6B9FF7]/20" style={{ padding: "clamp(2rem, 5vw, 2.75rem)" }}>
              <h3 className="text-xl sm:text-2xl font-bold" style={{ marginBottom: "2rem" }}>{c.suitableFor.heading}</h3>
              <div className="flex flex-col gap-4">
                {c.suitableFor.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl" style={{ padding: "1rem 1.25rem" }}>
                    <span className="text-[#88D4FF] shrink-0">{serviceIcons[key].bullet}</span>
                    <span className="text-white/95 text-base sm:text-lg font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
          </section>

          {/* ══ PROCESS ═══════════════════════════════════════════ */}
          <section className="w-full" style={{ ...SECTION_MARGIN, padding: "clamp(2rem, 5vw, 3rem)" }}>
            <motion.h2 {...fadeUp(0)} className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 tracking-tight text-center leading-[1.3]" style={{ marginBottom: "3rem" }}>
            {c.process.heading}
          </motion.h2>

          {/* Desktop: horizontal steps with curved gradient connector line */}
          <div className="hidden lg:block relative" style={{ paddingTop: "3rem" }}>
            <svg
              className="absolute left-0 right-0 w-full overflow-visible"
              style={{ top: "5rem", height: "24px" }}
              viewBox="0 0 100 24"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="processLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6B9FF7" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#6B9FF7" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="processLineGradientFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6B9FF7" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#6B9FF7" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 2 12 Q 25 22 50 12 Q 75 2 98 12"
                fill="none"
                stroke="url(#processLineGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.6 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ pathLength: { duration: 1.2, ease: "easeInOut" }, opacity: { duration: 0.5 } }}
                style={{ filter: "drop-shadow(0 0 4px rgba(107,159,247,0.3))" }}
              />
              <motion.path
                d="M 2 12 Q 25 22 50 12 Q 75 2 98 12"
                fill="none"
                stroke="url(#processLineGradientFlow)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="8 12"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -20 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                style={{ opacity: 0.8 }}
              />
            </svg>
            <div className="grid grid-cols-5 gap-8">
              {c.process.steps.map((s, i) => (
                <motion.div key={i} {...fadeUp(i * 0.08)} className="flex flex-col items-center text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black text-white mb-5 relative z-10 shadow-lg"
                    style={{ background: "linear-gradient(135deg, #6B9FF7 0%, #8B5CF6 100%)", boxShadow: "0 8px 24px rgba(107,159,247,0.30)" }}
                  >
                    {s.step}
                  </div>
                  <h4 className="text-base sm:text-lg font-bold mb-3 text-slate-800">{s.title}</h4>
                  <p className="text-sm sm:text-base text-slate-500" style={{ lineHeight: 1.8 }}>{s.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical stack with curved gradient connector line */}
          <div className="flex flex-col lg:hidden relative" style={{ paddingTop: "3rem" }}>
            <svg
              className="absolute overflow-visible"
              style={{ left: "1.25rem", top: "4.5rem", bottom: "1.5rem", width: "24px" }}
              viewBox="0 0 24 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="processLineGradientVertical" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6B9FF7" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#6B9FF7" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 12 2 Q 2 25 12 50 Q 22 75 12 98"
                fill="none"
                stroke="url(#processLineGradientVertical)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.6 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ pathLength: { duration: 1.2, ease: "easeInOut" } }}
              />
              <motion.path
                d="M 12 2 Q 2 25 12 50 Q 22 75 12 98"
                fill="none"
                stroke="url(#processLineGradientVertical)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="8 12"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -20 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                style={{ opacity: 0.8 }}
              />
            </svg>
            <div className="flex flex-col gap-6">
              {c.process.steps.map((s, i) => (
                <motion.div key={i} {...fadeUp(i * 0.07)} className="flex gap-4 items-start relative z-10">
                  <div
                    className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-lg font-black text-white shadow-md"
                    style={{ background: "linear-gradient(135deg, #6B9FF7 0%, #8B5CF6 100%)" }}
                  >
                    {s.step}
                  </div>
                  <div className="pt-1">
                    <h4 className="font-bold text-slate-800 text-base sm:text-lg mb-2">{s.title}</h4>
                    <p className="text-sm sm:text-base text-slate-500" style={{ lineHeight: 1.8 }}>{s.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          </section>

          {/* ══ FAQ ═══════════════════════════════════════════════ */}
          <section className="w-full bg-white flex flex-col items-center" style={{ ...SECTION_MARGIN, padding: "clamp(2rem, 5vw, 3rem)" }}>
          <div className="w-full max-w-3xl">
            <motion.h2 {...fadeUp(0)} className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 tracking-tight text-center leading-[1.3]" style={{ marginBottom: "4rem" }}>
              {c.faq.heading}
            </motion.h2>
            <div className="flex flex-col gap-5">
              {c.faq.items.map((item, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(i * 0.07)}
                  whileHover={{ y: -4, scale: 1.01, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                  whileTap={{ scale: 0.99 }}
                  className="group relative rounded-2xl bg-[#f7f9ff] border border-slate-200/60 hover:border-[#7BA9F7]/50 hover:shadow-lg hover:shadow-[#6B9FF7]/15 overflow-hidden text-left cursor-default transition-shadow duration-300"
                  style={{ padding: "clamp(1.75rem, 4vw, 2rem)" }}
                >
                  {/* Hover glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6B9FF7]/0 to-[#8B5CF6]/0 group-hover:from-[#6B9FF7]/5 group-hover:to-[#8B5CF6]/5 transition-all duration-300 pointer-events-none rounded-2xl" />
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#7BA9F7]/30 rounded-2xl pointer-events-none transition-colors duration-300" />
                  <div className="relative">
                    <h4 className="text-base sm:text-lg font-bold text-slate-800 flex items-start gap-3" style={{ marginBottom: "1.5rem" }}>
                      <motion.span
                        className="shrink-0 w-7 h-7 rounded-lg bg-[#7BA9F7]/15 text-[#6B9FF7] flex items-center justify-center text-sm font-bold group-hover:bg-[#7BA9F7]/25 transition-colors duration-200"
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        Q
                      </motion.span>
                      {item.question}
                    </h4>
                    <p className="text-base sm:text-lg text-slate-500 pl-10" style={{ lineHeight: 1.85 }}>{item.answer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          </section>

          {/* ══ CTA FOOTER ════════════════════════════════════════ */}
          <section className="w-full" style={{ ...SECTION_MARGIN, padding: "clamp(2rem, 5vw, 3rem)" }}>
          <motion.div
            {...fadeUp(0)}
            className="relative rounded-3xl bg-gradient-to-br from-[#4F46E5] via-[#6B9FF7] to-[#8B5CF6] text-center text-white shadow-2xl shadow-[#6B9FF7]/20 overflow-hidden"
            style={{ padding: "clamp(3rem, 8vw, 4.5rem) clamp(2rem, 5vw, 3.5rem)" }}
          >
            <div className="pointer-events-none absolute top-0 left-0 w-56 h-56 bg-white/8 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" aria-hidden />
            <div className="pointer-events-none absolute bottom-0 right-0 w-56 h-56 bg-white/8 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" aria-hidden />
            <div className="relative z-10 flex flex-col items-center text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-6" style={{ lineHeight: 1.25 }}>
                {c.cta.heading}
              </h2>
              <p className="text-white/90 text-lg sm:text-xl max-w-lg mb-8" style={{ lineHeight: 1.85 }}>
                {c.cta.description}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="relative z-10 inline-flex items-center gap-2 rounded-full bg-white text-[#4F46E5] font-bold text-base sm:text-lg shadow-lg hover:bg-blue-50 hover:-translate-y-0.5 transition-all duration-300"
                style={{ padding: "clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)" }}
              >
              {locale === "th" ? "ติดต่อสอบถาม" : "Get a Consultation"}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </motion.div>
          </section>

          {/* ══ NAV: Back / Next ─══════════════════════════════════ */}
          <nav className="flex items-center justify-between w-full py-8 border-t border-slate-200/60" style={{ ...SECTION_MARGIN, padding: "clamp(2rem, 5vw, 3rem) 0" }}>
            {(() => {
              const idx = SLUG_ORDER.indexOf(slug);
              const prevSlug = idx > 0 ? SLUG_ORDER[idx - 1] : null;
              const nextSlug = idx < SLUG_ORDER.length - 1 && idx >= 0 ? SLUG_ORDER[idx + 1] : null;
              const prevTitle = prevSlug ? serviceContent[locale][slugToKey[prevSlug]].title : null;
              const nextTitle = nextSlug ? serviceContent[locale][slugToKey[nextSlug]].title : null;
              return (
                <>
                  <div className="flex-1">
                    {prevSlug ? (
                      <Link
                        href={`/${locale}/services/${prevSlug}`}
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-[#6B9FF7] font-semibold transition-colors"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                        </svg>
                        {locale === "th" ? "ย้อนกลับ" : "Back"}
                        {prevTitle && <span className="hidden sm:inline text-slate-500 font-normal">— {prevTitle}</span>}
                      </Link>
                    ) : (
                      <Link
                        href={`/${locale}/services`}
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-[#6B9FF7] font-semibold transition-colors"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                        </svg>
                        {locale === "th" ? "กลับหน้ารวมบริการ" : "Back to Services"}
                      </Link>
                    )}
                  </div>
                  <div className="flex-1 flex justify-end">
                    {nextSlug ? (
                      <Link
                        href={`/${locale}/services/${nextSlug}`}
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-[#6B9FF7] font-semibold transition-colors"
                      >
                        {nextTitle && <span className="hidden sm:inline text-slate-500 font-normal">{nextTitle} —</span>}
                        {locale === "th" ? "บริการถัดไป" : "Next"}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                      </Link>
                    ) : (
                      <Link
                        href={`/${locale}/services`}
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-[#6B9FF7] font-semibold transition-colors"
                      >
                        {locale === "th" ? "หน้ารวมบริการ" : "All Services"}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </>
              );
            })()}
          </nav>

        </div>
      </div>
    </main>
  );
}
