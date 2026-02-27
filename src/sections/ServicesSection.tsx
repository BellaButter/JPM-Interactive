"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { useLocale } from "@/context/LocaleContext";
import { prefixPath } from "@/i18n/config";
import { getHomeServices } from "@/data/homeServices";

export default function ServicesSection() {
    const { t, locale } = useLocale();
    const services = getHomeServices(locale);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });
    // ลากตาม scroll ไม่เร็วเกิน — ไล่ตาม scroll
    const pathLength = useTransform(
        scrollYProgress,
        [0, 0.15, 0.35, 0.55, 0.75, 0.9, 1],
        [0, 0.2, 0.4, 0.6, 0.8, 0.95, 1]
    );
    const lineOpacity = useTransform(scrollYProgress, [0, 0.06, 0.94, 1], [0, 1, 1, 0]);

    // เส้นโค้ง เริ่มจากขอบซ้ายจอ (x=0) → S-curve → จบขอบขวา (x=1400)
    const pathD =
        "M 0 100 C 280 300 430 550 720 700 C 1010 850 1230 1050 1400 1300";

    return (
        <section
            ref={containerRef}
            className="relative w-full overflow-x-hidden bg-white pt-24 sm:pt-32 md:pt-40 lg:pt-48 xl:pt-56 pb-40 sm:pb-56 md:pb-64 lg:pb-80 xl:pb-96"
            style={{ marginBottom: "clamp(2rem, 4vw, 4rem)", position: "relative" }}
        >
            {/* เส้นโค้ง abstract - เต็มความกว้างจอ เริ่มจากขอบซ้ายจบขอบขวา (section อยู่เต็มความกว้าง main แล้ว) */}
            <div
                className="absolute top-0 bottom-0 left-1/2 pointer-events-none z-10 hidden md:block"
                style={{ width: '100vw', maxWidth: '100vw', transform: 'translateX(-50%)' }}
            >
                <svg
                    className="absolute w-full h-full"
                    viewBox="0 0 1400 1400"
                    preserveAspectRatio="none"
                    shapeRendering="geometricPrecision"
                >
                    <defs>
                        <linearGradient id="curve-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#6B9FF7" />
                            <stop offset="50%" stopColor="#8B9FF8" />
                            <stop offset="100%" stopColor="#B8A9F9" />
                        </linearGradient>
                        <filter id="curve-glow" x="-60%" y="-60%" width="220%" height="220%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="25" result="blur" />
                            <feMerge><feMergeNode in="blur" /></feMerge>
                        </filter>
                    </defs>
                    {/* ชั้น glow */}
                    <motion.path
                        d={pathD}
                        fill="none"
                        stroke="url(#curve-gradient)"
                        strokeWidth="100"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeOpacity="0.35"
                        filter="url(#curve-glow)"
                        style={{ pathLength, opacity: lineOpacity }}
                    />
                    {/* เส้นหลัก */}
                    <motion.path
                        d={pathD}
                        fill="none"
                        stroke="url(#curve-gradient)"
                        strokeWidth="22"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        shapeRendering="geometricPrecision"
                        style={{ pathLength, opacity: lineOpacity }}
                    />
                </svg>
            </div>

            <div className="relative z-20 w-full flex justify-center">
                <div
                    className="w-full max-w-[1600px] mx-auto"
                    style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        paddingLeft: "clamp(1rem, 4vw, 1.75rem)",
                        paddingRight: "clamp(1rem, 4vw, 1.75rem)",
                    }}
                >
                {/* Header — margin ระหว่างหัวข้อกับข้อมูลด้านล่าง (inline) */}
                <div className="text-center" style={{ marginBottom: "clamp(1.25rem, 4vw, 3.5rem)" }}>
                    <ScrollReveal variant="fade">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight bg-gradient-to-r from-[#6B9FF7] via-[#8B5CF6] to-[#C084FC] bg-clip-text text-transparent">
                            {t("sections.ourServices")}
                        </h2>
                    </ScrollReveal>
                </div>

                {/* Service items */}
                <div className="space-y-40 md:space-y-48 lg:space-y-56 xl:space-y-64">
                    {services.map((service, index) => {
                        const imageOnLeft = index % 2 === 1;
                        return (
                            <ScrollReveal key={service.key} variant="fade" delay={index * 0.1}>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-16 xl:gap-24 items-center">
                                    {/* คอลัมน์แรก — มือถือ: ข้อความบนก่อนภาพ */}
                                    <div className={imageOnLeft ? "order-2 lg:order-1 mt-8 lg:mt-0" : "order-1 lg:order-1"}>
                                        {imageOnLeft ? (
                                            <div className="flex justify-center lg:justify-start">
                                                <Link href={prefixPath(locale, service.href)} className="block w-full max-w-lg xl:max-w-xl">
                                                    <motion.div
                                                        className="group relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200/80 shadow-xl cursor-pointer"
                                                        style={{ boxShadow: `0 20px 60px ${service.color}25` }}
                                                        whileHover={{ scale: 1.03 }}
                                                        transition={{ type: "spring", stiffness: 300, damping: 24 }}
                                                    >
                                                        <Image
                                                            src={service.image}
                                                            alt={service.imageAlt}
                                                            fill
                                                            sizes="(max-width: 1024px) 100vw, 512px"
                                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                                            unoptimized={service.key === "led"}
                                                        />
                                                    </motion.div>
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 mt-8 lg:mt-0">
                                                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-mono text-slate-500" style={{ opacity: 0.7 }}>
                                                    {service.id}
                                                </span>
                                                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight" style={{ lineHeight: 1.3 }}>
                                                    {service.title}
                                                </h3>
                                                <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-xl" style={{ lineHeight: 2 }}>
                                                    {service.description}
                                                </p>
                                                <Link
                                                    href={prefixPath(locale, service.href)}
                                                    className="inline-block text-base md:text-lg font-medium text-[#6B9FF7] hover:text-[#8B9FF8] border-b-2 border-[#6B9FF7]/50 hover:border-[#8B9FF8] transition-all"
                                                    style={{ marginTop: "3rem" }}
                                                >
                                                    {t("common.viewProject")}
                                                </Link>
                                            </div>
                                        )}
                                    </div>

                                    {/* คอลัมน์สอง — มือถือ: ข้อความบนก่อนภาพ */}
                                    <div className={imageOnLeft ? "order-1 lg:order-2" : "order-2 lg:order-2 mt-8 lg:mt-0"}>
                                        {imageOnLeft ? (
                                            <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
                                                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-mono text-slate-500" style={{ opacity: 0.7 }}>
                                                    {service.id}
                                                </span>
                                                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight" style={{ lineHeight: 1.3 }}>
                                                    {service.title}
                                                </h3>
                                                <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-xl" style={{ lineHeight: 2 }}>
                                                    {service.description}
                                                </p>
                                                <Link
                                                    href={prefixPath(locale, service.href)}
                                                    className="inline-block text-base md:text-lg font-medium text-[#6B9FF7] hover:text-[#8B9FF8] border-b-2 border-[#6B9FF7]/50 hover:border-[#8B9FF8] transition-all"
                                                    style={{ marginTop: "3rem" }}
                                                >
                                                    {t("common.viewProject")}
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="flex justify-center lg:justify-end">
                                                <Link href={prefixPath(locale, service.href)} className="block w-full max-w-lg xl:max-w-xl">
                                                    <motion.div
                                                        className="group relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200/80 shadow-xl cursor-pointer"
                                                        style={{ boxShadow: `0 20px 60px ${service.color}25` }}
                                                        whileHover={{ scale: 1.03 }}
                                                        transition={{ type: "spring", stiffness: 300, damping: 24 }}
                                                    >
                                                        <Image
                                                            src={service.image}
                                                            alt={service.imageAlt}
                                                            fill
                                                            sizes="(max-width: 1024px) 100vw, 512px"
                                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                                            unoptimized={service.key === "led"}
                                                        />
                                                    </motion.div>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>
                </div>
            </div>
        </section>
    );
}
