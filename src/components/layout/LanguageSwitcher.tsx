"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/types/locale";
import { motion } from "framer-motion";

const options: { value: Locale; label: string }[] = [
  { value: "th", label: "TH" },
  { value: "en", label: "EN" },
];

function getLocaleFromPathname(pathname: string): Locale {
  if (pathname.startsWith("/th")) return "th";
  if (pathname.startsWith("/en")) return "en";
  return "en";
}

function pathnameWithLocale(pathname: string, locale: Locale): string {
  const withoutLocale = pathname.replace(/^\/(th|en)/, "") || "/";
  return `/${locale}${withoutLocale === "/" ? "" : withoutLocale}`;
}

type LanguageSwitcherProps = {
  variant?: "pill" | "minimal";
  className?: string;
};

export default function LanguageSwitcher({ variant = "pill", className = "" }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = getLocaleFromPathname(pathname);

  const switchLocale = (next: Locale) => {
    if (next === locale) return;
    const newPath = pathnameWithLocale(pathname, next);
    router.push(newPath);
  };

  if (variant === "minimal") {
    return (
      <div className={`flex items-center gap-1.5 ${className}`} role="group" aria-label="Switch language">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => switchLocale(opt.value)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              locale === opt.value
                ? "bg-[#6B9FF7]/20 text-[#6B9FF7]"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
            aria-pressed={locale === opt.value}
            aria-label={opt.value === "th" ? "ภาษาไทย" : "English"}
          >
            {opt.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`inline-flex rounded-full border border-gray-200/60 bg-white/80 shadow-sm ${className}`}
      role="group"
      aria-label="Switch language"
      style={{ padding: "0.5rem" }}
    >
      {options.map((opt) => (
        <motion.button
          key={opt.value}
          type="button"
          onClick={() => switchLocale(opt.value)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className={`relative rounded-full text-sm font-semibold uppercase tracking-wider transition-colors ${
            locale === opt.value ? "text-white" : "text-gray-600 hover:text-gray-900"
          }`}
          style={{ padding: "0.5rem 1rem" }}
          aria-pressed={locale === opt.value}
          aria-label={opt.value === "th" ? "ภาษาไทย" : "English"}
        >
          {locale === opt.value && (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7BA9F7] to-[#8B9FF8]"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{opt.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
