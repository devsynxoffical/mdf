import Link from "next/link";
import type { ReactNode } from "react";
import ContourBG from "@/components/uf/ContourBG";

type Crumb = { name: string; href: string };
type TocItem = { id: string; label: string };

/**
 * Shared layout for service pages, guides and hubs: hero band, two-column body
 * with a sticky table of contents + booking card, in the site's navy/sky style.
 */
export default function ContentShell({
  eyebrow,
  title,
  intro,
  crumbs,
  meta,
  actions,
  stats,
  toc,
  aside = true,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  crumbs: Crumb[];
  meta?: ReactNode;
  actions?: ReactNode;
  stats?: { value: string; label: string }[];
  toc?: TocItem[];
  aside?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="bg-[#020926] text-white">
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-white/10 pb-14 pt-28 md:pb-20 md:pt-36">
        <ContourBG tone="dark" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(18,84,236,0.28),transparent_55%),radial-gradient(ellipse_at_90%_100%,rgba(56,189,248,0.12),transparent_50%)]"
        />
        <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10">
          <nav aria-label="Breadcrumb" className="mb-7 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  {i > 0 && <span className="text-slate-600">/</span>}
                  {i < crumbs.length - 1 ? (
                    <Link href={c.href} className="transition-colors hover:text-sky">
                      {c.name}
                    </Link>
                  ) : (
                    <span className="line-clamp-1 text-slate-400" aria-current="page">
                      {c.name}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <p className="uf-eyebrow text-sky">{eyebrow}</p>
          <h1 className="mt-5 max-w-[920px] font-sans text-[clamp(34px,5vw,64px)] font-extrabold leading-[1.05] tracking-[-0.035em]">
            {title}
          </h1>
          {meta && <div className="mt-5 font-sans text-[13.5px] text-slate-400">{meta}</div>}
          {intro && (
            <div className="mt-6 max-w-[760px] font-sans text-[17px] leading-[1.7] text-slate-300 md:text-[19px]">{intro}</div>
          )}
          {actions && <div className="mt-9 flex flex-wrap items-center gap-3">{actions}</div>}
          {stats && stats.length > 0 && (
            <dl className="mt-12 grid max-w-[920px] grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-[#050f30] p-5">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-sans text-[26px] font-extrabold tracking-tight text-white">{s.value}</dd>
                  <dd className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-slate-400">{s.label}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 md:px-10 md:py-20">
        <div className={aside ? "grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16" : ""}>
          <article className="content-prose min-w-0">{children}</article>
          {aside && (
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-5">
                {toc && toc.length > 1 && (
                  <nav aria-label="On this page" className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-sky">On this page</p>
                    <ol className="mt-4 space-y-2.5">
                      {toc.map((t) => (
                        <li key={t.id}>
                          <a href={`#${t.id}`} className="block font-sans text-[13.5px] leading-snug text-slate-400 transition-colors hover:text-white">
                            {t.label}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                )}
                <div className="rounded-2xl border border-sky/25 bg-gradient-to-br from-[#0B1A45] to-[#050B1E] p-5 shadow-[0_0_30px_rgba(18,84,236,0.15)]">
                  <p className="font-sans text-[16px] font-bold leading-snug text-white">Want this built for your offer?</p>
                  <p className="mt-2 font-sans text-[13.5px] leading-relaxed text-slate-400">
                    15–20 minute strategy call. We review your funnel and follow-up and tell you plainly if we can help.
                  </p>
                  <Link href="/book" className="mdf-cta-btn mt-4 w-full justify-center">
                    Book a strategy call <span aria-hidden>↗</span>
                  </Link>
                  <Link href="/work-proof" className="mt-3 block text-center font-sans text-[12.5px] text-sky hover:text-white">
                    See 40 verified receipts →
                  </Link>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}

/** Primary + secondary hero buttons. */
export function HeroActions({ secondaryHref, secondaryLabel }: { secondaryHref: string; secondaryLabel: string }) {
  return (
    <>
      <Link href="/book" className="mdf-cta-btn">
        Book a strategy call <span aria-hidden>↗</span>
      </Link>
      <Link href={secondaryHref} className="mdf-ghost-btn">
        {secondaryLabel}
      </Link>
    </>
  );
}

/** Section heading with an anchor id for the table of contents. */
export function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="content-h2">
      {children}
    </h2>
  );
}

/** Check-mark feature grid. */
export function FeatureGrid({ items }: { items: ReactNode[] }) {
  return (
    <ul className="feature-grid">
      {items.map((it, i) => (
        <li key={i}>
          <span aria-hidden className="feature-check">
            ✓
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/** Highlighted proof / insight box. */
export function Callout({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="callout">
      <p className="callout-label">{label}</p>
      <div>{children}</div>
    </div>
  );
}

/** Related pages as cards (internal links). */
export function LinkCards({ heading, id, items }: { heading: string; id?: string; items: { href: string; title: string; desc?: string; tag?: string }[] }) {
  return (
    <section>
      <h2 id={id} className="content-h2">
        {heading}
      </h2>
      <div className="link-cards">
        {items.map((it) => (
          <Link key={it.href} href={it.href} className="link-card">
            {it.tag && <span className="link-card-tag">{it.tag}</span>}
            <span className="link-card-title">{it.title}</span>
            {it.desc && <span className="link-card-desc">{it.desc}</span>}
            <span className="link-card-go" aria-hidden>
              Read more ↗
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** Book-a-call band used at the end of content pages. */
export function ContentCta({ heading, body, href = "/book", label = "Book a strategy call" }: { heading: string; body: string; href?: string; label?: string }) {
  return (
    <div className="content-cta">
      <div>
        <p className="content-cta-heading">{heading}</p>
        <p className="mt-2 text-slate-300">{body}</p>
      </div>
      <Link href={href} className="mdf-cta-btn shrink-0">
        {label} <span aria-hidden>↗</span>
      </Link>
    </div>
  );
}

/** FAQ as native disclosure widgets (crawlable, no JS), paired with FAQPage JSON-LD. */
export function ContentFaq({ items, id = "faq" }: { items: { q: string; a: string }[]; id?: string }) {
  return (
    <section>
      <h2 id={id} className="content-h2">
        Frequently asked questions
      </h2>
      <div className="faq-list">
        {items.map((f, i) => (
          <details key={f.q} className="faq-item" open={i === 0}>
            <summary>
              <span>{f.q}</span>
              <span aria-hidden className="faq-icon">
                +
              </span>
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
