"use client";

const NAV_LINKS = [
  { label: "Funnels", href: "/#funnels" },
  { label: "System", href: "/#system" },
  { label: "Process", href: "/#process" },
  { label: "Work Proof", href: "/work-proof" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/#faq" },
];
const LEGAL_LINKS = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "DMCA Policy", href: "/dmca" },
  { label: "Income Disclosure", href: "/income-disclosure" },
];

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="relative z-10 border-t border-bone/[0.08] bg-ink px-6 pb-10 pt-20 md:px-12"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <p className="font-display text-[22px] font-semibold text-bone">
              MDF<span className="text-brass">™</span>
            </p>
            <p className="mt-3 max-w-[34ch] font-body text-[15px] text-mute">
              Predictable client acquisition for high-ticket service providers.
            </p>
            <div className="mt-6 flex gap-4">
              {["X", "IG", "YT", "LI"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-bone/[0.08] font-mono text-[11px] text-mute transition-colors duration-200 hover:border-brass/40 hover:text-brass"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <p className="font-mono text-[11px] uppercase tracking-eyebrow text-mute">
              Navigate
            </p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="font-body text-[15px] text-mute transition-colors duration-200 hover:text-bone"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-eyebrow text-mute">
              Legal
            </p>
            <ul className="mt-5 space-y-3">
              {LEGAL_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="font-body text-[15px] text-mute transition-colors duration-200 hover:text-bone"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-eyebrow text-mute">
              Contact
            </p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="mailto:hello@example.com"
                  className="font-body text-[15px] text-mute transition-colors duration-200 hover:text-bone"
                >
                  hello@example.com
                </a>
              </li>
              <li>
                <a
                  href="/book"
                  className="font-body text-[15px] text-mute transition-colors duration-200 hover:text-bone"
                >
                  Book a call
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Required earnings disclaimer — do not remove: the site makes
            specific revenue claims and runs Meta ads. */}
        <p className="mt-16 max-w-[80ch] font-body text-s12 leading-[1.5] text-mute/70">
          Results shown are from specific client engagements and are not
          typical. Individual results vary based on offer, market, ad spend,
          and execution. Nothing here is a guarantee of earnings. See our
          Income Disclosure for details.
        </p>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-bone/[0.08] py-6 sm:flex-row sm:items-center">
          <p className="font-body text-[13px] text-mute">
            © 2026 MDF Growth Systems. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-eyebrow text-mute">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
            System status: Operational
          </p>
        </div>
      </div>
    </footer>
  );
}
