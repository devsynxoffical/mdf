export type VideoCategory = {
  slug: string;
  label: string;
};

export type PortfolioVideo = {
  id: string; // Vimeo ID
  title: string;
  duration: number; // seconds
  category: string; // category slug
};

export const CATEGORIES: VideoCategory[] = [
  { slug: "roofing", label: "Roofing" },
  { slug: "supplements", label: "Supplements & Health" },
  { slug: "recruitment", label: "Recruitment & Talent" },
  { slug: "events", label: "Events & Keynotes" },
  { slug: "hvac", label: "HVAC & Climate" },
  { slug: "solar", label: "Solar Energy" },
  { slug: "agency", label: "Agency Owner" },
  { slug: "chiro", label: "Chiropractic" },
  { slug: "finance", label: "Finance & B2B Lending" },
  { slug: "mva", label: "MVA Law" },
  { slug: "saas", label: "SaaS & Tech" },
  { slug: "windows", label: "Window & Doors" },
  { slug: "carpet", label: "Carpet Cleaning" },
  { slug: "vsl", label: "VSL Scripts & Funnels" },
];

export const VIDEOS: PortfolioVideo[] = [
  // Roofing
  { id: "1203105527", title: "Equinox Roof Conversion 1", duration: 61, category: "roofing" },
  { id: "1203105510", title: "Equinox Storm Roofing 2", duration: 57, category: "roofing" },
  { id: "1203105488", title: "Equinox Replacement Roof 3", duration: 51, category: "roofing" },
  { id: "1203105494", title: "Equinox High-ROAS Roof 4", duration: 36, category: "roofing" },
  { id: "1203105572", title: "Equinox Roofing Scale 5", duration: 48, category: "roofing" },
  { id: "1203105532", title: "Equinox Roof Ad 6", duration: 51, category: "roofing" },
  // Supplements & Health
  { id: "1203105580", title: "Gummies Bio-Nourish Ad 1", duration: 66, category: "supplements" },
  { id: "1203828901", title: "DTC Health Gummies Reel 2", duration: 64, category: "supplements" },
  { id: "1203828900", title: "DTC Wellness Formulation 3", duration: 87, category: "supplements" },
  { id: "1203828899", title: "Nutritional Health Ad 4", duration: 99, category: "supplements" },
  // Recruitment & Talent
  { id: "1203105467", title: "LinkedIn Executive Talent Acquisition 1", duration: 60, category: "recruitment" },
  { id: "1203105458", title: "LinkedIn Talent Recruitment Ad 2", duration: 43, category: "recruitment" },
  // Events & Keynotes
  { id: "1203105416", title: "Commercial Finance & Keynote Event 1", duration: 31, category: "events" },
  { id: "1203105447", title: "Seven Fathom B2B SaaS Event Reel 2", duration: 55, category: "events" },
  { id: "1203105413", title: "Seven Fathom Product Walkthrough Event 3", duration: 65, category: "events" },
  { id: "1203105414", title: "Seven Fathom Feature Breakdown Event 4", duration: 41, category: "events" },
  { id: "1203105415", title: "Capital Growth Strategy Event 5", duration: 29, category: "events" },
  // HVAC & Climate
  { id: "1203812276", title: "HVAC Climate Control Ad 1", duration: 41, category: "hvac" },
  { id: "1203812274", title: "HVAC Seasonal Offer Ad 2", duration: 29, category: "hvac" },
  { id: "1203812272", title: "HVAC Comfort Engine 3", duration: 34, category: "hvac" },
  { id: "1203812271", title: "HVAC Heat Pump Promo 4", duration: 31, category: "hvac" },
  { id: "1203815881", title: "$0 Down Home Heater Special 5", duration: 37, category: "hvac" },
  // Solar Energy
  { id: "1203808485", title: "California Solar Clean Energy 1", duration: 30, category: "solar" },
  { id: "1203808486", title: "California Solar Utility Savings 2", duration: 41, category: "solar" },
  { id: "1203828547", title: "Solar California Federal Incentive 3", duration: 24, category: "solar" },
  { id: "1203828545", title: "Solar Power Lock-In 4", duration: 24, category: "solar" },
  { id: "1203828548", title: "Solar Battery Storage Ad 5", duration: 43, category: "solar" },
  { id: "1203828546", title: "Solar Installation Campaign 6", duration: 28, category: "solar" },
  // Agency Owner
  { id: "1203105308", title: "7-Figure Agency Acquisition 1", duration: 35, category: "agency" },
  { id: "1203105309", title: "Agency Scale & CAPI Engine 2", duration: 52, category: "agency" },
  { id: "1203808613", title: "High-Ticket Client Blueprint 3", duration: 53, category: "agency" },
  // Chiropractic
  { id: "1203812402", title: "Spine & Pain Chiropractic Ad 1", duration: 47, category: "chiro" },
  { id: "1203812401", title: "Wellness Chiro Special Offer 2", duration: 52, category: "chiro" },
  { id: "1203812400", title: "Chiropractic Spinal Care 3", duration: 45, category: "chiro" },
  // Finance & B2B Lending
  { id: "1203818782", title: "Commercial Finance Capital 1", duration: 55, category: "finance" },
  { id: "1203818781", title: "Capital Growth Strategy 2", duration: 42, category: "finance" },
  { id: "1207996165", title: "B2B Lending Acquisition 3", duration: 38, category: "finance" },
  { id: "1207996164", title: "Fintech Growth System 4", duration: 41, category: "finance" },
  { id: "1207996161", title: "Corporate Capital Campaign 5", duration: 46, category: "finance" },
  { id: "1207996163", title: "Financial Advisory Engine 6", duration: 49, category: "finance" },
  // MVA Law
  { id: "1203816135", title: "Personal Injury MVA Law 1", duration: 31, category: "mva" },
  { id: "1203816133", title: "MVA Legal Client Acquisition 2", duration: 32, category: "mva" },
  { id: "1203816132", title: "MVA Auto Accident Law 3", duration: 28, category: "mva" },
  { id: "1203816131", title: "MVA Injury Settlement Ad 4", duration: 35, category: "mva" },
  { id: "1203816465", title: "MVA Legal Retainer Campaign 5", duration: 36, category: "mva" },
  { id: "1203816469", title: "MVA Accident Claim Ad 6", duration: 42, category: "mva" },
  { id: "1203816506", title: "MVA Law Firm Scale 7", duration: 44, category: "mva" },
  { id: "1219790482", title: "Personal Injury MVA Campaign 8", duration: 48, category: "mva" },
  { id: "1219790483", title: "MVA Auto Accident Settlement Ad 9", duration: 52, category: "mva" },
  { id: "1219790484", title: "MVA Legal Client Retainer Engine 10", duration: 41, category: "mva" },
  // SaaS & Tech
  { id: "1203819145", title: "Corporate Hiring & SaaS Engine 1", duration: 39, category: "saas" },
  { id: "1203819144", title: "Career Growth SaaS Funnel 2", duration: 37, category: "saas" },
  { id: "1203819143", title: "SaaS Conversion Platform 3", duration: 42, category: "saas" },
  { id: "1203819315", title: "Keynote Event & SaaS Highlights 4", duration: 41, category: "saas" },
  // Window & Doors
  { id: "1203827387", title: "Window & Door Installation Ad 1", duration: 40, category: "windows" },
  { id: "1203827386", title: "Window Replacement Promo 2", duration: 38, category: "windows" },
  // Carpet Cleaning
  { id: "1203827815", title: "Deep Carpet Cleaning Promo 1", duration: 45, category: "carpet" },
  { id: "1203827814", title: "Carpet Sanitation Offer 2", duration: 42, category: "carpet" },
  // VSL Scripts & Funnels
  { id: "1203105582", title: "Longform Client VSL Script 1", duration: 40, category: "vsl" },
  { id: "1203105583", title: "Direct-Response VSL Funnel 2", duration: 38, category: "vsl" },
  { id: "1208393043", title: "High-Ticket VSL Breakdown 3", duration: 45, category: "vsl" },
  { id: "1208395435", title: "Scale With Ads VSL Architecture 4", duration: 49, category: "vsl" },
];

export function categoryLabel(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

export function videosByCategory(slug: string) {
  return VIDEOS.filter((v) => v.category === slug);
}

/** One representative creative per niche for the home-page gallery arc. */
export const GALLERY_FEATURE_IDS = [
  "1203105527", // roofing
  "1203105580", // supplements
  "1203812276", // hvac
  "1203808485", // solar
  "1203818782", // finance
  "1203816135", // mva
  "1203819145", // saas
  "1203812402", // chiro
  "1203105308", // agency
];

export function vimeoThumb(id: string) {
  return `https://vumbnail.com/${id}.jpg`;
}

export function vimeoEmbed(id: string) {
  return `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0`;
}

/** Muted, looping, chrome-less embed used for inline card previews. */
export function vimeoBackground(id: string) {
  return `https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&autopause=0`;
}
