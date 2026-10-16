"use client";

import React from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import { ROUTES } from "@/lib/routes";

interface PricingTier {
  id: string;
  badge: string;
  badgeType: "starter" | "popular" | "complete";
  title: string;
  originalPrice: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  bookQuery: string;
}

const TIERS: PricingTier[] = [
  {
    id: "design-only",
    badge: "STARTER",
    badgeType: "starter",
    title: "Design Only",
    originalPrice: "$1,997",
    price: "$1,497",
    description:
      "Perfect if you want the strategy and visual funnel assets, but not the full copy + implementation.",
    features: [
      "Market Research & Offer Positioning",
      "Funnel Strategy & Structure",
      "Premium Conversion Design",
      "Custom Graphics + Brand Visuals",
      "Mobile-Optimized Layouts",
    ],
    buttonText: "START WITH DESIGN",
    bookQuery: "design-only",
  },
  {
    id: "design-copy-build",
    badge: "MOST POPULAR",
    badgeType: "popular",
    title: "Design + Copy Build",
    originalPrice: "$3,497",
    price: "$2,497",
    description:
      "Our most recommended package for a launch-ready AC Funnel with both messaging and design handled for you.",
    features: [
      "Front-End Sales Page + Long-Form Copy",
      "Checkout Page + Order Bump Copy",
      "OTO Pages + VSL Copy",
      "Backend Booking Page + VSL Copy",
      "Thank You Page + Call Show-Up Script",
      "Premium Custom Graphics + Brand Visuals",
      "Mobile-Optimized Conversion Design",
    ],
    buttonText: "GET YOUR AC FUNNEL NOW",
    isPopular: true,
    bookQuery: "design-copy-build",
  },
  {
    id: "full-funnel-suite",
    badge: "COMPLETE",
    badgeType: "complete",
    title: "Full AC Funnel Suite",
    originalPrice: "$6,997",
    price: "$4,997",
    description:
      "The complete done-for-you package with full build, systems, integrations, and post-launch support.",
    features: [
      "Everything in Design + Copy Build",
      "Full Tech Setup + Integrations",
      "Membership Area Setup + Organization",
      "Follow-Up Email Sequences",
      "30 Days of Post-Launch Support",
    ],
    buttonText: "APPLY FOR FULL FUNNEL SUITE",
    bookQuery: "full-funnel-suite",
  },
];

export default function UFPricing() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-[#03050E] py-[12vh] sm:py-[16vh] text-white selection:bg-blue-600/40"
    >
      {/* Cosmic background ambient lighting */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[700px] w-[950px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/[0.07] blur-[180px]" />
      </div>

      <div className="relative mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8 items-stretch">
          {TIERS.map((tier, idx) => {
            const isPop = tier.isPopular;

            if (isPop) {
              return (
                <Reveal as="div" key={tier.id} delay={idx * 100} className="h-full flex flex-col">
                  {/* Glowing gradient border wrapper */}
                  <div className="relative flex flex-col flex-1 rounded-[30px] p-[2px] bg-gradient-to-br from-[#1d4ed8] via-[#2563eb] to-[#00f0ff] shadow-[0_0_45px_rgba(37,99,235,0.35)] transition-all duration-500 hover:shadow-[0_0_65px_rgba(56,189,248,0.45)]">
                    <div className="relative flex h-full flex-col justify-between rounded-[28px] bg-[#070b1f] p-7 sm:p-9 overflow-hidden flex-1">
                      {/* Subtle starry particles in top space */}
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 overflow-hidden">
                        <span className="absolute top-7 left-14 h-[2px] w-[2px] rounded-full bg-white opacity-90 shadow-[0_0_6px_#fff]" />
                        <span className="absolute top-14 left-1/3 h-[2px] w-[2px] rounded-full bg-blue-200 opacity-60 shadow-[0_0_4px_#93c5fd]" />
                        <span className="absolute top-9 right-16 h-[2.5px] w-[2.5px] rounded-full bg-cyan-200 opacity-95 shadow-[0_0_8px_#67e8f9]" />
                        <span className="absolute top-24 right-28 h-[1.5px] w-[1.5px] rounded-full bg-white opacity-70" />
                        <span className="absolute top-16 left-3/4 h-[2px] w-[2px] rounded-full bg-blue-300 opacity-80 shadow-[0_0_6px_#60a5fa]" />
                        <span className="absolute top-28 left-20 h-[1.5px] w-[1.5px] rounded-full bg-cyan-100 opacity-50" />
                      </div>

                      {/* Content Stack */}
                      <div className="relative flex-1 flex flex-col">
                        {/* Badge */}
                        <div className="flex justify-center">
                          <div className="inline-flex items-center justify-center rounded-full border border-[#3b82f6] bg-[#0c1a4d] px-6 py-1.5 shadow-[0_0_15px_rgba(59,130,246,0.6)]">
                            <span className="font-sans text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#60a5fa]">
                              {tier.badge}
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="mt-6 text-center font-sans text-[26px] sm:text-[28px] font-bold tracking-tight text-white">
                          {tier.title}
                        </h3>

                        {/* Pricing */}
                        <div className="mt-3 flex flex-col items-center justify-center">
                          <span className="font-sans text-[17px] sm:text-[18px] font-semibold tracking-tight text-[#64748b] line-through">
                            {tier.originalPrice}
                          </span>
                          <span className="mt-1 font-sans text-[52px] sm:text-[58px] font-black tracking-tight leading-none bg-gradient-to-b from-[#67e8f9] via-[#38bdf8] to-[#2563eb] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(56,189,248,0.45)]">
                            {tier.price}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="mx-auto mt-5 max-w-[290px] text-center font-sans text-[14px] leading-[1.62] text-slate-300 font-normal">
                          {tier.description}
                        </p>

                        {/* Feature Bullets */}
                        <ul className="mt-8 sm:mt-9 space-y-4 flex-1">
                          {tier.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-3.5 text-left">
                              <div className="mt-0.5 flex h-[21px] w-[21px] shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#1d4ed8] via-[#2563eb] to-[#38bdf8] shadow-[0_0_12px_rgba(59,130,246,0.75)]">
                                <svg
                                  className="h-3 w-3 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={3}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12.75l6 6 9-13.5"
                                  />
                                </svg>
                              </div>
                              <span className="font-sans text-[14px] sm:text-[14.5px] font-medium leading-snug text-slate-200">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Button Pinned to Bottom */}
                      <div className="mt-10 sm:mt-11 pt-2">
                        <Link
                          href={`${ROUTES.book}?tier=${tier.bookQuery}`}
                          className="block w-full rounded-2xl py-4 text-center font-sans text-[13px] font-bold uppercase tracking-[0.14em] text-white bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#3b82f6] shadow-[0_0_35px_rgba(37,99,235,0.6)] hover:from-[#2563eb] hover:to-[#60a5fa] hover:shadow-[0_0_50px_rgba(59,130,246,0.9)] transition-all duration-300 hover:scale-[1.01]"
                        >
                          {tier.buttonText}
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            }

            return (
              <Reveal as="div" key={tier.id} delay={idx * 100} className="h-full flex flex-col">
                <div className="relative flex h-full flex-col justify-between rounded-[28px] border border-[#161d3d] bg-[#060817] p-7 sm:p-9 shadow-[0_15px_40px_rgba(0,0,0,0.7)] transition-all duration-500 hover:border-[#2b3a80] hover:shadow-[0_20px_50px_rgba(18,84,236,0.18)] flex-1">
                  {/* Content Stack */}
                  <div className="flex-1 flex flex-col">
                    {/* Badge */}
                    <div className="flex justify-center">
                      <div className="inline-flex items-center justify-center rounded-full border border-[#273575] bg-[#0b1133] px-6 py-1.5 shadow-[0_0_10px_rgba(39,53,117,0.3)]">
                        <span className="font-sans text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#818cf8]">
                          {tier.badge}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="mt-6 text-center font-sans text-[26px] sm:text-[28px] font-bold tracking-tight text-white">
                      {tier.title}
                    </h3>

                    {/* Pricing */}
                    <div className="mt-3 flex flex-col items-center justify-center">
                      <span className="font-sans text-[17px] sm:text-[18px] font-semibold tracking-tight text-[#64748b] line-through">
                        {tier.originalPrice}
                      </span>
                      <span className="mt-1 font-sans text-[52px] sm:text-[58px] font-black tracking-tight leading-none bg-gradient-to-b from-[#67e8f9] via-[#38bdf8] to-[#2563eb] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(56,189,248,0.4)]">
                        {tier.price}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mx-auto mt-5 max-w-[290px] text-center font-sans text-[14px] leading-[1.62] text-slate-300 font-normal">
                      {tier.description}
                    </p>

                    {/* Feature Bullets */}
                    <ul className="mt-8 sm:mt-9 space-y-4 flex-1">
                      {tier.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3.5 text-left">
                          <div className="mt-0.5 flex h-[21px] w-[21px] shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#1d4ed8] via-[#2563eb] to-[#38bdf8] shadow-[0_0_12px_rgba(59,130,246,0.75)]">
                            <svg
                              className="h-3 w-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
                          </div>
                          <span className="font-sans text-[14px] sm:text-[14.5px] font-medium leading-snug text-slate-200">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button Pinned to Bottom */}
                  <div className="mt-10 sm:mt-11 pt-2">
                    <Link
                      href={`${ROUTES.book}?tier=${tier.bookQuery}`}
                      className="block w-full rounded-2xl py-4 text-center font-sans text-[13px] font-bold uppercase tracking-[0.14em] text-white bg-[#060817] border border-[#1d2752] shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:border-[#3b82f6] hover:bg-[#0c1438] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-all duration-300 hover:scale-[1.01]"
                    >
                      {tier.buttonText}
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
