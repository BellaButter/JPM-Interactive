"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Container from "@/components/layout/Container";
import { useMotion } from "@/system/motion/useMotion";
import GeometricShapes3D from "./home/hero/GeometricShapes3D";

export default function HeroSection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const { reducedMotion, interactionMode } = useMotion();
    const isMobile = interactionMode === "mobile";

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

            {/* 3D Geometric Shapes Background - desktop: full shapes, mobile: 4 shapes */}
            <div className="absolute inset-0 z-10">
                <GeometricShapes3D isMobile={isMobile} />
            </div>

            {/* Content - Text */}
            <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
                <div
                    className="w-full max-w-[1600px] mx-auto"
                    style={{
                        paddingLeft: "clamp(1.25rem, 5vw, 2rem)",
                        paddingRight: "clamp(1.25rem, 5vw, 2rem)",
                    }}
                >
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

            {/* Scroll indicator - same for desktop and mobile */}
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
        </section>
    );
}
