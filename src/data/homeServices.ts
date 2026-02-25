import type { Locale } from "@/types/locale";

const VISUAL_EXPERIENCE_IMAGE = "/Image/Visual%20Experience.png";
const INTERACTIVE_SOLUTIONS_IMAGE = "/Image/Interactive%20Solutions.png";
const MULTIMEDIA_DESIGN_IMAGE = "/Image/Multimedia%20Design.png";

export interface HomeService {
  key: string;
  id: string;
  title: string;
  description: string;
  gradient: string;
  color: string;
  href: string;
  image: string;
  imageAlt: string;
}

const servicesEn: HomeService[] = [
  {
    key: "led",
    id: "01",
    title: "Visual Experience",
    description:
      "Immersive room experiences powered by sensors and 3D content—wrap-around visuals, interactive environments, and spatial storytelling that fully engage your audience.",
    gradient: "linear-gradient(135deg, #38bdf8 0%, #06b6d4 50%, #3b82f6 100%)",
    color: "#38bdf8",
    href: "/case-studies?category=led",
    image: VISUAL_EXPERIENCE_IMAGE,
    imageAlt:
      "Visual Experience - immersive room, curved display, interactive visuals",
  },
  {
    key: "touch_screen",
    id: "02",
    title: "Interactive Solutions",
    description:
      "Engaging touch screen and sensor-based applications that tell stories, present product information, and captivate audiences through interactive gameplay.",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
    color: "#3b82f6",
    href: "/case-studies?category=touch_screen",
    image: INTERACTIVE_SOLUTIONS_IMAGE,
    imageAlt:
      "Interactive Solutions - touch screen and sensor-based applications",
  },
  {
    key: "graphic_design",
    id: "03",
    title: "Multimedia Design",
    description:
      "Comprehensive creative production including 3D assets, mood & tone direction, sound design, and cinematic motion graphics for opening sequences.",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
    color: "#0ea5e9",
    href: "/case-studies?category=graphic_design",
    image: MULTIMEDIA_DESIGN_IMAGE,
    imageAlt: "Multimedia Design - 3D assets, sound design, and motion graphics",
  },
];

const servicesTh: HomeService[] = [
  {
    key: "interactive_installation",
    id: "01",
    title: "Interactive Installation",
    description:
      "รับทำ Interactive Wall, Interactive Floor และระบบที่ตอบสนองต่อการเคลื่อนไหวหรือการสัมผัสแบบ Real-time เหมาะสำหรับ Exhibition, Showroom, Event Activation และ Corporate Space",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
    color: "#3b82f6",
    href: "/case-studies?category=touch_screen",
    image: INTERACTIVE_SOLUTIONS_IMAGE,
    imageAlt: "Interactive Installation - touch and sensor-based systems",
  },
  {
    key: "immersive_experience",
    id: "02",
    title: "Immersive Experience",
    description:
      "ออกแบบห้อง Immersive Projection และ Wrap-around Visual ที่โอบล้อมผู้ใช้งานด้วยภาพ เสียง และการตอบสนองแบบ Dynamic สร้างประสบการณ์ที่แตกต่างจากจอแสดงผลทั่วไป",
    gradient: "linear-gradient(135deg, #38bdf8 0%, #06b6d4 50%, #3b82f6 100%)",
    color: "#38bdf8",
    href: "/case-studies?category=led",
    image: VISUAL_EXPERIENCE_IMAGE,
    imageAlt: "Immersive Experience - projection and wrap-around visuals",
  },
  {
    key: "multimedia_systems",
    id: "03",
    title: "Multimedia & Creative Technology",
    description:
      "พัฒนา 3D Visual, Motion Graphics และ Multimedia Systems แบบครบวงจร รองรับงานองค์กร งานเปิดตัวสินค้า และพื้นที่แสดงเทคโนโลยี",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
    color: "#0ea5e9",
    href: "/case-studies?category=graphic_design",
    image: MULTIMEDIA_DESIGN_IMAGE,
    imageAlt: "Multimedia & Creative Technology - 3D and motion graphics",
  },
];

export function getHomeServices(locale: Locale): HomeService[] {
  return locale === "th" ? servicesTh : servicesEn;
}
