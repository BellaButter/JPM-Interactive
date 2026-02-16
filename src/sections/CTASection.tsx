"use client";

import { useRef, useLayoutEffect, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotion } from "@/system/motion/useMotion";
import Container from "@/components/layout/Container";

// Register GSAP plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 160;
const currentFrame = (index: number) => `/Cinematic/frame_${String(index + 1).padStart(4, '0')}.jpg`;

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

export default function CTASection() {
    // 1. Motion Governance
    const { motionConfig, interactionMode, reducedMotion } = useMotion();

    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const sideTextRef = useRef<HTMLDivElement>(null);
    const endingTextRef = useRef<HTMLDivElement>(null);
    const hasReachedEndRef = useRef(false);
    const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
    const mobileCinematicWrapRef = useRef<HTMLDivElement>(null);
    const mobileCanvasRef = useRef<HTMLCanvasElement>(null);
    
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // 2. Determine if we should pin
    // Rule: Pin ONLY if allowed by config AND desktop AND motion is enabled
    const shouldPin = motionConfig.enableScrollPin && interactionMode === "desktop" && !reducedMotion;

    // Preload images
    useEffect(() => {
        const imageArray: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            img.onload = () => {
                loadedCount++;
                if (loadedCount === TOTAL_FRAMES) {
                    setImagesLoaded(true);
                }
            };
            imageArray.push(img);
        }

        setImages(imageArray);
    }, []);

    // Refresh ScrollTrigger after layout (desktop pin or mobile cinematic)
    useEffect(() => {
        if (!imagesLoaded || typeof window === "undefined") return;
        const t = setTimeout(() => ScrollTrigger.refresh(), 300);
        const onResize = () => ScrollTrigger.refresh();
        window.addEventListener("resize", onResize);
        return () => {
            clearTimeout(t);
            window.removeEventListener("resize", onResize);
        };
    }, [imagesLoaded]);

    useLayoutEffect(() => {
        // Safety check for ref and environment
        if (!containerRef.current || typeof window === "undefined") return;

        const ctx = gsap.context(() => {
            // Mobile / Simplified Logic:
            if (!shouldPin) {
                panelsRef.current.forEach((panel) => {
                    if (!panel) return;
                    gsap.fromTo(panel,
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

                // Mobile scroll-driven cinematic: scrub frames as user scrolls through the block
                const wrap = mobileCinematicWrapRef.current;
                const mobileCanvas = mobileCanvasRef.current;
                if (wrap && mobileCanvas && imagesLoaded && images.length === TOTAL_FRAMES) {
                    const ctx = mobileCanvas.getContext("2d");
                    if (ctx) {
                        const drawFrame = (frameIndex: number) => {
                            const frame = Math.min(Math.max(0, frameIndex), TOTAL_FRAMES - 1);
                            const img = images[frame];
                            if (!img) return;
                            const w = mobileCanvas.clientWidth;
                            const h = mobileCanvas.clientHeight;
                            if (w <= 0 || h <= 0) return;
                            mobileCanvas.width = w;
                            mobileCanvas.height = h;
                            ctx.drawImage(img, 0, 0, w, h);
                        };

                        // Initial frame
                        drawFrame(0);

                        ScrollTrigger.create({
                            trigger: wrap,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1,
                            onUpdate: (self) => {
                                const frameIndex = Math.floor(self.progress * (TOTAL_FRAMES - 1));
                                drawFrame(frameIndex);
                            }
                        });
                        requestAnimationFrame(() => ScrollTrigger.refresh());
                    }
                }
                return;
            }

            // Desktop check - exit if missing refs or images not loaded
            const canvas = canvasRef.current;
            const context = canvas?.getContext("2d");
            const videoContainer = videoContainerRef.current;
            const sideText = sideTextRef.current;
            const endingText = endingTextRef.current;

            if (!canvas || !context || !videoContainer || !sideText || !endingText || !imagesLoaded) return;

            // Desktop / Cinematic Video Scroll Logic:
            
            // Set canvas size
            canvas.width = 1920;
            canvas.height = 1080;

            const frameObj = { frame: 0 };
            let autoPlayTween: gsap.core.Tween | null = null;
            let isScrolling = false;
            let lastScrollTime = 0;
            let previousFrame = 0;

            const startAutoPlay = (fromFrame: number) => {
                if (autoPlayTween) {
                    autoPlayTween.kill();
                }
                
                frameObj.frame = fromFrame;
                
                const remainingFrames = TOTAL_FRAMES - fromFrame;
                const remainingDuration = (remainingFrames / TOTAL_FRAMES) * 10;
                
                autoPlayTween = gsap.to(frameObj, {
                    frame: TOTAL_FRAMES - 1,
                    duration: Math.max(remainingDuration, 1),
                    ease: "none",
                    onUpdate: updateCanvas,
                    onComplete: () => {
                        updateCanvas();
                        // Loop: hide ending text and restart from frame 0
                        hasReachedEndRef.current = false;
                        gsap.to(endingText, { opacity: 0, duration: 0.3 });
                        startAutoPlay(0);
                    }
                });
            };

            // Check scroll state continuously
            const checkScrollState = () => {
                const now = Date.now();
                if (isScrolling && now - lastScrollTime > 100) {
                    // Scrolling stopped
                    isScrolling = false;
                    const currentFrame = Math.floor(frameObj.frame);
                    startAutoPlay(currentFrame);
                }
                if (isScrolling) {
                    requestAnimationFrame(checkScrollState);
                }
            };

            const updateCanvas = () => {
                const frameIndex = Math.min(
                    Math.floor(frameObj.frame),
                    TOTAL_FRAMES - 1
                );
                if (images[frameIndex]) {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(images[frameIndex], 0, 0, canvas.width, canvas.height);
                }

                // Check if scrolling forward and reached the end range
                if (frameIndex >= 140 && frameIndex > previousFrame && !hasReachedEndRef.current) {
                    hasReachedEndRef.current = true;
                }

                // Reset when scrolling back before frame 140
                if (frameIndex < 140 && previousFrame >= 140) {
                    hasReachedEndRef.current = false;
                }

                // Show ending text only when in frame range 140-160 AND has reached it
                if (frameIndex >= 140 && frameIndex <= 160 && hasReachedEndRef.current) {
                    if (endingText.style.opacity !== "1") {
                        gsap.to(endingText, {
                            opacity: 1,
                            duration: 0.8,
                            ease: "power2.out"
                        });
                    }
                } else {
                    if (endingText.style.opacity !== "0") {
                        gsap.to(endingText, {
                            opacity: 0,
                            duration: 0.4,
                            ease: "power2.in"
                        });
                    }
                }

                previousFrame = frameIndex;
            };

            // Initial frame display (no auto-play on enter)
            updateCanvas();
            
            // Set initial state - hide ending text
            gsap.set(endingText, { opacity: 0 });

            // Don't auto-play when section enters viewport
            // Video will only play when user starts scrolling

            // Create scroll-driven animation
            const mainTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    pinSpacing: true,
                    start: "top top",
                    end: "+=250%",
                    scrub: 1,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        // Update scroll time
                        lastScrollTime = Date.now();
                        
                        if (!isScrolling) {
                            isScrolling = true;
                            requestAnimationFrame(checkScrollState);
                        }
                        
                        // Kill auto-play when scroll starts
                        if (autoPlayTween) {
                            autoPlayTween.kill();
                            autoPlayTween = null;
                        }
                        
                        // Use requestAnimationFrame for smoother updates
                        requestAnimationFrame(() => {
                            // Update frame based on scroll progress
                            frameObj.frame = self.progress * (TOTAL_FRAMES - 1);
                            updateCanvas();
                        });
                    }
                }
            });

            // Video expansion animation - happens INSTANTLY (first 5% of scroll)
            mainTimeline.fromTo(videoContainer, 
                {
                    width: "50%",
                    height: "70%",
                    borderRadius: "24px",
                    x: "-25%"
                },
                {
                    width: "100vw",
                    height: "100vh",
                    borderRadius: "0px",
                    x: "0%",
                    duration: 0.05, // Super fast - almost instant
                    ease: "power4.out"
                },
                0
            );

            // Side text fade out instantly
            mainTimeline.fromTo(sideText,
                {
                    opacity: 1,
                    x: 0
                },
                {
                    opacity: 0,
                    x: 100,
                    duration: 0.05, // Super fast
                    ease: "power4.out"
                },
                0
            );

            // Shadow fade out instantly
            mainTimeline.fromTo(videoContainer,
                {
                    boxShadow: "0 25px 80px rgba(123, 169, 247, 0.3)"
                },
                {
                    boxShadow: "0 0 0 rgba(123, 169, 247, 0)",
                    duration: 0.05, // Super fast
                    ease: "power4.out"
                },
                0
            );

            // Recalculate pin spacer and scroll height after layout
            requestAnimationFrame(() => {
                requestAnimationFrame(() => ScrollTrigger.refresh());
            });
        }, containerRef);

        return () => ctx.revert();
    }, [shouldPin, reducedMotion, images, imagesLoaded]);

    return (
        <section
            ref={containerRef}
            className={`relative z-20 w-full bg-gradient-to-b from-white to-[#f8f9ff] text-gray-900 ${shouldPin ? 'h-screen overflow-hidden' : 'py-12 sm:py-20'}`}
        >
            {shouldPin && imagesLoaded ? (
                <div className="relative w-full h-full flex items-center justify-center px-8 lg:px-16">
                    {/* Video Container - Starts on left side */}
                    <div
                        ref={videoContainerRef}
                        className="relative overflow-hidden bg-black"
                        style={{
                            width: "50%",
                            height: "70%",
                            borderRadius: "24px",
                            willChange: "transform, width, height, border-radius",
                            transform: "translateX(-25%)"
                        }}
                    >
                        <canvas
                            ref={canvasRef}
                            className="w-full h-full object-cover"
                            style={{
                                willChange: "contents"
                            }}
                        />
                        
                        {/* Ending Text - "Let's work together!" - Inside video container */}
                        <div
                            ref={endingTextRef}
                            className="absolute inset-0 flex flex-col items-center justify-center opacity-0 z-30"
                            style={{
                                willChange: "opacity, transform",
                                background: "radial-gradient(circle at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)",
                                pointerEvents: "none"
                            }}
                        >
                            <div className="text-center px-8 flex flex-col items-center pointer-events-none">
                                <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-6 sm:mb-8 leading-tight tracking-tight"
                                    style={{
                                        textShadow: "0 4px 40px rgba(0, 0, 0, 0.9), 0 2px 20px rgba(0, 0, 0, 0.8)"
                                    }}
                                >
                                    Let's work
                                    <br />
                                    together!
                                </h2>
                                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/80 max-w-2xl mx-auto mb-8 sm:mb-10"
                                   style={{
                                       textShadow: "0 2px 24px rgba(0, 0, 0, 0.8)"
                                   }}
                                >
                                    Is your big idea waiting to build?
                                </p>
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
                                            {/* White background */}
                                            <div className="absolute inset-0 rounded-full bg-white" />
                                            {/* Shimmer sweep on hover - light blue tint */}
                                            <motion.div
                                                className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
                                                variants={{
                                                    rest: {},
                                                    hover: {},
                                                }}
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
                                            {/* Soft shadow on hover */}
                                            <motion.div
                                                className="absolute inset-0 rounded-full pointer-events-none"
                                                style={{
                                                    boxShadow: "inset 0 0 0 rgba(0,0,0,0.04)",
                                                }}
                                                variants={{
                                                    rest: {},
                                                    hover: { boxShadow: "inset 0 0 30px rgba(97,146,248,0.08)" },
                                                }}
                                                transition={{ duration: 0.3 }}
                                            />
                                            {/* Text - blue like JPM logo */}
                                            <motion.span
                                                className="relative z-10 text-[#6192F8]"
                                                variants={{
                                                    rest: { letterSpacing: "0em" },
                                                    hover: { letterSpacing: "0.05em" },
                                                }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                Get In Touch
                                            </motion.span>
                                            {/* Arrow - slides right on hover */}
                                            <motion.span
                                                className="relative z-10 text-[#6192F8] flex items-center"
                                                variants={{
                                                    rest: { x: 0 },
                                                    hover: { x: 6 },
                                                }}
                                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2.5}
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                    />
                                                </svg>
                                            </motion.span>
                                        </motion.button>
                                    </Link>
                                
                            </div>
                        </div>
                    </div>

                    {/* Side Text - Right side, fades out when scrolling */}
                    <div
                        ref={sideTextRef}
                        className="absolute right-8 lg:right-16 w-full lg:w-5/12 max-w-xl z-20"
                        style={{
                            willChange: "opacity, transform"
                        }}
                    >
                        <div className="space-y-6">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
                                {narrativeBlocks[0].sideText?.title}
                            </h3>
                            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                                {narrativeBlocks[0].sideText?.description}
                            </p>
                            <div className="pt-4">
                                <p className="text-sm text-slate-500 italic">
                                    Scroll to explore more →
                                </p>
                            </div>
                        </div>
                    </div>
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
                                
                                {/* Mobile scroll-driven cinematic */}
                                <div
                                    ref={mobileCinematicWrapRef}
                                    className="relative w-full max-w-3xl mb-8 sm:mb-12 rounded-2xl shadow-2xl overflow-hidden bg-black aspect-video"
                                >
                                    <canvas
                                        ref={mobileCanvasRef}
                                        className="w-full h-full object-cover"
                                        style={{ display: imagesLoaded ? "block" : "none" }}
                                    />
                                    {/* Fallback until frames load */}
                                    {!imagesLoaded && (
                                        <img
                                            src="/Cinematic/frame_0080.jpg"
                                            alt="JPM Interactive Showcase"
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    )}
                                </div>
                                
                                {/* Mobile CTA Content */}
                                <div className="mt-8 sm:mt-12 flex flex-col items-center gap-8">
                                    <div className="text-center max-w-md">
                                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                            Let's work together!
                                        </h3>
                                        <p className="text-base sm:text-lg text-gray-600 mb-8">
                                            Is your big idea waiting to build?
                                        </p>
                                    </div>
                                    
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
                                                variants={{
                                                    rest: {},
                                                    hover: {},
                                                }}
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
                                                style={{
                                                    boxShadow: "inset 0 0 0 rgba(0,0,0,0.04)",
                                                }}
                                                variants={{
                                                    rest: {},
                                                    hover: { boxShadow: "inset 0 0 30px rgba(97,146,248,0.08)" },
                                                }}
                                                transition={{ duration: 0.3 }}
                                            />
                                            <motion.span
                                                className="relative z-10 text-[#6192F8]"
                                                variants={{
                                                    rest: { letterSpacing: "0em" },
                                                    hover: { letterSpacing: "0.05em" },
                                                }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                Get In Touch
                                            </motion.span>
                                            <motion.span
                                                className="relative z-10 text-[#6192F8] flex items-center"
                                                variants={{
                                                    rest: { x: 0 },
                                                    hover: { x: 6 },
                                                }}
                                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2.5}
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                    />
                                                </svg>
                                            </motion.span>
                                        </motion.button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            )}
        </section>
    );
}
