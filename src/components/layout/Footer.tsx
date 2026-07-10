import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/layout/Logo";
import { AppBadges } from "@/components/layout/AppBadges";
import { MailIcon } from "@/components/icons";

const companyLinks = [
  { label: "About us", href: "/#about" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Support & FAQs", href: "/support" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-accent-500/20 bg-brand-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            {siteConfig.description}
          </p>
          <div className="mt-6">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Get the app
            </h3>
            <AppBadges />
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Book</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-slate-300 transition-colors hover:text-accent-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {companyLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-slate-300 transition-colors hover:text-accent-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div id="contact">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Get in touch</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex items-center gap-2 text-slate-300 transition-colors hover:text-accent-300"
              >
                <MailIcon className="h-4 w-4" />
                {siteConfig.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <p className="text-xs leading-relaxed text-slate-500">
            {siteConfig.name} works with trusted travel providers to bring you
            competitive options and a seamless booking experience.
          </p>
          <div className="mt-3 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-xs text-slate-500">
              © {year} {siteConfig.legalName}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <Link href="/privacy" className="text-xs text-slate-500 transition-colors hover:text-accent-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-slate-500 transition-colors hover:text-accent-300">
                Terms of Service
              </Link>
              <p className="text-xs text-slate-500">
                Powered by{" "}
                <a
                  href="https://www.forgestackx.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-slate-300 transition-colors hover:text-white"
                >
                  <span className="text-red-500">Forge</span>StackX
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
