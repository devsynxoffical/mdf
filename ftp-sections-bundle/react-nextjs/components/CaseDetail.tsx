"use client";

import { useState } from "react";
import Link from "next/link";
import { CaseItem } from "../data/cases";
import { LeadItem } from "../data/leads";

interface CaseDetailProps {
  current: CaseItem | LeadItem;
  set: "ec" | "lg";
  prev?: CaseItem | LeadItem;
  next?: CaseItem | LeadItem;
  listUrl?: string;
  contactUrl?: string;
}

export default function CaseDetail({
  current,
  set,
  prev,
  next,
  listUrl,
  contactUrl = "/contact",
}: CaseDetailProps) {
  const [expanded, setExpanded] = useState(false);

  const defaultListUrl = set === "ec" ? "/case-ecom" : "/case-leadgen";
  const backUrl = listUrl || defaultListUrl;
  const label = set === "ec" ? "Ecom" : "Lead gen";
  const mediaFolder = set === "ec" ? "cs2" : "lg";

  const isVideo = current.type === "video";
  const isLongCaption = current.cap && current.cap.length > 600;

  return (
    <div className="box">
      <section className="kc" id="kroot">
        <Link className="kback in" href={backUrl}>
          &larr; All {label} case studies
        </Link>

        <div className="kd">
          {/* Media Column (Video or Image) */}
          <div className="md in">
            {isVideo ? (
              <>
                <span className="mb">Video proof</span>
                <video
                  src={`/vid/${mediaFolder}/${current.id}.mp4`}
                  poster={`/img/${mediaFolder}/${current.id}.webp`}
                  controls
                  playsInline
                  preload="metadata"
                />
              </>
            ) : (
              <>
                <span className="mb">Breakdown</span>
                <img
                  src={`/img/${mediaFolder}/${current.id}.webp`}
                  alt={`${current.nic} results`}
                />
              </>
            )}
          </div>

          {/* Details Column */}
          <div>
            <div className="in">
              <span className="tag">
                Case study {String(current.i).padStart(3, "0")} &middot;{" "}
                {current.nic}
              </span>
              <h1>{current.t}</h1>
            </div>

            {/* Metrics Grid */}
            <div className="km in">
              <div>
                <span>{set === "lg" ? "Headline result" : "Verified revenue"}</span>
                <b>{current.rev}</b>
                <span>{current.revl}</span>
              </div>
              <div>
                <span>
                  {current.rol === "ROAS"
                    ? "Return on ad spend"
                    : current.ro
                    ? current.rol.replace(/^./, (m) => m.toUpperCase())
                    : "Proof type"}
                </span>
                <b>{current.ro || (isVideo ? "Video" : "Dashboard")}</b>
                <span>{current.ro ? "" : "verified"}</span>
              </div>
              <div>
                <span>Niche</span>
                <b className="sm">{current.nic}</b>
              </div>
              <div>
                <span>System</span>
                <b className="sm">{current.sys}</b>
              </div>
            </div>

            {/* Key Points */}
            {current.pts && current.pts.length > 0 && (
              <ul className="kpt in">
                {current.pts.map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ul>
            )}

            {/* Narrative Breakdown */}
            <div className={`kcap in ${expanded ? "open" : ""}`}>
              <h2>The full breakdown</h2>
              <p style={{ whiteSpace: "pre-line" }}>{current.cap}</p>
              {isLongCaption && (
                <button
                  type="button"
                  id="kmore"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? "Show less" : "Read the full breakdown"}
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="kact in">
              <Link className="btn o" href={contactUrl}>
                Get results like this <i>&#8599;</i>
              </Link>
              {current.ig && (
                <a
                  className="btn"
                  href={current.ig}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "transparent",
                    color: "var(--fg)",
                    border: "1px solid var(--line2)",
                  }}
                >
                  View on Instagram <i>&#8599;</i>
                </a>
              )}
            </div>

            {/* Prev / Next Pagination */}
            {(prev || next) && (
              <div className="knav in">
                {prev ? (
                  <Link
                    className="kp"
                    href={`/case?set=${set}&id=${prev.id}`}
                  >
                    <span>&larr; Previous</span>
                    <b>{prev.t}</b>
                  </Link>
                ) : (
                  <div />
                )}
                {next && (
                  <Link
                    className="kn"
                    href={`/case?set=${set}&id=${next.id}`}
                  >
                    <span>Next &rarr;</span>
                    <b>{next.t}</b>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
