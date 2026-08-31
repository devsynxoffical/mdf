"use client";

const CLIENT_LOGOS_A = [
  "/logos/cropped/logo-01.png",
  "/logos/cropped/logo-02.png",
  "/logos/cropped/logo-03.png",
  "/logos/cropped/logo-04.png",
  "/logos/cropped/logo-05.png",
  "/logos/cropped/logo-06.png",
  "/logos/cropped/logo-07.png",
  "/logos/cropped/logo-08.png",
  "/logos/cropped/logo-10.png",
  "/logos/cropped/logo-11.png",
];

const CLIENT_LOGOS_B = [
  "/logos/cropped/logo-12.png",
  "/logos/cropped/logo-13.png",
  "/logos/cropped/logo-15.png",
  "/logos/cropped/logo-16.png",
  "/logos/cropped/logo-17.png",
  "/logos/cropped/logo-18.png",
  "/logos/cropped/logo-19.png",
  "/logos/cropped/logo-20.png",
  "/logos/cropped/logo-21.png",
  "/logos/cropped/logo-22.png",
];

export const FEATURED_RESULTS = [
  { value: "13,630", label: "LTO Sales", sub: "Coaching case" },
  { value: "$847K", label: "Revenue", sub: "From $255K spend" },
  { value: "3.32", label: "ROAS", sub: "Predictable scale" },
  { value: "300+", label: "Clients", sub: "Trusted globally" },
];

type Tone = "cobalt" | "dark" | "light";

type Props = {
  tone?: Tone;
  /** Hide the results strip (logos only) */
  logosOnly?: boolean;
  /** Hide logo marquees (results only) */
  resultsOnly?: boolean;
  className?: string;
  showCaseLink?: boolean;
};

/**
 * Shared results metrics + dual logo marquees — used on home + subpages.
 */
export default function ResultsLogos({
  tone = "cobalt",
  logosOnly = false,
  resultsOnly = false,
  className = "",
  showCaseLink = true,
}: Props) {
  const isLight = tone === "light";
  const fadeFrom =
    tone === "light" ? "from-[#F3F7FD]" : tone === "dark" ? "from-[#020926]" : "from-[#1254EC]";

  const rule = isLight ? "bg-blue-200/80" : "bg-white/20";
  const title = isLight
    ? "font-serif text-[15px] sm:text-[17px] italic tracking-wide text-slate-600"
    : "font-serif text-[15px] sm:text-[17px] italic tracking-wide text-blue-100";
  const cellBg = isLight
    ? "bg-white group-hover:bg-blue-50"
    : tone === "dark"
      ? "bg-white/[0.04] group-hover:bg-white/[0.07]"
      : "bg-[#0B3BB3]/55 group-hover:bg-[#0B3BB3]/75";
  const border = isLight ? "border-blue-200 bg-blue-100/40" : "border-white/20 bg-white/15";
  const valueCls = isLight ? "text-[#070B1E]" : "text-white";
  const labelCls = isLight ? "text-cobalt" : "text-sky";
  const subCls = isLight ? "text-slate-500" : "text-blue-100/70";
  const logoFilter = isLight
    ? "opacity-70 brightness-0 transition hover:opacity-100"
    : "opacity-[0.88] brightness-0 invert transition hover:opacity-100";

  return (
    <div className={`mx-auto max-w-[1180px] ${className}`}>
      {!logosOnly && (
        <>
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <span className={`h-px flex-1 ${rule}`} />
            <span className={`${title} whitespace-nowrap`}>
              Results that made the system famous
            </span>
            <span className={`h-px flex-1 ${rule}`} />
          </div>

          <a
            href="/cases/coaching-lto"
            className={`group mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border sm:grid-cols-4 ${border}`}
          >
            {FEATURED_RESULTS.map((r) => (
              <div
                key={r.label}
                className={`px-5 py-7 text-center backdrop-blur-md transition duration-300 sm:py-8 ${cellBg}`}
              >
                <p
                  className={`font-serif text-[clamp(28px,3.6vw,42px)] italic leading-none tracking-tight ${valueCls}`}
                >
                  {r.value}
                </p>
                <p
                  className={`mt-3 font-sans text-[11px] font-bold uppercase tracking-[0.14em] ${labelCls}`}
                >
                  {r.label}
                </p>
                <p className={`mt-1 font-sans text-[12px] ${subCls}`}>{r.sub}</p>
              </div>
            ))}
          </a>

          {showCaseLink && (
            <p className={`mt-4 text-center font-sans text-[12px] ${subCls}`}>
              <a href="/cases/coaching-lto" className={`font-semibold ${labelCls} hover:underline`}>
                Watch the coaching LTO case VSL
              </a>
              <span className="mx-2 opacity-40">·</span>
              $255,130 spent → $847,307 collected
            </p>
          )}
        </>
      )}

      {!resultsOnly && (
        <div className={logosOnly ? "" : "mt-16"}>
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <span className={`h-px flex-1 ${rule}`} />
            <span className={`${title} whitespace-nowrap`}>Trusted by 300+ global clients</span>
            <span className={`h-px flex-1 ${rule}`} />
          </div>

          <div className="relative mt-10">
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r ${fadeFrom} to-transparent sm:w-20`}
            />
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l ${fadeFrom} to-transparent sm:w-20`}
            />

            <LogoRow logos={CLIENT_LOGOS_A} direction="left" duration="48s" filter={logoFilter} />
            <div className="mt-4">
              <LogoRow
                logos={CLIENT_LOGOS_B}
                direction="right"
                duration="56s"
                filter={logoFilter}
                offset={11}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LogoRow({
  logos,
  direction,
  duration,
  filter,
  offset = 1,
}: {
  logos: string[];
  direction: "left" | "right";
  duration: string;
  filter: string;
  offset?: number;
}) {
  const track = direction === "left" ? "marquee-track-left" : "marquee-track-right";
  return (
    <div className="marquee-row overflow-hidden py-2">
      <div className={`${track} flex w-max items-center`} style={{ ["--marquee-duration" as string]: duration }}>
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16 md:gap-20 md:pr-20"
            aria-hidden={copy === 1 || undefined}
          >
            {logos.map((src, i) => (
              <div
                key={`${copy}-${src}`}
                className="flex h-11 shrink-0 items-center justify-center sm:h-12 md:h-14"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${src}?v=5`}
                  alt={`Client logo ${offset + i}`}
                  className={`h-full w-auto max-w-[9.5rem] object-contain sm:max-w-[11rem] ${filter}`}
                  loading="eager"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
