import { Star } from "lucide-react";

const LOGOS = ["Agency-scale audits", "E-commerce SEO", "SaaS content teams", "Local service brands"];

export function SocialProof() {
  return (
    <section className="border-b border-slate-200 bg-white py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500">
          Trusted workflow for solo consultants &amp; lean teams
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {LOGOS.map((label) => (
            <span key={label} className="text-sm font-medium text-slate-400">
              {label}
            </span>
          ))}
        </div>
        <div className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex text-amber-400" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <p className="text-sm text-slate-600">
            <strong className="text-slate-900">4.9/5</strong> from consultants using my PDF strategy reports on client deliverables
          </p>
        </div>
      </div>
    </section>
  );
}
