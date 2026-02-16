"use client";

import { useMotion } from "@/system/motion/useMotion";
import Container from "@/components/layout/Container";
import { motion } from "framer-motion";
import HeroFallback from "./HeroFallback";
import HeroScene from "./HeroScene";

export default function HeroV2() {
    const { motionConfig, interactionMode, reducedMotion } = useMotion();

    // GOVERNANCE:
    // Only render 3D geometry if:
    // 1. 3D is enabled in config (passed hardware check)
    // 2. Not in reduced motion mode
    // 3. Not in mobile mode
    const shouldRender3D = motionConfig.enable3D && !reducedMotion && interactionMode === "desktop";

    return (
        <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#0a0a0a]">

            {/* LAYER 0: Base Fallback (Always Mounted) */}
            <HeroFallback />

            {/* LAYER 1: 3D Scene (Always Mounted, Internally Managed) */}
            {/* We pass the 'enable3D' flag down. The Canvas itself remains mounted. */}
            <div className="absolute inset-0 z-0 h-full w-full fade-in-slow">
                <HeroScene enable3D={shouldRender3D} />
            </div>

            {/* LAYER 2: Content Overlay (Always Mounted, Single Instance) */}
            <div className="absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none">
                <Container className="text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-6 drop-shadow-2xl"
                    >
                        Engineering <br />
                        <span className="text-blue-500">Imagination</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-xl text-gray-400 max-w-lg mx-auto"
                    >
                        We build the systems that power immersive experiences.
                    </motion.p>
                </Container>
            </div>

        </section>
    );
}
