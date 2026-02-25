"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Container from "@/components/layout/Container";
import { useLocale } from "@/context/LocaleContext";
import { prefixPath } from "@/i18n/config";

/* ═══ Spacing scale (ใช้สม่ำเสมอทั้ง 3 sections — แก้ไขตรงนี้ได้) ═══ */
/** ระยะห่างระหว่าง "ผลงานเด่น" กับ section "กระบวนการทำงานของเรา" — ใช้ inline style เพื่อให้เห็นผลแน่นอน (ปรับค่าได้ตรงนี้) */
const GAP_ABOVE_PROCESS_REM = "clamp(5rem, 12vw, 8rem)";
const GAP_ABOVE_PROCESS = "mt-20 sm:mt-24 md:mt-28 lg:mt-32";
const SECTION_GAP = "gap-16 sm:gap-20 md:gap-24 lg:gap-28";
const SECTION_PY = "py-14 sm:py-16 md:py-20 lg:py-24";
/** ระยะบน section แรก (padding ด้านบนของ "กระบวนการ") — เพิ่มค่า = ห่างขึ้น */
const FIRST_SECTION_TOP = "first:pt-24 sm:first:pt-28 md:first:pt-32 lg:first:pt-36";
const HEADER_BOTTOM = "mb-10 sm:mb-12 md:mb-14";
const CARD_PADDING = "p-6 sm:p-7 md:p-8 lg:p-9";
/** ใช้ inline style เพื่อให้ padding มีผลแน่นอน (Tailwind จากตัวแปรอาจไม่ถูก build) — ค่า rem */
const CARD_PADDING_REM = "clamp(1.25rem, 4vw, 2.25rem)";
const CARD_PADDING_STYLE = { padding: CARD_PADDING_REM };
/** ปุ่ม "ดูโปรเจกต์ทั้งหมด" / "ดูอุตสาหกรรมทั้งหมด" — ใช้ inline เพื่อให้เห็นผลแน่นอน */
const BUTTON_PADDING_STYLE = { padding: "0.75rem 1.5rem" };
/** ระยะระหว่างหัวข้อ+ปุ่ม กับแถวการ์ด (เฉพาะ section กระบวนการ) — เพิ่มแล้วปุ่มไม่ชิดการ์ด */
const PROCESS_HEADER_BOTTOM_STYLE = { marginBottom: "clamp(2.5rem, 6vw, 4rem)" };
/** ระยะระหว่างแถวการ์ด กับปุ่ม "ดูอุตสาหกรรมทั้งหมด" */
const INDUSTRIES_BUTTON_TOP_STYLE = { marginTop: "clamp(2.5rem, 6vw, 4rem)" };
const GRID_GAP = "gap-5 sm:gap-6 md:gap-8";

const bodyClass = "text-[15px] sm:text-base md:text-lg text-slate-600 leading-[1.75]";
const sectionTitleClass =
  "text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl md:text-4xl";
const sectionGradientText =
  "bg-gradient-to-r from-[#4F46E5] via-[#6B9FF7] to-[#8B5CF6] bg-clip-text text-transparent";
const accentLineClass = "mt-2 h-0.5 w-12 rounded-full bg-gradient-to-r from-[#6B9FF7] to-[#8B5CF6] opacity-80";

const PROCESS_STEPS = [
  {
    id: "01",
    title: "Strategy & Experience Planning",
    desc: "วิเคราะห์เป้าหมายทางธุรกิจ และออกแบบแนวคิดประสบการณ์",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
  },
  {
    id: "02",
    title: "Concept Design & Visual Development",
    desc: "พัฒนาแนวคิดด้านภาพ การเล่าเรื่อง และ Interaction Design",
    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
  },
  {
    id: "03",
    title: "System Development & Integration",
    desc: "พัฒนาระบบ Interactive และเชื่อมต่อกับ Hardware / Software",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  },
  {
    id: "04",
    title: "Testing, Optimization & Installation",
    desc: "ทดสอบ ปรับปรุง และติดตั้งระบบในพื้นที่จริง",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
] as const;

const INDUSTRIES_LIST = [
  "Organizer / Event Production",
  "แบรนด์ที่เปิดตัวสินค้า",
  "ทีม in-house event ขององค์กรใหญ่",
  "ผู้ออกแบบพิพิธภัณฑ์",
  "SI (System Integrator) ด้านพิพิธภัณฑ์",
  "บริษัททำ Showroom / Experience Space",
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

/** Block หัวข้อ section (title + เส้น + คำอธิบาย) — ใช้รูปแบบเดียวกันทุก section */
function SectionHeader({
  id,
  title,
  description,
  inView,
  action,
  wrapperStyle,
}: {
  id: string;
  title: string;
  description: string;
  inView: boolean;
  action?: React.ReactNode;
  wrapperStyle?: React.CSSProperties;
}) {
  return (
    <div className={HEADER_BOTTOM} style={wrapperStyle}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <h2
            id={id}
            className={`${sectionTitleClass} ${sectionGradientText}`}
          >
            {title}
          </h2>
          <div className={`${accentLineClass} mt-2`} aria-hidden />
          <p className={`mt-4 ${bodyClass}`}>{description}</p>
        </motion.div>
        {action != null && (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="shrink-0"
          >
            {action}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function ThHomeMiddleSections() {
  const { locale } = useLocale();
  const processRef = useRef<HTMLElement>(null);
  const processInView = useInView(processRef, { once: true, margin: "-80px" });
  const industriesRef = useRef<HTMLElement>(null);
  const industriesInView = useInView(industriesRef, { once: true, margin: "-80px" });

  return (
    <div
      className={`relative z-0 w-full flex flex-col ${GAP_ABOVE_PROCESS} ${SECTION_GAP}`}
      style={{ marginTop: GAP_ABOVE_PROCESS_REM }}
    >
      {/* ═══ Process: กระบวนการ ═══ */}
      <section
        ref={processRef}
        className={`${SECTION_PY} relative overflow-hidden ${FIRST_SECTION_TOP}`}
        aria-labelledby="process-heading"
      >
        <div className="absolute inset-0 -z-10 bg-white" aria-hidden />
        <Container className="w-full">
          <SectionHeader
            id="process-heading"
            title="กระบวนการทำงานของเรา"
            description="ทุกโปรเจกต์ถูกพัฒนาอย่างเป็นระบบ เพื่อให้ได้ทั้งคุณภาพงานออกแบบ และความเสถียรในการใช้งานจริง"
            inView={processInView}
            wrapperStyle={PROCESS_HEADER_BOTTOM_STYLE}
            action={
              <Link
                href={prefixPath(locale, "/case-studies")}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#6B9FF7] text-sm font-medium text-white shadow-lg shadow-[#6B9FF7]/25 transition-all hover:shadow-xl hover:shadow-[#6B9FF7]/30 hover:-translate-y-0.5"
                style={BUTTON_PADDING_STYLE}
              >
                ดูโปรเจกต์ทั้งหมด
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            }
          />

          <motion.ol
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${GRID_GAP}`}
            aria-label="ขั้นตอน"
            variants={containerVariants}
            initial="hidden"
            animate={processInView ? "visible" : "hidden"}
          >
            {PROCESS_STEPS.map((step) => (
              <motion.li key={step.id} variants={itemVariants} className="group relative">
                <motion.div
                  className="relative h-full rounded-2xl border-2 border-[#7BA9F7]/20 bg-white shadow-md transition-all duration-300 hover:border-[#6B9FF7]/50 hover:shadow-xl hover:shadow-[#6B9FF7]/15 hover:-translate-y-1"
                  style={CARD_PADDING_STYLE}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute right-5 top-5 sm:right-6 sm:top-6 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#6B9FF7]/20 to-[#8B5CF6]/20 text-[#6B9FF7] transition-transform group-hover:scale-110 group-hover:rotate-3 sm:h-10 sm:w-10" aria-hidden>
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.icon} />
                    </svg>
                  </div>
                  <span
                    className="block text-3xl font-bold tabular-nums text-transparent sm:text-4xl"
                    style={{
                      background: "linear-gradient(135deg, #6B9FF7 0%, #8B5CF6 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      opacity: 0.9,
                    }}
                    aria-hidden
                  >
                    {step.id}
                  </span>
                  <h3 className="mt-4 text-base font-semibold leading-snug text-slate-900 sm:text-lg">{step.title}</h3>
                  <p className={`mt-3 ${bodyClass}`}>{step.desc}</p>
                </motion.div>
              </motion.li>
            ))}
          </motion.ol>
        </Container>
      </section>

      {/* ═══ Industries: องค์กรที่เรารองรับ ═══ */}
      <section
        ref={industriesRef}
        className={`${SECTION_PY} last:pb-24 sm:last:pb-28 md:last:pb-32`}
        aria-labelledby="industries-heading"
      >
        <Container className="w-full">
          <SectionHeader
            id="industries-heading"
            title="เหมาะสำหรับองค์กรประเภทใด"
            description="เราให้บริการองค์กรหลากหลายประเภท ตั้งแต่งานอีเวนต์ พิพิธภัณฑ์ ไปจนถึง Showroom และ Experience Space"
            inView={industriesInView}
          />

          <motion.ul
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 ${GRID_GAP}`}
            role="list"
            variants={containerVariants}
            initial="hidden"
            animate={industriesInView ? "visible" : "hidden"}
          >
            {INDUSTRIES_LIST.map((item) => (
              <motion.li key={item} variants={itemVariants} className="flex">
                <motion.div
                  className="flex h-full min-h-[5rem] w-full items-center gap-4 rounded-2xl border-2 border-[#7BA9F7]/15 bg-gradient-to-br from-white to-[#f8faff] shadow-sm transition-all duration-300 hover:border-[#6B9FF7]/40 hover:shadow-lg hover:shadow-[#6B9FF7]/10 hover:-translate-y-0.5"
                  style={CARD_PADDING_STYLE}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span
                    className="flex h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-r from-[#6B9FF7] to-[#8B5CF6] shadow-sm sm:h-3 sm:w-3"
                    aria-hidden
                  />
                  <span className="text-[15px] font-medium leading-relaxed text-slate-700 sm:text-base md:text-lg">{item}</span>
                </motion.div>
              </motion.li>
            ))}
          </motion.ul>

          <motion.p
            className="mt-10 sm:mt-12"
            style={INDUSTRIES_BUTTON_TOP_STYLE}
            initial={{ opacity: 0 }}
            animate={industriesInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Link
              href={prefixPath(locale, "/industries")}
              className="group inline-flex items-center gap-2 rounded-xl border-2 border-[#6B9FF7] bg-white text-sm font-medium text-[#6B9FF7] transition-all hover:bg-[#6B9FF7] hover:text-white hover:shadow-lg hover:shadow-[#6B9FF7]/25"
              style={BUTTON_PADDING_STYLE}
            >
              ดูอุตสาหกรรมทั้งหมด
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
            </Link>
          </motion.p>
        </Container>
      </section>
    </div>
  );
}
