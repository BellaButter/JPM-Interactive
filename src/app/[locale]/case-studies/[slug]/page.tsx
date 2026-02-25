import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWorkBySlug, works } from "@/data/works";
import { getWorkBySlugFromPageData, worksPageData } from "@/data/worksPageData";
import WorkDetailClient from "@/components/works/WorkDetailClient";
import { generatePageMetadata, siteUrl } from "@/lib/seo";
import { getCreativeWorkJsonLd, getBreadcrumbListJsonLd } from "@/lib/jsonLd";
import type { Locale } from "@/types/locale";
import { locales } from "@/i18n/config";

/** ลำดับ slug สำหรับปุ่ม Prev/Next (worksPageData ก่อน แล้วค่อย works ที่ไม่มีใน list) */
function getOrderedSlugs(): string[] {
    const fromPage = worksPageData.map((w) => w.slug);
    const fromWorks = works.map((w) => w.slug).filter((s) => !fromPage.includes(s));
    return [...fromPage, ...fromWorks];
}

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
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams?: Promise<{ category?: string }>;
}) {
  const { locale, slug } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : null;
  if (validLocale === null) notFound();

  const work = getWorkBySlug(slug) ?? getWorkBySlugFromPageData(slug);
  if (!work) notFound();

  const orderedSlugs = getOrderedSlugs();
  const index = orderedSlugs.indexOf(slug);
  const nextSlug = index >= 0 && index < orderedSlugs.length - 1 ? orderedSlugs[index + 1] : null;
  const prevSlug = index > 0 ? orderedSlugs[index - 1] : null;

  const search = await searchParams?.catch(() => ({})) as { category?: string };
  const validCategories = ["led", "touch_screen", "graphic_design"] as const;
  const returnCategory: "led" | "touch_screen" | "graphic_design" | null =
    search?.category && validCategories.includes(search.category as (typeof validCategories)[number])
      ? (search.category as (typeof validCategories)[number])
      : null;

  const projectPath = `/${validLocale}/case-studies/${slug}`;
  const projectJsonLd = getCreativeWorkJsonLd({
    name: work.title,
    description: work.description,
    path: projectPath,
    image: work.cover ? `${siteUrl}/${work.cover}` : undefined,
  });
  const breadcrumbJsonLd = getBreadcrumbListJsonLd([
    { name: "Home", path: `/${validLocale}` },
    { name: "Case Studies", path: `/${validLocale}/case-studies` },
    { name: work.title, path: projectPath },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <WorkDetailClient
        work={work}
        nextSlug={nextSlug}
        prevSlug={prevSlug}
        returnCategory={returnCategory}
      />
    </>
  );
}
