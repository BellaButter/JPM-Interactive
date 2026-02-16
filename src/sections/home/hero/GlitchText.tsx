"use client";

import { useEffect, useRef, useState } from "react";
import { useMotion } from "@/system/motion/useMotion";

interface GlitchChar {
    original: string;
    current: string;
    decodeProgress: number;
    position: { x: number; y: number };
    lastGlitch: number;
    glitchSpeed: number;
}

interface GlitchTextProps {
    text: string;
    className?: string;
}

const GLITCH_CHARS = "█▓▒░▄▀■□▪○◘◙@#$%&*+=~`^<>|\\/?アイウエオカキクケコ";
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function randomGlitchChar(): string {
    return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

function cycleChar(): string {
    return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
}

function distance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function lerp(start: number, end: number, t: number): number {
    return start + (end - start) * t;
}

export default function GlitchText({ text, className = "" }: GlitchTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const charsRef = useRef<GlitchChar[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const rafRef = useRef<number | undefined>(undefined);
    const [displayChars, setDisplayChars] = useState<string[]>([]);

    const { reducedMotion } = useMotion();

    useEffect(() => {
        if (reducedMotion) {
            setDisplayChars(text.split(''));
            return;
        }

        const container = containerRef.current;
        if (!container) return;

        // Initialize characters
        const chars: GlitchChar[] = text.split('').map((char, i) => ({
            original: char,
            current: char === ' ' ? ' ' : randomGlitchChar(),
            decodeProgress: 0,
            position: { x: 0, y: 0 },
            lastGlitch: Date.now(),
            glitchSpeed: 60 + Math.random() * 60, // 60-120ms
        }));

        charsRef.current = chars;
        setDisplayChars(chars.map(c => c.current));

        // Update character positions
        const updatePositions = () => {
            if (!container) return;
            const spans = container.querySelectorAll('.glitch-char');
            spans.forEach((span, i) => {
                const rect = span.getBoundingClientRect();
                charsRef.current[i].position = {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                };
            });
        };

        // Mouse tracking
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        // Animation loop
        const animate = () => {
            const now = Date.now();
            const mouse = mouseRef.current;
            let updated = false;

            charsRef.current.forEach((char) => {
                if (char.original === ' ') return;

                // Calculate distance from mouse
                const dist = distance(mouse.x, mouse.y, char.position.x, char.position.y);

                // Map distance to decode progress (400px = 0, 100px = 1)
                const targetProgress = Math.max(0, Math.min(1, (400 - dist) / 300));

                // Smooth interpolation
                const oldProgress = char.decodeProgress;
                char.decodeProgress = lerp(char.decodeProgress, targetProgress, 0.1);

                // Check if we should update glitch
                const shouldGlitch = now - char.lastGlitch > char.glitchSpeed;

                if (shouldGlitch || Math.abs(char.decodeProgress - oldProgress) > 0.01) {
                    // Update character based on decode progress
                    if (char.decodeProgress < 0.3) {
                        // Fully glitched
                        char.current = randomGlitchChar();
                    } else if (char.decodeProgress < 0.7) {
                        // Searching/cycling
                        char.current = cycleChar();
                    } else if (char.decodeProgress < 0.95) {
                        // Almost decoded, occasional glitch
                        char.current = Math.random() > 0.3 ? char.original : cycleChar();
                    } else {
                        // Fully decoded
                        char.current = char.original;
                    }

                    char.lastGlitch = now;
                    updated = true;
                }
            });

            if (updated) {
                setDisplayChars(charsRef.current.map(c => c.current));
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        // Initialize
        setTimeout(updatePositions, 100); // Wait for render
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', updatePositions);

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', updatePositions);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [text, reducedMotion]);

    return (
        <div ref={containerRef} className={`glitch-text ${className}`}>
            {displayChars.map((char, i) => (
                <span
                    key={i}
                    className={`glitch-char ${char !== text[i] ? 'glitching' : 'decoded'}`}
                    style={{
                        display: 'inline-block',
                    }}
                >
                    {char}
                </span>
            ))}
        </div>
    );
}
