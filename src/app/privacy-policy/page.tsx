import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Privacy Policy | ${BRAND.product}`,
};

export default function PrivacyPolicyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
      <p className="mt-4 text-slate-600">Last updated: May 2026</p>

      <section className="mt-8 space-y-4 text-slate-600 leading-relaxed">
        <h2 className="text-xl font-semibold text-slate-900">Overview</h2>
        <p>
          I, {BRAND.name}, operate {BRAND.product} with a lightweight stack: no user database. This policy explains
          what information I collect and how I use it when you request an invoice or use my tools.
        </p>

        <h2 className="text-xl font-semibold text-slate-900">Information I collect</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Invoice requests:</strong> Your name and email address when you submit the purchase form on my
            pricing page.
          </li>
          <li>
            <strong>Access tier:</strong> Your unlocked pass level stored in your browser localStorage (not on my
            servers).
          </li>
          <li>
            <strong>Tool inputs:</strong> Data you enter into generators stays in your browser unless you download a
            PDF report.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-slate-900">How I use information</h2>
        <p>
          I use your name and email to send invoices, payment links, Access Tokens, and support replies. I may receive
          a copy of lead notifications at my admin inbox configured for this site.
        </p>

        <h2 className="text-xl font-semibold text-slate-900">Email delivery</h2>
        <p>
          Invoices and notifications are sent via SMTP from my configured mail server. I do not sell your email address
          to third parties.
        </p>

        <h2 className="text-xl font-semibold text-slate-900">Cookies &amp; storage</h2>
        <p>
          I use browser localStorage to remember your Access Token tier. No advertising or analytics cookies are required
          for core functionality.
        </p>

        <h2 className="text-xl font-semibold text-slate-900">Data retention</h2>
        <p>
          Invoice-related emails are retained in my mail system as needed for accounting and support. Clear your browser
          storage to remove local tier data from your device.
        </p>

        <h2 className="text-xl font-semibold text-slate-900">Your rights</h2>
        <p>
          You may request access, correction, or deletion of personal data I hold by emailing me from the address used at
          purchase. I will respond within a reasonable timeframe.
        </p>

        <h2 className="text-xl font-semibold text-slate-900">Related policies</h2>
        <p>
          See also my{" "}
          <Link href="/terms" className="text-accent hover:underline">
            Terms of Service
          </Link>
          ,{" "}
          <Link href="/refund-policy" className="text-accent hover:underline">
            Refund Policy
          </Link>
          , and{" "}
          <Link href="/dmca" className="text-accent hover:underline">
            DMCA Policy
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
