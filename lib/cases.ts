export type CaseMetric = {
  value: string;
  label: string;
};

export type CaseStudy = {
  slug: string;
  niche: string;
  /** Short label for site header nav (e.g. "Coaching LTO") */
  navLabel: string;
  title: string;
  subtitle: string;
  summary: string;
  videoUrl: string;
  metrics: CaseMetric[];
  roiBadge?: {
    spendLabel: string;
    spendValue: string;
    collectedLabel: string;
    collectedValue: string;
    roasBadge: string;
  };
  beforeCard?: {
    tag?: string;
    subtitle?: string;
    title?: string;
    footer?: string;
  };
  afterCard?: {
    tag?: string;
    subtitle?: string;
    title?: string;
    footer?: string;
  };
  transformationSubtitle?: string;
  stickyBarText?: string;
  problemLead: string;
  problemBody: string[];
  jumpIn: string;
  cameWith: string[];
  weDid: string[];
  faq: { q: string; a: string }[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "1-52m-case-study",
    niche: "High-Ticket Scaling · 19 Months Run",
    navLabel: "$1.52M Case Study",
    title: "$1,520,000 Generated in 19 Months With MDF™",
    subtitle: "From Inconsistent Traction to a Multi-Million Dollar Acquisition Engine",
    summary:
      "A complete breakdown of how we scaled an offer to $1,520,000 in 19 months using the Million Dollar Funnel™ architecture, high-converting VSL flow, and automated backend infrastructure.",
    videoUrl: "https://www.youtube.com/watch?v=X-L8GQjHOYA",
    metrics: [
      { value: "$1,520,000", label: "Revenue Generated" },
      { value: "19 Months", label: "Scaling Timeline" },
      { value: "MDF™ Stack", label: "Turnkey Architecture" },
    ],
    roiBadge: {
      spendLabel: "Timeline",
      spendValue: "19 Months",
      collectedLabel: "Gross Revenue",
      collectedValue: "$1,520,000",
      roasBadge: "Multi-Million Scale",
    },
    beforeCard: {
      tag: "( 02 ) — Pre-MDF",
      subtitle: "Fragmented Funnel",
      title: "How The Business Looked Before MDF™",
      footer: "Result: Unpredictable conversion & wasted acquisition spend.",
    },
    afterCard: {
      tag: "( 03 ) — Post-MDF",
      subtitle: "19 Months Verified Scale",
      title: "The Million Dollar Funnel™ System Did",
      footer: "✓ $1,520,000 Generated in 19 Months · Automated End-To-End",
    },
    transformationSubtitle:
      "How engineering an institutional funnel backend produced $1,520,000 in revenue.",
    stickyBarText:
      "Ready to scale your business to multi-millions with the Million Dollar Funnel™ system?",
    problemLead: "Why Funnels Fail at Scale Without System Architecture",
    problemBody: [
      "When scaling past six figures, standard landing pages and disconnected ad campaigns quickly hit a ceiling. Conversion rates plummet and ad spend leaks through unoptimized touchpoints.",
      "The client possessed a strong market offer, but lacked the high-converting acquisition architecture and automated backend required to turn cold traffic into predictable, compounding revenue.",
      "The missing piece was an end-to-end engineered system: high-intent VSL framing, airtight tracking attribution, dynamic qualification, and persistent automated follow-ups.",
    ],
    jumpIn:
      "We engineered a complete Million Dollar Funnel™ system from scratch—connecting premium positioning, automated conversion mechanisms, and reliable scaling infrastructure.",
    cameWith: [
      "Struggling with inconsistent conversions from cold traffic",
      "Funnel lacked high-converting VSL structure and clear positioning",
      "Severe attribution blindspots and missing server-side tracking",
      "Manual lead follow-up causing high-intent prospects to leak",
      "Unable to scale ad spend profitably beyond initial plateaus",
    ],
    weDid: [
      "Engineered an institutional-grade VSL & acquisition funnel architecture",
      "Installed airtight conversion tracking, CAPI & full attribution pipelines",
      "Implemented automated omni-channel follow-up sequences (Email & SMS)",
      "Built dynamic qualification steps to filter and prep high-ticket prospects",
      "Generated $1,520,000 in total revenue across a 19-month scale",
      "Turnkey management and continuous conversion rate optimization",
    ],
    faq: [
      {
        q: "How Did This Funnel Generate $1,520,000 in 19 Months?",
        a: "By replacing disjointed pages with a synchronized Million Dollar Funnel™ stack: high-converting VSL presentation, friction-free opt-ins, smart qualification, automated multi-touch follow-ups, and precise tracking attribution.",
      },
      {
        q: "Can This System Be Applied to My Offer?",
        a: "Yes. The Million Dollar Funnel™ architecture is engineered specifically for high-ticket coaching, consulting, B2B services, and premium offer providers who need a predictable customer acquisition system.",
      },
      {
        q: "How Much Technical Work Is Required From Me?",
        a: "Zero technical work on your end. We design, write, build, integrate, and launch the entire funnel stack as a 100% turnkey service. You simply review and close qualified appointments.",
      },
      {
        q: "What Platforms and Tools Do You Use?",
        a: "We integrate custom-built high-speed web infrastructure, enterprise CRM systems, automated follow-up engines (Email/SMS/Voicemail), and direct ad platform API tracking.",
      },
      {
        q: "How Quickly Can We Get Started?",
        a: "Once you book a strategy session and we evaluate your offer, our team can architect, build, and deploy your custom Million Dollar Funnel™ stack in 14 to 21 days.",
      },
    ],
  },
  {
    slug: "coaching-lto",
    niche: "Coaching · Low-Ticket Offer",
    navLabel: "Coaching LTO",
    title: "The Real Magic Of Million Dollar Funnel™ System",
    subtitle: "This Is What We Are Proud Of…",
    summary:
      "A coaching client stuck in high-ticket hype. We rebuilt the backend, fixed tracking, and turned chaotic spend into 13,630 low-ticket sales at 3.32 ROAS.",
    videoUrl:
      "https://storage.googleapis.com/msgsndr/HWyar6Z3u3aF6ydghkCx/media/695da2543a532d67105ad96c.mp4",
    metrics: [
      { value: "13,630", label: "LTO Sales" },
      { value: "$847,307", label: "Revenue" },
      { value: "3.32", label: "ROAS" },
    ],
    roiBadge: {
      spendLabel: "Ad Spend",
      spendValue: "$255,130",
      collectedLabel: "Collected",
      collectedValue: "$847,307",
      roasBadge: "3.32x ROAS",
    },
    beforeCard: {
      tag: "( 02 ) — Pre-MDF",
      subtitle: "Leaking Funnel",
      title: "This Is How He Came To Us",
      footer: "Result: Inconsistent ad spend & lost conversions.",
    },
    afterCard: {
      tag: "( 03 ) — Post-MDF",
      subtitle: "3.32x Verified ROAS",
      title: "The Million Dollar Funnel™ System Did",
      footer: "✓ $847,307 Revenue Collected · 13,630 Sales at Scale",
    },
    transformationSubtitle:
      "How eliminating tracking friction and building a hardened backend unlocked 13,630 sales.",
    stickyBarText:
      "Ready to duplicate this 3.32 ROAS infrastructure for your offer?",
    problemLead: "Thinking It’s Insane? Definitely, It Is.",
    problemBody: [
      "This client was trying to scale his business but was struggling to sell his low-ticket offer consistently. Like many in the coaching industry, he was caught up in the “high-ticket” hype.",
      "His funnel couldn’t even sell the low-ticket offer reliably, making it impossible to scale to higher ticket clients.",
      "The real problem? A backend that wasn’t optimized for tracking, conversion, or follow-ups.",
    ],
    jumpIn:
      "We turned chaotic revenue into a predictable system with a high-converting backend built for scale.",
    cameWith: [
      "Struggling to sell his low-ticket offer consistently",
      "Funnel lacked proper tracking and flow",
      "Revenue leaking on every campaign",
      "Stuck in “high-ticket hype” without a foundation",
    ],
    weDid: [
      "Funnel rebuilt from the ground up with strategic architecture",
      "Automated follow-ups and clear tracking in place",
      "$255,130 spent → $847,307 revenue collected",
      "ROAS 3.32 → 13,630 low-ticket sales",
      "Predictable, scalable revenue without guesswork",
      "Competitors amazed by proper funnel execution",
    ],
    faq: [
      {
        q: "Who Do You Help With Million Dollar Funnel™ System?",
        a: "High-ticket service providers and coaches already generating revenue who need a predictable acquisition system — especially teams stuck selling low-ticket offers inconsistently before they can scale.",
      },
      {
        q: "What’s Included in Your Million Dollar Funnel™ System?",
        a: "Landing architecture, tracking, A2P, AI automations, SMS and email follow-ups, voicemail drops, and CRM — built so low-ticket volume can fund and feed high-ticket closes.",
      },
      {
        q: "Do You Handle the Technical Side of the Funnel?",
        a: "All of it. Strategy, build, integrations, and ongoing systems — you review the work; you don’t touch the tooling.",
      },
      {
        q: "Can You Help Me Get More Bookings With Ad Funnels?",
        a: "Yes. We prefer running ads and funnel together so traffic, offer, and backend follow-up are built for each other — not bolted on later.",
      },
      {
        q: "Do You Provide Customized Funnels on Existing Platforms?",
        a: "Usually. We keep what already converts, rebuild what leaks, and wire tracking so you can scale without guessing.",
      },
    ],
  },
];

export function getCaseBySlug(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

