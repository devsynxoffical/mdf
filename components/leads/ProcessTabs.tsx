"use client";

import { useState } from "react";
import RichText from "@/components/content/RichText";

export type ProcessStep = { title: string; body: string; points: string[] };

/** Interactive step-by-step system. All steps stay in the HTML (hidden panels), so crawlers read every step. */
export default function ProcessTabs({ steps }: { steps: ProcessStep[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="ptabs">
      <div className="ptabs-list" role="tablist" aria-label="Our process">
        {steps.map((s, i) => (
          <button
            key={s.title}
            role="tab"
            id={`ptab-${i}`}
            aria-selected={active === i}
            aria-controls={`ppanel-${i}`}
            className="ptab"
            onClick={() => setActive(i)}
          >
            <span className="ptab-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="ptab-title">{s.title}</span>
          </button>
        ))}
      </div>
      {steps.map((s, i) => (
        <div key={s.title} role="tabpanel" id={`ppanel-${i}`} aria-labelledby={`ptab-${i}`} hidden={active !== i} className="ppanel">
          <p className="ppanel-step">Step {i + 1} of {steps.length}</p>
          <h3 className="ppanel-title">{s.title}</h3>
          <p className="ppanel-body"><RichText text={s.body} /></p>
          <ul className="ppanel-points">
            {s.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <div className="ppanel-nav">
            <button type="button" onClick={() => setActive(Math.max(0, i - 1))} disabled={i === 0}>
              ← Previous
            </button>
            <button type="button" onClick={() => setActive(Math.min(steps.length - 1, i + 1))} disabled={i === steps.length - 1}>
              Next step →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
