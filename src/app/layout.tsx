import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import FloatingElements from "@/components/effects/FloatingElements";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jpm-interactive.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "JPM Interactive - Creative Technology Studio",
  description: "High-end interactive programs, mini games, graphic design, and motion graphics for innovative brands.",
  keywords: [
    "creative technology",
    "interactive experiences",
    "LED visual",
    "motion graphics",
    "digital installation",
    "touch screen",
    "immersive",
    "JPM Interactive",
  ],
  openGraph: {
    title: "JPM Interactive - Creative Technology Studio",
    description: "High-end interactive programs, mini games, graphic design, and motion graphics for innovative brands.",
    url: siteUrl,
    siteName: "JPM Interactive",
    images: [{ url: "/icon.png", width: 512, height: 512, alt: "JPM Interactive" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "JPM Interactive - Creative Technology Studio",
    description: "High-end interactive programs, mini games, graphic design, and motion graphics for innovative brands.",
  },
  icons: {
    icon: "/icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

import { MotionProvider } from "@/system/motion/MotionProvider";
import { RouteTransitionProvider } from "@/context/RouteTransitionContext";
import PageLoader from "@/components/ui/PageLoader";
import ScrollToTop from "@/components/utils/ScrollToTop";
import RouteTransitionOverlay from "@/components/ui/RouteTransitionOverlay";
import CursorTrail from "@/components/cursor/CursorTrail";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="min-h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} antialiased min-h-full w-full max-w-[100vw] overflow-x-hidden`}>
        <MotionProvider>
          <RouteTransitionProvider>
            <ScrollToTop />
            <PageLoader />
            <RouteTransitionOverlay />
            <ScrollProgress />
            <CursorTrail />
            <Navigation />
          {children}
          <Footer />
          </RouteTransitionProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
