import Link from "next/link";
import { BRAND } from "@/lib/brand";

const legalLinks = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/dmca", label: "DMCA" },
];

const productLinks = [
  { href: "/pricing", label: "Consulting Passes" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#dashboard", label: "Workspace" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="text-lg font-bold text-white">{BRAND.product}</p>
            <p className="mt-2 max-w-sm text-sm">
              Personal micro-SaaS by {BRAND.name}. Tiered digital access to SEO strategy generators — invoice by
              email, pay externally, redeem your token.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Product</p>
            <nav className="mt-4 flex flex-col gap-2 text-sm">
              {productLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Legal</p>
            <nav className="mt-4 flex flex-col gap-2 text-sm" aria-label="Legal">
              {legalLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <p className="mt-10 border-t border-slate-800 pt-8 text-center text-xs sm:text-left">
          © {BRAND.year} {BRAND.product}. Personal Portfolio &amp; Consulting Services.
        </p>
      </div>
    </footer>
  );
}
