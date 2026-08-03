import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/seo";
import type { Locale } from "@/types/locale";
import { locales } from "@/i18n/config";
import { industriesContent } from "@/data/industriesPageContent";
import IndustriesPageClient from "./IndustriesPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
  const meta = industriesContent[validLocale].meta;
  return generatePageMetadata({
    title: meta.title,
    description: meta.description,
    path: `/${validLocale}/industries`,
    locale: validLocale === "th" ? "th_TH" : "en_US",
  });
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleIndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : null;
  if (validLocale === null) notFound();

  const content = industriesContent[validLocale];

  // Map industries sections to JSON-LD structured data (ItemList of Services)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": content.meta.title,
    "description": content.meta.description,
    "itemListElement": content.sections.map((section, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": section.title,
        "description": section.description,
        "serviceType": "Interactive Installation & Experience Design",
        "provider": {
          "@type": "Organization",
          "name": "JPM Interactive",
          "url": "https://www.jpmmediaspace.com"
        }
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IndustriesPageClient locale={validLocale} />
    </>
  );
}
