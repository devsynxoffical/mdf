import Link from "next/link";
import LeadForm from "@/components/leads/LeadForm";

/** End-of-page lead capture for service pages and guides. */
export default function LeadSection({ heading, body, source }: { heading: string; body: string; source: string }) {
  return (
    <section className="lead-section not-prose" aria-labelledby="lead-section-h">
      <div>
        <p className="uf-eyebrow text-sky">Free lead plan</p>
        <h2 id="lead-section-h" className="mt-3 font-sans text-[clamp(24px,2.6vw,32px)] font-extrabold leading-tight tracking-tight text-white">
          {heading}
        </h2>
        <p className="mt-3 text-slate-300">{body}</p>
        <ul className="mt-5 space-y-2 text-[15px] text-slate-300">
          <li>✓ Reply within one business day</li>
          <li>✓ A realistic cost-per-lead range for your market</li>
          <li>✓ No obligation, no sales pressure</li>
        </ul>
        <p className="mt-5 text-[14px] text-slate-400">
          Prefer to talk? <Link href="/book" className="rt-link">Book a strategy call</Link>.
        </p>
      </div>
      <LeadForm source={source} id="lead" compact />
    </section>
  );
}
