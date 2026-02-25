import { notFound } from "next/navigation";
import { ServicesOverviewContent } from "@/app/services/ServicesOverviewContent";
import { seo } from "@/i18n/config";
import { generatePageMetadata } from "@/lib/seo";
import type { Locale } from "@/types/locale";
import { locales } from "@/i18n/config";

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

    return <ServicesOverviewContent locale={validLocale} />;
}
