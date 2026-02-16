"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import Container from "@/components/layout/Container";
import { useMotion } from "@/system/motion/useMotion";
import GeometricShapes3D, { type DeviceOrientationState } from "./home/hero/GeometricShapes3D";

export default function HeroSection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const { reducedMotion, interactionMode } = useMotion();
    const isMobile = interactionMode === "mobile";

    const [arEnabled, setArEnabled] = useState(false);
    const [deviceOrientation, setDeviceOrientation] = useState<DeviceOrientationState>(null);
    const [arPermissionError, setArPermissionError] = useState<string | null>(null);
    const [particles, setParticles] = useState<Array<{
        left: number;
        top: number;
        duration: number;
        delay: number;
        opacity: number;
    }>>([]);

    // Generate particles on client side only
    useEffect(() => {
        const generatedParticles = Array.from({ length: 20 }, () => ({
            left: Math.random() * 100,
            top: Math.random() * 100,
            duration: 5 + Math.random() * 10,
            delay: Math.random() * 5,
            opacity: 0.3 + Math.random() * 0.4
        }));
        setParticles(generatedParticles);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation
            if (titleRef.current) {
                const words = titleRef.current.querySelectorAll(".word");

                gsap.fromTo(words,
                    { opacity: 0, y: 100, rotateX: -90 },
                    {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        duration: 1.2,
                        stagger: 0.1,
                        ease: "power3.out",
                        delay: 0.5
                    }
                );
            }

            // Scroll indicator
            if (scrollRef.current) {
                gsap.fromTo(scrollRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 0.85, y: 0, duration: 1, ease: "power2.out", delay: 2 }
                );

                if (!reducedMotion) {
                    gsap.to(scrollRef.current, {
                        opacity: 0.5,
                        duration: 1.5,
                        repeat: -1,
                        yoyo: true
                    });
                }
            }
        });

        return () => ctx.revert();
    }, [reducedMotion]);

    // Mobile AR: request permission (iOS 13+) and start device orientation
    const enableAR = useCallback(() => {
        if (!isMobile) return;
        const req = (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission;
        if (typeof req === "function") {
            req()
                .then((res) => {
                    if (res === "granted") {
                        setArEnabled(true);
                        setArPermissionError(null);
                    } else {
                        setArPermissionError("Motion access denied");
                    }
                })
                .catch(() => setArPermissionError("Motion not available"));
        } else {
            // Non-iOS or permission not required
            setArEnabled(true);
            setArPermissionError(null);
        }
    }, [isMobile]);

    // Listen to device orientation when AR enabled (mobile)
    useEffect(() => {
        if (!isMobile || !arEnabled || reducedMotion) return;
        const handler = (e: DeviceOrientationEvent) => {
            if (e.alpha != null && e.beta != null && e.gamma != null) {
                setDeviceOrientation({
                    alpha: e.alpha,
                    beta: e.beta,
                    gamma: e.gamma
                });
            }
        };
        window.addEventListener("deviceorientation", handler, true);
        return () => window.removeEventListener("deviceorientation", handler, true);
    }, [isMobile, arEnabled, reducedMotion]);

    return (
        <section id="hero" className="relative w-full h-screen overflow-hidden">
            
            {/* Gradient Background with animated glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f0f4ff] via-[#e8f0ff] to-[#f3e8ff]">
                {/* Animated gradient orbs */}
                <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-gradient-radial from-[#7BA9F7]/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-[900px] h-[900px] bg-gradient-radial from-[#C89BF5]/25 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-[#88D4FF]/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Mesh Grid Pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(90deg, rgba(123, 169, 247, 0.15) 1px, transparent 1px),
                        linear-gradient(rgba(123, 169, 247, 0.15) 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px',
                    transform: 'perspective(500px) rotateX(60deg)',
                    transformOrigin: 'center top'
                }}></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map((particle, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-gradient-to-r from-sky-400 to-purple-400 rounded-full"
                        style={{
                            left: `${particle.left}%`,
                            top: `${particle.top}%`,
                            animation: `float ${particle.duration}s ease-in-out infinite`,
                            animationDelay: `${particle.delay}s`,
                            opacity: particle.opacity,
                            filter: 'blur(1px)'
                        }}
                    ></div>
                ))}
            </div>

            {/* 3D Geometric Shapes Background */}
            <div className="absolute inset-0 z-10">
                <GeometricShapes3D isMobile={isMobile} deviceOrientation={isMobile ? deviceOrientation : null} />
            </div>

            {/* Content - Text */}
            <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
                <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
                    <h1 ref={titleRef} className="text-center pointer-events-auto">
                        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight text-slate-700 mb-5 sm:mb-8">
                            <span className="word inline-block mr-5 sm:mr-8 md:mr-10">Crafting</span>
                            {' '}
                            <span className="word inline-block">Interactive</span>
                        </div>
                        <div className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold tracking-tight">
                            <span className="word inline-block bg-gradient-to-r from-[#5B8DEF] via-[#8B5CF6] to-[#C084FC] bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(139,92,246,0.3)]">
                                Experiences
                            </span>
                        </div>
                    </h1>
                </div>
            </div>

            {/* Desktop: Scroll indicator | Mobile: AR explore (tilt) */}
            {isMobile ? (
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[60] pointer-events-auto flex flex-col items-center gap-3">
                    {!arEnabled ? (
                        <>
                            <button
                                type="button"
                                onClick={enableAR}
                                className="flex flex-col items-center gap-2 px-6 py-4 rounded-2xl bg-white/40 backdrop-blur-md border border-sky-500/40 shadow-lg touch-manipulation active:scale-[0.98] transition-transform"
                                aria-label="Enable AR – tilt to explore"
                            >
                                <span className="text-xs text-slate-600 uppercase tracking-wider font-medium">TAP TO EXPLORE IN AR</span>
                                <span className="text-[10px] text-slate-500 max-w-[200px] text-center">Move your phone to look around</span>
                                <div className="w-10 h-10 rounded-full border-2 border-sky-500/60 flex items-center justify-center mt-1">
                                    <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </button>
                            {arPermissionError && (
                                <p className="text-[10px] text-amber-600 max-w-[220px] text-center">{arPermissionError}</p>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center gap-1 opacity-90">
                            <span className="text-xs text-slate-600 uppercase tracking-wider">MOVE YOUR PHONE TO EXPLORE</span>
                            <div className="w-8 h-8 rounded-full border-2 border-sky-500/50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
                                <div className="w-2 h-2 rounded-full bg-gradient-to-b from-sky-500 to-purple-500 animate-pulse" />
                            </div>
                        </div>
                    )}
                    <span className="text-[10px] text-slate-400">or scroll to continue</span>
                </div>
            ) : (
                <div
                    ref={scrollRef}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[60] pointer-events-auto cursor-pointer"
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-xs text-slate-600 uppercase tracking-wider">SCROLL TO EXPLORE</span>
                        <div className="w-6 h-10 border-2 border-sky-500/70 rounded-full flex items-start justify-center pt-2 bg-white/30 backdrop-blur-sm">
                            <div className="w-1.5 h-2 bg-gradient-to-b from-sky-500 to-purple-500 rounded-full animate-bounce"></div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
