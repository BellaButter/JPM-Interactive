import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getNextPost, getPreviousPost } from "@/data/content";
import ContentDetailClient from "./ContentDetailClient";

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
    const nextPost = getNextPost(slug);
    const prevPost = getPreviousPost(slug);

    if (!post) {
        notFound();
    }

    const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <ContentDetailClient
            post={post}
            nextPost={nextPost ?? null}
            prevPost={prevPost ?? null}
            publishedDate={publishedDate}
        />
    );
}
