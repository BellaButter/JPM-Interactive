import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getPostBySlug } from "@/data/content";
import PageContainer from "@/components/layout/PageContainer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jpm-interactive.vercel.app";

export function generateStaticParams() {
    return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return { title: "Post Not Found" };

    const title = `${post.title} - JPM Interactive`;
    const description = post.description;
    const url = `${siteUrl}/content/${slug}`;
    const images = post.coverImage
        ? [{ url: `${siteUrl}${post.coverImage.startsWith("/") ? "" : "/"}${post.coverImage}`, width: 1200, height: 630, alt: post.title }]
        : undefined;

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            title,
            description,
            url,
            siteName: "JPM Interactive",
            images,
            locale: "en_US",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

export default async function ContentDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <main className="w-full min-h-screen bg-[#0f172a]">
            {/* Back button - floating over hero */}
            <div className="fixed top-24 sm:top-28 left-0 right-0 z-20 flex justify-center sm:justify-start pointer-events-none">
                <PageContainer className="w-full pointer-events-auto">
                    <Link
                        href="/content"
                        className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-gray-200/80 rounded-full text-sm font-medium text-slate-700 hover:bg-white hover:border-[#6B9FF7] hover:text-[#6B9FF7] hover:shadow-xl transition-all duration-300"
                        style={{ padding: "12px 24px" }}
                    >
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="hidden sm:inline">Back to Articles</span>
                    </Link>
                </PageContainer>
            </div>

            {/* Hero: full-width cover + overlay */}
            <header className="relative w-full min-h-[55vh] sm:min-h-[60vh] flex flex-col justify-end">
                {post.coverImage ? (
                    <>
                        <Image
                            src={post.coverImage}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="100vw"
                            priority
                        />
                        <div
                            className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent"
                            aria-hidden
                        />
                    </>
                ) : (
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f] via-[#334155] to-[#475569]"
                        aria-hidden
                    />
                )}
                <div className="relative z-10 w-full pb-16 pt-32 sm:pt-40">
                    <PageContainer className="w-full">
                        <div className="max-w-3xl">
                            <time
                                dateTime={post.publishedAt}
                                className="block text-sm font-medium text-[#94a3b8] uppercase tracking-wider mb-3"
                            >
                                {publishedDate}
                            </time>
                            <span className="inline-block text-sm font-medium text-[#6B9FF7] mb-4">
                                JPM Interactive
                            </span>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.15]">
                                {post.title}
                            </h1>
                            {post.description && (
                                <p className="text-lg sm:text-xl text-slate-300 mt-4 max-w-2xl leading-relaxed">
                                    {post.description}
                                </p>
                            )}
                        </div>
                    </PageContainer>
                </div>
            </header>

            {/* Content: elevated card on dark bg */}
            <div className="relative -mt-8 sm:-mt-12 z-10 pb-24">
                <PageContainer className="w-full">
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-t-3xl sm:rounded-t-[2rem] shadow-2xl overflow-hidden min-h-[40vh]">
                            <div className="px-6 sm:px-10 md:px-12 pt-10 sm:pt-14 pb-16">
                                <div
                                    className="article-body text-gray-700 leading-[1.8] text-base md:text-lg [&_p]:mb-5 [&_p:last-child]:mb-0 [&_a]:text-[#6B9FF7] [&_a]:font-medium [&_a]:underline [&_a:hover]:text-[#5a8ee6] [&_strong]:font-semibold [&_strong]:text-gray-900"
                                    dangerouslySetInnerHTML={{ __html: post.body }}
                                />
                            </div>
                        </div>
                    </div>
                </PageContainer>
            </div>
        </main>
    );
}
