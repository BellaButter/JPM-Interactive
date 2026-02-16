import type { ContentPost } from "@/types/content";

export const contentPosts: ContentPost[] = [
    {
        slug: "welcome-to-jpm-interactive",
        title: "Welcome to JPM Interactive",
        description: "Discover how we craft immersive digital experiences that engage and inspire.",
        body: "<p>At JPM Interactive, we believe in pushing the boundaries of digital interaction. Our team combines creative vision with technical expertise to deliver experiences that captivate audiences.</p><p>From interactive installations to motion graphics and beyond, we work with brands to bring their ideas to life.</p>",
        coverImage: "/icon.png",
        publishedAt: "2026-01-15T00:00:00Z",
        updatedAt: "2026-01-15T00:00:00Z",
    },
    {
        slug: "creative-technology-studio",
        title: "Where Technology Meets Creativity",
        description: "Exploring the intersection of technology and creative storytelling.",
        body: "<p>Creative technology is at the heart of what we do. We blend cutting-edge tools with thoughtful design to create memorable experiences.</p><p>Whether it is an LED wall installation, a touch-screen experience, or multimedia content, we aim to deliver excellence at every step.</p>",
        coverImage: "/icon.png",
        publishedAt: "2026-01-10T00:00:00Z",
        updatedAt: "2026-01-10T00:00:00Z",
    },
];

export function getAllPosts(): ContentPost[] {
    return contentPosts.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getPostBySlug(slug: string): ContentPost | undefined {
    return contentPosts.find((post) => post.slug === slug);
}
