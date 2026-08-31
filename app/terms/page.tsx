import type { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";
import UFFooter from "@/components/uf/UFFooter";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service — Million Dollar Funnel™",
};

export default function Page() {
  return (
    <>
      <LegalPage title="Terms of Service" eyebrow="( Legal ) — Terms">
        <p>
          By accessing Million Dollar Funnel™ websites and services, you agree to these Terms.
          If you do not agree, do not use our site or book services with us.
        </p>
        <h2>Services</h2>
        <p>
          We provide marketing systems, funnel architecture, automation, and related consulting.
          Scope, pricing, and deliverables are defined in a separate agreement or statement of
          work for each engagement.
        </p>
        <h2>Results disclaimer</h2>
        <p>
          Case studies and metrics on this site describe specific client outcomes. They are not
          guarantees. Your results depend on offer, traffic, budget, niche, and execution.
        </p>
        <h2>Intellectual property</h2>
        <p>
          All branding, copy, designs, and systems on this site are owned by Million Dollar
          Funnel™ unless otherwise noted. You may not copy or resell our materials without
          written permission.
        </p>
        <h2>Contact</h2>
        <p>
          Questions:{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
      </LegalPage>
      <UFFooter />
    </>
  );
}
