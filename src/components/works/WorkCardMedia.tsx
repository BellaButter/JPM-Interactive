"use client";

import { memo } from "react";
import Image from "next/image";
import type { Work } from "@/data/worksPageData";

const categoryLabels: Record<Work["category"], string> = {
    led: "Visual Experience",
    touch_screen: "Interactive Solutions",
    graphic_design: "Multimedia Design",
};

/** path จาก public → URL สำหรับ img (encode ช่องว่าง) */
function coverSrc(coverPath: string): string {
    return "/" + coverPath.replace(/ /g, "%20");
}

/** หน้า Works: แสดง Cover จาก JPMGROUP_s WORKS/Cover ตามหัวข้อ ไม่โหลดวิดีโอ (ดูเต็มในหน้า detail) */
function WorkCardMedia({ work }: { work: Work }) {
    const hasCover = Boolean(work.cover);

    return (
        <div className="relative aspect-[4/3] bg-gradient-to-br from-[#f8f9ff] to-[#f3f4ff] overflow-hidden">
            <div className="absolute top-4 left-4 z-10">
                <span
                    className="inline-block bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full text-xs font-medium text-gray-600 group-hover:text-[#6B9FF7] group-hover:border-[#6B9FF7]/50 transition-all duration-300"
                    style={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
                >
                    {categoryLabels[work.category]}
                </span>
            </div>

            {hasCover ? (
                <Image
                    src={coverSrc(work.cover!)}
                    alt={work.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    quality={85}
                    priority={false}
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                        {work.category === "touch_screen" && "🎮"}
                        {work.category === "led" && "🎬"}
                        {work.category === "graphic_design" && "🎨"}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/90 border-2 border-gray-200 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-[#6B9FF7] group-hover:bg-[#6B9FF7]/10 transition-all duration-300">
                            <svg className="w-8 h-8 text-[#6B9FF7] ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
    );
}

export default memo(WorkCardMedia);
