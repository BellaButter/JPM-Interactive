import type { Metadata } from "next";
import { seo } from "@/i18n/config";
import type { Locale } from "@/types/locale";
import { generateLayoutMetadata, siteUrl } from "@/lib/seo";

const EN_KEYWORDS = [
  "jpm interactive",
  "jpminteractive",
  "JPM Interactive",
  "creative technology",
  "interactive experiences",
  "LED visual",
  "motion graphics",
  "digital installation",
  "touch screen",
  "immersive",
];
const TH_KEYWORDS = [
  "jpm interactive",
  "jpminteractive",
  "JPM Interactive",
  "บริษัท jpm interactive",
  "ครีเอทีฟเทคโนโลยี",
  "ประสบการณ์เชิงโต้ตอบ"
];

export function getDefaultLocaleMetadata(locale: Locale): Metadata {
  const L = seo[locale];
  const ogLocale = locale === "th" ? "th_TH" : "en_US";
  return generateLayoutMetadata({
    title: L.defaultTitle,
    description: L.defaultDescription,
    locale: ogLocale,
    iconPath: "/icon.png",
    url: `${siteUrl}/${locale}`,
    keywords: locale === "en" ? EN_KEYWORDS : TH_KEYWORDS,
    alternates: { "en-US": `${siteUrl}/en`, "th-TH": `${siteUrl}/th` },
    openGraphExtra: { alternateLocale: locale === "th" ? "en" : "th" },
  });
}
