import type { Work } from "./works";
export type { Work };

// วิดีโอจาก JPMGROUP_s WORKS – ใช้ API เพื่อให้ path ภาษาไทย/อักขระพิเศษโหลดได้
const WORKS_MEDIA_FOLDER = "JPMGROUP_s WORKS";
const COVER_FOLDER = WORKS_MEDIA_FOLDER + "/Cover";

/** สร้าง src วิดีโอผ่าน API (รองรับ path ภาษาไทยและอักขระพิเศษ) */
function mediaPath(...segments: string[]): string {
    const relativePath = WORKS_MEDIA_FOLDER + "/" + segments.join("/");
    return "/api/works-video?path=" + encodeURIComponent(relativePath);
}

/** path ภาพ Cover สำหรับการ์ด (ใช้กับ img src ได้โดยเติม / ข้างหน้า) */
function coverPath(...segments: string[]): string {
    return COVER_FOLDER + "/" + segments.join("/");
}

export const worksPageData: Work[] = [
    {
        id: "p1",
        slug: "interactive-wall-crown-plaza",
        title: "Interactive Wall at Crown Plaza",
        category: "led",
        description: "Large-scale interactive LED wall installation at Crown Plaza. Dynamic visuals and real-time content create an immersive experience for guests and events.",
        media: { type: "video", src: mediaPath("1. Visual Experience", "interactive wall crown plaza.mp4") },
        cover: coverPath("immersive", "clown-plaza.jpg"),
        technologies: ["LED Mapping", "Real-time Rendering", "Content Management", "Visual Design"]
    },
    {
        id: "p2",
        slug: "lazada-run",
        title: "Lazada Run Visual Experience",
        category: "led",
        description: "Vibrant visual experience for Lazada Run event. LED displays and motion graphics that energize the race and engage participants and spectators.",
        media: { type: "video", src: mediaPath("1. Visual Experience", "lazada run.mp4") },
        cover: coverPath("immersive", "Lazada.JPG"),
        technologies: ["LED Display", "Event Visuals", "Motion Graphics", "Live Content"]
    },
    {
        id: "p3",
        slug: "punthai-visual",
        title: "Punthai Visual Experience",
        category: "led",
        description: "Immersive LED visual experience for Punthai. Seamless content and lighting design that transforms the space into a memorable brand experience.",
        media: { type: "video", src: mediaPath("1. Visual Experience", "Punthai.mp4") },
        cover: coverPath("cover video_black bg.jpg"),
        technologies: ["LED Mapping", "Brand Experience", "Visual Design", "Content Management"]
    },
    {
        id: "p23",
        slug: "sakkarasathan-nicolas",
        title: "สักการสถาน นักบุญ Nicolas",
        category: "led",
        description: "Visual experience for สักการสถาน นักบุญ Nicolas. Immersive LED and digital content for a meaningful brand presence.",
        media: { type: "video", src: mediaPath("1. Visual Experience", "สักการสถาน นักบุญ Nicolas.mp4") },
        cover: coverPath("immersive", "Nicholas.JPG"),
        technologies: ["LED Display", "Visual Design", "Content Management", "Brand Experience"]
    },
    {
        id: "p4",
        slug: "bcc-power-interactive",
        title: "BCC Power Interactive Experience",
        category: "touch_screen",
        description: "Interactive kiosk and display experience for BCC Power. Engaging touch interfaces and real-time information for customers and stakeholders.",
        media: { type: "video", src: mediaPath("2. Interactive solution", "BCC_Power.mp4") },
        cover: coverPath("Touch screen", "BCC Power.JPG"),
        technologies: ["Touch Screen", "Interactive Kiosk", "UI/UX", "Real-time Data"]
    },
    {
        id: "p5",
        slug: "roulette-bangchak",
        title: "Roulette Interactive [Bangchak]",
        category: "touch_screen",
        description: "Interactive roulette experience for Bangchak. Gamified engagement that combines fun mechanics with brand messaging for events and activations.",
        media: { type: "video", src: mediaPath("2. Interactive solution", "Roulette [Bangchak].mp4") },
        cover: coverPath("Touch screen", "BangChak.png"),
        technologies: ["Unity", "Motion Tracking", "Gamification", "Interactive Display"]
    },
    {
        id: "p6",
        slug: "tea-machine-cafe-amazon",
        title: "Tea Machine Interactive [Cafe Amazon]",
        category: "touch_screen",
        description: "Interactive tea machine experience for Cafe Amazon. Touch-driven interface that guides users through selections and creates a memorable brand moment.",
        media: { type: "video", src: mediaPath("2. Interactive solution", "TeaMachine [Cafe Amazon].mp4") },
        cover: coverPath("Touch screen", "Amazon.png"),
        technologies: ["Touch Screen", "Interactive Kiosk", "Brand Experience", "UX Design"]
    },
    {
        id: "p7",
        slug: "space-x-interactive",
        title: "Space X Themed Interactive",
        category: "touch_screen",
        description: "Space-themed interactive experience. Immersive visuals and touch interactions that take users on a journey through space and exploration.",
        media: { type: "video", src: mediaPath("2. Interactive solution", "sapce x.mp4") },
        cover: coverPath("Touch screen", "SpaceX.png"),
        technologies: ["Unity", "Interactive Display", "Motion Graphics", "Immersive Design"]
    },
    {
        id: "p8",
        slug: "opening-multimedia",
        title: "Opening Multimedia Design",
        category: "graphic_design",
        description: "Opening sequence and multimedia design for events and installations. Bold visuals and motion that set the tone and capture attention.",
        media: { type: "video", src: mediaPath("3. Multimedia Design", "Opening.mp4") },
        cover: coverPath("cover video_black bg.jpg"),
        technologies: ["After Effects", "Motion Design", "Visual Design", "Content Creation"]
    },
    {
        id: "p9",
        slug: "multimedia-visual-13",
        title: "Multimedia Visual Experience",
        category: "graphic_design",
        description: "Multimedia visual content for digital displays and installations. Clean, modern design that communicates effectively across platforms.",
        media: { type: "video", src: mediaPath("3. Multimedia Design", "13.mp4") },
        cover: coverPath("cover video_black bg.jpg"),
        technologies: ["Motion Graphics", "Visual Design", "Content Management", "Digital Signage"]
    },
    {
        id: "p10",
        slug: "video-11-multimedia",
        title: "Multimedia Content Package",
        category: "graphic_design",
        description: "Integrated multimedia content package for events and campaigns. Cohesive visuals and motion that strengthen brand presence.",
        media: { type: "video", src: mediaPath("3. Multimedia Design", "video_11.mp4") },
        cover: coverPath("cover video_black bg.jpg"),
        technologies: ["Motion Design", "Brand Guidelines", "Visual Design", "Content Strategy"]
    },
    {
        id: "p11",
        slug: "capacitive-interactive",
        title: "Capacitive Touch Interactive",
        category: "touch_screen",
        description: "Capacitive touch technology applied to interactive installations. Responsive, durable interfaces for high-traffic environments.",
        media: { type: "video", src: mediaPath("4. Other", "Capacitive.mp4") },
        cover: coverPath("Other", "TouchLight.png"),
        technologies: ["Capacitive Touch", "Interactive Hardware", "UX Design", "Installation"]
    },
    {
        id: "p12",
        slug: "oishi-card-rfid",
        title: "Oishi Card (RFID) Interactive",
        category: "touch_screen",
        description: "RFID-integrated interactive experience for Oishi Card. Seamless identification and personalized content for loyalty and engagement.",
        media: { type: "video", src: mediaPath("4. Other", "OishiCard(RFID).mp4") },
        cover: coverPath("Other", "Oishi.png"),
        technologies: ["RFID", "Touch Screen", "Loyalty Integration", "Interactive Kiosk"]
    },
    // 1. Visual Experience - เพิ่ม
    {
        id: "p14",
        slug: "kia-visual-experience",
        title: "KIA Visual Experience",
        category: "led",
        description: "Immersive visual experience for KIA. LED and digital content that elevates the brand presence at events and showrooms.",
        media: { type: "video", src: mediaPath("1. Visual Experience", "KIA", "VID_20240229_123037.mp4") },
        cover: coverPath("immersive", "KIA.PNG"),
        technologies: ["LED Display", "Brand Experience", "Visual Design", "Content Management"]
    },
    {
        id: "p15",
        slug: "stick-together",
        title: "Stick Together",
        category: "led",
        description: "Collaborative visual experience that brings people together. Interactive content and dynamic visuals for engagement.",
        media: { type: "video", src: mediaPath("1. Visual Experience", "Pixel 1", "sticktogether.mp4") },
        cover: coverPath("immersive", "Sticktogether.JPG"),
        technologies: ["LED Mapping", "Interactive Display", "Visual Design", "Real-time Content"]
    },
    // 2. Interactive solution - เพิ่ม
    {
        id: "p16",
        slug: "dynasty-preview",
        title: "Dynasty Interactive Preview",
        category: "touch_screen",
        description: "Interactive preview experience with immersive gameplay and dynamic visuals. Engaging interface for events and activations.",
        media: {
            type: "video",
            src: mediaPath("2. Interactive solution", "Dynasty Preview [NetMode_ Standalone]  (64-bit_Windows)  2026-02-13 20-09-10.mp4")
        },
        cover: coverPath("Touch screen", "Dynasty.JPG"),
        technologies: ["Unity", "Interactive Display", "Real-time Rendering", "Gamification"]
    },
    {
        id: "p17",
        slug: "kepler-preview",
        title: "Kepler Interactive Preview",
        category: "touch_screen",
        description: "Interactive preview with cutting-edge visuals and smooth gameplay. Designed for high-impact brand experiences.",
        media: {
            type: "video",
            src: mediaPath("2. Interactive solution", "Kepler Preview [NetMode_ Standalone 0]  (64-bit_PC D3D SM6) 2026-02-13 20-21-52.mp4")
        },
        cover: coverPath("Touch screen", "Kepler.JPG"),
        technologies: ["Unity", "Motion Graphics", "Interactive Design", "Real-time 3D"]
    },
    {
        id: "p27",
        slug: "guitar-hero-pttep",
        title: "Guitar Hero ในงาน IPTC จัดโดย PTTEP",
        category: "touch_screen",
        description: "Guitar Hero interactive experience at IPTC event by PTTEP. Rhythm gameplay and immersive visuals for engagement.",
        media: { type: "video", src: mediaPath("2. Interactive solution", "Guitar Hero ในงาน IPTC จัดโดย PTTEP.mp4") },
        cover: coverPath("Touch screen", "guitarHero.PNG"),
        technologies: ["Unity", "Motion Tracking", "Audio Sync", "Interactive Display"]
    },
    {
        id: "p18",
        slug: "muay-thai-learning-media",
        title: "Muay Thai Learning Media",
        category: "touch_screen",
        description: "Interactive learning experience for Muay Thai. Combines motion tracking and educational content for training and engagement.",
        media: { type: "video", src: mediaPath("2. Interactive solution", "Learning Media", "MuayThai.mp4") },
        cover: coverPath("Touch screen", "MuayThai.png"),
        technologies: ["Motion Tracking", "Educational Content", "Interactive Kiosk", "Gamification"]
    },
    {
        id: "p28",
        slug: "crab-life-walailak",
        title: "Crab Life – พิพิธภัณฑ์ ม.วลัยลักษณ์",
        category: "touch_screen",
        description: "Interactive Crab Life experience for Walailak University Museum. Educational and engaging content.",
        media: { type: "video", src: mediaPath("2. Interactive solution", "พิพิธภัณฑ์ ม.วลัยลักษณ์", "Crab_Life   2025-05-22 19-24-09.mp4") },
        cover: coverPath("Touch screen", "Crab Life .JPG"),
        technologies: ["Interactive Display", "Educational Content", "Museum Experience"]
    },
    {
        id: "p29",
        slug: "fish-video-walailak",
        title: "Fish Interactive – พิพิธภัณฑ์ ม.วลัยลักษณ์",
        category: "touch_screen",
        description: "Fish-themed interactive video sample for Walailak University Museum.",
        media: { type: "video", src: mediaPath("2. Interactive solution", "พิพิธภัณฑ์ ม.วลัยลักษณ์", "fish_1_video_sample.mp4") },
        cover: coverPath("immersive", "Fish Tank .JPG"),
        technologies: ["Interactive Display", "Visual Design", "Museum Experience"]
    },
    {
        id: "p30",
        slug: "history-preview-walailak",
        title: "History Preview – พิพิธภัณฑ์ ม.วลัยลักษณ์",
        category: "touch_screen",
        description: "History-themed interactive preview for Walailak University Museum.",
        media: { type: "video", src: mediaPath("2. Interactive solution", "พิพิธภัณฑ์ ม.วลัยลักษณ์", "History Preview [NetMode_ Standalone 0]  (64-bit_PC D3D SM6) 2025-04-28 07-02-58.mp4") },
        cover: coverPath("Touch screen", "History.JPG"),
        technologies: ["Unity", "Interactive Display", "Museum Experience"]
    },
    {
        id: "p32",
        slug: "research-preview-walailak",
        title: "Research Preview – พิพิธภัณฑ์ ม.วลัยลักษณ์",
        category: "touch_screen",
        description: "Research-themed interactive preview for Walailak University Museum.",
        media: { type: "video", src: mediaPath("2. Interactive solution", "พิพิธภัณฑ์ ม.วลัยลักษณ์", "Research Preview [NetMode_ Standalone 0]  (64-bit_PC D3D SM6) 2025-05-21 09-54-41.mp4") },
        cover: coverPath("Touch screen", "Research.JPG"),
        technologies: ["Unity", "Interactive Display", "Museum Experience"]
    },
    {
        id: "p33",
        slug: "gam-luang-sap-yak-kon",
        title: "เกมล้วงทรัพยากร – พิพิธภัณฑ์ ม.วลัยลักษณ์",
        category: "touch_screen",
        description: "เกมล้วงทรัพยากร interactive experience for Walailak University Museum.",
        media: { type: "video", src: mediaPath("2. Interactive solution", "พิพิธภัณฑ์ ม.วลัยลักษณ์", "เกมล้วงทรัพยากร.mp4") },
        cover: coverPath("Touch screen", "Resource.JPG"),
        technologies: ["Interactive Display", "Gamification", "Museum Experience"]
    },
    // 3. Multimedia Design - เพิ่ม
    {
        id: "p20",
        slug: "multimedia-video-15",
        title: "Multimedia Visual 15",
        category: "graphic_design",
        description: "Multimedia visual content for campaigns and installations. Striking motion design and cohesive brand visuals.",
        media: { type: "video", src: mediaPath("3. Multimedia Design", "video_15.mp4") },
        cover: coverPath("cover video_black bg.jpg"),
        technologies: ["Motion Graphics", "Visual Design", "After Effects", "Digital Content"]
    },
    {
        id: "p21",
        slug: "multimedia-video-3",
        title: "Multimedia Visual 3",
        category: "graphic_design",
        description: "Creative multimedia content for digital and experiential campaigns. Bold visuals and dynamic motion.",
        media: { type: "video", src: mediaPath("3. Multimedia Design", "video_3.mp4") },
        cover: coverPath("cover video_black bg.jpg"),
        technologies: ["Motion Design", "Visual Design", "Content Creation", "Brand Visuals"]
    },
    {
        id: "p22",
        slug: "multimedia-video-8",
        title: "Multimedia Visual 8",
        category: "graphic_design",
        description: "Multimedia content package for events and digital signage. Clean, impactful design that captures attention.",
        media: { type: "video", src: mediaPath("3. Multimedia Design", "video_8.mp4") },
        cover: coverPath("cover video_black bg.jpg"),
        technologies: ["Motion Graphics", "Visual Design", "Content Management", "Digital Signage"]
    }
];

export function getWorkBySlugFromPageData(slug: string): Work | undefined {
    return worksPageData.find((work) => work.slug === slug);
}
