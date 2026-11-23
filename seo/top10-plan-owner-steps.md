# Top 10 plan (23 Nov 2026): steps only the owner can do for milliondollarfunnels.us

## 1. Add a Domain property in Search Console (Phase 1)
1. Search Console → Add property → **Domain** → `milliondollarfunnels.us`.
2. Google shows a TXT record. Add it in Hostinger: hPanel → Domains → milliondollarfunnels.us → DNS / Nameservers → Add record → Type **TXT**, Name **@**, Value = the text Google shows.
3. Click **Verify** in Search Console. This can take a few minutes up to a few hours.
4. Users and permissions → Add user → `<the service-account email from the Google key>` with **Owner**, so the daily reports can read the new property.
5. Keep the existing URL-prefix property. Both can exist at the same time.

## 2. Request indexing manually (Phase 1)
In Search Console → URL Inspection, paste each URL → **Request indexing**. Up to 10 per day, in this order:
1. https://milliondollarfunnels.us/lead-generation
2. https://milliondollarfunnels.us/services
3. https://milliondollarfunnels.us/services/landing-page-design
4. https://milliondollarfunnels.us/services/vsl-funnels
5. https://milliondollarfunnels.us/lead-generation/home-improvement
6. https://milliondollarfunnels.us/services/sales-funnels-for-coaches
7. https://milliondollarfunnels.us/services/application-funnels
8. https://milliondollarfunnels.us/blog/funnel-builder-vs-agency
9. https://milliondollarfunnels.us/faq
10. https://milliondollarfunnels.us/lead-generation/mortgage

## 3. Upload the disavow file (Phase 2)
1. Export referring domains from Semrush (Backlink Analytics → Referring Domains → Export).
2. Add every clear spam domain to `docs/disavow.txt`, one per line as `domain:example.com`. Clear spam means link farms, "dofollow cheap" packages and unrelated foreign spam. Two are already in the file.
3. Upload it at https://search.google.com/search-console/disavow-links → choose the milliondollarfunnels.us property.
4. Stop any paid link packages.

## 4. Authority building (Phase 4: 10–15 clean links per month)
- **Agency directories:** Clutch, GoodFirms, DesignRush, Sortlist, UpCity.
- **Business listings:** Google Business Profile, Crunchbase, LinkedIn company page, Trustpilot, BBB.
- **Guest posts:** 2 a month on marketing, funnel or home-services blogs, linking to one target page each.
- **Digital PR:** expert quotes through Qwoted and Featured.
