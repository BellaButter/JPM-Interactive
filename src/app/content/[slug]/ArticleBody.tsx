"use client";

import { useMemo } from "react";

const SECTION_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
  </svg>
);

const SUBSECTION_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export interface TocItem {
  id: string;
  text: string;
  level: "h2" | "h3";
}

/** Parse HTML with regex (SSR-safe) and render with icons */
export function useArticleContent(html: string): { toc: TocItem[]; body: React.ReactNode } {
  return useMemo(() => {
    const toc: TocItem[] = [];
    const nodes: React.ReactNode[] = [];
    let idCounter = 0;

    const addId = () => {
      idCounter++;
      return `section-${idCounter}`;
    };

    const regex = /<(h2|h3|p|ul|ol)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/gi;
    let match;

    while ((match = regex.exec(html)) !== null) {
      const tag = match[1].toLowerCase();
      const content = match[2];

      if (tag === "h2") {
        const text = content.replace(/<[^>]+>/g, "").trim();
        const id = addId();
        toc.push({ id, text, level: "h2" });
        nodes.push(
          <h2 key={id} id={id} className="flex items-center gap-3 mt-12 mb-6 first:mt-0 scroll-mt-28 text-2xl font-bold text-slate-800">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#6B9FF7]/15 text-[#6B9FF7] shrink-0">
              {SECTION_ICON}
            </span>
            <span dangerouslySetInnerHTML={{ __html: content }} />
          </h2>
        );
      } else if (tag === "h3") {
        const text = content.replace(/<[^>]+>/g, "").trim();
        const id = addId();
        toc.push({ id, text, level: "h3" });
        nodes.push(
          <h3 key={id} id={id} className="flex items-center gap-2 mt-8 mb-4 scroll-mt-28 text-xl font-semibold text-slate-800">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#8B5CF6]/15 text-[#8B5CF6] shrink-0">
              {SUBSECTION_ICON}
            </span>
            <span dangerouslySetInnerHTML={{ __html: content }} />
          </h3>
        );
      } else if (tag === "p") {
        nodes.push(
          <p
            key={nodes.length}
            className="text-slate-700 leading-[1.85] mb-6 text-base md:text-lg [&_strong]:font-semibold [&_strong]:text-slate-900"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        );
      } else if (tag === "ul") {
        const liRegex = /<li>([\s\S]*?)<\/li>/gi;
        const items: React.ReactNode[] = [];
        let liMatch;
        while ((liMatch = liRegex.exec(content)) !== null) {
          items.push(
            <li key={items.length} className="flex gap-3 mb-3">
              <span className="flex items-start pt-1.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#6B9FF7] mt-2" />
              </span>
              <span
                className="flex-1 text-slate-700 leading-[1.8] text-base md:text-lg [&_strong]:font-semibold [&_strong]:text-slate-900"
                dangerouslySetInnerHTML={{ __html: liMatch[1] }}
              />
            </li>
          );
        }
        nodes.push(<ul key={nodes.length} className="mb-6 pl-0 list-none space-y-2">{items}</ul>);
      } else if (tag === "ol") {
        const liRegex = /<li>([\s\S]*?)<\/li>/gi;
        const items: React.ReactNode[] = [];
        let i = 0;
        let liMatch;
        while ((liMatch = liRegex.exec(content)) !== null) {
          i++;
          items.push(
            <li key={items.length} className="flex gap-3 mb-3">
              <span className="flex items-center justify-center w-6 h-6 shrink-0 rounded-full bg-[#6B9FF7]/20 text-[#6B9FF7] text-sm font-semibold">
                {i}
              </span>
              <span
                className="flex-1 text-slate-700 leading-[1.8] text-base md:text-lg [&_strong]:font-semibold [&_strong]:text-slate-900"
                dangerouslySetInnerHTML={{ __html: liMatch[1] }}
              />
            </li>
          );
        }
        nodes.push(<ol key={nodes.length} className="mb-6 pl-0 list-none space-y-2">{items}</ol>);
      }
    }

    return { toc, body: <>{nodes}</> };
  }, [html]);
}
