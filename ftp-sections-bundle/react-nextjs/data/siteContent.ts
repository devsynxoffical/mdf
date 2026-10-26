export const HERO_WORDS = [
  "booked calls.",
  "qualified leads.",
  "applications.",
  "customers.",
];

export const LOADER_WORDS = [
  "Funnels",
  "AI",
  "Automations",
  "SMS",
  "Emails",
  "Workflows",
  "Landing Pages",
  "GHL",
  "ClickFunnels",
];

export interface FunnelItem {
  id: number;
  name: string;
  desc: string;
}

export const FUNNELS_LIST: FunnelItem[] = [
  { id: 8, name: "Mortgage AI System", desc: "Webinar funnel, mortgage leads" },
  { id: 7, name: "Rowan Security", desc: "Executive protection, high-ticket application" },
  { id: 6, name: "Inventiv", desc: "Invention showcase, lead funnel" },
  { id: 5, name: "Pluto CRM", desc: "Insurance CRM, free trial funnel" },
  { id: 4, name: "Bio-Optimization Made Easy", desc: "Long-form VSL sales letter" },
  { id: 2, name: "Growth Foundry", desc: "Local SEO audit, lead funnel" },
];

export interface FeaturedCase {
  category: string;
  title: string;
  desc: string;
  tags: string[];
  metric: string;
  metricLabel: string;
  color: string;
  slug: string;
}

export const FEATURED_CASES: FeaturedCase[] = [
  {
    category: "Coaching",
    title: "Lead form plus WhatsApp follow-up for a $5K DWY offer",
    desc: "$15,151 in ad spend, 527 leads, 253 booked calls and 23 clients closed at $5K each.",
    tags: ["Lead form", "WhatsApp", "Booked calls"],
    metric: "$115K",
    metricLabel: "revenue, 7.5x ROAS",
    color: "#c8f54a",
    slug: "DKNahy6TPwg",
  },
  {
    category: "Legal / MVA",
    title: "OTP-verified MVA leads replacing $150 PPL leads",
    desc: "1,079 verified leads at $18.94 each in 30 days, 62% show-up rate, 194 clients signed.",
    tags: ["OTP verification", "Lead funnel", "Follow-up"],
    metric: "$388K",
    metricLabel: "revenue, 19x ROAS",
    color: "#d6ccff",
    slug: "DLidtnUTjXL",
  },
  {
    category: "Low-ticket",
    title: "Low-ticket membership funnel with order bump and DFY upsell",
    desc: "2,063 memberships, 183 plug-and-play bundles and 30 high-ticket DFY programs in five days.",
    tags: ["LTO", "Order bump", "High-ticket upsell"],
    metric: "$150K",
    metricLabel: "in 5 days",
    color: "#ffbfe0",
    slug: "DQsBVdEkxYc",
  },
  {
    category: "Fitness",
    title: "Low-ticket to high-ticket funnel for a fitness brand",
    desc: "Client came after reading our low-ticket case studies. Front-end offer feeding a high-ticket sales process.",
    tags: ["Low-ticket", "VSL", "Sales calls"],
    metric: "$203K",
    metricLabel: "in 11 days",
    color: "#bfe3ff",
    slug: "DUsaqlQEsYB",
  },
  {
    category: "Roofing",
    title: "Exclusive roofing leads at scale",
    desc: "Scaled the three winning creatives, $18,583 spent in a month, more jobs than the sales team could handle.",
    tags: ["Lead gen", "Creative scaling", "CRM"],
    metric: "1,068",
    metricLabel: "leads at $17.40 each",
    color: "#ffd3c2",
    slug: "DNVeSkDyaNM",
  },
  {
    category: "Retreat",
    title: "Sold-out luxury retreat from one offer",
    desc: "$9,240 in spend, 1,189 leads at $7.77, 75 retreat packages at $2,500 plus 250 online passes.",
    tags: ["Offer", "Landing page", "Checkout"],
    metric: "$187K+",
    metricLabel: "retreat packages sold",
    color: "#c8f54a",
    slug: "DMYSXDbSZoO",
  },
];
