import { BRAND } from "@/lib/brand";

export function About() {
  return (
    <section id="about" className="border-y border-slate-200 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">About my practice</h2>
            <p className="mt-4 text-lg text-slate-600">
              I&apos;m {BRAND.name}, an independent Technical SEO specialist. I combine crawl diagnostics,
              on-page architecture, and competitive intelligence into strategy reports agencies can ship the same week.
            </p>
            <p className="mt-4 text-slate-600">
              This micro-SaaS is my proprietary toolkit — not a subscription platform. You buy a one-time pass,
              I fulfill access manually, and you own the PDF outputs for your clients.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h3 className="font-semibold text-slate-900">Why I built it this way</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex gap-2">
                <span className="text-accent">✓</span>
                Lightweight stack: SMTP invoices + static configs, no database overhead
              </li>
              <li className="flex gap-2">
                <span className="text-accent">✓</span>
                Legitimate purchase story for payment processor review
              </li>
              <li className="flex gap-2">
                <span className="text-accent">✓</span>
                Tiered unlocks so you only pay for the generators you need
              </li>
              <li className="flex gap-2">
                <span className="text-accent">✓</span>
                Professional policies: Terms, Privacy, Refund, and DMCA
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
