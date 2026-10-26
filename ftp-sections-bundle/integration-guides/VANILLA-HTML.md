# 🌐 Integrating into Any Static HTML / CSS / JS Website

This guide walks you through integrating the sections into any existing standard HTML/CSS/JS website, PHP site, or custom CMS.

---

## 1. Copy Assets & Styles

1. Copy the `assets/` folder into your website's root directory:
   ```text
   your-website/
   ├── assets/
   │   ├── img/
   │   └── vid/
   ├── css/
   │   └── ftp-styles.css    <-- Copy from vanilla-html/css/styles.css (or modular css files)
   └── js/
       ├── opening.js          <-- From vanilla-html/js/
       ├── portfolio-iphone.js <-- From vanilla-html/js/
       ├── cases.js            <-- From vanilla-html/js/
       ├── leads.js            <-- From vanilla-html/js/
       └── case-studies.js     <-- From vanilla-html/js/
   ```

2. In your `<head>`, link the Google Fonts and stylesheet:
   ```html
   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap">
   <link rel="stylesheet" href="css/ftp-styles.css">
   ```

---

## 2. Integrating the Opening Section (Loader + Hero)

1. Paste the HTML snippet from `vanilla-html/opening.html` right at the start of your `<body>`:
   ```html
   <!-- Loader & Pixel Dissolve -->
   <div id="pix" aria-hidden="true" hidden></div>
   <div id="loader" aria-hidden="true">
     <div class="wd" id="lw">Funnels</div>
     <div class="l">Funnels That Print &nbsp;/&nbsp; Loading</div>
     <div class="n" id="ln">0%</div>
     <div class="bar"><i id="lb"></i></div>
   </div>

   <!-- Hero Banner -->
   <header class="hero" id="top">
     <video class="hbg" autoplay muted loop playsinline aria-hidden="true">
       <source src="assets/img/hero/bg.webm" type="video/webm">
       <source src="assets/img/hero/bg.mp4" type="video/mp4">
     </video>
     <!-- ... rest of opening.html snippet ... -->
   </header>
   ```

2. Right before your closing `</body>` tag, load the opening script:
   ```html
   <script src="js/opening.js"></script>
   ```

---

## 3. Integrating the Funnels Portfolio iPhone Duo Layout

1. Paste the HTML snippet from `vanilla-html/portfolio-iphone.html` wherever you want the portfolio section to appear:
   ```html
   <div id="portwrap">
     <section class="port" id="work">
       <!-- Dual Screen Mockup, Slide to Talk, Tabs -->
       <!-- ... rest of portfolio-iphone.html snippet ... -->
     </section>
   </div>
   ```

2. Right before your closing `</body>` tag, load the portfolio script:
   ```html
   <script src="js/portfolio-iphone.js"></script>
   ```

3. **Customizing the In-Phone Form Submission**:
   In `portfolio-iphone.js`, find line 290:
   ```javascript
   window.location.href = `mailto:info@funnelsthatprint.com?subject=...`;
   ```
   You can change the email address, or replace it with a `fetch()` call to your API endpoint or CRM webhook (e.g. GoHighLevel, Zapier, Make):
   ```javascript
   await fetch('https://your-api.com/webhook', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ name, email, site, spend, needs: checkedNeeds, msg })
   });
   ```

---

## 4. Integrating the Case Studies Section

### Option A: The Case Studies Hub (Split Preview Cards)
Paste `vanilla-html/case-studies-hub.html` to direct visitors to your dedicated Lead Gen and eCommerce pages.

### Option B: The Live Interactive Grid
1. Add the container markup:
   ```html
   <main class="box" id="top">
     <header class="cshero">
       <span class="cstag">QualifiedLeadsX™ &middot; 125 case studies</span>
       <h1 class="h1 d">Lead gen <span class="it">case studies</span></h1>
     </header>

     <div class="cfil">
       <div class="cchips" id="cchips"></div>
       <label class="csrch">
         <input id="cq" type="search" placeholder="Search revenue, niche, keyword">
       </label>
     </div>

     <div class="cgrid2" id="cgrid"></div>
     <p class="cnone" id="cnone" hidden>No case studies match that search.</p>

     <div class="cmore">
       <button type="button" class="btn lm2" id="lmore">Load more <i>&#8599;</i></button>
       <span class="mono" id="lcount"></span>
     </div>
   </main>
   ```

2. Load the scripts:
   ```html
   <!-- For eCommerce -->
   <script src="js/cases.js"></script>
   <script src="js/case-studies.js"></script>
   <script>
     window.initCaseStudies({
       set: 'ec',
       detailUrl: 'case-detail.html'
     });
   </script>

   <!-- OR For Lead Generation -->
   <script src="js/leads.js"></script>
   <script src="js/case-studies.js"></script>
   <script>
     window.initCaseStudies({
       set: 'lg',
       detailUrl: 'case-detail.html'
     });
   </script>
   ```

---

## 5. Asset Path Verification
If your assets are in a subfolder (e.g., `/static/assets/` or `/wp-content/uploads/assets/`), simply update the path references in:
1. `vanilla-html/opening.html`
2. `vanilla-html/portfolio-iphone.html`
3. `vanilla-html/js/portfolio-iphone.js` (`FUN` array paths)
4. `vanilla-html/js/case-studies.js` (`mediaFolder` path)
