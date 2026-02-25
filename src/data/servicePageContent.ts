import type { Locale } from "@/types/locale";

export interface ServiceSection {
  heading: string;
  body: string;
}

export interface SolutionItem {
  title: string;
  description: string;
  isCustom?: boolean;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  title: string;
  description: string;
  h1: string;
  intro: {
    heading: string;
    body: string;
    highlights: string[];
  };
  details: {
    heading: string;
    description: string;
    applications: string[];
  };
  solutions: {
    heading: string;
    items: SolutionItem[];
  };
  benefits: {
    heading: string;
    items: string[];
    summary: string;
  };
  process: {
    heading: string;
    steps: ProcessStep[];
  };
  suitableFor: {
    heading: string;
    items: string[];
  };
  faq: {
    heading: string;
    items: FaqItem[];
  };
  cta: {
    heading: string;
    description: string;
  };
}

export const serviceContent: Record<
  Locale,
  Record<"interactive" | "visual" | "multimedia", ServiceDetail>
> = {
  en: {
    interactive: {
      title: "Interactive Installation",
      description: "Custom interactive solutions for exhibitions and corporate environments.",
      h1: "Interactive Installation for Organizations and Exhibitions",
      intro: {
        heading: "Next-Generation Interactive Solutions",
        body: "JPM Interactive provides end-to-end design and development of Interactive Installations for corporations, brands, and professional exhibition spaces.",
        highlights: [
          "We specialize in creating systems that respond to movement, touch, and user engagement in real-time.",
          "Integrating Motion Sensors, Touch Systems, Real-time Graphics, and 3D Visual Content.",
          "Interactive Installation is not just a display; it is an \"Experience System\" that invites audiences to truly engage with the content."
        ]
      },
      details: {
        heading: "What is Interactive Installation?",
        description: "An Interactive Installation is a digital media system that users can interact with through touch, movement, or various sensors. Unlike passive displays, these installations allow users to become part of the content, driving higher engagement and effectively building brand recall.",
        applications: [
          "Exhibition Spaces",
          "Corporate Showrooms",
          "Event Activations",
          "Brand Experience Centers",
          "Reception Areas (Lobbies)"
        ]
      },
      solutions: {
        heading: "Types of Interactive Installations We Develop",
        items: [
          {
            title: "Interactive Wall",
            description: "Touch or movement-responsive display walls. Ideal for product showcases, company history, or dynamic storytelling."
          },
          {
            title: "Interactive Floor",
            description: "Floor systems that respond to steps or movement. Perfect for events and spaces needing fun, attention-grabbing experiences."
          },
          {
            title: "Gesture & Motion Recognition System",
            description: "Contactless interaction systems using gesture detection to create a cutting-edge, limitless user experience."
          },
          {
            title: "Custom Interactive System",
            description: "Bespoke systems developed based on unique brand concepts, integrating specialized hardware and software.",
            isCustom: true
          }
        ]
      },
      benefits: {
        heading: "Benefits for Your Organization",
        items: [
          "Increase Audience Engagement",
          "Stand out from competitors",
          "Enhance modern corporate image",
          "Communicate complex data simply",
          "Increase dwell time in exhibition areas"
        ],
        summary: "In an era where consumers are accustomed to digital media, creating experiences that truly respond is the key to effective brand communication."
      },
      process: {
        heading: "Our Development Process",
        steps: [
          {
            step: "1",
            title: "Strategy & Experience Planning",
            description: "Analyzing business goals, target audience, and installation space constraints."
          },
          {
            step: "2",
            title: "Concept & Interaction Design",
            description: "Designing the experience concept, interaction patterns, and content structure."
          },
          {
            step: "3",
            title: "System Development",
            description: "Developing software, real-time graphics, and hardware integration."
          },
          {
            step: "4",
            title: "Testing & Optimization",
            description: "Testing for performance, stability, and safety before deployment."
          },
          {
            step: "5",
            title: "Installation & Support",
            description: "On-site installation with ongoing consultation and after-sales support."
          }
        ]
      },
      suitableFor: {
        heading: "Ideal for These Industries",
        items: [
          "Large Corporations",
          "Government & Public Organizations",
          "Exhibition & Trade Show Organizers",
          "Brands for Event Activation",
          "Showrooms & Experience Centers"
        ]
      },
      faq: {
        heading: "Frequently Asked Questions",
        items: [
          {
            question: "Is Interactive Installation expensive?",
            answer: "The budget depends on space size, technology used, and system complexity. We can design solutions that fit your organization's budget goals."
          },
          {
            question: "Is the system stable enough for corporate use?",
            answer: "Yes, our systems are developed for continuous operation and undergo rigorous testing before actual installation."
          },
          {
            question: "Can it be customized for my brand?",
            answer: "Every project is bespoke and designed specifically to match your corporate identity and objectives."
          }
        ]
      },
      cta: {
        heading: "Want to develop an Interactive Installation for your organization?",
        description: "Contact JPM Interactive to discuss design and development solutions tailored to your space and goals."
      }
    },
    visual: {
      title: "Immersive Experience",
      description: "Transforming spaces into immersive environments using projection and real-time visuals.",
      h1: "Immersive Experience and Immersive Technology\nfor Organizations",
      intro: {
        heading: "Beyond Observation: True Immersion",
        body: "JPM Interactive provides comprehensive design and development of Immersive Experiences for corporations, brands, and professional exhibition spaces.",
        highlights: [
          "We design experiences that surround users with visuals, sound, and real-time interaction.",
          "Transforming ordinary spaces into \"Experiential Environments.\"",
          "Immersive Experience is not just large-scale projection; it is a system that makes users feel part of the narrative."
        ]
      },
      details: {
        heading: "What is Immersive Experience?",
        description: "An Immersive Experience uses technology to create an 'Immersive Environment' using projection mapping, wrap-around visuals, spatial sound, and interactive systems. Unlike passive displays, immersive technology allows users to 'step into the content'.",
        applications: [
          "Exhibitions and Trade Shows",
          "Corporate Experience Centers",
          "Brand Activation Events",
          "Museums and Learning Spaces",
          "Showrooms and Corporate Lobbies"
        ]
      },
      solutions: {
        heading: "Our Immersive Solutions",
        items: [
          {
            title: "Immersive Projection Room",
            description: "Wrap-around projection rooms that create an encompassing atmosphere with realistic motion visuals and sound."
          },
          {
            title: "Interactive Immersive Space",
            description: "Combining motion sensors or touch interaction with projection systems for real-time engagement."
          },
          {
            title: "360° Visual Environment",
            description: "Designing full 360-degree visual landscapes perfect for corporate storytelling or tech showcases."
          },
          {
            title: "Custom Immersive Installation",
            description: "Bespoke systems integrating lighting, spatial sound, and multimedia infrastructure based on brand concepts.",
            isCustom: true
          }
        ]
      },
      benefits: {
        heading: "Benefits for Your Organization",
        items: [
          "Create an unforgettable first impression",
          "Increase visitor dwell time",
          "Simplify complex data communication",
          "Enhance modern and cutting-edge brand image",
          "Boost engagement and brand recall"
        ],
        summary: "In an age where consumers crave experiences over observation, Immersive Technology is a vital tool for elevating brand communication."
      },
      process: {
        heading: "Design & Development Process",
        steps: [
          {
            step: "1",
            title: "Experience Strategy",
            description: "Defining goals, objectives, and analyzing user behavior patterns."
          },
          {
            step: "2",
            title: "Spatial & Visual Design",
            description: "Designing the physical space, visual patterns, audio landscapes, and storytelling flow."
          },
          {
            step: "3",
            title: "System Engineering",
            description: "Developing projection systems, real-time graphics, and hardware integration."
          },
          {
            step: "4",
            title: "Testing & Calibration",
            description: "Fine-tuning visuals, spatial audio, and interactive systems for perfection."
          },
          {
            step: "5",
            title: "Installation & Support",
            description: "On-site installation with full operational guidance and maintenance support."
          }
        ]
      },
      suitableFor: {
        heading: "Ideal for These Industries",
        items: [
          "Large Private Corporations",
          "Government Agencies & Organizations",
          "Technology-focused Brands",
          "Experience Centers & Museums",
          "Permanent Institutional Exhibits"
        ]
      },
      faq: {
        heading: "Frequently Asked Questions",
        items: [
          {
            question: "How does it differ from a large LED Wall?",
            answer: "An LED wall is just a large display. An Immersive Experience is a choreographed environment that fuses visuals, audio, and interaction together."
          },
          {
            question: "Can it be adapted for smaller spaces?",
            answer: "Yes, we can scale and adapt the system's design to suit your specific space and budget constraints."
          },
          {
            question: "How long does development take?",
            answer: "Timelines vary by project scale and complexity, generally ranging from 4 to 12 weeks."
          }
        ]
      },
      cta: {
        heading: "Ready to create an Immersive Experience for your organization?",
        description: "Partner with JPM Interactive to design tailor-made solutions aligned with your space and strategic business goals."
      }
    },
    multimedia: {
      title: "Multimedia Design",
      description: "Stable, high-performance multimedia systems for corporate and public spaces.",
      h1: "Multimedia Systems and Creative Technology\nSolutions for Organizations",
      intro: {
        heading: "Stable Systems, Creative Impact",
        body: "JPM Interactive provides end-to-end multimedia system design for organizations, exhibitions, and technological showcase areas.",
        highlights: [
          "Expertise in fusing 3D visuals, motion graphics, and real-time content.",
          "Integrating multimedia control systems with robust hardware and software infrastructure.",
          "Good multimedia is not just about beautiful visuals; it must be stable, reliable, and serve business objectives."
        ]
      },
      details: {
        heading: "What are Multimedia Systems?",
        description: "Multimedia Systems integrate images, audio, video, animation, and interactive technology to create a multi-dimensional communication experience. Unlike standard graphic files, these systems are designed for high-performance deployment.",
        applications: [
          "Real-time visual rendering",
          "Multi-device connectivity and synchronization",
          "Centralized system control (Control Systems)",
          "Continuous operation in high-traffic spaces"
        ]
      },
      solutions: {
        heading: "Our Multimedia Services",
        items: [
          {
            title: "3D Visual & Motion Graphics",
            description: "Bespoke 3D animations and visual narratives for corporate events, product launches, and exhibit spaces."
          },
          {
            title: "Real-time Graphic Systems",
            description: "Dynamic graphic systems that update data and visuals in real-time."
          },
          {
            title: "Integrated Multimedia Control",
            description: "Designing unified control systems that synchronize visuals, audio, and hardware devices seamlessly."
          },
          {
            title: "Custom Multimedia Solution",
            description: "Development of specialized systems tailored to unique corporate needs, integrating with various sensors and hardware.",
            isCustom: true
          }
        ]
      },
      benefits: {
        heading: "Benefits of Multimedia Systems for Your Organization",
        items: [
          "Co-developed by Creative and System Development teams",
          "Designed for enterprise-level operational environments",
          "Prioritizes system performance and stability",
          "Fully aligned with corporate branding identity"
        ],
        summary: "Multimedia Systems are the critical foundation that ensures Interactive and Immersive installations function flawlessly."
      },
      process: {
        heading: "Deployment Lifecycle",
        steps: [
          {
            step: "1",
            title: "Requirement Analysis",
            description: "Detailed analysis of objectives and physical space constraints."
          },
          {
            step: "2",
            title: "System Architecture Design",
            description: "Designing the underlying hardware and software infrastructure."
          },
          {
            step: "3",
            title: "Content Development",
            description: "Developing 3D visuals, motion graphics, and integrated multimedia assets."
          },
          {
            step: "4",
            title: "Integration & Testing",
            description: "System-wide integration and performance benchmarking."
          },
          {
            step: "5",
            title: "Deployment & Maintenance",
            description: "On-site deployment with technical guidance and ongoing system health checks."
          }
        ]
      },
      suitableFor: {
        heading: "Ideal for These Industries",
        items: [
          "Large Corporations",
          "Government & Public Sectors",
          "Large-scale Exhibitions and Events",
          "Corporate Showrooms",
          "Experience Centers"
        ]
      },
      faq: {
        heading: "Frequently Asked Questions",
        items: [
          {
            question: "How do Multimedia Systems differ from standard video?",
            answer: "A system is designed for multi-device interaction and localized deployment, rather than just being a standalone video file."
          },
          {
            question: "Can it be integrated with Interactive Installations?",
            answer: "Yes, our systems are designed to work harmoniously with both Interactive and Immersive solutions."
          },
          {
            question: "Is the system scalable for future updates?",
            answer: "We build systems with scalability in mind, allowing for future content upgrades and hardware expansion."
          }
        ]
      },
      cta: {
        heading: "Ready to develop a Multimedia System for your organization?",
        description: "Consult JPM Interactive to plan and design a multimedia system that delivers both visual impact and technical excellence."
      }
    }
  },
  th: {
    interactive: {
      title: "Interactive Installation",
      description: "รับทำ Interactive Installation สำหรับองค์กรและงาน Exhibition",
      h1: "รับทำ Interactive Installation\nสำหรับองค์กร งาน Exhibition และ Showroom",
      intro: {
        heading: "Interactive Installation ไม่ใช่เพียงจอแสดงผล",
        body: "JPM Interactive ให้บริการออกแบบและพัฒนา Interactive Installation แบบครบวงจร สำหรับองค์กร แบรนด์ และพื้นที่จัดแสดงระดับมืออาชีพ",
        highlights: [
          "เราเชี่ยวชาญในการสร้างระบบที่สามารถตอบสนองต่อการเคลื่อนไหว การสัมผัส และการมีส่วนร่วมของผู้ใช้งานแบบ Real-time",
          "ผสานเทคโนโลยี Motion Sensor, Touch System, Real-time Graphics และ 3D Visual Content",
          "คือ “ระบบประสบการณ์” ที่เปิดโอกาสให้ผู้ชมมีส่วนร่วมกับเนื้อหาอย่างแท้จริง"
        ]
      },
      details: {
        heading: "Interactive Installation คืออะไร?",
        description: "Interactive Installation คือระบบสื่อดิจิทัลที่ผู้ใช้งานสามารถโต้ตอบได้ผ่านการสัมผัส การเคลื่อนไหว หรือเซนเซอร์ตรวจจับต่าง ๆ แตกต่างจากสื่อแสดงผลทั่วไปที่เป็นแบบ Passive เปิดโอกาสให้ผู้ใช้งานเป็นส่วนหนึ่งของเนื้อหา ทำให้เกิด Engagement สูงขึ้น และสร้างความจดจำต่อแบรนด์ได้อย่างมีประสิทธิภาพ",
        applications: [
          "พื้นที่ Exhibition",
          "Corporate Showroom",
          "Event Activation",
          "Brand Experience Center",
          "พื้นที่ต้อนรับ (Lobby)"
        ]
      },
      solutions: {
        heading: "ประเภทของ Interactive Installation ที่เราพัฒนา",
        items: [
          {
            title: "Interactive Wall",
            description: "ผนังแสดงผลแบบโต้ตอบ สามารถตอบสนองต่อการสัมผัสหรือการเคลื่อนไหว เหมาะสำหรับการนำเสนอข้อมูลสินค้า ประวัติองค์กร หรือ Storytelling แบบ Dynamic"
          },
          {
            title: "Interactive Floor",
            description: "ระบบพื้น Interactive ที่ตอบสนองต่อการเดินหรือการเคลื่อนไหว เหมาะสำหรับงานอีเวนต์และพื้นที่ที่ต้องการสร้างประสบการณ์ที่สนุกและดึงดูดความสนใจ"
          },
          {
            title: "Gesture & Motion Recognition System",
            description: "ระบบตรวจจับท่าทางและการเคลื่อนไหวแบบไม่ต้องสัมผัส เพิ่มความล้ำสมัยและสร้างประสบการณ์แบบไร้ขีดจำกัด"
          },
          {
            title: "Custom Interactive System",
            description: "ออกแบบและพัฒนาระบบเฉพาะตามแนวคิดของแบรนด์หรือองค์กร รองรับการเชื่อมต่อกับ Hardware และ Software อื่น ๆ",
            isCustom: true
          }
        ]
      },
      benefits: {
        heading: "ประโยชน์ของ Interactive Installation ต่อองค์กร",
        items: [
          "เพิ่มการมีส่วนร่วมของผู้ชม (Engagement)",
          "สร้างความแตกต่างจากคู่แข่ง",
          "ยกระดับภาพลักษณ์องค์กรให้ทันสมัย",
          "ถ่ายทอดข้อมูลซับซ้อนได้อย่างเข้าใจง่าย",
          "เพิ่มเวลาอยู่ในพื้นที่จัดแสดง"
        ],
        summary: "ในยุคที่ผู้บริโภคคุ้นชินกับสื่อดิจิทัล การสร้างประสบการณ์ที่โต้ตอบได้จริงคือกุญแจสำคัญของการสื่อสารแบรนด์"
      },
      process: {
        heading: "กระบวนการพัฒนา Interactive Installation",
        steps: [
          {
            step: "1",
            title: "Strategy & Experience Planning",
            description: "วิเคราะห์เป้าหมายธุรกิจ กลุ่มเป้าหมาย และพื้นที่ติดตั้ง"
          },
          {
            step: "2",
            title: "Concept & Interaction Design",
            description: "ออกแบบแนวคิดประสบการณ์ รูปแบบการโต้ตอบ และโครงสร้างเนื้อหา"
          },
          {
            step: "3",
            title: "System Development",
            description: "พัฒนา Software, Real-time Graphics และเชื่อมต่อกับ Hardware"
          },
          {
            step: "4",
            title: "Testing & Optimization",
            description: "ทดสอบประสิทธิภาพ ความเสถียร และความปลอดภัยของระบบ"
          },
          {
            step: "5",
            title: "Installation & Support",
            description: "ติดตั้งในพื้นที่จริง พร้อมให้คำปรึกษาและดูแลหลังการใช้งาน"
          }
        ]
      },
      suitableFor: {
        heading: "เหมาะสำหรับธุรกิจประเภทใด",
        items: [
          "บริษัทเอกชนขนาดใหญ่",
          "หน่วยงานองค์กร",
          "ธุรกิจที่จัด Exhibition หรือ Trade Show",
          "แบรนด์ที่ต้องการทำ Event Activation",
          "Showroom และ Experience Center"
        ]
      },
      faq: {
        heading: "คำถามที่พบบ่อย",
        items: [
          {
            question: "Interactive Installation ใช้งบประมาณสูงหรือไม่?",
            answer: "งบประมาณขึ้นอยู่กับขนาดพื้นที่ เทคโนโลยีที่ใช้ และความซับซ้อนของระบบ สามารถออกแบบให้เหมาะสมกับงบประมาณขององค์กรได้"
          },
          {
            question: "ระบบมีความเสถียรเพียงพอสำหรับงานองค์กรหรือไม่?",
            answer: "ระบบถูกพัฒนาให้รองรับการใช้งานต่อเนื่อง พร้อมผ่านขั้นตอนการทดสอบก่อนติดตั้งจริง"
          },
          {
            question: "สามารถปรับแต่งให้เข้ากับแบรนด์ได้หรือไม่?",
            answer: "ทุกโปรเจกต์ออกแบบเฉพาะตามอัตลักษณ์ขององค์กร"
          }
        ]
      },
      cta: {
        heading: "ต้องการพัฒนา Interactive Installation สำหรับองค์กรของคุณ?",
        description: "ติดต่อทีม JPM Interactive เพื่อปรึกษาแนวทางการออกแบบและพัฒนาระบบที่เหมาะสมกับพื้นที่และเป้าหมายของคุณ"
      }
    },
    visual: {
      title: "Immersive Experience",
      description: "รับทำ Immersive Experience และ Immersive Installation สำหรับองค์กร",
      h1: "รับทำ Immersive Experience และ Immersive Technology\nสำหรับองค์กร",
      intro: {
        heading: "Immersive Experience ไม่ใช่เพียงการฉายภาพขนาดใหญ่",
        body: "JPM Interactive ให้บริการออกแบบและพัฒนา Immersive Experience แบบครบวงจร สำหรับองค์กร แบรนด์ และพื้นที่จัดแสดงระดับมืออาชีพ",
        highlights: [
          "เราออกแบบประสบการณ์ที่โอบล้อมผู้ใช้งานด้วยภาพ เสียง และการโต้ตอบแบบ Real-time",
          "เปลี่ยนพื้นที่ธรรมดาให้กลายเป็น “พื้นที่แห่งประสบการณ์”",
          "คือการออกแบบระบบที่ทำให้ผู้ใช้งานรู้สึกเป็นส่วนหนึ่งของเนื้อหา"
        ]
      },
      details: {
        heading: "Immersive Experience คืออะไร?",
        description: "Immersive Experience คือการออกแบบสื่อและเทคโนโลยีที่สร้างสภาพแวดล้อมแบบโอบล้อม (Immersive Environment) โดยใช้ Projection Mapping, Wrap-around Visual, Spatial Sound และ Interactive System แตกต่างจากจอแสดงผลทั่วไปที่เป็นแบบ Passive เปิดโอกาสให้ผู้ใช้งาน “เข้าไปอยู่ในเนื้อหา”",
        applications: [
          "Exhibition และ Trade Show",
          "Corporate Experience Center",
          "Brand Activation Event",
          "Museum และพื้นที่การเรียนรู้",
          "Showroom และพื้นที่ต้อนรับองค์กร"
        ]
      },
      solutions: {
        heading: "รูปแบบ Immersive Solution ที่เราพัฒนา",
        items: [
          {
            title: "Immersive Projection Room",
            description: "ห้องฉายภาพแบบรอบทิศทาง (Wrap-around Projection) สร้างบรรยากาศที่โอบล้อมผู้ชมด้วยภาพเคลื่อนไหวและเสียงแบบสมจริง"
          },
          {
            title: "Interactive Immersive Space",
            description: "ผสาน Motion Sensor หรือ Touch Interaction เข้ากับระบบฉายภาพ ทำให้ผู้ใช้งานสามารถมีปฏิสัมพันธ์กับเนื้อหาได้แบบ Real-time"
          },
          {
            title: "360° Visual Environment",
            description: "ออกแบบสภาพแวดล้อมภาพแบบ 360 องศา เหมาะสำหรับการเล่าเรื่ององค์กรหรือการนำเสนอเทคโนโลยี"
          },
          {
            title: "Custom Immersive Installation",
            description: "พัฒนาระบบเฉพาะตามแนวคิดของแบรนด์ รองรับการเชื่อมต่อกับ Lighting, Sound System และ Multimedia Infrastructure",
            isCustom: true
          }
        ]
      },
      benefits: {
        heading: "ประโยชน์ของ Immersive Experience ต่อองค์กร",
        items: [
          "สร้างความประทับใจตั้งแต่แรกเห็น",
          "เพิ่มระยะเวลาอยู่ในพื้นที่ (Dwell Time)",
          "ถ่ายทอดข้อมูลซับซ้อนได้อย่างเข้าใจง่าย",
          "สร้างภาพลักษณ์องค์กรที่ทันสมัยและล้ำหน้า",
          "เพิ่ม Engagement และการจดจำแบรนด์"
        ],
        summary: "ในยุคที่ผู้บริโภคต้องการประสบการณ์มากกว่าการรับชม Immersive Technology คือเครื่องมือสำคัญในการยกระดับการสื่อสารแบรนด์"
      },
      process: {
        heading: "กระบวนการออกแบบ Immersive Experience",
        steps: [
          {
            step: "1",
            title: "Experience Strategy",
            description: "กำหนดเป้าหมาย วัตถุประสงค์ และวิเคราะห์กลุ่มผู้ใช้งาน"
          },
          {
            step: "2",
            title: "Spatial & Visual Design",
            description: "ออกแบบพื้นที่ ประสบการณ์ภาพ เสียง และโครงสร้างการเล่าเรื่อง"
          },
          {
            step: "3",
            title: "System Engineering & Development",
            description: "พัฒนาระบบ Projection, Real-time Graphics และ Integration กับ Hardware"
          },
          {
            step: "4",
            title: "Testing & Calibration",
            description: "ปรับจูนภาพ เสียง และระบบโต้ตอบให้สมบูรณ์แบบ"
          },
          {
            step: "5",
            title: "Installation & Support",
            description: "ติดตั้งในพื้นที่จริง พร้อมให้คำแนะนำด้านการดูแลระบบ"
          }
        ]
      },
      suitableFor: {
        heading: "เหมาะสำหรับธุรกิจประเภทใด",
        items: [
          "บริษัทเอกชนขนาดใหญ่",
          "หน่วยงานรัฐและองค์กร",
          "ธุรกิจเทคโนโลยี",
          "แบรนด์ที่ต้องการ Experience Center",
          "โครงการ Museum และพื้นที่จัดแสดงถาวร"
        ]
      },
      faq: {
        heading: "คำถามที่พบบ่อย",
        items: [
          {
            question: "Immersive Experience ต่างจาก LED Wall อย่างไร?",
            answer: "LED Wall เป็นเพียงจอแสดงผลขนาดใหญ่ ขณะที่ Immersive Experience คือการออกแบบสภาพแวดล้อมแบบโอบล้อมที่ผสานภาพ เสียง และ Interaction เข้าด้วยกัน"
          },
          {
            question: "สามารถออกแบบให้เหมาะกับพื้นที่ขนาดเล็กได้หรือไม่?",
            answer: "สามารถปรับขนาดและรูปแบบระบบให้เหมาะกับพื้นที่และงบประมาณ"
          },
          {
            question: "ต้องใช้เวลาในการพัฒนานานแค่ไหน?",
            answer: "ระยะเวลาขึ้นอยู่กับขนาดโปรเจกต์และความซับซ้อนของระบบ โดยทั่วไปเริ่มตั้งแต่ 4–12 สัปดาห์"
          }
        ]
      },
      cta: {
        heading: "พร้อมสร้าง Immersive Experience ที่แตกต่างให้กับองค์กรของคุณ?",
        description: "ติดต่อทีม JPM Interactive เพื่อวางแผนและออกแบบระบบที่เหมาะสมกับพื้นที่และเป้าหมายทางธุรกิจของคุณ"
      }
    },
    multimedia: {
      title: "Multimedia Design",
      description: "รับทำ Multimedia Systems และ Creative Technology Solutions สำหรับองค์กร",
      h1: "รับทำ Multimedia Systems และ Creative Technology\nสำหรับองค์กร",
      intro: {
        heading: "Multimedia ที่ดีไม่ใช่เพียงภาพเคลื่อนไหวที่สวยงาม",
        body: "JPM Interactive ให้บริการออกแบบและพัฒนา Multimedia Systems แบบครบวงจร สำหรับองค์กร งาน Exhibition และพื้นที่แสดงเทคโนโลยี",
        highlights: [
          "เราเชี่ยวชาญในการผสานงานออกแบบภาพ 3D Visual, Motion Graphics, Real-time Content และระบบควบคุม Multimedia",
          "เข้ากับโครงสร้าง Hardware และ Software เพื่อสร้างระบบที่เสถียร พร้อมใช้งานจริงในระดับองค์กร",
          "ต้องเป็นระบบที่ทำงานได้ต่อเนื่อง มีความเสถียร และสื่อสารได้ตรงตามวัตถุประสงค์ทางธุรกิจ"
        ]
      },
      details: {
        heading: "Multimedia Systems คืออะไร?",
        description: "Multimedia Systems คือระบบที่ผสานองค์ประกอบของภาพ เสียง วิดีโอ แอนิเมชัน และเทคโนโลยี Interactive เข้าด้วยกัน เพื่อสร้างประสบการณ์การสื่อสารแบบครบมิติ ไม่ใช่เพียงกราฟิกทั่วไปที่เป็นไฟล์สื่อแบบเดี่ยว แต่ต้องออกแบบให้รองรับการทำงานแบบครบองค์กร",
        applications: [
          "การแสดงผลแบบ Real-time",
          "การเชื่อมต่อกับอุปกรณ์หลายประเภท",
          "การควบคุมจากระบบกลาง (Control System)",
          "การใช้งานต่อเนื่องในพื้นที่จริง"
        ]
      },
      solutions: {
        heading: "บริการ Multimedia ที่เราพัฒนา",
        items: [
          {
            title: "3D Visual & Motion Graphics",
            description: "ออกแบบและพัฒนา 3D Animation, Motion Graphic และ Visual Narrative สำหรับงานองค์กร งานเปิดตัวสินค้า และพื้นที่จัดแสดง"
          },
          {
            title: "Real-time Graphic Systems",
            description: "พัฒนาระบบกราฟิกที่สามารถแสดงผลแบบ Dynamic และอัปเดตข้อมูลแบบ Real-time"
          },
          {
            title: "Integrated Multimedia Control",
            description: "ออกแบบระบบควบคุมภาพ เสียง และอุปกรณ์แสดงผล ให้ทำงานประสานกันอย่างเสถียร"
          },
          {
            title: "Custom Multimedia Solution",
            description: "พัฒนาระบบเฉพาะที่ออกแบบตามความต้องการขององค์กร รองรับการเชื่อมต่อกับ Sensor, Interactive System และ Immersive Installation",
            isCustom: true
          }
        ]
      },
      benefits: {
        heading: "ประโยชน์ของ Multimedia Systems ต่อองค์กร",
        items: [
          "ออกแบบโดยทีม Creative และ System Developer ทำงานร่วมกัน",
          "รองรับการทำงานในสภาพแวดล้อมองค์กร",
          "คำนึงถึง Performance และ Stability เป็นหลัก",
          "ปรับแต่งให้เหมาะสมกับ Branding ขององค์กร"
        ],
        summary: "Multimedia Systems คือโครงสร้างสำคัญที่ช่วยให้งาน Interactive และ Immersive ทำงานได้อย่างสมบูรณ์"
      },
      process: {
        heading: "กระบวนการพัฒนา Multimedia Systems",
        steps: [
          {
            step: "1",
            title: "Requirement Analysis",
            description: "วิเคราะห์วัตถุประสงค์และข้อจำกัดของพื้นที่"
          },
          {
            step: "2",
            title: "System Architecture Design",
            description: "ออกแบบโครงสร้างระบบ Hardware และ Software"
          },
          {
            step: "3",
            title: "Content Development",
            description: "พัฒนา 3D Visual, Motion Graphic และ Multimedia Content"
          },
          {
            step: "4",
            title: "Integration & Testing",
            description: "เชื่อมต่อระบบทั้งหมดและทดสอบประสิทธิภาพ"
          },
          {
            step: "5",
            title: "Deployment & Maintenance",
            description: "ติดตั้งและให้คำแนะนำด้านการดูแลรักษาระบบ"
          }
        ]
      },
      suitableFor: {
        heading: "เหมาะสำหรับธุรกิจประเภทใด",
        items: [
          "บริษัทเอกชนขนาดใหญ่",
          "หน่วยงานรัฐ",
          "Exhibition และ Event ขนาดใหญ่",
          "Corporate Showroom",
          "Experience Center"
        ]
      },
      faq: {
        heading: "คำถามที่พบบ่อย",
        items: [
          {
            question: "Multimedia Systems ต่างจากงานวิดีโอทั่วไปอย่างไร?",
            answer: "Multimedia Systems เป็นระบบที่ออกแบบให้ทำงานร่วมกับอุปกรณ์หลายประเภท และรองรับการใช้งานจริงในพื้นที่ ไม่ใช่เพียงไฟล์วิดีโอที่เปิดเล่นอย่างเดียว"
          },
          {
            question: "สามารถเชื่อมต่อกับ Interactive Installation ได้หรือไม่?",
            answer: "สามารถออกแบบให้ทำงานร่วมกับระบบ Interactive และ Immersive ได้อย่างสมบูรณ์"
          },
          {
            question: "ระบบสามารถขยายในอนาคตได้หรือไม่?",
            answer: "สามารถออกแบบให้รองรับการขยายและอัปเกรดในอนาคต"
          }
        ]
      },
      cta: {
        heading: "ต้องการพัฒนา Multimedia System สำหรับองค์กรของคุณ?",
        description: "ติดต่อทีม JPM Interactive เพื่อวางแผนและออกแบบระบบ Multimedia ที่ตอบโจทย์ทั้งด้านภาพลักษณ์และประสิทธิภาพการใช้งาน"
      }
    }
  }
};
