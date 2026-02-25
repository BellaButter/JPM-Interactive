import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWorkBySlug, works } from "@/data/works";
import { getWorkBySlugFromPageData, worksPageData } from "@/data/worksPageData";
import WorkDetailClient from "@/components/works/WorkDetailClient";
import { generatePageMetadata, siteUrl } from "@/lib/seo";
import type { Locale } from "@/types/locale";
import { locales } from "@/i18n/config";

export function generateStaticParams() {
  const fromWorks = works.map((work) => work.slug);
  const fromPageData = worksPageData.map((work) => work.slug);
  const slugs = [...new Set([...fromWorks, ...fromPageData])];
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
  const work = getWorkBySlug(slug) ?? getWorkBySlugFromPageData(slug);
  if (!work) return { title: "Work Not Found" };

  const title = `${work.title} - JPM Interactive`;
  const description = work.description;
  const image = work.cover ? `${siteUrl}/${work.cover}` : undefined;

  return generatePageMetadata({
    title,
    description,
    path: `/${validLocale}/case-studies/${slug}`,
    locale: validLocale === "th" ? "th_TH" : "en_US",
    image,
  });
}

export default async function LocaleCaseStudyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : null;
  if (validLocale === null) notFound();

  const work = getWorkBySlug(slug) ?? getWorkBySlugFromPageData(slug);
  if (!work) notFound();

  return <WorkDetailClient work={work} />;
}
