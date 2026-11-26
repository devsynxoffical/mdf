import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/lib/cases";
import { SERVICE_PAGES } from "@/lib/services";
import { BLOG_POSTS } from "@/lib/blog";
import { ACTIVE_INDUSTRIES as INDUSTRIES } from "@/lib/industries";
import { SERVICE_LANDINGS } from "@/lib/serviceLandings";
import { STATIC_ROUTES, absoluteUrl } from "@/lib/seo";
import { execSync } from "node:child_process";

/** Last real change of the page's source files (git), so lastmod is honest instead of the build time. */
function lastChange(files: string[]): Date {
  try {
    const out = execSync(`git log -1 --format=%cI -- ${files.join(" ")}`, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    if (out) return new Date(out);
  } catch {}
  return new Date();
}

const staticFile = (path: string) => (path === "/" ? "app/page.tsx" : `app${path}/page.tsx`);

export default function sitemap(): MetadataRoute.Sitemap {
  const services = lastChange(["lib/services.ts"]);
  const landings = lastChange(["lib/serviceLandings.ts"]);
  const industries = lastChange(["lib/industries.ts"]);
  const cases = lastChange(["lib/cases.ts", "components/cases"]);
  return [
    ...STATIC_ROUTES.map((r) => ({
      url: absoluteUrl(r.path),
      lastModified: lastChange([staticFile(r.path)]),
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...SERVICE_PAGES.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      lastModified: services,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...SERVICE_LANDINGS.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      lastModified: landings,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...INDUSTRIES.map((i) => ({
      url: absoluteUrl(`/lead-generation/${i.slug}`),
      lastModified: industries,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...BLOG_POSTS.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: new Date(p.updated ?? p.published),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...CASE_STUDIES.map((c) => ({
      url: absoluteUrl(`/cases/${c.slug}`),
      lastModified: cases,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
