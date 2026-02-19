"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { type Work } from "@/data/works";

const categoryLabels = {
    touch_screen: "Interactive Solutions",
    led: "Visual Experience",
    graphic_design: "Multimedia Design"
};

export default function WorkDetailClient({ work }: { work: Work }) {
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
        <main className="w-full min-h-screen bg-gradient-to-b from-[#fafbff] to-[#f3f4ff]">
            {/* Back Button - aligned with content */}
            <div className="fixed top-24 sm:top-28 left-0 right-0 z-50 flex justify-center pointer-events-none">
                <div className="w-full max-w-7xl px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 pointer-events-auto">
                    <Link href="/works" className="inline-block">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 bg-white border border-[#e5e7eb] rounded-full text-sm font-medium text-slate-700 hover:border-[#7BA9F7] hover:text-[#7BA9F7] transition-all shadow-sm"
                            style={{ padding: "14px 28px" }}
                        >
                            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="hidden sm:inline">Back</span>
                        </motion.button>
                    </Link>
                </div>
            </div>

            {/* Hero/Media - กว้างเต็มจอมากขึ้น */}
            <div
                ref={heroRef}
                className="relative w-full mt-16 sm:mt-20 md:mt-24 overflow-hidden bg-gray-900"
            >
                <div className="w-full flex justify-center px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
                    <div className="w-full max-w-7xl">
                        <div className="relative w-full aspect-video max-h-[55vh] sm:max-h-[65vh] md:max-h-[75vh] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-black">
                        {work.media?.type === "youtube" && work.media?.src ? (
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

            {/* Content - ระยะขอบบน/ล่างให้ห่างวิดีโอและฟุตเตอร์ (ใช้ style ให้แน่นอน) */}
            <div ref={contentRef} className="w-full flex justify-center px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
                <div
                    className="w-full max-w-7xl box-border"
                    style={{
                        paddingTop: "clamp(2rem, 5vw, 3.5rem)",
                        paddingBottom: "clamp(3.5rem, 8vw, 6rem)"
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
                                Technologies Used
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
                            Interested in a similar project?
                        </h2>
                        <p
                            className="text-slate-600 text-base sm:text-lg leading-relaxed"
                            style={{ marginBottom: "1.5rem" }}
                        >
                            Let's discuss how we can bring your vision to life.
                        </p>
                        <Link href="/contact" className="inline-block">
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center justify-center gap-2 text-base sm:text-lg font-semibold text-white rounded-full bg-gradient-to-r from-[#7BA9F7] via-[#8B9FF8] to-[#a78bfa] shadow-lg shadow-[#7BA9F7]/30 hover:shadow-[#7BA9F7]/50 transition-shadow"
                                style={{ padding: "1rem 2rem" }}
                            >
                                Get In Touch
                            </motion.button>
                        </Link>
                    </section>
                </div>
                </div>
            </div>
        </main>
    );
}
