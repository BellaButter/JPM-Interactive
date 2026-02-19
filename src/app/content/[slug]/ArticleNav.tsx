"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ContentPost } from "@/types/content";

export function ArticleNavNext({ nextPost }: { nextPost: ContentPost | null }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            setShow(scrollHeight > 200 && scrolled > 300);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    if (!nextPost) return null;

    return (
        <motion.div
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex justify-center ${show ? "" : "pointer-events-none"}`}
            initial={false}
            animate={{ opacity: show ? 1 : 0, y: show ? 0 : 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
            <Link
                href={`/content/${nextPost.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-white border-2 border-gray-200 px-6 py-3 text-sm font-semibold text-gray-800 shadow-lg hover:border-[#6B9FF7] hover:text-[#6B9FF7] hover:shadow-xl transition-all duration-300"
            >
                <span>บทความถัดไป</span>
                <span className="line-clamp-1 max-w-[180px] sm:max-w-[240px]" title={nextPost.title}>
                    {nextPost.title}
                </span>
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </Link>
        </motion.div>
    );
}
