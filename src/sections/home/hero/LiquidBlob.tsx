"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useMotion } from "@/system/motion/useMotion";

interface LiquidBlobProps {
    size?: number;
    colors?: string[];
    morphSpeed?: number;
    mouseAttraction?: boolean;
    blur?: number;
}

const BLOB_SHAPES = [
    "M300,100 Q450,100 500,250 Q550,400 400,500 Q250,550 150,450 Q50,350 100,200 Q150,100 300,100 Z",
    "M350,120 Q480,150 520,280 Q560,410 420,510 Q280,560 160,460 Q60,360 110,220 Q160,120 350,120 Z",
    "M320,110 Q470,120 530,270 Q580,420 430,520 Q270,570 140,470 Q40,340 90,210 Q140,110 320,110 Z",
    "M330,105 Q490,110 540,260 Q590,430 440,530 Q260,580 130,480 Q30,330 80,190 Q130,105 330,105 Z",
    "M310,115 Q460,130 510,265 Q570,415 425,525 Q275,565 145,465 Q45,345 95,205 Q145,115 310,115 Z",
];

export default function LiquidBlob({
    size = 500,
    colors = ["#8b5cf6", "#ec4899", "#3b82f6"],
    morphSpeed = 4,
    mouseAttraction = true,
    blur = 60
}: LiquidBlobProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const gradientRef = useRef<SVGLinearGradientElement>(null);
    const currentShapeIndex = useRef(0);
    const mouseRef = useRef({ x: 0, y: 0 });
    const centerRef = useRef({ x: 0, y: 0 });

    const { reducedMotion } = useMotion();

    useEffect(() => {
        if (reducedMotion || !pathRef.current) return;

        const path = pathRef.current;
        const svg = svgRef.current;
        if (!svg) return;

        // Calculate center
        const updateCenter = () => {
            if (!svg) return;
            const rect = svg.getBoundingClientRect();
            centerRef.current = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };
        };

        updateCenter();
        window.addEventListener('resize', updateCenter);

        // Morphing animation - faster and more visible
        const morphBlob = () => {
            currentShapeIndex.current = (currentShapeIndex.current + 1) % BLOB_SHAPES.length;
            const nextShape = BLOB_SHAPES[currentShapeIndex.current];

            gsap.to(path, {
                attr: { d: nextShape },
                duration: morphSpeed,
                ease: "power2.inOut", // Changed from elastic for smoother feel
                onComplete: morphBlob
            });
        };

        // Start morphing
        morphBlob();

        // Breathing scale animation
        gsap.to(path, {
            scale: 1.05,
            transformOrigin: "center center",
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Mouse tracking for magnetic effect
        const handleMouseMove = (e: MouseEvent) => {
            if (!mouseAttraction) return;

            mouseRef.current = { x: e.clientX, y: e.clientY };

            // Calculate distance from center
            const dx = e.clientX - centerRef.current.x;
            const dy = e.clientY - centerRef.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Apply magnetic attraction (within 300px)
            if (distance < 300) {
                const force = (300 - distance) / 300;
                const offsetX = (dx / distance) * force * 30;
                const offsetY = (dy / distance) * force * 30;

                gsap.to(path, {
                    x: offsetX,
                    y: offsetY,
                    duration: 0.5,
                    ease: "power2.out"
                });
            } else {
                gsap.to(path, {
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out"
                });
            }
        };

        // Gradient rotation
        if (gradientRef.current) {
            gsap.to(gradientRef.current, {
                attr: {
                    x1: "100%",
                    y1: "100%",
                    x2: "0%",
                    y2: "0%"
                },
                duration: 8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', updateCenter);
            window.removeEventListener('mousemove', handleMouseMove);
            gsap.killTweensOf(path);
            if (gradientRef.current) {
                gsap.killTweensOf(gradientRef.current);
            }
        };
    }, [morphSpeed, mouseAttraction, reducedMotion]);

    return (
        <div className="liquid-blob-container" style={{
            position: 'relative',
            width: size,
            height: size,
            filter: `blur(${blur}px) brightness(1.1)`,
        }}>
            <svg
                ref={svgRef}
                viewBox="0 0 600 600"
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <defs>
                    <linearGradient
                        ref={gradientRef}
                        id="liquidGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >
                        <stop offset="0%" stopColor={colors[0]} stopOpacity="0.9" />
                        <stop offset="50%" stopColor={colors[1]} stopOpacity="0.8" />
                        <stop offset="100%" stopColor={colors[2]} stopOpacity="0.9" />
                    </linearGradient>

                    <filter id="glow">
                        <feGaussianBlur stdDeviation="10" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <path
                    ref={pathRef}
                    d={BLOB_SHAPES[0]}
                    fill="url(#liquidGradient)"
                    filter="url(#glow)"
                    style={{
                        transformOrigin: 'center center',
                    }}
                />
            </svg>
        </div>
    );
}
