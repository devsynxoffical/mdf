/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return [
      {
        // One canonical host: www → apex
        source: "/:path*",
        has: [{ type: "host", value: "www.milliondollarfunnels.us" }],
        destination: "https://milliondollarfunnels.us/:path*",
        permanent: true,
      },
      // URLs from the domain's earlier site that Google still crawls (URL Inspection, Nov 2026)
      { source: "/post/sales-funnels-for-coaches", destination: "/services", permanent: true },
      { source: "/blog/category/:slug*", destination: "/blog", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/workprof/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/video/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/frames/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
