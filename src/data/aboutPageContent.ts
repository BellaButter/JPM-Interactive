import type { Locale } from "@/types/locale";

export interface AboutContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    h1: string;
    intro: Array<{ text: string; highlight?: string[] }>;
  };
  vision: {
    heading: string;
    paragraphs: string[];
  };
  mission: {
    heading: string;
    items: string[];
  };
  expertise: {
    heading: string;
    intro: string;
    items: string[];
    closing: string;
  };
  approach: {
    heading: string;
    intro: string;
    items: string[];
    closing: string;
  };
  clients: {
    heading: string;
    intro: string;
    items: string[];
  };
  difference: {
    heading: string;
    paragraphs: string[];
  };
  cta: {
    heading: string;
    description: string;
  };
}

export const aboutContent: Record<Locale, AboutContent> = {
  th: {
    meta: {
      title: "เกี่ยวกับ JPM Interactive | บริษัท Creative Technology ไทย",
      description:
        "JPM Interactive บริษัท Creative Technology ในประเทศไทย ผู้เชี่ยวชาญด้าน Interactive Installation และ Immersive Experience สำหรับองค์กรและงาน Exhibition ระดับมืออาชีพ",
    },
    hero: {
      h1: "บริษัท Creative Technology ผู้เชี่ยวชาญด้าน Interactive และ Immersive Experience",
      intro: [
        {
          text: "JPM Interactive คือบริษัท Creative Technology ในประเทศไทย ผู้เชี่ยวชาญด้านการออกแบบและพัฒนา Interactive Installation, Immersive Experience และ Multimedia Systems สำหรับองค์กรและแบรนด์ระดับมืออาชีพ เราทำงานครอบคลุมตั้งแต่พื้นที่ Exhibition, Corporate Showroom, Event Activation, Brand Experience Center ไปจนถึงพื้นที่ต้อนรับ (Lobby) และพื้นที่จัดแสดงถาวร",
          highlight: ["Interactive Installation", "Immersive Experience", "Multimedia Systems"],
        },
        {
          text: "เราก่อตั้งขึ้นด้วยแนวคิดว่า เทคโนโลยีไม่ควรเป็นเพียงเครื่องมือแสดงผล แต่ควรเป็นสื่อกลางที่สร้าง \"ประสบการณ์\" ระหว่างผู้คนกับแบรนด์ เราเชื่อว่าการสื่อสารองค์กรในยุคสมัยใหม่จะต้องเน้นการมีส่วนร่วม (Engagement) และการสร้างความประทับใจที่ยั่งยืน มากกว่าการนำเสนอข้อมูลแบบทางเดียว",
          highlight: ["ประสบการณ์", "Engagement"],
        },
        {
          text: "ด้วยการผสานความคิดสร้างสรรค์ (Creative Design) เข้ากับความเชี่ยวชาญด้านวิศวกรรมระบบ (System Engineering) เราพัฒนาโซลูชันที่ทั้งสวยงาม เสถียร และใช้งานได้จริงในระดับองค์กร ทุกโปรเจกต์ของเราผ่านกระบวนการออกแบบและทดสอบอย่างละเอียด เพื่อให้มั่นใจว่าสามารถรองรับการใช้งานต่อเนื่องในสภาพแวดล้อมจริง",
          highlight: ["Creative Design", "System Engineering"],
        },
      ],
    },
    vision: {
      heading: "วิสัยทัศน์ของเรา",
      paragraphs: [
        "เรามุ่งมั่นเป็นผู้นำด้าน Interactive และ Immersive Technology ในประเทศไทย โดยพัฒนาโซลูชันที่ช่วยให้องค์กรสื่อสารได้อย่างมีพลัง และสร้างความประทับใจที่ยั่งยืน",
        "เราเชื่อว่าอนาคตของการสื่อสารองค์กรจะไม่ใช่เพียงการนำเสนอข้อมูล แต่คือการสร้างประสบการณ์ที่ผู้คนสามารถมีส่วนร่วมได้จริง",
        "เราพร้อมเป็นพันธมิตรที่ช่วยให้แบรนด์และองค์กรของคุณก้าวไปสู่ยุคแห่งประสบการณ์ดิจิทัลอย่างมั่นคง",
      ],
    },
    mission: {
      heading: "พันธกิจของเรา",
      items: [
        "พัฒนา Interactive และ Immersive Solutions ที่มีคุณภาพระดับมืออาชีพ",
        "ผสานงานออกแบบและเทคโนโลยีให้ทำงานร่วมกันอย่างสมบูรณ์",
        "ออกแบบระบบที่มีความเสถียรและรองรับการใช้งานจริง",
        "สร้างมาตรฐานใหม่ของ Creative Technology ในประเทศไทย",
      ],
    },
    expertise: {
      heading: "ความเชี่ยวชาญของเรา",
      intro:
        "ทีมงานของเราประกอบด้วย Designer, Developer และ System Integrator ที่ทำงานร่วมกันอย่างใกล้ชิด เราเชี่ยวชาญในด้าน:",
      items: [
        "Interactive Installation Systems",
        "Immersive Projection & Spatial Experience",
        "Real-time Graphics Development",
        "Multimedia System Integration",
        "Motion Sensor & Gesture Recognition",
      ],
      closing:
        "ความแข็งแกร่งของเราคือการเข้าใจทั้ง \"ภาพลักษณ์\" และ \"โครงสร้างระบบ\" ไปพร้อมกัน",
    },
    approach: {
      heading: "แนวทางการทำงานของเรา",
      intro:
        "เราให้ความสำคัญกับกระบวนการทำงานที่เป็นระบบ เพื่อให้ทุกโปรเจกต์มีคุณภาพและความเสถียร",
      items: [
        "วิเคราะห์เป้าหมายทางธุรกิจของลูกค้า",
        "ออกแบบประสบการณ์และแนวคิดเชิงสร้างสรรค์",
        "พัฒนาและทดสอบระบบอย่างละเอียด",
        "ติดตั้งและสนับสนุนหลังการใช้งาน",
      ],
      closing: "ทุกขั้นตอนดำเนินการด้วยมาตรฐานระดับองค์กร",
    },
    clients: {
      heading: "เราทำงานกับใคร",
      intro: "JPM Interactive ให้บริการแก่:",
      items: [
        "บริษัทเอกชนขนาดใหญ่",
        "หน่วยงานรัฐและองค์กร",
        "ธุรกิจเทคโนโลยี",
        "แบรนด์ที่ต้องการ Experience Center",
        "งาน Exhibition และ Event ระดับมืออาชีพ",
      ],
    },
    difference: {
      heading: "ความแตกต่างของเรา",
      paragraphs: [
        "ในขณะที่หลายบริษัทเน้นเพียงงานออกแบบหรือการติดตั้งอุปกรณ์ JPM Interactive มุ่งเน้นการพัฒนา \"ระบบประสบการณ์\" ที่ครบวงจร",
        "เราผสาน Creative Thinking, Technology และ Engineering เข้าด้วยกัน เพื่อให้ได้ผลลัพธ์ที่ทั้งโดดเด่นและใช้งานได้จริง",
      ],
    },
    cta: {
      heading: "ต้องการพัฒนาโครงการ Interactive หรือ Immersive สำหรับองค์กรของคุณ?",
      description:
        "ติดต่อทีม JPM Interactive เพื่อเริ่มต้นวางแผนและออกแบบโซลูชันที่เหมาะสมกับเป้าหมายของคุณ",
    },
  },
  en: {
    meta: {
      title: "About JPM Interactive | Creative Technology Company Thailand",
      description:
        "JPM Interactive is a Creative Technology company in Thailand, specializing in Interactive Installation and Immersive Experience for organizations and professional exhibitions.",
    },
    hero: {
      h1: "Creative Technology Company Specializing in Interactive and Immersive Experience",
      intro: [
        {
          text: "JPM Interactive is a Creative Technology company in Thailand, specializing in the design and development of Interactive Installation, Immersive Experience, and Multimedia Systems for professional organizations and brands. Our work spans across Exhibition spaces, Corporate Showrooms, Event Activation, Brand Experience Centers, reception areas (Lobbies), and permanent exhibition installations.",
          highlight: ["Interactive Installation", "Immersive Experience", "Multimedia Systems"],
        },
        {
          text: "We were founded on the belief that technology should not merely be a display tool, but a medium that creates \"experiences\" between people and brands. We believe that modern corporate communication must prioritize engagement and lasting impressions over one-way information presentation.",
          highlight: ["experiences", "engagement"],
        },
        {
          text: "By combining creative design with system engineering expertise, we develop solutions that are both beautiful, stable, and enterprise-ready. Every project undergoes a thorough design and testing process to ensure it can support continuous operation in real-world environments.",
          highlight: ["creative design", "system engineering"],
        },
      ],
    },
    vision: {
      heading: "Our Vision",
      paragraphs: [
        "We aim to be the leader in Interactive and Immersive Technology in Thailand, developing solutions that help organizations communicate powerfully and create lasting impressions.",
        "We believe the future of corporate communication will not be about presenting information alone, but about creating experiences that people can truly participate in.",
        "We are ready to be your partner in helping your brand and organization step confidently into the era of digital experiences.",
      ],
    },
    mission: {
      heading: "Our Mission",
      items: [
        "Develop professional-grade Interactive and Immersive Solutions",
        "Integrate design and technology to work seamlessly together",
        "Design systems that are stable and production-ready",
        "Set new standards for Creative Technology in Thailand",
      ],
    },
    expertise: {
      heading: "Our Expertise",
      intro:
        "Our team consists of Designers, Developers, and System Integrators working closely together. We specialize in:",
      items: [
        "Interactive Installation Systems",
        "Immersive Projection & Spatial Experience",
        "Real-time Graphics Development",
        "Multimedia System Integration",
        "Motion Sensor & Gesture Recognition",
      ],
      closing:
        "Our strength lies in understanding both \"brand image\" and \"system architecture\" in parallel.",
    },
    approach: {
      heading: "Our Approach",
      intro:
        "We prioritize a systematic workflow to ensure every project meets quality and stability standards.",
      items: [
        "Analyze client business objectives",
        "Design experience and creative concepts",
        "Develop and thoroughly test systems",
        "Install and provide post-deployment support",
      ],
      closing: "Every step is executed with enterprise-grade standards.",
    },
    clients: {
      heading: "Who We Work With",
      intro: "JPM Interactive serves:",
      items: [
        "Large private corporations",
        "Government agencies and organizations",
        "Technology-focused businesses",
        "Brands seeking Experience Centers",
        "Professional exhibitions and events",
      ],
    },
    difference: {
      heading: "What Sets Us Apart",
      paragraphs: [
        "While many companies focus only on design or equipment installation, JPM Interactive focuses on developing complete \"experience systems.\"",
        "We combine Creative Thinking, Technology, and Engineering to deliver results that are both distinctive and practical.",
      ],
    },
    cta: {
      heading: "Want to develop an Interactive or Immersive project for your organization?",
      description:
        "Contact the JPM Interactive team to start planning and designing solutions that align with your goals.",
    },
  },
};
