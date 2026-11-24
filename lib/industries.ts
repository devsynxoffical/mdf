import type { Receipt } from "@/components/leads/ReceiptGallery";
import type { ProcessStep } from "@/components/leads/ProcessTabs";

/**
 * Industry lead-generation pages. Every figure below is read directly from the
 * ad-account / CRM screenshot it cites (see /work-proof). Calculator defaults that are
 * not from a receipt are labelled as example inputs on the page.
 */
/** Shared shape for rich landing pages (industries and services). */
export type Landing = Industry;
export type Industry = {
  slug: string;
  name: string;
  keyword: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  stats: { value: string; label: string }[];
  receipts?: Receipt[];
  receiptsIntro?: string;
  problems: { title: string; body: string }[];
  /** Optional override for the problems heading. */
  problemsTitle?: string;
  steps: ProcessStep[];
  showcase?: { src: string; title: string; body: string; href: string; alt: string; height: number };
  calculator: { defaults: { budget: number; cpl: number; book: number; close: number; value: number }; note: string; valueLabel: string };
  comparison?: { heading: string; intro: string; columns: [string, string, string]; rows: [string, string, string][] };
  faq: { q: string; a: string }[];
  related: string[];
  /** Keyword owned by a sister site: page becomes a noindexed teaser that links there (keyword plan, 20 Nov 2026). */
  partner?: { site: string; url: string; blurb: string };
  /** One real case result with a clear call to action (Top 10 plan, 23 Nov 2026). */
  caseResult?: { eyebrow: string; title: string; body: string; metrics: { value: string; label: string }[]; href: string; linkLabel: string };
  /** Second hero paragraph, a short question and answer under the H1 intro (content file, 23 Nov 2026). */
  introMore?: { q: string; a: string };
  /** Extra list shown under the process steps (content file, 23 Nov 2026). */
  extra?: { title: string; items: string[] };
  /** Hub-card override when the first receipt is not from this industry. */
  hubCard?: { figure: string; detail: string };
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "roofing",
    name: "Roofing",
    partner: {
      site: "RoofingSystems.co",
      url: "https://roofingsystems.co/",
      blurb: "Roofing lead generation, roofing ads and roofing CRM are handled by our sister brand RoofingSystems.co, a team that works only with roofing companies.",
    },
    keyword: "roofing lead generation",
    metaTitle: "Roofing Lead Generation: Exclusive Leads & Booked Jobs | MDF™",
    metaDescription:
      "Roofing lead generation with Meta Ads, a roofing funnel and CRM follow-up. Real client dashboards: $111.2K and $77.1K in won jobs in about a month.",
    eyebrow: "Roofing lead generation",
    h1: "Roofing Lead Generation That Turns Homeowners Into Signed Jobs",
    intro:
      "Exclusive homeowner leads from Meta Ads, a roofing funnel that qualifies them, and CRM follow-up that books inspections. You own the ad account, the pipeline and every lead.",
    stats: [
      { value: "$111.2K", label: "Won · Florida roofer · 31 days" },
      { value: "$77.1K", label: "Won · Texas roofer · 32 days" },
      { value: "$11.27", label: "Cost per lead · home services" },
      { value: "100%", label: "Exclusive · leads never resold" },
    ],
    receiptsIntro:
      "These are screenshots from the client CRM and ad accounts, not mock-ups. Click any card to inspect the full screenshot.",
    receipts: [
      {
        id: "roof-fl",
        src: "/workprof/wp-023.webp",
        figure: "$111.2K won",
        label: "Florida roofing company · CRM",
        detail: "26 won jobs from 142 opportunities, $511.2K total pipeline value.",
        period: "Jan 12 – Feb 11, 2026",
        tag: "CRM",
      },
      {
        id: "roof-tx",
        src: "/workprof/wp-024.webp",
        figure: "$77.1K won",
        label: "Texas roofing company · CRM",
        detail: "19 won jobs from 164 opportunities, $582.6K total pipeline value.",
        period: "Jan 10 – Feb 10, 2026",
        tag: "CRM",
      },
      {
        id: "roof-ads",
        src: "/workprof/wp-005.webp",
        figure: "$11.27 per lead",
        label: "Florida home services · Meta Ads",
        detail: "211 website leads on $2,377.62 spend across roofing, gutters and solar ads.",
        period: "May 9 – May 15, 2026",
      },
    ],
    problems: [
      {
        title: "Shared leads",
        body: "Lead marketplaces sell the same homeowner to several roofers, so the job goes to whoever calls first or quotes lowest.",
      },
      {
        title: "Slow follow-up",
        body: "Storm-season leads go cold within hours. Without instant text and call follow-up, most never pick up when the estimator finally rings.",
      },
      {
        title: "No pipeline visibility",
        body: "If you cannot see which ads produced inspections and signed jobs, you cannot tell which spend to raise and which to cut.",
      },
    ],
    steps: [
      {
        title: "Offer & targeting",
        body: "We build the ad offer around what homeowners in your service area actually respond to, such as free inspections, storm damage checks or financing.",
        points: ["Service-area and homeowner targeting", "Offer and creative tested per market", "Separate campaigns for repair and replacement"],
      },
      {
        title: "Roofing funnel",
        body: "A short funnel that qualifies before the lead reaches you: property type, issue, timeline and contact details.",
        points: ["Mobile-first quiz or form", "Qualification questions you choose", "Instant confirmation page with next steps"],
      },
      {
        title: "Speed-to-lead follow-up",
        body: "Every new lead gets an instant text and email, and your team gets an alert to call while the homeowner is still interested.",
        points: ["Instant SMS and email", "Missed-call text back", "Reminder sequence until an inspection is booked"],
      },
      {
        title: "Pipeline & reporting",
        body: "Leads land in a CRM pipeline from new lead to inspection, estimate and won job, so revenue ties back to ad spend.",
        points: ["Opportunity pipeline with job values", "Won revenue per campaign", "Weekly numbers you can check yourself"],
      },
    ],
    showcase: {
      src: "/images/funnels/funnel-07.webp",
      height: 10352,
      title: "A local-business lead funnel we built",
      body: "Video, a free audit offer and a booking step for local service businesses. It uses the same structure as our home-service lead funnels: one clear offer, proof, and a short step to book.",
      href: "/funnels",
      alt: "Local-business lead funnel built by Million Dollar Funnel",
    },
    calculator: {
      defaults: { budget: 3000, cpl: 11.27, book: 30, close: 15, value: 4200 },
      note: "Cost per lead defaults to the $11.27 home-services receipt above. Average job value defaults to about $4,200, close to the Florida ($111.2K ÷ 26) and Texas ($77.1K ÷ 19) dashboards. Booking and close rates are example inputs, so replace them with yours.",
      valueLabel: "Average roofing job value",
    },
    comparison: {
      heading: "Your own lead system vs buying shared roofing leads",
      intro: "The difference is who owns the asset and how many roofers get the same homeowner.",
      columns: ["", "Shared lead marketplaces", "Your own system (what we build)"],
      rows: [
        ["Exclusivity", "Often sold to several roofers", "Every lead is yours alone"],
        ["Ownership", "You rent access to leads", "You own the ad account, funnel and CRM data"],
        ["Follow-up", "Up to you, usually manual", "Instant text, email and reminders built in"],
        ["Cost visibility", "Price per lead set by the seller", "Real cost per lead and per job in your dashboard"],
      ],
    },
    faq: [
      {
        q: "How much do roofing leads cost with Meta Ads?",
        a: "It depends on market, offer and season. In the Florida home-services account shown above, website leads cost $11.27 on average over the week. We share your real cost per lead from your own ad account every week.",
      },
      {
        q: "Are the roofing leads exclusive?",
        a: "Yes. The ads run in your ad account and leads go into your CRM. Nobody else receives them.",
      },
      {
        q: "Do you work with roofers outside Florida and Texas?",
        a: "Yes. The receipts above are from Florida and Texas, but the same system works anywhere Meta Ads can target homeowners in your service area.",
      },
      {
        q: "How fast can we start getting leads?",
        a: "Once the offer, funnel and follow-up are approved and the ad account is connected, campaigns can go live. Most of the setup time is in getting the offer and follow-up right, not the ads themselves.",
      },
      {
        q: "Do I need a CRM already?",
        a: "No. We can set up the pipeline, follow-up and reporting for you, usually in GoHighLevel, or connect to the CRM you already use.",
      },
    ],
    related: ["/lead-generation/solar", "/services/ai-appointment-setter", "/blog/speed-to-lead", "/work-proof"],
  },
  {
    slug: "mortgage",
    name: "Mortgage",
    keyword: "mortgage lead generation",
    metaTitle: "Mortgage Lead Generation for Brokers & Loan Officers | MDF™",
    metaDescription:
      "Mortgage lead generation with your own Meta Ads, funnel and CRM. Real receipt: 10,172 mortgage leads at $8.06 each in one month. Exclusive leads, never resold.",
    eyebrow: "Mortgage lead generation",
    h1: "Mortgage Lead Generation: Exclusive Leads at Your Own Cost per Lead",
    intro:
      "Stop renting pay-per-lead lists. We build your own mortgage lead machine with Meta Ads, a compliant funnel and automated follow-up, so refinance, purchase and investor leads come to you and only you.",
    stats: [
      { value: "10,172", label: "Mortgage leads · one month" },
      { value: "$8.06", label: "Cost per lead · Apr 2026" },
      { value: "$81,984", label: "Ad spend managed · Apr 2026" },
      { value: "100%", label: "Exclusive · your ad account" },
    ],
    receiptsIntro: "Screenshots from live ad accounts. Click any card to inspect the full receipt.",
    receipts: [
      {
        id: "mort-scale",
        src: "/workprof/wp-008.webp",
        figure: "10,172 leads",
        label: "Mortgage lead generation · Meta Ads",
        detail: "$81,984 spend across 8 campaigns at an $8.06 average cost per lead.",
        period: "Apr 1 – Apr 30, 2026",
        tag: "Scale",
      },
      {
        id: "mort-ppl",
        src: "/workprof/wp-006.webp",
        figure: "$15.26 per lead",
        label: "Mortgage leads for a PPL agency",
        detail: "117 website leads on $1,785.98 in the visible campaign view.",
        period: "May 2026",
      },
    ],
    problems: [
      {
        title: "Recycled PPL leads",
        body: "Pay-per-lead vendors can sell the same borrower to several loan officers, so you are racing competitors from the first call.",
      },
      {
        title: "Leads that never answer",
        body: "Mortgage shoppers fill in a form and move on. Without instant follow-up across text, email and calls, contact rates collapse.",
      },
      {
        title: "No control over cost",
        body: "When someone else runs the ads, you cannot see the real cost per lead or improve it. You only see the invoice.",
      },
    ],
    steps: [
      {
        title: "Loan-type campaigns",
        body: "Separate campaigns for refinance, first-home buyers and investors, each with its own angle and qualifying questions.",
        points: ["Campaigns per loan type", "Compliance-aware ad copy", "Creative tested per audience"],
      },
      {
        title: "Qualifying funnel",
        body: "A short application-style funnel that captures loan purpose, timeline and contact details before a lead reaches your team.",
        points: ["Mobile-first application flow", "VSL or explainer option", "Phone verification if needed"],
      },
      {
        title: "Automated follow-up",
        body: "Instant SMS and email plus a reminder sequence, so borrowers book a call while they are still shopping.",
        points: ["Instant text and email", "Calendar booking for consults", "Re-engagement for cold leads"],
      },
      {
        title: "Pipeline & reporting",
        body: "Every lead tracked from form to booked consult to application in your CRM, with cost per lead per campaign.",
        points: ["Lead source tied to each deal", "Cost per lead and per consult", "Weekly reporting"],
      },
    ],
    showcase: {
      src: "/images/funnels/funnel-01.webp",
      height: 4906,
      title: "AI Mortgage System 2.0, a funnel we built",
      body: "Ads, offer, VSL and booked consult in one connected mortgage acquisition path, with automated consult booking tied to the ad source.",
      href: "/funnels",
      alt: "AI Mortgage System 2.0 mortgage lead funnel built by Million Dollar Funnel",
    },
    calculator: {
      defaults: { budget: 3000, cpl: 15.26, book: 20, close: 20, value: 3000 },
      note: "Cost per lead defaults to the $15.26 receipt above (the more conservative of the two). Booking rate, close rate and average commission are example inputs, so replace them with your own numbers.",
      valueLabel: "Average commission per loan",
    },
    comparison: {
      heading: "Buying PPL mortgage leads vs owning your lead system",
      intro: "Pay-per-lead is quick to start. Owning the system costs more effort up front but keeps the leads, data and margin with you.",
      columns: ["", "Pay-per-lead vendors", "Your own system (what we build)"],
      rows: [
        ["Exclusivity", "Leads may be sold more than once", "Every lead is exclusive to you"],
        ["Cost per lead", "Set by the vendor", "Visible in your own ad account"],
        ["Data", "Stays with the vendor", "Ad account, audiences and CRM data are yours"],
        ["Follow-up", "Not included", "Instant text, email and booking built in"],
      ],
    },
    faq: [
      {
        q: "How much do mortgage leads cost on Meta Ads?",
        a: "In the receipts above, mortgage leads cost $8.06 on average across $81,984 of spend in April 2026, and $15.26 in a smaller campaign for a pay-per-lead agency client. Your cost depends on market, loan type and offer.",
      },
      {
        q: "Are these leads exclusive?",
        a: "Yes. Campaigns run in your ad account and leads land in your CRM. We do not resell leads.",
      },
      {
        q: "Do you work with brokers outside the US?",
        a: "Yes. We run campaigns in the US, UK, Canada and Australia, with ads written for each market.",
      },
      {
        q: "Is the advertising compliant?",
        a: "We write ads to Meta's special ad category rules for credit and housing, and you approve every ad and claim before it runs. You remain responsible for your licensing disclosures.",
      },
      {
        q: "Can this plug into my existing CRM or LOS?",
        a: "Usually yes. We build in GoHighLevel by default and can forward leads to most CRMs with a webhook or integration.",
      },
    ],
    related: ["/services/vsl-funnels", "/services/gohighlevel-agency", "/lead-generation/solar", "/work-proof"],
  },
  {
    slug: "solar",
    name: "Solar",
    keyword: "solar lead generation",
    metaTitle: "Solar Lead Generation: Exclusive Homeowner Leads | MDF™",
    metaDescription:
      "Solar lead generation with Meta Ads, a qualifying funnel and fast follow-up. Real receipt: 300 homeowner leads at $14.71 each. Exclusive leads, never resold.",
    eyebrow: "Solar lead generation",
    h1: "Solar Lead Generation That Keeps Your Cost per Lead Under Control",
    intro:
      "Exclusive homeowner solar leads from your own ad account, a funnel that filters out renters and tire-kickers, and follow-up that books consultations fast.",
    stats: [
      { value: "300", label: "Solar leads · 11 days" },
      { value: "$14.71", label: "Cost per lead" },
      { value: "$4,412", label: "Total ad spend" },
      { value: "100%", label: "Exclusive leads" },
    ],
    receiptsIntro: "Screenshots from live ad accounts. Click to inspect.",
    receipts: [
      {
        id: "solar-300",
        src: "/workprof/wp-039.webp",
        figure: "300 leads · $14.71",
        label: "Solar company · Meta Ads",
        detail: "300 form leads on $4,412.03 spend across 4 ad sets, at an average CPM of $50.57.",
        period: "Apr 10 – Apr 20, 2026",
      },
      {
        id: "solar-home",
        src: "/workprof/wp-005.webp",
        figure: "$11.27 per lead",
        label: "Florida home services incl. solar",
        detail: "211 website leads on $2,377.62 spend across roofing, gutters and solar ads.",
        period: "May 9 – May 15, 2026",
      },
    ],
    problems: [
      {
        title: "Expensive impressions",
        body: "Solar is one of the most competitive categories on Meta. Without strong creative and targeting, you pay high CPMs for clicks that never convert.",
      },
      {
        title: "Unqualified homeowners",
        body: "Renters, shaded roofs and low power bills waste your consultants' time unless the funnel filters them first.",
      },
      {
        title: "Long decision cycles",
        body: "Homeowners compare quotes for weeks. Without nurture, the installer who follows up longest wins.",
      },
    ],
    steps: [
      {
        title: "Angle & creative",
        body: "We test savings, incentive and independence angles with creative built for your region, then scale what lowers cost per lead.",
        points: ["Region-specific angles", "Creative testing per ad set", "Budget moved to winning ad sets"],
      },
      {
        title: "Qualifying funnel",
        body: "Homeowner status, average power bill, roof and timeline questions before the lead hits your calendar.",
        points: ["Homeowner and bill qualifiers", "Mobile-first form", "Disqualification paths that save your team time"],
      },
      {
        title: "Fast follow-up",
        body: "Instant text and email, missed-call text back and a booking link so consultations land on the calendar automatically.",
        points: ["Instant SMS and email", "Consultation booking link", "Nurture for later-stage shoppers"],
      },
      {
        title: "Pipeline & reporting",
        body: "Track lead to consult to signed contract, with cost per lead and per consult for every campaign.",
        points: ["CRM pipeline", "Cost per consult", "Weekly reporting"],
      },
    ],
    showcase: {
      src: "/images/funnels/funnel-07.webp",
      height: 10352,
      title: "A local-business lead funnel we built",
      body: "Video, a free audit offer and a booking step. We use the same offer-proof-book structure to qualify solar homeowners before they reach your calendar.",
      href: "/funnels",
      alt: "Local-business lead funnel built by Million Dollar Funnel",
    },
    calculator: {
      defaults: { budget: 4000, cpl: 14.71, book: 25, close: 15, value: 8000 },
      note: "Cost per lead defaults to the $14.71 receipt above. Booking rate, close rate and average gross profit per install are example inputs, so replace them with yours.",
      valueLabel: "Average gross profit per install",
    },
    faq: [
      {
        q: "What is a good cost per solar lead on Meta Ads?",
        a: "It varies by state, offer and season. In the receipt above, a solar company paid $14.71 per lead across 300 leads in April 2026. We report your real number from your own ad account.",
      },
      {
        q: "Are the solar leads exclusive?",
        a: "Yes. Ads run in your account, leads go to your CRM, and they are never shared or resold.",
      },
      {
        q: "How do you filter out renters and low bills?",
        a: "The funnel asks qualifying questions such as homeowner status and average monthly bill, and routes non-qualified leads away from your calendar.",
      },
      {
        q: "Can you book appointments for my closers?",
        a: "Yes. Follow-up and booking are automated, and we can add an AI appointment setter that replies and books by text.",
      },
    ],
    related: ["/lead-generation/home-improvement", "/lead-generation/hvac", "/services/ai-appointment-setter", "/work-proof"],
  },
  {
    slug: "personal-injury",
    name: "Personal Injury",
    partner: {
      site: "ScaleWithAds.us",
      url: "https://scalewithads.us/exclusive-mva-leads",
      blurb: "Personal injury, MVA and other legal lead generation is handled by our sister brand Scale With Ads, which runs Meta Ads for law firms.",
    },
    keyword: "personal injury lead generation",
    metaTitle: "Personal Injury Lead Generation for Law Firms | MDF™",
    metaDescription:
      "Personal injury and MVA lead generation for law firms with Meta Ads and intake automation. Real receipts: 530 PI leads in 7 days, 203 leads at $18.69.",
    eyebrow: "Personal injury lead generation",
    h1: "Personal Injury Lead Generation for Law Firms That Want Signed Cases",
    intro:
      "Exclusive accident and injury inquiries from your own Meta Ads account, an intake funnel that screens case details, and follow-up that gets claimants on the phone with your intake team fast.",
    stats: [
      { value: "530", label: "PI leads · 7 days · Texas" },
      { value: "$26.93", label: "Cost per lead · Texas firm" },
      { value: "203", label: "MVA leads · 21 days" },
      { value: "$18.69", label: "Cost per lead · MVA" },
    ],
    receiptsIntro: "Screenshots from live law-firm ad accounts. Click to inspect.",
    receipts: [
      {
        id: "pi-tx",
        src: "/workprof/wp-036.webp",
        figure: "530 leads",
        label: "Texas personal injury law firm · Meta Ads",
        detail: "530 form leads on $14,270.43 spend at a $26.93 average cost per lead.",
        period: "Jun 1 – Jun 7, 2026",
      },
      {
        id: "pi-mva",
        src: "/workprof/wp-030.webp",
        figure: "203 leads · $18.69",
        label: "Motor vehicle accident (MVA) leads",
        detail: "203 leads on $3,793.86 spend across 5 campaigns.",
        period: "Jul 1 – Jul 21, 2026",
      },
    ],
    problems: [
      {
        title: "Shared case leads",
        body: "Many PI lead vendors sell the same claimant to several firms. The firm that calls first usually signs the case.",
      },
      {
        title: "Weak intake screening",
        body: "Without questions on accident date, injuries, fault and representation, intake staff burn hours on cases you cannot take.",
      },
      {
        title: "Missed calls after hours",
        body: "Accidents happen at night and on weekends. Leads that wait until Monday often sign elsewhere.",
      },
    ],
    steps: [
      {
        title: "Case-type campaigns",
        body: "Separate campaigns for motor vehicle accidents and other injury types, written for your state and within Meta's advertising rules.",
        points: ["MVA and injury-specific campaigns", "State and city targeting", "Ad copy you approve before launch"],
      },
      {
        title: "Intake funnel",
        body: "A short intake form that captures accident date, injuries, fault, treatment and whether they already have a lawyer.",
        points: ["Case-screening questions", "Mobile-first form", "Instant routing to intake"],
      },
      {
        title: "24/7 follow-up",
        body: "Instant text and email, missed-call text back and an AI reply option so claimants hear from your firm within minutes, day or night.",
        points: ["Instant SMS and email", "After-hours AI replies", "Call reminders for intake staff"],
      },
      {
        title: "Case pipeline",
        body: "Track every lead from inquiry to qualified to signed in your CRM, with cost per lead and per signed case.",
        points: ["Intake pipeline stages", "Cost per signed case", "Weekly reporting"],
      },
    ],
    showcase: {
      src: "/images/funnels/funnel-02.webp",
      height: 5172,
      title: "A trust-first consultation funnel we built",
      body: "ROWAN Executive Protection: credibility and proof first, then a private consultation request. Law-firm intake works the same way, because claimants need to trust you before they share their case.",
      href: "/funnels",
      alt: "ROWAN Executive Protection consultation funnel built by Million Dollar Funnel",
    },
    calculator: {
      defaults: { budget: 5000, cpl: 18.69, book: 20, close: 15, value: 10000 },
      note: "Cost per lead defaults to the $18.69 MVA receipt above. Qualified rate, sign rate and average fee per case are example inputs, so replace them with your firm's numbers.",
      valueLabel: "Average fee per signed case",
    },
    comparison: {
      heading: "Buying PI leads vs running your own intake engine",
      intro: "Vendors are fast to switch on. Your own system gives exclusivity, data and control over cost per signed case.",
      columns: ["", "Lead vendors", "Your own system (what we build)"],
      rows: [
        ["Exclusivity", "Often shared between firms", "Exclusive to your firm"],
        ["Screening", "Vendor's questions", "Your case criteria"],
        ["Speed", "Depends on the vendor's hand-off", "Instant text, email and intake alert"],
        ["Data", "Kept by the vendor", "Ad account and CRM data are yours"],
      ],
    },
    faq: [
      {
        q: "How much do personal injury leads cost on Facebook?",
        a: "In the receipts above, a Texas PI firm paid $26.93 per lead for 530 leads in one week, and an MVA campaign averaged $18.69 across 203 leads. Costs vary by state and case type.",
      },
      {
        q: "Are the leads exclusive to my firm?",
        a: "Yes. Campaigns run in your firm's ad account and leads go straight to your intake pipeline.",
      },
      {
        q: "Is this compliant with attorney advertising rules?",
        a: "We follow Meta's advertising policies, and your firm approves every ad. You remain responsible for your state bar's advertising rules and disclaimers.",
      },
      {
        q: "Can you handle intake after hours?",
        a: "We automate instant replies and can add an AI assistant that answers and qualifies by text, then hands warm cases to your intake team.",
      },
    ],
    related: ["/lead-generation/mortgage", "/services/ai-appointment-setter", "/blog/speed-to-lead", "/work-proof"],
  },
  {
    slug: "chiropractic",
    name: "Chiropractic",
    keyword: "chiropractic marketing",
    metaTitle: "Chiropractic Marketing That Fills Your Schedule",
    metaDescription:
      "Chiropractic marketing funnels that bring new patients and prepaid consults. One practice booked 44 prepaid consults in six days. See how it works.",
    eyebrow: "Chiropractic marketing",
    h1: "Chiropractic Marketing That Fills Your Schedule With New Patients",
    intro:
      "Chiropractic marketing built around a new-patient offer people pay for up front, Meta Ads that reach people in your area, and reminders that get them through the door. Prepaid consults show up far more reliably than free ones.",
    stats: [
      { value: "44", label: "Prepaid consults · 6 days" },
      { value: "$6,153", label: "Revenue from the ads" },
      { value: "3.59×", label: "Return on ad spend" },
      { value: "$1,714", label: "Total ad spend" },
    ],
    receiptsIntro: "A US chiropractor booked 44 prepaid consults in six days from [one funnel](/lead-generation).",
    receipts: [
      {
        id: "chiro",
        src: "/workprof/wp-032.webp",
        figure: "44 prepaid consults",
        label: "US chiropractic clinic · Meta Ads",
        detail: "$6,153.29 in purchases on $1,714.17 spend across 7 campaigns, 3.59 ROAS, $38.96 per purchase.",
        period: "Jun 28 – Jul 3, 2026",
      },
    ],
    caseResult: {
      eyebrow: "Case result",
      title: "44 prepaid consults in six days for a US chiropractor",
      body: "The funnel used a clear new-patient offer, a short video from the doctor, a prepaid booking step and reminders before each visit. Prepaying filtered out no-shows and brought in patients who were ready to start care.",
      metrics: [
        { value: "44", label: "Prepaid consults" },
        { value: "$6,153", label: "Revenue" },
        { value: "3.59×", label: "Return on ad spend" },
        { value: "6", label: "Days" },
      ],
      href: "/work-proof",
      linkLabel: "See the receipt",
    },
    problems: [
      { title: "Generic posts and discounts", body: "Generic social posts and cheap discount offers bring in people who never return." },
      { title: "Target real pain points", body: "Good chiropractic marketing targets real pain points such as back pain, neck pain and sciatica." },
      { title: "Filter and follow up", body: "It filters for commitment and [follows up](/services/missed-call-text-back) until the first visit happens." },
    ],
    steps: [
      { title: "Offer", body: "New-patient exam or consult offer that fits your practice.", points: ["Offer and price point", "Clear what is included", "Compliance-aware wording"] },
      { title: "Ads", body: "Local Facebook and Instagram ads to people with relevant pain points.", points: ["Radius targeting", "Condition-specific angles", "Video and image creative"] },
      { title: "Funnel", body: "[Landing page](/services/done-for-you-sales-funnels), prepaid booking and automated reminders.", points: ["Payment and booking together", "Mobile-first page", "Instant confirmation"] },
      { title: "Reporting", body: "Cost per booked and attended consult.", points: ["Confirmation and reminders", "No-show follow-up", "ROAS reporting"] },
    ],
    showcase: {
      src: "/images/funnels/funnel-05.webp",
      height: 13190,
      title: "A health-program funnel we built",
      body: "A video-led health program funnel with a low-cost offer and checkout, the same structure we use for prepaid chiropractic consults.",
      href: "/funnels",
      alt: "Health program funnel built by Million Dollar Funnel",
    },
    calculator: {
      defaults: { budget: 1700, cpl: 38.96, book: 100, close: 40, value: 1500 },
      note: "Cost per lead defaults to the $38.96 cost per prepaid consult in the receipt above, so the booking rate is set to 100%. Close rate into a care plan and care-plan value are example inputs, so replace them with yours.",
      valueLabel: "Average care-plan value",
    },
    faq: [
      { q: "How do I get more chiropractic patients?", a: "Use a clear new-patient offer, run local ads to people with back or neck pain, keep your Google Business Profile and reviews strong, and follow up with every inquiry quickly." },
      { q: "What is the best marketing for chiropractors?", a: "A combination of a strong Google Business Profile, reviews, local SEO and paid social ads with a prepaid or low-cost first-visit offer usually brings the steadiest new-patient flow." },
      { q: "Do Facebook ads work for chiropractors?", a: "Yes. Local Facebook and Instagram ads can reach people with back or neck pain in your area, especially with a simple offer and fast booking." },
      { q: "How do chiropractors reduce no-shows?", a: "Prepaid bookings, reminder texts and emails and a short personal message from the office all reduce no-shows." },
      { q: "What are good chiropractic marketing ideas?", a: "A prepaid or low-cost new-patient offer, local Facebook and Instagram ads about back pain, neck pain and sciatica, a short video from the doctor, a strong Google Business Profile with fresh reviews, reminder texts before every first visit, and fast replies to every inquiry. The prepaid offer is what brought one US practice 44 prepaid consults in six days." },
      { q: "What should I look for in a chiropractic marketing company?", a: "Real results from practices, reporting on attended consults rather than leads, follow-up support and clear pricing." },
    ],
    related: ["/lead-generation/pressure-washing", "/services/landing-page-design", "/services/missed-call-text-back", "/work-proof"],
  },
  {
    slug: "pressure-washing",
    name: "Pressure Washing",
    keyword: "pressure washing leads",
    metaTitle: "Pressure Washing Leads: Exclusive Residential & Commercial | MDF™",
    metaDescription:
      "Exclusive pressure washing leads from your own Meta Ads, quote funnel and instant follow-up. Real receipt: 167 leads at $13.37 each in 30 days.",
    eyebrow: "Pressure washing leads",
    h1: "Pressure Washing Leads That Book Quotes, Not Tire-Kickers",
    intro:
      "Residential and commercial pressure washing leads from your own ad account, a quick quote funnel with photos and job details, and texts that get the quote booked while the customer is still interested.",
    stats: [
      { value: "167", label: "Leads · 30 days" },
      { value: "$13.37", label: "Cost per lead" },
      { value: "$2,232", label: "Total ad spend" },
      { value: "100%", label: "Exclusive leads" },
    ],
    receiptsIntro: "Screenshot from the client's ad account. Click to inspect.",
    receipts: [
      {
        id: "pw",
        src: "/workprof/wp-028.webp",
        figure: "167 leads · $13.37",
        label: "Pressure washing company · Meta Ads",
        detail: "$2,232.11 spend across 5 ad sets, 1,348 link clicks and 993 landing-page views.",
        period: "Jul 1 – Jul 31, 2026",
      },
    ],
    caseResult: {
      eyebrow: "Case result",
      title: "167 pressure washing leads in 30 days at $13.37 each",
      body: "Five Meta Ads ad sets sent homeowners and businesses to a quote funnel with job details up front. In July 2026 that produced 167 leads on $2,232.11 of ad spend, in the client's own ad account.",
      metrics: [
        { value: "167", label: "Leads" },
        { value: "$13.37", label: "Cost per lead" },
        { value: "$2,232", label: "Ad spend" },
        { value: "30", label: "Days" },
      ],
      href: "/work-proof",
      linkLabel: "See the receipt",
    },
    problems: [
      { title: "Shared lead apps", body: "Home-service lead apps send the same job to several companies, so you compete on price from the start." },
      { title: "Quotes without details", body: "Without photos and surface details up front, you drive out to quote jobs that were never a fit." },
      { title: "Slow replies", body: "Homeowners book whoever answers first. A reply the next day is usually too late." },
    ],
    steps: [
      { title: "Seasonal offers", body: "Offers for driveways, house washes, roofs and commercial work, timed to the season in your area.", points: ["Residential and commercial angles", "Before-and-after creative", "Service-area targeting"] },
      { title: "Quote funnel", body: "A short form that collects surface type, size, photos and address before the lead reaches you.", points: ["Photo upload", "Job details up front", "Mobile-first"] },
      { title: "Instant follow-up", body: "Instant text with a booking link, plus missed-call text back for phone leads.", points: ["Instant SMS and email", "Missed-call text back", "Quote reminders"] },
      { title: "Pipeline", body: "Every lead tracked from quote to booked job, with cost per lead and per job.", points: ["CRM pipeline", "Won-job tracking", "Weekly numbers"] },
    ],
    showcase: {
      src: "/images/funnels/funnel-07.webp",
      height: 10352,
      title: "A local-business lead funnel we built",
      body: "Video, a free audit offer and a booking step for local service businesses. It uses the same offer-proof-book structure as our home-service quote funnels.",
      href: "/funnels",
      alt: "Local-business lead funnel built by Million Dollar Funnel",
    },
    calculator: {
      defaults: { budget: 2200, cpl: 13.37, book: 35, close: 40, value: 450 },
      note: "Cost per lead defaults to the $13.37 receipt above. Booking rate, close rate and average job value are example inputs, so replace them with yours.",
      valueLabel: "Average job value",
    },
    faq: [
      { q: "What makes a good pressure washing ad offer?", a: "A specific, seasonal service with a clear price anchor or bundle, such as a driveway and house wash, shown with your own before-and-after photos. Vague offers attract price shoppers." },
      { q: "How much do pressure washing leads cost on Facebook?", a: "In the receipt above, leads cost $13.37 on average across 167 leads in July 2026. Costs vary by market and season." },
      { q: "Are the leads exclusive?", a: "Yes. Ads run in your account and leads go to your CRM only." },
      { q: "Do you do commercial pressure washing leads too?", a: "Yes. Commercial campaigns use different targeting and offers from residential ones." },
      { q: "What happens in the off-season?", a: "We shift to services and areas with demand, or pause and keep nurturing past customers for repeat work." },
    ],
    related: ["/lead-generation/hvac", "/lead-generation/chiropractic", "/services/missed-call-text-back", "/lead-generation/home-improvement", "/work-proof"],
  },
  {
    slug: "hvac",
    name: "HVAC",
    keyword: "hvac lead generation",
    metaTitle: "HVAC Lead Generation for Replacement and Install Jobs",
    metaDescription:
      "HVAC lead generation funnels for replacement and install jobs. Exclusive leads, fast follow-up and booked appointments. See how HVAC companies get leads.",
    eyebrow: "HVAC lead generation",
    hubCard: { figure: "New", detail: "The same lead system we run for other home-service companies, built for HVAC replacement and install jobs." },
    h1: "HVAC Lead Generation for Replacement and Install Jobs",
    intro:
      "HVAC lead generation with exclusive heating and cooling leads from your own ad account, a funnel that separates high-value replacements from small repairs, and follow-up that books the estimate before a competitor calls back.",
    stats: [
      { value: "100%", label: "Exclusive · your ad account" },
      { value: "Seconds", label: "Until a new lead gets a text" },
      { value: "$11.27", label: "CPL · home-services receipt" },
      { value: "4", label: "Parts, one system" },
    ],
    receiptsIntro:
      "Our [home service funnels](/lead-generation/home-improvement) brought 211 home-service leads in 7 days at $11.27 each. We do not have an HVAC-only receipt published yet, and we will add one when an HVAC campaign completes reporting.",
    receipts: [
      {
        id: "hvac-home",
        src: "/workprof/wp-005.webp",
        figure: "$11.27 per lead",
        label: "Florida home services · Meta Ads",
        detail: "211 website leads on $2,377.62 spend across roofing, gutters and solar ads.",
        period: "May 9 – May 15, 2026",
      },
      {
        id: "hvac-pw",
        src: "/workprof/wp-028.webp",
        figure: "167 leads · $13.37",
        label: "Pressure washing company · Meta Ads",
        detail: "$2,232.11 spend across 5 ad sets in one month.",
        period: "Jul 1 – Jul 31, 2026",
      },
    ],
    caseResult: {
      eyebrow: "Closest case result",
      title: "211 home-service leads in 7 days at $11.27 each",
      body: "We have not published an HVAC case yet, so here is the closest one: a Florida home-services company running the same system of exterior-project Meta Ads, a short qualifying funnel and instant follow-up got 211 website leads in one week on $2,377.62 of ad spend.",
      metrics: [
        { value: "211", label: "Website leads" },
        { value: "$11.27", label: "Cost per lead" },
        { value: "$2,377", label: "Ad spend" },
        { value: "7", label: "Days" },
      ],
      href: "/work-proof",
      linkLabel: "See the receipt",
    },
    problems: [
      { title: "Shared lead services", body: "Most HVAC lead services sell the same homeowner to several contractors." },
      { title: "A race to the lowest price", body: "The fastest caller with the lowest price wins, and the rest pay for nothing." },
      { title: "What changes the math", body: "Exclusive leads, a strong offer and follow-up within minutes change the math." },
    ],
    steps: [
      { title: "Offer", body: "System replacement, tune-up or financing offers for your area.", points: ["Replacement and install offers", "Financing angles", "Service-area targeting"] },
      { title: "Funnel", body: "[Landing page](/services/done-for-you-sales-funnels) with a short qualifying form and booking calendar.", points: ["System age and issue", "Homeowner check", "Mobile-first form"] },
      { title: "Follow-up", body: "Instant text, call reminders and [missed call text back](/services/missed-call-text-back).", points: ["Instant SMS and email", "Missed-call text back", "Estimate booking link"] },
      { title: "Reporting", body: "Cost per lead, booked appointment and installed system.", points: ["CRM pipeline", "Sold-job tracking", "Weekly numbers"] },
    ],
    showcase: {
      src: "/images/funnels/funnel-07.webp",
      height: 10352,
      title: "A local-business lead funnel we built",
      body: "Video, a free audit offer and a booking step for local service businesses. HVAC funnels use the same offer, proof and book structure.",
      href: "/funnels",
      alt: "Local-business lead funnel built by Million Dollar Funnel",
    },
    extra: {
      title: "HVAC marketing ideas that bring calls",
      items: [
        "Seasonal tune-up offers before summer and winter.",
        "Replacement offers for systems older than 12 years.",
        "Financing messages for high-ticket installs.",
        "Before and after videos from real installs.",
        "[Missed call text back](/services/missed-call-text-back) so no emergency call is lost.",
      ],
    },
    calculator: {
      defaults: { budget: 3000, cpl: 25, book: 30, close: 30, value: 6000 },
      note: "All values are example inputs, because we have no published HVAC receipt yet. Replace cost per lead, booking rate, close rate and average job value with your own numbers.",
      valueLabel: "Average replacement or install value",
    },
    comparison: {
      heading: "Shared HVAC leads vs your own lead system",
      intro: "Shared leads are quick to start but hard to scale profitably. Your [own lead system](/lead-generation) costs more to set up, but every lead is exclusive and the data, pages and ad history stay with your business.",
      columns: ["", "Shared lead services", "Your own system (what we build)"],
      rows: [
        ["Exclusivity", "Often sent to several companies", "Every lead is yours alone"],
        ["Job mix", "Whatever comes in", "Qualified for replacements and installs"],
        ["Speed", "Up to you", "Instant text, email and booking"],
        ["Data", "Kept by the vendor", "Ad account and CRM data are yours"],
      ],
    },
    faq: [
      { q: "How do HVAC companies get leads?", a: "Through Google Business Profile, SEO, Google Ads, Facebook ads, referrals, home service marketplaces and their own lead generation funnels. The most profitable companies combine paid ads with fast follow-up." },
      { q: "How do I get more HVAC leads?", a: "Run a clear seasonal or replacement offer, send traffic to a landing page with a short form, answer every lead within minutes and ask every happy customer for a review." },
      { q: "What are the best HVAC lead generation companies?", a: "Look for exclusive leads, campaigns you own, real reporting on booked jobs and follow-up support. Avoid services that resell the same lead to many contractors." },
      { q: "Are HVAC leads from Facebook any good?", a: "Yes, when the funnel qualifies them on system age, homeownership and timeline. Facebook works especially well for replacement and tune-up offers." },
      { q: "How much do HVAC leads cost?", a: "Costs depend on the market, season and offer. Shared leads are cheaper per lead but close less often. Track cost per installed system to compare sources." },
      { q: "What is HVAC lead generation?", a: "It is the process of attracting homeowners who need heating or cooling work and turning them into booked appointments, using ads, landing pages and follow-up." },
    ],
    related: ["/lead-generation/chiropractic", "/lead-generation/pressure-washing", "/services/missed-call-text-back", "/services/landing-page-design", "/lead-generation/home-improvement", "/work-proof"],
  },
  {
    slug: "home-improvement",
    name: "Home Improvement",
    keyword: "home improvement lead generation",
    metaTitle: "Home Improvement Lead Generation for Contractors | MDF™",
    metaDescription:
      "Home improvement lead generation for remodeling, kitchen, bath and exterior contractors: project-specific Meta Ads, photo quote funnels and fast follow-up.",
    eyebrow: "Home improvement lead generation",
    h1: "Home Improvement Lead Generation That Books Estimates, Not Tire-Kickers",
    intro:
      "Exclusive homeowner leads for remodeling, exterior and home-service companies: ads in your own account, a quote funnel that collects the job details, and follow-up that books the estimate fast.",
    stats: [
      { value: "211", label: "Leads · 7 days · home services" },
      { value: "$11.27", label: "Cost per lead · same receipt" },
      { value: "Photos", label: "Collected before the estimate" },
      { value: "100%", label: "Exclusive leads" },
    ],
    receiptsIntro: "Screenshot from a Florida home-services client running exterior-project ads. We do not have a remodeling-only receipt published yet. Click to inspect.",
    receipts: [
      {
        id: "hi-home",
        src: "/workprof/wp-005.webp",
        figure: "211 leads · $11.27",
        label: "Florida home services · Meta Ads",
        detail: "$2,377.62 spend across roofing, gutters and solar ads.",
        period: "May 9 – May 15, 2026",
      },
    ],
    problems: [
      { title: "Big projects, long decisions", body: "Kitchens, baths, additions and exteriors are considered purchases. Homeowners collect several estimates over weeks, so a single call is rarely enough." },
      { title: "Budget mismatch", body: "Without asking budget and scope up front, you spend evenings estimating projects the homeowner was never going to fund." },
      { title: "Projects you do not want", body: "Generic ads bring in small repair jobs when your crews are set up for full remodels. The offer has to match the project you want to sell." },
    ],
    steps: [
      { title: "One campaign per project type", body: "Separate campaigns for the projects you want to sell, for example kitchens, bathrooms, siding or decks, each with its own before-and-after creative and offer.", points: ["Project-specific offers", "Your own before-and-after photos", "Service-area and homeowner targeting"] },
      { title: "Photo quote funnel", body: "Homeowners choose the project, upload photos, give rough size, budget range, timeline and financing interest, so you can price or decline before driving out.", points: ["Photo upload", "Budget range and timeline", "Financing interest flag"] },
      { title: "Nurture through the decision", body: "Instant text and email, then a sequence over the following weeks with project examples and reviews, so you stay in the conversation while they compare estimates.", points: ["Instant SMS and email", "Multi-week nurture", "Estimate reminders"] },
      { title: "Pipeline by project value", body: "Every lead tracked from quote request to estimate to signed contract, with project value, so you can see which campaigns bring the profitable work.", points: ["CRM pipeline with job values", "Cost per signed project", "Weekly numbers"] },
    ],
    showcase: {
      src: "/images/funnels/funnel-07.webp",
      height: 10352,
      title: "A local-business lead funnel we built",
      body: "Video, a free audit offer and a booking step for local service businesses, the same structure we use for home improvement quote funnels.",
      href: "/funnels",
      alt: "Local-business lead funnel built by Million Dollar Funnel",
    },
    calculator: {
      defaults: { budget: 3000, cpl: 11.27, book: 30, close: 25, value: 5000 },
      note: "Cost per lead defaults to the $11.27 home-services receipt above. Booking rate, close rate and average project value are example inputs, so replace them with yours.",
      valueLabel: "Average project value",
    },
    faq: [
      { q: "What does a home improvement lead cost?", a: "In the receipt above, a Florida home-services company paid $11.27 per website lead over one week. Remodeling leads usually cost more than small exterior jobs because the projects are larger; we report your real number from your own ad account." },
      { q: "Do you work with remodelers and kitchen and bath companies?", a: "Yes. Campaigns are built per project type, so a kitchen and bath company and a siding contractor get different offers, creative and qualifying questions. Roofing is handled by our sister brand RoofingSystems.co." },
      { q: "Can you filter out small jobs and low budgets?", a: "Yes. The quote funnel asks project type, size and budget range, and routes leads below your minimum to a different follow-up instead of your estimator's calendar." },
      { q: "Can homeowners ask about financing?", a: "The funnel can ask whether they want financing, so your team knows before the visit and can bring the right options." },
    ],
    related: ["/lead-generation/pressure-washing", "/lead-generation/hvac", "/services/missed-call-text-back", "/work-proof"],
  },
];

/** Industries this site owns (excludes keywords handed to sister sites). */
export const ACTIVE_INDUSTRIES = INDUSTRIES.filter((i) => !i.partner);

export const getIndustry = (slug: string) => INDUSTRIES.find((i) => i.slug === slug);
