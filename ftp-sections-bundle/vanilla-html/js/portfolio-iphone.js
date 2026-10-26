/**
 * Funnels That Print - Funnels Portfolio iPhone Duo Layout JavaScript
 * Handles:
 * 1. Dual-screen 3D iPhone fold/unfold animation driven by scroll or interaction
 * 2. Live digital clock updater
 * 3. Interactive "Slide to Talk" widget with pointer/touch dragging support
 * 4. Active call state with live call duration timer & audio wave
 * 5. In-phone consultation form submission with validation
 * 6. Funnel selector controls with live switching of dual screenshots
 */

(function () {
  const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Funnels List Data
  const FUN = [
    ["Mortgage AI System", "Webinar funnel, mortgage leads", 8],
    ["Rowan Security", "Executive protection, high-ticket application", 7],
    ["Inventiv", "Invention showcase, lead funnel", 6],
    ["Pluto CRM", "Insurance CRM, free trial funnel", 5],
    ["Bio-Optimization Made Easy", "Long-form VSL sales letter", 4],
    ["Growth Foundry", "Local SEO audit, lead funnel", 2],
  ];

  let FI = 0;
  const fimg = document.getElementById("fimg");
  const fimg2 = document.getElementById("fimg2");
  const fnum = document.getElementById("fnum");
  const fname = document.getElementById("fname");
  const fsel = document.getElementById("fsel");
  const fprev = document.getElementById("fprev");
  const fnext = document.getElementById("fnext");

  // Render funnel selector tabs
  if (fsel) {
    fsel.innerHTML = FUN.map(
      (f, i) =>
        `<button type="button" role="tab" data-n="0${i + 1}" data-i="${i}" class="${
          i === 0 ? "on" : ""
        }" aria-selected="${i === 0}"><span class="th"><img src="img/funnels/f${
          f[2]
        }-t.webp" alt="" loading="lazy"></span><b>${f[0]}</b><span>${
          f[1]
        }</span></button>`
    ).join("");
  }

  function setFun(i) {
    FI = (i + FUN.length) % FUN.length;
    const src = `img/funnels/f${FUN[FI][2]}.webp`;
    if (fimg) {
      fimg.src = src;
      fimg.alt = FUN[FI][0] + " funnel";
    }
    if (fimg2) {
      fimg2.src = src;
      fimg2.alt = "";
    }
    if (fnum) fnum.textContent = `0${FI + 1} / 0${FUN.length}`;
    if (fname) fname.textContent = FUN[FI][0];

    const buttons = document.querySelectorAll("#fsel button");
    buttons.forEach((b, k) => {
      const isOn = k === FI;
      b.classList.toggle("on", isOn);
      b.setAttribute("aria-selected", String(isOn));
    });
  }

  function goOpen() {
    const pw = document.getElementById("portwrap");
    if (!pw) return;
    const top = Math.round(
      pw.getBoundingClientRect().top +
        window.scrollY +
        0.17 * (pw.offsetHeight - window.innerHeight)
    );
    const from = window.scrollY;
    const inside =
      from > top && from < top + pw.offsetHeight - window.innerHeight;

    const globalLenis = window.lenis;
    if (globalLenis) {
      globalLenis.scrollTo(top, {
        duration: inside ? 1.1 : 1.4,
        force: true,
        lock: true,
      });
      return;
    }

    const t0 = performance.now();
    const D = inside ? 1000 : 1300;
    (function st(t) {
      const k = Math.min(1, (t - t0) / D);
      const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      window.scrollTo(0, from + (top - from) * e);
      if (k < 1) requestAnimationFrame(st);
    })(t0);
  }

  if (fsel) {
    fsel.querySelectorAll("button").forEach((b) =>
      b.addEventListener("click", () => {
        setFun(parseInt(b.dataset.i || "0", 10));
        goOpen();
      })
    );
  }

  if (fprev) {
    fprev.addEventListener("click", () => {
      setFun(FI - 1);
      goOpen();
    });
  }
  if (fnext) {
    fnext.addEventListener("click", () => {
      setFun(FI + 1);
      goOpen();
    });
  }

  // Live Digital Clock
  const clockEl = document.getElementById("clock");
  function updateClock() {
    if (!clockEl) return;
    const d = new Date();
    clockEl.textContent =
      String(d.getHours()).padStart(2, "0") +
      ":" +
      String(d.getMinutes()).padStart(2, "0");
  }
  updateClock();
  setInterval(updateClock, 20000);

  // Call Interaction Logic
  let isTalking = false;
  let callTimerInterval = null;
  let callTimerStart = 0;
  const cover = document.getElementById("cover");
  const slide = document.getElementById("slide");
  const sk = document.getElementById("sk");
  const pcall = document.getElementById("pcall");
  const ctime = document.getElementById("ctime");
  const cend = document.getElementById("cend");
  const pform = document.getElementById("pform");
  const pdone = document.getElementById("pdone");
  const perr = document.getElementById("perr");
  const pagain = document.getElementById("pagain");

  function openCall() {
    isTalking = true;
    if (cover) cover.classList.add("talk");
    if (pcall) {
      pcall.setAttribute("aria-hidden", "false");
      pcall.style.visibility = "visible";
      pcall.style.transform = "translateY(0%)";
    }

    callTimerStart = Date.now();
    if (ctime) ctime.textContent = "00:00";
    if (callTimerInterval) clearInterval(callTimerInterval);
    callTimerInterval = setInterval(() => {
      const s = Math.floor((Date.now() - callTimerStart) / 1000);
      const mins = String(Math.floor(s / 60)).padStart(2, "0");
      const secs = String(s % 60).padStart(2, "0");
      if (ctime) ctime.textContent = `${mins}:${secs}`;
    }, 1000);

    setTimeout(() => {
      const nameInp = pform ? pform.querySelector('input[name="name"]') : null;
      if (nameInp) nameInp.focus({ preventScroll: true });
    }, 400);
  }

  function hangUp() {
    isTalking = false;
    if (cover) cover.classList.remove("talk");
    if (pcall) {
      pcall.setAttribute("aria-hidden", "true");
      pcall.style.transform = "translateY(102%)";
      setTimeout(() => {
        pcall.style.visibility = "hidden";
      }, 380);
    }
    if (sk) sk.style.transform = "translateX(0)";
    if (slide) slide.setAttribute("aria-valuenow", "0");
    if (callTimerInterval) {
      clearInterval(callTimerInterval);
      callTimerInterval = null;
    }
    setTimeout(() => {
      if (pdone) pdone.hidden = true;
      if (pform) pform.hidden = false;
      if (perr) perr.textContent = "";
    }, 700);
  }

  if (cend) cend.addEventListener("click", hangUp);

  // Slide-to-talk widget with pointer capture
  if (slide && sk) {
    let dx = 0;
    let st = 0;
    let dr = false;
    let done = false;
    let moved = false;

    const max = () => slide.clientWidth - sk.offsetWidth - 12;

    const go = () => {
      if (done) return;
      done = true;
      dr = false;
      slide.classList.remove("drag");
      sk.style.transform = `translateX(${max()}px)`;
      openCall();
      setTimeout(() => {
        done = false;
        dx = 0;
      }, 900);
    };

    slide.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      dr = true;
      moved = false;
      st = e.clientX - dx;
      try {
        slide.setPointerCapture(e.pointerId);
      } catch (_) {}
      slide.classList.add("drag");
    });

    slide.addEventListener("pointermove", (e) => {
      if (!dr) return;
      dx = Math.max(0, Math.min(max(), e.clientX - st));
      if (dx > 4) moved = true;
      sk.style.transform = `translateX(${dx}px)`;
      slide.setAttribute("aria-valuenow", String(Math.round((dx / max()) * 100)));
      if (dx > max() * 0.6) go();
    });

    const onEnd = () => {
      if (!dr) return;
      dr = false;
      slide.classList.remove("drag");
      if (!moved || dx > max() * 0.35) {
        go();
      } else {
        dx = 0;
        sk.style.transform = "translateX(0)";
      }
    };

    slide.addEventListener("pointerup", onEnd);
    slide.addEventListener("pointercancel", onEnd);
    slide.addEventListener("lostpointercapture", onEnd);

    slide.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") {
        e.preventDefault();
        go();
      }
    });
  }

  // In-Phone Contact Form submission
  if (pform) {
    pform.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      const name = (formData.get("name") || "").trim();
      const email = (formData.get("email") || "").trim();
      const site = (formData.get("site") || "").trim();
      const spend = formData.get("spend") || "";
      const msg = (formData.get("msg") || "").trim();

      const nameInput = form.querySelector('input[name="name"]');
      const emailInput = form.querySelector('input[name="email"]');
      nameInput?.classList.remove("bad");
      emailInput?.classList.remove("bad");

      let bad = "";
      if (!name) {
        nameInput?.classList.add("bad");
        bad = "Please add your name.";
      }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        emailInput?.classList.add("bad");
        bad = bad || "Please add a valid email.";
      }

      if (perr) perr.textContent = bad;
      if (bad) return;

      const checkedNeeds = Array.from(
        form.querySelectorAll('input[name="need"]:checked')
      ).map((el) => el.value);

      const body = `Name: ${name}\nEmail: ${email}\nWebsite: ${site}\nMonthly ad spend: ${spend}\nNeeds: ${checkedNeeds.join(
        ", "
      )}\n\n${msg}`;

      window.location.href = `mailto:info@funnelsthatprint.com?subject=${encodeURIComponent(
        "New funnel enquiry from " + name
      )}&body=${encodeURIComponent(body)}`;

      pform.hidden = true;
      if (pdone) pdone.hidden = false;
    });
  }

  if (pagain) {
    pagain.addEventListener("click", () => {
      if (pdone) pdone.hidden = true;
      if (pform) pform.hidden = false;
    });
  }

  // 3D Perspective Scroll Unfold Animation
  const ptw = document.getElementById("portwrap");
  const dev = document.getElementById("dev");
  const pl = document.getElementById("pl");
  const fsh = document.getElementById("fsh");
  const gl = document.getElementById("gl");
  const gr = document.getElementById("gr");
  const ptop = document.querySelector(".port .top");
  const sites = [document.getElementById("site"), document.getElementById("site2")].filter(
    Boolean
  );
  const scr = document.querySelector("#pl .scr");

  if (!ptw || !dev || !cover || !pl || RM) return;

  const cl = (v) => Math.max(0, Math.min(1, v));
  let tick = false;
  let lastE = -1;
  let lastYY = -1;

  function onScroll() {
    if (!tick) {
      tick = true;
      requestAnimationFrame(updateFold);
    }
  }

  function updateFold() {
    tick = false;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const rt = ptw.getBoundingClientRect();

    if (rt.top < vh && rt.bottom > 0) {
      const p = cl(-rt.top / (ptw.offsetHeight - vh));
      const op = cl((p - 0.03) / 0.12);
      const cs = cl((p - 0.86) / 0.11);
      const o2 = op * (1 - cs);
      const e = o2 * o2 * (3 - 2 * o2);

      cover.classList.toggle("end", p > 0.5);
      const P = cover.offsetWidth;
      const mob = vw <= 980;

      if (e !== lastE) {
        lastE = e;
        if (!mob) dev.style.transform = `translate3d(${(-P / 2 * (1 - e)).toFixed(1)}px, 0, 0)`;
        cover.style.transform = `rotateY(${(-180 * e).toFixed(2)}deg)`;
        cover.style.visibility = e >= 0.5 ? "hidden" : "visible";
        cover.style.setProperty("--sh", Math.min(1, e * 1.8).toFixed(2));
        pl.style.transform = `rotateY(${(180 - 180 * e).toFixed(2)}deg)`;
        pl.style.visibility = e <= 0.5 ? "hidden" : "visible";
        dev.classList.toggle("half", e > 0.5);
        if (ptop) ptop.style.opacity = Math.max(0, 1 - e * 1.6).toFixed(3);
        if (!mob && fsh) fsh.style.transform = `translateX(-50%) scaleX(${(0.5 + 0.5 * e).toFixed(3)})`;
        dev.classList.toggle("open", e > 0.92);

        const spread = e * vw * 0.42;
        if (gl) {
          gl.style.transform = `translate3d(${-spread}px, 0, 0)`;
          gl.style.opacity = String(1 - e * 0.85);
        }
        if (gr) {
          gr.style.transform = `translate3d(${spread}px, 0, 0)`;
          gr.style.opacity = String(1 - e * 0.85);
        }
      }

      if (sites.length && scr) {
        const siteMax = Math.max(0, sites[0].scrollHeight - scr.clientHeight);
        const sc = cl((p - 0.17) / 0.66);
        const yy = Math.round(sc * siteMax);
        if (yy !== lastYY) {
          lastYY = yy;
          sites.forEach((x) => {
            x.style.transform = `translate3d(0, ${-yy}px, 0)`;
          });
        }
      }
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => {
    lastE = -1;
    lastYY = -1;
    onScroll();
  });
  updateFold();
})();
