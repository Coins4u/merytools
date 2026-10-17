import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Refund Policy | ${BRAND.product}`,
};

export default function RefundPolicyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Refund Policy</h1>
      <p className="mt-4 text-slate-600">Last updated: May 2026</p>

      <div className="mt-8 space-y-4 text-slate-600 leading-relaxed">
        <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 font-medium text-amber-900">
          As these are instant digital strategy reports, all sales are final once a report is generated.
        </p>
        <p>
          My Consulting Passes grant access to digital Strategy Report Generators that produce downloadable PDF
          deliverables immediately upon use. Because these are instant digital products, I cannot offer refunds after you
          have generated one or more professional strategy reports with your Access Token.
        </p>
        <p>
          If you experience a technical issue preventing access before generating any report, contact me within 7 days
          of purchase with your invoice details. I will work with you to restore access or resolve billing errors.
        </p>
        <p>
          See also my{" "}
          <Link href="/terms" className="text-accent hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" className="text-accent hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
