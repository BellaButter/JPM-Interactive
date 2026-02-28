"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { aboutContent } from "@/data/aboutPageContent";
import type { Locale } from "@/types/locale";

const LAYOUT_PADDING = {
  paddingLeft: "clamp(1.75rem, 6vw, 4rem)" as const,
  paddingRight: "clamp(1.75rem, 6vw, 4rem)" as const,
};

const SECTION_MARGIN = {
  marginTop: "clamp(2rem, 5vw, 3.5rem)" as const,
  marginBottom: "clamp(2rem, 5vw, 3.5rem)" as const,
};

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" as const },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  };
}

/* ─── Mission card icons (unique per item) ─────────────────── */
function MissionRocketIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}
function MissionLayersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  );
}
function MissionShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function MissionStarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

/* ─── Section Icons ───────────────────────────────────────── */
function VisionIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function MissionIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}
function ExpertiseIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
    </svg>
  );
}

/* ─── Expertise card icons (unique per item) ───────────────── */
function ExpertiseInstallIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <circle cx="12" cy="10" r="2" />
    </svg>
  );
}
function ExpertiseProjectionIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}
function ExpertiseGraphicsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5L12 2z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M6 12l3 3 6-6" />
    </svg>
  );
}
function ExpertiseIntegrationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="6" width="8" height="12" rx="1" />
      <rect x="14" y="6" width="8" height="12" rx="1" />
      <path d="M10 12h4" />
      <path d="M12 10v4" />
    </svg>
  );
}
function ExpertiseGestureIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 11V6a2 2 0 0 1 4 0v8" />
      <path d="M11 11V9a2 2 0 0 1 4 0v6" />
      <path d="M15 11V7a2 2 0 0 1 4 0v10" />
      <path d="M3 20c2 0 4-2 4-4v-2" />
      <path d="M7 14v-2" />
    </svg>
  );
}

const EXPERTISE_ICONS = [
  ExpertiseInstallIcon,
  ExpertiseProjectionIcon,
  ExpertiseGraphicsIcon,
  ExpertiseIntegrationIcon,
  ExpertiseGestureIcon,
];
function ApproachIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

/* ─── Approach step icons ──────────────────────────────────── */
function ApproachTargetIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function ApproachPaletteIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="8" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="16" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="10" cy="14" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="14" cy="16" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
function ApproachCodeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
function ApproachSupportIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

const APPROACH_ICONS = [ApproachTargetIcon, ApproachPaletteIcon, ApproachCodeIcon, ApproachSupportIcon];
function ClientsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

/* ─── Client type icons ────────────────────────────────────── */
function ClientCorpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21h18" /><path d="M5 21V7l8-4 8 4v14" /><path d="M9 21v-6h6v6" />
    </svg>
  );
}
function ClientGovIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function ClientTechIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      <path d="M9 9h6" /><path d="M9 13h6" /><path d="M9 17h4" />
    </svg>
  );
}
function ClientBrandIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function ClientEventIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

const CLIENT_ICONS = [ClientCorpIcon, ClientGovIcon, ClientTechIcon, ClientBrandIcon, ClientEventIcon];
function DifferenceIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

/* ─── Hero intro icons ───────────────────────────────────── */
function ScopeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
function IdeaIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
    </svg>
  );
}
function ProcessIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M4.93 4.93l2.83 2.83" />
      <path d="M16.24 16.24l2.83 2.83" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="M4.93 19.07l2.83-2.83" />
      <path d="M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function AboutPageClient({ locale }: { locale: Locale }) {
  const c = aboutContent[locale];

  return (
    <main className="relative bg-white overflow-x-hidden w-full max-w-[100vw] min-w-0">
      {/* ══ HERO with Illustration ═══════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          paddingTop: "clamp(7rem, 15vw, 11rem)",
          paddingBottom: "clamp(3rem, 6vw, 4rem)",
          marginBottom: "clamp(1.5rem, 4vw, 2.25rem)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 w-[100vw] left-1/2 -translate-x-1/2 bg-gradient-to-br from-blue-50/95 via-violet-50/80 to-cyan-50/90" aria-hidden style={{ maxWidth: "100vw" }} />
        <div className="pointer-events-none absolute inset-0 w-[100vw] left-1/2 -translate-x-1/2" aria-hidden style={{ maxWidth: "100vw" }}>
          <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400/15 via-violet-400/10 to-transparent" />
          <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-400/15 via-cyan-400/10 to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center w-full" style={LAYOUT_PADDING}>
          <motion.div
            {...fadeUp(0)}
            className="inline-block rounded-full border border-[#7BA9F7]/40 bg-[#7BA9F7]/10 text-[#6B9FF7] text-xs font-bold uppercase tracking-wider mb-6"
            style={{ padding: "0.5rem 1.25rem" }}
          >
            {locale === "th" ? "เกี่ยวกับเรา" : "About Us"}
          </motion.div>
          <motion.h1
            {...fadeUp(0.05)}
            className="font-bold text-slate-800 tracking-tight w-full max-w-4xl"
            style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.25rem)", lineHeight: 1.3, marginBottom: "3rem" }}
          >
            <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-purple-600 bg-clip-text text-transparent">
              {c.hero.h1}
            </span>
          </motion.h1>
          <div className="flex flex-col gap-5 max-w-3xl" style={{ gap: "1.5rem", marginTop: "2.5rem" }}>
            {c.hero.intro.map((item, i) => {
              const icons = [<ScopeIcon key="0" />, <IdeaIcon key="1" />, <ProcessIcon key="2" />];
              const text = typeof item === "string" ? item : item.text;
              const highlights = typeof item === "string" ? [] : (item.highlight ?? []);
              const parts = highlights.length > 0
                ? text.split(new RegExp(`(${highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g"))
                : [text];
              return (
                <motion.div
                  key={i}
                  {...fadeUp(0.08 + i * 0.05)}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  className="group flex gap-5 rounded-2xl border border-slate-200/60 bg-white/60 text-left hover:border-[#7BA9F7]/40 hover:bg-white/80 hover:shadow-lg hover:shadow-[#6B9FF7]/10 transition-all duration-300"
                  style={{ padding: "clamp(1.75rem, 5vw, 2.5rem)" }}
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-[#7BA9F7]/15 text-[#6B9FF7] flex items-center justify-center group-hover:bg-[#7BA9F7]/25 transition-colors">
                    {icons[i]}
                  </div>
                  <p className="text-slate-600 text-base sm:text-lg flex-1" style={{ lineHeight: 1.5 }}>
                    {parts.map((part, j) =>
                      highlights.includes(part) ? (
                        <span key={j} className="font-semibold text-[#4F46E5]">
                          {part}
                        </span>
                      ) : (
                        part
                      )
                    )}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Outer container */}
      <div className="w-full flex justify-center" style={LAYOUT_PADDING}>
        <div className="w-full max-w-[1600px] flex flex-col">
          {/* ══ VISION ═══════════════════════════════════════════ */}
          <section className="w-full" style={{ ...SECTION_MARGIN, padding: "clamp(2rem, 5vw, 3rem)" }}>
            <motion.div {...fadeUp(0)} className="flex items-center gap-4" style={{ marginBottom: "3rem" }}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6B9FF7] to-[#8B5CF6] text-white flex items-center justify-center shadow-lg shadow-[#6B9FF7]/25">
                <VisionIcon />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
                {c.vision.heading}
              </h2>
            </motion.div>
            <div className="flex flex-col" style={{ gap: 0 }}>
              {c.vision.paragraphs.map((p, i) => (
                <motion.p key={i} {...fadeUp(i * 0.07)} className="text-slate-600 text-base sm:text-lg" style={{ lineHeight: 1.4 }}>
                  {p}
                </motion.p>
              ))}
            </div>
          </section>

          {/* ══ MISSION - Cards ═══════════════════════════════════ */}
          <section className="w-full" style={{ ...SECTION_MARGIN, padding: "clamp(2rem, 5vw, 3rem)" }}>
            <motion.div {...fadeUp(0)} className="flex items-center gap-4" style={{ marginBottom: "3rem" }}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6B9FF7] to-[#8B5CF6] text-white flex items-center justify-center shadow-lg shadow-[#6B9FF7]/25">
                <MissionIcon />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
                {c.mission.heading}
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {c.mission.items.map((item, i) => {
                const missionIcons = [
                  <MissionRocketIcon key="0" />,
                  <MissionLayersIcon key="1" />,
                  <MissionShieldIcon key="2" />,
                  <MissionStarIcon key="3" />,
                ];
                return (
                  <motion.div
                    key={i}
                    {...fadeUp(i * 0.07)}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="group rounded-2xl border border-slate-200/60 bg-[#f7f9ff] border-[#7BA9F7]/20 hover:border-[#7BA9F7]/50 hover:shadow-lg hover:shadow-[#6B9FF7]/10 transition-all duration-300"
                    style={{ padding: "clamp(1.75rem, 5vw, 2.25rem)" }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#7BA9F7]/15 text-[#6B9FF7] flex items-center justify-center mb-4 group-hover:bg-[#7BA9F7]/25 transition-colors">
                      {missionIcons[i]}
                    </div>
                    <p className="text-slate-800 text-base font-semibold group-hover:text-[#4F46E5] transition-colors" style={{ lineHeight: 1.7 }}>{item}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ══ EXPERTISE - Cards ══════════════════════════════════ */}
          <section className="w-full bg-white" style={{ ...SECTION_MARGIN, padding: "clamp(2rem, 5vw, 3rem)" }}>
            <motion.div {...fadeUp(0)} className="flex items-center gap-4" style={{ marginBottom: "3rem" }}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6B9FF7] to-[#8B5CF6] text-white flex items-center justify-center shadow-lg shadow-[#6B9FF7]/25">
                <ExpertiseIcon />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
                {c.expertise.heading}
              </h2>
            </motion.div>
            <motion.p {...fadeUp(0.05)} className="text-slate-600 text-base sm:text-lg mb-8" style={{ lineHeight: 1.5 }}>
              {c.expertise.intro}
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" style={{ marginBottom: "3rem" }}>
              {c.expertise.items.map((item, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(i * 0.07)}
                  whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.2 } }}
                  className="group rounded-2xl bg-gradient-to-br from-[#f8faff] to-white border border-[#7BA9F7]/25 shadow-md shadow-slate-200/30 hover:shadow-xl hover:shadow-[#6B9FF7]/15 hover:border-[#7BA9F7]/50 hover:from-[#f0f4ff] hover:to-[#fafbff] transition-all duration-300"
                  style={{ padding: "clamp(1.75rem, 5vw, 2.25rem)" }}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#6B9FF7]/15 text-[#6B9FF7] flex items-center justify-center mb-4 group-hover:bg-[#6B9FF7]/25 group-hover:text-[#5a8ee6] transition-colors">
                    {(() => {
                      const Icon = EXPERTISE_ICONS[i % EXPERTISE_ICONS.length];
                      return <Icon />;
                    })()}
                  </div>
                  <p className="text-slate-800 text-base font-semibold group-hover:text-[#4F46E5] transition-colors" style={{ lineHeight: 1.7 }}>{item}</p>
                </motion.div>
              ))}
            </div>
            <motion.p {...fadeUp(0.1)} className="text-slate-600 text-base sm:text-lg italic" style={{ lineHeight: 1.5 }}>
              {c.expertise.closing}
            </motion.p>
          </section>

          {/* ══ APPROACH - Timeline ═══════════════════════════════ */}
          <section className="w-full bg-gradient-to-b from-[#f8faff] to-white rounded-3xl" style={{ ...SECTION_MARGIN, padding: "clamp(2rem, 5vw, 3rem)" }}>
            <motion.div {...fadeUp(0)} className="flex items-center gap-4" style={{ marginBottom: "3rem" }}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6B9FF7] to-[#8B5CF6] text-white flex items-center justify-center shadow-lg shadow-[#6B9FF7]/25">
                <ApproachIcon />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
                {c.approach.heading}
              </h2>
            </motion.div>
            <motion.p {...fadeUp(0.05)} className="text-slate-600 text-base sm:text-lg mb-10" style={{ lineHeight: 1.5 }}>
              {c.approach.intro}
            </motion.p>

            {/* Desktop: horizontal cards with curved connector */}
            <div className="hidden lg:block relative" style={{ paddingTop: "1rem" }}>
              <svg className="absolute left-0 right-0 w-full overflow-visible pointer-events-none" style={{ top: "6.5rem", height: "28px" }} viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden>
                <defs>
                  <linearGradient id="approachLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6B9FF7" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#6B9FF7" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <motion.path d="M 2 14 Q 25 26 50 14 Q 75 2 98 14" fill="none" stroke="url(#approachLineGrad)" strokeWidth="2.5" strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0.5 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }}
                  transition={{ pathLength: { duration: 1, ease: "easeOut" } }} />
              </svg>
              <div className="grid grid-cols-4 gap-6 relative z-10">
                {c.approach.items.map((item, i) => {
                  const StepIcon = APPROACH_ICONS[i];
                  return (
                    <motion.div key={i} {...fadeUp(i * 0.08)} whileHover={{ y: -6, transition: { duration: 0.2 } }}
                      className="group rounded-2xl border border-[#7BA9F7]/25 bg-white shadow-md shadow-slate-200/40 hover:shadow-xl hover:shadow-[#6B9FF7]/15 hover:border-[#7BA9F7]/50 transition-all duration-300 overflow-hidden"
                      style={{ padding: "clamp(1.5rem, 4vw, 2rem)" }}>
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white mb-5 shadow-lg"
                        style={{ background: "linear-gradient(135deg, #6B9FF7 0%, #8B5CF6 100%)", boxShadow: "0 8px 20px rgba(107,159,247,0.35)" }}>
                        <StepIcon />
                      </div>
                      <span className="inline-block text-xs font-bold text-[#6B9FF7] mb-2">{locale === "th" ? "ขั้นตอน" : "Step"} {i + 1}</span>
                      <p className="text-slate-800 text-base font-semibold group-hover:text-[#4F46E5] transition-colors" style={{ lineHeight: 1.65 }}>{item}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Mobile: vertical cards with connector */}
            <div className="flex flex-col lg:hidden gap-4 relative pl-6" style={{ borderLeft: "3px solid rgba(107,159,247,0.4)" }}>
              {c.approach.items.map((item, i) => {
                const StepIcon = APPROACH_ICONS[i];
                return (
                  <motion.div key={i} {...fadeUp(i * 0.07)} className="relative -ml-6 flex gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-white shadow-md"
                      style={{ background: "linear-gradient(135deg, #6B9FF7 0%, #8B5CF6 100%)" }}>
                      <StepIcon />
                    </div>
                    <div className="flex-1 rounded-xl border border-[#7BA9F7]/20 bg-white p-4 shadow-sm">
                      <span className="text-xs font-bold text-[#6B9FF7]">{locale === "th" ? "ขั้นตอน" : "Step"} {i + 1}</span>
                      <p className="text-slate-800 text-base font-semibold mt-1" style={{ lineHeight: 1.6 }}>{item}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.p {...fadeUp(0.1)} className="text-slate-600 text-base sm:text-lg italic mt-14 text-center" style={{ lineHeight: 1.5 }}>
              {c.approach.closing}
            </motion.p>
          </section>

          {/* ══ CLIENTS ═══════════════════════════════════════════ */}
          <section className="w-full relative overflow-hidden rounded-3xl" style={{ ...SECTION_MARGIN, padding: "clamp(2rem, 5vw, 3rem)" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#f0f4ff] via-white to-[#f8faff] pointer-events-none" aria-hidden />
            <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#6B9FF7]/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" aria-hidden />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#8B5CF6]/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" aria-hidden />
            <div className="relative z-10">
              <motion.div {...fadeUp(0)} className="flex items-start gap-4" style={{ marginBottom: "3rem" }}>
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-[#6B9FF7] to-[#8B5CF6] text-white flex items-center justify-center shadow-lg shadow-[#6B9FF7]/25">
                  <ClientsIcon />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
                    {c.clients.heading}
                  </h2>
                  <p className="text-slate-600 text-base mt-1">{c.clients.intro}</p>
                </div>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {c.clients.items.map((item, i) => {
                  const Icon = CLIENT_ICONS[i % CLIENT_ICONS.length];
                  return (
                    <motion.div
                      key={i}
                      {...fadeUp(i * 0.06)}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="group rounded-2xl border border-[#7BA9F7]/20 bg-white/80 backdrop-blur-sm shadow-md shadow-slate-200/30 hover:shadow-xl hover:shadow-[#6B9FF7]/15 hover:border-[#7BA9F7]/50 hover:bg-white transition-all duration-300"
                      style={{ padding: "clamp(1.25rem, 3vw, 1.5rem)" }}
                    >
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#6B9FF7]/15 to-[#8B5CF6]/15 text-[#6B9FF7] flex items-center justify-center mb-3 group-hover:from-[#6B9FF7]/25 group-hover:to-[#8B5CF6]/25 transition-colors">
                        <Icon />
                      </div>
                      <p className="text-slate-800 text-base font-semibold group-hover:text-[#4F46E5] transition-colors" style={{ lineHeight: 1.6 }}>{item}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ══ DIFFERENCE ══════════════════════════════════════════ */}
          <section className="w-full relative overflow-hidden rounded-3xl" style={{ ...SECTION_MARGIN, padding: "clamp(2rem, 5vw, 3rem)" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#f8faff] via-white to-[#f0f4ff] pointer-events-none" aria-hidden />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#6B9FF7]/15 to-transparent rounded-full pointer-events-none" aria-hidden />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#8B5CF6]/15 to-transparent rounded-full pointer-events-none" aria-hidden />
            <div className="relative z-10">
              <motion.div {...fadeUp(0)} className="flex items-center gap-4" style={{ marginBottom: "3rem" }}>
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6B9FF7] to-[#8B5CF6] text-white flex items-center justify-center shadow-lg shadow-[#6B9FF7]/25"
                  whileHover={{ scale: 1.05, rotate: 5, transition: { duration: 0.2 } }}
                >
                  <DifferenceIcon />
                </motion.div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
                  {c.difference.heading}
                </h2>
              </motion.div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {c.difference.paragraphs.map((p, i) => (
                  <motion.div
                    key={i}
                    {...fadeUp(i * 0.1)}
                    initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="group rounded-2xl border border-[#7BA9F7]/20 bg-white/70 backdrop-blur-sm shadow-md shadow-slate-200/30 hover:shadow-xl hover:shadow-[#6B9FF7]/15 hover:border-[#7BA9F7]/50 transition-all duration-300"
                    style={{ padding: "clamp(2rem, 5vw, 2.75rem)" }}
                  >
                    <div className="flex gap-4">
                      <motion.div
                        className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-[#6B9FF7]/20 to-[#8B5CF6]/20 flex items-center justify-center text-[#6B9FF7] group-hover:from-[#6B9FF7]/30 group-hover:to-[#8B5CF6]/30 transition-colors"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      >
                        {i === 0 ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" />
                          </svg>
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        )}
                      </motion.div>
                      <p className="text-slate-700 text-base sm:text-lg font-medium group-hover:text-slate-800 transition-colors" style={{ lineHeight: 1.6 }}>{p}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ══ CTA ═══════════════════════════════════════════════ */}
          <section className="w-full" style={{ ...SECTION_MARGIN, padding: "clamp(2rem, 5vw, 3rem)" }}>
            <motion.div
              {...fadeUp(0)}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
              className="relative rounded-3xl bg-gradient-to-br from-[#4F46E5] via-[#6B9FF7] to-[#8B5CF6] text-center text-white shadow-2xl shadow-[#6B9FF7]/20 overflow-hidden"
              style={{ padding: "clamp(3rem, 8vw, 4.5rem) clamp(2rem, 5vw, 3.5rem)" }}
            >
              <div className="pointer-events-none absolute top-0 left-0 w-56 h-56 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/15 to-transparent rounded-full -translate-y-1/2 -translate-x-1/2" aria-hidden />
              <div className="pointer-events-none absolute bottom-0 right-0 w-56 h-56 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/15 to-transparent rounded-full translate-y-1/2 translate-x-1/2" aria-hidden />
              <div className="relative z-10 flex flex-col items-center text-center">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6" style={{ lineHeight: 1.25 }}>
                  {c.cta.heading}
                </h2>
                <p className="text-white/75 text-base sm:text-lg max-w-md mb-8" style={{ lineHeight: 1.55 }}>
                  {c.cta.description}
                </p>
                <Link
                  href={`/${locale}/contact`}
                  className="relative z-10 inline-flex items-center gap-2 rounded-full bg-white text-[#4F46E5] font-bold text-sm shadow-lg hover:bg-blue-50 hover:-translate-y-0.5 transition-all duration-300"
                  style={{ padding: "1rem 2rem" }}
                >
                  {locale === "th" ? "ติดต่อสอบถาม" : "Get a Consultation"}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
