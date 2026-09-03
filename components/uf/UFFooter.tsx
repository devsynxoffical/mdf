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
      className="font-sans text-[14px] font-normal text-white/75 transition-colors duration-200 hover:text-white"
    >
      {children}
    </a>
  );
}

function ColHeading({ children }: { children: string }) {
  return (
    <h3 className="mb-6 font-serif text-[22px] font-normal tracking-tight text-white md:text-[24px]">
      {children}
    </h3>
  );
}

/**
 * Black editorial footer — centered join band + four clear columns.
 */
export default function UFFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="bg-black text-white">
      {/* Top — join / list CTA */}
      <div className="mx-auto max-w-[720px] px-5 pb-16 pt-20 text-center sm:px-8 md:pb-20 md:pt-24">
        <h2 className="font-serif text-[clamp(36px,5.5vw,56px)] font-normal leading-[1.15] tracking-tight text-white">
          Are you on <span className="italic">the list</span>?
        </h2>
        <p className="mt-4 font-sans text-[15px] text-white/70 sm:text-[16px]">
          Join to get exclusive offers &amp; discounts
        </p>

        <form
          action={ROUTES.book}
          method="get"
          className="mx-auto mt-10 flex max-w-[520px] flex-col items-stretch gap-3 sm:flex-row sm:items-end sm:gap-0"
        >
          <label className="relative min-w-0 flex-1 text-left">
            <span className="mb-2 block font-sans text-[12px] text-white/80">
              Email *
            </span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder=""
              className="h-12 w-full border border-white bg-transparent px-4 font-sans text-[15px] text-white outline-none placeholder:text-white/35 focus:border-white"
            />
          </label>
          <button
            type="submit"
            className="h-12 shrink-0 bg-white px-8 font-sans text-[15px] font-bold text-black transition-opacity hover:opacity-90 sm:mt-0 sm:self-end"
          >
            Join
          </button>
        </form>
      </div>

      <div className="mx-auto max-w-[1180px] border-t border-white/25" />

      {/* Columns */}
      <div className="mx-auto max-w-[1180px] px-5 py-14 sm:px-8 md:px-14 md:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
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

          <div>
            <ColHeading>Contact</ColHeading>
            <div className="space-y-3 font-sans text-[14px] leading-[1.7] text-white/75">
              <p>
                Strategy calls by appointment.
                <br />
                Accepting 4 clients this quarter.
              </p>
              <p>
                Mon–Fri · 9am–6pm ET
                <br />
                Sat–Sun · By request
              </p>
              <p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="transition-colors hover:text-white"
                >
                  {SITE.email}
                </a>
              </p>
            </div>
          </div>

          <nav aria-label="Policy">
            <ColHeading>Policy</ColHeading>
            <ul className="space-y-3">
              {LEGAL.map(([label, href]) => (
                <li key={href}>
                  <FooterLink href={href}>{label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <ColHeading>Company</ColHeading>
            <ul className="space-y-3">
              {COMPANY.map(([label, href]) => (
                <li key={href}>
                  <FooterLink href={href}>{label}</FooterLink>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-4">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-white transition-opacity hover:opacity-70"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>

            <p className="mt-10 font-sans text-[12px] leading-relaxed text-white/45">
              © {year} by {SITE.brand}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
