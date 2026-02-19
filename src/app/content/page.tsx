"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/data/content";
import PageContainer from "@/components/layout/PageContainer";

export default function ContentListPage() {
    const posts = getAllPosts();
    const [featured, ...rest] = posts;

    return (
        <main
            className="relative min-h-screen bg-gradient-to-b from-[#fafbff] to-[#f3f4ff] w-full flex flex-col items-center overflow-x-hidden"
            style={{
                paddingTop: "10rem",
                paddingBottom: "10rem",
            }}
        >
            <PageContainer className="w-full">
                    {/* Hero header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-16 md:mb-20"
                    >
                        <span className="inline-block text-sm font-semibold text-[#6B9FF7] uppercase tracking-[0.2em] mb-4">
                            Insights & Stories
                        </span>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#475569] bg-clip-text text-transparent tracking-tight leading-[1.05] max-w-4xl">
                            Articles
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
                            Creative technology, digital experiences, and what we&apos;re building at JPM Interactive.
                        </p>
                    </motion.div>

                    {/* Featured article - large hero card */}
                    {featured && (
                        <motion.div
                            initial={{ opacity: 0, y: 32 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            style={{ marginBottom: "clamp(3rem, 6vw, 4rem)" }}
                        >
                            <Link href={`/content/${featured.slug}`}>
                                <motion.article
                                    whileHover={{ y: -4 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    className="group relative block overflow-hidden rounded-2xl md:rounded-3xl bg-white border-2 border-gray-100 hover:border-[#6B9FF7]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#6B9FF7]/10"
                                >
                                    <div className="grid md:grid-cols-2 min-h-[320px] md:min-h-[380px]">
                                        {/* Image */}
                                        <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[380px] overflow-hidden order-2 md:order-1">
                                            {featured.coverImage ? (
                                                <Image
                                                    src={featured.coverImage}
                                                    alt={featured.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#e8f0ff] via-[#f0e8ff] to-[#ffe8f8] flex items-center justify-center">
                                                    <span className="text-6xl opacity-50">✦</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                        {/* Content */}
                                        <div
                                            className="relative flex flex-col justify-center order-1 md:order-2"
                                            style={{
                                                padding: "clamp(1.75rem, 4vw, 2.75rem)",
                                                paddingLeft: "clamp(2.5rem, 7vw, 5rem)",
                                            }}
                                        >
                                            <time
                                                dateTime={featured.publishedAt}
                                                className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4"
                                            >
                                                {new Date(featured.publishedAt).toLocaleDateString("en-US", {
                                                    month: "long",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </time>
                                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4 group-hover:text-[#6B9FF7] transition-colors duration-300">
                                                {featured.title}
                                            </h2>
                                            <p className="text-gray-600 text-base md:text-lg leading-relaxed line-clamp-3 mb-6">
                                                {featured.description}
                                            </p>
                                            <span className="inline-flex items-center gap-2 text-[#6B9FF7] font-semibold group-hover:gap-3 transition-all duration-300">
                                                Read article
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                    {/* Featured badge */}
                                    <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
                                        <span className="inline-block px-3 py-1 rounded-full bg-[#6B9FF7]/20 text-[#6B9FF7] text-xs font-semibold uppercase tracking-wider">
                                            Featured
                                        </span>
                                    </div>
                                    {/* Arrow */}
                                    <div className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 group-hover:border-[#6B9FF7] shadow-lg z-10">
                                        <svg className="w-5 h-5 text-[#6B9FF7] transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </motion.article>
                            </Link>
                        </motion.div>
                    )}

                    {/* Articles grid */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.06 } },
                            hidden: {},
                        }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        style={{
                            gap: "clamp(3rem, 6vw, 4rem)",
                            paddingTop: "clamp(2rem, 4vw, 3rem)",
                        }}
                    >
                        {rest.map((post) => (
                            <motion.div
                                key={post.slug}
                                variants={{
                                    hidden: { opacity: 0, y: 24 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <Link href={`/content/${post.slug}`}>
                                    <motion.article
                                        whileHover={{ y: -8, transition: { duration: 0.25 } }}
                                        className="group relative h-full flex flex-col overflow-hidden rounded-2xl md:rounded-3xl bg-white border-2 border-gray-100 hover:border-[#6B9FF7]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#6B9FF7]/10"
                                    >
                                        {/* Cover */}
                                        <div className="relative aspect-[16/10] overflow-hidden">
                                            {post.coverImage ? (
                                                <Image
                                                    src={post.coverImage}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover transition-transform duration-600 group-hover:scale-110"
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#e8f0ff] via-[#f0e8ff] to-[#ffe8f8] flex items-center justify-center">
                                                    <span className="text-4xl opacity-50">✦</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <div className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 group-hover:border-[#6B9FF7] shadow-lg">
                                                <svg className="w-5 h-5 text-[#6B9FF7] transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                            <div className="absolute bottom-3 left-3 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
                                                <time
                                                    dateTime={post.publishedAt}
                                                >
                                                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    })}
                                                </time>
                                            </div>
                                        </div>
                                        {/* Content */}
                                        <div
                                            className="flex flex-col flex-1"
                                            style={{
                                                padding: "clamp(2rem, 5vw, 3rem)",
                                            }}
                                        >
                                            <h2 className="text-lg md:text-xl font-bold text-gray-900 leading-snug group-hover:text-[#6B9FF7] transition-colors duration-300 line-clamp-2 mb-3">
                                                {post.title}
                                            </h2>
                                            <p className="text-sm text-gray-600 line-clamp-2 flex-1 group-hover:text-gray-700 transition-colors">
                                                {post.description}
                                            </p>
                                            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#6B9FF7] opacity-0 group-hover:opacity-100 transition-opacity">
                                                Read article
                                                <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </span>
                                        </div>
                                    </motion.article>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    {posts.length === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center">
                            <p className="text-slate-500 text-lg">No articles yet. Check back soon.</p>
                        </motion.div>
                    )}
            </PageContainer>
        </main>
    );
}
