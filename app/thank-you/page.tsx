import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import LegalPage from "@/components/pages/LegalPage";
import UFFooter from "@/components/uf/UFFooter";

/** Confirmation page for old form links. Not for search results (SEO plan, 25 Nov 2026). */
export const metadata: Metadata = {
  ...pageMetadata({
    path: "/thank-you",
    title: "Thank You | Million Dollar Funnel™",
    description: "Thanks for getting in touch with Million Dollar Funnel™. We will reply by email, usually within one business day.",
  }),
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <>
      <LegalPage title="Thank you" eyebrow="( Message received )">
        <p>Thanks for getting in touch. We will reply by email, usually within one business day.</p>
        <p>
          Want to talk sooner? <Link href="/book">Book a strategy call</Link>, or see{" "}
          <Link href="/work-proof">real results from client accounts</Link> while you wait.
        </p>
      </LegalPage>
      <UFFooter />
    </>
  );
}
