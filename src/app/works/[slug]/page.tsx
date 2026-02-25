import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWorkBySlug, works } from "@/data/works";
import { getWorkBySlugFromPageData, worksPageData } from "@/data/worksPageData";
import WorkDetailClient from "@/components/works/WorkDetailClient";
import { generatePageMetadata, siteUrl } from "@/lib/seo";

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
  const image = work.cover ? `${siteUrl}/${work.cover}` : undefined;

  return generatePageMetadata({
    title,
    description,
    path: `/works/${slug}`,
    locale: "en_US",
    image,
    alternates: {
      "en-US": `${siteUrl}/en/case-studies/${slug}`,
      "th-TH": `${siteUrl}/th/case-studies/${slug}`,
    },
  });
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
