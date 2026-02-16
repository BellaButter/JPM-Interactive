import type { MetadataRoute } from "next";
import { works } from "@/data/works";
import { worksPageData } from "@/data/worksPageData";
import { getAllPosts } from "@/data/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jpm-interactive.vercel.app";

function getAllWorkSlugs(): string[] {
    const fromWorks = works.map((w) => w.slug);
    const fromPageData = worksPageData.map((w) => w.slug);
    const set = new Set([...fromWorks, ...fromPageData]);
    return Array.from(set);
}

export default function sitemap(): MetadataRoute.Sitemap {
    const workSlugs = getAllWorkSlugs();
    const contentPosts = getAllPosts();
    const now = new Date();

    const staticPages: MetadataRoute.Sitemap = [
        { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
        { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${siteUrl}/works`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
        { url: `${siteUrl}/content`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ];

    const workPages: MetadataRoute.Sitemap = workSlugs.map((slug) => ({
        url: `${siteUrl}/works/${slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    const contentPages: MetadataRoute.Sitemap = contentPosts.map((post) => ({
        url: `${siteUrl}/content/${post.slug}`,
        lastModified: post.updatedAt ? new Date(post.updatedAt) : now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [...staticPages, ...workPages, ...contentPages];
}
