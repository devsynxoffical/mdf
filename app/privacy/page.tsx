import type { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";
import UFFooter from "@/components/uf/UFFooter";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy — Million Dollar Funnel™",
};

export default function Page() {
  return (
    <>
      <LegalPage title="Privacy Policy" eyebrow="( Legal ) — Privacy">
        <p>
          This policy explains how Million Dollar Funnel™ collects and uses information when you
          visit our site or book a call.
        </p>
        <h2>Information we collect</h2>
        <p>
          Contact details you submit (name, email, phone, business info), usage data (pages
          viewed, device/browser), and communications you send us.
        </p>
        <h2>How we use it</h2>
        <p>
          To respond to booking requests, deliver services, improve the site, and send relevant
          follow-up when you’ve asked to hear from us.
        </p>
        <h2>Sharing</h2>
        <p>
          We do not sell your personal data. We may use processors (hosting, email, CRM) that
          only handle data to provide their service to us.
        </p>
        <h2>Contact</h2>
        <p>
          Privacy requests:{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
      </LegalPage>
      <UFFooter />
    </>
  );
}
