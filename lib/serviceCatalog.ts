/**
 * The full list of services Million Dollar Funnel™ delivers, each mapped to the search
 * term it should rank for and the page that targets it. `volume` is measured US monthly
 * search volume (OpenSEO, Nov 2026); null = not measured yet.
 */
export type CatalogService = {
  name: string;
  desc: string;
  keyword: string;
  volume: number | null;
  href: string;
  group: "Lead generation" | "Funnels" | "Ads & traffic" | "CRM & automation" | "AI & follow-up" | "Strategy";
};

export const SERVICE_CATALOG: CatalogService[] = [
  // Lead generation by industry
  { group: "Lead generation", name: "HVAC lead generation", desc: "Exclusive replacement, install and repair leads for heating and cooling companies.", keyword: "hvac lead generation", volume: 1300, href: "/lead-generation/hvac" },
  { group: "Lead generation", name: "Mortgage lead generation", desc: "Refinance, purchase and investor leads in your own ad account.", keyword: "mortgage leads", volume: 1300, href: "/lead-generation/mortgage" },
  { group: "Lead generation", name: "Solar lead generation", desc: "Qualified homeowner solar leads and consultation booking.", keyword: "solar leads", volume: 1600, href: "/lead-generation/solar" },
  { group: "Lead generation", name: "Chiropractic marketing", desc: "Prepaid new-patient consults from local Meta Ads.", keyword: "chiropractic marketing", volume: 1300, href: "/lead-generation/chiropractic" },
  { group: "Lead generation", name: "Pressure washing leads", desc: "Residential and commercial quote requests with photos and details.", keyword: "pressure washing leads", volume: 320, href: "/lead-generation/pressure-washing" },
  { group: "Lead generation", name: "Home improvement lead generation", desc: "Quote requests with photos and job details for remodeling and exterior contractors.", keyword: "home improvement lead generation", volume: 1000, href: "/lead-generation/home-improvement" },
  { group: "Lead generation", name: "Lead generation funnels", desc: "Ads, a qualifying funnel and follow-up as one system, by industry.", keyword: "lead generation funnel", volume: 1000, href: "/lead-generation" },

  // Funnels
  { group: "Funnels", name: "Done-for-you sales funnels", desc: "Copy, design, build, integrations and tracking, finished for you.", keyword: "done for you sales funnel", volume: 170, href: "/services/done-for-you-sales-funnels" },
  { group: "Funnels", name: "VSL funnels", desc: "Video sales letter pages with application or checkout.", keyword: "video sales letter", volume: 590, href: "/services/vsl-funnels" },
  { group: "Funnels", name: "Webinar funnels", desc: "Registration, reminders, replay and booking flow.", keyword: "webinar funnel", volume: 390, href: "/services/webinar-funnels" },
  { group: "Funnels", name: "Low-ticket funnels", desc: "Tripwires, order bumps and upsells that fund ad spend.", keyword: "tripwire funnel", volume: 50, href: "/services/low-ticket-funnels" },
  { group: "Funnels", name: "Application funnels", desc: "Qualify high-ticket prospects before the sales call.", keyword: "application funnel", volume: 40, href: "/services/application-funnels" },
  { group: "Funnels", name: "Sales funnels for coaches", desc: "Webinar, VSL, low-ticket and application funnels for coaches and consultants.", keyword: "sales funnel for coaches", volume: 140, href: "/services/sales-funnels-for-coaches" },
  { group: "Funnels", name: "High-ticket sales funnels", desc: "Offer, proof, application and booking for premium services.", keyword: "high ticket sales funnel", volume: 50, href: "/" },
  { group: "Funnels", name: "Landing page design", desc: "Fast, focused pages built around one offer and one action.", keyword: "landing page design agency", volume: 390, href: "/services/landing-page-design" },
  { group: "Funnels", name: "Sales funnel examples & audits", desc: "Eight live funnels to learn from, and audits of yours.", keyword: "sales funnel examples", volume: 480, href: "/funnels" },

  // Ads & traffic
  { group: "Ads & traffic", name: "Facebook & Meta Ads management", desc: "Lead-generation campaigns judged on cost per lead and per call.", keyword: "facebook ads management", volume: null, href: "/services/meta-ads-management" },
  { group: "Ads & traffic", name: "Instagram ads for lead generation", desc: "Placements and creative built for Instagram feeds and Reels.", keyword: "instagram ads for lead generation", volume: null, href: "/services/meta-ads-management" },
  { group: "Ads & traffic", name: "Ad creative & copywriting", desc: "Hooks, angles and video scripts tested for lower cost per lead.", keyword: "ad creative agency", volume: null, href: "/services/meta-ads-management" },
  { group: "Ads & traffic", name: "Client acquisition system", desc: "Traffic, funnel, follow-up and CRM built as one machine.", keyword: "client acquisition", volume: 1600, href: "/services/client-acquisition-system" },

  // CRM & automation
  { group: "CRM & automation", name: "GoHighLevel setup & agency services", desc: "Funnels, pipelines, workflows and calendars in HighLevel.", keyword: "gohighlevel agency", volume: 320, href: "/services/gohighlevel-agency" },
  { group: "CRM & automation", name: "A2P 10DLC registration", desc: "Business texting registration so your SMS gets delivered.", keyword: "a2p 10dlc registration", volume: 480, href: "/blog/a2p-10dlc-registration" },
  { group: "CRM & automation", name: "CRM pipeline automation", desc: "Leads move through stages automatically based on what they do.", keyword: "crm automation", volume: null, href: "/services/gohighlevel-agency" },
  { group: "CRM & automation", name: "Email & SMS follow-up", desc: "Nurture, reminder and reactivation sequences.", keyword: "sms follow up automation", volume: null, href: "/services/client-acquisition-system" },
  { group: "CRM & automation", name: "Appointment reminders & no-show recovery", desc: "Confirmations, reminders and rescheduling flows.", keyword: "appointment reminder automation", volume: null, href: "/services/ai-appointment-setter" },

  // AI & follow-up
  { group: "AI & follow-up", name: "AI appointment setter", desc: "Replies to new leads in seconds, qualifies and books.", keyword: "ai appointment setter", volume: 320, href: "/services/ai-appointment-setter" },
  { group: "AI & follow-up", name: "Missed call text back", desc: "Every missed call gets an SMS and a booking link.", keyword: "missed call text back", volume: 480, href: "/services/missed-call-text-back" },
  { group: "AI & follow-up", name: "Speed-to-lead automation", desc: "Instant text, email and call alerts the moment a lead arrives.", keyword: "speed to lead", volume: 1000, href: "/blog/speed-to-lead" },
  { group: "AI & follow-up", name: "AI calling agent", desc: "Voice AI that calls new leads, qualifies and books.", keyword: "ai calling agent", volume: 390, href: "/services/ai-appointment-setter" },

  // Strategy
  { group: "Strategy", name: "High-ticket offer creation", desc: "Shape an offer worth paying for before spending on traffic.", keyword: "high ticket offer", volume: 90, href: "/services/client-acquisition-system" },
];

export const CATALOG_GROUPS = ["Lead generation", "Funnels", "Ads & traffic", "CRM & automation", "AI & follow-up", "Strategy"] as const;
