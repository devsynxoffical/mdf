# 🌊 Integrating into Webflow

Webflow allows direct embedding of custom HTML, CSS, and JavaScript. You can integrate any of the three sections into a Webflow project in minutes.

---

## 1. Upload Media Assets to Webflow

1. Open your Webflow Project Designer.
2. Go to the **Assets** panel.
3. Upload the images from `assets/img/funnels/`, `assets/img/hero/`, `assets/img/team/`, `assets/img/tools/`, etc.
4. If you host video backgrounds (`bg.mp4`, `agent.mp4`), you can either:
   - Upload them to Webflow's Video background element or asset manager, or
   - Host them on AWS S3 / Cloudflare R2 / Vimeo / Cloudinary and use the direct `.mp4` URLs.

---

## 2. Add Custom CSS (Site Settings or Page Settings)

In Webflow Project Settings → **Custom Code** → **Head Code** (or inside an HTML Embed on the page):
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap">
<style>
/* Paste contents of vanilla-html/css/styles.css here */
</style>
```

---

## 3. Embedding the Sections

### A. Opening Section
1. Add an **Embed** element at the very top of your page body.
2. Paste the contents of `vanilla-html/opening.html`.
3. In Webflow Page Settings → **Custom Code** → **Before `</body>` tag**, add:
   ```html
   <script>
   /* Paste contents of vanilla-html/js/opening.js */
   </script>
   ```

### B. Funnels Portfolio iPhone Duo Layout
1. Add a Section or Div block with class `port-wrapper` (or insert an **Embed** element).
2. Paste the contents of `vanilla-html/portfolio-iphone.html`.
3. Update the `img src` URLs to point to your Webflow CDN asset links for each funnel (`f1.webp` to `f8.webp`).
4. In Webflow Page Settings → **Custom Code** → **Before `</body>` tag**, add:
   ```html
   <script>
   /* Paste contents of vanilla-html/js/portfolio-iphone.js */
   </script>
   ```

### C. Case Studies Section
1. Insert an **Embed** element where you want the Case Studies Hub or Grid to appear.
2. Paste `vanilla-html/case-studies-hub.html`.
3. For full dynamic directories, you can host `cases.js` and `leads.js` on Webflow or GitHub Pages / CDN, and call `window.initCaseStudies()`.

---

## 4. Webflow Specific Tips
- Set `overflow: hidden` on the `#portwrap` parent section to avoid horizontal scrollbars on mobile.
- Make sure your Embed blocks have their width set to `100%`.
