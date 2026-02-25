import type { Metadata } from "next";

/** Base URL for the site. Use when building absolute URLs (e.g. cover images). */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jpminteractive.com";

const SITE_NAME = "JPM Interactive";
const DEFAULT_OG_IMAGE = `${siteUrl}/og-image.jpg`;
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;
const LAYOUT_ICON_WIDTH = 512;
const LAYOUT_ICON_HEIGHT = 512;

export type MetadataLocale = "th_TH" | "en_US";

export interface GenerateLayoutMetadataParams {
  title: string;
  description: string;
  locale: MetadataLocale;
  iconPath: string;
  url: string;
  /** Optional. When set, used for Open Graph and Twitter image (e.g. /og-image.jpg). Otherwise iconPath is used. */
  openGraphImagePath?: string;
  keywords?: string[];
  alternates?: { "en-US": string; "th-TH": string };
  openGraphExtra?: Record<string, unknown>;
}

export interface GeneratePageMetadataParams {
  title: string;
  description: string;
  /** Path including locale, e.g. "/th/about" or "/en/case-studies". For legacy routes use the actual path (e.g. "/works/slug") and pass alternates. */
  path: string;
  locale: MetadataLocale;
  /** Optional full URL for cover image (e.g. for dynamic pages). Falls back to og-image.jpg */
  image?: string;
  /** Override alternates.languages (e.g. for legacy /works, /content that resolve to /en|th/...). If omitted, derived from path. */
  alternates?: { "en-US": string; "th-TH": string };
}

function getAlternatePaths(path: string): { "en-US": string; "th-TH": string } {
  const p = path.startsWith("/") ? path : `/${path}`;
  const enPath = p.startsWith("/th") ? p.replace(/^\/th/, "/en") : p;
  const thPath = p.startsWith("/en") ? p.replace(/^\/en/, "/th") : p;
  return {
    "en-US": `${siteUrl}${enPath}`,
    "th-TH": `${siteUrl}${thPath}`,
  };
}

/**
 * Single source of truth for page SEO metadata.
 * Use for both static and dynamic routes.
 */
export function generatePageMetadata({
  title,
  description,
  path,
  locale,
  image,
  alternates: alternatesOverride,
}: GeneratePageMetadataParams): Metadata {
  const pathNorm = path.startsWith("/") ? path : `/${path}`;
  const url = `${siteUrl}${pathNorm}`;
  const languages = alternatesOverride ?? getAlternatePaths(pathNorm);
  const imageUrl = image ?? DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: title,
        },
      ],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

/**
 * Layout-level metadata (root and locale layouts).
 * Same openGraph/twitter shape as page metadata; uses icon for OG image.
 */
export function generateLayoutMetadata({
  title,
  description,
  locale,
  iconPath,
  url,
  openGraphImagePath,
  keywords,
  alternates,
  openGraphExtra,
}: GenerateLayoutMetadataParams): Metadata {
  const absoluteIconUrl = `${siteUrl}${iconPath.startsWith("/") ? iconPath : `/${iconPath}`}`;
  const ogImagePath = openGraphImagePath ?? iconPath;
  const absoluteOgUrl = `${siteUrl}${ogImagePath.startsWith("/") ? ogImagePath : `/${ogImagePath}`}`;
  const useOgDimensions = !!openGraphImagePath;
  const openGraphImages = [
    {
      url: absoluteOgUrl,
      width: useOgDimensions ? OG_IMAGE_WIDTH : LAYOUT_ICON_WIDTH,
      height: useOgDimensions ? OG_IMAGE_HEIGHT : LAYOUT_ICON_HEIGHT,
      alt: title,
    },
  ];

  const openGraph: Metadata["openGraph"] = {
    title,
    description,
    url,
    siteName: SITE_NAME,
    images: openGraphImages,
    locale,
    type: "website",
    ...openGraphExtra,
  };

  const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title,
    description,
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteOgUrl],
    },
    icons: { icon: iconPath },
  };

  if (keywords?.length) metadata.keywords = keywords;
  if (alternates) metadata.alternates = { canonical: url, languages: alternates };

  return metadata;
}
