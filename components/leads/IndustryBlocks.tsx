import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

/** Section wrapper with eyebrow + heading, used on industry pages. */
export function Band({ id, eyebrow, title, intro, children, tone = "a" }: { id: string; eyebrow: string; title: string; intro?: string; children: ReactNode; tone?: "a" | "b" }) {
  return (
    <section id={id} className={`ind-band ind-band-${tone}`} aria-labelledby={`${id}-h`}>
      <div className="ind-wrap">
        <p className="uf-eyebrow text-sky">{eyebrow}</p>
        <h2 id={`${id}-h`} className="ind-h2">
          {title}
        </h2>
        {intro && <p className="ind-intro">{intro}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

const ICONS = ["◎", "⏱", "▦", "✦"];

export function ProblemCards({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="pcards">
      {items.map((p, i) => (
        <div key={p.title} className="pcard">
          <span className="pcard-icon" aria-hidden>
            {ICONS[i % ICONS.length]}
          </span>
          <h3 className="pcard-title">{p.title}</h3>
          <p className="pcard-body">{p.body}</p>
        </div>
      ))}
    </div>
  );
}

export function Showcase({ src, title, body, href, alt, height }: { src: string; title: string; body: string; href: string; alt: string; height: number }) {
  return (
    <div className="showcase">
      <div className="showcase-frame">
        <div className="showcase-bar" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <div className="showcase-scroll">
          <Image src={src} alt={alt} width={1200} height={height} sizes="(max-width: 1024px) 100vw, 640px" className="showcase-img" />
        </div>
      </div>
      <div className="showcase-copy">
        <h3 className="pcard-title text-[22px]">{title}</h3>
        <p className="pcard-body mt-3">{body}</p>
        <p className="pcard-body mt-3 text-slate-400">Hover or tap the preview to scroll through the page.</p>
        <Link href={href} className="mdf-ghost-btn mt-6">
          See all 8 live funnels ↗
        </Link>
      </div>
    </div>
  );
}

export function CompareTable({ columns, rows }: { columns: [string, string, string]; rows: [string, string, string][] }) {
  return (
    <div className="content-table">
      <table>
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              <th scope="row">{r[0]}</th>
              <td>{r[1]}</td>
              <td className="text-white">{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Sticky mobile call-to-action that jumps to the lead form. */
export function StickyLeadBar({ label = "Get my free lead plan" }: { label?: string }) {
  return (
    <div className="sticky-lead lg:hidden">
      <a href="#lead" className="mdf-cta-btn w-full justify-center">
        {label} <span aria-hidden>→</span>
      </a>
    </div>
  );
}
