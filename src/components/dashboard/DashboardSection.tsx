"use client";

import Link from "next/link";
import { LayoutGrid, Lock, ShoppingBag } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { PASS_VALIDITY_DAYS } from "@/lib/membership";
import { TOTAL_SEO_TOOLS } from "@/lib/tools";
import { AccessTokenInput } from "./AccessTokenInput";
import { ToolGrid } from "./ToolGrid";

export function DashboardSection() {
  const { isActive, daysRemaining } = usePlan();
  const active = isActive;

  return (
    <section id="dashboard" className="relative overflow-hidden bg-slate-100 py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-100/40 via-transparent to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
              <LayoutGrid className="h-3.5 w-3.5" aria-hidden />
              {TOTAL_SEO_TOOLS} professional generators
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Strategy Report Workspace
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              {active
                ? `Your ${PASS_VALIDITY_DAYS}-day pass is active (${daysRemaining} days left). Run audits and export confidential PDFs.`
                : `Unlock up to ${TOTAL_SEO_TOOLS} generators with a ${PASS_VALIDITY_DAYS}-day Consulting Pass. Invoice → pay → redeem token.`}
            </p>
          </div>
          {!active && (
            <Link
              href="/pricing"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-accent-dark"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden />
              Get a Consulting Pass
            </Link>
          )}
        </div>

        {!active && (
          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
            <Lock className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" aria-hidden />
            <p className="text-sm text-amber-900">
              <strong>No free tier.</strong> I manually fulfill Access Tokens after payment review — built for
              legitimate solo-creator and PayPal compliance workflows.
            </p>
          </div>
        )}

        <div className="mt-8">
          <AccessTokenInput />
        </div>

        <ToolGrid />
      </div>
    </section>
  );
}
