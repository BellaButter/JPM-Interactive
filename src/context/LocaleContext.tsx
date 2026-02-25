"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Locale } from "@/types/locale";
import en from "@/messages/en.json";
import th from "@/messages/th.json";

const COOKIE_NAME = "NEXT_LOCALE";
const COOKIE_MAX_AGE_DAYS = 365;

const messages: Record<Locale, Record<string, unknown>> = {
  en: en as Record<string, unknown>,
  th: th as Record<string, unknown>,
};

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${expires}; SameSite=Lax`;
}

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = getCookie(COOKIE_NAME);
  if (stored === "th" || stored === "en") return stored;
  const lang = navigator.language?.toLowerCase();
  if (lang?.startsWith("th")) return "th";
  return "en";
}

/** Resolve nested key like "nav.home" to value from messages object */
function getNested(obj: Record<string, unknown>, key: string): string | undefined {
  const parts = key.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : undefined;
}

export type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(getInitialLocale());
    setMounted(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    setCookie(COOKIE_NAME, next, COOKIE_MAX_AGE_DAYS);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const obj = messages[locale];
      const value = getNested(obj, key);
      return value ?? key;
    },
    [locale]
  );

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  );

  return (
    <LocaleContext.Provider value={value}>
      {children}
      {mounted && <HtmlLangSync locale={locale} />}
    </LocaleContext.Provider>
  );
}

/** Client-only: sync html lang + class สำหรับสลับฟอนต์ (ไทย = LINE Seed, อังกฤษ = Inter) */
function HtmlLangSync({ locale }: { locale: Locale }) {
  useEffect(() => {
    const html = document.documentElement;
    const isTh = locale === "th";
    html.lang = isTh ? "th" : "en";
    html.classList.remove("locale-en", "locale-th");
    html.classList.add(isTh ? "locale-th" : "locale-en");
  }, [locale]);
  useEffect(() => {
    const pathname = typeof window !== "undefined" ? window.location.pathname : "";
    const fromPath = pathname.startsWith("/th") ? "th" : "en";
    const html = document.documentElement;
    html.classList.remove("locale-en", "locale-th");
    html.classList.add(fromPath === "th" ? "locale-th" : "locale-en");
    html.lang = fromPath === "th" ? "th" : "en";
  }, []);
  return null;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
