import Link from "next/link";
import type { ReactNode } from "react";
import ContourBG from "@/components/uf/ContourBG";

type Crumb = { name: string; href: string };

/** Shared article/service layout in the site's subpage style (matches LegalPage). */
export default function ContentShell({
  eyebrow,
  title,
  intro,
  crumbs,
  meta,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  crumbs: Crumb[];
  meta?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="bg-[#020926] text-white">
      <section className="relative overflow-hidden pt-28 pb-24 md:pt-36 md:pb-32">
        <ContourBG tone="dark" />
        <div className="relative mx-auto max-w-[820px] px-4 sm:px-6 md:px-14">
          <nav aria-label="Breadcrumb" className="mb-6 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
            {crumbs.map((c, i) => (
              <span key={c.href}>
                {i > 0 && <span className="mx-2 text-slate-600">/</span>}
                {i < crumbs.length - 1 ? (
                  <Link href={c.href} className="hover:text-sky">
                    {c.name}
                  </Link>
                ) : (
                  <span className="text-slate-400">{c.name}</span>
                )}
              </span>
            ))}
          </nav>
          <p className="uf-eyebrow text-sky">{eyebrow}</p>
          <h1 className="mt-5 font-sans text-[clamp(32px,4.5vw,56px)] font-extrabold leading-[1.08] tracking-tight">
            {title}
          </h1>
          {meta && <div className="mt-4 font-sans text-[13px] text-slate-500">{meta}</div>}
          {intro && (
            <p className="mt-8 font-sans text-[17px] leading-[1.7] text-slate-200 md:text-[18px]">{intro}</p>
          )}
          <div className="mt-12 space-y-6 font-sans text-[15.5px] leading-[1.8] text-slate-300 [&_a]:text-sky [&_a]:underline [&_h2]:mt-12 [&_h2]:font-sans [&_h2]:text-[24px] [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-white [&_h3]:mt-8 [&_h3]:text-[18px] [&_h3]:font-semibold [&_h3]:text-white [&_li]:pl-1 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
            {children}
          </div>
        </div>
      </section>
    </div>
  );
}

/** Book-a-call block used at the end of content pages. */
export function ContentCta({ heading, body, href = "/book", label = "Book a strategy call" }: { heading: string; body: string; href?: string; label?: string }) {
  return (
    <div className="!mt-14 rounded-[24px] border border-sky/25 bg-gradient-to-br from-[#0B1A45] to-[#050B1E] p-7 shadow-[0_0_40px_rgba(18,84,236,0.18)] md:p-9">
      <h2 className="!mt-0 font-sans text-[22px] font-bold text-white">{heading}</h2>
      <p className="mt-3 text-slate-300">{body}</p>
      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1254EC] px-6 py-3 font-sans text-[14px] font-semibold text-white !no-underline shadow-[0_8px_30px_rgba(18,84,236,0.45)] transition hover:bg-[#0B3BB3]"
      >
        {label} <span aria-hidden>↗</span>
      </Link>
    </div>
  );
}

/** FAQ list rendered as headings + answers (paired with FAQPage JSON-LD). */
export function ContentFaq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <>
      <h2>Frequently asked questions</h2>
      <div className="space-y-6">
        {items.map((f) => (
          <div key={f.q} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <h3 className="!mt-0 text-[17px] font-semibold text-white">{f.q}</h3>
            <p className="mt-2">{f.a}</p>
          </div>
        ))}
      </div>
    </>
  );
}
