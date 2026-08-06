import localFont from "next/font/local";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { generateLayoutMetadata, siteUrl } from "@/lib/seo";
import { getOrganizationJsonLd } from "@/lib/jsonLd";
import "./globals.css";

/** English / Latin: LINE Seed Sans (LINESeedSans_W_*) */
const lineSeed = localFont({
  src: [
    { path: "../fonts/LINESeedSans_W_Th.woff2", weight: "100" },
    { path: "../fonts/LINESeedSans_W_Rg.woff2", weight: "400" },
    { path: "../fonts/LINESeedSans_W_Bd.woff2", weight: "700" },
    { path: "../fonts/LINESeedSans_W_XBd.woff2", weight: "800" },
    { path: "../fonts/LINESeedSans_W_He.woff2", weight: "900" },
  ],
  variable: "--font-line-seed",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

/** Thai: LINE Seed Sans TH (LINESeedSansTH_W_*) */
const lineSeedTH = localFont({
  src: [
    { path: "../fonts/LINESeedSansTH_W_Th.woff2", weight: "100" },
    { path: "../fonts/LINESeedSansTH_W_Rg.woff2", weight: "400" },
    { path: "../fonts/LINESeedSansTH_W_Bd.woff2", weight: "700" },
    { path: "../fonts/LINESeedSansTH_W_XBd.woff2", weight: "800" },
    { path: "../fonts/LINESeedSansTH_W_He.woff2", weight: "900" },
  ],
  variable: "--font-line-seed-th",
  display: "swap",
  preload: true,
  fallback: ["Thonburi", "Tahoma", "sans-serif"],
});

const ROOT_TITLE = "JPM Interactive - Creative Technology Studio";
const ROOT_DESCRIPTION =
  "High-end interactive programs, mini games, graphic design, and motion graphics for innovative brands.";
const ROOT_KEYWORDS = [
  "jpm interactive",
  "jpminteractive",
  "JPM Interactive",
  "creative technology",
  "interactive experiences",
  "LED visual",
  "motion graphics",
  "digital installation",
  "touch screen",
  "immersive",
];

export const metadata = generateLayoutMetadata({
  title: ROOT_TITLE,
  description: ROOT_DESCRIPTION,
  locale: "en_US",
  iconPath: "/icon.ico",
  url: siteUrl,
  openGraphImagePath: "/og-image.jpg",
  keywords: ROOT_KEYWORDS,
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

import { MotionProvider } from "@/system/motion/MotionProvider";
import { RouteTransitionProvider } from "@/context/RouteTransitionContext";
import { LocaleProvider } from "@/context/LocaleContext";
import PageLoader from "@/components/ui/PageLoader";
import ScrollToTop from "@/components/utils/ScrollToTop";
import RouteTransitionOverlay from "@/components/ui/RouteTransitionOverlay";
import ClientOnlyComponents from "@/components/layout/ClientOnlyComponents";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`min-h-full ${lineSeed.variable} ${lineSeedTH.variable}`}>
      <head>
        {/* LocaleSync sets document.documentElement.lang to "th"|"en" for [locale] routes */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationJsonLd()) }}
        />
      </head>
      <body className="antialiased min-h-full w-full max-w-[100vw] overflow-x-hidden">
        <LocaleProvider>
          <MotionProvider>
            <RouteTransitionProvider>
              <ScrollToTop />
              <PageLoader />
              <RouteTransitionOverlay />
              <ScrollProgress />
              <ClientOnlyComponents />
              <Navigation />
              {children}
              <Footer />
            </RouteTransitionProvider>
          </MotionProvider>
        </LocaleProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
