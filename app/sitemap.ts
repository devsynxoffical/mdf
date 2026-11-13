import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/lib/cases";
import { STATIC_ROUTES, absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...STATIC_ROUTES.map((r) => ({
      url: absoluteUrl(r.path),
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...CASE_STUDIES.map((c) => ({
      url: absoluteUrl(`/cases/${c.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
