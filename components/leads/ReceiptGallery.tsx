"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import ReceiptLightbox from "@/components/uf/ReceiptLightbox";
import type { WorkProofItem } from "@/lib/workproof";

export type Receipt = { id: string; src: string; figure: string; label: string; detail: string; period: string; tag?: "Meta Ads" | "CRM" | "Scale" };

/** Real ad-account / CRM screenshots as cards; click to inspect full size. */
export default function ReceiptGallery({ receipts }: { receipts: Receipt[] }) {
  const [idx, setIdx] = useState<number | null>(null);
  const items: WorkProofItem[] = receipts.map((r) => ({
    id: r.id,
    src: r.src,
    tag: r.tag ?? "Meta Ads",
    niche: r.label,
    metric: r.figure,
    metricLabel: r.period,
    note: r.detail,
    size: "md",
  }));
  const close = useCallback(() => setIdx(null), []);
  const prev = useCallback(() => setIdx((i) => (i === null ? i : (i - 1 + items.length) % items.length)), [items.length]);
  const next = useCallback(() => setIdx((i) => (i === null ? i : (i + 1) % items.length)), [items.length]);

  return (
    <>
      <div className="rgal">
        {receipts.map((r, i) => (
          <button key={r.id} type="button" className="rgal-card" onClick={() => setIdx(i)} aria-label={`Open receipt: ${r.figure} ${r.label}`}>
            <span className="rgal-img">
              <Image src={r.src} alt={`${r.label}: ${r.figure}. ${r.detail}`} fill sizes="(max-width: 768px) 100vw, 380px" className="object-cover object-top" />
              <span className="rgal-zoom" aria-hidden>
                ⤢ Inspect
              </span>
            </span>
            <span className="rgal-body">
              <span className="rgal-figure">{r.figure}</span>
              <span className="rgal-label">{r.label}</span>
              <span className="rgal-detail">{r.detail}</span>
              <span className="rgal-period">{r.period}</span>
            </span>
          </button>
        ))}
      </div>
      <ReceiptLightbox active={idx === null ? null : items[idx]} index={idx ?? 0} total={items.length} onClose={close} onPrev={prev} onNext={next} />
    </>
  );
}
