import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocaleLayout } from "@/app/layouts/LocaleLayout";
import { getDefaultLocaleMetadata } from "@/app/layouts/localeMetadata";
import type { Locale } from "@/types/locale";
import { locales } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
  return getDefaultLocaleMetadata(validLocale as Locale);
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleSegmentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : null;
  if (validLocale === null) notFound();

  return <LocaleLayout locale={validLocale}>{children}</LocaleLayout>;
}
