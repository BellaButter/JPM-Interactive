import type { Locale } from "@/types/locale";
import { LocaleSync } from "./LocaleSync";

export function LocaleLayout({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <>
      <LocaleSync locale={locale} />
      {children}
    </>
  );
}
