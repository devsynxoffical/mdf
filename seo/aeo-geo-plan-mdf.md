# AEO and GEO plan: milliondollarfunnels.us status

Source: CLAUDE_CODE_AEO_GEO_vaishali.md and the AEO/GEO keyword report (DEVSYNX, 24 Nov 2026).
This repository only holds milliondollarfunnels.us. Sections 5 to 8 of the plan (milliondollarmedia.us, scalewithads.us, roofingsystems.co and bestseocompany.us) need their own repositories.

## Done on 24 Nov 2026 (C15)

- **robots.txt:** already allows GPTBot, OAI-SearchBot, PerplexityBot, Google-Extended, ClaudeBot and others. Verified live; no change needed.
- **llms.txt:**
  - Rewritten with the brand sentence and a "Key facts" block: who it is for, published prices, setup time, tools and dated published results.
  - Now lists all 3 new guides. Em dashes removed.
- **Organization schema:** now uses the one brand sentence and a `priceRange` taken from the published homepage packages.
- **Brand sentence**, to reuse everywhere (Clutch, GoodFirms, GoHighLevel directory, Google Business Profile, LinkedIn):
  "Million Dollar Funnel™ builds done-for-you sales funnels, lead generation funnels and follow-up automation for US service businesses, from first click to booked call."
- **FAQ, title and meta changes** (the only changes the 7-day rule allows on these pages):
  - /services: "How much does a sales funnel cost?" (published packages) and "Do sales funnels work?" (13,630-sale case).
  - /services/done-for-you-sales-funnels: "How much does a done-for-you sales funnel cost?" (packages and timeline).
  - /lead-generation/chiropractic: "What are good chiropractic marketing ideas?"
  - Homepage meta description: 159 → 151 characters, with the package price.
- **New guide:** /blog/sales-funnel-vs-marketing-funnel ("sales funnel vs marketing funnel", 140/mo, KD 33).
  - Answer box, comparison table, numbered steps, a published mortgage result and the coaching case result, 5 FAQs with FAQPage schema.
  - Links to the done-for-you page with the anchor "done-for-you sales funnel".

## Scheduled from 30 Nov 2026 (pages edited 23 Nov, 7-day rule)

| Page | Work |
|---|---|
| /services | "Pricing at a glance" table using the published packages ($1,497, $2,497, $4,997) and what each includes |
| /lead-generation/hvac | H2 "How do you get HVAC leads?" with a 40 to 60 word answer, numbered steps, and a Key facts list |
| /services/done-for-you-sales-funnels | H2 "What is included in a done-for-you sales funnel?" answer box with what is included, timeline and price |
| /lead-generation/chiropractic | "Chiropractic marketing ideas" list of 10, with the one published result attached to the prepaid offer idea |
| /services/missed-call-text-back | H2 "How does missed call text back work?" as numbered steps |
| /lead-generation/home-improvement, /lead-generation/mortgage | 2-sentence answer opening (who it is for, cost, one published result), then a Key facts list |
| /blog/funnel-builder-vs-agency | Comparison table: funnel builder software vs agency vs DIY ("best funnel builder") |
| Target pages and guides | "Updated: [month year]" under the H1 |
| Homepage | Replace the em dashes in the section labels and process copy |
| Week 4 | Guide "Do sales funnels work?" with one published case result |
| Homepage (from 1 Dec) | Title "Sales Funnel Agency: Done-For-You Funnels That Convert", answer block, results strip ($1.52M and coaching LTO), FAQ (SEO plan 25 Nov) |
| /lead-generation/hvac (from 1 Dec) | Title "HVAC Marketing Agency and Lead Generation"; target hvac marketing agency, hvac marketing, hvac facebook ads; seasonality; "Markets we serve" once the owner names real client states |
| /lead-generation/chiropractic (from 1 Dec) | Title "Chiropractic Marketing and Lead Generation"; target marketing for chiropractors, chiropractor marketing, chiropractic facebook ads; link to /blog/chiropractic-marketing-ideas |
| /services/landing-page-design, /services/missed-call-text-back (from 1 Dec) | Titles "Landing Page Design Services and Agency" and "Missed Call Text Back Service and Software"; A2P 10DLC note and ROI example |
| /lead-generation/home-improvement, /lead-generation/pressure-washing (from 1 Dec) | Titles "Home Improvement Marketing and Lead Generation" and "Pressure Washing Leads and Marketing"; seasonal offers |
| /blog/what-is-a-lead-generation-funnel (from 1 Dec) | Retarget to "lead generation funnel". Note 28 Nov: Google moved it to "Crawled, currently not indexed" while it led all queries (54 impressions at 38.4). /lead-generation also targets "lead generation funnel". Separate the two before more edits: the guide owns the informational query (what it is, stages, examples); the hub owns "lead generation funnels by industry" and "lead generation services". Point the hub's definition copy to the guide instead of repeating it. |
| Approved lane fixes, body and H1 (from 30 Nov for lib/services.ts, 1 Dec for the others) | AI appointment setter H1 and copy reframed as "AI follow-up inside your funnel"; GoHighLevel page H1 "GoHighLevel Funnel Setup"; Meta ads page H1 "Meta Ads for Funnels"; mortgage and solar H1 and intro as "Funnels for mortgage brokers" and "Funnels for solar companies"; /blog/what-is-a-vsl H1 and intro to the VSL funnel angle, with a link to milliondollarmedia.us/what-is-a-vsl/ |
| Funnel type pages (week 9) | VSL, webinar, low ticket, application, coaches and DFY upgrades per the 25 Nov plan |
| Week 10 and 11 | New niche case studies only if real results exist; refresh a2p-10dlc, speed-to-lead and sales-funnel-stages |

## Needs the owner

- **Key facts prices:** the industry pages' Key facts need a price range per service. Only funnel package prices are published, so we need the lead generation and missed call text back prices from you, or a yes to say "from $1,497".
- **sameAs links:** the real LinkedIn, Instagram, YouTube, Clutch and Google Business Profile URLs.
  - The footer currently links to plain linkedin.com and instagram.com, so no sameAs links were added to the schema.
- **Business phone number** for the Organization schema, if you want one shown.
- **Directory profiles:** Clutch, GoodFirms and the GoHighLevel partner directory, using the brand sentence above.
- **Disavow upload** (`docs/disavow.txt`).
- **GEO prompts:** check the 6 prompts monthly in ChatGPT, Gemini, Perplexity and Google AI Mode, and record whether the brand is named and which page is cited.
