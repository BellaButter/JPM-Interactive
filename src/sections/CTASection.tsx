"use client";

import { useRef, useLayoutEffect, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotion } from "@/system/motion/useMotion";
import Container from "@/components/layout/Container";
import { CTAVideoScene } from "@/sections/cta/CTAVideoScene";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const CINEMATIC_VIDEO_SRC = "/Cinematic/cinematic.mp4";
const CINEMATIC_POSTER_SRC = "/Cinematic/frame_0080.jpg";

const PHASE1_END = 0.3;
const PHASE2_END = 0.85;
const PHASE3_START = 0.85;
const SCROLL_TRIGGER_END = "+=300%";
const SCRUB_VALUE = 1;
const SCROLL_PROMPT_TEXT = "Scroll to explore";
const SCROLL_PROMPT_FADE_END = 0.12;

const INITIAL_LEFT_PERCENT = 8;
const INITIAL_WIDTH_VW = 42;
const INITIAL_HEIGHT_VH = 65;
const INITIAL_TOP_PERCENT = 78;
const INITIAL_TOP_OFFSET = "5rem";

const narrativeBlocks = [
    {
        id: "intro",
        headline: "JPM Interactive",
        subtext: "Where Technology Meets Creativity",
        sideText: {
            title: "Creative Digital Experiences",
            description: "At JPM Interactive, we don't follow trends for the sake of it. We believe in a different approach - one that's centered around you, your audience, and the art of creating a memorable, personalized experience."
        }
    }
];

function checkWebGLSupport(): boolean {
    if (typeof window === "undefined") return false;
    try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl");
        return Boolean(gl);
    } catch {
        return false;
    }
}

function CTAEndingOverlay({
    endingTextRef,
    children,
}: {
    endingTextRef: React.RefObject<HTMLDivElement | null>;
    children: React.ReactNode;
}) {
    return (
        <div
            ref={endingTextRef}
            className="absolute inset-0 flex flex-col items-center justify-center opacity-0 z-30"
            style={{
                willChange: "opacity",
                background: "radial-gradient(circle at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)",
                pointerEvents: "none"
            }}
        >
            <div className="text-center px-8 flex flex-col items-center pointer-events-auto">
                {children}
            </div>
        </div>
    );
}

function CTAButton() {
    return (
        <Link href="/contact" className="inline-block pointer-events-auto">
            <motion.button
                className="group relative inline-flex items-center justify-center gap-3 sm:gap-4 text-base sm:text-lg md:text-xl lg:text-2xl font-bold rounded-full overflow-hidden min-w-[12rem] sm:min-w-[14rem] px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 border-2 border-[#6192F8]/25 bg-white touch-manipulation"
                style={{
                    cursor: "pointer",
                    WebkitTapHighlightColor: "rgba(97, 146, 248, 0.2)"
                }}
                variants={{
                    rest: { scale: 1, y: 0 },
                    hover: { scale: 1.06, y: -2 },
                    tap: { scale: 0.97 },
                }}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
                <div className="absolute inset-0 rounded-full bg-white" />
                <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
                    variants={{ rest: {}, hover: {} }}
                >
                    <motion.div
                        className="absolute inset-y-0 w-1/2"
                        variants={{
                            rest: { x: "-100%" },
                            hover: { x: "200%" },
                        }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            background: "linear-gradient(90deg, transparent, rgba(97,146,248,0.12), transparent)",
                        }}
                    />
                </motion.div>
                <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ boxShadow: "inset 0 0 0 rgba(0,0,0,0.04)" }}
                    variants={{
                        rest: {},
                        hover: { boxShadow: "inset 0 0 30px rgba(97,146,248,0.08)" },
                    }}
                    transition={{ duration: 0.3 }}
                />
                <motion.span
                    className="relative z-10 text-[#6192F8]"
                    variants={{ rest: { letterSpacing: "0em" }, hover: { letterSpacing: "0.05em" } }}
                    transition={{ duration: 0.2 }}
                >
                    Get In Touch
                </motion.span>
                <motion.span
                    className="relative z-10 text-[#6192F8] flex items-center"
                    variants={{ rest: { x: 0 }, hover: { x: 6 } }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </motion.span>
            </motion.button>
        </Link>
    );
}

export default function CTASection() {
    const { motionConfig, reducedMotion } = useMotion();

    const containerRef = useRef<HTMLDivElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const sideTextRef = useRef<HTMLDivElement>(null);
    const endingTextRef = useRef<HTMLDivElement>(null);
    const scrollPromptRef = useRef<HTMLParagraphElement>(null);
    const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
    const mobileCinematicWrapRef = useRef<HTMLDivElement>(null);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
    const scrollEndTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [videoReady, setVideoReady] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const [webGLSupported, setWebGLSupported] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        setWebGLSupported(checkWebGLSupport());
    }, []);

    const shouldPin = motionConfig.enableScrollPin && !reducedMotion;

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const onCanPlay = () => setVideoReady(true);
        video.addEventListener("canplay", onCanPlay);
        if (video.readyState >= 2) setVideoReady(true);
        return () => video.removeEventListener("canplay", onCanPlay);
    }, []);

    useEffect(() => {
        if (!videoReady || typeof window === "undefined") return;
        const t = setTimeout(() => ScrollTrigger.refresh(), 300);
        const onResize = () => ScrollTrigger.refresh();
        window.addEventListener("resize", onResize);
        return () => {
            clearTimeout(t);
            window.removeEventListener("resize", onResize);
        };
    }, [videoReady]);

    useLayoutEffect(() => {
        if (!containerRef.current || typeof window === "undefined") return;

        const onVideoEnded = () => {
            if (endingTextRef.current) gsap.set(endingTextRef.current, { opacity: 1, pointerEvents: "auto" });
        };

        const ctx = gsap.context(() => {
            if (!shouldPin) {
                panelsRef.current.forEach((panel) => {
                    if (!panel) return;
                    gsap.fromTo(
                        panel,
                        { opacity: 0, y: 20 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: panel,
                                start: "top 80%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                });

                const wrap = mobileCinematicWrapRef.current;
                const video = videoRef.current;
                if (wrap && video && videoReady) {
                    const st = ScrollTrigger.create({
                        trigger: wrap,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                        onUpdate: (self) => {
                            const progress = self.progress;
                            if (!isNaN(video.duration)) {
                                video.currentTime = progress * video.duration;
                            }
                        }
                    });
                    scrollTriggerRef.current = st;
                    requestAnimationFrame(() => ScrollTrigger.refresh());
                }
                return;
            }

            const video = videoRef.current;
            const videoContainer = videoContainerRef.current;
            const sideText = sideTextRef.current;
            const endingText = endingTextRef.current;
            const scrollPrompt = scrollPromptRef.current;

            if (!video || !videoContainer || !sideText || !endingText || !videoReady) return;

            gsap.set(endingText, { opacity: 0 });
            if (scrollPrompt) gsap.set(scrollPrompt, { opacity: 1 });

            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
            const initW = (INITIAL_WIDTH_VW / 100) * vw;
            const initH = (INITIAL_HEIGHT_VH / 100) * vh;
            const initLeft = (INITIAL_LEFT_PERCENT / 100) * vw;
            const initTop = (INITIAL_TOP_PERCENT / 100) * vh + 5 * rem;

            gsap.set(videoContainer, {
                position: "absolute",
                left: initLeft,
                top: initTop,
                width: initW,
                height: initH,
                borderRadius: 24,
                x: 0,
                y: -initH * 0.5,
                boxShadow: "0 25px 80px rgba(123, 169, 247, 0.3)"
            });
            gsap.set(sideText, { opacity: 1, x: 0, top: initTop, y: -initH * 0.5 });

            video.addEventListener("ended", onVideoEnded);

            const st = ScrollTrigger.create({
                trigger: containerRef.current,
                pin: true,
                pinSpacing: true,
                start: "top top",
                end: SCROLL_TRIGGER_END,
                scrub: SCRUB_VALUE,
                invalidateOnRefresh: true,
                anticipatePin: 1,
                markers: false,
                onUpdate: (self) => {
                    const progress = self.progress;

                    if (scrollPrompt) {
                        const promptOpacity = progress < SCROLL_PROMPT_FADE_END
                            ? 1 - progress / SCROLL_PROMPT_FADE_END
                            : 0;
                        gsap.set(scrollPrompt, { opacity: promptOpacity });
                    }

                    if (progress <= PHASE1_END) {
                        const t = progress / PHASE1_END;
                        const vw = window.innerWidth;
                        const vh = window.innerHeight;
                        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
                        const startW = (INITIAL_WIDTH_VW / 100) * vw;
                        const startH = (INITIAL_HEIGHT_VH / 100) * vh;
                        const w = startW + (vw - startW) * t;
                        const h = startH + (vh - startH) * t;
                        const leftPx = (INITIAL_LEFT_PERCENT / 100) * vw * (1 - t);
                        const startTopPx = (INITIAL_TOP_PERCENT / 100) * vh + 5 * rem;
                        const topPx = startTopPx * (1 - t);
                        const yPx = (-0.5 * h) * (1 - t);
                        const borderRadius = 24 * (1 - t);
                        gsap.set(videoContainer, {
                            position: "absolute",
                            left: leftPx,
                            top: topPx,
                            y: yPx,
                            width: w,
                            height: h,
                            borderRadius: `${borderRadius}px`,
                            x: 0,
                            boxShadow: t >= 1 ? "none" : "0 25px 80px rgba(123, 169, 247, 0.3)"
                        });
                        gsap.set(sideText, { opacity: 1 - t, x: 100 * t, top: startTopPx, y: -startH * 0.5 });
                    } else {
                        gsap.set(videoContainer, {
                            position: "absolute",
                            left: 0,
                            top: 0,
                            width: window.innerWidth,
                            height: window.innerHeight,
                            x: 0,
                            y: 0,
                            zIndex: 5,
                            borderRadius: 0,
                            boxShadow: "none"
                        });
                        const sideTopPx = (INITIAL_TOP_PERCENT / 100) * window.innerHeight + 5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
                        gsap.set(sideText, { opacity: 0, x: 100, top: sideTopPx, y: -(INITIAL_HEIGHT_VH / 100) * window.innerHeight * 0.5 });
                    }

                    if (progress > PHASE1_END && progress <= PHASE2_END && !isNaN(video.duration)) {
                        const videoProgress = (progress - PHASE1_END) / (PHASE2_END - PHASE1_END);
                        const targetTime = Math.min(videoProgress * video.duration, video.duration);
                        video.pause();
                        video.currentTime = targetTime;

                        if (scrollEndTimeoutRef.current) clearTimeout(scrollEndTimeoutRef.current);
                        scrollEndTimeoutRef.current = setTimeout(() => {
                            scrollEndTimeoutRef.current = null;
                            if (video.paused && !isNaN(video.duration)) video.play();
                        }, 120);
                    } else {
                        if (scrollEndTimeoutRef.current) {
                            clearTimeout(scrollEndTimeoutRef.current);
                            scrollEndTimeoutRef.current = null;
                        }
                        video.pause();
                        if (progress <= PHASE1_END && !isNaN(video.duration)) video.currentTime = 0;
                        if (progress > PHASE2_END && !isNaN(video.duration)) video.currentTime = video.duration;
                    }

                    if (progress >= PHASE3_START) {
                        const t = (progress - PHASE3_START) / (1 - PHASE3_START);
                        const raw = 1 - Math.pow(1 - Math.min(1, t), 2);
                        const opacity = raw < 0.01 ? 0 : raw > 0.99 ? 1 : raw;
                        gsap.set(endingText, { opacity, pointerEvents: opacity > 0.5 ? "auto" : "none" });
                    } else {
                        gsap.set(endingText, { opacity: 0, pointerEvents: "none" });
                    }
                }
            });

            scrollTriggerRef.current = st;
            requestAnimationFrame(() => {
                requestAnimationFrame(() => ScrollTrigger.refresh());
            });
        }, containerRef);

        return () => {
            const video = videoRef.current;
            if (video) {
                video.removeEventListener("ended", onVideoEnded);
                video.pause();
            }
            if (scrollEndTimeoutRef.current) {
                clearTimeout(scrollEndTimeoutRef.current);
                scrollEndTimeoutRef.current = null;
            }
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
                scrollTriggerRef.current = null;
            }
            ctx.revert();
        };
    }, [shouldPin, reducedMotion, videoReady]);

    const renderCinematicContent = (className?: string) => {
        if (!hasMounted || !webGLSupported) {
            return (
                <img
                    src={CINEMATIC_POSTER_SRC}
                    alt="JPM Interactive Showcase"
                    className={className ?? "w-full h-full object-cover"}
                />
            );
        }
        return (
            <Canvas
                dpr={[1, 2]}
                gl={{ antialias: false, alpha: false }}
                camera={{ position: [0, 0, 5], fov: 50 }}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    display: "block"
                }}
            >
                <CTAVideoScene videoRef={videoRef} videoReady={videoReady} />
            </Canvas>
        );
    };

    return (
        <section
            ref={containerRef}
            className={`relative z-30 isolate w-full min-w-full max-w-none text-gray-900 ${shouldPin ? "min-h-screen overflow-hidden bg-white" : "pt-16 sm:pt-24 pb-12 sm:pb-20 bg-white"}`}
        >
            <video
                ref={videoRef}
                src={CINEMATIC_VIDEO_SRC}
                muted
                playsInline
                preload="auto"
                crossOrigin="anonymous"
                className="absolute opacity-0 pointer-events-none w-0 h-0"
                aria-hidden
            />

            {shouldPin && videoReady ? (
                <div className="relative w-full h-screen overflow-hidden">
                    <div
                        ref={videoContainerRef}
                        className="overflow-hidden bg-black"
                        style={{
                            position: "absolute",
                            willChange: "transform, width, height, border-radius, left, top"
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%"
                            }}
                        >
                            {renderCinematicContent()}
                        </div>

                        <CTAEndingOverlay endingTextRef={endingTextRef}>
                            <h2
                                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-6 sm:mb-8 leading-tight tracking-tight"
                                style={{
                                    textShadow: "0 4px 40px rgba(0, 0, 0, 0.9), 0 2px 20px rgba(0, 0, 0, 0.8)"
                                }}
                            >
                                Let&apos;s work
                                <br />
                                together!
                            </h2>
                            <p
                                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/80 max-w-2xl mx-auto mb-8 sm:mb-10"
                                style={{ textShadow: "0 2px 24px rgba(0, 0, 0, 0.8)" }}
                            >
                                Is your big idea waiting to build?
                            </p>
                            <CTAButton />
                        </CTAEndingOverlay>
                    </div>

                    <div
                        ref={sideTextRef}
                        className="absolute right-8 lg:right-16 w-full lg:w-5/12 z-20 pointer-events-none hidden md:block"
                        style={{ willChange: "opacity, transform", maxWidth: "36rem" }}
                    >
                        <div className="space-y-6">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
                                {narrativeBlocks[0].sideText?.title}
                            </h3>
                            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                                {narrativeBlocks[0].sideText?.description}
                            </p>
                            <div className="pt-4">
                                <p className="text-sm text-slate-500 italic">Scroll to explore more →</p>
                            </div>
                        </div>
                    </div>

                    <p
                        ref={scrollPromptRef}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-sm sm:text-base text-slate-500 tracking-wider uppercase"
                        style={{ willChange: "opacity" }}
                    >
                        {SCROLL_PROMPT_TEXT} →
                    </p>
                </div>
            ) : (
                <Container className="h-full py-16 sm:py-20">
                    <div className="relative w-full h-full flex flex-col gap-16 sm:gap-20">
                        {narrativeBlocks.map((block, index) => (
                            <div
                                key={block.id}
                                ref={(el) => { panelsRef.current[index] = el; }}
                                className="flex flex-col items-center text-center max-w-4xl mx-auto px-4 relative opacity-0"
                            >
                                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4 sm:mb-6">
                                    {block.headline}
                                </h2>
                                <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed font-light mb-8">
                                    {block.subtext}
                                </p>

                                <div
                                    ref={mobileCinematicWrapRef}
                                    className="relative w-full mb-8 sm:mb-12 rounded-2xl shadow-2xl overflow-hidden bg-black aspect-video"
                                    style={{ maxWidth: "48rem" }}
                                >
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            width: "100%",
                                            height: "100%"
                                        }}
                                    >
                                        {renderCinematicContent()}
                                    </div>
                                </div>

                                <div className="mt-8 sm:mt-12 flex flex-col items-center gap-8">
                                    <div className="text-center max-w-md">
                                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                            Let&apos;s work together!
                                        </h3>
                                        <p className="text-base sm:text-lg text-gray-600 mb-8">
                                            Is your big idea waiting to build?
                                        </p>
                                    </div>
                                    <CTAButton />
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            )}
        </section>
    );
}
