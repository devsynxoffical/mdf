import type { Metadata } from "next";
import Link from "next/link";
import ContentShell from "@/components/content/ContentShell";
import JsonLd from "@/components/seo/JsonLd";
import UFFooter from "@/components/uf/UFFooter";
import { BLOG_POSTS } from "@/lib/blog";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/blog",
  title: "Funnel & Lead Follow-Up Guides | Million Dollar Funnel™",
  description:
    "Practical guides on VSLs, A2P 10DLC registration, speed to lead and the funnels and follow-up systems that turn high-ticket leads into booked calls.",
});

export default function BlogIndex() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Insights", href: "/blog" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, path: c.href })))} />
      <ContentShell
        eyebrow="( Insights ) — Guides"
        title="Funnel & Follow-Up Guides"
        intro="Straight answers on building funnels, following up with leads and getting more booked calls, from the team that builds them every week."
        crumbs={crumbs}
      >
        <div className="grid gap-5">
          {BLOG_POSTS.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="block rounded-2xl border border-white/10 bg-white/[0.03] p-6 !no-underline transition hover:border-sky/40 hover:bg-[#1254EC]/10"
            >
              <span className="block font-sans text-[20px] font-bold leading-snug text-white">{p.title}</span>
              <span className="mt-2 block text-[15px] leading-relaxed text-slate-400">{p.metaDescription}</span>
              <span className="mt-3 block font-mono text-[11px] uppercase tracking-[0.12em] text-sky">{p.readMinutes} min read ↗</span>
            </Link>
          ))}
        </div>
      </ContentShell>
      <UFFooter />
    </>
  );
}
