"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Orb {
    id: number;
    size: number;
    gradient: string;
    initialX: number;
    initialY: number;
    speed: number;
    blur: number;
}

const orbs: Orb[] = [
    {
        id: 1,
        size: 500,
        gradient: "radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.6) 0%, rgba(147, 51, 234, 0.3) 50%, transparent 70%)",
        initialX: 20,
        initialY: 30,
        speed: 0.02,
        blur: 40,
    },
    {
        id: 2,
        size: 450,
        gradient: "radial-gradient(circle at 60% 50%, rgba(139, 92, 246, 0.5) 0%, rgba(59, 130, 246, 0.25) 50%, transparent 70%)",
        initialX: 75,
        initialY: 65,
        speed: 0.025,
        blur: 45,
    },
    {
        id: 3,
        size: 400,
        gradient: "radial-gradient(circle at 50% 30%, rgba(6, 182, 212, 0.45) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)",
        initialX: 50,
        initialY: 15,
        speed: 0.03,
        blur: 35,
    },
    {
        id: 4,
        size: 350,
        gradient: "radial-gradient(circle at 40% 60%, rgba(236, 72, 153, 0.4) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 70%)",
        initialX: 30,
        initialY: 75,
        speed: 0.022,
        blur: 38,
    },
];

function FloatingOrb({ orb }: { orb: Orb }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 120, mass: 1.2 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Apply centering offset
    const x = useTransform(springX, (value) => value - orb.size / 2);
    const y = useTransform(springY, (value) => value - orb.size / 2);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const mx = e.clientX / window.innerWidth;
            const my = e.clientY / window.innerHeight;

            // Calculate offset from initial position
            const offsetX = (mx - orb.initialX / 100) * orb.speed * window.innerWidth;
            const offsetY = (my - orb.initialY / 100) * orb.speed * window.innerHeight;

            mouseX.set(offsetX);
            mouseY.set(offsetY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY, orb]);

    return (
        <motion.div
            className="absolute pointer-events-none"
            style={{
                left: `${orb.initialX}%`,
                top: `${orb.initialY}%`,
                width: orb.size,
                height: orb.size,
                x,
                y,
                background: orb.gradient,
                filter: `blur(${orb.blur}px)`,
                mixBlendMode: "screen",
            }}
        />
    );
}

export default function FloatingOrbs() {
    return (
        <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.3 }}
        >
            {orbs.map((orb) => (
                <FloatingOrb key={orb.id} orb={orb} />
            ))}
        </motion.div>
    );
}
