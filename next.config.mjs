/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the site is plain HTML/CSS/JS served by Hostinger (Apache), no Node server.
  output: "export",
  reactStrictMode: true,
  transpilePackages: ["three"],
  images: {
    // No image server on static hosting; source images are already compressed WebP/AVIF.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  // Redirects, cache headers and clean URLs live in public/.htaccess (Hostinger / Apache).
};

export default nextConfig;
