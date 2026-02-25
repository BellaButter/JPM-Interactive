---
name: Blog Content CMS
overview: เพิ่มส่วน Blog/Content (รายการโพสต์ + หน้ารายละเอียด) ที่ดึงข้อมูลจาก Headless CMS โดยออกแบบ data layer ให้สลับ CMS ได้ และเพิ่ม route ใน sitemap/SEO
todos: []
isProject: false
---

# แผนทำหน้า Content / Blog แบบดึงจาก CMS

## สถานะปัจจุบัน

- โปรเจกต์ยังไม่มี route หรือ logic สำหรับ blog/content
- ไม่มี dependency สำหรับ CMS client อยู่แล้ว
- มี pattern คล้ายกันใน [src/app/works](src/app/works) (list + [slug] detail) และ [src/data/works.ts](src/data/works.ts) ที่ใช้เป็น reference ได้

---

## 1. เลือก Headless CMS

แนะนำสองแนวทาง:


| แนวทาง                                             | ข้อดี                                         | ข้อเสีย                                           |
| -------------------------------------------------- | --------------------------------------------- | ------------------------------------------------- |
| **Cloud CMS** (Contentful / Sanity / Strapi Cloud) | ไม่ต้อง host เอง, มี UI ให้ editor แก้เนื้อหา | ต้องสมัครและตั้งค่า env (API key, space ID)       |
| **File-based (MDX ใน repo)**                       | ไม่ต้องมี backend, deploy ไปกับเว็บได้เลย     | แก้บทความต้องแก้ไฟล์/PR (หรือใช้ CMS อื่นภายหลัง) |


ถ้าต้องการ “ดึงจาก CMS” จริง แนะนำเริ่มจาก **Contentful** หรือ **Sanity** (มี free tier, REST/GraphQL ชัดเจน). ถ้าอยากลดการตั้งค่าเริ่มต้น อาจเริ่มด้วย **ไฟล์ JSON/MDX ใน repo** แล้วค่อยต่อ CMS ทีหลัง.

---

## 2. โครงสร้าง Route

เพิ่มภายใต้ App Router แบบเดียวกับ Works:

- `**/content`** — หน้ารายการโพสต์ (grid หรือ list)
- `**/content/[slug]`** — หน้ารายละเอียดโพสต์

โฟลเดอร์ที่ต้องมี:

- [src/app/content/page.tsx](src/app/content/page.tsx) — รายการโพสต์
- [src/app/content/[slug]/page.tsx](src/app/content/[slug]/page.tsx) — โพสต์เดียว (ใช้ `generateStaticParams` ถ้าใช้ static data หรือ ISR)
- [src/app/content/layout.tsx](src/app/content/layout.tsx) — metadata ระดับ section (title: "Content - JPM Interactive" หรือ "Blog - JPM Interactive")

---

## 3. Data Layer (ให้สลับ CMS ได้)

สร้าง abstraction ไม่ผูกกับ CMS ตัวใดตัวหนึ่ง:

- **Types:** [src/types/content.ts](src/types/content.ts) — กำหนด `ContentPost` เช่น `slug`, `title`, `description`, `body` (หรือ `content`), `coverImage`, `publishedAt`, `updatedAt`
- **Data source:** [src/data/content.ts](src/data/content.ts) หรือ [src/lib/content/cms.ts](src/lib/content/cms.ts) — export `getAllPosts()`, `getPostBySlug(slug)`. ภายในไฟล์นี้จะเรียก API ของ CMS หรือ đọcจากไฟล์/JSON ตามที่เลือก
- **Phase 1 (ไม่ต้องมี CMS จริง):** ใช้ array ของโพสต์ใน `content.ts` (เหมือน [src/data/worksPageData.ts](src/data/worksPageData.ts)) เพื่อให้สร้าง UI และ route ได้ทันที ภายหลังค่อยแทนที่ด้วยการเรียก Contentful/Sanity API

---

## 4. หน้าที่ต้องสร้าง

- **List page (`/content`):**  
  - เรียก `getAllPosts()` (หรือจาก CMS)  
  - แสดงการ์ดโพสต์ (รูป, title, description, date)  
  - ลิงก์ไป `/content/[slug]`  
  - ใช้ layout เดียวกับ Works ได้ (เช่น [PageContainer](src/components/layout/PageContainer))
- **Detail page (`/content/[slug]`):**  
  - เรียก `getPostBySlug(slug)`  
  - แสดง title, date, cover, body (ถ้าเป็น rich text จาก CMS ต้องมี component แปลง HTML หรือใช้ library ตามที่ CMS แนะนำ)  
  - ใช้ `generateMetadata` สำหรับ SEO (title, description, og:image จากโพสต์)  
  - ใช้ `generateStaticParams` ถ้าโพสต์เป็น static หรือใช้ `dynamicParams` + fetch ตาม slug
- **Navigation:** เพิ่มลิงก์ "Content" หรือ "Blog" ใน [src/components/layout/Navigation.tsx](src/components/layout/Navigation.tsx) (และ Footer ถ้ามี)

---

## 5. เชื่อมกับ CMS (เมื่อพร้อม)

- ตั้งค่า env ใน Vercel และ `.env.local`: เช่น `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN` หรือ `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_TOKEN`
- ใน [src/lib/content/cms.ts](src/lib/content/cms.ts) (หรือไฟล์ที่ใช้เป็น data source):  
  - เรียก REST/GraphQL ของ CMS  
  - map response เป็น type `ContentPost`  
  - ใช้ใน `getAllPosts()` และ `getPostBySlug(slug)`
- Rich text: ถ้า CMS ส่งเป็น HTML ใช้ `dangerouslySetInnerHTML` ในโซนที่ควบคุมได้ หรือใช้ library อย่าง `@contentful/rich-text-react-renderer` / Sanity portable text ตามที่เลือก

---

## 6. SEO และการเชื่อมกับระบบเดิม

- อัป [src/app/sitemap.ts](src/app/sitemap.ts) — เพิ่ม URL `/content` และ `/content/[slug]` สำหรับทุก slug ที่ได้จาก `getAllPosts()`
- อัป [src/app/robots.ts](src/app/robots.ts) — ไม่ต้องเปลี่ยน (allow "/" อยู่แล้ว)
- หน้า list/detail ใช้ metadata จาก layout และ `generateMetadata` ให้ครบ (เหมือน [src/app/works/[slug]/page.tsx](src/app/works/[slug]/page.tsx))

---

## 7. ลำดับการทำที่แนะนำ

1. สร้าง type `ContentPost` และ data layer แบบ in-memory (array ใน `content.ts`) + `getAllPosts`, `getPostBySlug`
2. สร้าง route `/content`, `/content/[slug]` และ layout พร้อม metadata
3. ทำ UI หน้ารายการและหน้ารายละเอียด (ใช้ component/layout ที่มีอยู่แล้วให้สม่ำเสมอกับ Works)
4. เพิ่มลิงก์ Content/Blog ใน Nav (และ Footer)
5. อัป sitemap ให้รวม `/content` และทุก `/content/[slug]`
6. (เมื่อตัดสินใจแล้ว) เลือก CMS จริง → ตั้ง env → แทนที่ logic ใน data layer ให้ดึงจาก API

ถ้าต้องการให้เริ่มแบบไม่พึ่ง CMS เลย สามารถใช้ขั้นตอนที่ 1–5 โดยเก็บโพสต์ใน `src/data/content.ts` (หรือไฟล์ MDX ใน repo) ก่อน แล้วค่อยต่อ CMS ในขั้นที่ 6