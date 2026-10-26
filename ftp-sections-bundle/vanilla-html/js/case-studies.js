/**
 * Funnels That Print - Case Studies JavaScript
 * Handles:
 * 1. Filter chips & dynamic category counting
 * 2. Instant search filtering across title, niche, revenue, metrics, captions
 * 3. Responsive card generation for Ecom & Lead Gen
 * 4. Staggered reveal animations & Load More pagination
 * 5. Full screenshot modal / lightbox with keyboard navigation
 */

(function () {
  window.initCaseStudies = function (options) {
    const {
      set = "ec", // 'ec' or 'lg'
      data = set === "ec" ? window.CASES || [] : window.LEADS || [],
      gridSelector = "#cgrid",
      chipsSelector = "#cchips",
      searchSelector = "#cq",
      loadMoreSelector = "#lmore",
      countSelector = "#lcount",
      noneSelector = "#cnone",
      detailUrl = "case-detail.html",
      step = 8,
    } = options || {};

    const cg = document.querySelector(gridSelector);
    if (!cg) return;

    const chipsEl = document.querySelector(chipsSelector);
    const searchInp = document.querySelector(searchSelector);
    const lmoreBtn = document.querySelector(loadMoreSelector);
    const lcountEl = document.querySelector(countSelector);
    const noneEl = document.querySelector(noneSelector);

    const mediaFolder = set === "ec" ? "cs2" : "lg";
    let list = data;
    let shown = 0;
    let currentFilter = "all";
    let currentQuery = "";

    // Extract niches
    const niches = Array.from(new Set(data.map((c) => c.nic)));
    const filterLabels = { all: "All", video: "Video proofs", image: "Breakdowns" };
    const filterKeys = ["all", "video", "image", ...niches];

    // Render chips
    if (chipsEl) {
      chipsEl.innerHTML = filterKeys
        .map((k, idx) => {
          const count =
            k === "all"
              ? data.length
              : data.filter((c) => c.type === k || c.nic === k).length;
          const label = filterLabels[k] || k;
          return `<button type="button" data-f="${k}" class="${
            idx === 0 ? "on" : ""
          }">${label}<b>${count}</b></button>`;
        })
        .join("");

      chipsEl.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", () => {
          chipsEl.querySelectorAll("button").forEach((b) => b.classList.remove("on"));
          btn.classList.add("on");
          currentFilter = btn.dataset.f || "all";
          applyFilter();
        });
      });
    }

    // HTML escape utility
    const esc = (t) =>
      String(t || "").replace(
        /[&<>"]/g,
        (m) =>
          ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
          }[m])
      );

    function cardHtml(c, k) {
      const isVideo = c.type === "video";
      const delay = (k % 2) * 0.08 + Math.floor(k / 2) * 0.06;
      return `
        <a class="ck" href="${detailUrl}?set=${set}&id=${c.id}" style="--dl:${delay.toFixed(
        2
      )}s">
          <span class="im">
            <img src="img/${mediaFolder}/${c.id}.webp" alt="" aria-hidden="true" loading="lazy">
            <img class="mn" src="img/${mediaFolder}/${c.id}.webp" alt="${esc(
        c.nic
      )} case study" loading="lazy">
            ${
              isVideo
                ? `<em class="vb"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>Video</em>`
                : ""
            }
          </span>
          <span class="tx">
            <span class="tg">${esc(c.nic)}</span>
            <h3>${esc(c.t)}</h3>
            ${c.ro ? `<span class="ro">${esc(c.ro)} ${esc(c.rol || "")}</span>` : ""}
            <span class="fig">
              <b>${esc(c.rev)}</b>
              <span>${esc(c.revl)}</span>
            </span>
          </span>
        </a>
      `;
    }

    function applyFilter() {
      const q = currentQuery.toLowerCase().trim();
      list = data.filter((c) => {
        const matchCategory =
          currentFilter === "all" ||
          c.type === currentFilter ||
          c.nic === currentFilter;
        if (!matchCategory) return false;
        if (!q) return true;
        const haystack = `${c.t} ${c.nic} ${c.rev} ${c.ro} ${c.cap}`.toLowerCase();
        return haystack.includes(q);
      });

      cg.innerHTML = "";
      shown = 0;
      loadMore();
    }

    function loadMore() {
      const nextLimit = Math.min(list.length, shown + step);
      const chunk = list.slice(shown, nextLimit);
      cg.insertAdjacentHTML(
        "beforeend",
        chunk.map((c, idx) => cardHtml(c, shown + idx)).join("")
      );

      const addedElements = Array.from(cg.children).slice(shown);
      shown = nextLimit;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          addedElements.forEach((el) => el.classList.add("show"));
        });
      });

      if (lmoreBtn) lmoreBtn.hidden = shown >= list.length;
      if (lcountEl) lcountEl.textContent = `Showing ${shown} of ${list.length}`;
      if (noneEl) noneEl.hidden = list.length > 0;
    }

    if (searchInp) {
      searchInp.addEventListener("input", (e) => {
        currentQuery = e.target.value;
        applyFilter();
      });
    }

    if (lmoreBtn) {
      lmoreBtn.addEventListener("click", loadMore);
    }

    // Initial load
    applyFilter();
  };

  // Auto-init if standard page elements are detected
  document.addEventListener("DOMContentLoaded", () => {
    const cg = document.getElementById("cgrid");
    if (!cg) return;

    // Detect page type from body or data attribute
    const isLeadGen =
      document.body.dataset.set === "lg" ||
      window.location.pathname.includes("leadgen") ||
      document.title.toLowerCase().includes("lead gen");

    window.initCaseStudies({
      set: isLeadGen ? "lg" : "ec",
    });
  });
})();
