import { notFound } from "next/navigation";
import { getWorkBySlug, works } from "@/data/works";
import { getWorkBySlugFromPageData, worksPageData } from "@/data/worksPageData";
import WorkDetailClient from "@/components/works/WorkDetailClient";

export function generateStaticParams() {
    const fromWorks = works.map((work) => ({ slug: work.slug }));
    const fromPageData = worksPageData.map((work) => ({ slug: work.slug }));
    return [...fromWorks, ...fromPageData];
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
