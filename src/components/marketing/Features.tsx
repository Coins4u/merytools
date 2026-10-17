import {
  BarChart3,
  FileDown,
  Layers,
  Lock,
  Shield,
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    icon: Layers,
    title: "30 proprietary generators",
    text: "Meta tags, schema, sitemaps, readability, competitor gaps, and a full technical health scorer — all in one workspace.",
  },
  {
    icon: FileDown,
    title: "Client-ready PDF reports",
    text: "Every tool exports a confidential strategy PDF with health scores, audit data, and three personalized next steps.",
  },
  {
    icon: Lock,
    title: "Tiered digital unlocks",
    text: "Passes unlock 4 more generators per tier up to all 30. Access persists in your browser — no account database required.",
  },
  {
    icon: Zap,
    title: "Minutes, not days",
    text: "I designed these tools for the gap between raw crawl exports and stakeholder-ready recommendations.",
  },
  {
    icon: BarChart3,
    title: "Data-driven outputs",
    text: "Scores and checklists are computed from your inputs so every report reflects the site you are auditing.",
  },
  {
    icon: Shield,
    title: "Clear policies",
    text: "Terms, privacy, refund, and DMCA pages included — built for solo creators who need a legitimate purchase story.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything I use on client audits
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            I built these proprietary tools to help my clients identify search gaps instantly — now packaged as tiered digital access for your practice.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <article
              key={f.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-emerald-200 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-accent transition group-hover:bg-accent group-hover:text-white">
                <f.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
