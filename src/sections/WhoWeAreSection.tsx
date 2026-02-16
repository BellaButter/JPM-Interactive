"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function WhoWeAreSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);

    // Scroll-based animations
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Video transformations based on scroll
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.05, 0.95]);
    const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-15, 0, 15]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
    const glowIntensity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-[60vh] sm:min-h-[70vh] overflow-hidden flex items-center py-12 sm:py-20 bg-white"
            style={{ position: "relative" }}
        >

            <Container className="relative z-20 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* ซ้าย: ข้อความ */}
                    <div className="order-2 lg:order-1">
                        <ScrollReveal variant="fade" delay={0.1}>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 sm:mb-8">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B9FF7] via-[#8B9FF8] to-[#B8A9F9]">
                                    WHO WE ARE
                                </span>
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal variant="slide" delay={0.2}>
                            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-xl font-normal">
                                We are a team of visionaries and creators dedicated to pushing the boundaries of digital interaction. Our mission is to craft immersive experiences that engage, inspire, and perform.
                            </p>
                        </ScrollReveal>
                    </div>

                    {/* ขวา: Video with scroll animations */}
                    <div className="order-1 lg:order-2 h-[320px] sm:h-[380px] lg:h-[420px]">
                        <ScrollReveal variant="fade" delay={0.15}>
                            <motion.div
                                ref={videoContainerRef}
                                style={{
                                    scale,
                                    rotateY,
                                    opacity,
                                }}
                                className="relative w-full h-full"
                            >
                                {/* Animated glow effect */}
                                <motion.div
                                    style={{
                                        opacity: glowIntensity,
                                    }}
                                    className="absolute inset-0 rounded-2xl blur-2xl"
                                    animate={{
                                        background: [
                                            'radial-gradient(circle, rgba(123,169,247,0.4) 0%, transparent 70%)',
                                            'radial-gradient(circle, rgba(139,159,248,0.5) 0%, transparent 70%)',
                                            'radial-gradient(circle, rgba(200,155,245,0.4) 0%, transparent 70%)',
                                            'radial-gradient(circle, rgba(123,169,247,0.4) 0%, transparent 70%)',
                                        ]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                />

                                {/* Video container with 3D perspective */}
                                <motion.div
                                    className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-[#7BA9F7]/30 shadow-2xl"
                                    style={{
                                        transformStyle: "preserve-3d",
                                        perspective: "1000px"
                                    }}
                                    whileHover={{
                                        scale: 1.02,
                                        rotateY: 5,
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    {/* Inner glow border */}
                                    <motion.div
                                        className="absolute inset-0 rounded-2xl"
                                        style={{
                                            boxShadow: "inset 0 0 60px rgba(123,169,247,0.2)"
                                        }}
                                        animate={{
                                            boxShadow: [
                                                "inset 0 0 60px rgba(123,169,247,0.2)",
                                                "inset 0 0 80px rgba(139,159,248,0.3)",
                                                "inset 0 0 60px rgba(200,155,245,0.2)",
                                                "inset 0 0 60px rgba(123,169,247,0.2)",
                                            ]
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />

                                    {/* YouTube embed (แทนที่ VIDEO_ID ด้วย ID จริงจาก YouTube) */}
                                    <motion.iframe
                                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1&loop=1&playlist=dQw4w9WgXcQ"
                                        title="Who We Are"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full object-cover relative z-10 rounded-2xl"
                                        initial={{ scale: 1.1 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                    />

                                    {/* Corner accents */}
                                    <motion.div
                                        className="absolute top-0 left-0 w-20 h-20"
                                        style={{
                                            background: "linear-gradient(135deg, rgba(123,169,247,0.3) 0%, transparent 100%)",
                                        }}
                                        animate={{
                                            opacity: [0.3, 0.6, 0.3]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                    <motion.div
                                        className="absolute bottom-0 right-0 w-20 h-20"
                                        style={{
                                            background: "linear-gradient(-45deg, rgba(200,155,245,0.3) 0%, transparent 100%)",
                                        }}
                                        animate={{
                                            opacity: [0.3, 0.6, 0.3]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 1
                                        }}
                                    />
                                </motion.div>
                            </motion.div>
                        </ScrollReveal>
                    </div>
                </div>
            </Container>
        </section>
    );
}
