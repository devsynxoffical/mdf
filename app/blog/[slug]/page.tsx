import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContentShell, { ContentCta, ContentFaq, LinkCards } from "@/components/content/ContentShell";
import RichText, { plainText, slugId } from "@/components/content/RichText";
import JsonLd from "@/components/seo/JsonLd";
import UFFooter from "@/components/uf/UFFooter";
import { BLOG_POSTS, getPostBySlug, type BlogBlock } from "@/lib/blog";
import { pageCard } from "@/lib/pageCards";
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
      return (
        <h2 id={slugId(b.text)} className="content-h2">
          {b.text}
        </h2>
      );
    case "h3":
      return <h3>{b.text}</h3>;
    case "ul":
      return (
        <ul>
          {b.items.map((i) => (
            <li key={i}>
              <RichText text={i} />
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {b.items.map((i) => (
            <li key={i}>
              <RichText text={i} />
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="content-table">
          <table>
            <thead>
              <tr>
                {b.columns.map((c, i) => (
                  <th key={i} scope="col">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r) => (
                <tr key={r[0]}>
                  <th scope="row">{r[0]}</th>
                  {r.slice(1).map((c, i) => (
                    <td key={i}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return (
        <p>
          <RichText text={b.text} />
        </p>
      );
  }
}

export default function BlogPostPage({ params }: Props) {
  const p = getPostBySlug(params.slug);
  if (!p) notFound();
  const path = `/blog/${p.slug}`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Guides", href: "/blog" },
    { name: p.title, href: path },
  ];
  const toc = [
    ...p.blocks.filter((b): b is Extract<BlogBlock, { type: "h2" }> => b.type === "h2").map((b) => ({ id: slugId(b.text), label: b.text })),
    { id: "faq", label: "FAQ" },
  ];
  const date = new Date(p.published + "T00:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  const readNext = [...BLOG_POSTS.filter((o) => o.slug !== p.slug).map((o) => `/blog/${o.slug}`), p.cta.href].slice(0, 4);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: p.title,
          description: p.metaDescription,
          abstract: plainText(p.summary),
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
        eyebrow="( Guide ) — Funnels & follow-up"
        title={p.title}
        crumbs={crumbs}
        toc={toc}
        meta={
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>By the {SEO.name} team</span>
            <span aria-hidden>·</span>
            <time dateTime={p.published}>{date}</time>
            <span aria-hidden>·</span>
            <span>{p.readMinutes} min read</span>
          </span>
        }
      >
        <div className="answer-box">
          <span className="answer-box-label">Short answer</span>
          <RichText text={p.summary} />
        </div>

        {p.blocks.map((b, i) => (
          <Block key={i} b={b} />
        ))}

        <div className="author-box">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/mdf-logo-white-168.webp" alt="" width={52} height={52} loading="lazy" />
          <div>
            <p className="!m-0 font-bold text-white">About the authors</p>
            <p className="!mt-1 text-[15px] leading-relaxed text-slate-400">
              Written by the {SEO.name} team, who build and run funnels, CRM automation and follow-up for high-ticket
              service businesses. Our results are public: see the{" "}
              <Link href="/work-proof" className="rt-link">
                verified receipts
              </Link>{" "}
              and{" "}
              <Link href="/cases" className="rt-link">
                case studies
              </Link>
              .
            </p>
          </div>
        </div>

        <ContentFaq items={p.faq} />

        <LinkCards heading="Read next" items={readNext.map((h) => pageCard(h))} />

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
