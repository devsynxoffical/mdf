"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { SITE } from "@/lib/site";

interface FAQItem {
  q: string;
  a: string;
  cat: "build" | "auto" | "work";
  tags: string[];
}

const FAQS_DATA: FAQItem[] = [
  {
    q: "Who is this actually for?",
    a: "High-ticket service providers already generating revenue who need a predictable system instead of referrals.",
    cat: "work",
    tags: ["High-ticket", "Service businesses"],
  },
  {
    q: "What does Million Dollar Funnel™ build?",
    a: "Conversion-focused funnels and the systems around them: landing pages, high-ticket and application funnels, VSLs, low-ticket and bridge funnels, automations, CRM workflows and AI calling.",
    cat: "build",
    tags: ["Funnels", "Pages", "Automation"],
  },
  {
    q: "What's included in the build?",
    a: "Landing architecture, A2P, AI automations, SMS and email, voicemail drops, and CRM — built and managed by us.",
    cat: "build",
    tags: ["Landing pages", "A2P", "CRM"],
  },
  {
    q: "Do you handle the technical side?",
    a: "All of it. You review the work; you never touch the tooling.",
    cat: "build",
    tags: ["Done for you"],
  },
  {
    q: "Will you work on my existing platform?",
    a: "Usually. We keep what converts and rebuild what leaks.",
    cat: "build",
    tags: ["Audit", "Rebuild", "Integrations"],
  },
  {
    q: "Do you build low-ticket funnels?",
    a: "Yes. We build the complete customer journey, including sales pages, checkout, order bumps, upsells, downsells and follow-up sequences.",
    cat: "build",
    tags: ["Checkout", "Upsell", "Follow-up"],
  },
  {
    q: "What does the AI Calling Agent do?",
    a: "It engages new leads automatically, asks qualifying questions, answers common questions and helps move suitable prospects toward a booked appointment.",
    cat: "auto",
    tags: ["AI calling", "Qualification"],
  },
  {
    q: "Can you set up my automations?",
    a: "Yes. We build workflows for lead nurturing, email, SMS, appointment reminders, no-shows, reactivation and CRM pipeline movement.",
    cat: "auto",
    tags: ["Email", "SMS", "CRM"],
  },
  {
    q: "Do you integrate with CRMs?",
    a: "Yes. We connect the funnel with your CRM, calendar, communication tools and tracking so every lead is accounted for.",
    cat: "auto",
    tags: ["CRM", "Calendar", "Tracking"],
  },
  {
    q: "Can you run the ads as well as the funnel?",
    a: "Yes, and we prefer it — both sides get built for each other.",
    cat: "work",
    tags: ["Meta Ads", "Google Ads"],
  },
  {
    q: "How fast does it go live?",
    a: "Live on real traffic in three to four weeks.",
    cat: "work",
    tags: ["3 to 4 weeks"],
  },
];

const countCat = (cat: FAQItem["cat"]) => FAQS_DATA.filter((f) => f.cat === cat).length;

/**
 * ( 07 ) FAQ — chat-style layout ported from Funnels That Print, re-themed for MDF.
 * Styles live in app/ftp-sections.css, scoped under `.mdf-ftp`.
 */
export default function MDFFaqSection() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [customQuestion, setCustomQuestion] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [displayedAnswer, setDisplayedAnswer] = useState<string>(FAQS_DATA[0].a);
  const [userSubmittedQ, setUserSubmittedQ] = useState<string | null>(null);

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const listRef = useRef<HTMLOListElement>(null);

  // Filtered indices based on tab and search
  const visibleIndices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return FAQS_DATA.map((item, idx) => ({ ...item, idx })).filter(
      (item) =>
        (activeTab === "all" || item.cat === activeTab) &&
        (!q || item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q))
    ).map((item) => item.idx);
  }, [activeTab, searchQuery]);

  // When selected question changes, animate the response typing
  useEffect(() => {
    if (userSubmittedQ) {
      setUserSubmittedQ(null);
    }

    const currentFaq = FAQS_DATA[selectedIdx];
    if (!currentFaq) return;

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    setIsTyping(true);
    setDisplayedAnswer("");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsTyping(false);
      setDisplayedAnswer(currentFaq.a);
      return;
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      const words = currentFaq.a.split(" ");
      let k = 0;
      function typeWord() {
        if (k <= words.length) {
          setDisplayedAnswer(words.slice(0, k).join(" "));
          k++;
          typingTimeoutRef.current = setTimeout(typeWord, 18);
        }
      }
      typeWord();
    }, 450);

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [selectedIdx]);

  const handleSelect = (idx: number, scrollIntoList = false) => {
    setSelectedIdx(idx);
    if (scrollIntoList && listRef.current) {
      const btn = listRef.current.querySelector<HTMLElement>(`[data-i="${idx}"]`);
      if (btn) {
        listRef.current.scrollTo({
          top: btn.offsetTop - listRef.current.offsetTop - 60,
          behavior: "smooth",
        });
      }
    }
  };

  const handleStep = (direction: 1 | -1) => {
    if (!visibleIndices.length) return;
    const currentPos = visibleIndices.indexOf(selectedIdx);
    const nextPos =
      currentPos === -1
        ? 0
        : (currentPos + direction + visibleIndices.length) % visibleIndices.length;
    handleSelect(visibleIndices[nextPos], true);
  };

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = customQuestion.trim();
    if (!q) return;

    setUserSubmittedQ(q);
    setCustomQuestion("");

    setTimeout(() => {
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
        "Question from the website"
      )}&body=${encodeURIComponent(q)}`;
    }, 1200);
  };

  const currentFaq = FAQS_DATA[selectedIdx];

  // Related questions in same category
  const relatedIndices = useMemo(() => {
    if (!currentFaq) return [];
    return FAQS_DATA.map((item, idx) => idx)
      .filter((idx) => idx !== selectedIdx && FAQS_DATA[idx].cat === currentFaq.cat)
      .slice(0, 2);
  }, [selectedIdx, currentFaq]);

  return (
    <div className="mdf-ftp">
    <section className="sec box" id="faq">
      <div className="fx-head">
        <div>
          <div className="eyebrow mono">( 07 ) — The Questions</div>
          <h2 className="h2 d">
            Questions, <span className="it">answered.</span>
          </h2>
          <p className="lead">
            Pick a question and get a straight answer, the same way we would
            answer on a call.
          </p>
        </div>
        <div className="fx-stats">
          <div>
            <b>3-4 wks</b>
            <span>to go live</span>
          </div>
          <div>
            <b>&lt;24h</b>
            <span>reply time</span>
          </div>
          <div>
            <b>200+</b>
            <span>live case studies</span>
          </div>
        </div>
      </div>

      <div className="fx" id="fx">
        <aside className="fx-l">
          <label className="fx-search">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              id="fxs"
              type="search"
              placeholder="Search questions"
              aria-label="Search questions"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>

          <div className="fx-tabs" id="fxt">
            <button
              type="button"
              className={activeTab === "all" ? "on" : ""}
              onClick={() => setActiveTab("all")}
            >
              All <b>{FAQS_DATA.length}</b>
            </button>
            <button
              type="button"
              className={activeTab === "build" ? "on" : ""}
              onClick={() => setActiveTab("build")}
            >
              Builds <b>{countCat("build")}</b>
            </button>
            <button
              type="button"
              className={activeTab === "auto" ? "on" : ""}
              onClick={() => setActiveTab("auto")}
            >
              Automation <b>{countCat("auto")}</b>
            </button>
            <button
              type="button"
              className={activeTab === "work" ? "on" : ""}
              onClick={() => setActiveTab("work")}
            >
              Working together <b>{countCat("work")}</b>
            </button>
          </div>

          <ol className="fx-list" id="fxl" ref={listRef}>
            {FAQS_DATA.map((item, idx) => {
              const isVisible = visibleIndices.includes(idx);
              const isSelected = selectedIdx === idx;
              return (
                <li key={item.q} className={isVisible ? "" : "hide"}>
                  <button
                    type="button"
                    data-i={idx}
                    className={isSelected ? "on" : ""}
                    onClick={() => handleSelect(idx)}
                  >
                    <span className="n">{String(idx + 1).padStart(2, "0")}</span>
                    <span>{item.q}</span>
                    <i>&rarr;</i>
                  </button>
                </li>
              );
            })}
          </ol>

          {visibleIndices.length === 0 && (
            <div className="fx-empty on" id="fxe">
              No match. Ask it below and we will answer.
            </div>
          )}
        </aside>

        <div className="fx-r">
          <div className="fx-top">
            <span className="fx-av">MDF</span>
            <div>
              <b>Million Dollar Funnel™</b>
              <small>Usually replies within a day</small>
            </div>
            <span className="fx-ct" id="fxc">
              <em>{String(selectedIdx + 1).padStart(2, "0")}</em> /{" "}
              {FAQS_DATA.length}
            </span>
            <div className="fx-nav">
              <button
                type="button"
                id="fxp"
                aria-label="Previous question"
                onClick={() => handleStep(-1)}
              >
                &larr;
              </button>
              <button
                type="button"
                id="fxn"
                aria-label="Next question"
                onClick={() => handleStep(1)}
              >
                &rarr;
              </button>
            </div>
          </div>

          <div className="fx-chat" id="fxchat" aria-live="polite">
            {userSubmittedQ ? (
              <>
                <div className="fx-m u">{userSubmittedQ}</div>
                <div className="fx-m b">
                  <span className="who">MDF Team</span>
                  Good question. Opening your email app so it reaches us
                  directly, we reply within a day.
                </div>
              </>
            ) : (
              <>
                <div className="fx-m u">{currentFaq?.q}</div>
                <div className="fx-m b">
                  <span className="who">MDF Team</span>
                  {isTyping ? (
                    <span className="fx-dots">
                      <i />
                      <i />
                      <i />
                    </span>
                  ) : (
                    <span>{displayedAnswer}</span>
                  )}
                  {!isTyping && currentFaq?.tags && (
                    <div className="tg on">
                      {currentFaq.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="fx-rel" id="fxr">
            {!userSubmittedQ &&
              relatedIndices.map((relIdx, n) => (
                <button
                  key={relIdx}
                  type="button"
                  data-i={relIdx}
                  style={{ animationDelay: `${n * 0.08}s` }}
                  onClick={() => handleSelect(relIdx, true)}
                >
                  {FAQS_DATA[relIdx].q}
                </button>
              ))}
          </div>

          <form className="fx-ask" id="fxa" onSubmit={handleAskSubmit}>
            <input
              id="fxq"
              placeholder="Ask your own question..."
              aria-label="Ask your own question"
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
            />
            <button type="submit">
              <span>Send</span> &#8599;
            </button>
          </form>
        </div>
      </div>
    </section>
    </div>
  );
}
