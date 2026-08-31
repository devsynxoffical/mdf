import type { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";
import UFFooter from "@/components/uf/UFFooter";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "DMCA Policy — Million Dollar Funnel™",
};

export default function Page() {
  return (
    <>
      <LegalPage title="DMCA Policy" eyebrow="( Legal ) — DMCA">
        <p>
          Million Dollar Funnel™ respects intellectual property rights. If you believe content on
          this site infringes your copyright, send a notice that includes:
        </p>
        <p>
          Your contact information; a description of the copyrighted work; the URL of the
          allegedly infringing material; a statement that you have a good-faith belief the use is
          not authorized; a statement under penalty of perjury that the notice is accurate; and
          your physical or electronic signature.
        </p>
        <h2>Send notices to</h2>
        <p>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
      </LegalPage>
      <UFFooter />
    </>
  );
}
