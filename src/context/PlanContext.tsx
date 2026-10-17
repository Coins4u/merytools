"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  formatExpiryDate,
  getDaysRemaining,
  getUnlockedToolCount,
  hasActivePass,
  readStoredPass,
  validateAccessToken,
  writeStoredPass,
  createExpiryTimestamp,
} from "@/lib/membership";
import type { PlanLevel } from "@/lib/types";

interface PlanContextValue {
  planLevel: PlanLevel;
  expiresAt: number | null;
  daysRemaining: number;
  isActive: boolean;
  unlockedCount: number;
  applyToken: (code: string) => { success: boolean; message: string };
}

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [planLevel, setPlanLevelState] = useState<PlanLevel>(0);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readStoredPass();
    if (stored) {
      setPlanLevelState(stored.tier);
      setExpiresAt(stored.expiresAt);
    }
    setHydrated(true);
  }, []);

  const applyToken = useCallback(
    (code: string): { success: boolean; message: string } => {
      const tier = validateAccessToken(code);
      if (tier === null) {
        return {
          success: false,
          message: "Invalid Access Token. Contact me if you paid but have not received your code yet.",
        };
      }

      const currentlyActive = hasActivePass(planLevel, expiresAt);

      if (currentlyActive && tier < planLevel) {
        return {
          success: false,
          message: `This token is for a lower tier (Tier ${tier}). Your Tier ${planLevel} pass is active until ${formatExpiryDate(expiresAt!)}.`,
        };
      }

      const stored = writeStoredPass(tier, createExpiryTimestamp());
      setPlanLevelState(stored.tier);
      setExpiresAt(stored.expiresAt);

      if (currentlyActive && tier === planLevel) {
        return {
          success: true,
          message: `Pass extended 30 days — active until ${formatExpiryDate(stored.expiresAt)}.`,
        };
      }

      if (currentlyActive && tier > planLevel) {
        return {
          success: true,
          message: `Upgraded to Tier ${tier} for 30 days — ${getUnlockedToolCount(tier)} generators until ${formatExpiryDate(stored.expiresAt)}.`,
        };
      }

      return {
        success: true,
        message: `Pass activated for 30 days (Tier ${tier}) — ${getUnlockedToolCount(tier)} generators until ${formatExpiryDate(stored.expiresAt)}.`,
      };
    },
    [planLevel, expiresAt]
  );

  const effectiveTier = hydrated && hasActivePass(planLevel, expiresAt) ? planLevel : 0;
  const effectiveExpiry = effectiveTier > 0 ? expiresAt : null;

  const value = useMemo(
    () => ({
      planLevel: effectiveTier,
      expiresAt: effectiveExpiry,
      daysRemaining: getDaysRemaining(effectiveExpiry),
      isActive: hasActivePass(effectiveTier, effectiveExpiry),
      unlockedCount: getUnlockedToolCount(effectiveTier),
      applyToken,
    }),
    [effectiveTier, effectiveExpiry, applyToken]
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan(): PlanContextValue {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
