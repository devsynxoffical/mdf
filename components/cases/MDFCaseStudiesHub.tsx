"use client";

import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import LeadReceiptsStrip from "@/components/cases/LeadReceiptsStrip";

/** `standalone` is true on /cases, where this is the page's H1; on the homepage it is an H2. */
export default function MDFCaseStudiesHub({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  return (
    <section className="mdf-case-hub" id="cases">
      {/* Header */}
      <div className="mdf-case-header">
        <div className="mdf-case-tag">
          <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38BDF8]" />
          Backed by 200+ Live Case Studies
        </div>
        <Heading className="mdf-case-title">
          Real Funnels. <span className="it">Real Numbers.</span>
        </Heading>
        <p className="mdf-case-desc">
          Two comprehensive libraries of battle-tested client acquisitions. Pick the
          engine that aligns with your business model.
        </p>
      </div>

      {/* Top Split Hero Cards (Lead Gen & eCommerce) */}
      <div className="mdf-hub-cards">
        {/* Card 1: Lead Gen — real receipts from the Work Proof page */}
        <div className="mdf-hc active">
          <LeadReceiptsStrip />
          <div className="mdf-hb">
            <span className="mdf-ht">High-Ticket Client Acquisition</span>
            <h2>Lead Generation & Appointments</h2>
            <p>
              Booked calls, verified high-intent applications, and lower CPL for
              service businesses, coaching, B2B agencies, roofing, legal, and local trades.
            </p>
            <div className="mdf-hch">
              <span>Roofing</span>
              <span>Legal / MVA</span>
              <span>Mortgage</span>
              <span>MedSpa</span>
              <span>Coaching</span>
              <span>B2B & Agencies</span>
            </div>
            <Link href={ROUTES.workProof} className="mdf-btn-primary mt-auto self-start">
              View Work Proof <i>&#8599;</i>
            </Link>
          </div>
        </div>

        {/* Card 2: eCommerce */}
        <Link href={ROUTES.cases} className="mdf-hc">
          <div className="mdf-fan">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/cs2/DPI2h3TARq_.webp"
              alt="eCommerce proof"
              loading="lazy"
              style={{ "--r": "-8deg", "--x": "-30%", objectPosition: "88% 50%" } as React.CSSProperties}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/cs2/C-FI5E4SYBZ.webp"
              alt="eCommerce proof"
              loading="lazy"
              style={{ "--r": "0deg", "--x": "0%", objectPosition: "50% 92%" } as React.CSSProperties}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/cs2/C-FI5E4SYBZ.webp"
              alt="eCommerce proof"
              loading="lazy"
              style={{ "--r": "8deg", "--x": "30%", objectPosition: "50% 36%" } as React.CSSProperties}
            />
          </div>
          <div className="mdf-hb">
            <span className="mdf-ht">Direct-Response Creative Scaling</span>
            <h2>eCommerce & DTC Brands</h2>
            <p>
              High-converting video creative engines, paid ads optimization, and conversion
              funnels scaling consumer brands from 5 to 7 figures.
            </p>
            <div className="mdf-hch">
              <span>Apparel</span>
              <span>Supplements</span>
              <span>Beauty & Skincare</span>
              <span>Jewelry</span>
              <span>DTC Brands</span>
              <span>Dropshipping</span>
            </div>
            <span className="mdf-btn-primary mt-auto self-start">
              View eCommerce Cases <i>&#8599;</i>
            </span>
          </div>
        </Link>
      </div>

    </section>
  );
}
