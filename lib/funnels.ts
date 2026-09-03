export type FunnelChassis =
  | "rose"
  | "midnight"
  | "silver"
  | "skyblue"
  | "graphite"
  | "cobalt"
  | "sand"
  | "indigo";

export interface FunnelDesign {
  id: string;
  num: string;
  name: string;
  category: string;
  title: string;
  body: string;
  image: string;
  scrollDuration: number;
  chassis: FunnelChassis;
  highlights: string[];
  stack: string[];
}

export const FUNNEL_CHASSIS = {
  rose: {
    body: "linear-gradient(180deg, #f0d0c2 0%, #d9a894 100%)",
    bodyEdge: "#c99482",
    lid: "linear-gradient(180deg, #f6ddd2 0%, #e4b7a4 100%)",
    lidEdge: "#d4a08e",
    keyboard: "#c9a090",
  },
  midnight: {
    body: "linear-gradient(180deg, #2a3850 0%, #121a2a 100%)",
    bodyEdge: "#080c14",
    lid: "linear-gradient(180deg, #33425c 0%, #1a2438 100%)",
    lidEdge: "#10182a",
    keyboard: "#141c2c",
  },
  silver: {
    body: "linear-gradient(180deg, #e8eaee 0%, #b4b9c2 100%)",
    bodyEdge: "#959ba4",
    lid: "linear-gradient(180deg, #f2f3f5 0%, #c5cad2 100%)",
    lidEdge: "#b0b5bd",
    keyboard: "#b6bac2",
  },
  skyblue: {
    body: "linear-gradient(180deg, #7eb8d6 0%, #3d7fa8 100%)",
    bodyEdge: "#2c6688",
    lid: "linear-gradient(180deg, #9ecce8 0%, #5a9ec4 100%)",
    lidEdge: "#4a8eb4",
    keyboard: "#4a8eb4",
  },
  graphite: {
    body: "linear-gradient(180deg, #4a5568 0%, #1a202c 100%)",
    bodyEdge: "#0f1419",
    lid: "linear-gradient(180deg, #5a6578 0%, #2d3748 100%)",
    lidEdge: "#1a202c",
    keyboard: "#2d3748",
  },
  cobalt: {
    body: "linear-gradient(180deg, #3b6fd4 0%, #1254ec 100%)",
    bodyEdge: "#0b3bb3",
    lid: "linear-gradient(180deg, #5a8ae8 0%, #1964d1 100%)",
    lidEdge: "#1254ec",
    keyboard: "#0b3bb3",
  },
  sand: {
    body: "linear-gradient(180deg, #e8e0d4 0%, #c4b8a8 100%)",
    bodyEdge: "#a89888",
    lid: "linear-gradient(180deg, #f0ebe3 0%, #d4ccc0 100%)",
    lidEdge: "#c4b8a8",
    keyboard: "#b8aca0",
  },
  indigo: {
    body: "linear-gradient(180deg, #6366f1 0%, #4338ca 100%)",
    bodyEdge: "#3730a3",
    lid: "linear-gradient(180deg, #818cf8 0%, #4f46e5 100%)",
    lidEdge: "#4338ca",
    keyboard: "#4338ca",
  },
} as const;

export const FUNNEL_DESIGNS: FunnelDesign[] = [
  {
    id: "mortgage-ai",
    num: "01",
    name: "AI Mortgage System 2.0",
    category: "Self-Filling Mortgage Pipeline",
    title: "Self-filling mortgage pipeline.",
    body: "Ads, offer, VSL, and booked consult — one connected mortgage acquisition path that fills itself without manual chase.",
    image: "/images/funnels/funnel-01.png",
    scrollDuration: 12,
    chassis: "rose",
    highlights: [
      "VSL-to-application flow built for mortgage compliance",
      "Automated consult booking tied to ad source",
      "Follow-up sequences that re-engage cold leads",
    ],
    stack: ["Meta Ads", "VSL", "CRM", "SMS", "Calendar"],
  },
  {
    id: "rowan-security",
    num: "02",
    name: "ROWAN Executive Protection",
    category: "Discreet Veteran-Led Security",
    title: "Discreet high-ticket security funnel.",
    body: "Veteran-led protection with a consult-first path — credibility, proof, and a clear schedule step for high-profile clients.",
    image: "/images/funnels/funnel-02.png",
    scrollDuration: 14,
    chassis: "midnight",
    highlights: [
      "Trust-first narrative for high-net-worth buyers",
      "Proof stack before any pricing conversation",
      "Private consult scheduling with qualification gates",
    ],
    stack: ["Landing", "Proof", "Application", "CRM", "Email"],
  },
  {
    id: "love-my-invention",
    num: "03",
    name: "Love My Invention",
    category: "Invention Launchpad & Licensing",
    title: "Invention launchpad & licensing.",
    body: "Idea to drawings to patents to next step — a long-form invention funnel that turns inventors into qualified pipeline.",
    image: "/images/funnels/funnel-03.png",
    scrollDuration: 20,
    chassis: "silver",
    highlights: [
      "Long-form education that pre-sells the offer",
      "Multi-step inventor qualification",
      "Upsell path from idea audit to full launch",
    ],
    stack: ["VSL", "Quiz", "Checkout", "Email", "Upsell"],
  },
  {
    id: "pluto-policies",
    num: "04",
    name: "Pluto Insurance",
    category: "Automated Policy Acquisition Engine",
    title: "Automated policy acquisition engine.",
    body: "Insurance CRM and follow-up on autopilot — from first lead to policy sold, renewals, and referrals without dropped sequences.",
    image: "/images/funnels/funnel-04.png",
    scrollDuration: 16,
    chassis: "skyblue",
    highlights: [
      "Quote-to-bind journey mapped end to end",
      "Renewal and referral triggers wired in CRM",
      "Speed-to-lead under 60 seconds on inbound",
    ],
    stack: ["Landing", "CRM", "SMS", "Voicemail", "Automation"],
  },
  {
    id: "scalewithads-b2b",
    num: "05",
    name: "ScaleWithAds Client Acquisition",
    category: "High-Ticket B2B Scaling Funnel",
    title: "High-ticket B2B scaling funnel.",
    body: "Agency-style acquisition for B2B offers — ad creative, application funnel, and sales handoff built to scale paid spend profitably.",
    image: "/images/funnels/funnel-05.png",
    scrollDuration: 26,
    chassis: "graphite",
    highlights: [
      "Application funnel that filters budget and fit",
      "Creative angles mapped to each ad set",
      "Sales-ready CRM stages with attribution intact",
    ],
    stack: ["Meta Ads", "Application", "VSL", "CRM", "Retargeting"],
  },
  {
    id: "lead-gen-funnel",
    num: "06",
    name: "Direct-Response Pipeline",
    category: "High-Converting Lead Gen Funnel",
    title: "High-converting lead gen funnel.",
    body: "Short, sharp direct-response architecture — hook, offer, form, thank-you, and immediate nurture for volume lead gen at controlled CPL.",
    image: "/images/funnels/funnel-06.png",
    scrollDuration: 8,
    chassis: "cobalt",
    highlights: [
      "Single-action landing built for paid traffic",
      "Instant SMS + email on form submit",
      "Thank-you page that extends the conversion path",
    ],
    stack: ["Landing", "Form", "SMS", "Email", "Pixels"],
  },
  {
    id: "summit-mastery",
    num: "07",
    name: "Global Summit & Course Funnel",
    category: "2,000+ Attendee Summit Architecture",
    title: "Global summit & course funnel.",
    body: "Registration, reminder, replay, and ascension — a full event funnel engineered for 2,000+ attendees and backend course sales.",
    image: "/images/funnels/funnel-07.png",
    scrollDuration: 22,
    chassis: "sand",
    highlights: [
      "Registration with urgency and social proof",
      "Pre-event nurture that drives live attendance",
      "Replay + offer stack for backend revenue",
    ],
    stack: ["Registration", "Email", "SMS", "Webinar", "Checkout"],
  },
  {
    id: "mdf-flagship",
    num: "08",
    name: "Million Dollar Funnel™ Core",
    category: "High-Ticket Client Acquisition Standard",
    title: "The Million Dollar Funnel™ standard.",
    body: "Our flagship install — low-ticket front end, qualification, booking, and follow-up wired as one predictable client acquisition machine.",
    image: "/images/funnels/funnel-08.png",
    scrollDuration: 17,
    chassis: "indigo",
    highlights: [
      "Low-ticket offer that funds paid acquisition",
      "Qualification before high-ticket conversations",
      "Full backend: A2P, SMS, email, voicemail, CRM",
    ],
    stack: ["Offer", "VSL", "Checkout", "CRM", "Automations"],
  },
];

/** First four shown on the homepage zig-zag section */
export const FEATURED_FUNNELS = FUNNEL_DESIGNS.slice(0, 4);
