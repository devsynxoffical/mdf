/**
 * Insight articles (/blog/[slug]). Each targets an informational query with
 * measured search demand and links to the matching service page.
 */

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

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
        text: "The video only does part of the work. Viewers who watch but do not act need follow-up by email and SMS, booked calls need reminders so they show up, and every step needs tracking so you can see where people drop off.",
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
        text: "Improving the weakest of these numbers is usually cheaper than buying more traffic. A strong hook raises play rate and retention; a clearer offer raises clicks; reminders raise show-up rates.",
      },
      { type: "h2", text: "When a VSL is the right choice" },
      {
        type: "p",
        text: "Use a VSL when buyers need to understand something before they will buy: a new method, a premium price or a service they have not bought before. If your sales calls all start with the same explanation, that explanation probably belongs in a VSL. If your offer is simple and price-driven, a short landing page will usually convert as well for far less effort.",
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
        text: "Since 2023, US carriers have blocked SMS sent through unregistered 10DLC numbers. For any business that relies on text follow-up — appointment reminders, lead nurture, no-show recovery or an AI appointment setter — an unregistered or rejected campaign means messages silently fail to arrive.",
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
        text: "If you text through a CRM such as GoHighLevel, registration is done inside that platform's phone settings, which pass your details to the carrier registry. The same requirements apply: matching business details, a compliant website and opt-in form, a privacy policy with SMS language, and sample messages with your name and opt-out instructions. Build the opt-in form and privacy policy before you submit, so the reviewer can see them.",
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
          "Use an AI appointment setter to qualify and book leads that arrive when nobody is available.",
          "Follow up several times over the following days: many leads respond on the second or third attempt.",
        ],
      },
      { type: "h2", text: "Missed call text back" },
      {
        type: "p",
        text: "Missed-call text back sends an automatic SMS to anyone whose call goes unanswered, for example: \"Sorry we missed your call — this is [business]. How can we help?\" It turns a lost call into a conversation that you or an assistant can continue by text. In the US, the number sending the text needs to be registered for A2P 10DLC so the message is delivered.",
      },
      { type: "h2", text: "Speed alone is not enough" },
      {
        type: "p",
        text: "A fast reply that says nothing useful still loses the lead. The first message should acknowledge what the person asked for, ask one easy question that moves toward qualification, and make the next step obvious — usually booking a time to talk.",
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
];

export const getPostBySlug = (slug: string) => BLOG_POSTS.find((p) => p.slug === slug);
