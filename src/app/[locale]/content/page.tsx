import { notFound } from "next/navigation";
import ContentListPage from "@/app/content/page";
import { generatePageMetadata } from "@/lib/seo";
import type { Locale } from "@/types/locale";
import { locales } from "@/i18n/config";

const CONTENT_TITLES: Record<Locale, string> = {
  en: "Articles - JPM Interactive",
  th: "บทความ - JPM Interactive",
};
const CONTENT_DESCRIPTIONS: Record<Locale, string> = {
  en: "Articles and content from JPM Interactive.",
  th: "บทความและเนื้อหาจาก JPM Interactive",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
  return generatePageMetadata({
    title: CONTENT_TITLES[validLocale],
    description: CONTENT_DESCRIPTIONS[validLocale],
    path: `/${validLocale}/content`,
    locale: validLocale === "th" ? "th_TH" : "en_US",
  });
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleContentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : null;
  if (validLocale === null) notFound();

  return <ContentListPage />;
}
