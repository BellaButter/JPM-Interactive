import type { Locale } from "@/types/locale";

export const locales: Locale[] = ["en", "th"];
export const defaultLocale: Locale = "en";

/** Paths without locale prefix used in the app */
export const pathnames = {
  home: "/",
  about: "/about",
  services: {
    interactive: "/services/interactive-installation",
    visual: "/services/immersive-experience",
    multimedia: "/services/multimedia-systems",
  },
  caseStudies: "/case-studies",
  caseStudyDetail: (slug: string) => `/case-studies/${slug}`,
  contact: "/contact",
  content: "/content",
  contentDetail: (slug: string) => `/content/${slug}`,
} as const;

/** SEO: page titles and descriptions per locale */
export const seo: Record<
  Locale,
  {
    siteName: string;
    defaultTitle: string;
    defaultDescription: string;
    home: { title: string; description: string };
    about: { title: string; description: string };
    services: {
      interactive: { title: string; description: string };
      visual: { title: string; description: string };
      multimedia: { title: string; description: string };
    };
    caseStudies: { title: string; description: string };
    contact: { title: string; description: string };
  }
> = {
  en: {
    siteName: "JPM Interactive",
    defaultTitle: "JPM Interactive - Creative Technology Studio",
    defaultDescription:
      "High-end interactive programs, mini games, graphic design, and motion graphics for innovative brands.",
    home: {
      title: "JPM Interactive - Creative Technology Studio",
      description:
        "High-end interactive programs, mini games, graphic design, and motion graphics for innovative brands.",
    },
    about: {
      title: "About JPM Interactive | Creative Technology Company Thailand",
      description:
        "JPM Interactive is a Creative Technology company in Thailand, specializing in Interactive Installation and Immersive Experience for organizations and professional exhibitions.",
    },
    services: {
      interactive: {
        title: "Interactive Installation Services | Thai Creative Technology Agency | JPM Interactive",
        description:
          "Custom Interactive Installation for corporations, exhibitions, and showrooms. Complete end-to-end development of Interactive Walls, Floors, and Motion Systems.",
      },
      visual: {
        title: "Immersive Experience & Installation Services | JPM Interactive",
        description:
          "Bespoke Immersive Experience and Installation solutions for organizations, exhibitions, and experience centers. Projection Mapping and interactive systems.",
      },
      multimedia: {
        title: "Multimedia Systems & Creative Tech Solutions | JPM Interactive",
        description:
          "Professional Multimedia Systems and Creative Technology for organizations. Developing 3D visuals, motion graphics, and integrated control systems.",
      },
    },
    caseStudies: {
      title: "Case Studies - JPM Interactive",
      description: "Featured innovations and interactive projects by JPM Interactive.",
    },
    contact: {
      title: "Contact - JPM Interactive",
      description: "Get in touch with JPM Interactive. Let's discuss your next project.",
    },
  },
  th: {
    siteName: "JPM Interactive",
    defaultTitle: "JPM Interactive - สตูดิโอครีเอทีฟเทคโนโลยี",
    defaultDescription:
      "โปรแกรมอินเทอร์แอคทีฟ มินิเกม กราฟิกดีไซน์ และโมชันกราฟิกสำหรับแบรนด์นวัตกรรม",
    home: {
      title: "JPM Interactive - สตูดิโอครีเอทีฟเทคโนโลยี",
      description:
        "โปรแกรมอินเทอร์แอคทีฟ มินิเกม กราฟิกดีไซน์ และโมชันกราฟิกสำหรับแบรนด์นวัตกรรม",
    },
    about: {
      title: "เกี่ยวกับ JPM Interactive | บริษัท Creative Technology ไทย",
      description:
        "JPM Interactive บริษัท Creative Technology ในประเทศไทย ผู้เชี่ยวชาญด้าน Interactive Installation และ Immersive Experience สำหรับองค์กรและงาน Exhibition ระดับมืออาชีพ",
    },
    services: {
      interactive: {
        title: "รับทำ Interactive Installation | บริษัท Creative Technology ไทย | JPM Interactive",
        description:
          "รับทำ Interactive Installation สำหรับองค์กร งาน Exhibition และ Showroom พัฒนา Interactive Wall, Floor และ Motion Sensor Systems แบบครบวงจร โดยทีม Creative Technology ในประเทศไทย",
      },
      visual: {
        title: "รับทำ Immersive Experience | Immersive Installation สำหรับองค์กร | JPM Interactive",
        description:
          "รับทำ Immersive Experience และ Immersive Installation สำหรับองค์กร งาน Exhibition และ Experience Center พัฒนา Projection Mapping และ Interactive Immersive Systems โดยทีม Creative Technology ในประเทศไทย",
      },
      multimedia: {
        title: "รับทำ Multimedia Systems | Creative Technology สำหรับองค์กร | JPM Interactive",
        description:
          "รับทำ Multimedia Systems และ Creative Technology สำหรับองค์กร งาน Exhibition และ Showroom พัฒนา 3D Visual, Motion Graphics และระบบควบคุม Multimedia แบบครบวงจร",
      },
    },
    caseStudies: {
      title: "ผลงาน - JPM Interactive",
      description: "ผลงานนวัตกรรมและโปรเจกต์เชิงโต้ตอบโดย JPM Interactive",
    },
    contact: {
      title: "ติดต่อเรา - JPM Interactive",
      description: "ติดต่อ JPM Interactive มาร่วมกันคุยโปรเจกต์ถัดไปของคุณ",
    },
  },
};

export function getLocaleFromPathname(pathname: string): Locale | null {
  const segment = pathname.split("/")[1];
  if (segment === "en" || segment === "th") return segment;
  return null;
}

export function prefixPath(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path.replace(/^\/+/, "");
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}
