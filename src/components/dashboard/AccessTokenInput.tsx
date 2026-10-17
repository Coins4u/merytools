"use client";

import { KeyRound, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import { PASS_VALIDITY_DAYS, tierLabel } from "@/lib/membership";
import { formatExpiryDate } from "@/lib/pass-access";

export function AccessTokenInput() {
  const { planLevel, unlockedCount, applyToken, isActive, expiresAt, daysRemaining } = usePlan();
  const [code, setCode] = useState("");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = applyToken(code);
    setFeedback({ type: result.success ? "success" : "error", message: result.message });
    if (result.success) setCode("");
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-md sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Redeem Access Token</h2>
          <p className="mt-1 text-sm text-slate-600">
            Status: <span className="font-medium text-accent">{tierLabel(planLevel)}</span>
            {isActive && (
              <>
                {" · "}
                {unlockedCount} of 30 generators ·{" "}
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  {daysRemaining} days left
                </span>
              </>
            )}
          </p>
          {isActive && expiresAt && (
            <p className="mt-1 text-xs text-slate-500">
              Access expires {formatExpiryDate(expiresAt)} ({PASS_VALIDITY_DAYS}-day pass, not lifetime)
            </p>
          )}
        </div>
        {!isActive && (
          <Link href="/pricing" className="text-sm font-semibold text-accent hover:text-accent-dark">
            Purchase a pass →
          </Link>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your Access Token"
            className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            aria-label="Access token"
          />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
        >
          {isActive ? "Extend / upgrade" : "Unlock workspace"}
        </button>
      </form>

      {feedback && (
        <div
          className={`mt-3 flex items-start gap-2 rounded-xl p-3 text-sm ${
            feedback.type === "success" ? "bg-emerald-50 text-emerald-900" : "bg-red-50 text-red-800"
          }`}
          role="status"
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}
    </div>
  );
}
