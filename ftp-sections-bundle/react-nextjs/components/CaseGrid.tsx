"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CaseItem } from "../data/cases";
import { LeadItem } from "../data/leads";

interface CaseGridProps {
  type: "ec" | "lg";
  items: (CaseItem | LeadItem)[];
  title: string;
  tagline: string;
  description: string;
  caseDetailBaseUrl?: string;
  step?: number;
}

export default function CaseGrid({
  type,
  items,
  title,
  tagline,
  description,
  caseDetailBaseUrl = "/case",
  step = 8,
}: CaseGridProps) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(step);

  const mediaFolder = type === "ec" ? "cs2" : "lg";

  // Extract unique niches
  const niches = useMemo(() => {
    return Array.from(new Set(items.map((c) => c.nic)));
  }, [items]);

  const filterOptions = useMemo(() => {
    return [
      { id: "all", label: "All", count: items.length },
      { id: "video", label: "Video proofs", count: items.filter((c) => c.type === "video").length },
      { id: "image", label: "Breakdowns", count: items.filter((c) => c.type === "image").length },
      ...niches.map((nic) => ({
        id: nic,
        label: nic,
        count: items.filter((c) => c.nic === nic).length,
      })),
    ];
  }, [items, niches]);

  // Filter list
  const filteredCases = useMemo(() => {
    const q = query.toLowerCase().trim();
    return items.filter((c) => {
      const matchFilter = filter === "all" || c.type === filter || c.nic === filter;
      if (!matchFilter) return false;
      if (!q) return true;
      const haystack = `${c.t} ${c.nic} ${c.rev} ${c.ro} ${c.cap}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [items, filter, query]);

  const displayedCases = useMemo(() => {
    return filteredCases.slice(0, visibleCount);
  }, [filteredCases, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(filteredCases.length, prev + step));
  };

  return (
    <div className="box wh" id="top">
      <header className="cshero">
        <Link
          className="kback"
          href="/case-studies"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13,
            fontWeight: 600,
            color: "var(--body)",
            padding: "8px 14px",
            borderRadius: 999,
            border: "1px solid var(--line2)",
          }}
        >
          &larr; All case studies
        </Link>
        <span className="cstag">{tagline} &middot; {items.length} case studies</span>
        <h1 className="h1 d">
          {title} <span className="it">case studies</span>
        </h1>
        <p className="lead">{description}</p>
      </header>

      {/* Filter and Search Bar */}
      <div className="cfil">
        <div className="cchips">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={filter === opt.id ? "on" : ""}
              onClick={() => {
                setFilter(opt.id);
                setVisibleCount(step);
              }}
            >
              {opt.label}
              <b>{opt.count}</b>
            </button>
          ))}
        </div>

        <label className="csrch">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            type="search"
            placeholder="Search revenue, niche, keyword"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisibleCount(step);
            }}
          />
        </label>
      </div>

      {/* Grid of Case Cards */}
      <div className="cgrid2" id="cgrid">
        {displayedCases.map((c, k) => (
          <Link
            key={c.id}
            className="ck show"
            href={`${caseDetailBaseUrl}?set=${type}&id=${c.id}`}
            style={{
              "--dl": `${(k % 2) * 0.08 + Math.floor(k / 2) * 0.06}s`,
            } as React.CSSProperties}
          >
            <span className="im">
              <img
                src={`/img/${mediaFolder}/${c.id}.webp`}
                alt=""
                aria-hidden="true"
                loading="lazy"
              />
              <img
                className="mn"
                src={`/img/${mediaFolder}/${c.id}.webp`}
                alt={`${c.nic} case study`}
                loading="lazy"
              />
              {c.type === "video" && (
                <em className="vb">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Video
                </em>
              )}
            </span>
            <span className="tx">
              <span className="tg">{c.nic}</span>
              <h3>{c.t}</h3>
              {c.ro && (
                <span className="ro">
                  {c.ro} {c.rol}
                </span>
              )}
              <span className="fig">
                <b>{c.rev}</b>
                <span>{c.revl}</span>
              </span>
            </span>
          </Link>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <p className="cnone">No case studies match that search.</p>
      )}

      {/* Load More Pagination */}
      {filteredCases.length > 0 && (
        <div className="cmore">
          {visibleCount < filteredCases.length && (
            <button
              type="button"
              className="btn lm2"
              onClick={handleLoadMore}
            >
              Load more <i>&#8599;</i>
            </button>
          )}
          <span className="mono">
            Showing {Math.min(visibleCount, filteredCases.length)} of {filteredCases.length}
          </span>
        </div>
      )}
    </div>
  );
}
