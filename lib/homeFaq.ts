/** Homepage FAQ (chat-style section). Shared with the FAQPage structured data. */

export interface FAQItem {
  q: string;
  a: string;
  cat: "build" | "auto" | "work";
  tags: string[];
}

export const FAQS_DATA: FAQItem[] = [
  {
    q: "Who is this actually for?",
    a: "High-ticket service providers already generating revenue who need a predictable system instead of referrals.",
    cat: "work",
    tags: ["High-ticket", "Service businesses"],
  },
  {
    q: "What does Million Dollar Funnel™ build?",
    a: "Conversion-focused funnels and the systems around them: landing pages, high-ticket and application funnels, VSLs, low-ticket and bridge funnels, automations, CRM workflows and AI calling.",
    cat: "build",
    tags: ["Funnels", "Pages", "Automation"],
  },
  {
    q: "What's included in the build?",
    a: "Landing architecture, A2P, AI automations, SMS and email, voicemail drops, and CRM — built and managed by us.",
    cat: "build",
    tags: ["Landing pages", "A2P", "CRM"],
  },
  {
    q: "Do you handle the technical side?",
    a: "All of it. You review the work; you never touch the tooling.",
    cat: "build",
    tags: ["Done for you"],
  },
  {
    q: "Will you work on my existing platform?",
    a: "Usually. We keep what converts and rebuild what leaks.",
    cat: "build",
    tags: ["Audit", "Rebuild", "Integrations"],
  },
  {
    q: "Do you build low-ticket funnels?",
    a: "Yes. We build the complete customer journey, including sales pages, checkout, order bumps, upsells, downsells and follow-up sequences.",
    cat: "build",
    tags: ["Checkout", "Upsell", "Follow-up"],
  },
  {
    q: "What does the AI Calling Agent do?",
    a: "It engages new leads automatically, asks qualifying questions, answers common questions and helps move suitable prospects toward a booked appointment.",
    cat: "auto",
    tags: ["AI calling", "Qualification"],
  },
  {
    q: "Can you set up my automations?",
    a: "Yes. We build workflows for lead nurturing, email, SMS, appointment reminders, no-shows, reactivation and CRM pipeline movement.",
    cat: "auto",
    tags: ["Email", "SMS", "CRM"],
  },
  {
    q: "Do you integrate with CRMs?",
    a: "Yes. We connect the funnel with your CRM, calendar, communication tools and tracking so every lead is accounted for.",
    cat: "auto",
    tags: ["CRM", "Calendar", "Tracking"],
  },
  {
    q: "Can you run the ads as well as the funnel?",
    a: "Yes, and we prefer it — both sides get built for each other.",
    cat: "work",
    tags: ["Meta Ads", "Google Ads"],
  },
  {
    q: "How fast does it go live?",
    a: "Live on real traffic in three to four weeks.",
    cat: "work",
    tags: ["3 to 4 weeks"],
  },
];
