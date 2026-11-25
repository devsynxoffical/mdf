import { SERVICE_PAGES } from "@/lib/services";
import { BLOG_POSTS } from "@/lib/blog";
import { CASE_STUDIES } from "@/lib/cases";
import { ACTIVE_INDUSTRIES as INDUSTRIES } from "@/lib/industries";
import { SERVICE_LANDINGS } from "@/lib/serviceLandings";

export type PageCard = { href: string; title: string; desc?: string; tag?: string };

/** Card data for internal links, so related-content blocks stay consistent. */
const CARDS: Record<string, PageCard> = {
  ...Object.fromEntries(
    SERVICE_PAGES.map((s) => [`/services/${s.slug}`, { href: `/services/${s.slug}`, title: s.name, desc: s.metaDescription, tag: "Service" }])
  ),
  ...Object.fromEntries(
    BLOG_POSTS.map((p) => [`/blog/${p.slug}`, { href: `/blog/${p.slug}`, title: p.title, desc: p.metaDescription, tag: `Guide · ${p.readMinutes} min` }])
  ),
  ...Object.fromEntries(
    CASE_STUDIES.map((c) => [`/cases/${c.slug}`, { href: `/cases/${c.slug}`, title: c.title, desc: c.summary, tag: "Case study" }])
  ),
  ...Object.fromEntries(
    SERVICE_LANDINGS.map((s) => [`/services/${s.slug}`, { href: `/services/${s.slug}`, title: s.name, desc: s.metaDescription, tag: "Service" }])
  ),
  ...Object.fromEntries(
    INDUSTRIES.map((i) => [`/lead-generation/${i.slug}`, { href: `/lead-generation/${i.slug}`, title: `${i.name} lead generation`, desc: i.metaDescription, tag: "Industry" }])
  ),
  "/lead-generation": { href: "/lead-generation", title: "Lead generation by industry", desc: "HVAC, chiropractic, home improvement, pressure washing, mortgage and solar funnels with real receipts.", tag: "Industries" },
  "/sales-funnel-agency": { href: "/sales-funnel-agency", title: "Sales funnel agency", desc: "Funnels built, launched and improved for you, with published prices and case studies.", tag: "Service" },
  "/cases": { href: "/cases", title: "Case studies", desc: "Published client results, including 13,630 sales from one funnel and $1.52M in 19 months.", tag: "Proof" },
  "/work-proof": { href: "/work-proof", title: "40 verified ad & CRM receipts", desc: "Live Meta Ads and CRM screenshots, plus cost-per-lead benchmarks by niche.", tag: "Proof" },
  "/work-proof#benchmarks": { href: "/work-proof#benchmarks", title: "Cost-per-lead benchmarks by niche", desc: "What leads actually cost on Meta Ads across our published receipts.", tag: "Data" },
  "/funnels": { href: "/funnels", title: "Sales funnel examples", desc: "Eight live funnels we built, with the strategy and stack behind each.", tag: "Examples" },
  "/services": { href: "/services", title: "All services", desc: "Every funnel, automation and AI follow-up service we build.", tag: "Services" },
  "/book": { href: "/book", title: "Book a strategy call", desc: "15–20 minutes to review your offer, funnel and follow-up.", tag: "Next step" },
};

/** Card text without em dashes (house style), whatever the source page uses. */
const plain = (s?: string) => (s ? s.replace(/\s*—\s*/g, ", ") : s);

export const pageCard = (href: string, fallbackTitle?: string): PageCard => {
  const c = CARDS[href] ?? { href, title: fallbackTitle ?? href };
  return { ...c, title: plain(c.title) as string, desc: plain(c.desc) };
};
