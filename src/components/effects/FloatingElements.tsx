"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const SHAPES = [
    { color: "from-[#6B9FF7]/30 to-[#8B9FF8]/20", size: 300, duration: 20, left: "20%", top: "30%" },
    { color: "from-[#B8A9F9]/30 to-[#8B9FF8]/20", size: 200, duration: 25, left: "45%", top: "45%" },
    { color: "from-[#7BA5F7]/30 to-[#6B9FF7]/20", size: 250, duration: 30, left: "70%", top: "60%" },
    { color: "from-[#8B9FF8]/30 to-[#B8A9F9]/20", size: 180, duration: 22, left: "95%", top: "75%" },
];

/**
 * FloatingElements — optimized to use direct DOM style mutations via RAF.
 * Zero React re-renders on mouse move (previously ~60 re-renders/s via setState).
 */
export default function FloatingElements() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number>(0);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        if (shouldReduceMotion) return;

        const container = containerRef.current;
        if (!container) return;

        const elements = Array.from(container.children) as HTMLElement[];

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = {
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            };

            // Throttle DOM updates to one per animation frame (≤60fps)
            if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(() => {
                    const { x, y } = mouseRef.current;
                    elements.forEach((el, i) => {
                        const dir = i % 2 === 0 ? 1 : -1;
                        el.style.transform = `translate(${x * dir}px, ${y * dir}px)`;
                    });
                    rafRef.current = 0;
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [shouldReduceMotion]);

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {SHAPES.map((shape, index) => (
                <div
                    key={index}
                    className={`absolute rounded-full bg-gradient-to-br ${shape.color} blur-3xl will-change-transform`}
                    style={{
                        width: shape.size,
                        height: shape.size,
                        left: shape.left,
                        top: shape.top,
                        // CSS-only slow float animation — no JS, no re-renders
                        animation: shouldReduceMotion
                            ? "none"
                            : `float-orb ${shape.duration}s ease-in-out infinite`,
                        animationDelay: `${index * -5}s`,
                    }}
                />
            ))}
        </div>
    );
}
