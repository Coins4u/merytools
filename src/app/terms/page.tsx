import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Terms of Service | ${BRAND.product}`,
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
      <p className="mt-4 text-slate-600">Last updated: May 2026</p>

      <section className="mt-8 space-y-4 text-slate-600">
        <h2 className="text-xl font-semibold text-slate-900">1. Services</h2>
        <p>
          I, {BRAND.name}, operate {BRAND.product} as a personal micro-SaaS and consulting platform. I provide
          tiered digital access to proprietary SEO Strategy Report Generators through one-time Consulting Passes.
        </p>

        <h2 className="text-xl font-semibold text-slate-900">2. Pass duration</h2>
        <p>
          All generator access requires a paid Consulting Pass. Each Access Token grants{" "}
          <strong>30 days of dashboard access</strong> beginning when you redeem the token in your browser — not
          lifetime access. After expiry, tools lock until you purchase and redeem a new pass. Tokens are personal,
          non-transferable, and stored in localStorage. I reserve the right to revoke tokens used in violation of these
          terms.
        </p>

        <h2 className="text-xl font-semibold text-slate-900">3. Purchase &amp; fulfillment</h2>
        <p>
          Invoices are sent by email. Payment occurs on my external store. I manually review orders and deliver Access
          Tokens after payment confirmation — typically within one business day.
        </p>

        <h2 className="text-xl font-semibold text-slate-900">4. Reports &amp; liability</h2>
        <p>
          Generated reports are for informational and professional guidance. I do not guarantee specific rankings or
          traffic outcomes. You are responsible for implementing recommendations on your properties.
        </p>

        <h2 className="text-xl font-semibold text-slate-900">5. Intellectual property</h2>
        <p>
          Tool interfaces, branding, and report templates remain my intellectual property. You may use exported reports
          for your business but may not resell or redistribute my generators.
        </p>

        <h2 className="text-xl font-semibold text-slate-900">6. Contact</h2>
        <p>
          Questions: reply to your invoice email or contact me at the address on your invoice.
        </p>
      </section>
    </article>
  );
}
