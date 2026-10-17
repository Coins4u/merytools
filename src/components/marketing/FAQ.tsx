"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQS = [
  {
    q: "Is there a free trial or guest access?",
    a: "No. I offer paid Consulting Passes only. This keeps the product sustainable and aligns with manual-review payment flows used by solo creators.",
  },
  {
    q: "How fast do I receive my Access Token?",
    a: "After I confirm payment, I send your Access Token within one business day. Redeem it on the workspace — your pass stays active for 30 days from that moment, then locks until you purchase again.",
  },
  {
    q: "Do I need an account or database login?",
    a: "No. Your tier is stored in your browser localStorage after you redeem a token. Use the same device/browser to retain access.",
  },
  {
    q: "Can I upgrade my pass later?",
    a: "Yes. Purchase a higher tier and I will issue a new token that unlocks additional generators. Contact me with your original invoice for bundle consideration.",
  },
  {
    q: "Are PDF reports refundable?",
    a: "Digital strategy reports are instant deliverables. See my Refund Policy — sales are final once a report is generated.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">
          Frequently asked questions
        </h2>
        <ul className="mt-10 space-y-3">
          {FAQS.map((item, i) => (
            <li key={item.q} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-slate-900 hover:bg-slate-50"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                {item.q}
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-slate-400 transition ${open === i ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>
              {open === i && (
                <p className="border-t border-slate-100 px-5 py-4 text-sm leading-relaxed text-slate-600">
                  {item.a}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
