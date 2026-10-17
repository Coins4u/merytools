"use client";

import { Check, Crown, Sparkles, Zap } from "lucide-react";
import { useState } from "react";
import { CONSULTING_PLANS, CURRENCY_CODE, formatPrice } from "@/lib/plans";
import type { ConsultingPlan } from "@/lib/types";
import { PurchaseModal } from "./PurchaseModal";

export function PricingTable() {
  const [selectedPlan, setSelectedPlan] = useState<ConsultingPlan | null>(null);

  return (
    <>
      <div className="mb-10 rounded-2xl border border-emerald-100 bg-emerald-50/60 px-6 py-5 text-center">
        <p className="text-sm text-emerald-900">
          <strong>30-day digital access</strong> (not lifetime) — request an invoice, pay on my store, redeem your
          token within 30 days of activation. Professional PDF strategy reports included.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {CONSULTING_PLANS.map((plan) => {
          const perTool =
            plan.toolsUnlocked > 0
              ? formatPrice(plan.price / plan.toolsUnlocked)
              : formatPrice(0);

          return (
            <article
              key={plan.id}
              className={`relative flex flex-col overflow-hidden rounded-2xl border bg-white transition-all hover:-translate-y-0.5 hover:shadow-xl ${
                plan.popular
                  ? "border-accent shadow-lg ring-2 ring-accent/25"
                  : plan.bestValue
                    ? "border-emerald-300 shadow-md"
                    : "border-slate-200 shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="bg-accent px-4 py-2 text-center text-xs font-bold uppercase tracking-wide text-white">
                  <Sparkles className="mr-1 inline h-3.5 w-3.5" aria-hidden />
                  Most popular
                </div>
              )}
              {plan.bestValue && !plan.popular && (
                <div className="bg-emerald-100 px-4 py-2 text-center text-xs font-bold uppercase tracking-wide text-emerald-800">
                  <Crown className="mr-1 inline h-3.5 w-3.5" aria-hidden />
                  Best value
                </div>
              )}

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                    Tier {plan.tier}
                  </span>
                  <span className="text-xs text-slate-400">Pass ID: {plan.id}</span>
                </div>

                <h3 className="mt-3 text-lg font-bold leading-tight text-slate-900">{plan.name}</h3>
                <p className="mt-2 min-h-[2.5rem] text-sm leading-snug text-slate-500">{plan.tagline}</p>

                <div className="mt-5 border-t border-slate-100 pt-5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight text-slate-900">
                      {formatPrice(plan.price)}
                    </span>
                    <span className="text-sm text-slate-500">{CURRENCY_CODE} · once</span>
                  </div>
                  <p className="mt-1 text-xs text-accent font-medium">
                    ~{perTool} per generator · {plan.toolsUnlocked} unlocked
                  </p>
                </div>

                <ul className="mt-5 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 rounded-lg bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Includes
                  </p>
                  <ul className="mt-2 space-y-1">
                    {plan.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-1.5 text-xs text-slate-600">
                        <Zap className="h-3 w-3 shrink-0 text-accent/70" aria-hidden />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPlan(plan)}
                  className={`mt-6 w-full rounded-xl py-3 text-sm font-semibold transition ${
                    plan.popular || plan.bestValue
                      ? "bg-accent text-white shadow-md hover:bg-accent-dark"
                      : "border-2 border-slate-200 text-slate-800 hover:border-accent hover:text-accent"
                  }`}
                >
                  Request invoice
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <PurchaseModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
    </>
  );
}
