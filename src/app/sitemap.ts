import type { MetadataRoute } from "next";
import { works } from "@/data/works";
import { worksPageData } from "@/data/worksPageData";
import { getAllPosts } from "@/data/content";
import { siteUrl } from "@/lib/seo";

function getAllWorkSlugs(): string[] {
    const fromWorks = works.map((w) => w.slug);
    const fromPageData = worksPageData.map((w) => w.slug);
    const set = new Set([...fromWorks, ...fromPageData]);
    return Array.from(set);
}

const locales = ["en", "th"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
    const workSlugs = getAllWorkSlugs();
    const contentPosts = getAllPosts();
    const now = new Date();

    const staticPaths = ["", "/about", "/contact", "/faq", "/case-studies", "/content", "/industries", "/services", "/services/interactive-installation", "/services/immersive-experience"];
    const staticPages: MetadataRoute.Sitemap = [
        { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
        ...locales.flatMap((locale) =>
            staticPaths.map((path) => ({
                url: `${siteUrl}/${locale}${path}`,
                lastModified: now,
                changeFrequency: (path === "/contact" ? "monthly" : "weekly") as "monthly" | "weekly",
                priority: path === "" ? 1 : path === "/about" || path === "/case-studies" ? 0.9 : 0.8,
            }))
        ),
    ];

    const workPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
        workSlugs.map((slug) => ({
            url: `${siteUrl}/${locale}/case-studies/${slug}`,
            lastModified: now,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        }))
    );

    const contentPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
        contentPosts.map((post) => ({
            url: `${siteUrl}/${locale}/content/${post.slug}`,
            lastModified: post.updatedAt ? new Date(post.updatedAt) : now,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        }))
    );

    return [...staticPages, ...workPages, ...contentPages];
}
