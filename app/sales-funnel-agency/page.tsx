import type { Metadata } from "next";
import Link from "next/link";
import ContentShell, { ContentFaq, HeroActions, LinkCards } from "@/components/content/ContentShell";
import LeadSection from "@/components/leads/LeadSection";
import JsonLd from "@/components/seo/JsonLd";
import UFFooter from "@/components/uf/UFFooter";
import { pageCard } from "@/lib/pageCards";
import { SITE_URL, absoluteUrl, breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

const PATH = "/sales-funnel-agency";

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: "Sales Funnel Agency and Funnel Building Services",
  description:
    "Sales funnel agency for service businesses: strategy, copy, design, build and follow-up. Packages from $1,497. One funnel we built sold 13,630 times.",
});

const ANSWER =
  "A sales funnel agency plans, writes, designs and builds the steps that turn a stranger into a customer: the ad or post, the landing page, the offer, the checkout or booking step and the follow-up. Million Dollar Funnel™ is a done-for-you sales funnel agency for service businesses. Our published packages run from $1,497 to $4,997, and most funnels launch in about two to four weeks.";

const FAQ = [
  {
    q: "What does a sales funnel agency do?",
    a: "A sales funnel agency plans the path from first click to sale, writes the copy, designs and builds the pages, connects checkout or booking, CRM and email and SMS follow-up, and tracks every step so the weakest one can be improved.",
  },
  {
    q: "How much does a sales funnel agency cost?",
    a: "Our published packages are $1,497 for Design Only, $2,497 for Design + Copy Build and $4,997 for the Full AC Funnel Suite with integrations, follow-up emails and 30 days of post-launch support. Ad spend and software are paid separately.",
  },
  {
    q: "Is a sales funnel builder the same as a sales funnel agency?",
    a: "No. A sales funnel builder is usually software, such as GoHighLevel or ClickFunnels, that you use to build pages yourself. A sales funnel agency uses that software to build the funnel for you, including strategy, copy, design, automation and testing.",
  },
  {
    q: "How long does it take to build a sales funnel?",
    a: "A focused funnel usually launches in about two to four weeks. The timeline depends on how clear the offer is, how many pages are needed and how much automation is connected.",
  },
  {
    q: "Do I own the funnel?",
    a: "Yes. We build in your own accounts, usually GoHighLevel or ClickFunnels, so the pages, automations, ad account and CRM data stay with your business.",
  },
  {
    q: "What results can a sales funnel agency get?",
    a: "Results depend on the offer and traffic. Published examples from our client accounts include a funnel that sold 13,630 times with $847,307 in revenue, 10,172 mortgage leads in one month at $8.06 each, and 44 prepaid chiropractic consults in six days.",
  },
];

const TOC = [
  { id: "what-we-build", label: "What we build" },
  { id: "pricing", label: "Sales funnel prices" },
  { id: "builder-vs-agency", label: "Builder vs agency vs DIY" },
  { id: "process", label: "How we build a funnel" },
  { id: "results", label: "Case studies" },
  { id: "who", label: "Who we work with" },
  { id: "faq", label: "FAQ" },
];

const TYPES: [string, string, string][] = [
  ["/services/done-for-you-sales-funnels", "Done-for-you sales funnels", "The whole funnel, planned, written, built and launched for you."],
  ["/services/vsl-funnels", "VSL funnels", "A video sales letter that explains the offer, then a booking or checkout step."],
  ["/services/webinar-funnels", "Webinar funnels", "Registration, reminders, replay and a booking or sales step after the event."],
  ["/services/application-funnels", "Application funnels", "A short application that qualifies prospects before they reach your calendar."],
  ["/services/low-ticket-funnels", "Low ticket funnels", "A small first offer that turns cold traffic into buyers and helps fund ads."],
  ["/services/sales-funnels-for-coaches", "Sales funnels for coaches", "Front-end offer, webinar or VSL, application and booking for coaching programs."],
  ["/services/landing-page-design", "Landing page design", "Single pages built for one offer and one action, for paid traffic."],
  ["/lead-generation", "Lead generation funnels", "Ads, a qualifying funnel and instant follow-up for local service businesses."],
];

export default function SalesFunnelAgencyPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Sales Funnel Agency", href: PATH },
  ];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Sales funnel agency services",
          serviceType: "Sales funnel agency",
          description: ANSWER,
          url: absoluteUrl(PATH),
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: ["United States", "United Kingdom", "Canada", "Australia"],
          offers: [
            { "@type": "Offer", name: "Design Only", price: "1497", priceCurrency: "USD" },
            { "@type": "Offer", name: "Design + Copy Build", price: "2497", priceCurrency: "USD" },
            { "@type": "Offer", name: "Full AC Funnel Suite", price: "4997", priceCurrency: "USD" },
          ],
        }}
      />
      <JsonLd data={faqJsonLd(FAQ)} />
      <JsonLd data={breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, path: c.href })))} />
      <ContentShell
        eyebrow="Sales funnel agency"
        title="Sales Funnel Agency: Funnels Built, Launched and Improved for You"
        crumbs={crumbs}
        toc={TOC}
        intro={<p>Strategy, copy, design, build, follow-up and tracking from one team, in your own accounts.</p>}
        actions={<HeroActions secondaryHref="#pricing" secondaryLabel="See prices" />}
        stats={[
          { value: "13,630", label: "Sales from one funnel" },
          { value: "$1.52M", label: "One offer · 19 months" },
          { value: "$1,497", label: "Packages from" },
          { value: "2 to 4 wks", label: "Typical launch" },
        ]}
      >
        <div className="answer-box">
          <span className="answer-box-label">Short answer</span>
          {ANSWER}
        </div>

        <h2 id="what-we-build" className="content-h2">What a sales funnel agency builds</h2>
        <p>
          Most businesses do not need more pages. They need one clear path that moves a buyer from interest to action, and follow-up that
          catches the people who are not ready yet. We build that path around your offer and price point, then connect it to the tools you
          already use. Every funnel includes the copy, the design, the build, the integrations and tracking on each step.
        </p>
        <ul>
          {TYPES.map(([href, name, desc]) => (
            <li key={href}>
              <Link href={href} className="rt-link">{name}</Link>: {desc}
            </li>
          ))}
        </ul>
        <p>
          Behind every funnel sits the follow-up: instant text and email when a lead comes in,{" "}
          <Link href="/services/missed-call-text-back" className="rt-link">missed call text back</Link>, reminders before booked calls and
          a CRM pipeline that shows which campaign produced each sale.
        </p>

        <h2 id="pricing" className="content-h2">How much does a sales funnel agency cost?</h2>
        <p>
          These are our published package prices. Ad spend and software subscriptions are paid separately, directly to the platforms, so
          you keep ownership of the accounts.
        </p>
        <div className="content-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Package</th>
                <th scope="col">Price</th>
                <th scope="col">What is included</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Design Only</th>
                <td>$1,497</td>
                <td>Market research and offer positioning, funnel strategy and structure, conversion design, custom graphics, mobile layouts</td>
              </tr>
              <tr>
                <th scope="row">Design + Copy Build</th>
                <td>$2,497</td>
                <td>Everything in Design Only, plus sales page and long-form copy, checkout and order bump copy, upsell and VSL copy, booking page and thank-you page with a show-up script</td>
              </tr>
              <tr>
                <th scope="row">Full AC Funnel Suite</th>
                <td>$4,997</td>
                <td>Everything in Design + Copy Build, plus full tech setup and integrations, membership area setup, follow-up email sequences and 30 days of post-launch support</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Ongoing ad management and lead generation are scoped separately after a short call, because they depend on your market and
          budget.
        </p>

        <h2 id="builder-vs-agency" className="content-h2">Sales funnel builder vs agency vs DIY</h2>
        <p>
          Many people searching for a sales funnel builder want software. Others want someone to build the funnel for them. This table
          shows the difference so you can pick the right option for your stage.
        </p>
        <div className="content-table">
          <table>
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Funnel builder software</th>
                <th scope="col">Freelancer</th>
                <th scope="col">Sales funnel agency</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">What you get</th><td>Tools and templates</td><td>Pages built to your brief</td><td>Strategy, copy, design, build, follow-up and testing</td></tr>
              <tr><th scope="row">Who writes the copy</th><td>You</td><td>Often you</td><td>The agency, for your offer and buyer</td></tr>
              <tr><th scope="row">Integrations</th><td>You connect them</td><td>Sometimes included</td><td>Checkout or booking, CRM, email and SMS connected</td></tr>
              <tr><th scope="row">Tracking and testing</th><td>Up to you</td><td>Rarely included</td><td>Every step tracked, weakest step improved first</td></tr>
              <tr><th scope="row">Your time</th><td>High</td><td>Medium</td><td>Low</td></tr>
              <tr><th scope="row">Best for</th><td>Builders with time and skills</td><td>A single page or a fixed brief</td><td>A proven offer that needs a working system fast</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          For a longer comparison, read our guide on{" "}
          <Link href="/blog/funnel-builder-vs-agency" className="rt-link">funnel builder vs funnel agency</Link>, and the difference between a{" "}
          <Link href="/blog/sales-funnel-vs-marketing-funnel" className="rt-link">sales funnel and a marketing funnel</Link>.
        </p>

        <h2 id="process" className="content-h2">How we build a sales funnel</h2>
        <ol>
          <li><strong>Map the offer.</strong> Who it is for, what it promises and the one action the funnel must cause.</li>
          <li><strong>Plan the path.</strong> The steps a buyer takes, the qualification questions and the tracking plan.</li>
          <li><strong>Write and design.</strong> Conversion copy and a fast, mobile-first design in your brand.</li>
          <li><strong>Build and connect.</strong> Pages in GoHighLevel, ClickFunnels or your platform, with checkout or calendar, CRM and follow-up connected.</li>
          <li><strong>Launch and improve.</strong> Live on real traffic, measured every week, with the weakest step tested first.</li>
        </ol>

        <h2 id="results" className="content-h2">Sales funnel case studies</h2>
        <p>Every number below comes from a published case study or a dated ad-account screenshot.</p>
        <ul>
          <li>
            <strong>13,630 sales from one funnel.</strong> A coaching client was chasing high-ticket sales with no front end that worked. We
            rebuilt the backend and tracking around a low-ticket funnel: 13,630 sales, $847,307 in revenue, 3.32 return on ad spend.{" "}
            <Link href="/cases/coaching-lto" className="rt-link">Read the coaching case study</Link>.
          </li>
          <li>
            <strong>$1,520,000 in 19 months.</strong> One high-ticket offer scaled with a VSL funnel, qualification and automated follow-up.{" "}
            <Link href="/cases/1-52m-case-study" className="rt-link">Read the $1.52M case study</Link>.
          </li>
          <li>
            <strong>10,172 mortgage leads in one month.</strong> One lead generation funnel at $8.06 per lead.{" "}
            <Link href="/lead-generation/mortgage" className="rt-link">See the mortgage funnel</Link>.
          </li>
          <li>
            <strong>1,515 webinar registrations at a 27.01% opt-in rate.</strong> A ClickFunnels registration page with 5,610 unique visitors.{" "}
            <Link href="/services/landing-page-design" className="rt-link">See landing page design</Link>.
          </li>
        </ul>
        <p>
          More receipts are on the <Link href="/work-proof" className="rt-link">work proof page</Link>, and live funnels we built are on the{" "}
          <Link href="/funnels" className="rt-link">funnels page</Link>.
        </p>

        <h2 id="who" className="content-h2">Who we work with</h2>
        <p>
          We build sales funnels for coaches, consultants, agencies and B2B service companies, and lead generation funnels for local service
          businesses such as <Link href="/lead-generation/hvac" className="rt-link">HVAC companies</Link>,{" "}
          <Link href="/lead-generation/chiropractic" className="rt-link">chiropractors</Link>,{" "}
          <Link href="/lead-generation/home-improvement" className="rt-link">home improvement contractors</Link> and{" "}
          <Link href="/lead-generation/pressure-washing" className="rt-link">pressure washing companies</Link>. A funnel works best when the
          offer is already proven and you want a system that brings buyers in without chasing every lead by hand.
        </p>

        <ContentFaq items={FAQ} />

        <LinkCards heading="Related" items={["/services", "/services/done-for-you-sales-funnels", "/blog/funnel-builder-vs-agency", "/cases"].map((h) => pageCard(h))} />

        <LeadSection
          source={PATH}
          heading="Want a sales funnel built for your offer?"
          body="Tell us about your offer and current results. We will reply with the funnel we would build, the timeline and the price."
        />
      </ContentShell>
      <UFFooter />
    </>
  );
}
