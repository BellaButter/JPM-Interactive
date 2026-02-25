import { notFound } from "next/navigation";
import HomePage from "@/sections/HomePage";
import { seo } from "@/i18n/config";
import { generatePageMetadata } from "@/lib/seo";
import type { Locale } from "@/types/locale";
import { locales } from "@/i18n/config";

const TH_HOME_TITLE = "บริษัทรับทำ Interactive Experience | Immersive Installation | JPM Interactive";
const TH_HOME_DESCRIPTION =
  "JPM Interactive บริษัท Creative Technology ในประเทศไทย รับทำ Interactive Installation, Immersive Experience และ Multimedia Systems สำหรับองค์กร งาน Exhibition และ Event ระดับมืออาชีพ";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
  const path = `/${validLocale}`;

  if (validLocale === "th") {
    return generatePageMetadata({
      title: TH_HOME_TITLE,
      description: TH_HOME_DESCRIPTION,
      path,
      locale: "th_TH",
    });
  }
  return generatePageMetadata({
    title: seo.en.home.title,
    description: seo.en.home.description,
    path,
    locale: "en_US",
  });
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : null;
  if (validLocale === null) notFound();

  return <HomePage locale={validLocale} />;
}
