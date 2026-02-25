import { notFound } from "next/navigation";
import { ServicePageContent } from "@/app/services/ServicePageContent";
import { seo } from "@/i18n/config";
import { generatePageMetadata } from "@/lib/seo";
import { getServiceJsonLd, getBreadcrumbListJsonLd } from "@/lib/jsonLd";
import type { Locale } from "@/types/locale";
import { locales } from "@/i18n/config";

const BREADCRUMB_LABELS: Record<Locale, { home: string; services: string }> = {
  en: { home: "Home", services: "Services" },
  th: { home: "หน้าแรก", services: "บริการ" },
};

const VALID_SLUGS = ["interactive-installation", "immersive-experience", "multimedia-systems"] as const;
const slugToKey = {
  "interactive-installation": "interactive" as const,
  "immersive-experience": "visual" as const,
  "multimedia-systems": "multimedia" as const,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
  if (!VALID_SLUGS.includes(slug as (typeof VALID_SLUGS)[number])) return { title: "Not Found" };
  const key = slugToKey[slug as (typeof VALID_SLUGS)[number]];
  return generatePageMetadata({
    title: seo[validLocale].services[key].title,
    description: seo[validLocale].services[key].description,
    path: `/${validLocale}/services/${slug}`,
    locale: validLocale === "th" ? "th_TH" : "en_US",
  });
}

export function generateStaticParams() {
  const pairs: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const slug of VALID_SLUGS) {
      pairs.push({ locale, slug });
    }
  }
  return pairs;
}

export default async function LocaleServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : null;
  if (validLocale === null) notFound();
  if (!VALID_SLUGS.includes(slug as (typeof VALID_SLUGS)[number])) notFound();

  const key = slugToKey[slug as (typeof VALID_SLUGS)[number]];
  const serviceMeta = seo[validLocale].services[key];
  const serviceJsonLd = getServiceJsonLd({
    name: serviceMeta.title,
    description: serviceMeta.description,
    path: `/${validLocale}/services/${slug}`,
  });
  const labels = BREADCRUMB_LABELS[validLocale];
  const breadcrumbJsonLd = getBreadcrumbListJsonLd([
    { name: labels.home, path: `/${validLocale}` },
    { name: labels.services, path: `/${validLocale}/services` },
    { name: serviceMeta.title, path: `/${validLocale}/services/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ServicePageContent
        locale={validLocale}
        slug={slug as keyof typeof slugToKey}
      />
    </>
  );
}
