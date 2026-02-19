"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import PageContainer from "@/components/layout/PageContainer";
import { ArticleNavNext } from "./ArticleNav";
import type { ContentPost } from "@/types/content";

const easing = [0.22, 1, 0.36, 1];

type Props = {
    post: ContentPost;
    nextPost: ContentPost | null;
    prevPost: ContentPost | null;
    publishedDate: string;
};

export default function ContentDetailClient({ post, nextPost, prevPost, publishedDate }: Props) {
    return (
        <motion.main
            className="w-full min-h-screen bg-gradient-to-b from-[#fafbff] to-[#f3f4ff]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: easing }}
        >
            {/* Back button */}
            <motion.div
                className="fixed top-24 sm:top-28 left-0 right-0 z-20 flex justify-center pointer-events-none"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4, ease: easing }}
            >
                <PageContainer className="w-full pointer-events-auto">
                    <Link
                        href="/content"
                        className="group inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-gray-200/80 rounded-full text-sm font-medium text-slate-700 hover:bg-white hover:border-[#6B9FF7] hover:text-[#6B9FF7] hover:shadow-xl transition-all duration-300"
                        style={{ padding: "12px 24px" }}
                    >
                        <svg className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="hidden sm:inline">Back to Articles</span>
                    </Link>
                </PageContainer>
            </motion.div>

            {/* Hero */}
            <header className="relative w-full min-h-[60vh] sm:min-h-[70vh] flex flex-col justify-end">
                {post.coverImage ? (
                    <>
                        <motion.div
                            className="absolute inset-0"
                            initial={{ scale: 1.05, opacity: 0.9 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: easing }}
                        >
                            <Image
                                src={post.coverImage}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="100vw"
                                priority
                            />
                        </motion.div>
                        <div
                            className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent"
                            aria-hidden
                        />
                    </>
                ) : (
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f] via-[#0f172a] to-[#1e293b]"
                        aria-hidden
                    />
                )}
                <div className="relative z-10 w-full pb-20 pt-36 sm:pt-44">
                    <PageContainer className="w-full">
                        <div
                            style={{
                                paddingLeft: "clamp(2rem, 8vw, 5rem)",
                                paddingRight: "clamp(2rem, 8vw, 5rem)",
                            }}
                        >
                            <div className="max-w-3xl mx-auto">
                                <motion.time
                                    dateTime={post.publishedAt}
                                    className="block text-sm font-medium text-slate-500 uppercase tracking-[0.2em] mb-4"
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15, duration: 0.4, ease: easing }}
                                >
                                    {publishedDate}
                                </motion.time>
                                <motion.span
                                    className="inline-block text-sm font-semibold text-[#6B9FF7] mb-4"
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.4, ease: easing }}
                                >
                                    JPM Interactive
                                </motion.span>
                                <motion.h1
                                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]"
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25, duration: 0.5, ease: easing }}
                                >
                                    {post.title}
                                </motion.h1>
                                {post.description && (
                                    <motion.p
                                        className="text-lg sm:text-xl text-slate-400 mt-6 max-w-2xl leading-relaxed"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.35, duration: 0.5, ease: easing }}
                                    >
                                        {post.description}
                                    </motion.p>
                                )}
                            </div>
                        </div>
                    </PageContainer>
                </div>
            </header>

            {/* Content card */}
            <motion.div
                className="relative -mt-6 sm:-mt-8 z-10"
                style={{
                    paddingTop: "clamp(2rem, 4vw, 3rem)",
                    paddingBottom: "clamp(5rem, 12vw, 8rem)",
                }}
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: easing }}
            >
                <PageContainer className="w-full">
                    <div
                        style={{
                            paddingLeft: "clamp(2rem, 8vw, 5rem)",
                            paddingRight: "clamp(2rem, 8vw, 5rem)",
                        }}
                    >
                        <div className="max-w-3xl mx-auto">
                            <article className="bg-white rounded-t-3xl sm:rounded-t-[2rem] shadow-2xl overflow-hidden min-h-[40vh]">
                                <div
                                    className="article-content"
                                    style={{
                                        paddingTop: "clamp(3rem, 8vw, 4.5rem)",
                                        paddingBottom: "clamp(4rem, 10vw, 6rem)",
                                        paddingLeft: "clamp(2.5rem, 7vw, 5rem)",
                                        paddingRight: "clamp(2.5rem, 7vw, 5rem)",
                                    }}
                                >
                                    <motion.div
                                        className="article-body text-gray-700 leading-[1.8] text-base md:text-lg [&_p]:mb-6 [&_p:last-child]:mb-0 [&_a]:text-[#6B9FF7] [&_a]:font-medium [&_a]:underline [&_a:hover]:text-[#5a8ee6] [&_strong]:font-semibold [&_strong]:text-gray-900 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_li]:mb-2 [&_img]:rounded-lg [&_img]:my-4"
                                        dangerouslySetInnerHTML={{ __html: post.body }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5, duration: 0.4 }}
                                    />
                                    {/* Previous / Next */}
                                    <nav
                                        className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4"
                                        aria-label="นำทางบทความ"
                                    >
                                        {prevPost ? (
                                            <Link
                                                href={`/content/${prevPost.slug}`}
                                                className="inline-flex items-center gap-2 text-[#6B9FF7] font-medium hover:text-[#5a8ee6] transition-colors"
                                            >
                                                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                                                </svg>
                                                <span className="line-clamp-1 max-w-[200px] sm:max-w-none" title={prevPost.title}>
                                                    {prevPost.title}
                                                </span>
                                            </Link>
                                        ) : (
                                            <span />
                                        )}
                                        {nextPost ? (
                                            <Link
                                                href={`/content/${nextPost.slug}`}
                                                className="inline-flex items-center gap-2 text-[#6B9FF7] font-medium hover:text-[#5a8ee6] transition-colors ml-auto"
                                            >
                                                <span className="line-clamp-1 max-w-[200px] sm:max-w-none text-right" title={nextPost.title}>
                                                    {nextPost.title}
                                                </span>
                                                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </Link>
                                        ) : null}
                                    </nav>
                                </div>
                            </article>
                        </div>
                    </div>
                </PageContainer>
            </motion.div>

            <ArticleNavNext nextPost={nextPost} />
        </motion.main>
    );
}
