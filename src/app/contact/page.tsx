import Link from "next/link";
import { Mail, Clock, MessageSquare, KeyRound, FileText } from "lucide-react";
import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: `Contact | ${BRAND.product}`,
  description: `Contact ${BRAND.name} for consulting pass questions, access tokens, billing, and technical SEO support.`,
};

function getContactEmail(): string {
  return process.env.ADMIN_EMAIL ?? process.env.SMTP_FROM ?? BRAND.email;
}

export default function ContactPage() {
  const contactEmail = getContactEmail();

  return (
    <>
      <section className="bg-slate-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">Get in touch</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Contact {BRAND.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Questions about Consulting Passes, invoices, Access Tokens, or your workspace? I handle support
            personally as an independent consultant.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-emerald-50/50 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-white">
                    <Mail className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <h2 className="font-semibold text-slate-900">Email</h2>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="mt-1 block text-accent hover:underline"
                    >
                      {contactEmail}
                    </a>
                    <p className="mt-2 text-sm text-slate-600">
                      Prefer email? Mention your invoice email if your question is about a purchase.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: Clock,
                    title: "Response time",
                    text: "Within one business day for pass, billing, and token questions.",
                  },
                  {
                    icon: KeyRound,
                    title: "Access tokens",
                    text: "Sent after I confirm your store payment. Include your purchase email.",
                  },
                  {
                    icon: FileText,
                    title: "Invoices",
                    text: "Request a pass on the pricing page — I email your invoice with a payment link.",
                  },
                  {
                    icon: MessageSquare,
                    title: "Consulting",
                    text: "I offer strategy generators and PDF reports — not custom dev or agency retainers.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <item.icon className="h-5 w-5 text-accent" aria-hidden />
                    <h3 className="mt-3 text-sm font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{item.text}</p>
                  </div>
                ))}
              </div>

              <p className="text-sm text-slate-500">
                Looking for a pass?{" "}
                <Link href="/pricing" className="font-medium text-accent hover:underline">
                  View Consulting Passes
                </Link>
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
