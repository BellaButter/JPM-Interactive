import { notFound } from "next/navigation";
import { ServicesOverviewContent } from "@/app/services/ServicesOverviewContent";
import { generatePageMetadata } from "@/lib/seo";
import type { Locale } from "@/types/locale";
import { locales } from "@/i18n/config";
import { serviceContent } from "@/data/servicePageContent";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";

    const title =
        validLocale === "th"
            ? "บริการของเรา | JPM Interactive"
            : "Our Services | JPM Interactive";
    const description =
        validLocale === "th"
            ? "บริการ Interactive Installation, Immersive Experience และ Multimedia Systems แบบครบวงจรสำหรับองค์กร"
            : "End-to-end Interactive Installation, Immersive Experience, and Multimedia Systems services for organizations.";

    return generatePageMetadata({
        title,
        description,
        path: `/${validLocale}/services`,
        locale: validLocale === "th" ? "th_TH" : "en_US",
    });
}

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function ServicesOverviewPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : null;
    if (validLocale === null) notFound();

    const c = serviceContent[validLocale];

    // Create ItemList schema for services
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": validLocale === "th" ? "บริการของเรา | JPM Interactive" : "Our Services | JPM Interactive",
        "description": validLocale === "th" ? "บริการ Interactive Installation, Immersive Experience และ Multimedia Systems แบบครบวงจรสำหรับองค์กร" : "End-to-end Interactive Installation, Immersive Experience, and Multimedia Systems services for organizations.",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "item": {
                    "@type": "Service",
                    "name": c.interactive.title,
                    "description": c.interactive.description,
                    "url": `https://jpminteractive.com/${validLocale}/services/interactive-installation`
                }
            },
            {
                "@type": "ListItem",
                "position": 2,
                "item": {
                    "@type": "Service",
                    "name": c.visual.title,
                    "description": c.visual.description,
                    "url": `https://jpminteractive.com/${validLocale}/services/immersive-experience`
                }
            },
            {
                "@type": "ListItem",
                "position": 3,
                "item": {
                    "@type": "Service",
                    "name": c.multimedia.title,
                    "description": c.multimedia.description,
                    "url": `https://jpminteractive.com/${validLocale}/services/multimedia-systems`
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ServicesOverviewContent locale={validLocale} />
        </>
    );
}
