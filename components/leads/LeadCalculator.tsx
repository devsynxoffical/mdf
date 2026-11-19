"use client";

import { useState } from "react";

type Field = { key: "budget" | "cpl" | "book" | "close" | "value"; label: string; min: number; max: number; step: number; prefix?: string; suffix?: string };

const FIELDS: Field[] = [
  { key: "budget", label: "Monthly ad spend", min: 500, max: 50000, step: 250, prefix: "$" },
  { key: "cpl", label: "Cost per lead", min: 2, max: 150, step: 0.5, prefix: "$" },
  { key: "book", label: "Leads that book an appointment", min: 1, max: 80, step: 1, suffix: "%" },
  { key: "close", label: "Appointments that become customers", min: 1, max: 80, step: 1, suffix: "%" },
  { key: "value", label: "Average customer value", min: 100, max: 50000, step: 100, prefix: "$" },
];

const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });

/**
 * Interactive pipeline estimate. Every number is the visitor's own input;
 * defaults come from the page (published receipts or example values that are labelled as such).
 */
export default function LeadCalculator({
  defaults,
  note,
  valueLabel = "Average customer value",
}: {
  defaults: { budget: number; cpl: number; book: number; close: number; value: number };
  note: string;
  valueLabel?: string;
}) {
  const [v, setV] = useState(defaults);
  const leads = v.cpl > 0 ? v.budget / v.cpl : 0;
  const appts = (leads * v.book) / 100;
  const customers = (appts * v.close) / 100;
  const revenue = customers * v.value;
  const roas = v.budget > 0 ? revenue / v.budget : 0;

  return (
    <div className="calc">
      <div className="calc-inputs">
        {FIELDS.map((f) => (
          <label key={f.key} className="calc-field">
            <span className="calc-label">
              {f.key === "value" ? valueLabel : f.label}
              <output className="calc-val">
                {f.prefix}
                {f.key === "cpl" ? v[f.key].toFixed(2) : fmt(v[f.key])}
                {f.suffix}
              </output>
            </span>
            <input
              type="range"
              min={f.min}
              max={f.max}
              step={f.step}
              value={v[f.key]}
              onChange={(e) => setV({ ...v, [f.key]: Number(e.target.value) })}
              aria-label={f.key === "value" ? valueLabel : f.label}
            />
          </label>
        ))}
      </div>
      <div className="calc-results" aria-live="polite">
        <div className="calc-result">
          <span>Leads / month</span>
          <strong>{fmt(leads)}</strong>
        </div>
        <div className="calc-result">
          <span>Booked appointments</span>
          <strong>{fmt(appts)}</strong>
        </div>
        <div className="calc-result">
          <span>New customers</span>
          <strong>{fmt(customers)}</strong>
        </div>
        <div className="calc-result calc-result-main">
          <span>Estimated revenue</span>
          <strong>${fmt(revenue)}</strong>
          <em>{roas.toFixed(1)}× return on ad spend</em>
        </div>
        <p className="calc-note">{note}</p>
        <a href="#lead" className="mdf-cta-btn mt-1 w-full justify-center">
          Get a plan for these numbers <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}
