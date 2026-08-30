"use client";

import { useState } from "react";
import { playTick } from "@/components/audio/SoundToggle";

interface CaseStudy {
  id: string;
  name: string;
  color: string;
  textColor: string;
  subtextColor: string;
  tagColor: string;
  description: string;
  services: string[];
  location: string;
  images: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "meridian",
    name: "Meridian",
    color: "#FA4D09", // Vibrant Electric Orange
    textColor: "#FFFFFF",
    subtextColor: "rgba(255, 255, 255, 0.85)",
    tagColor: "rgba(255, 255, 255, 0.75)",
    description:
      "Built Meridian's positioning, brand, and website from the ground up, turning a new AI visibility product into a clear category story that drove massive trial demand at launch.",
    services: [
      "BRANDING",
      "WEB DESIGN",
      "WEBFLOW DEVELOPMENT",
      "STRATEGY",
    ],
    location: "NEW YORK, USA",
    images: [
      "/images/shots/shot1.webp",
      "/images/shots/shot2.webp",
      "/images/shots/shot3.webp",
    ],
  },
  {
    id: "heimdall-power",
    name: "Heimdall Power",
    color: "#E8431E", // Vibrant Vermilion / Red-Orange
    textColor: "#FFFFFF",
    subtextColor: "rgba(255, 255, 255, 0.85)",
    tagColor: "rgba(255, 255, 255, 0.75)",
    description:
      "Turned complex grid technology into a clear, compelling brand story for Heimdall Power, making its vision for a more efficient energy grid easier to understand.",
    services: [
      "3D ANIMATIONS",
      "BRANDING",
      "CREATIVE DEVELOPMENT",
      "WEB DESIGN",
      "WEBFLOW DEVELOPMENT",
    ],
    location: "NORWAY",
    images: [
      "/images/shots/shot4.webp",
      "/images/shots/shot5.webp",
      "/images/shots/shot6.webp",
    ],
  },
  {
    id: "cula",
    name: "Cula",
    color: "#3A4B62", // Slate Steel Blue
    textColor: "#FFFFFF",
    subtextColor: "rgba(255, 255, 255, 0.85)",
    tagColor: "rgba(255, 255, 255, 0.75)",
    description:
      "Made Cula's carbon removal platform tangible and easy to understand, turning an invisible technical process into a clear and memorable digital story.",
    services: [
      "WEB DESIGN",
      "WEBFLOW DEVELOPMENT",
      "CREATIVE DEVELOPMENT",
      "3D ANIMATIONS",
    ],
    location: "BERLIN, GERMANY",
    images: [
      "/images/shots/shot7.webp",
      "/images/shots/shot8.webp",
      "/images/shots/shot9.webp",
    ],
  },
  {
    id: "space-capital",
    name: "Space Capital",
    color: "#0B1437", // Deep Space Midnight Navy
    textColor: "#FFFFFF",
    subtextColor: "rgba(255, 255, 255, 0.85)",
    tagColor: "rgba(255, 255, 255, 0.75)",
    description:
      "Repositioned Space Capital as the reference standard in space venture capital, bringing its portfolio, research, and point of view together under one authoritative brand.",
    services: [
      "3D ANIMATIONS",
      "BRANDING",
      "CREATIVE DEVELOPMENT",
      "STRATEGY",
      "WEB DESIGN",
    ],
    location: "NEW YORK, USA",
    images: [
      "/images/shots/shot10.webp",
      "/images/shots/shot11.webp",
      "/images/shots/shot12.webp",
    ],
  },
  {
    id: "exebenus",
    name: "Exebenus",
    color: "#2D1B54", // Rich Imperial Purple
    textColor: "#FFFFFF",
    subtextColor: "rgba(255, 255, 255, 0.85)",
    tagColor: "rgba(255, 255, 255, 0.75)",
    description:
      "Turned a highly technical drilling intelligence platform into a clear, credible story built around what matters most in the category: precision, proof, and trust.",
    services: [
      "3D ANIMATIONS",
      "CREATIVE DEVELOPMENT",
      "BRANDING",
      "STRATEGY",
      "WEB DESIGN",
    ],
    location: "TEXAS, USA",
    images: [
      "/images/shots/shot13.webp",
      "/images/shots/shot14.webp",
      "/images/shots/shot15.webp",
    ],
  },
  {
    id: "arqitel",
    name: "Arqitel",
    color: "#0F3332", // Deep Teal Emerald
    textColor: "#FFFFFF",
    subtextColor: "rgba(255, 255, 255, 0.85)",
    tagColor: "rgba(255, 255, 255, 0.75)",
    description:
      "Turned Arqitel's complex mix of data science, real estate, and investment into a clear, differentiated story that positions the firm as a leader in its category.",
    services: [
      "WEB DESIGN",
      "WEBFLOW DEVELOPMENT",
      "CREATIVE DEVELOPMENT",
      "3D ANIMATIONS",
    ],
    location: "CALIFORNIA, USA",
    images: [
      "/images/shots/shot16.webp",
      "/images/shots/shot1.webp",
      "/images/shots/shot4.webp",
    ],
  },
];

/**
 * Interactive Expandable Case Studies Accordion Showcase
 * Matching reference screenshot exactly:
 * - Editorial serif headline & subtitle
 * - Clean row list with client name, description, tags & location
 * - Interactive expanding row revealing vibrant client brand color & 3-mockup showcase
 */
export default function UFProof() {
  const [activeId, setActiveId] = useState<string>("meridian");

  // Hover to expand without clicking, with clean tactile tick sound
  const handleHover = (id: string) => {
    if (activeId !== id) {
      setActiveId(id);
      playTick();
    }
  };

  return (
    <section
      id="proof"
      className="relative overflow-hidden bg-[#0A0D14] pt-28 pb-36 text-white"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-14">
        {/* Section Header with Editorial Serif Typography */}
        <div className="max-w-[1020px]">
          <h2 className="font-serif text-[clamp(40px,5.8vw,88px)] font-normal leading-[1.04] tracking-[-0.02em] text-white">
            We help the outside world see the company you&apos;ve actually become.
          </h2>

          <p className="mt-8 max-w-[620px] font-sans text-[15px] sm:text-[16px] font-normal leading-[1.6] text-slate-400">
            From AI and energy infrastructure to climate tech and the space economy,
            we help ambitious technology companies turn complicated products into clear,
            compelling brands.
          </p>
        </div>

        {/* Case Studies Interactive List */}
        <div className="mt-20 border-t border-white/10">
          {CASE_STUDIES.map((c) => {
            const isActive = activeId === c.id;

            return (
              <div
                key={c.id}
                onMouseEnter={() => handleHover(c.id)}
                onClick={() => handleHover(c.id)}
                className={`group relative cursor-pointer border-b border-white/10 transition-colors duration-500 overflow-hidden ${
                  isActive ? "py-10 md:py-14" : "py-7 md:py-9 hover:bg-white/[0.02]"
                }`}
                style={{
                  backgroundColor: isActive ? c.color : "transparent",
                }}
              >
                <div className="mx-auto px-4 md:px-8">
                  {/* Top Metadata Row (Client, Summary, Services/Location) */}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr_220px] items-start">
                    {/* Column 1: Client Name & Link */}
                    <div>
                      <h3 className="font-sans text-[22px] md:text-[25px] font-bold tracking-tight text-white">
                        {c.name}
                      </h3>

                      {isActive && (
                        <div className="mt-6">
                          <a
                            href="#door"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 font-sans text-[13px] font-medium tracking-wide text-white underline underline-offset-4 opacity-90 transition-opacity hover:opacity-100"
                          >
                            <span>View Case Study</span>
                            <span className="transition-transform duration-200 group-hover:translate-x-1">
                              →
                            </span>
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Column 2: Project Description */}
                    <div>
                      <p
                        className={`font-sans text-[13.5px] sm:text-[14.5px] leading-[1.65] max-w-[540px] ${
                          isActive ? "text-white/95" : "text-slate-400"
                        }`}
                      >
                        {c.description}
                      </p>
                    </div>

                    {/* Column 3: Services & Location */}
                    <div className="text-left md:text-right">
                      <div className="flex flex-col gap-1">
                        {c.services.map((s) => (
                          <span
                            key={s}
                            className={`font-sans text-[10px] font-semibold tracking-[0.14em] uppercase ${
                              isActive ? "text-white/80" : "text-slate-400"
                            }`}
                          >
                            {s}
                          </span>
                        ))}
                        <span
                          className={`mt-2 font-sans text-[10px] font-bold tracking-[0.16em] uppercase ${
                            isActive ? "text-white" : "text-slate-300"
                          }`}
                        >
                          {c.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Visual Gallery (3 High-Definition Mockups) */}
                  {isActive && (
                    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-12 animate-fadeIn">
                      {c.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-[16/10] w-full overflow-hidden rounded-xl sm:rounded-2xl border border-white/20 bg-black/25 shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:scale-[1.02]"
                        >
                          <img
                            src={img}
                            alt={`${c.name} Project Mockup ${idx + 1}`}
                            className="h-full w-full object-cover object-center"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
