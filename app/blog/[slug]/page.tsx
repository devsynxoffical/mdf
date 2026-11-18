import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContentShell, { ContentCta, ContentFaq } from "@/components/content/ContentShell";
import JsonLd from "@/components/seo/JsonLd";
import UFFooter from "@/components/uf/UFFooter";
import { BLOG_POSTS, getPostBySlug, type BlogBlock } from "@/lib/blog";
import { SEO, SITE_URL, absoluteUrl, breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const p = getPostBySlug(params.slug);
  if (!p) return {};
  const meta = pageMetadata({ path: `/blog/${p.slug}`, title: p.metaTitle, description: p.metaDescription });
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", publishedTime: p.published } };
}

function Block({ b }: { b: BlogBlock }) {
  switch (b.type) {
    case "h2":
      return <h2>{b.text}</h2>;
    case "h3":
      return <h3>{b.text}</h3>;
    case "ul":
      return (
        <ul>
          {b.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {b.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[520px] border-collapse text-left text-[14.5px]">
            <thead className="bg-white/[0.04] font-mono text-[11px] uppercase tracking-[0.12em] text-slate-400">
              <tr>
                {b.columns.map((c, i) => (
                  <th key={i} scope="col" className="px-4 py-3">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r) => (
                <tr key={r[0]} className="border-t border-white/5">
                  <th scope="row" className="px-4 py-3 font-semibold text-white">
                    {r[0]}
                  </th>
                  {r.slice(1).map((c, i) => (
                    <td key={i} className="px-4 py-3">
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return <p>{b.text}</p>;
  }
}

export default function BlogPostPage({ params }: Props) {
  const p = getPostBySlug(params.slug);
  if (!p) notFound();
  const path = `/blog/${p.slug}`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Insights", href: "/blog" },
    { name: p.title, href: path },
  ];
  const others = BLOG_POSTS.filter((o) => o.slug !== p.slug);
  const date = new Date(p.published + "T00:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: p.title,
          description: p.metaDescription,
          datePublished: p.published,
          dateModified: p.published,
          mainEntityOfPage: absoluteUrl(path),
          url: absoluteUrl(path),
          image: absoluteUrl(SEO.ogImage),
          author: { "@id": `${SITE_URL}/#organization` },
          publisher: { "@id": `${SITE_URL}/#organization` },
        }}
      />
      <JsonLd data={faqJsonLd(p.faq)} />
      <JsonLd data={breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, path: c.href })))} />
      <ContentShell
        eyebrow="( Insights ) — Guide"
        title={p.title}
        crumbs={crumbs}
        meta={
          <>
            By the {SEO.name} team · <time dateTime={p.published}>{date}</time> · {p.readMinutes} min read
          </>
        }
      >
        <div className="rounded-2xl border border-sky/25 bg-[#1254EC]/10 p-5 text-[16px] text-slate-200">
          <strong className="text-white">Short answer: </strong>
          {p.summary}
        </div>
        {p.blocks.map((b, i) => (
          <Block key={i} b={b} />
        ))}
        <ContentFaq items={p.faq} />
        <h2>Keep reading</h2>
        <ul>
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/blog/${o.slug}`}>{o.title}</Link>
            </li>
          ))}
        </ul>
        <ContentCta
          heading="Want this built for you?"
          body="We build and run the funnels, follow-up and CRM described here for high-ticket service businesses."
          href={p.cta.href}
          label={p.cta.label}
        />
      </ContentShell>
      <UFFooter />
    </>
  );
}
