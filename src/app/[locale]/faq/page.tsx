import { notFound } from "next/navigation";
import FaqPageClient from "@/app/faq/FaqPageClient";
import { seo, locales } from "@/i18n/config";
import { generatePageMetadata } from "@/lib/seo";
import { getFaqPageJsonLd } from "@/lib/jsonLd";
import { getFaqItems } from "@/data/faq";
import type { Locale } from "@/types/locale";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
  return generatePageMetadata({
    title: seo[validLocale].faq.title,
    description: seo[validLocale].faq.description,
    path: `/${validLocale}/faq`,
    locale: validLocale === "th" ? "th_TH" : "en_US",
  });
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleFaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : null;
  if (validLocale === null) notFound();

  const faqItems = getFaqItems(validLocale);
  const faqJsonLd = getFaqPageJsonLd({
    path: `/${validLocale}/faq`,
    items: faqItems.map((item) => ({ q: item.q, a: item.a })),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FaqPageClient locale={validLocale} />
    </>
  );
}
