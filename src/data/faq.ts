import type { Locale } from "@/types/locale";

export type FaqItem = { q: string; a: string };

const faqByLocale: Record<Locale, readonly FaqItem[]> = {
  en: [
    {
      q: "What is an Interactive Experience?",
      a: "It is a system or medium that lets users participate—through touch, motion, or real-time interaction—instead of passive viewing.",
    },
    {
      q: "How does an Immersive Experience differ from a standard LED display?",
      a: "Immersive experiences are designed so users are surrounded by the content, creating a sense of presence and deeper engagement than a single-screen display.",
    },
    {
      q: "Can the system be customized for our specific space?",
      a: "Yes. We design solutions based on your space size, budget, and organizational goals.",
    },
  ],
  th: [
    {
      q: "Interactive Experience คืออะไร?",
      a: "คือระบบหรือสื่อที่เปิดโอกาสให้ผู้ใช้งานมีส่วนร่วม เช่น การสัมผัส การเคลื่อนไหว หรือการโต้ตอบแบบ Real-time แทนการรับชมแบบ Passive",
    },
    {
      q: "Immersive Experience แตกต่างจากจอ LED ทั่วไปอย่างไร?",
      a: "Immersive Experience จะออกแบบให้ผู้ใช้งานอยู่ภายในพื้นที่ของเนื้อหา เกิดการโอบล้อมและการมีส่วนร่วมมากกว่าการแสดงผลแบบหน้าจอเดียว",
    },
    {
      q: "ระบบสามารถปรับให้เหมาะกับพื้นที่เฉพาะได้หรือไม่?",
      a: "สามารถออกแบบตามขนาดพื้นที่ งบประมาณ และวัตถุประสงค์ขององค์กร",
    },
  ],
} as const;

export function getFaqItems(locale: Locale): readonly FaqItem[] {
  return faqByLocale[locale] ?? faqByLocale.en;
}
