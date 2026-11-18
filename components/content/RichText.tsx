import Link from "next/link";
import { Fragment } from "react";

/**
 * Renders content strings with inline links written as [label](/path).
 * Internal paths use next/link; anything else opens as a normal anchor.
 */
export default function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const [, label, href] = m;
    parts.push(
      href.startsWith("/") ? (
        <Link key={m.index} href={href} className="rt-link">
          {label}
        </Link>
      ) : (
        <a key={m.index} href={href} className="rt-link" rel="noopener" target="_blank">
          {label}
        </a>
      )
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts.map((p, i) => <Fragment key={i}>{p}</Fragment>)}</>;
}

/** Plain text (links stripped) for meta tags and structured data. */
export const plainText = (text: string) => text.replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1");

/** URL-safe id for headings / table of contents. */
export const slugId = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
