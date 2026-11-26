import type { Metadata } from "next";
import Link from "next/link";
import ContentShell, { ContentCta, LinkCards } from "@/components/content/ContentShell";
import JsonLd from "@/components/seo/JsonLd";
import UFFooter from "@/components/uf/UFFooter";
import { BLOG_POSTS } from "@/lib/blog";
import { pageCard } from "@/lib/pageCards";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/blog",
  title: "Sales Funnel and Lead Generation Guides | MDF™",
  description:
    "Guides on sales funnels, lead generation funnels, VSLs, speed to lead and A2P 10DLC, with real results from client accounts and clear next steps.",
});

const TOPICS: { label: string; links: [string, string][] }[] = [
  {
    label: "Sales funnels",
    links: [
      ["/blog/sales-funnel-stages", "sales funnel stages"],
      ["/blog/sales-funnel-examples", "sales funnel examples"],
      ["/blog/sales-funnel-vs-marketing-funnel", "sales funnel vs marketing funnel"],
      ["/blog/funnel-builder-vs-agency", "funnel builder vs agency"],
      ["/blog/what-is-a-vsl", "VSL funnels"],
    ],
  },
  {
    label: "Lead generation",
    links: [
      ["/blog/what-is-a-lead-generation-funnel", "lead generation funnel"],
      ["/blog/chiropractic-marketing-ideas", "chiropractic marketing ideas"],
    ],
  },
  {
    label: "Follow-up and texting",
    links: [
      ["/blog/speed-to-lead", "speed to lead"],
      ["/blog/a2p-10dlc-registration", "A2P 10DLC registration"],
    ],
  },
];

const MONEY_PAGES = [
  "/sales-funnel-agency",
  "/services/done-for-you-sales-funnels",
  "/lead-generation",
  "/services/missed-call-text-back",
  "/services/landing-page-design",
  "/services/vsl-funnels",
];

const fmt = (d: string) =>
  new Date(d + "T00:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

export default function BlogIndex() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Guides", href: "/blog" },
  ];
  const posts = [...BLOG_POSTS].sort((a, b) => b.published.localeCompare(a.published));
  const [featured, ...rest] = posts;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, path: c.href })))} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Sales funnel and lead generation guides",
          itemListElement: posts.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(`/blog/${p.slug}`), name: p.title })),
        }}
      />
      <ContentShell
        eyebrow="( Guides ) · Funnels & follow-up"
        title="Sales Funnel and Lead Generation Guides"
        intro="Straight answers on sales funnels, lead generation funnels and lead follow-up, written by the team that builds them every week and backed by real client results."
        crumbs={crumbs}
        aside={false}
      >
        <Link href={`/blog/${featured.slug}`} className="group block overflow-hidden rounded-[28px] border border-sky/25 bg-gradient-to-br from-[#0B1A45] via-[#071233] to-[#050B1E] p-7 shadow-[0_0_40px_rgba(18,84,236,0.15)] transition hover:border-sky/50 md:p-10">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-sky">
            Latest · {fmt(featured.published)} · {featured.readMinutes} min read
          </span>
          <span className="mt-4 block max-w-[760px] font-sans text-[clamp(24px,3vw,36px)] font-extrabold leading-tight tracking-tight text-white">
            {featured.title}
          </span>
          <span className="mt-4 block max-w-[720px] text-[16px] leading-relaxed text-slate-300">{featured.metaDescription}</span>
          <span className="mt-6 inline-flex items-center gap-2 font-sans text-[14px] font-semibold text-sky group-hover:text-white">
            Read the guide <span aria-hidden>↗</span>
          </span>
        </Link>

        <LinkCards heading="All guides" items={rest.map((p) => pageCard(`/blog/${p.slug}`))} />

        <h2 className="content-h2">Guides by topic</h2>
        <ul>
          {TOPICS.map((t) => (
            <li key={t.label}>
              <strong>{t.label}:</strong>{" "}
              {t.links.map(([href, label], i) => (
                <span key={href}>
                  {i > 0 && ", "}
                  <Link href={href} className="rt-link">
                    {label}
                  </Link>
                </span>
              ))}
            </li>
          ))}
        </ul>

        <LinkCards heading="Services these guides cover" items={MONEY_PAGES.map((h) => pageCard(h))} />

        <ContentCta
          heading="Rather have it built for you?"
          body="We build and run the funnels, follow-up and CRM these guides describe. Book a 15–20 minute strategy call."
        />
      </ContentShell>
      <UFFooter />
    </>
  );
}
