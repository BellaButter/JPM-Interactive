import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getNextPost, getPreviousPost } from "@/data/content";
import ContentDetailClient from "@/app/content/[slug]/ContentDetailClient";
import { generatePageMetadata, siteUrl } from "@/lib/seo";
import type { Locale } from "@/types/locale";
import { locales } from "@/i18n/config";

export function generateStaticParams() {
  const slugs = getAllPosts("th").map((post) => post.slug);
  const pairs: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const slug of slugs) {
      pairs.push({ locale, slug });
    }
  }
  return pairs;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
  const post = getPostBySlug(slug, validLocale);
  if (!post) return { title: "Post Not Found" };

  const title = `${post.title} - JPM Interactive`;
  const description = post.description;
  const image = post.coverImage
    ? `${siteUrl}${post.coverImage.startsWith("/") ? "" : "/"}${post.coverImage}`
    : undefined;

  return generatePageMetadata({
    title,
    description,
    path: `/${validLocale}/content/${slug}`,
    locale: validLocale === "th" ? "th_TH" : "en_US",
    image,
  });
}

export default async function LocaleContentDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : null;
  if (validLocale === null) notFound();

  const post = getPostBySlug(slug, validLocale);
  const nextPost = getNextPost(slug, validLocale);
  const prevPost = getPreviousPost(slug, validLocale);

  if (!post) notFound();

  const publishedDate = new Date(post.publishedAt).toLocaleDateString(
    validLocale === "th" ? "th-TH" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <ContentDetailClient
      post={post}
      nextPost={nextPost ?? null}
      prevPost={prevPost ?? null}
      publishedDate={publishedDate}
    />
  );
}
