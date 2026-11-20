# SEO & conversion recovery log — milliondollarfunnels.us

Every change: reason (evidence) → URL → validation method → before / after.
Data source: Google Search Console API (service account, siteOwner). GA4: not installed on the site before 2026-11-19, so no traffic/conversion history exists.

## Baseline — 2026-11-19 (GSC data through 2026-11-17)

**Data history:** Search Console has data only from **2026-10-19** (31 days). The requested 28d-vs-previous-28d and 3-month-vs-previous-3-month comparisons are therefore mostly empty:

| Period | Dates | Days with data | Clicks | Impressions | Avg pos |
|---|---|---|---|---|---|
| Last 28 days | 10-21 → 11-17 | 28 | 7 | 160 | 10.1 |
| Previous 28 days | 09-23 → 10-20 | 2 | 1 | 10 | 12.5 |
| Last 3 months | 08-19 → 11-17 | 30 | 8 | 170 | 10.2 |
| Previous 3 months | 05-20 → 08-18 | 0 | 0 | 0 | — |

Daily impressions are flat at 1–13/day since launch, so the site has not lost traffic; it has never received any.

**Where the impressions come from (last 28 days):**
- By country: Australia 39%, USA 24%, Germany 8%. The #1 result for "million dollar funnels" is *My Million Dollar Funnels Pty Ltd* (an Australian agency at mymilliondollarfunnels.com), so most brand impressions are people looking for that company.
- By query: 52 of 160 impressions have a visible query, and **all meaningful ones are brand-name variants**. These are "million dollar funnels" (19 impressions, position 6.0), "million dollar funnel" (12, 4.2) and "one million dollar funnel" (4, 4.0).
- Non-brand queries: only "funnel architecture" (5, position 49) and "highlevel mortgage funnel" (1, position 55).
- None of the targeted service or guide keywords has a single impression.

**Indexing:** 13 of 24 sitemap URLs are indexed. The 11 that aren't are almost exactly the pages created for SEO:
- Not crawled: `/services`, 4 of the 5 service pages and all 4 guides are "Discovered – currently not indexed". Google knows these URLs but has not crawled them once (no lastCrawl).
- `/blog`: "Crawled – not indexed". Its last crawl was 2026-06-22, from the domain's earlier site.
- `/faq`: "Duplicate without user-selected canonical". Google picked www.marcustheatres.com as canonical in a 2026-09-13 crawl.

**The domain has history:** Google still references URLs from an earlier site on this domain, such as /post/sales-funnels-for-coaches, /post/best-web-development-companies-florida and /blog/category/n8n-guide.
- These returned 404 and were still being crawled in Oct–Nov 2026.
- The homepage's known referring pages are spam-style link pages, such as topranknow.it.com ("premium contextual SEO backlinks") and currentchron.com.

**Conversion path:** the /book form did not send leads anywhere.
- It opened a `mailto:` link to hello@milliondollarfunnel.com and then showed "Strategy Session Requested", even when no email app opened or the visitor never pressed send.
- No analytics was installed, so there was no way to know how many visitors tried.

## Diagnosis — what went wrong with the earlier SEO work

1. **The site's problem was never content volume.** The domain is about 10 weeks old in Google's eyes. It has no evidence of real backlinks, and Google isn't spending crawl budget on it. The 9 content pages added on Nov 16–18 (5 services, 4 guides) can't rank until Google crawls them, and it hasn't crawled any yet.
2. **Wrong keywords for this stage.** The guides target informational searches dominated by large, established sites, so they bring readers, not buyers:
   - "what is a vsl": sundaysky, indeed, d-id.
   - "speed to lead": chilipiper, workato, leandata.
   - "sales funnel stages", "a2p 10dlc registration": textdrip, grasshopper.
   - Commercial terms are dominated by software tools and directories, not agencies: "vsl funnel" (ClickFunnels, Swipepages, Vidalytics), "ai appointment setter" (SaaS products), "sales funnel agency" (directory lists).
3. **Brand collision.** "Million Dollar Funnel(s)" is shared with mymilliondollarfunnels.com (AU agency, #1–2), a Thinkific course, an Apple Book and an @milliondollarfunnels Instagram. Brand impressions are mostly someone else's customers.
4. **Leads leaked even when visitors came.** The mailto-only form, with no tracking, meant an unknown number of real enquiries were lost.
5. **Relevance signals are weak.**
   - The homepage H1 is "Making Brands Unforgettable" (no service or audience).
   - Some case-study material comes from Shopify and dropshipping posts, while the offer targets coaches, consultants and agencies.

**Unnecessary pages (for now):** none should be deleted. They are not hurting anything, and deleting them would waste work. But no more pages should be created until the existing ones are crawled and indexed. `/blog/a2p-10dlc-registration` and `/blog/speed-to-lead` are the weakest fit for buyer intent.

## Ranked opportunities (by business impact)

| # | Opportunity | Why | Status |
|---|---|---|---|
| 1 | Make /book deliver leads + measure them | Every visitor who converts is currently at risk of being lost | C1, C2 done; needs webhook + GA4 ID |
| 2 | Earn real authority: Google Business Profile, Clutch/DesignRush/GoodFirms, GoHighLevel marketplace/directory, LinkedIn company page, client-site credits, guest posts | "Discovered – not indexed" is a crawl-demand/authority problem | Owner action; needs real profiles |
| 3 | Clean the domain's past: redirect old-site URLs, review spammy backlinks, consider a disavow | Old 404s and spam referrers | C3 done; backlink export needed |
| 4 | Homepage relevance: H1 and intro naming the service and audience | The only page with impressions has a generic H1 | Next, with owner approval of copy |
| 5 | Focus on 2 niches where real proof exists (mortgage/insurance funnels on GoHighLevel, coaching low-ticket funnels) | First non-brand impressions ("highlevel mortgage funnel", "funnel architecture") match existing /funnels and /work-proof proof | After pages get indexed |
| 6 | Mobile speed of the homepage (Lighthouse 38) | Affects conversion more than ranking at this traffic level | Later |

## Changes

### C1 — 2026-11-19 · Lead capture that actually delivers (`/book`, new `/api/lead`)
- **Reason:** the mailto-only form loses every lead whose device has no mail app, or who doesn't press send, and the success screen claimed otherwise.
- **Change:**
  - The form now POSTs to `/api/lead`, which forwards the lead as JSON to `LEAD_WEBHOOK_URL` (GoHighLevel inbound webhook, Zapier or Make).
  - If that isn't configured or fails, the form falls back to mailto with an honest "press send to finish" screen.
  - A honeypot field was added against spam.
- **Validation:**
  - Local production build. With no webhook → 503, and the fallback screen shows.
  - With a test webhook → 200; the payload was received with all fields, and the "Strategy Session Requested" screen shows.
  - Invalid email → 422. Honeypot → accepted and dropped.
  - Live check after deploy: POST /api/lead returns 503 until the env var is set.
- **Needs owner action:** set `LEAD_WEBHOOK_URL` in Vercel → Project → Settings → Environment Variables, then redeploy.
- **Success metric:** leads received in the CRM per week. The baseline is unknown (no tracking).

### C2 — 2026-11-19 · Analytics (GA4) with lead event (all pages)
- **Reason:** there is no visitor or conversion data at all, so conversion problems cannot be measured.
- **Change:**
  - GA4 loads only when `NEXT_PUBLIC_GA_ID` is set.
  - `/book` fires `generate_lead` on delivered submissions and `lead_email_fallback` when the form falls back to email.
- **Validation:** with the env var unset, no GA script is in the HTML (checked live). Once set, check the GA4 Realtime report and submit a test lead.
- **Needs owner action:** create a GA4 property, set `NEXT_PUBLIC_GA_ID` (G-XXXXXXX) in Vercel, then redeploy. Mark `generate_lead` as a key event.

### C3 — 2026-11-19 · 301 redirects for old-site URLs Google still crawls
- **Reason:** URL Inspection shows Google crawling 404s from the earlier site, e.g. /post/sales-funnels-for-coaches on 2026-11-06.
- **Change:**
  - `/post/sales-funnels-for-coaches` → `/services`.
  - `/blog/category/*` → `/blog`.
  - The unrelated `/post/best-web-development-companies-florida` stays 404 on purpose, because redirecting unrelated content counts as a soft 404.
- **Validation:** local `next start` returned 308 to the targets. Live curl after deploy. Re-inspect in GSC on the next runs (expect "Page with redirect").

### C4 — 2026-11-19 · Industry lead-generation pages (new: `/lead-generation`, `/lead-generation/roofing`, `/mortgage`, `/solar`, `/personal-injury`)
- **Reason:** the owner asked for new SEO pages. Measured US demand (OpenSEO, 2026-11-19) shows commercial, low-difficulty keywords where the site already has verified receipts. The keywords chosen earlier were informational or dominated by large sites.

  | Keyword | Volume/mo | KD | CPC |
  |---|---|---|---|
  | roofing lead generation | 1,000 | 8 | $57 |
  | roofing leads | 1,000 | 6 | $50 |
  | mortgage lead generation | 880 | 0 | $29 |
  | solar lead generation | 590 | 0 | $70 |
  | insurance lead generation | 320 | 0 | $40 |
  | financial advisor lead generation | 260 | 0 | $107 |
  | personal injury lead generation | 110 | 3 | $119 |

- **Content rules:**
  - Every figure was read from the screenshot it cites.
  - Wording follows what the screenshot shows, not the post caption. For example, wp-006 shows 117 leads at $15.26 in view, not the caption's 266, and wp-036 shows 530 form leads, not "signed" leads.
  - wp-027 (solar) and wp-029 (MVA) show identical totals ($1,301.63 / 659 clicks / 76 leads / $17.13), so both were excluded until the owner confirms which is real.
- **Layout:**
  - Hero with the lead form above the fold, receipt cards with a lightbox, problem cards and interactive step tabs.
  - A scroll-on-hover screenshot of a funnel we built, a pipeline calculator (inputs only, defaults labelled), a comparison table, FAQ with FAQPage schema, related links, a second lead form and a sticky mobile CTA.
- **Validation:**
  - Local production build, Playwright desktop and mobile: no broken images, no horizontal overflow.
  - Form (503 → honest fallback), calculator, tabs and lightbox all tested.
  - Titles 52–68 characters, descriptions 147–157, one H1 each, canonical set, Service/FAQPage/Breadcrumb JSON-LD present.
- **Before:** the URLs did not exist. **Track:** indexing status, impressions for the target keywords, and leads per page (source field).

### C5 — 2026-11-19 · Lead form on every service page and guide
- **Reason:** content pages ended with a link to /book, an extra step before anyone could enquire.
- **Change:** the end-of-page CTA was replaced with an inline lead form (LeadSection) on all 5 `/services/*` and 4 `/blog/*` pages.
- **Validation:** visual check on /services/vsl-funnels. The form posts to /api/lead and records the page as the source.

### C6 — 2026-11-19 · Footer newsletter actually saves emails (all pages)
- **Reason:** the footer "Join The List" form showed "Joined!" but threw the email away.
- **Change:** it now posts to /api/lead (niche "Newsletter signup"). It shows "Joined!" only on success, otherwise an error with the contact email, and fires the GA4 `sign_up` event.
- **Validation:** Playwright with no webhook → 503 → error message shown (expected until LEAD_WEBHOOK_URL is set).
- **Also:** an "Industries" link was added to the main nav and footer, and an industries section to /services, sitemap.xml and llms.txt.

### C7 — 2026-11-19 · 30-service catalog + 6 new landing pages
- **Reason:** the owner asked for the 30 top services, each mapped to a page that can rank. `lib/serviceCatalog.ts` holds the list with each service's target keyword and measured US volume (OpenSEO), or null where it was not measured.
- **New pages** (same rich layout as C4):

  | Page | Target keyword | Volume/mo |
  |---|---|---|
  | `/services/meta-ads-management` | facebook ads management | not measured |
  | `/services/client-acquisition-system` | client acquisition | 2,400 (KD 13) |
  | `/services/done-for-you-sales-funnels` | done for you sales funnel | 30 |
  | `/services/missed-call-text-back` | missed call text back | 390 (KD 8) |
  | `/lead-generation/chiropractic` | chiropractic marketing | 390 (KD 0) |
  | `/lead-generation/pressure-washing` | pressure washing leads | 170 |

- **Hub:** /services now lists all 30 services in six groups, each linking to the page that targets it. The Organization OfferCatalog schema lists all 30 with their URLs.
- **Data integrity:**
  - wp-001 ("finance") and wp-031 ("Australian mortgage") show identical ad-set rows, so wp-031 was removed from /lead-generation/mortgage until the owner confirms which is real.
  - A financial-advisor page was not built: its only receipt (wp-025) shows a single-day view, and the 1,308-lead total exists only in the post banner.
  - Insurance was not built: there is no receipt.
- **Validation:** production build; Playwright desktop and mobile on 5 of the pages, with no broken images or overflow; all titles ≤ 65 characters, descriptions ≤ 160, one H1 each.

### C8 — 2026-11-19 (12:40 run) · Site-wide footer links to the 10 new pages
- **Reason:** URL Inspection shows all new /lead-generation/* and new /services/* pages as "Discovered" or "unknown", never crawled. The homepage is the page Google crawls most (last crawl Nov 13). Before this change, the homepage HTML linked to none of the 6 industry pages or the 4 new service pages.
- **Change:** a "Solutions" column in the footer on every page, linking roofing, mortgage, solar, personal injury, chiropractic, pressure washing, Meta Ads, client acquisition, done-for-you funnels and missed call text back.
- **Validation:**
  - The local build's homepage HTML now has 15 unique /services/* and /lead-generation/* links.
  - Playwright at 1440, 1024 and 390 px: no overflow, and the column is readable.
- **Track:** lastCrawl and coverage of those 10 URLs in the next runs.

### Results — 12:40 run, 2026-11-19 (GSC data through 2026-11-17)
- **Indexed:** 16 of 35 sitemap URLs (was 13 of 24). Newly indexed:
  - `/services/meta-ads-management`: crawled and indexed 2026-11-19 11:17, the same day it was published (C7).
  - `/services/low-ticket-funnels`: crawled 2026-11-19 04:26.
  - `/blog/sales-funnel-stages`: crawled 2026-11-19 02:53.
- **Still not crawled:** the other /lead-generation/* pages and 3 of the new services pages ("Discovered" or "unknown"). C8 footer links are live as of this run.
- **Traffic:** 28d 8 clicks / 239 impressions; 7d 3 clicks / 62 impressions. "million dollar funnels" 18 → 19 impressions.
- **Old-site URLs:** not recrawled since the C3 redirects (last crawl 2026-11-06).
- **Owner settings still missing:** /api/lead returns 503 (LEAD_WEBHOOK_URL not set) and GA4 is not live (NEXT_PUBLIC_GA_ID not set).

### Results — 00:40 run, 2026-11-20 (GSC data through 2026-11-18)
- **Indexed:** 18 of 35 (12:40 run: 16; baseline: 13 of 24). Newly indexed:
  - `/services/missed-call-text-back`: crawled 2026-11-19 13:17.
  - `/lead-generation/chiropractic`: crawled 2026-11-19 14:04.
  - Both were first crawled within about 1.5 hours of the C8 footer links going live (published around 12:55). Neither was sent through the Indexing API (both were rejected with a 429 on Nov 19). This is the first after-value for C8.
- **Traffic:**
  - 28 days: 7 clicks, 230 impressions (was 8 / 239).
  - 7 days: 3 clicks, 41 impressions (was 3 / 62).
  - The 7-day drop comes from the window moving forward and from brand-search impressions; no page lost position (homepage average 6.2).
- **Still not indexed:** 17 URLs.
  - Discovered: `/services`, `/lead-generation`, vsl-funnels, mortgage, personal-injury, pressure-washing and 3 guides.
  - Unknown to Google: gohighlevel-agency, webinar-funnels, client-acquisition-system, done-for-you-sales-funnels, roofing, solar.
  - `/blog`: crawled, not indexed.
  - `/faq`: still a duplicate of marcustheatres.com from the 2026-09-13 crawl. It was missing from the snapshot because of a transient inspection error; a manual recheck confirmed the status.
- **Old-site URL** `/post/sales-funnels-for-coaches`: not recrawled since 2026-11-06.
- **Change this run:** none. C8 is working, so the next step is waiting for Google to crawl the remaining footer-linked pages rather than making more changes.
- **Checks:** audit clean (35 pages, no duplicate titles or descriptions); 36 internal links, none broken. /api/lead: 422 for an invalid body, 503 for a valid one (webhook not set). GA4 not live.
- **Google Indexing API:** 0 sent (paused until Nov 23).

### C9 — 2026-11-20 · Implement the 20 Nov keyword plan (Semrush) for milliondollarfunnels.us
- **Source:** "Keyword Research Report, 20 Nov 2026" (Semrush US). The rows for this site are saved in `seo/keyword-plan-2026-11-20.csv`, with an "Implemented" column.
- **Ownership / cannibalization:**
  - `/lead-generation/roofing` is now a short teaser linking to roofingsystems.co.
  - `/lead-generation/personal-injury` is now a short teaser linking to scalewithads.us/exclusive-mva-leads.
  - Both are `noindex, follow` and removed from the sitemap, hub, footer, related links, catalog and llms.txt. The URLs still work for anyone who has them.
- **Retitles** (H1, title and first paragraph use the mapped keyword):
  - Homepage H1: "Making Brands Unforgettable" → "High-Ticket Sales Funnels" (same styling).
  - `/lead-generation`: title "Lead Generation Funnels by Industry: Solar, Mortgage, HVAC", H1 "Lead Generation Funnels Built for Your Industry", and an intro that defines a lead generation funnel.
  - `/services` and `/services/vsl-funnels` already matched their keyword; checked, no change.
- **New P1 pages:**

  | Page | Keyword | Volume | KD |
  |---|---|---|---|
  | `/lead-generation/hvac` | hvac lead generation | 1,300 | 15 |
  | `/services/landing-page-design` | landing page design agency | 390 | 10 |
  | `/services/sales-funnels-for-coaches` | sales funnel for coaches | 140 | 14 |
  | `/services/application-funnels` | application funnel | 40 | 6 |

  The HVAC page states openly that there is no HVAC receipt yet. It shows home-service receipts, labelled as such, and its calculator uses example inputs.
- **New P2 page:** `/lead-generation/home-improvement` (home improvement lead generation, 1,000, KD 17).
- **Deferred:** the "sales funnel examples" guide (P2). /funnels already targets that term, and a second page would compete with it.
- **Footer "Solutions"** now lists the funnel services and the industries this site owns. The service catalog is updated with Semrush volumes.
- **Validation:**
  - Production build passes.
  - Titles ≤ 65 characters and descriptions ≤ 160 on all new and retitled pages.
  - The teasers return `noindex, follow`.
  - The sitemap has 19 service and industry URLs, without roofing or personal injury.
  - Playwright desktop and mobile: no broken images, no overflow.
- **Open, for the owner:**
  - `/services/meta-ads-management` targets "facebook ads management", and the plan assigns Meta Ads to scalewithads.us.
  - The client-acquisition page uses the roofing CRM receipts, and the plan says shared case studies should live on one site only.

### Results — 12:40 run, 2026-11-20 (GSC data through 2026-11-18)
- **Indexed:** 19 of 38. The snapshot counted 18 because of one transient inspection error on `/lead-generation/pressure-washing`; a manual recheck shows it indexed, crawled 2026-11-20 03:48.
  - Previous run: 18 of 35. Baseline: 13 of 24. The sitemap grew to 38 with the C9 pages and lost the 2 teasers.
- **C9 pages, about 5 hours after publishing:**
  - `/lead-generation/hvac` and `/services/sales-funnels-for-coaches` are already "Discovered".
  - `/services/landing-page-design`, `/services/application-funnels` and `/lead-generation/home-improvement` are still unknown to Google.
- **Traffic:** 28 days: 7 clicks, 233 impressions; 7 days: 3 clicks, 44 impressions.
  - Of 54 visible query impressions, 38 are brand searches.
  - First non-brand impressions for a service page: "ai appointment" (position 60) and "ai appointment setting" (position 62), both on /services/ai-appointment-setter.
- **Keyword plan:** none of the 22 plan keywords has impressions yet. Expected, since most target pages are not crawled and GSC data lags 2 days.
- **Old-site URL:** `/post/sales-funnels-for-coaches` still not recrawled (last crawl 2026-11-06).
- **Change this run:** none. The new pages are hours old and already linked from every page's footer, so there is no evidence yet for another change.
- **Checks:** audit clean (38 pages, no duplicates); 39 internal links, none broken. /api/lead returns 422 for an invalid body and 503 for a valid one (webhook not set). GA4 not live.
- **Google Indexing API:** 0 sent (paused until Nov 23).

### C10 — 2026-11-20 · Hosting moved from Vercel to Hostinger
- **Reason:** Vercel paused the whole DEVSYNX Hobby team (Fast Data Transfer 136/100 GB, Deployment Storage 30.56/10 GB). Every URL returned 402 DEPLOYMENT_DISABLED.
- **Change:**
  - Next.js static export served by Hostinger LiteSpeed.
  - `public/.htaccess` handles https and the apex host, clean URLs, old-site 301s, the 404 page, caching and 3D MIME types.
  - Leads go through `/api/lead.php`, which saves to CSV outside public_html, emails and optionally forwards to a webhook.
  - Built files are on the `hostinger` branch; Vercel builds are disabled.
- **Validation (live, after the owner removed the Vercel DNS records):**
  - 60 of 60 requests were served by Hostinger.
  - All 38 sitemap pages return 200, with one H1, a correct canonical and no duplicate titles or descriptions; all 38 internal links work.
  - http, www, `/x.html` and `/x/` all 301 to the clean https URL; unknown URLs return 404; the roofing teaser is still noindex.
  - Private files are blocked.
  - Lead endpoint: 422 for invalid input, 200 for the honeypot, 200 for a valid test lead ("TEST - ignore (site check)").
  - Playwright desktop and mobile on /, a landing page, /work-proof and /book: styled, no broken images, no overflow, calculator works.
  - Sitemap resubmitted to Google and IndexNow notified for all URLs.
- **Outage:** about 2026-11-20 (Vercel pause) until DNS moved the same day. Watch the next snapshots for pages dropping out of the index.
