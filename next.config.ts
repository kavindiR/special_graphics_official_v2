import type { NextConfig } from "next";

// Check if we're building for GitHub Pages
const isGithubPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGithubPages ? '/special-graphics-official' : '';

const nextConfig: NextConfig = {
  // GitHub Pages requires static export and basePath
  ...(isGithubPages && {
    output: 'export',
    basePath: basePath,
    images: {
      unoptimized: true, // GitHub Pages doesn't support Next.js image optimization
    },
  }),
  // Vercel configuration (default)
  ...(!isGithubPages && {
    images: {
      // Allow images from the same domain, Unsplash, and Picsum
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'picsum.photos',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'source.unsplash.com',
          pathname: '/**',
        },
      ],
      // Ensure images are optimized
      formats: ['image/avif', 'image/webp'],
      // Enable image optimization for production
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      // Vercel image optimization settings
      minimumCacheTTL: 60,
      dangerouslyAllowSVG: true,
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
  }),
  // Common configuration
  trailingSlash: false,
  reactStrictMode: true,
  // Production optimizations
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
