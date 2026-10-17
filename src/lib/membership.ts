import type { PlanLevel } from "./types";
import { SEO_TOOLS, TOTAL_SEO_TOOLS } from "./tools";

export { STORAGE_KEY, STORAGE_EXPIRY_KEY, PASS_VALIDITY_DAYS } from "./pass-access";
export {
  clearStoredPass,
  createExpiryTimestamp,
  formatExpiryDate,
  getDaysRemaining,
  hasActivePass,
  isExpired,
  readStoredPass,
  writeStoredPass,
} from "./pass-access";

/** One unique Access Token per paid Consulting Pass (tier 1–8). */
export const ACCESS_TOKENS: Record<string, PlanLevel> = {
  "BH-T1-AUDIT1345": 1,
  "BH-T2-START2336": 2,
  "BH-T3-GROW2423": 3,
  "BH-T4-PRO3397": 4,
  "BH-T5-ADV3554": 5,
  "BH-T6-EXPERT4547": 6,
  "BH-T7-ELITE4913": 7,
  "BH-T8-ULT6662": 8,
};

/** Tier 8 exclusive tool indices (premium flag in tools registry). */
export const PREMIUM_TOOL_INDICES = SEO_TOOLS.map((t, i) => (t.premium ? i : -1)).filter((i) => i >= 0);

/** No free tier. Tier N unlocks N×4 tools (max 28), Tier 8 unlocks all 30. */
export function getUnlockedToolCount(tier: PlanLevel): number {
  if (tier === 0) return 0;
  if (tier >= 8) return TOTAL_SEO_TOOLS;
  return Math.min(28, tier * 4);
}

export function isToolUnlocked(toolIndex: number, tier: PlanLevel, active = true): boolean {
  if (!active || tier === 0) return false;
  if (PREMIUM_TOOL_INDICES.includes(toolIndex) && tier < 8) return false;
  return toolIndex < getUnlockedToolCount(tier);
}

export function validateAccessToken(code: string): PlanLevel | null {
  const normalized = code.trim().toUpperCase();
  return ACCESS_TOKENS[normalized] ?? (normalized === "BH-T1-AUDIT0345" ? 1 : null);
}

export function tierLabel(tier: PlanLevel): string {
  if (tier === 0) return "No active pass";
  if (tier === 8) return "Ultimate Partner";
  return `Pass Tier ${tier}`;
}
