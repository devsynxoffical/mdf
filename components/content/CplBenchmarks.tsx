import JsonLd from "@/components/seo/JsonLd";
import { CPL_ROWS, CPL_SUMMARY, cplRange, usd } from "@/lib/benchmarks";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

/**
 * Original data: cost per lead stated on our own Meta Ads receipts.
 * Everything is computed from lib/workproof, so it stays in sync with the receipts.
 */
export default function CplBenchmarks() {
  const webinar = cplRange(/webinar/i);
  const legal = cplRange(/legal|injury|\bPI\b/i);
  const homeFinance = cplRange(/mortgage|solar|wealth|pressure/i);

  return (
    <section id="benchmarks" className="relative border-b border-white/10 bg-[#020926] py-16 text-white sm:py-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Dataset",
          name: "Meta Ads cost per lead by niche, Million Dollar Funnel™ client receipts",
          description: `Cost per lead from ${CPL_SUMMARY.count} Meta Ads receipts across ${new Set(CPL_ROWS.map((r) => r.niche)).size} niches, published from live client ad accounts.`,
          url: absoluteUrl("/work-proof#benchmarks"),
          creator: { "@id": `${SITE_URL}/#organization` },
          license: absoluteUrl("/terms"),
          variableMeasured: ["Cost per lead (USD)", "Leads"],
          isAccessibleForFree: true,
        }}
      />
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 md:px-14">
        <p className="uf-eyebrow text-sky">( Benchmarks ) · From our receipts</p>
        <h2 className="mt-4 font-sans text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight">
          What does a lead cost on Meta Ads?
        </h2>
        <p className="mt-5 max-w-[68ch] font-sans text-[16px] leading-[1.75] text-slate-300">
          Across the {CPL_SUMMARY.count} receipts on this page that state a cost per lead, Meta Ads leads cost between{" "}
          <strong className="text-white">{usd(CPL_SUMMARY.min)}</strong> and{" "}
          <strong className="text-white">{usd(CPL_SUMMARY.max)}</strong>, with a median of{" "}
          <strong className="text-white">{usd(CPL_SUMMARY.median)}</strong>. The niche and the offer drove most of the
          difference:
        </p>
        <ul className="mt-4 max-w-[68ch] list-disc space-y-2 pl-6 font-sans text-[15.5px] leading-[1.7] text-slate-300">
          {webinar && (
            <li>
              <strong className="text-white">Webinar registrations</strong> were the cheapest leads: {usd(webinar.min)}–
              {usd(webinar.max)} across {webinar.count} receipts. A free or low-cost registration is a small ask.
            </li>
          )}
          {homeFinance && (
            <li>
              <strong className="text-white">Mortgage, solar, wealth and home-service leads</strong> ranged from{" "}
              {usd(homeFinance.min)} to {usd(homeFinance.max)} ({homeFinance.count} receipts).
            </li>
          )}
          {legal && (
            <li>
              <strong className="text-white">Personal-injury legal leads</strong> were the most expensive:{" "}
              {usd(legal.min)}–{usd(legal.max)} ({legal.count} receipts), reflecting how competitive and valuable each case
              is.
            </li>
          )}
        </ul>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[560px] border-collapse text-left font-sans text-[14px]">
            <caption className="sr-only">Cost per lead by niche from Million Dollar Funnel™ Meta Ads receipts</caption>
            <thead className="bg-white/[0.04] font-mono text-[11px] uppercase tracking-[0.12em] text-slate-400">
              <tr>
                <th scope="col" className="px-4 py-3">Niche</th>
                <th scope="col" className="px-4 py-3">Result on the receipt</th>
                <th scope="col" className="px-4 py-3 text-right">Cost per lead</th>
              </tr>
            </thead>
            <tbody>
              {CPL_ROWS.map((r) => (
                <tr key={r.id} className="border-t border-white/5">
                  <td className="px-4 py-3 text-white">{r.niche}</td>
                  <td className="px-4 py-3 text-slate-400">{r.note}</td>
                  <td className="px-4 py-3 text-right font-semibold text-sky">{usd(r.cpl)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-sans text-[13px] leading-relaxed text-slate-500">
          Source: screenshots from live client Meta Ads Manager accounts, shown in full above. Results vary with offer,
          market, budget and season, and are not a guarantee of future performance.
        </p>
      </div>
    </section>
  );
}
