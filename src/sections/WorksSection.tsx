"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { getFeaturedWorks } from "@/data/works";

const categoryLabels = {
    touch_screen: "Interactive Solutions",
    led: "Visual Experience",
    graphic_design: "Multimedia Design"
};

const categoryColors = {
    touch_screen: "from-[#3b82f6] to-[#06b6d4]",
    led: "from-[#0ea5e9] to-[#22d3ee]",
    graphic_design: "from-[#38bdf8] to-[#06b6d4]"
};

export default function WorksSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const featuredWorks = getFeaturedWorks();

    return (
        <section 
            ref={sectionRef} 
            className="relative z-[5] bg-white overflow-hidden pt-24 sm:pt-32 md:pt-40 lg:pt-48 xl:pt-56 pb-32 sm:pb-40 md:pb-48 lg:pb-56 xl:pb-64"
            style={{ marginTop: '6rem', position: 'relative' }}
        >
            <div
                    className="relative z-10 w-full max-w-[1600px] mx-auto"
                    style={{
                        paddingLeft: "clamp(1.25rem, 5vw, 2rem)",
                        paddingRight: "clamp(1.25rem, 5vw, 2rem)",
                    }}
                >
                {/* Header */}
                <div className="mb-20 sm:mb-24 md:mb-28 lg:mb-32 text-center">
                    <ScrollReveal variant="fade" delay={0.1}>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 tracking-tight leading-none">
                            Featured Work
                        </h2>
                    </ScrollReveal>
                </div>

                {/* Grid - 2 Columns Equal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24 mb-20 sm:mb-24 md:mb-28">
                    {featuredWorks.map((work, index) => (
                        <Link key={work.id} href={`/works/${work.slug}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ delay: index * 0.12, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                                className="group cursor-pointer"
                            >
                                {/* Video Container */}
                                <div 
                                    className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white border border-gray-200"
                                    style={{ 
                                        marginBottom: '2.5rem',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
                                    }}
                                >
                                    {work.media.type === "youtube" ? (() => {
                                        const videoId = work.media.src.split("/").pop()?.split("?")[0] || "";
                                        const previewSrc = `${work.media.src}${work.media.src.includes("?") ? "&" : "?"}autoplay=1&mute=1&loop=1&playlist=${videoId}`;
                                        return (
                                            <iframe
                                                src={previewSrc}
                                                title={work.title}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                                            />
                                        );
                                    })() : work.media.type === "video" ? (
                                        <video
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        >
                                            <source src={work.media.src} type="video/mp4" />
                                        </video>
                                    ) : (
                                        <div className={`w-full h-full bg-gradient-to-br ${categoryColors[work.category]} opacity-30`} />
                                    )}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                                </div>

                                {/* Content */}
                                <div style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                                    <h3 
                                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 group-hover:text-[#6B9FF7] transition-colors duration-300 leading-tight"
                                        style={{ marginBottom: '1.25rem' }}
                                    >
                                        {work.title}
                                    </h3>

                                    {/* Tech Tags */}
                                    {work.technologies && (
                                        <div className="text-sm md:text-base uppercase tracking-wider text-gray-500 font-medium leading-relaxed">
                                            {work.technologies.slice(0, 4).join(' • ')}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center" style={{ marginTop: '5rem' }}>
                    <Link href="/works">
                        <motion.div
                            whileHover={{ y: -2 }}
                            className="inline-block group cursor-pointer"
                        >
                            <div className="flex items-center gap-3 text-xl md:text-2xl text-gray-600 group-hover:text-[#6B9FF7] transition-colors duration-300">
                                <span className="font-medium">See all projects</span>
                                <motion.div
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </motion.div>
                            </div>
                        </motion.div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
