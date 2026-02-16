"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function MouseGradient() {
    const gradientRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

    useEffect(() => {
        const gradient = gradientRef.current;
        if (!gradient) return;

        // Smooth mouse tracking with GSAP
        const xTo = gsap.quickTo(gradient, "left", { duration: 0.8, ease: "power2.out" });
        const yTo = gsap.quickTo(gradient, "top", { duration: 0.8, ease: "power2.out" });

        const handleMouseMove = (e: MouseEvent) => {
            // Use pixels for performance and type safety
            const x = e.clientX;
            const y = e.clientY;

            setMousePos({ x: (x / window.innerWidth) * 100, y: (y / window.innerHeight) * 100 });
            xTo(x);
            yTo(y);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            {/* Main gradient that follows mouse */}
            <div
                ref={gradientRef}
                className="absolute w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2"
                style={{
                    left: "50%",
                    top: "50%",
                    background: `radial-gradient(circle, 
                        rgba(59, 130, 246, 0.15) 0%, 
                        rgba(6, 182, 212, 0.1) 25%,
                        rgba(59, 130, 246, 0.05) 50%,
                        transparent 70%)`,
                    filter: "blur(60px)",
                    opacity: 0.6,
                    willChange: "transform",
                }}
            />

            {/* Secondary subtle glow */}
            <div
                className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
                style={{
                    left: `${mousePos.x}%`,
                    top: `${mousePos.y}%`,
                    background: `radial-gradient(circle, 
                        rgba(139, 92, 246, 0.1) 0%, 
                        transparent 60%)`,
                    filter: "blur(80px)",
                    opacity: 0.4,
                }}
            />
        </div>
    );
}
