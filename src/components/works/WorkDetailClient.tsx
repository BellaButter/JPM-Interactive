"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { type Work } from "@/data/works";
import { useLocale } from "@/context/LocaleContext";
import { prefixPath } from "@/i18n/config";

export default function WorkDetailClient({
    work,
    nextSlug = null,
    prevSlug = null,
    returnCategory = null,
}: {
    work: Work;
    nextSlug?: string | null;
    prevSlug?: string | null;
    returnCategory?: "led" | "touch_screen" | "graphic_design" | null;
}) {
    const { t, locale } = useLocale();
    const categoryLabels = {
        touch_screen: t("works.interactiveSolutions"),
        led: t("works.visualExperience"),
        graphic_design: t("works.multimediaDesign"),
    };
    const heroRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(heroRef.current, {
                scale: 1.1,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out",
            });

            gsap.from(contentRef.current, {
                y: 100,
                opacity: 0,
                duration: 1,
                delay: 0.3,
                ease: "power3.out",
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <main className="w-full min-h-screen overflow-x-hidden max-w-[100vw] min-w-0 bg-gradient-to-b from-[#fafbff] to-[#f3f4ff]">
            {/* Back Button - อยู่เหนือวิดีโอและ nav */}
            <div className="fixed top-24 sm:top-28 left-0 right-0 z-[110] flex justify-center pointer-events-none">
                <div className="w-full max-w-7xl px-8 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 pointer-events-auto">
                    <Link
                        href={
                            returnCategory
                                ? `${prefixPath(locale, "/case-studies")}?category=${returnCategory}`
                                : prefixPath(locale, "/case-studies")
                        }
                        className="inline-block"
                    >
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
                            className="inline-flex items-center gap-1.5 bg-white border border-[#e5e7eb] rounded-full text-xs sm:text-sm font-medium text-slate-700 hover:border-[#7BA9F7] hover:text-[#7BA9F7] hover:shadow-md active:scale-[0.97] transition-all duration-200 ease-out shadow-sm"
                            style={{ padding: "10px 18px" }}
                        >
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="hidden sm:inline">Back</span>
                        </motion.button>
                    </Link>
                </div>
            </div>

            {/* Hero/Media - z-0 + isolate ให้อยู่ใต้ nav และปุ่ม back (iframe ไม่ซ้อนทับ) */}
            <div
                ref={heroRef}
                className="relative z-0 isolate w-full mt-16 sm:mt-20 md:mt-24 overflow-hidden bg-gray-900"
            >
                <div className="w-full flex justify-center" style={{ paddingLeft: "clamp(1.5rem, 6vw, 2.5rem)", paddingRight: "clamp(1.5rem, 6vw, 2.5rem)" }}>
                    <div className="w-full max-w-7xl">
                        <div className="relative w-full aspect-video max-h-[55vh] sm:max-h-[65vh] md:max-h-[75vh] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-black">
                            {work.youtubeVideoId ? (
                                <iframe
                                    src={`https://www.youtube.com/embed/${work.youtubeVideoId}`}
                                    title={work.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full object-contain"
                                />
                            ) : work.media?.type === "youtube" && work.media?.src ? (
                                <iframe
                                    src={work.media.src}
                                    title={work.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full object-contain"
                                />
                            ) : work.media?.type === "video" && work.media?.src ? (
                                <video
                                    src={work.media.src}
                                    controls
                                    playsInline
                                    muted
                                    className="w-full h-full object-contain"
                                    preload="metadata"
                                    poster={work.cover ? `/${work.cover.replace(/ /g, "%20")}` : undefined}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-[#e8f0ff] via-[#f0e8ff] to-[#ffe8f8] flex items-center justify-center">
                                    <div className="text-6xl sm:text-7xl md:text-9xl opacity-30">
                                        {work.category === "touch_screen" && "🎮"}
                                        {work.category === "led" && "🎬"}
                                        {work.category === "graphic_design" && "🎨"}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content - ระยะขอบ (inline style ให้ชัดบนมือถือ) */}
            <div ref={contentRef} className="w-full flex justify-center">
                <div
                    className="w-full max-w-7xl box-border"
                    style={{
                        paddingTop: "clamp(2rem, 5vw, 3.5rem)",
                        paddingBottom: "clamp(3.5rem, 8vw, 6rem)",
                        paddingLeft: "clamp(1.5rem, 6vw, 2.5rem)",
                        paddingRight: "clamp(1.5rem, 6vw, 2.5rem)",
                    }}
                >
                    <div className="max-w-5xl">
                        {/* Category Badge */}
                        <span
                            className="inline-block bg-gradient-to-r from-[#7BA9F7]/20 to-[#C89BF5]/20 text-[#5B8DEF] text-sm font-medium rounded-full border border-[#7BA9F7]/30"
                            style={{ padding: "12px 24px", marginBottom: "1rem" }}
                        >
                            {categoryLabels[work.category]}
                        </span>

                        {/* Title - แสดงเต็ม ไม่ตัดด้วย ellipsis */}
                        <h1
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-[#5B8DEF] via-[#8B5CF6] to-[#C084FC] bg-clip-text text-transparent leading-tight tracking-tight"
                            style={{ marginBottom: "0.75rem" }}
                        >
                            {work.title}
                        </h1>

                        {/* Description */}
                        <p
                            className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed"
                            style={{ marginBottom: "2rem", lineHeight: 1.75 }}
                        >
                            {work.description}
                        </p>

                        {/* Technologies */}
                        {work.technologies && work.technologies.length > 0 && (
                            <section aria-labelledby="tech-heading" style={{ marginBottom: "2.5rem" }}>
                                <h2
                                    id="tech-heading"
                                    className="text-xl font-semibold text-slate-800 whitespace-nowrap"
                                    style={{ marginBottom: "0.75rem" }}
                                >
                                    {t("common.technologiesUsed")}
                                </h2>
                                <div className="flex flex-wrap" style={{ gap: "0.75rem" }}>
                                    {work.technologies.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="inline-block bg-white border border-[#e5e7eb] rounded-xl text-sm text-slate-700 shadow-sm hover:shadow-md hover:border-[#7BA9F7]/50 transition-colors"
                                            style={{ padding: "12px 20px" }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Call to Action - ระยะแบ่ง section ชัดแต่ไม่ล้น */}
                        <section
                            className="border-t border-[#e5e7eb]"
                            aria-labelledby="cta-heading"
                            style={{ paddingTop: "2.5rem" }}
                        >
                            <h2
                                id="cta-heading"
                                className="text-2xl sm:text-3xl font-bold text-slate-800 whitespace-nowrap"
                                style={{ marginBottom: "0.5rem" }}
                            >
                                {t("common.interestedInProject")}
                            </h2>
                            <p
                                className="text-slate-600 text-base sm:text-lg leading-relaxed"
                                style={{ marginBottom: "1.5rem" }}
                            >
                                {t("common.discussVision")}
                            </p>
                            <Link href={prefixPath(locale, "/contact")} className="inline-block">
                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex items-center justify-center gap-2 text-base sm:text-lg font-semibold text-white rounded-full bg-gradient-to-r from-[#7BA9F7] via-[#8B9FF8] to-[#a78bfa] shadow-lg shadow-[#7BA9F7]/30 hover:shadow-[#7BA9F7]/50 transition-shadow"
                                    style={{ padding: "1rem 2rem" }}
                                >
                                    {t("sections.getInTouch")}
                                </motion.button>
                            </Link>
                        </section>

                        {/* Prev / Next project */}
                        {(prevSlug || nextSlug) && (
                            <nav
                                className="flex flex-wrap items-center justify-between gap-4 border-t border-[#e5e7eb]"
                                style={{ marginTop: "4rem", paddingTop: "2rem" }}
                                aria-label="Previous and next project"
                            >
                                {prevSlug ? (
                                    <Link
                                        href={
                                            prefixPath(locale, `/case-studies/${prevSlug}`) +
                                            (returnCategory ? `?category=${returnCategory}` : "")
                                        }
                                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#6B9FF7] transition-colors duration-200"
                                    >
                                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        <span>{t("common.previousProject")}</span>
                                    </Link>
                                ) : (
                                    <span />
                                )}
                                {nextSlug ? (
                                    <Link
                                        href={
                                            prefixPath(locale, `/case-studies/${nextSlug}`) +
                                            (returnCategory ? `?category=${returnCategory}` : "")
                                        }
                                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#6B9FF7] transition-colors duration-200 ml-auto"
                                    >
                                        <span>{t("common.nextProject")}</span>
                                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                ) : null}
                            </nav>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
