import type { Receipt } from "@/components/leads/ReceiptGallery";
import type { ProcessStep } from "@/components/leads/ProcessTabs";

/**
 * Industry lead-generation pages. Every figure below is read directly from the
 * ad-account / CRM screenshot it cites (see /work-proof). Calculator defaults that are
 * not from a receipt are labelled as example inputs on the page.
 */
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
  receipts: Receipt[];
  receiptsIntro: string;
  problems: { title: string; body: string }[];
  steps: ProcessStep[];
  showcase: { src: string; title: string; body: string; href: string; alt: string; height: number };
  calculator: { defaults: { budget: number; cpl: number; book: number; close: number; value: number }; note: string; valueLabel: string };
  comparison?: { heading: string; intro: string; columns: [string, string, string]; rows: [string, string, string][] };
  faq: { q: string; a: string }[];
  related: string[];
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "roofing",
    name: "Roofing",
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
      "Mortgage lead generation with your own Meta Ads, funnel and CRM. Real receipts: 10,172 leads at $8.06 and 154 leads at $14.58. Exclusive leads, never resold.",
    eyebrow: "Mortgage lead generation",
    h1: "Mortgage Lead Generation: Exclusive Leads at Your Own Cost per Lead",
    intro:
      "Stop renting pay-per-lead lists. We build your own mortgage lead machine with Meta Ads, a compliant funnel and automated follow-up, so refinance, purchase and investor leads come to you and only you.",
    stats: [
      { value: "10,172", label: "Mortgage leads · one month" },
      { value: "$8.06", label: "Cost per lead · Apr 2026" },
      { value: "$14.58", label: "Cost per lead · Australia" },
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
        id: "mort-au",
        src: "/workprof/wp-031.webp",
        figure: "$14.58 per lead",
        label: "Mortgage broker · Australia",
        detail: "154 form leads on $2,245.11 spend across 2 ad sets.",
        period: "Jun 1 – Jun 30, 2026",
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
      defaults: { budget: 3000, cpl: 14.58, book: 20, close: 20, value: 3000 },
      note: "Cost per lead defaults to the $14.58 Australian receipt above. Booking rate, close rate and average commission are example inputs, so replace them with your own numbers.",
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
        a: "In the receipts above, mortgage leads cost $8.06 on average across $81,984 of spend in April 2026, and $14.58 for an Australian broker in June 2026. Your cost depends on market, loan type and offer.",
      },
      {
        q: "Are these leads exclusive?",
        a: "Yes. Campaigns run in your ad account and leads land in your CRM. We do not resell leads.",
      },
      {
        q: "Do you work with brokers outside the US?",
        a: "Yes. One of the receipts above is from an Australian mortgage broker. We run campaigns in the US, UK, Canada and Australia.",
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
    related: ["/services/vsl-funnels", "/services/gohighlevel-agency", "/lead-generation/personal-injury", "/work-proof"],
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
    related: ["/lead-generation/roofing", "/services/ai-appointment-setter", "/services/webinar-funnels", "/work-proof"],
  },
  {
    slug: "personal-injury",
    name: "Personal Injury",
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
];

export const getIndustry = (slug: string) => INDUSTRIES.find((i) => i.slug === slug);
