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

### Results — 00:40 run, 2026-11-21 (GSC data through 2026-11-19)
- **Hosting:** all checks served by Hostinger; /api/lead.php returns 422 for invalid input; all 38 pages and 38 internal links pass the live audit.
- **Indexed:** 19 of 38, unchanged. No page dropped out of the index after the 20 Nov Vercel outage.
- **Now "Discovered" (Google knows them; previously unknown):** /lead-generation, /services/vsl-funnels, /services/done-for-you-sales-funnels, /services/landing-page-design, /services/application-funnels and /lead-generation/home-improvement.
  - /lead-generation/solar went back to "unknown", which is normal inspection noise.
- **Traffic:** 28 days: 7 clicks, 223 impressions; 7 days: 2 clicks, 29 impressions.
  - The 7-day figure includes the outage day (Nov 20 is not in the data yet).
  - Non-brand queries are unchanged: "funnel architecture" (position 49), "ai appointment setting" (position 62).
- **Keyword plan:** still no impressions for any plan keyword.
- **Change this run:** none. Every P1 page is linked from the footer on every page and Google has now discovered them, so the next step is waiting for crawls.
- **Google Indexing API:** paused until Nov 23 (0 sent).

### Results — 12:40 run, 2026-11-21 (GSC data through 2026-11-19)
- **Hosting:** healthy on Hostinger (38/38 pages, 38/38 links, lead endpoint 422).
- **Indexed:** 20 of 38 (was 19). New: `/blog/a2p-10dlc-registration`, crawled 2026-11-21 06:19. This is the first page newly indexed after the move to Hostinger.
- **Inspection noise:** gohighlevel-agency and hvac flipped from Discovered back to unknown, and solar went the other way. These flips are normal.
- **Traffic:** 28 days: 7 clicks, 226 impressions; 7 days: 2 clicks, 32 impressions. Non-brand queries unchanged; no impressions yet for any plan keyword.
- **Change this run:** none (no new evidence).
- **Google Indexing API:** paused until Nov 23.

### C11 — 2026-11-21 · "Preferred source on Google" button
- **Reason:** owner request. Visitors who add the site as a preferred source see more of its articles in Google Top Stories. It's only a link to `https://www.google.com/preferences/source?q=milliondollarfunnels.us`, so nothing is installed and nothing is tracked.
- **Change:**
  - Google-blue button (#1a73e8) with the "G" logo and short copy, in the footer of every page.
  - A second button at the end of every guide (`/blog/*`), before the FAQ.
  - Opens in a new tab.
- **Also fixed:** the copyright line showed "Funnel™™"; it now shows "Funnel™".
- **Validation:** export build; Apache test at desktop and mobile shows the button, `target=_blank` and no overflow.
- **Expected effect:** small for a service site. It only changes what people who opt in see, and works best for article and news content.

### Results — 00:40 run, 2026-11-22 (GSC data through 2026-11-20)
- **Hosting:** healthy on Hostinger (38/38 pages, 38/38 links, lead endpoint 422).
- **Indexed:** 22 of 38 (was 20). New:
  - `/lead-generation/solar`: crawled 2026-11-22 00:13; plan keywords "solar leads" (1,600/mo) and "solar lead generation".
  - `/blog/what-is-a-vsl`: crawled 2026-11-21 16:02.
- **Inspection noise:** gohighlevel-agency and hvac moved to "Discovered"; done-for-you-sales-funnels moved back to "unknown".
- **Traffic:** 28 days: 7 clicks, 218 impressions; 7 days: 2 clicks, 28 impressions. The data now includes the 20 Nov outage day.
  - Homepage 7-day average position improved to 4.9 (28-day: 6.1).
  - Non-brand queries: "funnel architecture" at position 50; "ai appointment setting" at 62 on /services/ai-appointment-setter.
- **Keyword plan:** still no impressions for any plan keyword.
- **Change this run:** none (no new evidence).
- **Google Indexing API:** paused until Nov 23.

### Results — 12:40 run, 2026-11-22 (GSC data still through 2026-11-20)
- **Hosting:** healthy on Hostinger (38/38 pages, 38/38 links, lead endpoint 422).
- **Indexed:** 22 of 38, unchanged. Search Analytics was not updated since the last run, so traffic is identical (28 days: 7 / 218; 7 days: 2 / 28).
- **Inspection noise only:** several un-crawled pages flipped between "Discovered" and "unknown".
- **Change this run:** none.
- **Google Indexing API:** pause ends 2026-11-23 00:00 UTC. The 00:40 run will send the first batch (max 20), starting with the un-crawled P1 pages.

### Results — 00:40 run, 2026-11-23 (GSC data through 2026-11-21)
- **Hosting:** healthy on Hostinger (38/38 pages, 38/38 links, lead endpoint 422).
- **Indexed:** 24 of 38 (was 22). New:
  - `/lead-generation/hvac` (P1 "hvac lead generation", 1,300/mo; C9), crawled 2026-11-22 14:47.
  - `/services/done-for-you-sales-funnels` (P1 "done for you sales funnel" and "funnel builder"), crawled 2026-11-22 20:26.
  - Neither was sent through the Indexing API, so the footer and sitemap discovery is working.
- **Traffic:** 28 days: 7 clicks, 215 impressions; 7 days: 2 clicks, 20 impressions. Still brand-dominated; no plan keyword has impressions yet.
- **Google Indexing API:** the pause ended 2026-11-23 00:00 UTC. First batch, 11 of 20 used:
  - Accepted: home-improvement, landing-page-design, sales-funnels-for-coaches, application-funnels, vsl-funnels, gohighlevel-agency, webinar-funnels, client-acquisition-system, /blog/speed-to-lead, /blog, /faq.
  - Skipped (accepted on Nov 19, less than 7 days ago): /lead-generation, /services, /lead-generation/mortgage.
- **Change this run:** none to the site.

### C12 — 2026-11-23 · Fixes 1–6 from the technical audit (seo/technical-audit-2026-11-23.md)
1. **Internal links.** Footer "Solutions" now also links /services/vsl-funnels, /services/webinar-funnels and /services/gohighlevel-agency; "Ecosystem" links /blog/speed-to-lead. These 4 pages had only 6–11 inbound links and were not crawled.
2. **/faq.** Recrawl requested through the Indexing API on 23 Nov (after the audit). No code change is possible for Google's stored canonical (marcustheatres.com, 13 Sep crawl). Next step if it persists after 1–2 weeks: manual "Request indexing" in Search Console, then a new URL with a 301.
3. **Homepage speed.**
   - The three.js diamond now starts on the first interaction (pointer, touch, scroll, wheel or key). Before that, a 12 KB still of the same diamond (`/models/resn/diamond-poster.webp`, preloaded) is shown, aligned to the 3D render on desktop and mobile.
   - The diamond's no-WebGL fallback now uses that still instead of an unrelated image.
   - Below-the-fold images are lazy-loaded (portfolio phone screens and notification thumbnails); the wallpaper went from 711 KB JPG to 88 KB WebP; the FAQ avatar from a 341 KB PNG to a 168 px WebP.
   - Local measurement (Lighthouse mobile): total blocking time 17,910 ms → 160–260 ms; with devtools throttling, LCP 2.6 s.
4. **Thin pages expanded with factual content.**
   - /about: what we build (4 linked services), how an engagement works (5 steps), and how results are verified (receipt count, CPL range and median from the receipts, links to the benchmarks, and the sister-brand split). Main text ≈360 → ≈930 words.
   - /lead-generation: what a lead generation funnel is (4-step interactive), what you own, and a results-by-industry table built from the dated receipts. Main text ≈500 → ≈1,230 words.
5. **Home improvement differentiated.**
   - Dropped the shared pressure-washing receipt (wp-028); the page now says openly that no remodeling-only receipt is published yet.
   - New problems, steps and FAQ for remodeling, kitchen, bath and exterior contractors (long decisions, budget filters, financing, photo quote funnel).
   - New meta description.
6. **Accessibility.**
   - Text contrast raised on receipt dates, calculator notes, form notes and FAQ counters.
   - Heading order fixed: hero capability titles h3 → p; testimonial names h4 → p on the homepage and /work-proof.
   - Receipt buttons' accessible names now match their visible text.
   - `.htaccess` compression now also covers text/javascript (Hostinger already serves Brotli).
- **Validation:** export build; Apache test (all pages 200, no overflow on desktop or mobile); the poster shows before interaction and the 3D replaces it after; Lighthouse before and after as above.
- **Live validation of C12 (23 Nov, after the Hostinger deploy):**
  - 38/38 pages and 38/38 internal links pass; the new footer links are present.
  - Lighthouse mobile, live: homepage performance 56 → **90** (TBT 17,910 → 140 ms, LCP 2.4 s, weight 3.4 → 2.2 MB); /lead-generation, /about and /lead-generation/home-improvement 95, accessibility 100.
  - IndexNow notified for the changed URLs.

### C13 — 2026-11-23 · Top 10 plan for milliondollarfunnels.us (owner task file CLAUDE_CODE_TOP10_milliondollarfunnels_us.md)
- **Rules followed:**
  - No em dashes in text on the target pages and the new articles.
  - No invented numbers; only proof already published on the site.
  - Guides changed in the last 7 days and not named by the file were left as they were. In-text links I first added to 4 existing guides were reverted.
  - **Google Indexing API not used.** `gidx/submit.js` is now hard-disabled; only sitemap resubmits and IndexNow remain.
- **Target pages and keywords** (before → after):

  | Page | Keyword(s) | Title / H1 / intro | Case result + CTA | FAQs (FAQPage) |
  |---|---|---|---|---|
  | /services/done-for-you-sales-funnels | funnel builder, done for you sales funnel | Title "Done-For-You Sales Funnels: Built, Connected & Launched" → "Done-For-You Sales Funnels by a Funnel Builder Team"; H1 and intro now include "funnel builder" | Added: coaching LTO case (13,630 sales, $847,307, 3.32 ROAS) | 4 → 5 |
  | /lead-generation/chiropractic | chiropractic marketing | Intro now starts with the keyword | Added: 44 prepaid consults, $6,153, 3.59× (wp-032) | 4 → 5 |
  | /lead-generation/hvac | hvac lead generation | Intro now starts with the keyword | Added: closest result, labelled as such (211 home-service leads at $11.27, wp-005) | 4 → 5 |
  | /lead-generation | lead generation funnel | Already aligned (C9/C12) | Added: 10,172 mortgage leads at $8.06 (wp-008) | 4 → 5 |
  | /services/missed-call-text-back | missed call text back | Intro now starts with the keyword | Added: $1.52M case, follow-up automation framing taken from the case page | 4 → 5 |
  | /services/landing-page-design | landing page design agency | H1 "Landing Page Design That Turns Paid Clicks Into Leads and Sales" → "Landing Page Design Agency: Pages That Turn Paid Clicks Into Leads"; intro includes the keyword | Added: 27.01% opt-in, 1,515 from 5,610 (wp-007) | 4 → 5 |
  | /lead-generation/pressure-washing | pressure washing leads | Already aligned | Added: 167 leads at $13.37 (wp-028) | 4 → 5 |
  | /services | sales funnel agency | Already aligned; em dashes removed | Added case result callout (coaching LTO, link to $1.52M) and a Book-a-call CTA | 0 → 5 (new FAQ section + FAQPage) |
  | /services/vsl-funnels | vsl funnel | Already aligned; em dashes removed | Existing $1.52M proof section | 4 → 5 |

- **Internal links:**
  - Every target is linked sitewide (footer "Solutions" and /services).
  - Related links were added between named targets: hvac → chiropractic, pressure-washing; pressure-washing → chiropractic; DFY → landing-page-design, funnel-builder article; vsl-funnels → DFY.
  - The 2 new articles link to /lead-generation, /lead-generation/hvac, /chiropractic, /pressure-washing, /services/missed-call-text-back, /done-for-you-sales-funnels and /landing-page-design.
- **New articles:**
  - `/blog/funnel-builder-vs-agency` ("funnel builder" question intent).
  - `/blog/what-is-a-lead-generation-funnel` ("what is a lead generation funnel").
  - Both have BlogPosting, FAQPage and Breadcrumb schema and use only published receipts.
- **Sister-site footer links:** none exist on this site (checked with a code search). The only cross-site links are the 2 noindexed teasers and one sentence on /about.
- **Disavow:** `docs/disavow.txt` was created in Google's format with the 2 spam referrers Google URL Inspection shows (topranknow.it.com, currentchron.com). No backlink export exists in the repo, so the Semrush list still needs adding. Nothing was uploaded.
- **Card descriptions:** em dashes are now replaced at display time (house style). Source pages are unchanged.
- **Validation (local export on Apache):**
  - 40 sitemap URLs, no duplicate titles or descriptions.
  - Each target: one H1 containing its keyword, keyword in the title, self canonical, all JSON-LD blocks parse, FAQPage with 5 questions, case block present, 0 em dashes in text; no mobile overflow.

### C14 — 2026-11-23 · Content for 5 pages (owner file CLAUDE_CODE_CONTENT_milliondollarfunnels.md)
- **7-day note:** all 5 pages were changed earlier today in C13. The owner file names them explicitly, so the full content was applied (not just FAQs and meta). Every number used already appears in a published case on the site.
- **Content only:**
  - No layout, class, animation, image, form or section order changed.
  - Two optional data fields render inside existing sections with existing styles:
    - a second hero paragraph ("What is a funnel builder?" and "How does missed call text back work?");
    - the HVAC marketing ideas list, shown under the process steps.
  - The existing `RichText` link syntax is now also used in band intros, problem cards, step bodies and case copy, so the in-text links render.
- **Changes per page (before → after):**

  | Page | Title | H1 | Sections replaced | FAQs | In-text links |
  |---|---|---|---|---|---|
  | /services/done-for-you-sales-funnels | "Done-For-You Sales Funnels by a Funnel Builder Team \| MDF™" → "Done-For-You Sales Funnels From a Funnel Builder Team" | "...That Launches Them for You" → "...That Sells" | receipts intro, case copy, 3 problem cards, 4 steps, comparison intro, new "What is a funnel builder?" paragraph | 5 → 6 | vsl-funnels, application-funnels, /lead-generation, missed-call-text-back |
  | /lead-generation/hvac | "HVAC Lead Generation: Exclusive Install & Repair Leads \| MDF™" → "HVAC Lead Generation for Replacement and Install Jobs" | dropped ", Not Just Tune-Ups" | receipts intro (keeps the "no HVAC-only receipt yet" note), 3 problem cards, 4 steps, comparison intro, marketing ideas list | 5 → 6 | missed-call-text-back, /lead-generation, home-improvement, DFY |
  | /lead-generation/chiropractic | "Chiropractic Marketing: Booked New-Patient Consults \| MDF™" → "Chiropractic Marketing That Fills Your Schedule" | "...With Paying New Patients" → "...With New Patients" | receipts intro, case title and copy, 3 problem cards, 4 steps | 5 → 5 (new set) | /lead-generation, DFY, missed-call-text-back |
  | /lead-generation | "Lead Generation Funnels by Industry: Solar, Mortgage, HVAC \| MDF™" → "Lead Generation Funnels Built for Your Industry" | unchanged (already matched) | case copy, "How to create a lead generation funnel" paragraph, "What a lead generation funnel is" intro, 3 ownership cards | 5 → 5 (new set) | hvac, chiropractic, DFY, landing-page-design |
  | /services/missed-call-text-back | "Missed Call Text Back Setup for Service Businesses \| MDF™" → "Missed Call Text Back That Saves Every Lost Lead" | unchanged (already matched) | 3 problem cards, 4 step texts, comparison intro, new "How does missed call text back work?" paragraph | 5 → 6 | DFY, /lead-generation/hvac, /lead-generation |

- **Validation (local export):** each page has one H1, a unique title under 60 characters and a description under 155, a self canonical, and FAQPage JSON-LD that matches the visible FAQs word for word. No em dashes and no mobile overflow at 375 px.

### Results — 12:40 run, 2026-11-23 (GSC data still through 2026-11-21)
- **Site:**
  - Hostinger (LiteSpeed, no x-vercel headers).
  - `/api/lead.php` returns 422 on an invalid lead.
  - `audit2.py`: 40 pages, one H1 each, no duplicate titles or descriptions.
  - `links.py`: 0 bad links.
- **Indexed:** 29 / 40, up from 24 / 38 this morning and 13 / 24 on the 19 Nov baseline.
  - Newly indexed: /lead-generation, /lead-generation/mortgage, /lead-generation/home-improvement, /blog/funnel-builder-vs-agency, /blog/what-is-a-lead-generation-funnel.
- **Impressions:** 221 / 28d (baseline 160), 7 clicks; 26 / 7d. Plan target is 500 at 30 days.
- **Top 10 keywords:** none of the 10 shows impressions yet (data ends 21 Nov, before today's changes).
  - Index status of target pages:
    - indexed: DFY, chiropractic, hvac, lead-generation, missed-call, pressure-washing;
    - Discovered, not indexed: landing-page-design, vsl-funnels, /services.
- **Changes:** none. Every target page was changed today (C13, C14), Search Console has no data after those changes, and the weekly guide was already covered today by the 2 new articles.
- **Note:** the description on /blog/what-is-a-lead-generation-funnel is 173 characters, so Google will shorten it. Left as is under the 7-day rule.

### Results — 00:40 run, 2026-11-24 (GSC data through 2026-11-22)
- **Site:**
  - Hostinger (LiteSpeed), lead.php returns 422 on an invalid lead.
  - Audit: 40 pages, no duplicate titles or descriptions, 0 bad links.
- **Indexed:** 29 / 40 (same as the last run; baseline 13 / 24).
  - URL Inspection now reports /services/vsl-funnels and /services/sales-funnels-for-coaches as "URL is unknown to Google" (both were "Discovered" last run).
  - /services/webinar-funnels moved from unknown to Discovered.
  - Both pages are in the live sitemap.
- **Impressions:** 215 / 28d, 7 clicks; 24 / 7d. Down from 221 because the 28-day window rolled forward.
  - Brand 35 of the 48 query impressions; plan target 500 at 30 days.
- **Top 10 keywords:** still 0 impressions for all 10. The data ends 22 Nov, before most of the 23 Nov changes take effect.
- **Changes:** no page edits. Every target page changed in the last 7 days, and there is no query evidence yet.
  - Sitemap resubmitted (204).
  - IndexNow (200) sent for /services, /services/vsl-funnels, /services/sales-funnels-for-coaches, /services/webinar-funnels and /services/landing-page-design.

### C15: 2026-11-24 · AEO and GEO plan, week 1 and the allowed parts (owner file CLAUDE_CODE_AEO_GEO_vaishali.md)
- Details and the schedule are in `seo/aeo-geo-plan-mdf.md`.
- **Before → after:**
  - **SEO.description** (Organization and WebSite schema, default og): old sentence with an em dash → one brand sentence. `priceRange` added.
  - **llms.txt:** added the brand sentence and a Key facts block; 3 new guides listed; em dashes removed.
  - **/services FAQ:** 5 → 7 (cost question and "Do sales funnels work?").
  - **/services/done-for-you-sales-funnels FAQ:** 6 → 7 (cost question).
  - **/lead-generation/chiropractic FAQ:** 5 → 6 (marketing ideas).
  - **Homepage meta description:** 159 characters → 151 characters.
  - **New** /blog/sales-funnel-vs-marketing-funnel.
- **Not changed:** robots.txt (already allows the AI crawlers). Body changes on pages edited on 23 Nov are scheduled from 30 Nov (7-day rule).
- **Validation (local export):**
  - Every changed page has one H1, a unique title under 60 characters and a description under 155.
  - FAQPage answers match the visible text. No em dashes on the changed pages.
  - The homepage still has em dashes in body copy; that fix is scheduled.

### Results — 12:40 run, 2026-11-24 (GSC data through 2026-11-22, refreshed)
- **Site:**
  - Hostinger (LiteSpeed, no x-vercel), lead.php returns 422 on an invalid lead.
  - Audit: 41 pages, no duplicate titles or descriptions, 0 bad links.
- **Indexed:** 29 / 41 (new guide added; baseline 13 / 24).
  - /services/vsl-funnels and /services/sales-funnels-for-coaches are back to Discovered.
  - /services/application-funnels and /blog/speed-to-lead now report "unknown".
  - /blog/sales-funnel-vs-marketing-funnel is unknown (published today).
- **Impressions:** 254 / 28d (from 215), 8 clicks; 63 / 7d (from 24). Brand 35 / 28d.
  - First non-brand impressions near the targets:
    - "chiropractic funnel" (pos 63) and "chiropractor funnel" (55);
    - "missed call text back service for small business" (72);
    - "vsl marketing" (57) and "video sales letter funnel" (41).
  - A2P 10DLC questions (pos 18 to 78) land on /blog/a2p-10dlc-registration.
- **Top 10 keywords:** none of the 10 exact targets has impressions yet.
- **Changes:** none.
  - The new queries have 1 to 4 impressions at positions 41 to 78, which is too thin for a title or content change.
  - The matching pages were changed within the last 7 days.
  - The AEO/GEO schedule starts on 30 Nov.

### Results — 00:40 run, 2026-11-25 (GSC data through 2026-11-23)
- **Site:**
  - Hostinger (LiteSpeed, no x-vercel), lead.php returns 422 on an invalid lead.
  - Audit: 41 pages, no duplicate titles or descriptions, 0 bad links.
- **Indexed:** 29 / 41, unchanged. URL Inspection status keeps moving between "unknown" and "Discovered" for uncrawled pages:
  - /services: now unknown.
  - /services/application-funnels and /blog/speed-to-lead: now Discovered.
- **Impressions:** 251 / 28d (254 last run), 8 clicks; 60 / 7d.
  - 28d query rows: brand 33, non-brand 30.
- **Target topics:**
  - "chiropractic funnel" (63) and "chiropractor funnel" (55) land on /lead-generation/chiropractic.
  - "missed call text back service for small business" (72) lands on /services/missed-call-text-back.
  - "video sales letter funnel" (41) and "vsl marketing" (57) land on /blog/what-is-a-vsl.
  - The 10 exact target keywords still have 0 impressions.
- **Changes:** none. Each query has 1 impression at position 41 or lower, and the target pages are inside the 7-day window. The AEO/GEO schedule starts on 30 Nov.

### C16: 2026-11-25 · SEO plan 25 Nov, week 1 and new pages (CLAUDE_CODE_milliondollarfunnels.md)
- Full table and the blocked list are in `seo/plan-2026-11-25-status.md`.
- **.htaccess:**
  - /post/sales-funnels-for-coaches: was a 301 to /services → now a 301 to /services/sales-funnels-for-coaches.
  - 6 more /post/ 301s, and /thank-you-page-page 301 → /thank-you.
  - /blog/category/*: was a 301 to /blog → now 410.
  - New 410s: /projects, /blog/tag, /blog/author and /_preview.
  - Tested on local Apache: every redirect returns 301 to the right target and every 410 path returns 410.
- **New pages:**
  - /thank-you (noindex);
  - /sales-funnel-agency;
  - /blog/sales-funnel-examples;
  - /blog/chiropractic-marketing-ideas.
- **Validation:**
  - Each new page has one H1, a self canonical, a title of 60 characters or fewer and a description of 155 or fewer.
  - JSON-LD parses, no em dashes, no mobile overflow.
  - No duplicate titles across 45 pages.
- **Not changed:**
  - Existing pages: all source files changed within 7 days.
  - City pages: the plan says do not build.
  - Lane fixes: they need the owner's yes.
- **Lane fixes approved by the owner (25 Nov):** retitle all four. Titles and meta changed now, which the 7-day rule allows; H1 and body follow from 30 Nov or 1 Dec.

  | Page | Before | After |
  |---|---|---|
  | /services/ai-appointment-setter | "AI Appointment Setter: Qualify and Book Leads in Under 60 Seconds" | "AI Follow-Up Inside Your Funnel: Qualify and Book Leads" |
  | /services/gohighlevel-agency | "GoHighLevel Agency & Experts: Funnels, CRM and Automations" | "GoHighLevel Funnel Setup: Funnels, Pipelines and Workflows" |
  | /services/meta-ads-management | "Facebook & Meta Ads Management for Lead Generation \| MDF™" | "Meta Ads for Funnels: Traffic Built for Your Funnel" |
  | /lead-generation/mortgage | "Mortgage Lead Generation for Brokers & Loan Officers \| MDF™" | "Funnels for Mortgage Brokers and Loan Officers" |
  | /lead-generation/solar | "Solar Lead Generation: Exclusive Homeowner Leads \| MDF™" | "Funnels for Solar Companies: Homeowner Lead Funnels" |
  | /blog/what-is-a-vsl | "What Is a VSL? Video Sales Letter Meaning, Structure & Examples" | "VSL Funnel: How a Video Sales Letter Funnel Works" |

  All new titles are 60 characters or fewer and all descriptions are under 155. No duplicate titles.

### Results — 12:40 run, 2026-11-25 (GSC data through 2026-11-23, refreshed)
- **Site:**
  - Hostinger (LiteSpeed, no x-vercel), lead.php returns 422 on an invalid lead.
  - 25 Nov redirects confirmed live: /post/n8n-automation-guide 301, /projects/x 410, /thank-you 200 noindex.
  - Audit: 44 pages, no duplicate titles or descriptions, 0 bad links.
- **Indexed:** 32 / 44 (from 29 / 41; baseline 13 / 24).
  - Newly indexed: /services/gohighlevel-agency, /blog/sales-funnel-vs-marketing-funnel, /blog/chiropractic-marketing-ideas.
  - /sales-funnel-agency and /services: Discovered.
  - /blog/sales-funnel-examples, /services/landing-page-design, /services/webinar-funnels and /services/sales-funnels-for-coaches: unknown.
- **Impressions:** 347 / 28d (from 251), 8 clicks; 156 / 7d (from 60).
  - 7d: non-brand 96, brand 5 (query rows).
- **First target keyword with impressions:** "lead generation funnel", 8 impressions, average position 40.5, landing on /blog/what-is-a-lead-generation-funnel. "done for you sales funnel": 1 impression at 50 on the target page.
- **Other clusters:**
  - Home improvement lead generation and leads: 13 queries, positions 55 to 77, all on /lead-generation/home-improvement.
  - VSL: "vsl funnel" (49.7), "what is a vsl" (47), "vsl meaning" (14), "vsl examples" (20) on /blog/what-is-a-vsl.
  - Low ticket funnel queries on /services/low-ticket-funnels.
  - "10dlc funnel" at position 2.
- **City or state queries:** "home improvement lead generation southern california" (2 impressions, position 64). One query, no client result there, so the City Page Plan rule says no page.
- **Changes:** none.
  - The pages getting these queries changed within the last 7 days.
  - The lead generation funnel retarget is already scheduled for 1 Dec.

### Results — 00:40 run, 2026-11-26 (GSC data through 2026-11-24)
- **Site:**
  - Hostinger (LiteSpeed, no x-vercel), lead.php returns 422 on an invalid lead.
  - 25 Nov redirects still live (301, 410, /thank-you 200).
  - Audit: 44 pages, no duplicate titles or descriptions, 0 bad links.
- **Indexed:** 39 / 44 (from 32 / 44; baseline 13 / 24).
  - Newly indexed: /sales-funnel-agency, /services/webinar-funnels, /services/client-acquisition-system, /services/landing-page-design, /services/sales-funnels-for-coaches, /blog/speed-to-lead, /blog/sales-funnel-examples.
  - Not indexed:
    - /services, /services/vsl-funnels and /services/application-funnels: Discovered.
    - /blog: Crawled, not indexed.
    - /faq: old-site duplicate, last crawl 13 Sep.
- **Impressions:** 342 / 28d (347 last run, as the window rolled forward), 8 clicks; 155 / 7d.
  - 7d: non-brand 96, brand 5.
- **Target keywords:**
  - "lead generation funnel" 8 impressions at 40.5 (/blog/what-is-a-lead-generation-funnel);
  - "vsl funnel" 3 at 49.7 (/blog/what-is-a-vsl);
  - "done for you sales funnel" 1 at 50 (target page).
  - Other targets 0.
- **Top non-brand queries:** a2p 10dlc registration and 10dlc registration (12 impressions, 47 to 53), low ticket funnel (5, 45.8), done for you vsl (5, 68).
- **City or state queries:** only "home improvement lead generation southern california" (2 impressions). No action under the City Page Plan.
- **Changes:** none.
  - Every page receiving queries changed in the last 7 days.
  - The scheduled rows start on 30 Nov and 1 Dec.

### C17: 2026-11-26 · Two-day SEO, AEO and GEO work, day 1 (owner request: metadata, titles and slugs proper, page and technical work)
- **Metadata audit of all 47 pages.** Before: 13 titles or descriptions over the length limits, and em dashes in 6 titles or descriptions. After: every title is 60 characters or fewer, every description 155 or fewer, no duplicates and no em dashes.
  - **Titles aligned with the 25 Nov plan:**
    - HVAC "HVAC Marketing Agency and Lead Generation"
    - chiropractic "Chiropractic Marketing and Lead Generation"
    - home improvement "Home Improvement Marketing and Lead Generation"
    - pressure washing "Pressure Washing Leads and Marketing"
    - landing page "Landing Page Design Services and Agency"
    - missed call "Missed Call Text Back Service and Software Setup"
    - VSL "VSL Funnels: Done-For-You Video Sales Letter Funnels"
    - webinar "Webinar Funnels That Fill Seats and Sell"
    - low ticket "Low Ticket Funnels: Tripwire Offers That Fund Your Ads"
    - application "Application Funnels for High Ticket Offers"
    - coaches "Sales Funnels for Coaches: Webinar, VSL and Application"
    - client acquisition "Client Acquisition System: Ads, Funnel and Follow-Up"
  - Lead generation funnel guide retitled "Lead Generation Funnel: What It Is, Stages and Examples". It ranks at 40.5 for that keyword.
  - Homepage "Million Dollar Funnel™: Done-For-You Sales Funnel Agency" (the brand spelling now matches the schema).
  - /funnels: "Sales Funnel Examples: 8 Live Funnels We Built" → "Funnel Designs: 8 Live Client Funnels We Built". This avoids competing with /blog/sales-funnel-examples.
  - Client acquisition description no longer uses the roofing receipts (sister-site lane); it uses the $1.52M case instead.
  - Legal pages: " — Million Dollar Funnel™" → " | Million Dollar Funnel™".
- **Slugs:** reviewed; all lowercase, hyphenated and descriptive. None changed, to avoid redirects. The retitled ai-appointment-setter, gohighlevel-agency and meta-ads-management keep their URLs, as the owner approved on 25 Nov.
- **Em dashes:** 108 removed from visible text on 21 pages, mechanically (" — " → ", ", and section labels "( 01 ) — X" → "( 01 ) · X"). One link sentence in the A2P guide was corrected by hand.
- **Schema:**
  - AboutPage, ContactPage (/book) and CollectionPage (/cases, /work-proof, /funnels) added, plus a BreadcrumbList on each.
  - /cases lists its case studies and /funnels its 8 designs.
  - Blog posts now carry dateModified and og modifiedTime from a new `updated` field.
- **Sitemap:** lastmod now comes from each page's last git change (blog from published or updated), instead of the build time on every URL.
- **Headers:** Strict-Transport-Security (max-age one year) added in .htaccess.
- **AEO refresh** (content unchanged since 16 to 18 Nov; owner asked for page work):
  - /blog/a2p-10dlc-registration: brand vs campaign table, "What is A2P verification?", "Do you need 10DLC registration for a lead generation funnel?", 3 FAQs (3 → 6). Matches the GSC queries a2p verification, 10dlc registration and 10dlc for lead generation.
  - /blog/speed-to-lead: speed to lead checklist table, 2 FAQs.
  - /blog/sales-funnel-stages: "What is a sales funnel?" answer block (1,300/mo keyword in the plan) and 2 FAQs.
  - All three show "Updated November 26, 2026".
- **/blog hub** (crawled, not indexed):
  - H1 "Sales Funnel and Lead Generation Guides", a clearer intro and guides grouped by topic.
  - Service cards now point to the main money pages.
- **llms.txt:** the retitled pages now carry their new names; the sister-site wording was removed.
- **Validation:**
  - 47 pages: one H1 each, self canonicals, FAQPage answers match the visible text, JSON-LD parses, no em dashes.
  - 67 internal links return 200. No mobile overflow on the 10 changed templates.
- **Day 2 (same session):**
  - New guide /blog/how-much-does-a-sales-funnel-cost: AEO price table with the published packages, what is included, cost factors, other costs and 5 FAQs (about 1,000 words). Links to /sales-funnel-agency, DFY, A2P, missed call and the coaching case.
  - New guide /blog/hvac-marketing-ideas: 10 ideas, a table and 5 FAQs (about 1,080 words). It states that no HVAC-only result is published; the closest home-service receipt is used. Links to /lead-generation/hvac, missed call and speed to lead.
  - Both are added to the blog topic list and llms.txt.

### C18: 2026-11-26 · Case hub buttons fixed (owner report: eCommerce and DTC buttons did nothing)
- **Cause:** the eCommerce card on /cases linked to /cases, the page it sits on, so clicking did nothing. All 12 niche chips on both cards were plain text, not links. The eCommerce library (126 cases) was removed from the hub on 31 Oct, but the card was kept.
- **Fix:**
  - New page /cases/ecommerce restores the library from the earlier hub: filters by niche and type, search, a load-more grid, and a breakdown modal with video. All 126 images and 79 videos are present.
  - Page schema: CollectionPage and BreadcrumbList. Title "eCommerce and DTC Case Studies: 126 Brand Results | MDF™".
  - "View eCommerce Cases" → /cases/ecommerce.
  - eCommerce chips link to filtered views: Apparel, Supplements, Beauty & Skincare, DTC Brands (by niche); Jewelry and Dropshipping (by search).
  - Lead generation chips link to their pages: roofing, personal injury, mortgage, chiropractic, home improvement, the coaching case and work proof.
  - MedSpa (no published proof) was replaced by Chiropractic and Home Services, which have pages and receipts.
  - The eCommerce card is no longer one big link around the chips (nested links).
- **Tested in Chromium:**
  - every chip and button opens the right page;
  - filters show the expected counts (Dropshipping 54, Beauty 10, Jewelry 1);
  - the modal opens, plays the video and closes with Esc; load more adds 12 cards;
  - no mobile overflow.

### Results — 12:40 run, 2026-11-26 (GSC data through 2026-11-24, refreshed)
- **Site:**
  - Hostinger (LiteSpeed, no x-vercel), lead.php returns 422 on an invalid lead.
  - 301, 410 and /thank-you checks pass; /cases/ecommerce returns 200.
  - Audit: 47 pages, no duplicate titles or descriptions, 0 bad links.
- **Indexed:** 41 / 47 (39 / 44 last run; baseline 13 / 24).
  - Both guides published today are already indexed (/blog/how-much-does-a-sales-funnel-cost, /blog/hvac-marketing-ideas).
  - Not indexed: /services, /services/vsl-funnels, /services/application-funnels, /blog, /faq, /cases/ecommerce (new).
- **Impressions:** 545 / 28d (342 last run), past the 30-day target of 500. 8 clicks; 358 / 7d (155 last run).
  - 7d: non-brand 275, brand 5.
- **Target keywords:**
  - "lead generation funnel" 30 impressions at 36.8 (8 at 40.5 last run), on /blog/what-is-a-lead-generation-funnel;
  - "vsl funnel" 4 at 53.5;
  - "done for you sales funnel" 1 at 50.
- **City queries:** only "home improvement lead generation southern california". No action.
- **Changes:** none. Every target page was changed today; the scheduled rows start on 30 Nov and 1 Dec.

### Results — 00:40 run, 2026-11-27 (GSC data through 2026-11-25)
- **Site:**
  - Hostinger (LiteSpeed, no x-vercel), lead.php returns 422 on an invalid lead.
  - 301, 410 and /thank-you checks pass; /cases/ecommerce returns 200.
  - Audit: 47 pages, no duplicate titles or descriptions, 0 bad links.
- **Indexed:** 41 / 47, unchanged. Not indexed: /services, /services/vsl-funnels, /services/application-funnels (back to Discovered), /blog, /faq, /cases/ecommerce.
- **Impressions:** 518 / 28d (545 last run, as the window rolled forward), 8 clicks; 350 / 7d.
  - 7d: non-brand 275, brand 4.
- **Top non-brand queries:**
  - lead generation funnel: 30 impressions at 36.8;
  - lead gen funnel: 10 at 42.8;
  - lead generation funnels: 8 at 32.1;
  - a2p 10dlc registration: 8 at 43.1, and 10dlc registration: 9 at 47.8;
  - home improvement lead generation: 8 at 67.2.
- **Target keywords:** lead generation funnel 30 at 36.8; vsl funnel 4 at 53.5; done for you sales funnel 1 at 50.
- **City queries:** only "home improvement lead generation southern california". No action.
- **Changes:** none. The pages receiving these queries changed on 26 Nov; the scheduled rows start on 30 Nov and 1 Dec.

### Results — 12:40 run, 2026-11-27 (GSC data through 2026-11-25, refreshed)
- **Site:**
  - Hostinger (LiteSpeed, no x-vercel), lead.php returns 422 on an invalid lead.
  - 301, 410, /thank-you and /cases/ecommerce checks pass.
  - Audit: 47 pages, no duplicate titles or descriptions, 0 bad links.
- **Indexed:** 41 / 47, unchanged.
  - /services and /services/vsl-funnels: now "unknown".
  - Also not indexed: /services/application-funnels, /blog, /faq, /cases/ecommerce.
- **Impressions:** 764 / 28d (518 last run), 8 clicks; 596 / 7d (350 last run).
  - 7d: non-brand 492, brand 4.
- **Target keywords:**
  - lead generation funnel: 54 at 38.4 (30 at 36.8);
  - done for you sales funnel: 8 at 28.8 (1 at 50), on the target page;
  - vsl funnel: 8 at 48 (4 at 53.5).
- **Other queries:**
  - lead gen funnel: 18 at 40.3;
  - funnel lead generation: 12 at 33.7;
  - video sales letter funnel: 11 at 32.3;
  - lead generation funnels: 11 at 32.1;
  - a2p 10dlc registration: 11 at 42.9;
  - home improvement leads: 12 at 68.1.
- **City queries:** only "home improvement lead generation southern california". No action.
- **Changes:** none. The pages receiving these queries changed on 26 Nov; the scheduled rows start on 30 Nov and 1 Dec.
