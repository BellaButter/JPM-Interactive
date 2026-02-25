"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getFaqItems, type FaqItem } from "@/data/faq";
import { useLocale } from "@/context/LocaleContext";
import type { Locale } from "@/types/locale";

const CARD_PADDING_REM = "clamp(1.25rem, 4vw, 2.25rem)";
const CARD_PADDING_STYLE = { padding: CARD_PADDING_REM };
const FAQ_ANSWER_PADDING_STYLE = {
  paddingTop: "0.875rem",
  paddingBottom: CARD_PADDING_REM,
  paddingLeft: CARD_PADDING_REM,
  paddingRight: CARD_PADDING_REM,
};
const bodyClass = "text-[15px] sm:text-base md:text-lg text-slate-600 leading-[1.75]";
const sectionTitleClass = "text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl md:text-4xl";
const sectionGradientText =
  "bg-gradient-to-r from-[#4F46E5] via-[#6B9FF7] to-[#8B5CF6] bg-clip-text text-transparent";
const accentLineClass = "mt-2 h-0.5 w-12 rounded-full bg-gradient-to-r from-[#6B9FF7] to-[#8B5CF6] opacity-80";

export default function FaqPageClient({ locale }: { locale: Locale }) {
  const { t } = useLocale();
  const items = getFaqItems(locale);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /* Section: top padding + flex to center all content */
  const sectionStyle: React.CSSProperties = {
    scrollMarginTop: "5.5rem",
    paddingTop: "clamp(6rem, 12vw, 10rem)",
    paddingBottom: "clamp(3.5rem, 5vw, 5rem)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  };

  /* Single centered column: max width + horizontal padding */
  const contentWrapStyle: React.CSSProperties = {
    maxWidth: "48rem",
    width: "100%",
    paddingLeft: "clamp(1.5rem, 5vw, 4rem)",
    paddingRight: "clamp(1.5rem, 5vw, 4rem)",
    boxSizing: "border-box",
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <section
        style={sectionStyle}
        aria-labelledby="faq-page-heading"
      >
        <div style={contentWrapStyle}>
            <div
              className="mb-10 sm:mb-12 md:mb-14"
              style={{ textAlign: "center" }}
            >
              <h1 id="faq-page-heading" className={`${sectionTitleClass} ${sectionGradientText}`}>
                {t("faq.pageTitle")}
              </h1>
              <div
                className={accentLineClass}
                style={{ marginLeft: "auto", marginRight: "auto" }}
                aria-hidden
              />
              <p className={`mt-4 ${bodyClass}`}>{t("faq.pageDescription")}</p>
            </div>

            <div className="space-y-3 sm:space-y-4">
            {items.map((item: FaqItem, index: number) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={item.q}
                  className={`rounded-2xl border-2 bg-white shadow-sm transition-colors duration-300 ${
                    isOpen
                      ? "border-[#6B9FF7]/40 bg-[#f8faff]/50 shadow-lg shadow-[#6B9FF7]/10"
                      : "border-[#7BA9F7]/20"
                  }`}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex((prev) => (prev === index ? null : index))}
                    className="flex w-full cursor-pointer list-none items-center justify-between gap-4 font-medium text-slate-900 transition-colors hover:text-[#6B9FF7]"
                    style={CARD_PADDING_STYLE}
                  >
                    <span className="text-left text-[15px] leading-snug sm:text-base pr-2">{item.q}</span>
                    <motion.span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#6B9FF7]/10 text-[#6B9FF7] sm:h-10 sm:w-10"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 24 }}
                      aria-hidden
                    >
                      <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="overflow-hidden border-t border-slate-100"
                      >
                        <div style={FAQ_ANSWER_PADDING_STYLE}>
                          <p className={bodyClass}>{item.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
            </div>
        </div>
      </section>
    </div>
  );
}
