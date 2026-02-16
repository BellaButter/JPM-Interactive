"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouteTransition } from "@/context/RouteTransitionContext";

const PROGRESS_DURATION_MS = 1800;
const HOLD_AT_100_MS = 350;

export default function RouteTransitionOverlay() {
    const ctx = useRouteTransition();
    const [progress, setProgress] = useState(0);
    const [progressDone, setProgressDone] = useState(false);
    const [canExit, setCanExit] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    const visible = ctx?.isTransitioningToWorks;

    useEffect(() => {
        if (!visible || isExiting) return;
        setProgress(0);
        setProgressDone(false);
        setCanExit(false);
        const start = Date.now();
        const t = setInterval(() => {
            const elapsed = Date.now() - start;
            const p = Math.min(100, (elapsed / PROGRESS_DURATION_MS) * 100);
            setProgress(p);
            if (p >= 100) setProgressDone(true);
        }, 24);
        return () => clearInterval(t);
    }, [visible, isExiting]);

    useEffect(() => {
        if (!ctx || !visible || isExiting) return;
        if (!progressDone || !ctx.worksPageReady) return;
        const timeout = setTimeout(() => setCanExit(true), HOLD_AT_100_MS);
        return () => clearTimeout(timeout);
    }, [ctx, visible, isExiting, progressDone, ctx?.worksPageReady]);

    useEffect(() => {
        if (canExit) setIsExiting(true);
    }, [canExit]);

    const handleExitComplete = () => {
        ctx?.clearTransition();
        setIsExiting(false);
    };

    if (!ctx || (!visible && !isExiting)) return null;

    return (
        <motion.div
            className="fixed inset-0 z-[9997] flex flex-col items-center justify-center bg-[#0a0a0b]"
            initial={{ opacity: 1 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            onAnimationComplete={() => isExiting && handleExitComplete()}
        >
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b] via-[#0d0d0f] to-[#0a0a0b] opacity-95" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(107,159,247,0.06),transparent)]" />

                <div className="relative z-10 flex flex-col items-center gap-16">
                    <motion.span
                        className="text-2xl font-semibold tracking-[0.35em] text-white/95 uppercase md:text-3xl md:tracking-[0.4em]"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        Featured Innovations
                    </motion.span>

                    <div className="w-full max-w-[280px] md:max-w-[320px]">
                        <div className="h-px w-full overflow-hidden rounded-full bg-white/10">
                            <motion.div
                                className="h-full bg-gradient-to-r from-[#6B9FF7] to-[#a78bfa]"
                                initial={{ width: "0%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.15, ease: "linear" }}
                            />
                        </div>
                        <span className="mt-3 block text-center text-xs tracking-[0.2em] text-white/50">
                            {Math.round(progress)}%
                        </span>
                    </div>

                    <p className="text-[11px] tracking-[0.25em] uppercase text-white/40">
                        Loading experience
                    </p>
                </div>

                <div className="absolute bottom-12 left-1/2 h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </motion.div>
    );
}
