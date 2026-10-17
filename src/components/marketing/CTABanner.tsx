import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/brand";

export function CTABanner() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-green-700 px-8 py-14 text-center text-white shadow-glow sm:px-16">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to run audits like {BRAND.name}?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-emerald-100">
            Pick a Consulting Pass, get your invoice by email, and unlock the generators your tier includes — starting today.
          </p>
          <Link
            href="/pricing"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            View Consulting Passes
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
