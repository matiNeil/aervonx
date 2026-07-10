import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of AervonX.",
};

export default function TermsPage() {
  return (
    <>
      <section className="border-b border-line bg-canvas-muted">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-muted">Last updated 10 July 2026</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="space-y-8 text-sm leading-relaxed text-ink/80">
          <p>
            These terms govern your use of {siteConfig.name}, operated by{" "}
            {siteConfig.legalName}. By using this site, you agree to them.
          </p>

          <div>
            <h2 className="font-serif text-xl font-medium text-ink">
              What {siteConfig.name} is
            </h2>
            <p className="mt-3">
              We search and display fares and prices from airlines and
              partners (such as Booking.com) so you can compare them. We are
              not an airline, hotel, or travel agent, and we do not sell
              travel services directly — every booking is completed and
              fulfilled by the partner you&apos;re redirected to.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-ink">
              Pricing and availability
            </h2>
            <p className="mt-3">
              Prices, availability and offer details are supplied by our
              partners and can change between when you see them on{" "}
              {siteConfig.name} and when you complete a booking on the
              partner&apos;s site. We do our best to show accurate,
              up-to-date information but can&apos;t guarantee it.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-ink">
              No booking fees, and how we make money
            </h2>
            <p className="mt-3">
              Searching and comparing on {siteConfig.name} is always free.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-ink">
              Your booking is with the partner
            </h2>
            <p className="mt-3">
              Once you&apos;re redirected to book, that partner&apos;s own
              terms and conditions apply to your booking, payment, tickets,
              changes and cancellations. Any disputes about a completed
              booking should go to them directly — see our{" "}
              <a href="/support" className="font-medium text-ink underline underline-offset-2 hover:text-accent-700">
                Support &amp; FAQs
              </a>{" "}
              page.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-ink">
              Accounts
            </h2>
            <p className="mt-3">
              If you create an account, you&apos;re responsible for keeping
              your login secure. Don&apos;t use {siteConfig.name} for
              anything unlawful or to interfere with the site&apos;s normal
              operation.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-ink">
              Liability
            </h2>
            <p className="mt-3">
              {siteConfig.name} is provided &quot;as is&quot;. We&apos;re not
              liable for issues arising from bookings made with our
              partners, or for pricing or availability errors sourced from
              them.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-ink">
              Changes to these terms
            </h2>
            <p className="mt-3">
              We may update these terms from time to time. Continued use of
              the site after a change means you accept the updated terms.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-ink">
              Contact us
            </h2>
            <p className="mt-3">
              Questions about these terms? Email us at{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="font-medium text-ink underline underline-offset-2 hover:text-accent-700"
              >
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
