import type { ConsultingPlan } from "./types";
import { getUnlockedToolCount } from "./membership";
import { PASS_VALIDITY_DAYS } from "./pass-access";
import { SEO_TOOLS } from "./tools";

const CHECKOUT_URLS = {
  tier1: "https://bouhouchseo.bgng.io/product/Supporter-Tier",
  tier2: "https://bouhouchseo.bgng.io/product/Builder-Tier",
  tier3: "https://bouhouchseo.bgng.io/product/Studio-Tier",
  tier4: "https://bouhouchseo.bgng.io/product/Patron-Tier",
  tier5: "https://bouhouchseo.bgng.io/product/Contributor-Tier",
  tier6: "https://bouhouchseo.bgng.io/product/Maker-Tier",
  tier7: "https://bouhouchseo.bgng.io/product/Workshop-Tier",
  tier8: "https://bouhouchseo.bgng.io/product/Ultimate-Patron",
} as const;

const DURATION_FEATURE = `${PASS_VALIDITY_DAYS}-day workspace access (not lifetime)`;

function toolNamesForTier(tier: Parameters<typeof getUnlockedToolCount>[0]) {
  const count = getUnlockedToolCount(tier);
  return SEO_TOOLS.slice(0, count).map((t) => t.name);
}

function featureCount(tier: Parameters<typeof getUnlockedToolCount>[0]) {
  return `${getUnlockedToolCount(tier)} Strategy Report Generators`;
}

/** Paid passes only — no free tier. Prices in EUR. */
export const CURRENCY_CODE = "EUR";
export const CURRENCY_SYMBOL = "€";
export const CONSULTING_PLANS: ConsultingPlan[] = [
  {
    id: "tier-1",
    tier: 1,
    name: "Audit Essentials Pass",
    tagline: "Entry toolkit for freelance technical audits",
    price: 13.67,
    toolsUnlocked: getUnlockedToolCount(1),
    accessToken: "BH-T1-AUDIT1345",
    features: [
      featureCount(1),
      DURATION_FEATURE,
      "Meta, sitemap & crawl foundation tools",
      "Confidential PDF exports with health scores",
      "Personalized 3-step action plans per report",
    ],
    deliverables: toolNamesForTier(1).slice(-4),
    checkoutUrl: CHECKOUT_URLS.tier1,
  },
  {
    id: "tier-2",
    tier: 2,
    name: "Technical Foundation Pass",
    tagline: "Core on-page & crawlability diagnostics",
    price: 23.12,
    toolsUnlocked: getUnlockedToolCount(2),
    accessToken: "BH-T2-START2336",
    features: [
      featureCount(2),
      DURATION_FEATURE,
      "Robots, schema & keyword analysis",
      "Professional PDF report branding",
      "Ideal for recurring client retainers",
    ],
    deliverables: toolNamesForTier(2).slice(-4),
    checkoutUrl: CHECKOUT_URLS.tier2,
  },
  {
    id: "tier-3",
    tier: 3,
    name: "On-Page Optimization Pass",
    tagline: "Structured data, URLs & semantic structure",
    price: 25.49,
    toolsUnlocked: getUnlockedToolCount(3),
    accessToken: "BH-T3-GROW2423",
    features: [
      featureCount(3),
      DURATION_FEATURE,
      "Full on-page architecture suite",
      "Stakeholder-ready audit summaries",
      "Core Web Vitals & hreflang tools included",
    ],
    deliverables: toolNamesForTier(3).slice(-4),
    checkoutUrl: CHECKOUT_URLS.tier3,
  },
  {
    id: "tier-4",
    tier: 4,
    name: "Professional Strategy Pass",
    tagline: "Agency-grade reporting for mid-market clients",
    price: 35.53,
    toolsUnlocked: getUnlockedToolCount(4),
    accessToken: "BH-T4-PRO3397",
    features: [
      featureCount(4),
      DURATION_FEATURE,
      "Competitive & social metadata tools",
      "Internal link equity mapping",
      "Most chosen by independent consultants",
    ],
    deliverables: toolNamesForTier(4).slice(-4),
    checkoutUrl: CHECKOUT_URLS.tier4,
    popular: true,
  },
  {
    id: "tier-5",
    tier: 5,
    name: "Competitive Intelligence Pass",
    tagline: "SERP features, E-E-A-T & duplicate detection",
    price: 37.78,
    toolsUnlocked: getUnlockedToolCount(5),
    accessToken: "BH-T5-ADV3554",
    features: [
      featureCount(5),
      DURATION_FEATURE,
      "SERP feature opportunity finder",
      "E-E-A-T & duplicate content scoring",
      "Priority manual token fulfillment",
    ],
    deliverables: toolNamesForTier(5).slice(-4),
    checkoutUrl: CHECKOUT_URLS.tier5,
  },
  {
    id: "tier-6",
    tier: 6,
    name: "Expert Delivery Pass",
    tagline: "Indexation, pagination & backlink analysis",
    price: 45.79,
    toolsUnlocked: getUnlockedToolCount(6),
    accessToken: "BH-T6-EXPERT4547",
    features: [
      featureCount(6),
      DURATION_FEATURE,
      "Indexability & pagination auditors",
      "Backlink anchor text risk analysis",
      "FAQ schema generator included",
    ],
    deliverables: toolNamesForTier(6).slice(-4),
    checkoutUrl: CHECKOUT_URLS.tier6,
  },
  {
    id: "tier-7",
    tier: 7,
    name: "Elite Consulting Pass",
    tagline: "Local SEO, log files & AI search readiness",
    price: 49.56,
    toolsUnlocked: getUnlockedToolCount(7),
    accessToken: "BH-T7-ELITE4913",
    features: [
      featureCount(7),
      DURATION_FEATURE,
      "Log file crawl & local citation tools",
      "AI search visibility preparation",
      "28 generators — near-complete toolkit",
    ],
    deliverables: toolNamesForTier(7).slice(-4),
    checkoutUrl: CHECKOUT_URLS.tier7,
    bestValue: true,
  },
  {
    id: "tier-8",
    tier: 8,
    name: "Ultimate Partner Pass",
    tagline: "All 30 generators incl. enterprise health audit",
    price: 67.48,
    toolsUnlocked: getUnlockedToolCount(8),
    accessToken: "BH-T8-ULT6662",
    features: [
      featureCount(8),
      DURATION_FEATURE,
      "Full Technical SEO Health Scorer",
      "Site Architecture Auditor (Tier 8 exclusive)",
      "Maximum tier — partner-level audit coverage",
    ],
    deliverables: [
      "All 30 Strategy Report Generators",
      "Full Technical SEO Health Scorer",
      "Site Architecture Auditor",
    ],
    checkoutUrl: CHECKOUT_URLS.tier8,
  },
];

export function getPlanById(planId: string): ConsultingPlan | undefined {
  return CONSULTING_PLANS.find((p) => p.id === planId);
}

export function formatPrice(price: number): string {
  return `${CURRENCY_SYMBOL}${price.toFixed(2)}`;
}

export function formatPriceLabel(price: number): string {
  return `${formatPrice(price)} ${CURRENCY_CODE}`;
}
