"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { worksPageData, type Work } from "@/data/worksPageData";
import PageContainer from "@/components/layout/PageContainer";
import WorkCardMedia from "@/components/works/WorkCardMedia";

export default function WorksPage() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get("category") as Work["category"] | null;
    
    const [selectedCategory, setSelectedCategory] = useState<Work["category"] | "all">("all");
    const [filteredWorks, setFilteredWorks] = useState(worksPageData);

    // Set initial category from URL parameter
    useEffect(() => {
        if (categoryParam && ["led", "touch_screen", "graphic_design"].includes(categoryParam)) {
            setSelectedCategory(categoryParam);
        }
    }, [categoryParam]);

    useEffect(() => {
        if (selectedCategory === "all") {
            setFilteredWorks(worksPageData);
        } else {
            setFilteredWorks(worksPageData.filter((work) => work.category === selectedCategory));
        }
    }, [selectedCategory]);

    const categories: Array<Work["category"] | "all"> = ["all", "led", "touch_screen", "graphic_design"];

    const categoryLabels = {
        all: "All",
        led: "Visual Experience",
        touch_screen: "Interactive Solutions",
        graphic_design: "Multimedia Design"
    };

    return (
        <main
            className="relative min-h-screen bg-gradient-to-b from-[#fafbff] to-[#f3f4ff] w-full flex flex-col items-center"
            style={{
                paddingTop: '10rem',
                paddingBottom: '10rem'
            }}
        >
            <PageContainer className="w-full">
                {/* Title - use wrapper for motion to avoid background/backgroundClip conflict */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <h1
                        className="text-5xl md:text-6xl lg:text-7xl font-bold py-5 bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#475569] bg-clip-text text-transparent tracking-tight leading-tight"
                        style={{ marginBottom: "clamp(2rem, 5vw, 4rem)" }}
                    >
                        Featured Innovations
                    </h1>
                </motion.div>

                {/* Category Filter */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap"
                    style={{ gap: '0.75rem', marginBottom: 'clamp(2rem, 5vw, 4rem)' }}
                >
                    {categories.map((category, index) => (
                        <motion.button
                            key={category}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.15 + index * 0.05 }}
                            onClick={() => setSelectedCategory(category)}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className={`rounded-full font-semibold transition-all duration-300 ${selectedCategory === category
                                ? "bg-gradient-to-r from-[#6B9FF7] to-[#8B9FF8] text-white shadow-lg shadow-[#6B9FF7]/30"
                                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-[#6B9FF7] hover:text-[#6B9FF7] hover:shadow-md"
                                }`}
                            style={{
                                paddingLeft: '2rem',
                                paddingRight: '2rem',
                                paddingTop: '0.875rem',
                                paddingBottom: '0.875rem'
                            }}
                        >
                            {categoryLabels[category]}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Works Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                        style={{ gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}
                    >
                        {filteredWorks.map((work, index) => (
                            <motion.div
                                key={work.id}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: Math.min(index * 0.05, 0.5), duration: 0.35 }}
                            >
                                <Link href={`/works/${work.slug}`}>
                                    <motion.div
                                        whileHover={{ y: -12, scale: 1.02 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        className="group relative bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-[#6B9FF7]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#6B9FF7]/10"
                                    >
                                        {/* Media - วิดีโอจาก JPMGROUP_s WORKS (มี fallback เมื่อโหลดไม่ขึ้น) */}
                                        <WorkCardMedia work={work} />

                                        {/* Content */}
                                        <div
                                            style={{
                                                paddingTop: 'clamp(1.5rem, 3vw, 2.25rem)',
                                                paddingBottom: 'clamp(1.75rem, 3vw, 2.75rem)',
                                                paddingLeft: 'clamp(1.5rem, 4vw, 2.25rem)',
                                                paddingRight: 'clamp(1.5rem, 4vw, 2.25rem)'
                                            }}
                                        >
                                            <h3
                                                className="text-xl md:text-2xl font-bold text-gray-900 leading-snug group-hover:text-[#6B9FF7] transition-all duration-300"
                                                style={{ marginBottom: '1rem', lineHeight: 1.35 }}
                                            >
                                                {work.title}
                                            </h3>
                                            <p
                                                className="text-sm md:text-base text-gray-600 line-clamp-3 group-hover:text-gray-700 transition-colors duration-300"
                                                style={{ lineHeight: 1.75 }}
                                            >
                                                {work.description}
                                            </p>
                                        </div>

                                        {/* Arrow indicator - enhanced */}
                                        <div className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 group-hover:border-[#6B9FF7] shadow-lg">
                                            <svg
                                                className="w-5 h-5 text-[#6B9FF7] transform group-hover:translate-x-1 transition-transform duration-300"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2.5}
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                            </svg>
                                        </div>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </PageContainer>
        </main>
    );
}
