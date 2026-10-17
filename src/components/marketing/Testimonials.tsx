import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "The PDF reports look like they came from a boutique agency. I invoice clients the same day I run Mery SEO Tools generators.",
    name: "Marcus T.",
    role: "Freelance SEO Consultant",
  },
  {
    quote:
      "Tiered passes made it easy to start small and upgrade. Manual token delivery felt professional — not some sketchy auto-login.",
    name: "Elena R.",
    role: "In-house Growth Lead",
  },
  {
    quote:
      "Competitor gap + readability tools alone paid for the Professional pass on my first client project.",
    name: "James K.",
    role: "Technical SEO Specialist",
  },
];

export function Testimonials() {
  return (
    <section className="border-y border-slate-200 bg-slate-950 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">What practitioners say</h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-slate-400">
          Real workflows from consultants who needed audit-grade deliverables without enterprise tooling costs.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.name}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
            >
              <Quote className="h-8 w-8 text-accent/60" aria-hidden />
              <p className="mt-4 text-sm leading-relaxed text-slate-300">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-6 border-t border-slate-800 pt-4">
                <cite className="not-italic font-semibold text-white">{t.name}</cite>
                <p className="text-xs text-slate-500">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
