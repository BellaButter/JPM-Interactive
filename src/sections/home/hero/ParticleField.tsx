"use client";

import { useRef, useEffect } from "react";
import { useMotion } from "@/system/motion/useMotion";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    baseX: number;
    baseY: number;
    isTextParticle: boolean;
    alpha: number;
}

interface TextBounds {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface ParticleFieldProps {
    textBounds?: TextBounds | null;
}

export default function ParticleField({ textBounds }: ParticleFieldProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number | undefined>(undefined);

    const { reducedMotion, deviceProfile } = useMotion();

    useEffect(() => {
        if (reducedMotion) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Massively increased particle count for complete text coverage
        const particleCount = deviceProfile.isMobile ? 800 : 2500;

        // Initialize particles
        const particles: Particle[] = [];
        for (let i = 0; i < particleCount; i++) {
            // 80% cluster at text, 20% scattered globally for full screen coverage
            const isTextParticle = i < particleCount * 0.8;
            let baseX: number;
            let baseY: number;

            if (isTextParticle && textBounds) {
                // Cluster particles within text bounds
                const margin = 40; // Increased margin for wider coverage
                baseX = textBounds.x - margin + Math.random() * (textBounds.width + margin * 2);
                baseY = textBounds.y - margin + Math.random() * (textBounds.height + margin * 2);
            } else {
                // Scatter globally
                baseX = Math.random() * canvas.width;
                baseY = Math.random() * canvas.height;
            }

            particles.push({
                x: baseX,
                y: baseY,
                vx: 0,
                vy: 0,
                baseX,
                baseY,
                isTextParticle,
                alpha: isTextParticle ? 0.7 : 0.4, // Increased opacity
            });
        }
        particlesRef.current = particles;

        // Mouse tracking
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: ((e.clientX - rect.left) / rect.width) * canvas.width,
                y: ((e.clientY - rect.top) / rect.height) * canvas.height,
            };
        };

        // Resize handler
        const handleResize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

            // Re-position particles
            particlesRef.current.forEach((p, i) => {
                const isTextParticle = i < particleCount * 0.7;
                if (isTextParticle && textBounds) {
                    const margin = 20;
                    p.baseX = textBounds.x - margin + Math.random() * (textBounds.width + margin * 2);
                    p.baseY = textBounds.y - margin + Math.random() * (textBounds.height + margin * 2);
                } else {
                    p.baseX = Math.random() * canvas.width;
                    p.baseY = Math.random() * canvas.height;
                }
                p.x = p.baseX;
                p.y = p.baseY;
            });
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const mouse = mouseRef.current;

            particlesRef.current.forEach((particle) => {
                // Calculate distance from mouse
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 250; // Increased repel radius

                if (distance < maxDistance) {
                    // Stronger repel for text particles
                    const force = (maxDistance - distance) / maxDistance;
                    const repelStrength = particle.isTextParticle ? 3 : 2;
                    particle.vx -= (dx / distance) * force * repelStrength;
                    particle.vy -= (dy / distance) * force * repelStrength;
                } else {
                    // Return to base position
                    const returnDx = particle.baseX - particle.x;
                    const returnDy = particle.baseY - particle.y;
                    particle.vx += returnDx * 0.015;
                    particle.vy += returnDy * 0.015;
                }

                // Apply velocity with damping
                particle.vx *= 0.92;
                particle.vy *= 0.92;
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Draw particle with variable opacity
                const proximityFade = distance < maxDistance ? 0.15 : particle.alpha;
                ctx.fillStyle = `rgba(59, 130, 246, ${proximityFade})`;
                ctx.beginPath();
                ctx.arc(
                    particle.x / window.devicePixelRatio,
                    particle.y / window.devicePixelRatio,
                    particle.isTextParticle ? 3 : 2.5, // Increased size
                    0,
                    Math.PI * 2
                );
                ctx.fill();
            });

            rafRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [reducedMotion, deviceProfile.isMobile, textBounds]);

    if (reducedMotion) return null;

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ width: "100%", height: "100%" }}
        />
    );
}
