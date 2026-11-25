# milliondollarfunnels.us: SEO plan of 25 Nov 2026, status

Sources:
- `milliondollarfunnels_Page_Map_25-Nov-2026.csv` (repo root);
- the SEO/AEO/GEO Plan and City Page Plan PDFs (25 Nov 2026);
- CLAUDE_CODE_milliondollarfunnels.md.

## Step 1: inspection

**Site setup**
- Next.js 14 static export on Hostinger.
- Redirects and 410s live in `public/.htaccess`.
- The sitemap comes from `app/sitemap.ts`.
- Schema comes from `lib/seo.ts` (Organization and WebSite graph) plus page-level Service, FAQPage, BreadcrumbList and BlogPosting.

| CSV row | URL | Status on 25 Nov |
|---|---|---|
| Fix | /post/* (7) | Missing (404) → now 301 |
| Fix | /projects/*, /blog/tag/*, /blog/category/*, /blog/author/*, /_preview/ | 404 (blog/category was a 301 to /blog) → now 410 |
| Fix | /thank-you-page-page, /thank-you | Both 404 → /thank-you built (noindex), old URL 301s to it |
| Fix | 41 sitemap URLs | Exist; request indexing 10 per day (owner) |
| Fix | /services/ai-appointment-setter | Exists; owner decision |
| Fix | /services/gohighlevel-agency | Exists; owner decision |
| Fix | /services/meta-ads-management | Exists; owner decision |
| Fix | /lead-generation/mortgage, /solar | Exist; owner decision |
| Fix | /blog/what-is-a-vsl | Exists; owner decision |
| Upgrade | / | Exists; file changed 24 Nov (7-day rule) |
| New | /sales-funnel-agency | Missing → built |
| Upgrade | /lead-generation/hvac, /chiropractic | Exist; changed 23 to 24 Nov (7-day rule) |
| Upgrade | /services/landing-page-design, /missed-call-text-back | Exist; changed 23 to 24 Nov (7-day rule) |
| Upgrade | /lead-generation/home-improvement, /pressure-washing | Exist; changed 23 to 24 Nov (7-day rule) |
| Upgrade | /blog/what-is-a-lead-generation-funnel | Exists; created 23 Nov (7-day rule) |
| New blog | /blog/sales-funnel-examples | Missing → written |
| New blog | /blog/chiropractic-marketing-ideas | Missing → written |
| Upgrade | 6 funnel type pages | Exist; changed 23 to 24 Nov (7-day rule) |
| Upgrade | /blog/a2p-10dlc-registration, /speed-to-lead, /sales-funnel-stages | Exist; week 11 |
| City | none | Not built: 0 demand (City Page Plan) |

**Duplicate without a canonical:** /faq. It already has a self canonical. Google's last crawl was on 13 Sep 2026, from the old site, and it chose an unrelated canonical. Needs a fresh crawl (Request indexing).

## Done on 25 Nov (C16)

- **Week 1 redirects and 410s:**
  - 7 × 301 for /post/*.
  - 301 /thank-you-page-page → /thank-you.
  - 410 for /projects, /blog/tag, /blog/category, /blog/author and /_preview, all with any subpath. The 410 shows the 404 page.
- **/thank-you:** new page, noindex follow, not in the sitemap.
- **New pages** (the run limit is 3):
  - /sales-funnel-agency: about 1,400 words. Answer block, what we build, a published price table, builder vs freelancer vs agency table, process, 4 case results, 6 FAQs, Service schema with offers, and Breadcrumb schema.
  - /blog/sales-funnel-examples: about 1,300 words, 8 examples with published results.
  - /blog/chiropractic-marketing-ideas: about 1,170 words, 10 ideas and one published result.
- **Links:**
  - The sitewide footer (Solutions) links to /sales-funnel-agency.
  - llms.txt lists the 3 new pages.
  - The /lead-generation card text no longer names roofing and personal injury.

## Blocked by the 7-day rule (earliest dates)

| Item | File last changed | Earliest |
|---|---|---|
| Homepage retitle "Sales Funnel Agency: Done-For-You Funnels That Convert" and answer block | app/page.tsx, 24 Nov | 1 Dec |
| HVAC and chiropractic upgrades (title per plan, answer block, Markets we serve) | lib/industries.ts, 24 Nov | 1 Dec |
| Landing page design and missed call text back upgrades | lib/serviceLandings.ts, 24 Nov | 1 Dec |
| Home improvement and pressure washing upgrades | lib/industries.ts, 24 Nov | 1 Dec |
| /blog/what-is-a-lead-generation-funnel retarget | lib/blog.ts, 24 Nov | 1 Dec |
| VSL, webinar and low ticket pages | lib/services.ts, 23 Nov | 30 Nov |
| Application, coaches and DFY pages | lib/serviceLandings.ts, 24 Nov | 1 Dec |

## Needs the owner

- **Step 3 lane fixes** (each needs a yes):
  - /services/ai-appointment-setter;
  - /services/gohighlevel-agency;
  - /services/meta-ads-management;
  - /lead-generation/mortgage and /solar;
  - /blog/what-is-a-vsl and its link to milliondollarmedia.us.
- **Markets we serve:** the states and metros with real clients for HVAC, chiropractic, home improvement and pressure washing. Published receipts only show a Florida home-services company and a "US" chiropractic clinic.
- Disavow upload (225 domains), Bing Webmaster Tools, Request indexing 10 per day.
