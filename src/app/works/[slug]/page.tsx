import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWorkBySlug, works } from "@/data/works";
import { getWorkBySlugFromPageData, worksPageData } from "@/data/worksPageData";
import WorkDetailClient from "@/components/works/WorkDetailClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jpm-interactive.vercel.app";

export function generateStaticParams() {
    const fromWorks = works.map((work) => ({ slug: work.slug }));
    const fromPageData = worksPageData.map((work) => ({ slug: work.slug }));
    return [...fromWorks, ...fromPageData];
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const work = getWorkBySlug(slug) ?? getWorkBySlugFromPageData(slug);
    if (!work) return { title: "Work Not Found" };

    const title = `${work.title} - JPM Interactive`;
    const description = work.description;
    const url = `${siteUrl}/works/${slug}`;
    const images = work.cover ? [{ url: `${siteUrl}/${work.cover}`, width: 1200, height: 630, alt: work.title }] : undefined;

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            title,
            description,
            url,
            siteName: "JPM Interactive",
            images,
            locale: "en_US",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

export default async function WorkDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const work = getWorkBySlug(slug) ?? getWorkBySlugFromPageData(slug);

    if (!work) {
        notFound();
    }

    return <WorkDetailClient work={work} />;
}
