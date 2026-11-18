/**
 * Service landing pages (/services/[slug]). Each one targets a keyword with
 * measured search demand and is written from what the team actually delivers.
 */

export type ServiceSection = { heading: string; body: string[]; bullets?: string[] };

/** Side-by-side comparison rendered as a table (answer-engine friendly). */
export type ServiceComparison = { heading: string; intro?: string; columns: [string, string, string]; rows: [string, string, string][] };

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
  comparison?: ServiceComparison;
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
  {
    slug: "webinar-funnels",
    name: "Webinar Funnels",
    primaryKeyword: "webinar funnel",
    metaTitle: "Webinar Funnel Agency: Registrations, Show-Ups & Sales Calls",
    metaDescription:
      "Done-for-you webinar funnels: registration page, ads, reminder sequences, replay and booking flow. Our webinar receipts show $4.34–$5.27 cost per registration.",
    eyebrow: "( Service ) — Webinar Funnels",
    h1: "Webinar Funnels That Fill the Room and Book the Calls",
    intro:
      "A webinar funnel turns cold traffic into registrants, registrants into live attendees, and attendees into applications or sales. We build every step — the ads, the registration page, the reminders, the replay and the booking flow — so the webinar is not just watched but acted on.",
    sections: [
      {
        heading: "What a webinar funnel is",
        body: [
          "A webinar funnel is a sequence built around a live, scheduled or on-demand presentation. Ads or emails send people to a registration page; a confirmation and reminder sequence gets them to show up; the webinar teaches and makes an offer; and a follow-up sequence with the replay converts the people who did not act live.",
          "Because the registration is a small ask, webinar funnels usually generate leads more cheaply than a direct call booking — but the real result depends on show-up rate and on what happens after the webinar.",
        ],
      },
      {
        heading: "What our webinar receipts show",
        body: ["These figures come from client ad accounts shown on our Work Proof page:"],
        bullets: [
          "800 paid registrants ($5 ticket) at $4.34 per registration",
          "835 webinar leads at $4.57 per lead",
          "680 webinar registrations at $5.27 per lead in under three weeks",
          "1,018 registrations at about $4.50 per registrant across 21 ad sets",
          "1,515 registrations at a 27% opt-in rate on a ClickFunnels registration page",
        ],
      },
      {
        heading: "What we build",
        body: ["A webinar funnel install includes:"],
        bullets: [
          "Offer and webinar angle: the one promise the presentation is built to deliver",
          "Registration page and thank-you page designed for opt-in rate",
          "Meta and Google ad campaigns and tracking for registrations",
          "Email and SMS confirmation and reminder sequences to lift show-up rate",
          "Replay page and post-webinar follow-up for people who did not buy or book live",
          "Application or calendar booking for high-ticket offers, or checkout for direct sales",
          "CRM pipeline so every registrant, attendee and buyer is tracked",
        ],
      },
      {
        heading: "Who a webinar funnel suits",
        body: [
          "Coaches, consultants, course creators, agencies and B2B companies with an offer that is easier to sell after teaching something. It is especially effective when buyers need a new way of thinking before they will consider a premium offer.",
        ],
      },
    ],
    comparison: {
      heading: "Webinar funnel vs. VSL funnel",
      intro: "Both educate before they sell. The difference is format and commitment:",
      columns: ["", "Webinar funnel", "VSL funnel"],
      rows: [
        ["Format", "Live, scheduled or on-demand presentation", "Single on-demand sales video on one page"],
        ["Viewer commitment", "Registers and attends at a set time", "Watches immediately, no registration needed"],
        ["Best for", "Teaching a new idea, launches, events, higher engagement", "Evergreen offers, faster path from click to call or checkout"],
        ["Key numbers", "Cost per registration, show-up rate, attendee conversion", "Play rate, watch-time drop-off, CTA clicks"],
        ["Follow-up", "Reminders before, replay and offer sequence after", "Retargeting and nurture for viewers who did not act"],
      ],
    },
    faq: [
      {
        q: "How much does a webinar registration cost on Meta Ads?",
        a: "It depends on the offer, audience and market. On the webinar receipts we publish, cost per registration ranged from $4.34 to $5.27, with one campaign averaging about $4.50 across 21 ad sets.",
      },
      {
        q: "Should my webinar be live or automated?",
        a: "Live webinars usually convert better and suit launches; automated or on-demand webinars scale more easily. Many clients run live first, then automate the version that converts.",
      },
      {
        q: "How do you improve webinar show-up rates?",
        a: "With a clear confirmation page, calendar invites, and email and SMS reminders before the start time — plus a replay sequence for people who miss it.",
      },
      {
        q: "Which platform do you build webinar funnels on?",
        a: "Usually GoHighLevel or ClickFunnels for the pages and follow-up, connected to your webinar software, CRM and calendar.",
      },
    ],
    related: [
      { label: "See the webinar receipts and cost-per-lead benchmarks", href: "/work-proof#benchmarks" },
      { label: "VSL funnel service", href: "/services/vsl-funnels" },
      { label: "Speed to lead guide", href: "/blog/speed-to-lead" },
    ],
  },
  {
    slug: "low-ticket-funnels",
    name: "Low-Ticket Funnels",
    primaryKeyword: "low ticket funnel",
    metaTitle: "Low-Ticket Funnels: Tripwire & Self-Liquidating Offer Funnels",
    metaDescription:
      "We build low-ticket (tripwire) funnels with order bumps and upsells that pay for ad spend and feed your high-ticket offer — 13,630 sales in one coaching case study.",
    eyebrow: "( Service ) — Low-Ticket Funnels",
    h1: "Low-Ticket Funnels That Pay for Your Ads and Feed High-Ticket Sales",
    intro:
      "A low-ticket funnel sells an inexpensive front-end offer to cold traffic, then raises the order value with bumps and upsells. Done well, it covers the cost of advertising and builds a list of buyers who are far more likely to take your high-ticket offer.",
    sections: [
      {
        heading: "What a low-ticket funnel is",
        body: [
          "A low-ticket funnel (also called a tripwire funnel) starts with a low-priced product — a mini-course, template, challenge or workshop — sold on a simple sales page. At checkout the buyer is offered an order bump; after purchase, one or more upsells or downsells. Then a follow-up sequence introduces the core or high-ticket offer.",
          "The goal is not profit on the first sale. It is to turn strangers into buyers as cheaply as possible, because a buyer is much easier to sell to again than a lead.",
        ],
      },
      {
        heading: "Results from our low-ticket installs",
        body: [
          "For one coaching client stuck chasing high-ticket sales, we rebuilt the backend and tracking around a low-ticket front end: 13,630 low-ticket sales, $847,307 in revenue and 3.32 ROAS. Another install closed 1,650 low-ticket buyers in 20 days for $77,460 in revenue. Both are documented with screenshots on this site.",
        ],
      },
      {
        heading: "What we build",
        body: ["A low-ticket funnel install includes:"],
        bullets: [
          "Front-end offer design: price point, promise and how it leads to the core offer",
          "Sales page and checkout with an order bump",
          "One-click upsell and downsell pages",
          "Ad campaigns and purchase tracking with pixel and conversions API",
          "Delivery, onboarding and ascension sequences by email and SMS",
          "Reporting on cost per purchase, average order value and ROAS",
        ],
      },
      {
        heading: "When a low-ticket funnel makes sense",
        body: [
          "When cold traffic is too expensive to send straight to a sales call, when high-ticket sales are inconsistent, or when you want ad spend to pay for itself before scaling. It is less useful for offers that can only be sold through a conversation, where an application funnel is usually the better front end.",
        ],
      },
    ],
    comparison: {
      heading: "Tripwire vs. self-liquidating offer",
      intro: "The terms overlap, but they describe different goals:",
      columns: ["", "Tripwire offer", "Self-liquidating offer (SLO)"],
      rows: [
        ["Main goal", "Turn a lead into a first-time buyer", "Recover the ad spend used to acquire the buyer"],
        ["Price", "Usually very low to remove friction", "Priced, with bumps and upsells, to cover acquisition cost"],
        ["Success measure", "Conversion rate from lead to buyer", "Front-end ROAS of about 1.0 or better"],
        ["What comes next", "Core offer sold to the new buyer", "Core or high-ticket offer, with ads now paid for"],
      ],
    },
    faq: [
      {
        q: "What is a low-ticket offer?",
        a: "An inexpensive product — often a mini-course, template, challenge or workshop — sold to cold traffic to turn strangers into buyers before introducing a bigger offer.",
      },
      {
        q: "What is a self-liquidating offer?",
        a: "A front-end offer, with its order bumps and upsells, priced so that its revenue covers the advertising cost of acquiring the buyer, letting you acquire customers for roughly free.",
      },
      {
        q: "Do I need a low-ticket offer before high-ticket?",
        a: "Not always. It helps most when high-ticket sales are inconsistent or cold traffic is expensive. If your offer can only be sold through a conversation, an application funnel may suit better.",
      },
      {
        q: "What makes a low-ticket funnel profitable?",
        a: "Average order value. Order bumps and upsells usually decide whether the front end breaks even, so we design and track them from day one.",
      },
    ],
    related: [
      { label: "Coaching low-ticket case study: 13,630 sales", href: "/cases/coaching-lto" },
      { label: "Verified receipts", href: "/work-proof" },
      { label: "VSL funnel service", href: "/services/vsl-funnels" },
    ],
  },
];

export const getServiceBySlug = (slug: string) => SERVICE_PAGES.find((s) => s.slug === slug);
