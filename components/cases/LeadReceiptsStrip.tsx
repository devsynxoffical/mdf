"use client";

import { useCallback, useState } from "react";
import { WORK_PROOF, type WorkProofItem } from "@/lib/workproof";
import ReceiptLightbox from "@/components/uf/ReceiptLightbox";
import { playTick } from "@/components/audio/SoundToggle";

/**
 * Real campaign receipts & pipeline ROI, shown inside the Lead Generation card:
 * one auto-scrolling row of Work Proof receipts that pauses on hover and opens
 * the full-screen inspector on click.
 */
export default function LeadReceiptsStrip() {
  const [active, setActive] = useState<WorkProofItem | null>(null);
  const index = active ? WORK_PROOF.findIndex((w) => w.id === active.id) : -1;

  const step = useCallback(
    (dir: 1 | -1) => {
      if (index < 0) return;
      setActive(WORK_PROOF[(index + dir + WORK_PROOF.length) % WORK_PROOF.length]);
      playTick();
    },
    [index]
  );
  const onPrev = useCallback(() => step(-1), [step]);
  const onNext = useCallback(() => step(1), [step]);
  const onClose = useCallback(() => setActive(null), []);

  return (
    <div className="mdf-receipts">
      <div className="mdf-receipts-row marquee-row">
        <div className="marquee-track-left flex w-max gap-3" style={{ "--marquee-duration": "120s" } as React.CSSProperties}>
          {[0, 1].map((loop) =>
            WORK_PROOF.map((item) => (
              <button
                key={`${item.id}-${loop}`}
                type="button"
                className="mdf-receipt"
                aria-hidden={loop === 1 ? true : undefined}
                tabIndex={loop === 1 ? -1 : 0}
                aria-label={`Inspect receipt: ${item.niche}, ${item.metric} ${item.metricLabel}`}
                onClick={() => {
                  playTick();
                  setActive(item);
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={loop === 0 ? `${item.niche}, ${item.metric} ${item.metricLabel}` : ""}
                  loading="lazy"
                  decoding="async"
                />
                <span className="mdf-receipt-metric">
                  <b>{item.metric}</b> {item.metricLabel}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
      <p className="mdf-receipts-cap">
        <span>Real campaign receipts &amp; pipeline ROI</span>
        <span>
          {WORK_PROOF.length} verified · click to inspect
        </span>
      </p>

      <ReceiptLightbox
        active={active}
        index={index}
        total={WORK_PROOF.length}
        onClose={onClose}
        onPrev={onPrev}
        onNext={onNext}
      />
    </div>
  );
}
