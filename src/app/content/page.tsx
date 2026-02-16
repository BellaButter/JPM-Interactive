"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/data/content";
import PageContainer from "@/components/layout/PageContainer";

export default function ContentListPage() {
    const posts = getAllPosts();

    return (
        <main
            className="relative min-h-screen bg-gradient-to-b from-[#fafbff] to-[#f3f4ff] w-full flex flex-col items-center"
            style={{
                paddingTop: "10rem",
                paddingBottom: "10rem",
            }}
        >
            <PageContainer className="w-full">
                {/* Hero header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-center max-w-3xl mx-auto"
                    style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}
                >
                    <h1
                        className="text-5xl md:text-6xl lg:text-7xl font-bold py-5 bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#475569] bg-clip-text text-transparent tracking-tight leading-tight"
                        style={{ marginBottom: "1rem" }}
                    >
                        Articles
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600">
                        Insights on creative technology, digital experiences, and what we’re building.
                    </p>
                </motion.div>

                {/* Articles grid */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: { transition: { staggerChildren: 0.08 } },
                        hidden: {},
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    style={{ gap: "clamp(1.5rem, 3vw, 2.5rem)" }}
                >
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.slug}
                            variants={{
                                hidden: { opacity: 0, y: 24 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.35 }}
                        >
                            <Link href={`/content/${post.slug}`}>
                                <motion.article
                                    whileHover={{ y: -12, scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="group relative h-full flex flex-col bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-[#6B9FF7]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#6B9FF7]/10"
                                >
                                    {/* Cover */}
                                    <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                                        {post.coverImage ? (
                                            <Image
                                                src={post.coverImage}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#e8f0ff] via-[#f0e8ff] to-[#ffe8f8] flex items-center justify-center">
                                                <span className="text-5xl opacity-50">✦</span>
                                            </div>
                                        )}
                                        {/* Overlay gradient on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        {/* Date badge */}
                                        <div className="absolute bottom-3 left-3 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
                                            {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </div>
                                        {/* Arrow */}
                                        <div className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 group-hover:border-[#6B9FF7] shadow-lg">
                                            <svg
                                                className="w-5 h-5 text-[#6B9FF7] transform group-hover:translate-x-0.5 transition-transform"
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
                                    </div>
                                    {/* Content */}
                                    <div
                                        className="flex flex-col flex-1 p-6 md:p-7"
                                        style={{
                                            paddingTop: "clamp(1.5rem, 3vw, 2rem)",
                                            paddingBottom: "clamp(1.5rem, 3vw, 2rem)",
                                        }}
                                    >
                                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug group-hover:text-[#6B9FF7] transition-colors duration-300 line-clamp-2 mb-3">
                                            {post.title}
                                        </h2>
                                        <p className="text-sm md:text-base text-gray-600 line-clamp-3 group-hover:text-gray-700 transition-colors flex-1">
                                            {post.description}
                                        </p>
                                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#6B9FF7] opacity-0 group-hover:opacity-100 transition-opacity">
                                            Read article
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </span>
                                    </div>
                                </motion.article>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </PageContainer>
        </main>
    );
}
