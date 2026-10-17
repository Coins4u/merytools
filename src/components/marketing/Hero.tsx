import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-60" aria-hidden />
      <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-emerald-600/20 blur-3xl" aria-hidden />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-green-600/15 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-200">
          <Sparkles className="h-4 w-4 text-emerald-400" aria-hidden />
          {BRAND.tagline} · Paid digital access
        </div>

        <h1 className="mt-8 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Hi, I&apos;m {BRAND.name}.{" "}
          <span className="text-gradient">Data-driven SEO strategy</span> you can run in your browser.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl">
          I built a proprietary suite of 15 Strategy Report Generators for agencies and in-house teams.
          Request an invoice, pay on my secure store, and redeem your one-time Access Token — no subscriptions, no database, just results.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:bg-accent-light"
          >
            Get a Consulting Pass
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex items-center justify-center rounded-xl border border-slate-600 px-8 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-emerald-400 hover:text-white"
          >
            See how access works
          </Link>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-slate-800 pt-10 sm:grid-cols-4">
          {[
            { label: "Report generators", value: "30" },
            { label: "Consulting tiers", value: "8" },
            { label: "Passes from", value: "€13.45" },
            { label: "Fulfillment", value: "Manual review" },
          ].map((stat) => (
            <div key={stat.label}>
              <dt className="text-xs uppercase tracking-wider text-slate-500">{stat.label}</dt>
              <dd className="mt-1 text-2xl font-bold text-white">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
