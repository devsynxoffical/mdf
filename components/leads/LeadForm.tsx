"use client";

import { useState, type FormEvent } from "react";
import { SITE } from "@/lib/site";
import { track } from "@/lib/track";

const BUDGETS = ["Under $2k / month", "$2k – $5k / month", "$5k – $15k / month", "$15k+ / month", "Not running ads yet"];

/**
 * Short lead form used across SEO pages. Sends to /api/lead (CRM webhook);
 * if that is unavailable it opens the visitor's email app instead, and says so.
 */
export default function LeadForm({
  source,
  industry,
  heading = "Get your free lead plan",
  sub = "Tell us about your business. We reply within one business day with what we would build and what it should cost per lead.",
  id = "lead",
  compact = false,
}: {
  source: string;
  industry?: string;
  heading?: string;
  sub?: string;
  id?: string;
  compact?: boolean;
}) {
  const [state, setState] = useState<"idle" | "sending" | "delivered" | "email">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const p = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    setState("sending");
    const lead = {
      name: p.name,
      email: p.email,
      phone: p.phone,
      business: p.business,
      niche: industry ?? p.niche ?? "",
      revenue: p.budget,
      notes: p.message,
      company_site: p.company_site,
      page: window.location.href,
      referrer: document.referrer,
    };
    try {
      const r = await fetch("/api/lead", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(lead) });
      if (r.ok) {
        track("generate_lead", { method: "page_form", source, industry: industry ?? "", budget: p.budget });
        setState("delivered");
        return;
      }
    } catch {
      /* fall back to email */
    }
    track("lead_email_fallback", { method: "page_form", source });
    const body = [
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Phone: ${lead.phone}`,
      `Business: ${lead.business}`,
      `Industry: ${lead.niche}`,
      `Ad budget: ${lead.revenue}`,
      "",
      `Message: ${lead.notes || "None"}`,
      `Page: ${lead.page}`,
    ].join("\n");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`Lead plan request — ${industry ?? source}`)}&body=${encodeURIComponent(body)}`;
    setState("email");
  }

  if (state === "delivered" || state === "email") {
    return (
      <div id={id} className="lead-card lead-card-done" role="status">
        <span className="lead-done-icon" aria-hidden>
          ✓
        </span>
        <p className="lead-card-title">{state === "delivered" ? "Request received" : "One last step"}</p>
        <p className="lead-card-sub">
          {state === "delivered" ? (
            "We have your details and will email you within one business day."
          ) : (
            <>
              Your email app should have opened with your request filled in. Press send to finish. If nothing opened, email{" "}
              <a className="rt-link" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
              .
            </>
          )}
        </p>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={onSubmit} className="lead-card" aria-label={heading}>
      <p className="lead-card-eyebrow">Free · no obligation</p>
      <p className="lead-card-title">{heading}</p>
      {!compact && <p className="lead-card-sub">{sub}</p>}
      <input type="text" name="company_site" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="lead-grid">
        <label className="lead-field">
          <span>Name</span>
          <input name="name" required autoComplete="name" placeholder="Your name" />
        </label>
        <label className="lead-field">
          <span>Work email</span>
          <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
        </label>
        <label className="lead-field">
          <span>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="+1 (555) 000-0000" />
        </label>
        <label className="lead-field">
          <span>Company</span>
          <input name="business" required autoComplete="organization" placeholder="Company name" />
        </label>
        {!industry && (
          <label className="lead-field lead-span">
            <span>Industry</span>
            <input name="niche" placeholder="e.g. roofing, mortgage, coaching" />
          </label>
        )}
        <label className="lead-field lead-span">
          <span>Monthly ad budget</span>
          <select name="budget" required defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            {BUDGETS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </label>
        {!compact && (
          <label className="lead-field lead-span">
            <span>What do you need most? (optional)</span>
            <textarea name="message" rows={3} placeholder="More leads, cheaper leads, better follow-up…" />
          </label>
        )}
      </div>
      <button type="submit" className="mdf-cta-btn lead-submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Get my free lead plan"} <span aria-hidden>→</span>
      </button>
      <p className="lead-note">We reply within one business day. No spam, no sharing your details.</p>
    </form>
  );
}
