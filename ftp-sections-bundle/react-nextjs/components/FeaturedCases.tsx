"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { FEATURED_CASES } from "../data/siteContent";

export default function FeaturedCases() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // IntersectionObserver to auto-play background preview videos
  useEffect(() => {
    if (!containerRef.current) return;
    const videos = containerRef.current.querySelectorAll<HTMLVideoElement>(".mv");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    videos.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  // Keyboard navigation & body scroll locking when modal is open
  useEffect(() => {
    if (activeModalIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalIndex(null);
      } else if (e.key === "ArrowLeft") {
        setActiveModalIndex((prev) =>
          prev !== null ? (prev - 1 + FEATURED_CASES.length) % FEATURED_CASES.length : 0
        );
      } else if (e.key === "ArrowRight") {
        setActiveModalIndex((prev) =>
          prev !== null ? (prev + 1) % FEATURED_CASES.length : 0
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const globalLenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    globalLenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      globalLenis?.start();
      document.body.style.overflow = prevOverflow;
    };
  }, [activeModalIndex]);

  return (
    <section className="sec box" id="cases">
      <div className="cwrap">
        <div className="chead">
          <h2 className="h2 d">
            Selected <span className="it">work.</span>
          </h2>
          <Link className="btn" href="/case-studies">
            All case studies <i>&#8599;</i>
          </Link>
        </div>

        <div className="cases" id="caselist" ref={containerRef}>
          {FEATURED_CASES.map((cs, i) => (
            <article
              key={cs.slug}
              className="case"
              style={{ "--i": i } as React.CSSProperties}
            >
              <div className="cin">
                <div className="img">
                  <video
                    className="mv"
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster={`/img/sw/c${i + 1}.webp`}
                    aria-hidden="true"
                  >
                    <source src={`/img/sw/c${i + 1}.mp4`} type="video/mp4" />
                  </video>
                  <span className="gl" />
                  
                  {/* Real result clickable preview card */}
                  <figure
                    className="pf"
                    role="button"
                    tabIndex={0}
                    aria-label={`Open full screenshot of verified result for ${cs.title}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveModalIndex(i);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveModalIndex(i);
                      }
                    }}
                  >
                    <img
                      className="mn"
                      src={`/img/cs/${cs.slug}.webp`}
                      alt={`${cs.title} results`}
                      loading="lazy"
                    />
                    <figcaption>
                      <div className="pf-label">
                        <i />
                        <span>Real result</span>
                      </div>
                      <span className="pf-hint">
                        <span>Open</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="15 3 21 3 21 9" />
                          <polyline points="9 21 3 21 3 15" />
                          <line x1="21" y1="3" x2="14" y2="10" />
                          <line x1="3" y1="21" x2="10" y2="14" />
                        </svg>
                      </span>
                    </figcaption>
                  </figure>
                </div>

                <div className="inf">
                  <div className="tags">
                    <span>{cs.category}</span>
                    {cs.tags.slice(0, 2).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <h3>{cs.title}</h3>
                  <p>{cs.desc}</p>

                  <div className="res">
                    <b>{cs.metric}</b>
                    <span>{cs.metricLabel}</span>
                  </div>

                  <Link className="btn v" href={`/case?set=lg&id=${cs.slug}`}>
                    View full case study <i>&#8599;</i>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full-screen Lightbox Modal for Real Result Screenshot */}
      {mounted && activeModalIndex !== null && createPortal(
        <div
          className="case-modal-backdrop"
          onClick={() => setActiveModalIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Verified Real Result Screenshot"
        >
          <div
            className="case-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="case-modal-header">
              <div className="case-modal-title-group">
                <div className="case-modal-badge">
                  <span className="live-dot" />
                  <span>Verified Client Result</span>
                  <span className="case-modal-tag">{FEATURED_CASES[activeModalIndex].category}</span>
                </div>
                <h3>{FEATURED_CASES[activeModalIndex].title}</h3>
              </div>

              <div className="case-modal-actions">
                <div className="case-modal-metric">
                  <b>{FEATURED_CASES[activeModalIndex].metric}</b>
                  <span>{FEATURED_CASES[activeModalIndex].metricLabel}</span>
                </div>
                <Link
                  className="btn v case-modal-btn"
                  href={`/case?set=lg&id=${FEATURED_CASES[activeModalIndex].slug}`}
                  onClick={() => setActiveModalIndex(null)}
                >
                  Full Case Study <i>&#8599;</i>
                </Link>
                <button
                  className="case-modal-close"
                  onClick={() => setActiveModalIndex(null)}
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Modal Body & Image */}
            <div className="case-modal-body">
              <button
                className="case-modal-nav prev"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveModalIndex((prev) =>
                    prev !== null
                      ? (prev - 1 + FEATURED_CASES.length) % FEATURED_CASES.length
                      : 0
                  );
                }}
                aria-label="Previous result screenshot"
              >
                &#8592;
              </button>

              <div className="case-modal-img-container">
                <img
                  src={`/img/cs/${FEATURED_CASES[activeModalIndex].slug}.webp`}
                  alt={`${FEATURED_CASES[activeModalIndex].title} real result screenshot`}
                  className="case-modal-img"
                />
              </div>

              <button
                className="case-modal-nav next"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveModalIndex((prev) =>
                    prev !== null
                      ? (prev + 1) % FEATURED_CASES.length
                      : 0
                  );
                }}
                aria-label="Next result screenshot"
              >
                &#8594;
              </button>
            </div>

            {/* Modal Footer */}
            <div className="case-modal-footer">
              <p>{FEATURED_CASES[activeModalIndex].desc}</p>
              <div className="case-modal-counter">
                {activeModalIndex + 1} of {FEATURED_CASES.length}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
