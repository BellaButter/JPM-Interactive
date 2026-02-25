import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Redirect blog to content (article)
  async redirects() {
    return [
      { source: "/en/blog", destination: "/en/content", permanent: true },
      { source: "/th/blog", destination: "/th/content", permanent: true },
      { source: "/en/blog/:path*", destination: "/en/content", permanent: true },
      { source: "/th/blog/:path*", destination: "/th/content", permanent: true },
    ];
  },

  // Performance optimizations
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "@react-three/fiber",
      "@react-three/drei",
      "three",
      "gsap",
    ],
  },
};

export default nextConfig;
