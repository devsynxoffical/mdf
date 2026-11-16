/**
 * Service landing pages (/services/[slug]). Each one targets a keyword with
 * measured search demand and is written from what the team actually delivers.
 */

export type ServiceSection = { heading: string; body: string[]; bullets?: string[] };

export type ServicePage = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  primaryKeyword: string;
  sections: ServiceSection[];
  faq: { q: string; a: string }[];
  related: { label: string; href: string }[];
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "vsl-funnels",
    name: "VSL Funnels",
    primaryKeyword: "vsl funnel",
    metaTitle: "VSL Funnel Agency: Done-For-You Video Sales Letter Funnels",
    metaDescription:
      "We script, build and launch VSL funnels for coaches, consultants and service businesses: video page, application or checkout, CRM and follow-up wired together.",
    eyebrow: "( Service ) — VSL Funnels",
    h1: "Done-For-You VSL Funnels That Turn Watch Time Into Booked Calls",
    intro:
      "A VSL funnel puts one video sales letter at the centre of the journey: the video educates and pre-sells, and every step after it — the application, the calendar or the checkout — is built to catch the people the video convinced. We build the whole path, not just the page.",
    sections: [
      {
        heading: "What a VSL funnel is",
        body: [
          "A VSL (video sales letter) funnel is a short sequence of pages built around a single sales video. Traffic from ads, email or content lands on the video page; the video explains the problem, the method and the offer; and a clear call to action sends interested viewers to the next step.",
          "For a high-ticket offer that next step is usually an application or a booked call. For a lower-priced product it is a checkout with an order bump and an upsell. Either way, the funnel only works when the video, the page copy, the next step and the follow-up all say the same thing.",
        ],
      },
      {
        heading: "What we build in a VSL funnel install",
        body: ["Every install covers the full path from first click to booked call or purchase:"],
        bullets: [
          "Offer and angle mapping before anything is designed, so the video sells one outcome to one audience",
          "VSL script structure: hook, problem, mechanism, proof, offer and call to action",
          "A mobile-first video page with the call to action timed to the pitch",
          "Application form or calendar booking for high-ticket offers, or checkout with order bump and upsell for low-ticket offers",
          "CRM pipeline, tags and stages so every viewer who opts in is tracked",
          "Email, SMS and reminder sequences for people who watched but did not act, and for booked calls",
          "Pixel, UTM and conversion tracking so you can see where viewers drop off",
        ],
      },
      {
        heading: "Who a VSL funnel is right for",
        body: [
          "VSL funnels work best when the buyer needs to understand something before they will buy — a coaching programme, a consulting engagement, a done-for-you service or a product with a new mechanism. If your best sales calls all start with you explaining the same thing, a VSL can do that explaining before the call.",
          "They are a poor fit when the offer is already understood and price-driven, where a short landing page usually converts better and costs less to produce.",
        ],
      },
      {
        heading: "How we measure a VSL funnel",
        body: [
          "We track the funnel step by step instead of judging it on one number: how many visitors press play, where viewers drop off in the video, how many reach the call to action, how many complete the application or checkout, and how many booked calls show up. Fixing the weakest step is almost always cheaper than buying more traffic.",
        ],
      },
      {
        heading: "Results from our own installs",
        body: [
          "One of our documented installs scaled an offer to $1,520,000 in 19 months using a VSL-led funnel and an automated backend. The full breakdown, including the funnel structure, is in the case study linked below.",
        ],
      },
    ],
    faq: [
      {
        q: "How long should a VSL be?",
        a: "As long as it takes to make the case for the offer and no longer. Short videos of a few minutes suit simple or low-priced offers; high-ticket offers often need longer videos because the viewer has more questions to answer before applying. We decide length from the offer, then use drop-off data to tighten it.",
      },
      {
        q: "Do you write the VSL script?",
        a: "We map the offer and build the script structure with you, then shape the page and follow-up around it. You or your team record the video, because buyers respond to the person they will be working with.",
      },
      {
        q: "Which platform do you build VSL funnels on?",
        a: "We build on the platform that fits your stack, most often GoHighLevel or ClickFunnels, and connect it to your CRM, calendar and payment processor.",
      },
      {
        q: "How long does a VSL funnel take to launch?",
        a: "Most installs are live on real traffic in three to four weeks, depending on how clear the offer is and how quickly the video is recorded.",
      },
    ],
    related: [
      { label: "What is a VSL? Our complete guide", href: "/blog/what-is-a-vsl" },
      { label: "$1.52M in 19 months case study", href: "/cases/1-52m-case-study" },
      { label: "See live funnels we built", href: "/funnels" },
    ],
  },
  {
    slug: "gohighlevel-agency",
    name: "GoHighLevel Agency",
    primaryKeyword: "gohighlevel agency",
    metaTitle: "GoHighLevel Agency & Experts: Funnels, CRM and Automations",
    metaDescription:
      "Hire a GoHighLevel agency that builds the funnels, pipelines, workflows, A2P registration and AI follow-up inside HighLevel for you, then keeps them running.",
    eyebrow: "( Service ) — GoHighLevel",
    h1: "GoHighLevel Agency: We Build and Run Your HighLevel Account",
    intro:
      "GoHighLevel can replace half a dozen tools — funnels, CRM, calendars, SMS, email and automations — but only if it is set up properly. We build the account around how you actually sell, connect every step, and keep it running so you never have to learn the software.",
    sections: [
      {
        heading: "What our GoHighLevel experts set up",
        body: ["A typical HighLevel install covers:"],
        bullets: [
          "Funnels and landing pages: VSL, application, low-ticket and lead-magnet funnels",
          "Pipelines and stages that match your real sales process, with automatic stage changes",
          "Calendars, booking widgets, confirmation and reminder sequences",
          "Workflows for new leads, nurture, no-shows, reactivation and missed calls",
          "SMS and email sequences, including A2P 10DLC brand and campaign registration so texts are delivered",
          "AI follow-up and qualification that answers new leads in under a minute",
          "Tracking: pixels, UTMs and source attribution in the CRM",
        ],
      },
      {
        heading: "Why HighLevel accounts usually underperform",
        body: [
          "Most of the HighLevel accounts we audit have the same problems: a funnel that is not connected to the pipeline, workflows that fire twice or not at all, unregistered SMS numbers whose messages are filtered by carriers, and no reliable way to see which ad produced which booked call. None of these are software problems; they are setup problems.",
          "We start every engagement by mapping the offer and the prospect journey in plain words, then build HighLevel to match it, so the software follows the sales process instead of the other way round.",
        ],
      },
      {
        heading: "Done-for-you, not a course",
        body: [
          "You do not need to learn HighLevel. We build, launch and manage the account; you review the strategy and messaging and focus on delivery and sales calls. When something needs to change, we change it.",
        ],
      },
      {
        heading: "Who we work with",
        body: [
          "Coaches, consultants, agencies and high-ticket service businesses that sell through conversations. If revenue depends on booking qualified calls and following up quickly, HighLevel is usually the right home for the system, and we build it there.",
        ],
      },
    ],
    faq: [
      {
        q: "Can you fix an existing GoHighLevel account instead of starting over?",
        a: "Yes. We audit what is there, keep what converts, rebuild the steps that leak and connect tracking so you can see what is working.",
      },
      {
        q: "Do you handle A2P 10DLC registration in HighLevel?",
        a: "Yes. Unregistered numbers get their texts filtered or blocked by US carriers, so brand and campaign registration is part of every install that uses SMS.",
      },
      {
        q: "Do you also run the ads?",
        a: "We can. We prefer managing both sides so the ads, the funnel and the follow-up are built for each other.",
      },
      {
        q: "How long does a HighLevel build take?",
        a: "Most installs are live on real traffic in three to four weeks. SMS go-live can depend on how quickly carriers approve the A2P campaign.",
      },
    ],
    related: [
      { label: "A2P 10DLC registration guide", href: "/blog/a2p-10dlc-registration" },
      { label: "AI appointment setter service", href: "/services/ai-appointment-setter" },
      { label: "Verified ad and CRM receipts", href: "/work-proof" },
    ],
  },
  {
    slug: "ai-appointment-setter",
    name: "AI Appointment Setter",
    primaryKeyword: "ai appointment setter",
    metaTitle: "AI Appointment Setter: Qualify and Book Leads in Under 60 Seconds",
    metaDescription:
      "An AI appointment setter that texts and calls new leads within a minute, asks your qualifying questions, answers common objections and books calls on your calendar.",
    eyebrow: "( Service ) — AI Appointment Setting",
    h1: "AI Appointment Setter That Books Qualified Calls While You Sleep",
    intro:
      "Leads go cold in minutes, not days. Our AI appointment setter contacts every new lead by SMS or phone within a minute, asks your qualifying questions, handles the common questions and books the ones who fit straight onto your calendar — with a human handoff when it matters.",
    sections: [
      {
        heading: "What the AI appointment setter does",
        body: ["Once a lead opts in from an ad, a funnel or a form, the setter:"],
        bullets: [
          "Responds by SMS or phone call within a minute, day or night",
          "Asks the qualifying questions your sales team would ask: budget, timeline, fit",
          "Answers common questions about the offer using information you approve",
          "Books qualified leads on your calendar and sends confirmations and reminders",
          "Routes unqualified leads to nurture instead of your calendar",
          "Hands the conversation to a person when the lead asks for one or something unusual comes up",
          "Logs every conversation and outcome in the CRM",
        ],
      },
      {
        heading: "Why response time matters",
        body: [
          "Research published in Harvard Business Review found that companies that contacted online leads within an hour were nearly seven times as likely to qualify them as companies that waited longer — and that many companies took far longer than an hour to respond. Most teams cannot answer every lead in minutes, especially at night and weekends. An AI setter can.",
        ],
      },
      {
        heading: "Built on your offer, your rules and your calendar",
        body: [
          "The setter only says what you approve. We write its qualification questions, answers and booking rules from your offer and your best sales calls, set the hours and limits it works within, and connect it to your CRM and calendar. SMS is sent from registered A2P 10DLC numbers so messages are delivered.",
        ],
      },
      {
        heading: "Who it is for",
        body: [
          "Coaches, consultants, agencies and service businesses that generate leads faster than their team can call them back, or that lose bookings because leads come in outside office hours.",
        ],
      },
    ],
    faq: [
      {
        q: "Does the AI replace my sales team?",
        a: "No. It handles the first response, qualification and booking so your closers spend their time on qualified calls. It hands off to a person whenever a lead asks for one.",
      },
      {
        q: "Will leads know they are talking to AI?",
        a: "We recommend being transparent. The setter can introduce itself as an assistant, and many leads simply care that they got a fast, useful answer.",
      },
      {
        q: "Can it call leads as well as text them?",
        a: "Yes. It can engage by SMS, by voice call, or both, depending on what your leads respond to and what your compliance requirements allow.",
      },
      {
        q: "What does it connect to?",
        a: "Your CRM, calendar and lead sources — most often GoHighLevel — so every conversation and booking is recorded against the lead.",
      },
    ],
    related: [
      { label: "Speed to lead: why the first minutes decide the sale", href: "/blog/speed-to-lead" },
      { label: "GoHighLevel agency service", href: "/services/gohighlevel-agency" },
      { label: "Book a strategy call", href: "/book" },
    ],
  },
];

export const getServiceBySlug = (slug: string) => SERVICE_PAGES.find((s) => s.slug === slug);
