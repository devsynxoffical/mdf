"use client";

import type { ReactNode } from "react";
import ContourBG from "@/components/uf/ContourBG";

type Props = {
  title: string;
  eyebrow: string;
  updated?: string;
  children: ReactNode;
};

export default function LegalPage({ title, eyebrow, updated = "September 1, 2026", children }: Props) {
  return (
    <div className="bg-[#020926] text-white">
      <section className="relative overflow-hidden pt-28 pb-24 md:pt-36 md:pb-32">
        <ContourBG tone="dark" />
        <div className="relative mx-auto max-w-[820px] px-4 sm:px-6 md:px-14">
          <p className="uf-eyebrow text-sky">{eyebrow}</p>
          <h1 className="mt-5 font-sans text-[clamp(32px,4.5vw,56px)] font-extrabold leading-[1.08] tracking-tight">
            {title}
          </h1>
          <p className="mt-4 font-sans text-[13px] text-slate-500">Last updated {updated}</p>
          <div className="legal-prose mt-12 space-y-6 font-sans text-[15px] leading-[1.75] text-slate-300 [&_h2]:mt-10 [&_h2]:font-sans [&_h2]:text-[20px] [&_h2]:font-bold [&_h2]:text-white [&_a]:text-sky [&_a]:underline">
            {children}
          </div>
        </div>
      </section>
    </div>
  );
}
