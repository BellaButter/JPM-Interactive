"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const shapes = [
    { color: "from-[#6B9FF7]/30 to-[#8B9FF8]/20", size: 300, duration: 20 },
    { color: "from-[#B8A9F9]/30 to-[#8B9FF8]/20", size: 200, duration: 25 },
    { color: "from-[#7BA5F7]/30 to-[#6B9FF7]/20", size: 250, duration: 30 },
    { color: "from-[#8B9FF8]/30 to-[#B8A9F9]/20", size: 180, duration: 22 },
];

export default function FloatingElements() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {shapes.map((shape, index) => (
                <motion.div
                    key={index}
                    className={`absolute rounded-full bg-gradient-to-br ${shape.color} blur-3xl`}
                    style={{
                        width: shape.size,
                        height: shape.size,
                        left: `${20 + index * 25}%`,
                        top: `${30 + index * 15}%`,
                    }}
                    animate={{
                        x: [mousePosition.x, -mousePosition.x, mousePosition.x],
                        y: [
                            mousePosition.y + 20,
                            mousePosition.y - 20,
                            mousePosition.y + 20,
                        ],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: shape.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}
