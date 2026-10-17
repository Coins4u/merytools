import { PricingTable } from "@/components/pricing/PricingTable";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Consulting Passes | ${BRAND.product}`,
  description:
    "Eight one-time Consulting Passes. Request an invoice by email, pay on my external store, redeem your Access Token. No free tier.",
};

export default function PricingPage() {
  return (
    <>
      <div className="bg-slate-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-bold sm:text-4xl">Consulting Passes</h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            One-time digital access — not a subscription. Each pass unlocks more Strategy Report Generators.
            I send your invoice by SMTP email; you pay on my store; I fulfill your token after manual review.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <PricingTable />
      </div>

      <HowItWorks />
    </>
  );
}
