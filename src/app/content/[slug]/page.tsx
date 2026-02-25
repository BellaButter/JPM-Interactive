import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getNextPost, getPreviousPost } from "@/data/content";
import ContentDetailClient from "./ContentDetailClient";
import { generatePageMetadata, siteUrl } from "@/lib/seo";

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
  const image = post.coverImage
    ? `${siteUrl}${post.coverImage.startsWith("/") ? "" : "/"}${post.coverImage}`
    : undefined;

  return generatePageMetadata({
    title,
    description,
    path: `/content/${slug}`,
    locale: "en_US",
    image,
    alternates: {
      "en-US": `${siteUrl}/en/content/${slug}`,
      "th-TH": `${siteUrl}/th/content/${slug}`,
    },
  });
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
