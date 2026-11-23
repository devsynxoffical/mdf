# Technical SEO audit: milliondollarfunnels.us

**Date:** 23 Nov 2026. Read-only checks; nothing on the site was changed for this audit.

**Sources:**
- Live crawl of all 38 sitemap URLs plus the 2 noindexed teasers, fetched with a Googlebot user agent.
- Google Search Console API: URL Inspection for every sitemap URL, and Search Analytics for 24 Oct – 21 Nov 2026.
- Rendering in Chromium with the Googlebot-smartphone user agent.
- Lighthouse 12.2.1 in mobile mode.

## Summary

| # | Check | Result | Status |
|---|---|---|---|
| 1 | Google indexing | 24 indexed, 11 discovered-not-crawled, 1 crawled-not-indexed (/blog), 1 duplicate (/faq), 1 unknown | Needs time; 2 issues |
| 2 | Canonical tags | 38/38 self-referencing and correct; Google agrees on 37, but /faq is mapped to another site | 1 issue |
| 3 | Robots / noindex | robots.txt allows everything except /api/; no important page noindexed; no X-Robots-Tag on pages; only the 2 sister-site teasers are noindex (intended) | OK |
| 4 | Sitemap | 38 URLs, all 200, all canonical, all indexable, no redirects, teasers excluded | OK |
| 5 | Internal links | Every sitemap page linked in plain HTML `<a href>`; 25 pages linked from all 39 pages via nav/footer; 13 pages have only 6–12 inbound links | Improve |
| 6 | Rendering | Main content, H1 and links are in the raw HTML (static export); the rendered page matches; no JS errors; content visible | OK |
| 7 | Duplicate content | No near-duplicates. Highest overlap: the 2 case studies (0.33, shared template) and pressure-washing vs home-improvement (0.28) | OK, watch |
| 8 | Page quality | Commercial pages 800–1,250 words with first-party receipts, process, FAQ and structured data; hubs and legal pages are short | Mostly OK |
| 9 | Mobile & speed | Content pages score 93–96 on mobile performance (LCP 2.1–2.4 s, CLS 0). Homepage scores 56 (TBT 17.9 s in the lab, caused by the 3D/WebGL hero). SEO 100 and best practices 100 everywhere | Homepage issue |
| 10 | Search performance | 7 clicks, 218 impressions in 28 days; almost all brand searches; first non-brand impressions are at positions 50–62 | Early stage |

## 1. Google indexing (URL Inspection, 23 Nov)

**Indexed (24):**
- All core pages except /services, /lead-generation, /faq and /blog.
- /services/ai-appointment-setter, low-ticket-funnels, meta-ads-management, missed-call-text-back and done-for-you-sales-funnels.
- /lead-generation/solar, chiropractic, pressure-washing and hvac.
- /blog/what-is-a-vsl, a2p-10dlc-registration and sales-funnel-stages; both case studies; legal pages.

**Discovered, not yet crawled (11):** these have no crawl yet, and Google is still working through new URLs on this domain. They are not rejections.
- /services
- /lead-generation
- /services/vsl-funnels
- /services/gohighlevel-agency
- /services/webinar-funnels
- /services/client-acquisition-system
- /services/landing-page-design
- /services/application-funnels
- /lead-generation/mortgage
- /lead-generation/home-improvement
- /blog/speed-to-lead

**Problems:**
- **/faq: "Duplicate without user-selected canonical".** Google's chosen canonical is `https://www.marcustheatres.com/theatre-locations/williamsburg-cinema`, from its last crawl on 13 Sep 2026, before this site existed on the domain. The live page has a correct self-canonical. A recrawl was requested through the Indexing API on 23 Nov.
- **/blog: "Crawled – currently not indexed".** Last crawled 22 Jun 2026, also before the current site. Recrawl requested on 23 Nov.
- **/services/sales-funnels-for-coaches: "URL is unknown to Google".** Published 20 Nov; submitted on 23 Nov.

**Progress:** 13 of 24 indexed on 19 Nov → 24 of 38 on 23 Nov. No page dropped out after the 20 Nov hosting outage.

## 2. Canonical tags
- Every sitemap URL returns a `<link rel="canonical">` equal to its own clean https URL, with no trailing slash and no www.
- For every crawled page except /faq, Google's selected canonical equals the declared one.
- Alternate URLs (`/x.html`, `/x/`, `http://`, `www.`) all 301 to the canonical URL, checked live.

## 3. Robots and noindex
- **robots.txt:** `Allow: /`, `Disallow: /api/` (only the lead endpoint). AI crawlers are explicitly allowed, and it points to the sitemap.
- **Meta robots:** `index, follow` on all 38 sitemap pages. `noindex, follow` only on /lead-generation/roofing and /lead-generation/personal-injury, which hand those keywords to the sister sites as planned.
- **Headers:** no `X-Robots-Tag` on any HTML page; the lead endpoint sends `noindex`.

## 4. Sitemap
- 38 `<loc>` entries. Each returns 200 with no redirect, is self-canonical and indexable.
- The noindexed teasers are not listed.
- `lastmod` dates are 16, 18 and 21 Nov 2026.
- It was resubmitted in Search Console on 20 and 23 Nov.

## 5. Internal links
All links are normal HTML anchors in the static HTML, so Google can follow them without running JavaScript.

| Inbound links | Pages |
|---|---|
| From all 39 pages (nav or footer) | Core pages, the 6 newest service pages, all 6 industry pages, both case studies, legal pages |
| 11–12 | /services/vsl-funnels, /services/meta-ads-management, /services/client-acquisition-system |
| 8–9 | /services/gohighlevel-agency, /services/ai-appointment-setter, /services/webinar-funnels, /services/low-ticket-funnels, /blog/a2p-10dlc-registration, /blog/speed-to-lead |
| 6 | /blog/what-is-a-vsl, /blog/sales-funnel-stages |

**Finding:** 4 of the 11 un-crawled pages are in the low-link group (vsl-funnels, gohighlevel-agency, webinar-funnels, speed-to-lead). Footer links preceded the first crawl of other new pages (missed-call-text-back and chiropractic on 19 Nov, hvac on 22 Nov), so adding these to the footer is the most evidence-based next step.

## 6. Rendering (Googlebot smartphone UA, rendered DOM)

| Page | Words rendered | H1 visible | Internal links | JS errors |
|---|---|---|---|---|
| / | 2,344 | yes | 65 | none |
| /services | 1,785 | yes | 109 | none |
| /lead-generation/hvac | 1,204 | yes | 57 | none |
| /services/landing-page-design | 1,180 | yes | 57 | none |
| /blog/what-is-a-vsl | 1,343 | yes | 62 | none |
| /cases/coaching-lto | 1,215 | yes | 54 | none |
| /work-proof | 1,475 | yes | 48 | none |
| /faq | 772 | yes | 48 | none |

The raw HTML already contains the same main content (static export), so indexing does not depend on JavaScript. One decorative block on the homepage starts invisible (an animation).

## 7. Duplicate content
- Pages were compared pairwise on their main-content text, using 8-word overlaps; header and footer were excluded.
- No pair exceeds 0.33. The two highest:
  - /cases/1-52m-case-study vs /cases/coaching-lto (0.33): shared case-study template wording.
  - /lead-generation/pressure-washing vs /home-improvement (0.28): they share the wp-028 receipt and similar FAQ phrasing.
- These are not duplicates by Google's standards, but home-improvement should get more of its own content over time.

## 8. Page quality
- **Commercial pages** (services, industries): 800–1,250 words of main content. Each has first-party proof (ad and CRM screenshots with dates), a step-by-step process, an FAQ, a comparison table where relevant, and Service, FAQPage and Breadcrumb structured data.
- **HVAC** says openly that it has no HVAC receipt yet.
- **Guides:** 1,000–1,250 words, with an answer box, author box and FAQ.
- **Short pages:** /lead-generation hub (≈500 words), /about (≈360), /book (≈400, a conversion page), /blog hub (≈380), and the legal pages (90–135). Only the hubs and /about are worth expanding.
- **Weakest point for quality signals:** the author/entity layer. The founder (Vaishali Kapoor) appears on /about and in the schema, but there are no external profiles (LinkedIn, business listings) linked yet.

## 9. Mobile and speed (Lighthouse 12.2.1, mobile, lab data)

| Page | Perf. | Access. | Best pr. | SEO | LCP | TBT | CLS | Weight |
|---|---|---|---|---|---|---|---|---|
| / | 56 | 95 | 100 | 100 | 2.3 s | 17,910 ms | 0.03 | 3.4 MB |
| /services/landing-page-design | 96 | 97 | 100 | 100 | 2.1 s | 0 ms | 0 | 0.8 MB |
| /lead-generation/hvac | 94 | 97 | 100 | 100 | 2.3 s | 20 ms | 0 | 0.8 MB |
| /blog/what-is-a-vsl | 93 | 100 | 100 | 100 | 2.4 s | 40 ms | 0 | 0.7 MB |

- **Homepage:** the 3D/WebGL sections keep the main thread busy on Lighthouse's throttled CPU. Real phones with a GPU do better, but this is the one page that would fail an INP or "responsiveness" check. The content itself renders and indexes fine.
- **Minor accessibility issues:**
  - some low-contrast grey text;
  - heading levels skip on the homepage;
  - the calculator sliders' labels don't match their accessible names.
- No layout shift problems.

## 10. Search performance (Search Console, 24 Oct – 21 Nov)

**Pages:**

| Page | Clicks | Impressions | CTR | Avg. position |
|---|---|---|---|---|
| / | 6 | 101 | 5.9% | 6.1 |
| /funnels | 0 | 23 | 0% | 12.5 |
| /cases/coaching-lto | 0 | 18 | 0% | 7.1 |
| /book | 0 | 13 | 0% | 7.5 |
| /cases/1-52m-case-study | 0 | 13 | 0% | 7.5 |
| /about | 1 | 12 | 8.3% | 6.0 |
| /services/ai-appointment-setter | 0 | 2 | 0% | 61 |

**Queries:**

| Query | Clicks | Impressions | CTR | Avg. position |
|---|---|---|---|---|
| million dollar funnels | 0 | 20 | 0% | 5.8 |
| million dollar funnel | 1 | 11 | 9.1% | 3.5 |
| funnel architecture | 0 | 4 | 0% | 50.2 |
| ai appointment / ai appointment setting | 0 | 1 each | 0% | 60–62 |

- Almost all impressions come from brand searches.
- None of the 22 keywords in the 20 Nov keyword plan has impressions yet, which is expected while 11 target pages are not crawled.

## Recommended next steps (ranked; none done yet)
1. **Internal links:** add the 4 un-crawled, low-link pages to the footer: vsl-funnels, gohighlevel-agency, webinar-funnels and /blog/speed-to-lead. Low effort, and the same change came before earlier first crawls.
2. **/faq:** wait for the requested recrawl. If Google still picks the old canonical after 1–2 weeks, request indexing manually in Search Console. If that fails too, publish the FAQ at a new URL with a 301.
3. **Homepage speed:** load the 3D sections only after the first user interaction or when idle, and keep the hero static, to bring TBT down. Design stays the same.
4. **Hubs and /about:** expand /lead-generation and /about with real, specific content (team, process, how results are verified).
5. **Home improvement:** give it its own receipt and FAQ, so it relies less on the pressure-washing material.
6. **Accessibility:** fix contrast, heading order and slider labels.
7. **Off-site (owner):** Google Business Profile, LinkedIn company page and directory listings, which give Google crawl demand and entity signals.
