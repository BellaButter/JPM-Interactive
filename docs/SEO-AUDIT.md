# รายงานตรวจสอบ SEO (SEO Audit)

อัปเดต: จากการตรวจสอบและแก้ไขแล้ว

---

## สิ่งที่มีอยู่แล้วและใช้งานได้ดี

### Meta & Open Graph
- **Root layout:** `generateLayoutMetadata` — title, description, keywords, OG image (`/og-image.jpg`), Twitter card
- **ทุกหน้า locale:** title/description ต่อหน้า (about, contact, faq, case-studies, content, services) ผ่าน `generatePageMetadata`
- **Canonical + hreflang:** ทุกหน้าที่ใช้ `generatePageMetadata` ได้ `alternates.canonical` และ `alternates.languages` (en-US, th-TH)
- **metadataBase:** ตั้งเป็น `siteUrl` ใน `lib/seo.ts` (จาก `NEXT_PUBLIC_SITE_URL` หรือ fallback)

### JSON-LD (Structured Data)
- **Organization + WebSite:** ใน root `layout.tsx` — ชื่อ, logo, sameAs (LINE), telephone, email, inLanguage
- **Article + BreadcrumbList:** หน้า `/content/[slug]`
- **Service + BreadcrumbList:** หน้า `/services/[slug]`
- **FAQPage:** หน้า `/faq` — สำหรับ rich FAQ ในผลค้นหา
- **CreativeWork + BreadcrumbList:** หน้า `/case-studies/[slug]` (โปรเจกต์) — สำหรับ rich result และ breadcrumb

### Technical
- **Sitemap:** `src/app/sitemap.ts` — สร้าง URL ทุก locale, หน้า static, case-studies, content (รวม **/faq** แล้ว)
- **Robots:** `src/app/robots.ts` — allow ทั้ง site, ชี้ไป sitemap.xml
- **Viewport:** ตั้งใน root layout

---

## สิ่งที่แก้ไขในรอบนี้

1. **Sitemap:** เพิ่ม path `/faq` ใน staticPaths เพื่อให้ `/en/faq` และ `/th/faq` อยู่ใน sitemap.xml
2. **FAQ JSON-LD:** เพิ่ม `getFaqPageJsonLd()` ใน `lib/jsonLd.ts` และใส่ script ในหน้า `[locale]/faq/page.tsx` เพื่อส่ง FAQPage schema
3. **Case study (โปรเจกต์) JSON-LD:** เพิ่ม `getCreativeWorkJsonLd()` ใน `lib/jsonLd.ts` และใส่ CreativeWork + BreadcrumbList ในหน้า `[locale]/case-studies/[slug]/page.tsx`
4. **html lang ตาม locale:** ตั้งแล้วใน `LocaleSync` — ใช้ `document.documentElement.lang = locale === "th" ? "th" : "en"` หลัง hydrate

---

## แนะนำเพิ่ม (ถ้าต้องการ)

| รายการ | สถานะ | หมายเหตุ |
|--------|--------|----------|
| **Case Study JSON-LD** | ทำแล้ว | ใช้ CreativeWork + BreadcrumbList ใน `[locale]/case-studies/[slug]` |
| **html lang ตาม locale** | ทำแล้ว | `LocaleSync` ตั้ง `document.documentElement.lang` เป็น `"th"` หรือ `"en"` ตาม locale หลัง hydrate |
| **ตรวจสอบหลัง deploy** | - | ใช้ [Schema.org Validator](https://validator.schema.org/) และ [Google Rich Results Test](https://search.google.com/test/rich-results) ใส่ URL จริง |

---

## ไฟล์ที่เกี่ยวข้อง

- `src/lib/seo.ts` — generatePageMetadata, generateLayoutMetadata, siteUrl
- `src/lib/jsonLd.ts` — Organization, WebSite, Article, Service, FAQPage, BreadcrumbList
- `src/app/layout.tsx` — root metadata + Organization/WebSite JSON-LD
- `src/app/sitemap.ts` — sitemap URLs
- `src/app/robots.ts` — robots.txt
- `src/i18n/config.ts` — seo titles/descriptions ต่อ locale
