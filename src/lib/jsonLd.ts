import { siteUrl } from "./seo";

/**
 * # JSON-LD Structured Data
 *
 * Schema.org JSON-LD ใช้สำหรับ rich results ใน Google (Knowledge Panel, Article, Service ฯลฯ)
 *
 * ## 1. ต่อหน้า (Article, Service, BreadcrumbList)
 *
 * ใน page.tsx หรือ layout.tsx ของ route นั้น:
 *
 *   import { getArticleJsonLd } from "@/lib/jsonLd";
 *
 *   export default function Page() {
 *     const jsonLd = getArticleJsonLd({ title: "...", description: "...", path: "/en/content/slug", image: "..." });
 *     return (
 *       <>
 *         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
 *         <div>...</div>
 *       </>
 *     );
 *   }
 *
 * หรือใน layout ของ route (เช่น src/app/[locale]/content/[slug]/layout.tsx) ให้ render script
 * ข้างใน children แล้วใช้ generateMetadata สำหรับ meta tags (lib/seo.ts)
 *
 * ## 2. LocalBusiness / ที่อยู่ โทร
 *
 * แก้ใน getOrganizationJsonLd() ด้านล่าง: เพิ่ม property ในโหนด Organization
 *
 *   address: {
 *     "@type": "PostalAddress",
 *     streetAddress: "ที่อยู่บรรทัด 1",
 *     addressLocality: "กรุงเทพฯ",
 *     addressCountry: "TH",
 *   },
 *   telephone: "+66-xx-xxx-xxxx",
 *   openingHoursSpecification: [
 *     { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Friday"], opens: "09:00", closes: "18:00" },
 *   ],
 *
 * หรือสร้างโหนดแยก "@type": "LocalBusiness" แล้วใช้ "parentOrganization": { "@id": "${siteUrl}/#organization" }
 *
 * ## 3. ตรวจสอบหลัง deploy
 *
 * - Schema.org Validator: https://validator.schema.org/ (วาง URL หน้าหรือ paste HTML)
 * - Google Rich Results Test: https://search.google.com/test/rich-results
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/organization
 * @see https://schema.org/Organization
 * @see https://schema.org/WebSite
 * @see https://schema.org/Article
 * @see https://schema.org/Service
 * @see https://schema.org/BreadcrumbList
 */

export function getOrganizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "JPM Interactive",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/icon.png`,
        },
        description:
          "Creative Technology Studio. High-end interactive programs, mini games, graphic design, and motion graphics for innovative brands.",
        sameAs: [
          "https://line.me/R/ti/p/@jpmgroup", // LINE
          // Add more social URLs when available: Instagram, LinkedIn, etc.
        ],
        telephone: "+66-82-294-1541",
        email: "jpmgroupteam@gmail.com",
        // Optional: เพิ่มเมื่อมีที่อยู่
        // address: { "@type": "PostalAddress", streetAddress: "...", addressLocality: "Bangkok", addressCountry: "TH" },
        // openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Friday"], opens: "09:00", closes: "18:00" }],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "JPM Interactive",
        description:
          "High-end interactive programs, mini games, graphic design, and motion graphics for innovative brands.",
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: ["en-US", "th-TH"],
        potentialAction: {
          "@type": "ReadAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: siteUrl,
          },
        },
      },
    ],
  };
}

/** พารามิเตอร์สำหรับ Article JSON-LD (หน้าบทความ) */
export interface ArticleJsonLdParams {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}

/**
 * สร้าง JSON-LD สำหรับหน้า Article (เช่น /content/[slug]).
 * ใช้ใน page หรือ layout: <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticleJsonLd({...})) }} />
 */
export function getArticleJsonLd({
  title,
  description,
  path,
  image,
  datePublished,
  dateModified,
  authorName = "JPM Interactive",
}: ArticleJsonLdParams): Record<string, unknown> {
  const url = path.startsWith("http") ? path : `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const imageUrl = image ?? `${siteUrl}/og-image.jpg`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    image: imageUrl,
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    author: { "@type": "Organization", name: authorName, url: siteUrl },
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

/** พารามิเตอร์สำหรับ Service JSON-LD (หน้าบริการ) */
export interface ServiceJsonLdParams {
  name: string;
  description: string;
  path: string;
}

/**
 * สร้าง JSON-LD สำหรับหน้า Service (เช่น /services/interactive-installation).
 * ใช้ใน page หรือ layout: <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getServiceJsonLd({...})) }} />
 */
export function getServiceJsonLd({ name, description, path }: ServiceJsonLdParams): Record<string, unknown> {
  const url = path.startsWith("http") ? path : `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: { "@id": `${siteUrl}/#organization` },
  };
}

/** พารามิเตอร์สำหรับ CreativeWork JSON-LD (case study / โปรเจกต์) */
export interface CreativeWorkJsonLdParams {
  name: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
}

/**
 * สร้าง JSON-LD CreativeWork สำหรับหน้า case study (โปรเจกต์).
 * ใช้ในหน้า case-studies/[slug]: <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getCreativeWorkJsonLd({...})) }} />
 * @see https://schema.org/CreativeWork
 */
export function getCreativeWorkJsonLd({
  name,
  description,
  path,
  image,
  datePublished,
}: CreativeWorkJsonLdParams): Record<string, unknown> {
  const url = path.startsWith("http") ? path : `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const imageUrl = image ?? `${siteUrl}/og-image.jpg`;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    url,
    image: imageUrl,
    ...(datePublished && { datePublished }),
    author: { "@id": `${siteUrl}/#organization` },
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

/** พารามิเตอร์สำหรับ FAQPage JSON-LD (หน้า FAQ) */
export interface FaqPageJsonLdParams {
  path: string;
  items: { q: string; a: string }[];
}

/**
 * สร้าง JSON-LD FAQPage สำหรับ rich FAQ ในผลค้นหา Google.
 * ใช้ในหน้า FAQ: <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqPageJsonLd({...})) }} />
 */
export function getFaqPageJsonLd({ path, items }: FaqPageJsonLdParams): Record<string, unknown> {
  const url = path.startsWith("http") ? path : `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
    url,
  };
}

/** รายการ breadcrumb: name + path (relative หรือ absolute) */
export interface BreadcrumbItem {
  name: string;
  path: string;
}

/**
 * สร้าง JSON-LD BreadcrumbList สำหรับ rich breadcrumb ในผลค้นหา.
 * items: [{ name: "Home", path: "/en" }, { name: "Services", path: "/en/services" }, { name: "Interactive Installation", path: "/en/services/..." }]
 */
export function getBreadcrumbListJsonLd(items: BreadcrumbItem[]): Record<string, unknown> {
  const itemListElement = items.map((item, index) => {
    const itemUrl = item.path.startsWith("http") ? item.path : `${siteUrl}${item.path.startsWith("/") ? item.path : `/${item.path}`}`;
    return {
      "@type": "ListItem" as const,
      position: index + 1,
      name: item.name,
      item: itemUrl,
    };
  });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}
