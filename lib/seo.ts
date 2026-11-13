import type { Metadata } from "next";
import { SITE } from "@/lib/site";

/** Canonical origin used for metadata, sitemap, robots and structured data. */
export const SITE_URL = "https://milliondollarfunnels.us";

export const SEO = {
  name: "Million Dollar Funnel™",
  shortName: "Million Dollar Funnel",
  tagline: "Predictable High-Ticket Client Acquisition",
  description:
    "Million Dollar Funnel™ builds done-for-you client acquisition systems for high-ticket service businesses: sales funnels, landing pages, VSL funnels, CRM automation, SMS and email follow-up, AI calling agents and paid ads — built, launched and managed for you.",
  ogImage: "/og-image.jpg",
  logo: "/images/mdf-logo-white-cropped.png",
  email: SITE.email,
  areaServed: ["United States", "United Kingdom", "Canada", "Australia"],
  keywords: [
    "high-ticket sales funnel",
    "done-for-you funnel agency",
    "client acquisition system",
    "funnel builder agency",
    "VSL funnel",
    "application funnel",
    "low-ticket funnel",
    "GoHighLevel automation",
    "ClickFunnels agency",
    "CRM automation",
    "SMS and email follow-up",
    "AI calling agent",
    "lead generation for coaches",
    "lead generation for agencies",
  ],
};

/** Services offered, used for structured data and llms.txt. */
export const SEO_SERVICES = [
  { name: "AC Funnels", description: "Move prospects from initial interest to application and booked call." },
  { name: "Landing Pages", description: "Focused pages built around one offer and one conversion objective." },
  { name: "VSL Funnels", description: "Video-led selling that educates prospects and moves them toward action." },
  { name: "Low-Ticket Funnels", description: "Sales pages, checkout, order bumps, upsells and downsells that convert cold traffic into buyers." },
  { name: "Bridge Funnels", description: "Warm and pre-frame cold traffic before it reaches the primary offer." },
  { name: "Application Funnels", description: "Collect the information sales needs while filtering for better-fit prospects." },
  { name: "Email & SMS Workflows", description: "Automated sequences for new leads, nurturing, reminders, follow-up and reactivation." },
  { name: "CRM Automation", description: "Move leads through the pipeline automatically based on their actions." },
  { name: "Appointment Workflows", description: "Confirmation, reminders, rescheduling and no-show follow-up." },
  { name: "AI Calling Agent", description: "Engage new leads automatically, ask qualifying questions and help book appointments." },
];

/** Every indexable static route, with crawl hints for the sitemap. */
export const STATIC_ROUTES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/work-proof", priority: 0.9, changeFrequency: "weekly" },
  { path: "/cases", priority: 0.9, changeFrequency: "weekly" },
  { path: "/funnels", priority: 0.8, changeFrequency: "monthly" },
  { path: "/book", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/income-disclosure", priority: 0.2, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/dmca", priority: 0.2, changeFrequency: "yearly" },
];

export const absoluteUrl = (path = "/") => new URL(path, SITE_URL).toString();

/** Per-page metadata with canonical URL, Open Graph and Twitter card filled in. */
export function pageMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description?: string;
}): Metadata {
  const desc = description ?? SEO.description;
  return {
    title,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      title,
      description: desc,
      url: path,
      siteName: SEO.name,
      type: "website",
      locale: "en_US",
      images: [{ url: SEO.ogImage, width: 1200, height: 630, alt: SEO.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [SEO.ogImage],
    },
  };
}

/* ---------- JSON-LD builders ---------- */

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": ORG_ID,
        name: SEO.name,
        alternateName: SEO.shortName,
        url: SITE_URL,
        logo: absoluteUrl(SEO.logo),
        image: absoluteUrl(SEO.ogImage),
        description: SEO.description,
        email: SEO.email,
        slogan: SEO.tagline,
        areaServed: SEO.areaServed.map((name) => ({ "@type": "Country", name })),
        knowsAbout: SEO.keywords,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Funnel, automation and client acquisition services",
          itemListElement: SEO_SERVICES.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.name, description: s.description, provider: { "@id": ORG_ID } },
          })),
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: SEO.email,
          url: absoluteUrl("/book"),
          availableLanguage: ["English"],
        },
      },
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: SITE_URL,
        name: SEO.name,
        description: SEO.description,
        publisher: { "@id": ORG_ID },
        inLanguage: "en-US",
      },
    ],
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}
