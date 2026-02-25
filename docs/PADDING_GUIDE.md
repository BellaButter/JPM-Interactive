# คู่มือการเพิ่ม Padding (Padding Guide)

## ความแตกต่าง Padding vs Margin

| คำศัพท์ | ความหมาย | ใช้เมื่อ |
|--------|----------|----------|
| **padding** | ระยะห่าง **ภายใน** element (ระหว่างขอบกับเนื้อหา) | ต้องการให้เนื้อหาในกล่องมีพื้นที่หายใจ |
| **margin** | ระยะห่าง **นอก** element (ระหว่าง section) | ต้องการให้ section ห่างกันมากขึ้น |

**ตัวอย่างการสั่ง:**
- "เพิ่ม margin ระหว่าง section Hero กับ section การ์ด"
- "เพิ่ม margin-top ให้ section CTA"
- "เพิ่ม padding ในการ์ด" = ระยะภายในการ์ด

**ค่าที่ใช้ (SECTION_MARGIN):**
```tsx
const SECTION_MARGIN = {
  marginTop: "clamp(3rem, 8vw, 5rem)",
  marginBottom: "clamp(3rem, 8vw, 5rem)",
};
// ใช้: style={{ ...SECTION_MARGIN, padding: "..." }}
```

---

## หลักการที่ใช้

เมื่อ Tailwind classes (เช่น `px-6`, `py-4`) อาจไม่ทำงานหรือถูก override ใช้ **inline style** แทน เพื่อให้ padding แสดงผลแน่นอน

## รูปแบบที่แนะนำ

### 1. Padding แบบคงที่ (Fixed)
```tsx
style={{ padding: "1rem 1.5rem" }}
// แนวนอน 1.5rem, แนวตั้ง 1rem
```

### 2. Padding แบบ Responsive (clamp)
```tsx
style={{ padding: "clamp(min, preferred, max)" }}
```

**ตัวอย่าง:**
```tsx
// แนวนอนและแนวตั้งเท่ากัน
style={{ padding: "clamp(2rem, 5vw, 2.75rem)" }}

// แนวนอนและแนวตั้งต่างกัน (แนวตั้ง แนวนอน)
style={{ padding: "clamp(3rem, 8vw, 5rem) clamp(2rem, 5vw, 3.5rem)" }}
```

## ตารางอ้างอิง

| องค์ประกอบ | Inline Style | หมายเหตุ |
|------------|--------------|----------|
| Badge เล็ก (pill) | `padding: "0.5rem 1rem"` | เช่น application badges |
| Badge กลาง | `padding: "1rem 1.5rem"` | เช่น "WHAT WE DO" |
| การ์ด/Box | `padding: "clamp(1.75rem, 4vw, 2.25rem)"` | การ์ดขนาดเล็ก |
| การ์ด/Box ใหญ่ | `padding: "clamp(2rem, 5vw, 2.75rem)"` | การ์ดเนื้อหา |
| ปุ่ม CTA | `padding: "1rem 2rem"` | ปุ่มหลัก |
| Banner/CTA section | `padding: "clamp(3rem, 8vw, 5rem) clamp(2rem, 5vw, 3.5rem)"` | แนวตั้ง แนวนอน |
| Footer | `padding: "clamp(3rem, 6vw, 4rem) clamp(1.5rem, 5vw, 2.5rem)"` | แนวตั้ง แนวนอน |

## ขั้นตอนการใช้งาน

1. **ลบ** Tailwind padding classes ออกจาก element (เช่น `px-6 py-4`, `p-8`)
2. **เพิ่ม** `style={{ padding: "..." }}` ตามตารางด้านบน
3. ถ้าต้องการปรับ: เพิ่ม/ลดตัวเลขใน `clamp()` หรือค่าคงที่

## สาเหตุที่ใช้ Inline Style

- **Specificity สูง:** inline style ชนะ CSS classes อื่น
- **หลีกเลี่ยงแคช:** ไม่พึ่ง Tailwind JIT/build cache
- **clamp() responsive:** ปรับตาม viewport โดยไม่ต้องใช้ media query

## ไฟล์ที่ใช้วิธีนี้

- `src/app/services/ServicesOverviewContent.tsx` — badge, การ์ด, CTA, footer
- `src/app/services/ServicePageContent.tsx` — การ์ด, badges, FAQ, CTA
- `src/components/layout/Footer.tsx` — footer

---

## ระยะห่างระหว่างบรรทัด (Line Height)

ใช้ CSS variables ใน `globals.css`:

```css
--line-height-body: 1.85;    /* body ทั้งหน้า */
--line-height-content: 1.9;  /* ย่อหน้า p และ article */
```

**ระยะบน-ล่าง (padding top/bottom):**
- Section: `style={{ paddingTop: "clamp(4rem, 12vw, 8rem)", paddingBottom: "clamp(4rem, 12vw, 8rem)" }}`
- คำสั่ง: "เพิ่มระยะบน-ล่าง" หรือ "เพิ่ม padding บน-ล่าง section การ์ด"

**Inline style สำหรับ content:**
- เนื้อหาหลัก: `style={{ lineHeight: 1.95 }}` หรือ `2`
- ข้อความเล็ก (xs): `style={{ lineHeight: 1.85 }}`
- หัวข้อ (h1, h2): ใช้ `1.25`–`1.3` (ไม่ควรห่างเกินไป)

---

*อัปเดตล่าสุด: ก.พ. 2026*
