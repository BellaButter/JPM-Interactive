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

export const metadata: Metadata = {
  title: "JPM Interactive - Creative Technology Studio",
  description: "High-end interactive programs, mini games, graphic design, and motion graphics for innovative brands.",
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
