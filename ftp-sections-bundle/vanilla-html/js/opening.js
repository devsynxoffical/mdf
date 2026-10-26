/**
 * Funnels That Print - Opening Section JavaScript
 * Handles:
 * 1. Intro Loader with cycling words & percentage counter
 * 2. Pixel Dissolve Grid matrix transition
 * 3. Typewriter rotation with auto-measured minWidth
 * 4. Word-by-word lead text reveal
 * 5. Mouse parallax on floating cards
 */

(function () {
  const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. Loader & Pixel Dissolve Transition
  const loader = document.getElementById("loader");
  const pix = document.getElementById("pix");
  const lw = document.getElementById("lw");
  const ln = document.getElementById("ln");
  const lb = document.getElementById("lb");

  const LOADER_WORDS = [
    "Funnels",
    "AI",
    "Automations",
    "SMS",
    "Emails",
    "Workflows",
    "Landing Pages",
    "GHL",
    "ClickFunnels",
  ];

  if (loader && !RM) {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i >= LOADER_WORDS.length) {
        clearInterval(interval);
        if (ln) ln.textContent = "100%";
        if (lb) lb.style.width = "100%";

        setTimeout(() => {
          if (!pix || !loader) {
            if (loader) loader.style.display = "none";
            return;
          }

          const c = window.innerWidth < 700 ? 8 : 16;
          const rws = Math.max(
            4,
            Math.round((c * window.innerHeight) / window.innerWidth)
          );
          pix.style.setProperty("--c", String(c));
          pix.style.setProperty("--rws", String(rws));

          const tints = [
            "#ff5a1f",
            "#ff7a45",
            "#ff9a6e",
            "#ffb08a",
            "#ff5a1f",
            "#ff6b35",
          ];

          let tiles = "";
          for (let r = 0; r < rws; r++) {
            for (let k = 0; k < c; k++) {
              const d = (r / rws) * 0.55 + Math.random() * 0.6;
              const bg = tints[Math.floor(Math.random() * tints.length)];
              tiles += `<i style="--d:${d.toFixed(2)}s;background:${bg}"></i>`;
            }
          }

          pix.innerHTML = tiles;
          pix.hidden = false;
          loader.style.opacity = "0";
          loader.style.transition = "opacity .25s";

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              pix.classList.add("go");
            });
          });

          setTimeout(() => {
            loader.style.display = "none";
            pix.hidden = true;
          }, 1700);
        }, 250);
        return;
      }

      if (lw) lw.textContent = LOADER_WORDS[i];
      const pct = Math.round((i / (LOADER_WORDS.length - 1)) * 100);
      if (ln) ln.textContent = pct + "%";
      if (lb) lb.style.width = pct + "%";
    }, 260);
  } else if (loader) {
    loader.style.display = "none";
  }

  // 2. Word-by-word reveal for lead text
  const leadEl = document.getElementById("hlead");
  if (leadEl) {
    const text = leadEl.textContent || "";
    leadEl.innerHTML = text
      .split(/\s+/)
      .map((w, idx) => `<span style="--i:${idx}">${w}</span>`)
      .join(" ");
  }

  // 3. Typewriter rotation for headline
  const typeEl = document.getElementById("type");
  const HERO_WORDS = [
    "booked calls.",
    "qualified leads.",
    "applications.",
    "customers.",
  ];

  if (typeEl && !RM) {
    let wi = 0;
    let ci = HERO_WORDS[0].length;
    let del = true;
    let timeoutId;

    const fit = () => {
      if (!typeEl) return;
      const cur = typeEl.textContent;
      typeEl.style.minWidth = "0";
      let m = 0;
      HERO_WORDS.forEach((w) => {
        typeEl.textContent = w;
        m = Math.max(m, typeEl.getBoundingClientRect().width);
      });
      typeEl.textContent = cur;
      if (window.innerWidth <= 600) {
        typeEl.style.minWidth = "0px";
      } else {
        typeEl.style.minWidth = Math.ceil(m) + "px";
      }
    };

    fit();
    window.addEventListener("resize", fit);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fit);
    }

    function step() {
      if (!typeEl) return;
      const w = HERO_WORDS[wi];
      if (del) {
        ci--;
        typeEl.textContent = w.slice(0, ci) || "\u200b";
        if (ci === 0) {
          del = false;
          wi = (wi + 1) % HERO_WORDS.length;
          timeoutId = setTimeout(step, 300);
          return;
        }
        timeoutId = setTimeout(step, 45);
      } else {
        ci++;
        typeEl.textContent = HERO_WORDS[wi].slice(0, ci);
        if (ci === HERO_WORDS[wi].length) {
          del = true;
          timeoutId = setTimeout(step, 2200);
          return;
        }
        timeoutId = setTimeout(step, 70);
      }
    }

    timeoutId = setTimeout(step, 3800);
  }

  // 4. Mouse parallax tracking for stage cards (desktop only)
  const hero = document.querySelector(".hero");
  const uis = document.querySelectorAll("#stage .ui");
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (hero && uis.length && !RM && !isTouch) {
    let mx = 0,
      my = 0,
      ticking = false;

    hero.addEventListener("mousemove", (e) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          uis.forEach((u) => {
            const m = parseFloat(u.dataset.m || "10");
            u.style.transform = `translate3d(${mx * m}px, ${my * m * 0.6}px, 0)`;
          });
          ticking = false;
        });
      }
    });
  }
})();
