import type { PlanLevel } from "./types";

export const STORAGE_KEY = "bouhouch-seo-plan-level";
export const STORAGE_EXPIRY_KEY = "bouhouch-seo-pass-expires";
export const PASS_VALIDITY_DAYS = 30;

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export interface StoredPass {
  tier: PlanLevel;
  expiresAt: number;
}

export function getPassDurationMs(): number {
  return PASS_VALIDITY_DAYS * MS_PER_DAY;
}

export function createExpiryTimestamp(fromMs: number = Date.now()): number {
  return fromMs + getPassDurationMs();
}

export function isExpired(expiresAt: number | null): boolean {
  if (!expiresAt) return true;
  return Date.now() >= expiresAt;
}

export function getDaysRemaining(expiresAt: number | null): number {
  if (!expiresAt || isExpired(expiresAt)) return 0;
  return Math.max(0, Math.ceil((expiresAt - Date.now()) / MS_PER_DAY));
}

export function formatExpiryDate(expiresAt: number): string {
  return new Date(expiresAt).toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function readStoredPass(): StoredPass | null {
  if (typeof window === "undefined") return null;

  const tierRaw = localStorage.getItem(STORAGE_KEY);
  const expiresRaw = localStorage.getItem(STORAGE_EXPIRY_KEY);

  if (!tierRaw || !expiresRaw) return null;

  const tier = Number(tierRaw) as PlanLevel;
  const expiresAt = Number(expiresRaw);

  if (tier < 0 || tier > 8 || Number.isNaN(expiresAt)) return null;

  if (isExpired(expiresAt)) {
    clearStoredPass();
    return null;
  }

  return { tier, expiresAt };
}

export function writeStoredPass(tier: PlanLevel, expiresAt?: number): StoredPass {
  const expiry = expiresAt ?? createExpiryTimestamp();
  localStorage.setItem(STORAGE_KEY, String(tier));
  localStorage.setItem(STORAGE_EXPIRY_KEY, String(expiry));
  return { tier, expiresAt: expiry };
}

export function clearStoredPass(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STORAGE_EXPIRY_KEY);
}

export function hasActivePass(tier: PlanLevel, expiresAt: number | null): boolean {
  return tier > 0 && !isExpired(expiresAt);
}
