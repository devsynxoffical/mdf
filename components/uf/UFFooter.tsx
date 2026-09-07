import { CASE_STUDIES } from "@/lib/cases";
import { SITE } from "@/lib/site";
import { ROUTES, sectionHref, SECTIONS } from "@/lib/routes";

const casesHref =
  CASE_STUDIES.length === 1
    ? `/cases/${CASE_STUDIES[0].slug}`
    : ROUTES.cases;

const casesLabel =
  CASE_STUDIES.length === 1 ? CASE_STUDIES[0].navLabel : "Cases";

const EXPLORE = [
  ["Home", ROUTES.home],
  [casesLabel, casesHref],
  ["Work Proof", ROUTES.workProof],
  ["Funnel Designs", ROUTES.funnels],
  ["System", sectionHref(SECTIONS.system)],
] as const;

const COMPANY = [
  ["About", ROUTES.about],
  ["FAQ", ROUTES.faq],
  ["Book a call", ROUTES.book],
] as const;

const LEGAL = [
  ["Terms of Service", ROUTES.terms],
  ["Privacy Policy", ROUTES.privacy],
  ["Income Disclosure", "/income-disclosure"],
  ["DMCA", "/dmca"],
] as const;

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2Zm0-2.4c2.5 0 2.8.01 3.78.05.91.04 1.41.19 1.74.32.44.17.75.37 1.08.7.33.33.53.64.7 1.08.13.33.28.83.32 1.74.04.98.05 1.28.05 3.78s-.01 2.8-.05 3.78c-.04.91-.19 1.41-.32 1.74-.17.44-.37.75-.7 1.08-.33.33-.64.53-1.08.7-.33.13-.83.28-1.74.32-.98.04-1.28.05-3.78.05s-2.8-.01-3.78-.05c-.91-.04-1.41-.19-1.74-.32a2.97 2.97 0 0 1-1.08-.7 2.97 2.97 0 0 1-.7-1.08c-.13-.33-.28-.83-.32-1.74C4.81 14.8 4.8 14.5 4.8 12s.01-2.8.05-3.78c.04-.91.19-1.41.32-1.74.17-.44.37-.75.7-1.08.33-.33.64-.53 1.08-.7.33-.13.83-.28 1.74-.32C9.2 4.81 9.5 4.8 12 4.8Zm6.24 1.68a1.12 1.12 0 1 0 0 2.24 1.12 1.12 0 0 0 0-2.24Z",
  },
  {
    label: "X",
    href: "https://x.com",
    path: "M17.7 4.5h2.5l-5.5 6.3L21.5 19.5h-5.3l-4.2-5.5-4.8 5.5H4.7l5.9-6.7L2.7 4.5h5.4l3.8 5 5.8-5Zm-.9 13.5h1.4L7.4 5.9H6L16.8 18Z",
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    path: "M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18.1 5 12 5 12 5s-6.1 0-7.7.3A2.7 2.7 0 0 0 2.4 7.2 28 28 0 0 0 2 12a28 28 0 0 0 .4 4.8 2.7 2.7 0 0 0 1.9 1.9C5.9 19 12 19 12 19s6.1 0 7.7-.3a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    path: "M6.5 9.5H3.7V20h2.8V9.5ZM5.1 4A1.6 1.6 0 1 0 5.1 7.2 1.6 1.6 0 0 0 5.1 4ZM20.3 20h-2.8v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V20H11V9.5h2.7v1.4h.04c.4-.7 1.3-1.5 2.7-1.5 2.9 0 3.4 1.9 3.4 4.4V20Z",
  },
] as const;

function FooterLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="font-sans text-[14px] font-normal text-slate-400 transition-colors duration-200 hover:text-white"
    >
      {children}
    </a>
  );
}

function ColHeading({ children }: { children: string }) {
  return (
    <h3 className="mb-4 font-sans text-[13px] font-bold tracking-wider text-white uppercase">
      {children}
    </h3>
  );
}

/**
 * Editorial footer — join band + navigation columns + Founder Details Card.
 */
export default function UFFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="relative z-20 isolate overflow-hidden bg-[#020514] text-white">
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(18,84,236,0.15),transparent_60%)]"
      />

      {/* Top Newsletter CTA */}
      <div className="relative mx-auto max-w-[760px] px-5 pb-16 pt-20 text-center sm:px-8 md:pb-20 md:pt-24">
        <h2 className="font-sans text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.1] tracking-tight text-white">
          Are you on <span className="font-serif italic font-normal text-sky">the list</span>?
        </h2>
        <p className="mt-4 font-sans text-[15px] text-slate-300 sm:text-[16px]">
          Join to get exclusive acquisition breakdowns, funnel teardowns &amp; offer strategies.
        </p>

        <form
          action={ROUTES.book}
          method="get"
          className="relative z-10 mx-auto mt-8 flex max-w-[500px] flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:border sm:border-white/15 sm:bg-white/[0.04] sm:p-1.5 sm:backdrop-blur-xl"
        >
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className="h-12 w-full rounded-full sm:rounded-none border border-white/20 sm:border-0 bg-white/5 sm:bg-transparent px-5 font-sans text-[15px] text-white outline-none placeholder:text-white/40 focus:ring-1 focus:ring-sky sm:focus:ring-0"
          />
          <button
            type="submit"
            className="h-11 shrink-0 rounded-full bg-white px-7 font-sans text-[14px] font-bold text-black transition-all hover:bg-slate-100 hover:scale-[1.02] shadow-lg cursor-pointer"
          >
            Join
          </button>
        </form>
      </div>

      {/* Big Watermark Typography Banner (like Contractor Leads) */}
      <div className="relative w-full select-none pointer-events-none border-t border-b border-white/5 bg-gradient-to-b from-white/[0.01] to-transparent py-4 sm:py-6 px-3 sm:px-6">
        <div className="mx-auto w-full max-w-[1400px]">
          <svg
            viewBox="0 0 1350 100"
            className="w-full h-auto select-none block"
            aria-hidden="true"
          >
            <text
              x="50%"
              y="56%"
              dominantBaseline="central"
              textAnchor="middle"
              className="fill-white/[0.07] uppercase"
              style={{
                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: "92px",
                fontWeight: 950,
                letterSpacing: "-0.02em"
              }}
            >
              MILLION DOLLAR FUNNEL
            </text>
          </svg>
        </div>
      </div>

      {/* Main Grid: Navigation Columns & Founder Card */}
      <div className="relative mx-auto max-w-[1240px] px-5 py-14 sm:px-8 md:px-12 md:py-16">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_400px] lg:gap-16">
          {/* Left: Navigation Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <nav aria-label="Explore">
              <ColHeading>Explore</ColHeading>
              <ul className="space-y-3">
                {EXPLORE.map(([label, href]) => (
                  <li key={href}>
                    <FooterLink href={href}>{label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Company">
              <ColHeading>Company</ColHeading>
              <ul className="space-y-3">
                {COMPANY.map(([label, href]) => (
                  <li key={href}>
                    <FooterLink href={href}>{label}</FooterLink>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-slate-400 transition hover:bg-white/15 hover:text-white"
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-currentColor" aria-hidden>
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </nav>

            <nav aria-label="Legal">
              <ColHeading>Legal</ColHeading>
              <ul className="space-y-3">
                {LEGAL.map(([label, href]) => (
                  <li key={href}>
                    <FooterLink href={href}>{label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right: Founder Card */}
          <div className="flex flex-col justify-start">
            <div className="relative overflow-hidden rounded-[26px] border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-all duration-300 hover:border-white/25">
              {/* Founder Header */}
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/vaishali-kapoor.png"
                  alt="Vaishali Kapoor"
                  className="h-16 w-16 rounded-2xl border border-white/20 object-cover object-top shadow-xl bg-[#171A30]"
                />
                <div>
                  <h4 className="font-sans text-[18px] font-bold text-white tracking-tight">
                    Vaishali Kapoor
                  </h4>
                  <p className="font-mono text-[12px] font-semibold text-sky">
                    Founder
                  </p>
                </div>
              </div>

              {/* Bio Quote */}
              <p className="mt-4 font-sans text-[13.5px] leading-[1.65] text-slate-300">
                I'm building Million Dollar Funnel™ to help agencies and ambitious operators install predictable client acquisition systems and close high-ticket revenue.
              </p>

              {/* Footer Controls */}
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <div className="flex items-center gap-2.5">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 hover:scale-105"
                  >
                    <svg className="h-3.5 w-3.5 fill-currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 hover:scale-105"
                  >
                    <svg className="h-3.5 w-3.5 fill-currentColor" viewBox="0 0 24 24">
                      <path d="M6.5 9.5H3.7V20h2.8V9.5ZM5.1 4A1.6 1.6 0 1 0 5.1 7.2 1.6 1.6 0 0 0 5.1 4ZM20.3 20h-2.8v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V20H11V9.5h2.7v1.4h.04c.4-.7 1.3-1.5 2.7-1.5 2.9 0 3.4 1.9 3.4 4.4V20Z" />
                    </svg>
                  </a>
                </div>

                <a
                  href="/about"
                  className="font-sans text-[13px] font-semibold text-white transition hover:text-sky"
                >
                  About →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & info */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="font-sans text-[13px] text-slate-400">
            © {year} {SITE.brand}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-slate-500">
            Crafted for high-ticket service operators.
          </p>
        </div>
      </div>
    </footer>
  );
}
