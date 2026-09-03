export type WorkProofTag = "Meta Ads" | "CRM" | "Scale";

export type WorkProofItem = {
  id: string;
  src: string;
  tag: WorkProofTag;
  niche: string;
  metric: string;
  metricLabel: string;
  note: string;
  size: "sm" | "md" | "lg" | "xl";
};

export type WorkProofDetail = WorkProofItem & {
  displayName: string;
  category: string;
  headline: string;
  body: string;
  services: string[];
  market: string;
  expandBg: string;
};

const COLORS = [
  "#FA4D09",
  "#1254EC",
  "#0B1437",
  "#2D1B54",
  "#E8431E",
  "#0F3332",
  "#3A4B62",
  "#0B3BB3",
  "#7C2D12",
  "#134E4A",
  "#4C1D95",
  "#1E3A5F",
  "#9A3412",
  "#0C4A6E",
  "#312E81",
  "#14532D",
  "#831843",
  "#1C1917",
  "#164E63",
  "#3730A3",
] as const;

/** Curated receipts from /public/workproof — real Meta + CRM dashboards. */
export const WORK_PROOF: WorkProofItem[] = [
  {
    id: "wp-001",
    src: "/workproof/wp-001.png",
    tag: "Meta Ads",
    niche: "Roofing",
    metric: "$3.75",
    metricLabel: "cost per lead",
    note: "25 form leads in a day — $93 spent.",
    size: "md",
  },
  {
    id: "wp-006",
    src: "/workproof/wp-006.png",
    tag: "Meta Ads",
    niche: "Roofing",
    metric: "$14.58",
    metricLabel: "CPL · 154 leads",
    note: "While owners were still paying $80+ elsewhere.",
    size: "lg",
  },
  {
    id: "wp-016",
    src: "/workproof/wp-016.png",
    tag: "CRM",
    niche: "Roofing · TX",
    metric: "$77K",
    metricLabel: "closed · 30 days",
    note: "Meta ads → roofing funnel → booked jobs.",
    size: "xl",
  },
  {
    id: "wp-026",
    src: "/workproof/wp-026.png",
    tag: "Scale",
    niche: "Mortgage",
    metric: "10,172",
    metricLabel: "leads · $8.06 CPL",
    note: "$82K spent. Same leads agencies resell for $80–$100.",
    size: "xl",
  },
  {
    id: "wp-041",
    src: "/workproof/wp-041.png",
    tag: "CRM",
    niche: "Roofing · FL",
    metric: "$111K",
    metricLabel: "won · 31 days",
    note: "Built from the ground up — 26 won opportunities.",
    size: "lg",
  },
  {
    id: "wp-003",
    src: "/workproof/wp-003.png",
    tag: "Meta Ads",
    niche: "Lead Gen",
    metric: "Live",
    metricLabel: "ads manager",
    note: "Campaign-level cost & result cut.",
    size: "sm",
  },
  {
    id: "wp-008",
    src: "/workproof/wp-008.png",
    tag: "Meta Ads",
    niche: "Service",
    metric: "CPL",
    metricLabel: "proof cut",
    note: "Million Dollar Media™ column view.",
    size: "md",
  },
  {
    id: "wp-012",
    src: "/workproof/wp-012.png",
    tag: "Meta Ads",
    niche: "Roofing",
    metric: "Daily",
    metricLabel: "spend control",
    note: "Tight budgets. Measurable leads.",
    size: "sm",
  },
  {
    id: "wp-018",
    src: "/workproof/wp-018.png",
    tag: "CRM",
    niche: "Pipeline",
    metric: "Won",
    metricLabel: "revenue view",
    note: "Dashboard receipts — not screenshots of vibes.",
    size: "md",
  },
  {
    id: "wp-022",
    src: "/workproof/wp-022.png",
    tag: "Meta Ads",
    niche: "Volume",
    metric: "Ads",
    metricLabel: "manager cut",
    note: "Multi-campaign visibility.",
    size: "sm",
  },
  {
    id: "wp-028",
    src: "/workproof/wp-028.png",
    tag: "Scale",
    niche: "Lead Gen",
    metric: "High",
    metricLabel: "volume run",
    note: "When the machine is warmed up.",
    size: "md",
  },
  {
    id: "wp-032",
    src: "/workproof/wp-032.png",
    tag: "Meta Ads",
    niche: "Service",
    metric: "CPL",
    metricLabel: "efficiency",
    note: "Cost per result, not vanity reach.",
    size: "sm",
  },
  {
    id: "wp-035",
    src: "/workproof/wp-035.png",
    tag: "CRM",
    niche: "Ops",
    metric: "Pipeline",
    metricLabel: "status",
    note: "Open vs won — in the clear.",
    size: "md",
  },
  {
    id: "wp-038",
    src: "/workproof/wp-038.png",
    tag: "Meta Ads",
    niche: "Lead Gen",
    metric: "Spend",
    metricLabel: "vs results",
    note: "Where every dollar went.",
    size: "sm",
  },
  {
    id: "wp-042",
    src: "/workproof/wp-042.png",
    tag: "CRM",
    niche: "Roofing",
    metric: "Closed",
    metricLabel: "jobs",
    note: "Revenue that hit the bank.",
    size: "lg",
  },
  {
    id: "wp-045",
    src: "/workproof/wp-045.png",
    tag: "Meta Ads",
    niche: "Service",
    metric: "Form",
    metricLabel: "leads",
    note: "Qualified inbound at scale.",
    size: "sm",
  },
  {
    id: "wp-048",
    src: "/workproof/wp-048.png",
    tag: "Scale",
    niche: "Multi",
    metric: "Multi",
    metricLabel: "campaign",
    note: "Stacked accounts. Same system.",
    size: "md",
  },
  {
    id: "wp-052",
    src: "/workproof/wp-052.png",
    tag: "CRM",
    niche: "Funnel",
    metric: "Conv.",
    metricLabel: "rate view",
    note: "From click to calendar.",
    size: "sm",
  },
  {
    id: "wp-055",
    src: "/workproof/wp-055.png",
    tag: "Meta Ads",
    niche: "Lead Gen",
    metric: "CTR",
    metricLabel: "efficiency",
    note: "Creative that earns its spend.",
    size: "md",
  },
  {
    id: "wp-058",
    src: "/workproof/wp-058.png",
    tag: "CRM",
    niche: "Revenue",
    metric: "Won",
    metricLabel: "opportunities",
    note: "The only scoreboard that matters.",
    size: "lg",
  },
];

type DetailMeta = {
  displayName: string;
  category: string;
  headline: string;
  body: string;
  services: string[];
  market: string;
};

/** Presentation layer — unique niches, stacks, and copy per receipt. */
const DETAIL_META: Record<string, DetailMeta> = {
  "wp-001": {
    displayName: "Local Services",
    category: "Meta Ads · Form Leads",
    headline: "Same-day form leads at $3.75 CPL.",
    body: "A tight Meta form-lead setup for local service demand — spend capped, creative rotated, and SMS follow-up wired so every lead gets answered in minutes, not hours.",
    services: ["META ADS", "LANDING", "FORM LEADS", "SMS FOLLOW-UP"],
    market: "UNITED STATES",
  },
  "wp-006": {
    displayName: "Direct Response",
    category: "Meta Ads · CPL Efficiency",
    headline: "154 leads without $80+ agency CPLs.",
    body: "Offer testing and creative iteration brought cost-per-lead down while volume stayed high — proof that paid traffic can beat reseller pricing without burning budget.",
    services: ["META ADS", "CREATIVE", "OFFER TESTING", "RETARGETING"],
    market: "UNITED STATES",
  },
  "wp-016": {
    displayName: "Home Services · TX",
    category: "CRM · Closed Revenue",
    headline: "$77K closed in 30 days from booked jobs.",
    body: "Ads feed the funnel, the funnel feeds CRM stages, and sales closes booked jobs — full attribution from click to cash in a Texas home-services install.",
    services: ["CRM", "PIPELINE", "BOOKED JOBS", "ATTRIBUTION"],
    market: "TEXAS, USA",
  },
  "wp-026": {
    displayName: "Mortgage Pipeline",
    category: "Scale · High Volume",
    headline: "10,172 mortgage leads at $8.06 CPL.",
    body: "High-volume mortgage acquisition with VSL + CRM handoff. Same lead quality agencies mark up for $80–$100 — delivered at a fraction of the cost.",
    services: ["META ADS", "VSL FUNNEL", "CRM", "VOLUME SCALE"],
    market: "UNITED STATES",
  },
  "wp-041": {
    displayName: "Home Services · FL",
    category: "CRM · Won Opportunities",
    headline: "$111K won in 31 days — 26 opportunities.",
    body: "Florida home-services CRM rebuilt from scratch: clear open vs won stages, follow-up sequences, and a funnel that fills the calendar with closable jobs.",
    services: ["CRM", "SALES STAGES", "FUNNEL", "FOLLOW-UP"],
    market: "FLORIDA, USA",
  },
  "wp-003": {
    displayName: "Campaign Ops",
    category: "Meta Ads · Manager Cut",
    headline: "Live ads-manager cost & result cut.",
    body: "Campaign-level visibility into spend, results, and cost per outcome — the operating view we use to decide what scales and what gets killed.",
    services: ["META ADS", "CAMPAIGN OPS", "TRACKING", "BUDGETING"],
    market: "UNITED STATES",
  },
  "wp-008": {
    displayName: "Service CPL Desk",
    category: "Meta Ads · Column Proof",
    headline: "Million Dollar Media™ column view.",
    body: "Service-niche Meta columns cut to show cost per lead clearly — no vanity metrics, just the numbers that decide whether the offer stays live.",
    services: ["META ADS", "REPORTING", "CPL CONTROL", "MEDIA BUY"],
    market: "UNITED STATES",
  },
  "wp-012": {
    displayName: "Budget Control",
    category: "Meta Ads · Daily Spend",
    headline: "Tight budgets. Measurable leads.",
    body: "Daily spend caps with lead volume you can audit — built for operators who need predictability, not surprise invoices.",
    services: ["META ADS", "BUDGET CAPS", "FORM LEADS", "OPTIMIZATION"],
    market: "UNITED STATES",
  },
  "wp-018": {
    displayName: "Revenue Pipeline",
    category: "CRM · Won View",
    headline: "Dashboard receipts — not screenshots of vibes.",
    body: "CRM revenue view that shows won deals in the clear. Built so founders and sales leads argue from the same scoreboard.",
    services: ["CRM", "REVENUE", "WON DEALS", "DASHBOARD"],
    market: "UNITED STATES",
  },
  "wp-022": {
    displayName: "Multi-Campaign Desk",
    category: "Meta Ads · Volume View",
    headline: "Multi-campaign visibility at a glance.",
    body: "Stacked campaigns under one ads-manager cut — reach, results, and cost side by side so scaling decisions stay grounded.",
    services: ["META ADS", "MULTI-ADSET", "SCALE RULES", "REPORTING"],
    market: "UNITED STATES",
  },
  "wp-028": {
    displayName: "Warm Volume Run",
    category: "Scale · Lead Gen",
    headline: "High-volume run when the machine is warm.",
    body: "Once creative and offer hold, this is what scaled lead gen looks like — volume without losing unit economics.",
    services: ["SCALE", "LEAD GEN", "CREATIVE", "FUNNEL"],
    market: "UNITED STATES",
  },
  "wp-032": {
    displayName: "CPL Efficiency",
    category: "Meta Ads · Cost Per Result",
    headline: "Cost per result, not vanity reach.",
    body: "Service traffic optimized to the result that matters — leads and booked actions, not impressions that look good in a screenshot.",
    services: ["META ADS", "CPL", "AUDIENCE", "CREATIVE TEST"],
    market: "UNITED STATES",
  },
  "wp-035": {
    displayName: "Ops Pipeline",
    category: "CRM · Status Clarity",
    headline: "Open vs won — in the clear.",
    body: "Ops-facing CRM statuses so nothing sits in limbo. Every opportunity has a stage, an owner, and a next action.",
    services: ["CRM", "OPS", "STAGES", "HANDOFF"],
    market: "UNITED STATES",
  },
  "wp-038": {
    displayName: "Spend vs Results",
    category: "Meta Ads · Attribution",
    headline: "Where every dollar went.",
    body: "Spend mapped against outcomes so you can see which campaigns earn their keep and which ones get cut.",
    services: ["META ADS", "ATTRIBUTION", "SPEND AUDIT", "OPTIMIZATION"],
    market: "UNITED STATES",
  },
  "wp-042": {
    displayName: "Closed Jobs Desk",
    category: "CRM · Banked Revenue",
    headline: "Revenue that hit the bank.",
    body: "Closed-job CRM view for home services — proof of completed work and collected revenue, not just pipeline optimism.",
    services: ["CRM", "CLOSED JOBS", "REVENUE", "HOME SERVICES"],
    market: "UNITED STATES",
  },
  "wp-045": {
    displayName: "Inbound Forms",
    category: "Meta Ads · Qualified Leads",
    headline: "Qualified inbound at scale.",
    body: "Form lead volume with qualification baked in — so sales time goes to prospects who can actually buy.",
    services: ["META ADS", "FORMS", "QUALIFICATION", "SPEED-TO-LEAD"],
    market: "UNITED STATES",
  },
  "wp-048": {
    displayName: "Stacked Accounts",
    category: "Scale · Multi-Campaign",
    headline: "Stacked accounts. Same system.",
    body: "Multiple campaigns running under one Million Dollar Funnel™ architecture — shared tracking, shared follow-up, shared scoreboard.",
    services: ["SCALE", "MULTI-ACCOUNT", "FUNNEL", "CRM"],
    market: "UNITED STATES",
  },
  "wp-052": {
    displayName: "Funnel Conversion",
    category: "CRM · Click to Calendar",
    headline: "From click to calendar.",
    body: "Conversion-rate view across the path — ad click, landing, application, and booked call in one chain you can tighten weekly.",
    services: ["CRM", "FUNNEL", "BOOKING", "CONVERSION"],
    market: "UNITED STATES",
  },
  "wp-055": {
    displayName: "Creative Efficiency",
    category: "Meta Ads · CTR Proof",
    headline: "Creative that earns its spend.",
    body: "CTR and efficiency cuts that show which angles pull attention worth paying for — and which creatives get retired.",
    services: ["META ADS", "CREATIVE", "CTR", "ANGLE TESTING"],
    market: "UNITED STATES",
  },
  "wp-058": {
    displayName: "High-Ticket Revenue",
    category: "CRM · Won Opportunities",
    headline: "Won opportunities — the only scoreboard.",
    body: "High-ticket CRM scoreboard from qualification through booking to close. Built for operators who measure won deals, not vanity pipeline.",
    services: ["CRM", "HIGH-TICKET", "QUALIFICATION", "BOOKING"],
    market: "UNITED STATES",
  },
};

function peerReceipts(item: WorkProofItem, count = 2): string[] {
  const peers = WORK_PROOF.filter(
    (p) => p.tag === item.tag && p.id !== item.id
  ).slice(0, count);
  return [item.src, ...peers.map((p) => p.src)];
}

export const WORK_PROOF_DETAILED: WorkProofDetail[] = WORK_PROOF.map(
  (item, i) => {
    const meta = DETAIL_META[item.id] ?? {
      displayName: item.niche,
      category: `${item.tag} · Proof`,
      headline: `${item.metric} — ${item.metricLabel}.`,
      body: item.note,
      services: [item.tag.toUpperCase(), "FUNNEL", "TRACKING"],
      market: "UNITED STATES",
    };
    return {
      ...item,
      ...meta,
      expandBg: COLORS[i % COLORS.length],
    };
  }
);

/** Homepage featured subset (six distinct niches + colors). */
export const WORK_PROOF_FEATURED_IDS = [
  "wp-001",
  "wp-026",
  "wp-016",
  "wp-041",
  "wp-006",
  "wp-058",
] as const;

export function getWorkProofFeatured(): WorkProofDetail[] {
  return WORK_PROOF_FEATURED_IDS.map(
    (id) => WORK_PROOF_DETAILED.find((p) => p.id === id)!
  ).filter(Boolean);
}

export function getWorkProofReceipts(item: WorkProofDetail | WorkProofItem): string[] {
  return peerReceipts(item);
}

export const WORK_PROOF_FILTERS = [
  "All",
  "Meta Ads",
  "CRM",
  "Scale",
] as const;
