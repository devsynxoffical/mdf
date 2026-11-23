/**
 * Text in blocks may contain inline links written as [label](/path).
 *
 * Insight articles (/blog/[slug]). Each targets an informational query with
 * measured search demand and links to the matching service page.
 */

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; columns: string[]; rows: string[][] };

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  published: string; // ISO date
  readMinutes: number;
  summary: string; // short direct answer, shown at the top
  blocks: BlogBlock[];
  faq: { q: string; a: string }[];
  cta: { label: string; href: string };
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "what-is-a-vsl",
    title: "What Is a VSL? The Video Sales Letter, Explained",
    metaTitle: "What Is a VSL? Video Sales Letter Meaning, Structure & Examples",
    metaDescription:
      "A VSL (video sales letter) is a sales video that replaces a written sales page. Learn how a VSL is structured, how long it should be and how a VSL funnel works.",
    primaryKeyword: "what is a vsl",
    published: "2026-11-16",
    readMinutes: 8,
    summary:
      "A VSL, or video sales letter, is a sales video that does the job of a written sales page: it grabs attention, explains the problem, presents a solution and makes an offer with a clear call to action. It is usually placed on its own page at the centre of a sales funnel.",
    blocks: [
      { type: "h2", text: "VSL meaning" },
      {
        type: "p",
        text: "VSL stands for video sales letter. A traditional sales letter is a long piece of persuasive copy; a VSL delivers the same argument as a video, typically a person talking to camera or a sequence of slides with a voice-over. The goal is the same: move the viewer from interest to a single action — apply, book a call or buy.",
      },
      {
        type: "p",
        text: "Because people will often watch what they would not read, a VSL lets a business explain an offer in depth, show proof and build trust before the prospect ever speaks to a salesperson.",
      },
      { type: "h2", text: "How a VSL is structured" },
      { type: "p", text: "Most effective VSLs follow the same broad sequence, adjusted to the offer:" },
      {
        type: "ol",
        items: [
          "Hook: a specific promise or question that tells the right viewer this video is for them.",
          "Problem: the situation the viewer is in and what it is costing them.",
          "Why the usual fixes fail: the reasons common approaches do not solve it.",
          "Mechanism: the method or system that does solve it, and why it works.",
          "Proof: results, case studies, screenshots or testimonials that make the claim believable.",
          "Offer: exactly what the buyer gets, how it works and what it costs or what happens next.",
          "Call to action: one clear next step, repeated, with a reason to take it now.",
        ],
      },
      { type: "h2", text: "How long should a VSL be?" },
      {
        type: "p",
        text: "There is no single right length. A simple, lower-priced offer can be sold in a few minutes. A high-ticket coaching, consulting or done-for-you offer often needs a longer video, because the buyer has more questions to answer before they will apply. The practical rule: cover everything the buyer needs to make a decision, cut everything they do not, and use drop-off data to find where viewers lose interest.",
      },
      { type: "h2", text: "VSL vs. written sales page" },
      {
        type: "ul",
        items: [
          "A VSL builds trust faster because the viewer sees and hears a real person.",
          "A written page is easier to skim and update, and some buyers prefer to read.",
          "Many high-converting pages use both: the VSL above the fold and written proof and FAQs below it.",
        ],
      },
      { type: "h2", text: "What is a VSL funnel?" },
      {
        type: "p",
        text: "A VSL funnel is the sequence of steps built around the video. A common version for high-ticket offers is: ad or email → VSL page → application or calendar booking → confirmation and reminders → sales call. For lower-priced offers the video page leads to a checkout with an order bump and upsell, followed by a delivery and follow-up sequence.",
      },
      {
        type: "p",
        text: "The video only does part of the work. Viewers who watch but do not act need follow-up by email and SMS, booked calls need reminders so they show up, and every step needs tracking so you can see where people drop off. That is what our [done-for-you VSL funnels](/services/vsl-funnels) include — and how one offer reached [$1.52M in 19 months](/cases/1-52m-case-study).",
      },
      { type: "h2", text: "Metrics that show whether a VSL is working" },
      {
        type: "ul",
        items: [
          "Play rate: the share of page visitors who start the video.",
          "Retention: where in the video viewers stop watching.",
          "Call-to-action clicks: how many viewers reach and click the next step.",
          "Application or checkout completion rate.",
          "Show-up rate and close rate for booked calls.",
        ],
      },
      {
        type: "p",
        text: "Improving the weakest of these numbers is usually cheaper than buying more traffic. A strong hook raises play rate and retention; a clearer offer raises clicks; reminders raise show-up rates. Where each number sits in the journey is covered in our guide to [sales funnel stages](/blog/sales-funnel-stages).",
      },
      { type: "h2", text: "When a VSL is the right choice" },
      {
        type: "p",
        text: "Use a VSL when buyers need to understand something before they will buy: a new method, a premium price or a service they have not bought before. If your sales calls all start with the same explanation, that explanation probably belongs in a VSL. If your audience responds better to a scheduled event, consider a [webinar funnel](/services/webinar-funnels) instead. If your offer is simple and price-driven, a short landing page will usually convert as well for far less effort.",
      },
    ],
    faq: [
      {
        q: "What does VSL stand for?",
        a: "VSL stands for video sales letter: a sales video that presents an offer and asks the viewer to take one action, such as booking a call or buying.",
      },
      {
        q: "Is a VSL the same as a webinar?",
        a: "No. A webinar is usually longer, often live or scheduled, and teaches before it sells. A VSL is a focused, on-demand sales video placed on a single page.",
      },
      {
        q: "Do VSLs still work?",
        a: "Yes, when the offer needs explaining. They work best as one part of a funnel with follow-up, not as a standalone video.",
      },
    ],
    cta: { label: "See our done-for-you VSL funnels", href: "/services/vsl-funnels" },
  },
  {
    slug: "a2p-10dlc-registration",
    title: "A2P 10DLC Registration: What It Is and How to Get Approved",
    metaTitle: "A2P 10DLC Registration Guide: Requirements, Steps & Rejections",
    metaDescription:
      "What A2P 10DLC registration is, why US carriers filter unregistered business texts, what you need to register a brand and campaign, and how to avoid rejection.",
    primaryKeyword: "a2p 10dlc registration",
    published: "2026-11-16",
    readMinutes: 9,
    summary:
      "A2P 10DLC registration is the process of registering your business (the brand) and your texting use case (the campaign) with US mobile carriers through The Campaign Registry before sending business text messages from a standard 10-digit phone number. Unregistered business texts are filtered or blocked by carriers.",
    blocks: [
      { type: "h2", text: "What A2P 10DLC means" },
      {
        type: "p",
        text: "A2P means application-to-person: messages sent by a business system, such as a CRM, to a person's phone. 10DLC means 10-digit long code: an ordinary local US phone number, as opposed to a short code or a toll-free number. A2P 10DLC is the US carriers' framework for business texting from those local numbers.",
      },
      {
        type: "p",
        text: "Under the framework, every business that texts customers from a 10-digit number must identify itself and describe how it uses SMS. Carriers use that information to decide how much traffic to allow and to filter spam.",
      },
      { type: "h2", text: "Why registration matters" },
      {
        type: "p",
        text: "Since 2023, US carriers have blocked SMS sent through unregistered 10DLC numbers. For any business that relies on text follow-up — appointment reminders, lead nurture, no-show recovery or an [AI appointment setter](/services/ai-appointment-setter) — an unregistered or rejected campaign means messages silently fail to arrive, which wrecks your [speed to lead](/blog/speed-to-lead).",
      },
      { type: "h2", text: "What you need before you register" },
      { type: "h3", text: "For the brand" },
      {
        type: "ul",
        items: [
          "Legal business name exactly as it appears on your tax registration",
          "Business tax ID (EIN for US businesses, or the equivalent for your country)",
          "Business type, industry and registered address",
          "A working website that matches the business name",
          "An authorised contact's name, email and phone number",
        ],
      },
      { type: "h3", text: "For the campaign" },
      {
        type: "ul",
        items: [
          "The use case, such as customer care, appointment reminders or marketing",
          "A clear description of what messages you send and why",
          "Sample messages that include your business name and opt-out language",
          "A description of how people opt in to receive texts, with the exact wording they agree to",
          "Opt-out handling (STOP) and help handling (HELP)",
          "A privacy policy that states mobile numbers and opt-in data are not shared with third parties for marketing",
        ],
      },
      { type: "h2", text: "The registration steps" },
      {
        type: "ol",
        items: [
          "Register the brand through your SMS provider or CRM, which submits it to The Campaign Registry for verification.",
          "Wait for brand verification. Some brands are verified quickly; others need extra vetting.",
          "Register the campaign: use case, description, sample messages, opt-in and opt-out details.",
          "Wait for carrier review of the campaign. This can take from a few days to several weeks.",
          "Attach your phone numbers to the approved campaign and send a test message.",
        ],
      },
      { type: "h2", text: "Common reasons campaigns are rejected" },
      {
        type: "ul",
        items: [
          "The business name, tax ID and website do not match each other",
          "The website is missing, unfinished or does not describe the business",
          "The opt-in process is unclear or does not show consent language",
          "The privacy policy does not cover SMS data sharing",
          "Sample messages do not include the business name or opt-out instructions",
          "The use case selected does not match the sample messages",
        ],
      },
      {
        type: "p",
        text: "Most rejections come from mismatched or incomplete information rather than from the business itself. Fix the specific reason given, update the website or forms if needed, and resubmit.",
      },
      { type: "h2", text: "A2P registration in GoHighLevel and other CRMs" },
      {
        type: "p",
        text: "If you text through a CRM such as GoHighLevel, registration is done inside that platform's phone settings, which pass your details to the carrier registry. The same requirements apply: matching business details, a compliant website and opt-in form, a privacy policy with SMS language, and sample messages with your name and opt-out instructions. Build the opt-in form and privacy policy before you submit, so the reviewer can see them. Our [GoHighLevel team](/services/gohighlevel-agency) handles this as part of every install that uses SMS.",
      },
    ],
    faq: [
      {
        q: "Is A2P 10DLC registration required?",
        a: "Yes, for businesses sending text messages to US numbers from standard 10-digit numbers. US carriers block SMS from unregistered 10DLC numbers.",
      },
      {
        q: "How long does A2P 10DLC approval take?",
        a: "Brand verification can be quick, but campaign review commonly takes from a few days to several weeks, longer if the campaign is rejected and resubmitted.",
      },
      {
        q: "Can I register as a sole proprietor?",
        a: "Yes. Sole proprietor registration exists for businesses without a tax ID, but it has lower sending limits and fewer numbers than a standard registration.",
      },
    ],
    cta: { label: "Let our GoHighLevel team handle A2P setup", href: "/services/gohighlevel-agency" },
  },
  {
    slug: "speed-to-lead",
    title: "Speed to Lead: Why the First Minutes Decide the Sale",
    metaTitle: "Speed to Lead: What It Is, Why It Matters & How to Improve It",
    metaDescription:
      "Speed to lead is how fast you respond to a new lead. See what the research says, why slow follow-up loses sales, and how to answer every lead in under a minute.",
    primaryKeyword: "speed to lead",
    published: "2026-11-16",
    readMinutes: 7,
    summary:
      "Speed to lead is the time between a lead's enquiry and your first response. The faster you respond, the more likely you are to reach and qualify the lead; research in Harvard Business Review found that contacting leads within an hour made companies nearly seven times as likely to qualify them.",
    blocks: [
      { type: "h2", text: "What speed to lead means" },
      {
        type: "p",
        text: "Every lead form, booking request or missed call starts a clock. Speed to lead measures how long it takes your business to make its first meaningful contact: a call, a text or a reply that moves the conversation forward. An automated \"thanks, we'll be in touch\" email does not count.",
      },
      { type: "h2", text: "What the research shows" },
      {
        type: "p",
        text: "A study published in Harvard Business Review in 2011, \"The Short Life of Online Sales Leads\", analysed how thousands of US companies responded to web leads. Companies that tried to contact a lead within an hour were nearly seven times as likely to qualify it as companies that waited even an hour longer, and far more likely than those that waited a day. Many companies took much longer than a day to respond at all.",
      },
      {
        type: "p",
        text: "The reason is simple: when someone fills in a form, they are thinking about the problem right now. Minutes later they are back at work, talking to a competitor, or have forgotten they asked.",
      },
      { type: "h2", text: "Why most businesses respond slowly" },
      {
        type: "ul",
        items: [
          "Leads arrive outside office hours, at night and at weekends",
          "Leads land in an inbox or spreadsheet instead of a CRM that alerts someone",
          "Sales staff are on calls or delivering work when the lead comes in",
          "Nobody owns follow-up, so each person assumes someone else replied",
          "Missed calls are never called back",
        ],
      },
      { type: "h2", text: "How to improve speed to lead" },
      {
        type: "ol",
        items: [
          "Measure it: record the time of each enquiry and the time of first contact in your CRM.",
          "Send every lead source into one CRM so nothing waits in an inbox.",
          "Trigger an instant SMS that starts a real conversation, not just an acknowledgement.",
          "Use missed-call text back so a call you could not answer becomes a text conversation within seconds.",
          "Alert the right person immediately and set a target response time.",
          "Use an [AI appointment setter](/services/ai-appointment-setter) to qualify and book leads that arrive when nobody is available.",
          "Follow up several times over the following days: many leads respond on the second or third attempt.",
        ],
      },
      { type: "h2", text: "Missed call text back" },
      {
        type: "p",
        text: "Missed-call text back sends an automatic SMS to anyone whose call goes unanswered, for example: \"Sorry we missed your call — this is (your business). How can we help?\" It turns a lost call into a conversation that you or an assistant can continue by text. In the US, the number sending the text needs to be [registered for A2P 10DLC](/blog/a2p-10dlc-registration) so the message is delivered.",
      },
      { type: "h2", text: "Speed alone is not enough" },
      {
        type: "p",
        text: "A fast reply that says nothing useful still loses the lead. The first message should acknowledge what the person asked for, ask one easy question that moves toward qualification, and make the next step obvious — usually booking a time to talk. We build exactly this inside [GoHighLevel](/services/gohighlevel-agency) for our clients.",
      },
    ],
    faq: [
      {
        q: "What is a good speed to lead?",
        a: "Aim to make meaningful contact within five minutes, and never more than an hour. Automation can respond in seconds, around the clock.",
      },
      {
        q: "How do you measure speed to lead?",
        a: "Subtract the time a lead was created from the time of the first real contact attempt, and track the average and the slowest cases in your CRM.",
      },
      {
        q: "Does AI help with speed to lead?",
        a: "Yes. An AI appointment setter can text or call new leads within a minute, qualify them and book calls, so speed no longer depends on who is free.",
      },
    ],
    cta: { label: "Answer every lead in under 60 seconds", href: "/services/ai-appointment-setter" },
  },
  {
    slug: "sales-funnel-stages",
    title: "Sales Funnel Stages: Top, Middle and Bottom of the Funnel Explained",
    metaTitle: "Sales Funnel Stages: TOFU vs MOFU vs BOFU, With Examples",
    metaDescription:
      "The stages of a sales funnel — awareness, consideration, decision and retention — and how top-of-funnel and bottom-of-funnel content, offers and metrics differ.",
    primaryKeyword: "sales funnel stages",
    published: "2026-11-18",
    readMinutes: 8,
    summary:
      "A sales funnel has four main stages: awareness (top of funnel), consideration (middle of funnel), decision (bottom of funnel) and retention. Top-of-funnel work attracts people who have never heard of you; bottom-of-funnel work converts people who are ready to buy.",
    blocks: [
      { type: "h2", text: "The four sales funnel stages" },
      {
        type: "ol",
        items: [
          "Awareness (top of funnel, TOFU): a potential buyer notices a problem and discovers you exist — through an ad, a post, a video or a search.",
          "Consideration (middle of funnel, MOFU): they compare ways to solve the problem and decide whether you are credible — through case studies, a webinar, a VSL or a lead magnet.",
          "Decision (bottom of funnel, BOFU): they choose whether to buy from you — through a sales page, an application, a sales call or a checkout.",
          "Retention and expansion: after the first purchase, onboarding, results and follow-up turn customers into repeat buyers and referrers.",
        ],
      },
      {
        type: "p",
        text: "Some models split the stages further — for example interest, evaluation and purchase — but every version describes the same journey from stranger to customer. What matters is that each stage has a clear job and a clear next step.",
      },
      { type: "h2", text: "Top of funnel vs. bottom of funnel" },
      {
        type: "table",
        columns: ["", "Top of funnel (TOFU)", "Bottom of funnel (BOFU)"],
        rows: [
          ["Who is there", "People who may not know they need a solution", "People comparing options and ready to decide"],
          ["Goal", "Attention and first contact", "A purchase, application or booked call"],
          ["Typical content", "Short videos, posts, ads, educational articles", "Case studies, pricing, demos, sales pages, strategy calls"],
          ["Typical offer", "Free content, a lead magnet or a low-cost entry offer", "The core offer itself"],
          ["Main metrics", "Reach, click-through rate, cost per lead", "Conversion rate, show-up rate, close rate, cost per sale"],
        ],
      },
      {
        type: "p",
        text: "Most businesses that struggle with paid traffic are not short of top-of-funnel attention; they are leaking at the bottom. Leads arrive and are not followed up fast enough, calls are booked and not attended, or the sales page does not answer the buyer's last objections.",
      },
      { type: "h2", text: "What the middle of the funnel does" },
      {
        type: "p",
        text: "The middle of the funnel turns attention into trust. For high-ticket service businesses this is usually where a VSL, a webinar, a case study or a qualifying application sits. It filters out people who are not a fit and gives the right people enough proof to want a conversation.",
      },
      { type: "h2", text: "Sales funnel stages for a high-ticket service business" },
      { type: "p", text: "A typical path we build for coaches, consultants and agencies looks like this:" },
      {
        type: "ol",
        items: [
          "Top: Meta or Google ads, or organic content, aimed at one clearly defined buyer.",
          "Middle: a [VSL](/services/vsl-funnels) or [webinar](/services/webinar-funnels) that explains the method and shows proof, or a [low-ticket offer](/services/low-ticket-funnels) that turns strangers into buyers.",
          "Bottom: an application or booking page, followed by instant SMS and email follow-up and reminders so booked calls show up — see [speed to lead](/blog/speed-to-lead).",
          "After the sale: onboarding, results tracking and a follow-up sequence that produces reviews, referrals and repeat purchases.",
        ],
      },
      { type: "h2", text: "How to measure each stage" },
      {
        type: "ul",
        items: [
          "Top: cost per thousand impressions, click-through rate, cost per landing-page view.",
          "Middle: opt-in rate, cost per lead (see our [cost-per-lead benchmarks](/work-proof#benchmarks)), video watch time or webinar attendance.",
          "Bottom: application or booking rate, show-up rate, close rate, cost per acquisition.",
          "Retention: refund rate, repeat purchase rate, referrals.",
        ],
      },
      {
        type: "p",
        text: "Track every stage in one CRM so you can see where people drop out. Fixing the weakest stage is almost always cheaper than buying more traffic at the top.",
      },
    ],
    faq: [
      {
        q: "What are the stages of a sales funnel?",
        a: "Awareness (top of funnel), consideration (middle of funnel), decision (bottom of funnel) and retention. Each stage moves a prospect one step closer to buying, then to buying again.",
      },
      {
        q: "What is the difference between top of funnel and bottom of funnel?",
        a: "Top of funnel reaches people who may not know they need a solution and aims for attention. Bottom of funnel serves people ready to decide and aims for a purchase, application or booked call.",
      },
      {
        q: "What does MOFU mean?",
        a: "MOFU stands for middle of funnel: the consideration stage, where prospects evaluate whether you can solve their problem, often through case studies, webinars, VSLs or lead magnets.",
      },
    ],
    cta: { label: "Get a funnel built for every stage", href: "/services" },
  },
  {
    slug: "funnel-builder-vs-agency",
    title: "Funnel Builder vs. Funnel Agency: Which Do You Need?",
    metaTitle: "Funnel Builder vs. Funnel Agency: Software or Done-for-You?",
    metaDescription:
      "A funnel builder is software for making sales funnels yourself; a funnel agency builds them for you. Compare cost, time, skills and results to choose the right one.",
    primaryKeyword: "funnel builder",
    published: "2026-11-23",
    readMinutes: 7,
    summary:
      "A funnel builder is software, such as GoHighLevel, ClickFunnels or Systeme.io, that lets you create landing pages, checkouts and follow-up yourself. A funnel agency (or freelance funnel builder) uses that software to plan, write, build and launch the funnel for you. Choose software if you have the time and skills to write, design and connect everything; choose an agency if your time is better spent selling and you need it working fast.",
    blocks: [
      { type: "h2", text: "What a funnel builder is" },
      {
        type: "p",
        text: "A funnel builder is a platform for building the pages and steps of a sales funnel without coding: landing pages, opt-in forms, order forms and checkouts, upsells, thank-you pages and, in most platforms, the email and SMS follow-up that runs after someone signs up. Popular options include GoHighLevel, ClickFunnels and Systeme.io; website builders such as Kajabi or Leadpages cover parts of the same job.",
      },
      {
        type: "p",
        text: "The software gives you the tools. It does not give you the offer, the copy, the design decisions, the tracking setup or the follow-up strategy. Those still have to come from someone.",
      },
      { type: "h2", text: "What a funnel agency does" },
      {
        type: "p",
        text: "The phrase \"funnel builder\" is also used for people: freelancers and agencies who build funnels for clients inside that software. A done-for-you funnel agency usually covers the full job:",
      },
      {
        type: "ul",
        items: [
          "Strategy: choosing the funnel type for the offer and price, such as a VSL, webinar, application or low-ticket funnel.",
          "Copy and design: headlines, page copy, proof and a fast, mobile-first layout.",
          "Build and integrations: checkout or calendar, CRM pipeline, tags, and email and SMS follow-up.",
          "Tracking and launch: pixel and analytics on every step, then improving the weakest step after launch.",
        ],
      },
      {
        type: "p",
        text: "That is what our [done-for-you sales funnels](/services/done-for-you-sales-funnels) include, usually built in GoHighLevel or ClickFunnels.",
      },
      { type: "h2", text: "Funnel builder software vs. a funnel agency" },
      {
        type: "table",
        columns: ["", "Funnel builder software (DIY)", "Funnel agency (done for you)"],
        rows: [
          ["Who does the work", "You or your team", "The agency"],
          ["Main cost", "Monthly software subscription plus your time", "A project fee or retainer, plus the software"],
          ["Skills needed", "Copywriting, design, automation, tracking and ads", "Knowing your offer and your customer"],
          ["Time to launch", "Depends on your experience and available hours", "Set by the agency's scope and timeline"],
          ["Integrations", "You connect checkout, calendar, CRM and messaging", "Connected and tested for you"],
          ["Best for", "Simple offers, tight budgets, people who enjoy building", "Busy owners, high-ticket offers, paid traffic at scale"],
        ],
      },
      { type: "h2", text: "When DIY funnel builder software is the right choice" },
      {
        type: "ul",
        items: [
          "Your offer is simple, such as one lead magnet or one low-priced product.",
          "You are comfortable writing copy and setting up automations and tracking.",
          "You are still testing whether anyone wants the offer and need to spend as little as possible.",
          "You have more time than budget.",
        ],
      },
      { type: "h2", text: "When hiring a funnel agency makes more sense" },
      {
        type: "ul",
        items: [
          "You are spending, or about to spend, real money on ads, so every step that leaks costs you directly.",
          "Your offer is high-ticket and needs a VSL, webinar or application step to qualify buyers before a call.",
          "Leads need fast follow-up by text and email, reminders and a CRM pipeline, not just a page.",
          "Your time is worth more selling and delivering than learning software.",
        ],
      },
      {
        type: "p",
        text: "For example, in one of our client receipts a ClickFunnels webinar registration page reached a 27.01% opt-in rate: 1,515 registrations from 5,610 unique visitors (the screenshot is on our [work proof page](/work-proof)). The software was the same one anyone can buy; the difference was the offer, the copy and the testing.",
      },
      { type: "h2", text: "Questions to ask before hiring a funnel builder" },
      {
        type: "ol",
        items: [
          "Will the funnel, ad account and CRM be in my accounts, so I own them?",
          "Who writes the copy, and is it written for my offer rather than a template?",
          "What is connected at launch: checkout or calendar, CRM, email and SMS, tracking?",
          "Can I see real results from client accounts, with dates?",
          "What happens after launch: who looks at the numbers and fixes the weakest step?",
        ],
      },
      {
        type: "p",
        text: "If you want the whole path built, including ads and follow-up, see our [lead generation funnels by industry](/lead-generation) or our [landing page design](/services/landing-page-design) service for single pages.",
      },
    ],
    faq: [
      {
        q: "What is the best funnel builder?",
        a: "There is no single best one. GoHighLevel suits businesses that want funnels, CRM and SMS in one place; ClickFunnels is built around sales funnels and checkouts; Systeme.io is a lower-cost all-in-one. Choose based on what you need to connect, not on page templates.",
      },
      {
        q: "Is a funnel builder the same as a website builder?",
        a: "Not quite. Website builders are made for multi-page sites. Funnel builders are made for step-by-step paths to one action, with checkouts, upsells and follow-up built in.",
      },
      {
        q: "Can I hire someone to build my funnel?",
        a: "Yes. Freelancers and agencies build funnels inside the software you choose. Check that the work is done in your own accounts and that copy, integrations and tracking are included.",
      },
      {
        q: "How long does it take to build a sales funnel?",
        a: "A single landing page can be quick; a full funnel with copy, checkout or booking, CRM, follow-up and tracking takes longer. The bigger factor is usually how clear the offer is before the build starts.",
      },
    ],
    cta: { label: "Have your funnel built for you", href: "/services/done-for-you-sales-funnels" },
  },
  {
    slug: "what-is-a-lead-generation-funnel",
    title: "What Is a Lead Generation Funnel? Stages, Examples and Costs",
    metaTitle: "What Is a Lead Generation Funnel? Stages, Examples & Costs",
    metaDescription:
      "A lead generation funnel turns ad clicks into booked appointments: offer, ads, a qualifying page, instant follow-up and a CRM. See the stages and real cost-per-lead figures.",
    primaryKeyword: "what is a lead generation funnel",
    published: "2026-11-23",
    readMinutes: 7,
    summary:
      "A lead generation funnel is the connected path that turns strangers into booked appointments: an offer promoted with ads, a short page or form that captures and qualifies the lead, instant follow-up by text and email, and a CRM that tracks each lead back to the ad that produced it. It is built to produce enquiries for a service, not to sell a product online.",
    blocks: [
      { type: "h2", text: "Lead generation funnel meaning" },
      {
        type: "p",
        text: "A lead is someone who has shown interest and shared contact details. A lead generation funnel is the system that produces those leads in a predictable way and moves them to a conversation with your team. Service businesses use it when the sale happens on a call, at an estimate or in a consultation rather than at an online checkout.",
      },
      { type: "h2", text: "The five stages of a lead generation funnel" },
      {
        type: "ol",
        items: [
          "Offer: a reason to raise a hand now, such as a free inspection, a quote, a consultation or a low-cost first visit.",
          "Traffic: ads on Meta, Google or other channels, aimed at the people who can buy, in the area you serve.",
          "Capture and qualify: a landing page, quiz or form that collects contact details and the answers your team needs, such as job type, budget and timeline.",
          "Follow-up: an instant text and email, a booking link, [missed call text back](/services/missed-call-text-back) for phone enquiries, and reminders before the appointment.",
          "Tracking: a CRM pipeline that shows each lead's source, status and value, so you can see cost per lead, cost per appointment and revenue per campaign.",
        ],
      },
      { type: "h2", text: "Lead generation funnel vs. sales funnel" },
      {
        type: "table",
        columns: ["", "Lead generation funnel", "Sales funnel"],
        rows: [
          ["Goal", "An enquiry or booked appointment", "A purchase"],
          ["Ends with", "A call, estimate or consultation", "A checkout"],
          ["Typical businesses", "Home services, clinics, mortgage, local services", "Courses, products, low-ticket offers"],
          ["Key metric", "Cost per lead and per appointment", "Cost per sale and return on ad spend"],
        ],
      },
      {
        type: "p",
        text: "Many businesses need both: a lead generation funnel for the first conversation and [sales funnel stages](/blog/sales-funnel-stages) behind it to turn the conversation into revenue.",
      },
      { type: "h2", text: "Examples from real client accounts" },
      {
        type: "p",
        text: "These figures come from dated ad-account screenshots on our [work proof page](/work-proof). They show what a working lead generation funnel produced, not what yours will cost; cost per lead depends on industry, market and offer.",
      },
      {
        type: "table",
        columns: ["Industry", "Result", "Cost per lead", "Period"],
        rows: [
          ["Mortgage", "10,172 leads from 8 campaigns", "$8.06", "Apr 2026"],
          ["Solar", "300 homeowner leads", "$14.71", "Apr 10 to 20, 2026"],
          ["Pressure washing", "167 leads", "$13.37", "Jul 2026"],
          ["Home services (Florida)", "211 website leads in 7 days", "$11.27", "May 9 to 15, 2026"],
        ],
      },
      {
        type: "p",
        text: "See how the funnel is built for each industry on our [lead generation funnels](/lead-generation) page, including [HVAC](/lead-generation/hvac), [chiropractic](/lead-generation/chiropractic) and [pressure washing](/lead-generation/pressure-washing).",
      },
      { type: "h2", text: "Why most lead generation funnels underperform" },
      {
        type: "ul",
        items: [
          "Slow follow-up: leads that wait hours often book with someone else. See [speed to lead](/blog/speed-to-lead).",
          "No qualification: the calendar fills with people who were never a fit.",
          "Shared leads: buying leads that are also sold to competitors turns every call into a price war.",
          "No tracking: without a pipeline tied to each campaign, you cannot tell which spend to raise and which to cut.",
        ],
      },
      { type: "h2", text: "How to build one" },
      {
        type: "p",
        text: "Start with the offer and the qualification questions, then build the page, then the follow-up, then the tracking, and only then turn on ads. You can build it yourself in a funnel builder, or have it built for you: our [done-for-you sales funnels](/services/done-for-you-sales-funnels) and [landing page design](/services/landing-page-design) services cover each part.",
      },
    ],
    faq: [
      {
        q: "What is the difference between a lead generation funnel and a landing page?",
        a: "A landing page is one step. A lead generation funnel is the whole path: the offer and ads before the page, and the follow-up, booking and tracking after it.",
      },
      {
        q: "How much does a lead from a lead generation funnel cost?",
        a: "In the client receipts above it ranged from $8.06 to $14.71 per lead, depending on industry and market. Your cost depends on your offer, area and competition.",
      },
      {
        q: "Do I need a CRM for a lead generation funnel?",
        a: "Yes. Without a CRM you cannot follow up automatically or see which campaign produced which appointment and sale.",
      },
      {
        q: "Which businesses benefit most from a lead generation funnel?",
        a: "Businesses that sell through a call, estimate or appointment: home services, clinics, mortgage brokers, solar installers, coaches and consultants.",
      },
    ],
    cta: { label: "See lead generation funnels by industry", href: "/lead-generation" },
  },
];

export const getPostBySlug = (slug: string) => BLOG_POSTS.find((p) => p.slug === slug);
