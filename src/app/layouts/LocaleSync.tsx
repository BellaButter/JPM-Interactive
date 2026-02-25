"use client";

import { useEffect } from "react";
import { useLocale } from "@/context/LocaleContext";
import type { Locale } from "@/types/locale";

export function LocaleSync({ locale }: { locale: Locale }) {
  const { setLocale } = useLocale();

  useEffect(() => {
    setLocale(locale);
  }, [locale, setLocale]);

  useEffect(() => {
    document.documentElement.lang = locale === "th" ? "th" : "en";
  }, [locale]);

  return null;
}
