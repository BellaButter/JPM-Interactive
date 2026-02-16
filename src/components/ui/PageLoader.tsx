"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** เวลาให้ progress วิ่งจาก 0 → 100% (ต้องครบ 100% ก่อนถึงจะเข้าเว็บ) */
const PROGRESS_DURATION_MS = 2500;
/** หลังถึง 100% แล้ว รอเห็นตัวเลขสักครู่ก่อน fade out */
const HOLD_AT_100_MS = 400;

export default function PageLoader() {
    const [progress, setProgress] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const [isExited, setIsExited] = useState(false);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [progressDone, setProgressDone] = useState(false);

    // Progress วิ่ง 0 → 100% ตามเวลา
    useEffect(() => {
        const start = Date.now();
        const progressInterval = setInterval(() => {
            const elapsed = Date.now() - start;
            const p = Math.min(100, (elapsed / PROGRESS_DURATION_MS) * 100);
            setProgress(p);
            if (p >= 100) {
                setProgressDone(true);
                clearInterval(progressInterval);
            }
        }, 32);
        return () => clearInterval(progressInterval);
    }, []);

    // รอทั้ง progress 100% และ window load แล้วค่อยเข้าเว็บ
    useEffect(() => {
        if (!progressDone || !pageLoaded) return;
        const t = setTimeout(() => setIsReady(true), HOLD_AT_100_MS);
        return () => clearTimeout(t);
    }, [progressDone, pageLoaded]);

    useEffect(() => {
        const onLoad = () => setPageLoaded(true);
        if (document.readyState === "complete") {
            setPageLoaded(true);
        } else {
            window.addEventListener("load", onLoad);
            return () => window.removeEventListener("load", onLoad);
        }
    }, []);

    const handleExitComplete = () => setIsExited(true);

    if (isExited) return null;

    return (
        <AnimatePresence onExitComplete={handleExitComplete}>
            {!isReady && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0b]"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
                    }}
                >
                    {/* Background subtle gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b] via-[#0d0d0f] to-[#0a0a0b] opacity-90" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(107,159,247,0.06),transparent)]" />

                    <div className="relative z-10 flex flex-col items-center gap-16">
                        {/* Logo / Brand */}
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <span className="text-2xl font-semibold tracking-[0.35em] text-white/95 uppercase md:text-3xl md:tracking-[0.4em]">
                                JPM Interactive
                            </span>
                        </motion.div>

                        {/* Progress bar - Lusion style: thin, full width, minimal */}
                        <div className="w-full max-w-[280px] md:max-w-[320px]">
                            <div className="h-px w-full overflow-hidden rounded-full bg-white/10">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-[#6B9FF7] to-[#a78bfa]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.2, ease: "linear" }}
                                />
                            </div>
                            <motion.span
                                className="mt-3 block text-center text-xs tracking-[0.2em] text-white/50"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                {Math.round(progress)}%
                            </motion.span>
                        </div>

                        {/* Optional: loading label */}
                        <motion.p
                            className="text-[11px] tracking-[0.25em] uppercase text-white/40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Loading experience
                        </motion.p>
                    </div>

                    {/* Bottom line accent */}
                    <div className="absolute bottom-12 left-1/2 h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
