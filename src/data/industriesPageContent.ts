import type { Locale } from "@/types/locale";

export interface IndustrySection {
  id: string;
  title: string;
  description: string;
  solutions: string[];
  gradient: string;
  icon: string;
}

export interface IndustriesPageContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    h1: string;
    intro: string[];
  };
  sections: IndustrySection[];
  closing: {
    title: string;
    paragraphs: string[];
  };
  cta: {
    title: string;
    description: string;
    button: string;
  };
}

export const industriesContent: Record<Locale, IndustriesPageContent> = {
  th: {
    meta: {
      title: "กลุ่มอุตสาหกรรมที่ให้บริการ | Interactive & Immersive | JPM Interactive",
      description:
        "JPM Interactive ให้บริการ Interactive Installation และ Immersive Experience แก่องค์กร บริษัทเอกชน หน่วยงานรัฐ Exhibition และ Experience Center ทั่วประเทศไทย",
    },
    hero: {
      badge: "กลุ่มอุตสาหกรรมที่เราให้บริการ",
      h1: "กลุ่มอุตสาหกรรมที่ JPM Interactive ให้บริการ",
      intro: [
        "JPM Interactive ให้บริการด้าน Interactive Installation, Immersive Experience และ Multimedia Systems แก่องค์กรและธุรกิจหลากหลายประเภท",
        "เราทำงานร่วมกับองค์กรที่ต้องการยกระดับการสื่อสาร สร้างประสบการณ์ที่แตกต่าง และนำเทคโนโลยีมาประยุกต์ใช้เพื่อเสริมภาพลักษณ์ของแบรนด์",
        "ด้วยความเข้าใจทั้งด้าน Creative และ System Engineering เราสามารถออกแบบโซลูชันให้เหมาะสมกับลักษณะธุรกิจและวัตถุประสงค์เฉพาะของแต่ละอุตสาหกรรม",
      ],
    },
    sections: [
      {
        id: "corporate",
        title: "Corporate & Enterprise",
        description:
          "เราให้บริการแก่บริษัทเอกชนขนาดใหญ่ที่ต้องการพัฒนา Experience Center, Showroom หรือพื้นที่นำเสนอองค์กร",
        solutions: [
          "Events & Experiential Marketing",
          "Museums & Cultural Institutions",
          "Corporate Experience & Showrooms",
          "Retail & Brand Spaces",
          "Media & Large-Scale Digital Displays",
        ],
        gradient: "from-blue-500 to-violet-600",
        icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
      },
      {
        id: "government",
        title: "Government & Public Sector",
        description:
          "หน่วยงานภาครัฐและองค์กรสาธารณะต้องการระบบที่มีความเสถียรและสามารถใช้งานระยะยาว เราพัฒนาโซลูชันโดยคำนึงถึงมาตรฐานความปลอดภัยและความทนทานของระบบ",
        solutions: [
          "Immersive Learning Space",
          "Interactive Information Display",
          "Multimedia System สำหรับนิทรรศการถาวร",
        ],
        gradient: "from-violet-500 to-purple-600",
        icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      },
      {
        id: "exhibition",
        title: "Exhibition & Trade Show",
        description:
          "งานแสดงสินค้าและนิทรรศการต้องการความโดดเด่นและสร้าง Engagement สูงสุด เพื่อดึงดูดความสนใจและเพิ่มการจดจำแบรนด์",
        solutions: [
          "Interactive Booth Experience",
          "Motion-based Installation",
          "Immersive Presentation สำหรับงานเปิดตัวสินค้า",
        ],
        gradient: "from-cyan-500 to-blue-600",
        icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
      },
      {
        id: "brand",
        title: "Brand & Retail Experience",
        description:
          "แบรนด์ที่ต้องการสร้าง Experience Center หรือพื้นที่แสดงสินค้าแบบใหม่ สามารถใช้เทคโนโลยี Interactive และ Immersive เพื่อยกระดับประสบการณ์ลูกค้า",
        solutions: [
          "Interactive Product Display",
          "Digital Storytelling Space",
          "Real-time Content Integration",
        ],
        gradient: "from-fuchsia-500 to-pink-600",
        icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
      },
      {
        id: "museum",
        title: "Museum & Learning Space",
        description:
          "พิพิธภัณฑ์และพื้นที่การเรียนรู้ต้องการระบบที่ช่วยให้ข้อมูลซับซ้อนเข้าใจง่าย และสร้างการมีส่วนร่วม เพื่อให้การเรียนรู้มีความน่าสนใจและทันสมัย",
        solutions: [
          "Immersive Projection Environment",
          "Interactive Learning Installation",
          "Multimedia Exhibit System",
        ],
        gradient: "from-amber-500 to-orange-600",
        icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      },
    ],
    closing: {
      title: "ความเข้าใจในแต่ละอุตสาหกรรมคือหัวใจของเรา",
      paragraphs: [
        "ทุกอุตสาหกรรมมีลักษณะและข้อจำกัดที่แตกต่างกัน",
        "JPM Interactive ให้ความสำคัญกับการวิเคราะห์ความต้องการเฉพาะทาง ก่อนออกแบบโซลูชันที่เหมาะสม",
        "เราไม่เพียงพัฒนาเทคโนโลยี แต่พัฒนา \"ประสบการณ์\" ที่ตอบโจทย์บริบทของแต่ละธุรกิจ",
      ],
    },
    cta: {
      title: "ต้องการโซลูชัน Interactive หรือ Immersive สำหรับธุรกิจของคุณ?",
      description: "ติดต่อทีม JPM Interactive เพื่อปรึกษาแนวทางที่เหมาะสมกับอุตสาหกรรมและเป้าหมายของคุณ",
      button: "ปรึกษาฟรี",
    },
  },
  en: {
    meta: {
      title: "Industries We Serve | Interactive & Immersive | JPM Interactive",
      description:
        "JPM Interactive provides Interactive Installation and Immersive Experience services to corporations, government agencies, exhibitions, and experience centers across Thailand.",
    },
    hero: {
      badge: "Industries We Serve",
      h1: "Industries JPM Interactive Serves",
      intro: [
        "JPM Interactive provides Interactive Installation, Immersive Experience, and Multimedia Systems to organizations and businesses across diverse sectors.",
        "We work with organizations that want to elevate their communication, create distinctive experiences, and apply technology to strengthen their brand image.",
        "With expertise in both Creative and System Engineering, we design solutions tailored to each industry's unique characteristics and objectives.",
      ],
    },
    sections: [
      {
        id: "corporate",
        title: "Corporate & Enterprise",
        description:
          "We serve large private companies that want to develop Experience Centers, Showrooms, or corporate presentation spaces.",
        solutions: [
          "Events & Experiential Marketing",
          "Museums & Cultural Institutions",
          "Corporate Experience & Showrooms",
          "Retail & Brand Spaces",
          "Media & Large-Scale Digital Displays",
        ],
        gradient: "from-blue-500 to-violet-600",
        icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
      },
      {
        id: "government",
        title: "Government & Public Sector",
        description:
          "Government agencies and public organizations need stable, long-term systems. We develop solutions with security standards and system durability in mind.",
        solutions: [
          "Immersive Learning Space",
          "Interactive Information Display",
          "Multimedia System for Permanent Exhibitions",
        ],
        gradient: "from-violet-500 to-purple-600",
        icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      },
      {
        id: "exhibition",
        title: "Exhibition & Trade Show",
        description:
          "Trade shows and exhibitions demand standout experiences and maximum engagement to capture attention and boost brand recall.",
        solutions: [
          "Interactive Booth Experience",
          "Motion-based Installation",
          "Immersive Presentation for Product Launches",
        ],
        gradient: "from-cyan-500 to-blue-600",
        icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
      },
      {
        id: "brand",
        title: "Brand & Retail Experience",
        description:
          "Brands that want to create Experience Centers or new product display spaces can use Interactive and Immersive technology to elevate customer experience.",
        solutions: [
          "Interactive Product Display",
          "Digital Storytelling Space",
          "Real-time Content Integration",
        ],
        gradient: "from-fuchsia-500 to-pink-600",
        icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
      },
      {
        id: "museum",
        title: "Museum & Learning Space",
        description:
          "Museums and learning spaces need systems that make complex information easy to understand and create engagement for modern, engaging learning.",
        solutions: [
          "Immersive Projection Environment",
          "Interactive Learning Installation",
          "Multimedia Exhibit System",
        ],
        gradient: "from-amber-500 to-orange-600",
        icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      },
    ],
    closing: {
      title: "Understanding Each Industry Is at Our Core",
      paragraphs: [
        "Every industry has unique characteristics and constraints.",
        "JPM Interactive prioritizes analyzing specific needs before designing tailored solutions.",
        "We don't just develop technology—we develop \"experiences\" that meet the context of each business.",
      ],
    },
    cta: {
      title: "Need Interactive or Immersive Solutions for Your Business?",
      description: "Contact the JPM Interactive team to discuss solutions that fit your industry and goals.",
      button: "Get Free Consultation",
    },
  },
};
