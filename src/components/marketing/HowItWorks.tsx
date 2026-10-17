import { CreditCard, KeyRound, Mail } from "lucide-react";

const STEPS = [
  {
    icon: Mail,
    title: "Request invoice",
    text: "Choose a Consulting Pass on my pricing page. I email you a professional invoice with tier details and a secure payment link.",
  },
  {
    icon: CreditCard,
    title: "Pay on external store",
    text: "Complete payment on my store (one product per tier). I manually review each order — built for legitimate solo-creator compliance.",
  },
  {
    icon: KeyRound,
    title: "Redeem Access Token",
    text: "After confirmation, I send your one-time code. Enter it on the dashboard to unlock generators in your browser via localStorage.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Simple, transparent access
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            No free tier. No hidden subscriptions. Just a clear purchase path designed for manual fulfillment and PayPal-friendly review.
          </p>
        </div>

        <ol className="mt-14 grid gap-8 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md"
            >
              <span className="absolute -top-3 left-8 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                {i + 1}
              </span>
              <step.icon className="mt-4 h-8 w-8 text-accent" aria-hidden />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
