"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import PageContainer from "@/components/layout/PageContainer";
import { useArticleContent } from "./ArticleBody";
import { useLocale } from "@/context/LocaleContext";
import { prefixPath } from "@/i18n/config";
import type { ContentPost } from "@/types/content";

const easing = [0.22, 1, 0.36, 1] as const;

type Props = {
  post: ContentPost;
  nextPost: ContentPost | null;
  prevPost: ContentPost | null;
  publishedDate: string;
};

export default function ContentDetailClient({ post, nextPost, prevPost, publishedDate }: Props) {
  const { t, locale } = useLocale();
  const { toc, body } = useArticleContent(post.body);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min((winScroll / docHeight) * 100, 100) : 0);

      const headings = toc.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
      const scrollPos = winScroll + 120;
      for (let i = headings.length - 1; i >= 0; i--) {
        if (headings[i].offsetTop <= scrollPos) {
          setActiveSection(toc[i].id);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [toc]);

  return (
    <motion.main
      className="font-articles w-full min-h-screen bg-gradient-to-b from-[#fafbff] to-[#f3f4ff]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: easing }}
    >
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200/50 z-30" aria-hidden>
        <motion.div
          className="h-full bg-gradient-to-r from-[#6B9FF7] to-[#8B5CF6]"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Back button */}
      <motion.div
        className="fixed top-24 sm:top-28 left-0 right-0 z-20 flex justify-center pointer-events-none"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4, ease: easing }}
      >
        <PageContainer className="w-full pointer-events-auto">
          <Link
            href={prefixPath(locale, "/content")}
            className="group inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-gray-200/80 rounded-full text-sm font-medium text-slate-700 hover:bg-white hover:border-[#6B9FF7] hover:text-[#6B9FF7] hover:shadow-xl transition-all duration-300"
            style={{ padding: "12px 24px" }}
          >
            <svg className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">{t("common.backToArticles")}</span>
          </Link>
        </PageContainer>
      </motion.div>

      {/* Hero */}
      <header className="relative w-full min-h-[55vh] sm:min-h-[65vh] flex flex-col justify-end">
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent" aria-hidden />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f] via-[#0f172a] to-[#1e293b]" aria-hidden />
        )}
        <div className="relative z-10 w-full pb-16 pt-32 sm:pt-40">
          <PageContainer className="w-full">
            <div style={{ paddingLeft: "clamp(2rem, 8vw, 5rem)", paddingRight: "clamp(2rem, 8vw, 5rem)" }}>
              <div className="max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4, ease: easing }}
                  className="flex items-center gap-3 mb-4"
                >
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#6B9FF7]/20 text-[#6B9FF7] text-xs font-semibold uppercase tracking-wider">
                    {t("content.insightsAndStories")}
                  </span>
                  <time dateTime={post.publishedAt} className="text-sm font-medium text-slate-400">
                    {publishedDate}
                  </time>
                </motion.div>
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.5, ease: easing }}
                >
                  {post.title}
                </motion.h1>
                {post.description && (
                  <motion.p
                    className="text-lg sm:text-xl text-slate-300 mt-6 max-w-2xl leading-relaxed"
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

      {/* Content area with optional TOC */}
      <motion.div
        className="relative -mt-6 sm:-mt-8 z-10"
        style={{ paddingTop: "clamp(2rem, 4vw, 3rem)", paddingBottom: "clamp(5rem, 12vw, 8rem)" }}
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: easing }}
      >
        <PageContainer className="w-full">
          <div style={{ paddingLeft: "clamp(2rem, 8vw, 5rem)", paddingRight: "clamp(2rem, 8vw, 5rem)" }}>
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 lg:gap-36">
              {/* Table of contents - sticky sidebar on desktop, inline on mobile */}
              {toc.length > 0 && (
                <aside className="w-full lg:w-60 shrink-0 order-1 lg:order-1 lg:pr-4 mb-16 lg:mb-0">
                  {/* Mobile: compact pill strip - larger touch targets */}
                  <div className="lg:hidden mb-14 pb-12 border-b border-gray-200">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                      {t("content.tableOfContents")}
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {toc.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={`inline-block pl-6 pr-5 py-4 rounded-xl text-sm transition-all min-h-[48px] flex items-center leading-relaxed ${
                            activeSection === item.id
                              ? "bg-[#6B9FF7]/20 text-[#6B9FF7] font-semibold ring-2 ring-[#6B9FF7]/30"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:ring-2 hover:ring-slate-200"
                          }`}
                        >
                          {item.text}
                        </a>
                      ))}
                    </div>
                  </div>
                  {/* Desktop: sticky sidebar - card-style links for easier clicking */}
                  <div className="hidden lg:block sticky top-32 mt-1">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6 flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#6B9FF7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                      </svg>
                      {t("content.tableOfContents")}
                    </h3>
                    <nav className="space-y-6">
                      {toc.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={`block w-full pl-6 pr-5 py-4 rounded-xl text-sm transition-all leading-relaxed min-h-[48px] flex items-center ${
                            activeSection === item.id
                              ? "bg-[#6B9FF7]/15 text-[#6B9FF7] font-semibold border border-[#6B9FF7]/30"
                              : "bg-slate-50/80 text-slate-600 hover:bg-slate-100 hover:text-slate-800 border border-transparent hover:border-slate-200"
                          }`}
                        >
                          {item.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                </aside>
              )}

              {/* Article body */}
              <article className="flex-1 min-w-0 order-2 lg:order-2 mt-14 lg:mt-0">
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden">
                  <div
                    className="article-content"
                    style={{
                      paddingTop: "clamp(2.5rem, 6vw, 4rem)",
                      paddingBottom: "clamp(3rem, 8vw, 5rem)",
                      paddingLeft: "clamp(2rem, 6vw, 4rem)",
                      paddingRight: "clamp(2rem, 6vw, 4rem)",
                    }}
                  >
                    {body}

                    {/* Previous / Next */}
                    <nav
                      className="mt-6 pt-8 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4"
                      aria-label={locale === "th" ? "นำทางบทความ" : "Article navigation"}
                    >
                      {prevPost ? (
                        <Link
                          href={prefixPath(locale, `/content/${prevPost.slug}`)}
                          className="group inline-flex items-center gap-2 text-[#6B9FF7] font-medium hover:text-[#5a8ee6] transition-colors"
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
                          href={prefixPath(locale, `/content/${nextPost.slug}`)}
                          className="group inline-flex items-center gap-2 text-[#6B9FF7] font-medium hover:text-[#5a8ee6] transition-colors ml-auto"
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
                </div>
              </article>
            </div>
          </div>
        </PageContainer>
      </motion.div>
    </motion.main>
  );
}
