import type { Metadata } from "next";
import Link from "next/link";
import ContentShell, { ContentCta, LinkCards } from "@/components/content/ContentShell";
import JsonLd from "@/components/seo/JsonLd";
import UFFooter from "@/components/uf/UFFooter";
import { BLOG_POSTS } from "@/lib/blog";
import { SERVICE_PAGES } from "@/lib/services";
import { pageCard } from "@/lib/pageCards";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/blog",
  title: "Funnel & Lead Follow-Up Guides | Million Dollar Funnel™",
  description:
    "Practical guides on VSLs, A2P 10DLC registration, speed to lead and the funnels and follow-up systems that turn high-ticket leads into booked calls.",
});

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
          name: "Funnel & follow-up guides",
          itemListElement: posts.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(`/blog/${p.slug}`), name: p.title })),
        }}
      />
      <ContentShell
        eyebrow="( Guides ) — Funnels & follow-up"
        title="Funnel & Follow-Up Guides"
        intro="Straight answers on building funnels, following up with leads and getting more booked calls — from the team that builds them every week."
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

        <LinkCards heading="Services these guides cover" items={SERVICE_PAGES.map((s) => pageCard(`/services/${s.slug}`))} />

        <ContentCta
          heading="Rather have it built for you?"
          body="We build and run the funnels, follow-up and CRM these guides describe. Book a 15–20 minute strategy call."
        />
      </ContentShell>
      <UFFooter />
    </>
  );
}
