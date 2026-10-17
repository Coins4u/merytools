import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `DMCA Policy | ${BRAND.product}`,
};

export default function DmcPage() {
  const contactEmail = BRAND.email;

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">DMCA Copyright Policy</h1>
      <p className="mt-4 text-slate-600">Last updated: May 2026</p>

      <section className="mt-8 space-y-4 text-slate-600 leading-relaxed">
        <p>
          {BRAND.name} respects intellectual property rights. If you believe content on {BRAND.product} infringes your
          copyright, send a DMCA notice to my designated contact below.
        </p>

        <h2 className="text-xl font-semibold text-slate-900">Required notice information</h2>
        <ol className="list-decimal space-y-2 pl-6">
          <li>Your physical or electronic signature</li>
          <li>Identification of the copyrighted work claimed to be infringed</li>
          <li>Identification of the material claimed to be infringing and its location on the site</li>
          <li>Your contact information (address, phone, email)</li>
          <li>A statement of good-faith belief that use is not authorized</li>
          <li>
            A statement, under penalty of perjury, that the information is accurate and you are authorized to act for
            the copyright owner
          </li>
        </ol>

        <h2 className="text-xl font-semibold text-slate-900">Designated agent</h2>
        <p>
          Email: <a href={`mailto:${contactEmail}`} className="text-accent hover:underline">{contactEmail}</a>
          <br />
          Attn: DMCA Agent — {BRAND.product}
        </p>

        <h2 className="text-xl font-semibold text-slate-900">Counter-notification</h2>
        <p>
          If you believe material was removed in error, you may submit a counter-notification with the information
          required under 17 U.S.C. § 512(g). I will forward counter-notices to the original complainant when appropriate.
        </p>

        <h2 className="text-xl font-semibold text-slate-900">Repeat infringers</h2>
        <p>
          I may terminate access for users who are repeat infringers in appropriate circumstances.
        </p>
      </section>
    </article>
  );
}
