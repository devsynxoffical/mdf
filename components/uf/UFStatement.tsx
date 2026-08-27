"use client";

import WordReveal from "./WordReveal";

/** (01) The problem — a single statement that lights up as you scroll. */
export default function UFStatement() {
  return (
    <section className="uf-dark relative py-[36vh]">
      <div className="mx-auto max-w-[900px] px-6 text-center">
        <p className="uf-eyebrow mb-10 text-mint">( 01 ) — The Problem</p>
        <WordReveal
          className="font-body text-[clamp(26px,3.6vw,46px)] font-medium leading-[1.35] text-bone"
          parts={[
            { text: "Leads aren't your problem. It's everything between" },
            { text: "the click and the booked call.", accent: true },
          ]}
        />
      </div>
    </section>
  );
}
