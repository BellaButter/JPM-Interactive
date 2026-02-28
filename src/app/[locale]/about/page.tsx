import { notFound } from "next/navigation";
import AboutPageClient from "@/app/about/AboutPageClient";
import { seo } from "@/i18n/config";
import { generatePageMetadata } from "@/lib/seo";
import type { Locale } from "@/types/locale";
import { locales } from "@/i18n/config";
import { aboutContent } from "@/data/aboutPageContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
  return generatePageMetadata({
    title: seo[validLocale].about.title,
    description: seo[validLocale].about.description,
    path: `/${validLocale}/about`,
    locale: validLocale === "th" ? "th_TH" : "en_US",
  });
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleAboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : null;
  if (validLocale === null) notFound();

  const c = aboutContent[validLocale];

  // Map to JSON-LD structured data (Organization/AboutPage)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "AboutPage"],
    "name": "JPM Interactive",
    "url": "https://jpminteractive.com",
    "logo": "https://jpminteractive.com/logo.png", // Assuming logo path
    "description": c.hero.h1,
    "sameAs": [
      // Links to social profiles could go here
    ],
    "knowsAbout": c.expertise.items
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutPageClient locale={validLocale} />
    </>
  );
}
