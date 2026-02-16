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
        <main className="min-h-screen bg-gradient-to-b from-[#fafbff] to-[#f3f4ff]">
            {/* Back Button - Responsive */}
            <div className="fixed top-24 sm:top-28 left-4 sm:left-[10%] z-50 transition-all duration-300">
                <Link href="/works">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-white border border-[#e5e7eb] rounded-full text-sm text-slate-700 hover:border-[#7BA9F7] hover:text-[#7BA9F7] transition-all shadow-sm"
                        style={{ padding: '8px 20px' }}
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        <span className="hidden sm:inline">Back</span>
                    </motion.button>
                </Link>
            </div>

            {/* Hero/Media - Responsive Video/Image Section */}
            <div
                ref={heroRef}
                className="relative w-full mt-16 sm:mt-20 md:mt-24 overflow-hidden bg-gray-900"
            >
                <div className="relative w-full aspect-video max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] flex items-center justify-center">
                    {work.media?.type === "video" && work.media?.src ? (
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

            {/* Content - Responsive Padding */}
            <div 
                ref={contentRef} 
                className="max-w-[100%] mx-auto pt-12 sm:pt-16 md:pt-24 pb-20 sm:pb-32 md:pb-[25vh] px-6 sm:px-[10%] md:px-[12%] lg:px-[15%] box-border"
            >
                {/* Category Badge */}
                <div
                    className="inline-block bg-gradient-to-r from-[#7BA9F7]/20 to-[#C89BF5]/20 text-[#5B8DEF] text-sm font-medium rounded-full mb-6 border border-[#7BA9F7]/30"
                    style={{ padding: '10px 24px' }}
                >
                    {categoryLabels[work.category]}
                </div>

                {/* Title - Responsive */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#5B8DEF] via-[#8B5CF6] to-[#C084FC] bg-clip-text text-transparent leading-tight">
                    {work.title}
                </h1>

                {/* Description - Responsive */}
                <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 sm:mb-12" style={{ lineHeight: '1.8' }}>
                    {work.description}
                </p>

                {/* Technologies */}
                {work.technologies && work.technologies.length > 0 && (
                    <div className="mb-16" style={{ marginBottom: '100px' }}>
                        <h3 className="text-xl font-semibold mb-4 text-slate-800" style={{ marginBottom: '32px' }}>Technologies Used</h3>
                        <div className="flex flex-wrap gap-3">
                            {work.technologies.map((tech, index) => (
                                <div
                                    key={index}
                                    className="bg-white border border-[#e5e7eb] rounded-lg text-sm text-slate-700 shadow-sm hover:shadow-md hover:border-[#7BA9F7]/50 transition-all"
                                    style={{ padding: '10px 20px' }}
                                >
                                    {tech}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Call to Action */}
                <div className="border-t border-[#e5e7eb] pt-12" style={{ paddingTop: '80px' }}>
                    <h3 className="text-2xl font-bold mb-4 text-slate-800">Interested in a similar project?</h3>
                    <p className="text-slate-600 mb-6">
                        Let's discuss how we can bring your vision to life.
                    </p>
                    <Link href="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-[#7BA9F7] via-[#8B9FF8] to-[#a78bfa] text-white font-semibold rounded-full shadow-lg shadow-[#7BA9F7]/30 hover:shadow-[#7BA9F7]/50 transition-all"
                            style={{ padding: '16px 40px', fontSize: '16px' }}
                        >
                            Get In Touch
                        </motion.button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
