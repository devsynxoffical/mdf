export const ROUTES = {
  home: "/",
  book: "/book",
  workProof: "/work-proof",
  funnels: "/funnels",
  about: "/about",
  faq: "/faq",
  cases: "/cases",
  coachingLto: "/cases/coaching-lto",
  terms: "/terms",
  privacy: "/privacy",
} as const;

/** Homepage section anchors — keep in sync with component `id`s. */
export const SECTIONS = {
  top: "top",
  hero: "hero",
  funnels: "funnels",
  system: "system",
  results: "results",
  opinions: "opinions",
  process: "process",
  faq: "faq",
} as const;

export type SectionId = (typeof SECTIONS)[keyof typeof SECTIONS];

export function sectionHref(id: SectionId) {
  return `/#${id}`;
}

export function funnelHref(funnelId: string) {
  return `${ROUTES.funnels}#${funnelId}`;
}

export function caseHref(slug: string) {
  return `${ROUTES.cases}/${slug}`;
}
