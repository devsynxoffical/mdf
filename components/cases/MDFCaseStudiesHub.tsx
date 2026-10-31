"use client";

import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { WORK_PROOF } from "@/lib/workproof";

const FAN_PROOFS = WORK_PROOF.filter((p) => p.tag === "Meta Ads").slice(0, 3);
const FAN_POSITIONS = [
  { "--r": "-8deg", "--x": "-30%" },
  { "--r": "0deg", "--x": "0%" },
  { "--r": "8deg", "--x": "30%" },
];

export default function MDFCaseStudiesHub() {
  return (
    <section className="mdf-case-hub" id="cases">
      {/* Header */}
      <div className="mdf-case-header">
        <div className="mdf-case-tag">
          <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38BDF8]" />
          Verified Track Record · 251+ Documented Builds
        </div>
        <h1 className="mdf-case-title">
          Real Funnels. <span className="it">Real Numbers.</span>
        </h1>
        <p className="mdf-case-desc">
          Two comprehensive libraries of battle-tested client acquisitions. Pick the
          engine that aligns with your business model.
        </p>
      </div>

      {/* Top Split Hero Cards (Lead Gen & eCommerce) */}
      <div className="mdf-hub-cards">
        {/* Card 1: Lead Gen — real receipts from the Work Proof page */}
        <Link href={ROUTES.workProof} className="mdf-hc active">
          <div className="mdf-fan">
            {FAN_PROOFS.map((item, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={item.id}
                src={item.src}
                alt={`${item.niche} — ${item.metric} ${item.metricLabel}`}
                loading="lazy"
                style={FAN_POSITIONS[i] as React.CSSProperties}
              />
            ))}
          </div>
          <div className="mdf-hb">
            <span className="mdf-ht">High-Ticket Client Acquisition</span>
            <h2>Lead Generation & Appointments</h2>
            <div className="mdf-hn">
              <b>{WORK_PROOF.length}</b>
              <span>verified work proofs</span>
            </div>
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
            <span className="mdf-btn-primary mt-auto self-start">
              View Work Proof <i>&#8599;</i>
            </span>
          </div>
        </Link>

        {/* Card 2: eCommerce */}
        <Link href={ROUTES.cases} className="mdf-hc">
          <div className="mdf-fan">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/cs2/C9b-l3yS6GW.webp"
              alt="eCommerce proof"
              loading="lazy"
              style={{ "--r": "-8deg", "--x": "-30%" } as React.CSSProperties}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/cs2/C9RU-C9yhfU.webp"
              alt="eCommerce proof"
              loading="lazy"
              style={{ "--r": "0deg", "--x": "0%" } as React.CSSProperties}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/cs2/C83tKltSXUp.webp"
              alt="eCommerce proof"
              loading="lazy"
              style={{ "--r": "8deg", "--x": "30%" } as React.CSSProperties}
            />
          </div>
          <div className="mdf-hb">
            <span className="mdf-ht">Direct-Response Creative Scaling</span>
            <h2>eCommerce & DTC Brands</h2>
            <div className="mdf-hn">
              <b>126</b>
              <span>verified case studies</span>
            </div>
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
