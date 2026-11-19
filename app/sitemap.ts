import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/lib/cases";
import { SERVICE_PAGES } from "@/lib/services";
import { BLOG_POSTS } from "@/lib/blog";
import { INDUSTRIES } from "@/lib/industries";
import { SERVICE_LANDINGS } from "@/lib/serviceLandings";
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
    ...SERVICE_PAGES.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...SERVICE_LANDINGS.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...INDUSTRIES.map((i) => ({
      url: absoluteUrl(`/lead-generation/${i.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...BLOG_POSTS.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: new Date(p.published),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...CASE_STUDIES.map((c) => ({
      url: absoluteUrl(`/cases/${c.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
