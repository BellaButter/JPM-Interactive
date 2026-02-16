"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type AnimationVariant = "fade" | "slide" | "scale" | "rotate";

interface ScrollRevealProps {
    children: ReactNode;
    variant?: AnimationVariant;
    delay?: number;
    duration?: number;
    className?: string;
}

const variants = {
    fade: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    slide: {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    },
    scale: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    },
    rotate: {
        hidden: { opacity: 0, rotate: -10, y: 30 },
        visible: { opacity: 1, rotate: 0, y: 0 },
    },
};

export default function ScrollReveal({
    children,
    variant = "slide",
    delay = 0,
    duration = 0.6,
    className = "",
}: ScrollRevealProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration,
                delay,
                ease: [0.34, 1.56, 0.64, 1], // Bounce easing
            }}
            variants={variants[variant]}
            className={className}
        >
            {children}
        </motion.div>
    );
}
