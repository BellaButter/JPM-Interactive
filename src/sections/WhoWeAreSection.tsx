"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/animations/ScrollReveal";

const STATS = [
    { end: 50, suffix: "+", label: "Projects Delivered" },
    { end: 5, suffix: "+", label: "Years Experience" },
    { end: 30, suffix: "+", label: "Clients & Partners" },
];

function useCountUp(end: number, inView: boolean, duration = 1200) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!inView) return;
        let startTime: number;
        const step = (t: number) => {
            if (startTime === undefined) startTime = t;
            const elapsed = t - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(easeOut * end));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [inView, end, duration]);
    return count;
}

function StatCard({
    stat,
    index,
}: {
    stat: { end: number; suffix: string; label: string };
    index: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-20px" });
    const count = useCountUp(stat.end, inView, 1400);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 22,
                delay: index * 0.1,
            }}
            whileHover={{
                scale: 1.05,
                y: -4,
                transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.98 }}
            className="text-center p-4 sm:p-5 rounded-2xl border border-[#7BA9F7]/25 bg-gradient-to-br from-[#f8faff] to-[#f3efff] shadow-sm cursor-default relative overflow-hidden"
        >
            <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(123,169,247,0.12) 0%, transparent 70%)",
                }}
            />
            <motion.div
                className="relative text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6B9FF7] to-[#8B5CF6]"
                whileHover={{ scale: 1.08 }}
            >
                {count}
                {stat.suffix}
            </motion.div>
            <div className="relative text-xs sm:text-sm text-gray-600 mt-1 font-medium">
                {stat.label}
            </div>
        </motion.div>
    );
}

const VALUES = [
    {
        title: "Creativity",
        description: "We push boundaries with bold ideas and memorable visuals.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
        ),
    },
    {
        title: "Technology",
        description: "We blend cutting-edge tech with seamless user experiences.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        title: "Experience",
        description: "Every project is crafted to engage and inspire audiences.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
        ),
    },
    {
        title: "Impact",
        description: "We deliver results that matter for brands and their audiences.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
];

export default function WhoWeAreSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const rightOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.4, 1, 1, 0.4]);
    const rightY = useTransform(scrollYProgress, [0, 0.2], [24, 0]);
    const rightScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.96, 1, 1, 0.98]);
    const headingY = useTransform(scrollYProgress, [0, 0.15], [30, 0]);
    const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [0.5, 1]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-[60vh] sm:min-h-[70vh] overflow-hidden flex items-center pt-20 sm:pt-28 pb-12 sm:pb-20 bg-white"
        >
            {/* Subtle floating orbs - ลูกเล่นพื้นหลัง */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
                <motion.div
                    className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-[#7BA9F7]/8 blur-3xl"
                    animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/4 left-0 w-48 h-48 rounded-full bg-[#8B5CF6]/10 blur-3xl"
                    animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <Container className="relative z-20 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Left: heading + copy - ขยับตาม scroll */}
                    <motion.div className="order-1" style={{ y: headingY, opacity: headingOpacity }}>
                        <ScrollReveal variant="fade" delay={0.1}>
                            <motion.h2
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 sm:mb-8"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B9FF7] via-[#8B9FF8] to-[#B8A9F9]">
                                    WHO WE ARE
                                </span>
                            </motion.h2>
                        </ScrollReveal>
                        <ScrollReveal variant="slide" delay={0.2}>
                            <motion.p
                                className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-xl font-normal"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 100, damping: 22, delay: 0.15 }}
                            >
                                We are a team of visionaries and creators dedicated to pushing the boundaries of digital interaction. Our mission is to craft immersive experiences that engage, inspire, and perform.
                            </motion.p>
                        </ScrollReveal>
                    </motion.div>

                    {/* Right: Stats + Values - scale + ลูกเล่นการ์ด */}
                    <motion.div
                        className="order-2 flex flex-col gap-8 sm:gap-10"
                        style={{ opacity: rightOpacity, y: rightY, scale: rightScale }}
                    >
                        {/* A: Stats row - ตัวเลขวิ่ง (count-up) ตอน scroll มา */}
                        <div className="grid grid-cols-3 gap-4 sm:gap-6">
                            {STATS.map((stat, i) => (
                                <StatCard key={stat.label} stat={stat} index={i} />
                            ))}
                        </div>

                        {/* B: Values cards - hover ขยับ ไอคอนหมุน เงา */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {VALUES.map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20, y: 16 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    viewport={{ once: true, margin: "-10px" }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 150,
                                        damping: 22,
                                        delay: 0.1 + i * 0.07,
                                    }}
                                >
                                    <motion.div
                                        className="flex gap-4 p-6 sm:p-8 rounded-2xl border border-[#7BA9F7]/20 bg-white/80 shadow-sm relative overflow-hidden"
                                        whileHover={{
                                            y: -6,
                                            scale: 1.02,
                                            boxShadow: "0 20px 40px -12px rgba(123,169,247,0.25)",
                                            borderColor: "rgba(123,169,247,0.5)",
                                            transition: { type: "spring", stiffness: 400, damping: 25 },
                                        }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <motion.div
                                            className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#7BA9F7]/20 to-[#8B5CF6]/20 flex items-center justify-center text-[#6B9FF7]"
                                            whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            {item.icon}
                                        </motion.div>
                                        <div className="space-y-2">
                                            <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-gray-600 leading-loose">
                                                {item.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
