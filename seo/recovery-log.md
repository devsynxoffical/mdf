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
