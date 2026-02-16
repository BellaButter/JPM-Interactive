"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollPx = document.documentElement.scrollTop;
            const winHeightPx =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            const scrolled = (scrollPx / winHeightPx) * 100;
            setScrollProgress(scrolled);
        };

        window.addEventListener("scroll", updateScrollProgress, { passive: true });
        return () => window.removeEventListener("scroll", updateScrollProgress);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-[60] h-1">
            <motion.div
                className="h-full bg-gradient-to-r from-[#6B9FF7] via-[#8B9FF8] to-[#B8A9F9]"
                style={{
                    width: `${scrollProgress}%`,
                    boxShadow: "0 0 20px rgba(107, 159, 247, 0.5)",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${scrollProgress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
            />
        </div>
    );
}
