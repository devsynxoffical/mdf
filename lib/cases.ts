export type CaseMetric = {
  value: string;
  label: string;
};

export type CaseStudy = {
  slug: string;
  niche: string;
  title: string;
  subtitle: string;
  summary: string;
  videoUrl: string;
  metrics: CaseMetric[];
  problemLead: string;
  problemBody: string[];
  jumpIn: string;
  cameWith: string[];
  weDid: string[];
  faq: { q: string; a: string }[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "coaching-lto",
    niche: "Coaching · Low-Ticket Offer",
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
