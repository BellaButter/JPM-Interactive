/** Build YouTube embed URL (use your video ID from share link) */
export function youtubeEmbedUrl(videoId: string): string {
    return `https://www.youtube.com/embed/${videoId}`;
}

export interface Work {
    id: string;
    slug: string;
    title: string;
    category: "led" | "touch_screen" | "graphic_design";
    description: string;
    media: {
        type: "video" | "image" | "youtube";
        src: string;
        thumbnail?: string;
    };
    cover?: string;
    technologies?: string[];
    featured?: boolean;
}

export const works: Work[] = [
    {
        id: "1",
        slug: "guitar-hero-interactive",
        title: "Guitar Hero Interactive Experience",
        category: "touch_screen",
        description: "An electrifying interactive guitar game that transforms players into rock stars. Features real-time rhythm gameplay, dynamic visual feedback, and an immersive musical journey that captivates audiences of all ages.",
        media: {
            type: "youtube",
            src: youtubeEmbedUrl("rEh-o1srlhQ")
        },
        technologies: ["Unity", "Motion Tracking", "Audio Sync", "Interactive Display"],
        featured: true
    },
    {
        id: "2",
        slug: "immersive-wall-experience",
        title: "Immersive Wall Visual Experience",
        category: "led",
        description: "A stunning large-scale LED wall installation that creates breathtaking visual narratives. Dynamic content flows seamlessly across the massive display, transforming spaces into captivating visual stories that engage and inspire.",
        media: {
            type: "youtube",
            src: youtubeEmbedUrl("NNEHahAh-C4")
        },
        technologies: ["LED Mapping", "Real-time Rendering", "Content Management", "Visual Design"],
        featured: true
    },
    {
        id: "3",
        slug: "immersive-floor-interaction",
        title: "Interactive Floor Experience",
        category: "touch_screen",
        description: "A revolutionary interactive floor system that responds to every movement. Watch as vibrant visuals bloom beneath your feet, creating a magical playground where physical movement meets digital artistry in perfect harmony.",
        media: {
            type: "youtube",
            src: youtubeEmbedUrl("8RYdaKQWTMA")
        },
        technologies: ["Motion Sensors", "Projection Mapping", "Real-time Graphics", "Interactive Design"],
        featured: true
    },
    {
        id: "4",
        slug: "muay-thai-interactive",
        title: "Muay Thai Training Interactive",
        category: "touch_screen",
        description: "An innovative martial arts training experience that combines traditional Muay Thai with cutting-edge technology. Real-time motion tracking and interactive feedback create an engaging workout that's both authentic and futuristic.",
        media: {
            type: "youtube",
            src: youtubeEmbedUrl("qfBKHXQnQWs")
        },
        technologies: ["Motion Capture", "Motion Tracking", "Gesture Recognition", "Interactive Display"],
        featured: false
    },
    {
        id: "7",
        slug: "color-remember",
        title: "Color Remember – Interactive Floor Game",
        category: "led",
        description: "Interactive floor game where players remember and match color positions. Perfect for team-building and events: participants follow cues, step on the right spots, and work together under time pressure. Combines physical movement with memory challenge for engaging activations.",
        media: {
            type: "youtube",
            src: youtubeEmbedUrl("oUsOBoEixwo")
        },
        technologies: ["Interactive Floor", "Motion Sensors", "Real-time Feedback", "Group Activity"],
        featured: true
    },
    {
        id: "5",
        slug: "sustainable-brand-identity",
        title: "Sustainable Brand Identity",
        category: "graphic_design",
        description: "Complete brand identity design for an eco-friendly lifestyle brand. Includes logo system, color palette, typography, packaging design, and brand guidelines.",
        media: {
            type: "image",
            src: "/placeholder-work-4.jpg"
        },
        technologies: ["Adobe Illustrator", "Figma", "Brand Strategy"],
        featured: false
    },
    {
        id: "6",
        slug: "product-launch-animation",
        title: "Tech Product Launch Animation",
        category: "led",
        description: "A sleek product reveal animation for a cutting-edge smartphone. Features photorealistic rendering, dynamic camera movements, and particle effects.",
        media: {
            type: "youtube",
            src: youtubeEmbedUrl("dQw4w9WgXcQ"),
            thumbnail: "/placeholder-work-5.jpg"
        },
        technologies: ["Blender", "After Effects", "Octane Render"],
        featured: false
    }
];

// Helper function to get work by slug
export function getWorkBySlug(slug: string): Work | undefined {
    return works.find((work) => work.slug === slug);
}

// Helper function to get featured works
export function getFeaturedWorks(): Work[] {
    return works.filter((work) => work.featured);
}

// Helper function to filter works by category
export function getWorksByCategory(category: Work["category"] | "all"): Work[] {
    if (category === "all") return works;
    return works.filter((work) => work.category === category);
}
