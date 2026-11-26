import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import EcomCaseLibrary from "@/components/cases/EcomCaseLibrary";
import UFFooter from "@/components/uf/UFFooter";
import { CASES } from "@/lib/data/cases";
import { SITE_URL, absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const PATH = "/cases/ecommerce";

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: "eCommerce and DTC Case Studies: 126 Brand Results | MDF™",
  description:
    "126 eCommerce and DTC brand results from client ad accounts: apparel, supplements, beauty, fitness and dropshipping stores, with videos and breakdowns.",
});

export default function EcommerceCasesPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Case Studies", path: "/cases" },
    { name: "eCommerce and DTC", path: PATH },
  ];
  return (
    <main className="min-h-screen bg-[#050508] pt-16 text-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "eCommerce and DTC case studies",
          url: absoluteUrl(PATH),
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: { "@id": `${SITE_URL}/#organization` },
          numberOfItems: CASES.length,
        }}
      />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <section className="mdf-case-hub !min-h-0 !pb-0">
        <nav aria-label="Breadcrumb" className="mb-6 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
          <Link href="/" className="hover:text-sky">Home</Link> <span className="text-slate-600">/</span>{" "}
          <Link href="/cases" className="hover:text-sky">Case Studies</Link> <span className="text-slate-600">/</span>{" "}
          <span className="text-slate-400">eCommerce and DTC</span>
        </nav>
        <div className="mdf-case-header">
          <div className="mdf-case-tag">
            <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38BDF8]" />
            {CASES.length} eCommerce and DTC results
          </div>
          <h1 className="mdf-case-title">
            eCommerce and DTC <span className="it">Case Studies.</span>
          </h1>
          <p className="mdf-case-desc">
            Results from apparel, supplement, beauty, fitness and dropshipping brands. Filter by niche, search by revenue or
            keyword, and open any case for the video or breakdown.
          </p>
        </div>
      </section>
      <EcomCaseLibrary />
      <UFFooter />
    </main>
  );
}
