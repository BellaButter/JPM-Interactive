"use client";

import { useRef, useEffect } from "react";
import { useMotion } from "@/system/motion/useMotion";

interface TextBounds {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface TextRevealMaskProps {
    textBounds?: TextBounds | null;
}

interface ErasePoint {
    x: number;
    y: number;
    alpha: number;
}

export default function TextRevealMask({ textBounds }: TextRevealMaskProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 }); // Start off-screen
    const erasePointsRef = useRef<ErasePoint[]>([]);
    const rafRef = useRef<number | undefined>(undefined);

    const { reducedMotion, deviceProfile } = useMotion();

    useEffect(() => {
        if (reducedMotion) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Responsive erase radius
        const eraseRadius = deviceProfile.isMobile ? 150 : 200;

        // Mouse tracking
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
            const y = ((e.clientY - rect.top) / rect.height) * canvas.height;

            mouseRef.current = { x, y };

            // Add erase point at current position
            erasePointsRef.current.push({
                x,
                y,
                alpha: 1.0,
            });

            // Limit array size for performance
            if (erasePointsRef.current.length > 50) {
                erasePointsRef.current.shift();
            }
        };

        // Resize handler
        const handleResize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        // Animation loop
        const animate = () => {
            const dpr = window.devicePixelRatio;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw dark overlay (completely covers text)
            ctx.fillStyle = "rgba(10, 10, 20, 0.98)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Switch to erase mode
            ctx.globalCompositeOperation = "destination-out";

            // Draw current mouse position erase
            const mouse = mouseRef.current;
            if (mouse.x > 0 && mouse.y > 0) {
                const gradient = ctx.createRadialGradient(
                    mouse.x, mouse.y, 0,
                    mouse.x, mouse.y, eraseRadius
                );
                gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
                gradient.addColorStop(0.6, "rgba(255, 255, 255, 0.8)");
                gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, eraseRadius, 0, Math.PI * 2);
                ctx.fill();
            }

            // Draw fading erase points
            erasePointsRef.current.forEach((point, index) => {
                if (point.alpha > 0) {
                    const gradient = ctx.createRadialGradient(
                        point.x, point.y, 0,
                        point.x, point.y, eraseRadius
                    );
                    gradient.addColorStop(0, `rgba(255, 255, 255, ${point.alpha})`);
                    gradient.addColorStop(0.6, `rgba(255, 255, 255, ${point.alpha * 0.8})`);
                    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(point.x, point.y, eraseRadius, 0, Math.PI * 2);
                    ctx.fill();

                    // Fade out
                    point.alpha -= 0.015;
                } else {
                    // Remove dead points
                    erasePointsRef.current.splice(index, 1);
                }
            });

            // Restore composite mode
            ctx.globalCompositeOperation = "source-over";

            rafRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [reducedMotion, deviceProfile.isMobile]);

    if (reducedMotion) return null;

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ width: "100%", height: "100%" }}
        />
    );
}
