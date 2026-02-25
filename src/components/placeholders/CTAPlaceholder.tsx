/**
 * Lightweight placeholder for CTASection while the real component loads.
 * Matches new CTA 3-Acts layout (Vision → Journey → CTA) to avoid CLS.
 */
"use client";

import Link from "next/link";
import Container from "@/components/layout/Container";
import { useLocale } from "@/context/LocaleContext";
import { prefixPath } from "@/i18n/config";

const JOURNEY_STEPS = ["idea", "design", "build", "launch"] as const;

export default function CTAPlaceholder() {
    const { t, locale } = useLocale();
    return (
        <section
            className="relative z-30 isolate w-full min-w-full max-w-none overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32 min-h-[60vh] sm:min-h-[70vh] flex items-center"
            aria-hidden
        >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f0f4ff] via-[#e8f0ff] to-[#f3e8ff]">
                <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-gradient-radial from-[#7BA9F7]/30 to-transparent rounded-full blur-3xl opacity-60" />
                <div className="absolute bottom-0 right-0 w-[900px] h-[900px] bg-gradient-radial from-[#C89BF5]/25 to-transparent rounded-full blur-3xl opacity-60" />
            </div>

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.15]" aria-hidden>
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(90deg, rgba(123, 169, 247, 0.2) 1px, transparent 1px),
                            linear-gradient(rgba(123, 169, 247, 0.2) 1px, transparent 1px)
                        `,
                        backgroundSize: "80px 80px"
                    }}
                />
            </div>

            <Container className="relative z-10 w-full px-4 sm:px-6">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    {/* Act 1 — Vision */}
                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight bg-gradient-to-r from-[#6B9FF7] via-[#8B9FF8] to-[#8B5CF6] bg-clip-text text-transparent">
                            JPM Interactive
                        </h2>
                        <p className="mt-2 sm:mt-3 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
                            Where Technology Meets Creativity
                        </p>
                        <svg className="mt-6 sm:mt-8 w-48 h-12 opacity-40" viewBox="0 0 192 48" fill="none" aria-hidden>
                            <defs>
                                <linearGradient id="cta-ph-circle" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#6B9FF7" />
                                    <stop offset="100%" stopColor="#8B5CF6" />
                                </linearGradient>
                            </defs>
                            <circle cx="24" cy="24" r="8" stroke="url(#cta-ph-circle)" strokeWidth="2" fill="none" />
                            <line x1="32" y1="24" x2="64" y2="24" stroke="url(#cta-ph-circle)" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="72" cy="24" r="8" stroke="url(#cta-ph-circle)" strokeWidth="2" fill="none" />
                            <line x1="80" y1="24" x2="112" y2="24" stroke="url(#cta-ph-circle)" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="120" cy="24" r="8" stroke="url(#cta-ph-circle)" strokeWidth="2" fill="none" />
                            <line x1="128" y1="24" x2="160" y2="24" stroke="url(#cta-ph-circle)" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="168" cy="24" r="8" stroke="url(#cta-ph-circle)" strokeWidth="2" fill="none" />
                        </svg>
                    </div>

                    <div className="mt-8 sm:mt-10 md:mt-12">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
                            Creative Digital Experiences
                        </h3>
                        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                            At JPM Interactive, we don&apos;t follow trends for the sake of it. We believe in a different approach…
                        </p>
                    </div>

                    {/* Act 2 — Journey (simplified) */}
                    <div className="mt-12 sm:mt-16 flex flex-wrap justify-center gap-4 sm:gap-6">
                        {JOURNEY_STEPS.map((step) => (
                            <span key={step} className="text-sm font-semibold text-slate-600">
                                {t(`sections.cta.journey.${step}`)}
                            </span>
                        ))}
                    </div>

                    {/* Act 3 — CTA */}
                    <div className="mt-10 sm:mt-12 md:mt-16 flex flex-col items-center gap-6">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
                            {t("sections.letsWorkTogether")}
                        </h3>
                        <p className="text-base sm:text-lg text-slate-600 max-w-xl">
                            {t("sections.bigIdeaWaiting")}
                        </p>
                        <Link
                            href={prefixPath(locale, "/contact")}
                            className="inline-flex items-center gap-3 text-base sm:text-lg font-bold rounded-full px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-[#6B9FF7] to-[#8B5CF6] text-white shadow-lg shadow-[#6B9FF7]/25"
                        >
                            {t("sections.getInTouch")}
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}
