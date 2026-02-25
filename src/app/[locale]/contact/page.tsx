import { notFound } from "next/navigation";
import ContactPage from "@/app/contact/page";
import { seo } from "@/i18n/config";
import { generatePageMetadata } from "@/lib/seo";
import type { Locale } from "@/types/locale";
import { locales } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
  return generatePageMetadata({
    title: seo[validLocale].contact.title,
    description: seo[validLocale].contact.description,
    path: `/${validLocale}/contact`,
    locale: validLocale === "th" ? "th_TH" : "en_US",
  });
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : null;
  if (validLocale === null) notFound();

  return <ContactPage />;
}
