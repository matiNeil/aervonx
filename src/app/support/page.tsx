import type { Metadata } from "next";
import { buttonClass } from "@/components/ui/Button";
import { MailIcon } from "@/components/icons";
import { faqs } from "@/lib/data/faqs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Support & FAQs",
  description:
    "Get help with your AervonX search or booking, and find answers to frequently asked questions.",
};

export default function SupportPage() {
  return (
    <>
      <section className="border-b border-line bg-canvas-muted">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Support &amp; FAQs
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            Answers to common questions about searching and booking with
            AervonX. Can&apos;t find what you need? Our team is a message
            away.
          </p>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className={buttonClass({ variant: "primary", className: "mt-6" })}
          >
            <MailIcon className="h-4 w-4" />
            Email {siteConfig.contact.email}
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-ink">
          Frequently asked questions
        </h2>
        <div className="mt-6 divide-y divide-line rounded-2xl border border-line bg-surface shadow-soft">
          {faqs.map((faq) => (
            <details key={faq.question} className="group p-5 open:pb-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink marker:content-none">
                {faq.question}
                <span className="shrink-0 text-xl font-light text-muted transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-line bg-canvas-muted p-6 text-center">
          <h3 className="font-serif text-lg font-medium text-ink">
            Still need a hand?
          </h3>
          <p className="mt-1 text-sm text-muted">
            Email our support team and we&apos;ll get back to you as soon as we can.
          </p>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className={buttonClass({ variant: "accent", className: "mt-4" })}
          >
            <MailIcon className="h-4 w-4" />
            Contact support
          </a>
        </div>
      </section>
    </>
  );
}
