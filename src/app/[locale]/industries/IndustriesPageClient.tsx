"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { industriesContent } from "@/data/industriesPageContent";
import type { Locale } from "@/types/locale";

const scrollReveal = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 } as const,
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } as const,
});

const listItemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function IndustryCard({
  section,
  index,
  locale,
}: {
  section: (typeof industriesContent.th.sections)[0];
  index: number;
  locale: Locale;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px", amount: 0.15 });
  const isEven = index % 2 === 0;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col gap-8 md:flex-row md:items-center md:gap-12 lg:gap-16 ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Decorative orb */}
      <div
        className={`pointer-events-none absolute -z-10 h-64 w-64 rounded-full bg-gradient-to-br ${section.gradient} opacity-10 blur-2xl ${
          isEven ? "left-0 top-1/2 -translate-y-1/2 -translate-x-1/2" : "right-0 top-1/2 -translate-y-1/2 translate-x-1/2"
        }`}
      />

      {/* Icon + Title block */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 32 : -32 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex shrink-0 flex-col gap-4 md:w-[42%]"
      >
        <motion.div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${section.gradient} shadow-lg`}
          initial={{ scale: 0.9 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.05, rotate: 3 }}
        >
          <svg
            className="h-8 w-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={section.icon}
            />
          </svg>
        </motion.div>
        <h2
          className={`text-2xl font-bold tracking-tight sm:text-3xl bg-gradient-to-r ${section.gradient} bg-clip-text text-transparent`}
        >
          {section.title}
        </h2>
      </motion.div>

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex-1 overflow-hidden rounded-2xl border-2 border-slate-200/60 bg-white shadow-lg transition-all duration-300 hover:border-[#6B9FF7]/30 hover:shadow-xl hover:shadow-[#6B9FF7]/10 hover:-translate-y-1"
        style={{ padding: "clamp(1.75rem, 5vw, 3rem)" }}
      >
        <p className="mb-6 text-slate-600 leading-relaxed">{section.description}</p>
        <ul className="flex flex-col gap-3">
          {section.solutions.map((item, i) => (
            <motion.li
              key={i}
              custom={i}
              variants={listItemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex items-center gap-3 text-slate-700"
            >
              <span
                className={`h-2 w-2 shrink-0 rounded-full bg-gradient-to-r ${section.gradient}`}
              />
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.section>
  );
}

export default function IndustriesPageClient({ locale }: { locale: Locale }) {
  const content = industriesContent[locale];

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-white max-w-[100vw] min-w-0">
      {/* Hero background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-violet-50/60 to-cyan-50/80" />
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-blue-400/20 via-violet-400/15 to-transparent blur-2xl" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-violet-400/15 via-cyan-400/20 to-transparent blur-2xl" />
      </div>

      <div className="flex w-full justify-center">
        <div
          className="w-full max-w-[1200px] px-4 pb-20 sm:px-6 md:pb-28 lg:px-8"
          style={{
            paddingTop: "clamp(5rem, 8vw, 6.5rem)",
            paddingLeft: "clamp(1.5rem, 5vw, 3rem)",
            paddingRight: "clamp(1.5rem, 5vw, 3rem)",
          }}
        >
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "clamp(5rem, 10vw, 8rem)" }}
        >
          <div className="flex flex-col items-center text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ marginTop: "2.5rem", lineHeight: 1.2 }}
            >
              <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-purple-600 bg-clip-text text-transparent">
                {content.hero.h1}
              </span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#6B9FF7] to-[#8B5CF6]"
              aria-hidden
            />
          </div>

          {/* Intro card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex w-full justify-center"
            style={{ marginTop: "clamp(3rem, 6vw, 4.5rem)" }}
          >
            <div
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl border-2 border-[#7BA9F7]/25 bg-gradient-to-br from-[#f8faff] to-[#f5f0ff] shadow-xl shadow-[#6B9FF7]/10 backdrop-blur-sm"
              style={{
                boxShadow: "0 8px 32px -8px rgba(107, 159, 247, 0.15), 0 0 0 1px rgba(107, 159, 247, 0.08)",
                padding: "clamp(2.5rem, 6vw, 4rem)",
              }}
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#6B9FF7] via-[#8B5CF6] to-[#6B9FF7]" aria-hidden />
              <div className="space-y-6 sm:space-y-8">
                {content.hero.intro.map((p, i) => {
                  const icons = [
                    <svg key="0" className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
                    <svg key="1" className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
                    <svg key="2" className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
                  ];
                  return (
                  <div key={i} className="flex gap-4 sm:gap-5 text-left">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#6B9FF7] to-[#8B5CF6] shadow-md"
                      aria-hidden
                    >
                      {icons[i]}
                    </div>
                    <p
                      className="pt-0.5 text-base leading-relaxed text-slate-600 sm:text-lg"
                      style={{ lineHeight: 1.9 }}
                    >
                      {p}
                    </p>
                  </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Industry sections */}
<div
          className="flex flex-col"
          style={{
            marginTop: "clamp(2rem, 4vw, 3rem)",
            gap: "clamp(5rem, 10vw, 8rem)",
          }}
        >
          {content.sections.map((section, index) => (
            <IndustryCard
              key={section.id}
              section={section}
              index={index}
              locale={locale}
            />
          ))}
        </div>

        {/* Closing section */}
        <motion.section
          {...scrollReveal(0)}
          className="relative overflow-hidden rounded-3xl border-2 border-[#7BA9F7]/20 bg-gradient-to-br from-[#f8faff] to-[#f0e8ff] text-center"
          style={{ padding: "clamp(2rem, 5vw, 3.5rem)", marginTop: "clamp(5rem, 10vw, 8rem)" }}
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#6B9FF7]/20 blur-2xl" />
          <motion.h2
            {...scrollReveal(0.05)}
            className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl md:text-4xl"
            style={{ marginBottom: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            <span className="bg-gradient-to-r from-[#4F46E5] via-[#6B9FF7] to-[#8B5CF6] bg-clip-text text-transparent">
              {content.closing.title}
            </span>
          </motion.h2>
          <motion.div
            {...scrollReveal(0.1)}
            className="space-y-1 text-slate-600"
            style={{ lineHeight: 1.9 }}
          >
            {content.closing.paragraphs.map((p, i) => (
              <p key={i} className="text-base sm:text-lg">
                {p}
              </p>
            ))}
          </motion.div>
        </motion.section>

        {/* CTA */}
        <motion.section
          {...scrollReveal(0)}
          style={{ marginTop: "clamp(5rem, 10vw, 8rem)" }}
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4F46E5] via-[#6B9FF7] to-[#8B5CF6] text-center shadow-2xl shadow-[#6B9FF7]/25"
            style={{ padding: "clamp(2.5rem, 6vw, 4rem)" }}
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            </div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl sm:whitespace-nowrap">
                {content.cta.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
                {content.cta.description}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white font-bold text-[#4F46E5] shadow-lg transition-all hover:bg-blue-50 hover:-translate-y-0.5 hover:shadow-xl"
                style={{ padding: "clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)" }}
              >
                {content.cta.button}
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </motion.div>
        </motion.section>

        {/* Back link */}
        <motion.p
          {...scrollReveal(0)}
          className="text-center"
          style={{ marginTop: "clamp(4rem, 8vw, 6rem)" }}
        >
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 font-medium text-[#6B9FF7] transition-colors hover:text-[#5a8ee6]"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            {locale === "th" ? "กลับหน้าแรก" : "Back to home"}
          </Link>
        </motion.p>
        </div>
      </div>
    </main>
  );
}
