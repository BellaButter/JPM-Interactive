import { notFound } from "next/navigation";
import WorksPage from "@/app/works/page";
import { seo } from "@/i18n/config";
import { generatePageMetadata } from "@/lib/seo";
import type { Locale } from "@/types/locale";
import { locales } from "@/i18n/config";
import { worksPageData } from "@/data/worksPageData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
  return generatePageMetadata({
    title: seo[validLocale].caseStudies.title,
    description: seo[validLocale].caseStudies.description,
    path: `/${validLocale}/case-studies`,
    locale: validLocale === "th" ? "th_TH" : "en_US",
  });
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleCaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : null;
  if (validLocale === null) notFound();

  const title = seo[validLocale].caseStudies.title;
  const description = seo[validLocale].caseStudies.description;

  // Map to JSON-LD structured data (CollectionPage / ItemList)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["CollectionPage", "SearchResultsPage"],
    "name": title,
    "description": description,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": worksPageData
        .filter((work) => work.category !== "graphic_design")
        .map((work, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "CreativeWork",
            "name": work.title,
            "description": work.description,
            "url": `https://www.jpmmediaspace.com/${validLocale}/case-studies/${work.slug}`,
            "image": work.media?.src || ""
          }
        }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WorksPage />
    </>
  );
}
