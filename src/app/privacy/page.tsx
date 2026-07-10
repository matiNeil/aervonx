import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How AervonX collects, uses and protects your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="border-b border-line bg-canvas-muted">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-muted">Last updated 10 July 2026</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="space-y-8 text-sm leading-relaxed text-ink/80">
          <p>
            {siteConfig.name} (&quot;we&quot;, &quot;us&quot;) is a travel
            comparison service. This policy explains what information we
            collect when you use {siteConfig.url.replace("https://", "")},
            and how we use it.
          </p>

          <div>
            <h2 className="font-serif text-xl font-medium text-ink">
              Information we collect
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-ink">Account information</strong> —
                if you create an account, our authentication provider (Clerk)
                collects your name, email address and sign-in credentials to
                let you sign in and manage your account.
              </li>
              <li>
                <strong className="text-ink">Search activity</strong> — the
                origins, destinations and dates you search for, used only to
                show you relevant results in that session.
              </li>
              <li>
                <strong className="text-ink">Technical data</strong> —
                standard web request data (such as IP address and browser
                type) collected automatically by our hosting provider for
                security and reliability.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-ink">
              How we use it
            </h2>
            <p className="mt-3">
              We use this information to operate the site, let you sign in,
              respond to support requests, and improve our search results.
              We do not sell your personal information.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-ink">
              Booking with our partners
            </h2>
            <p className="mt-3">
              When you choose a deal, we redirect you to the airline or
              partner (such as Booking.com) to complete your booking and
              payment. Any information you provide on their site is governed
              by their own privacy policy, not this one — we don&apos;t see
              or store your payment details.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-ink">
              Cookies
            </h2>
            <p className="mt-3">
              We use essential cookies to keep you signed in and to remember
              your session. We don&apos;t currently use advertising or
              cross-site tracking cookies.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-ink">
              Your rights
            </h2>
            <p className="mt-3">
              You can view or update your account details at any time from{" "}
              <span className="font-medium text-ink">Account settings</span>,
              or ask us to delete your account by emailing us. If you&apos;re
              in a region with statutory data protection rights (such as the
              UK or EU), you may also have the right to request a copy of
              your data or object to how it&apos;s processed.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-ink">
              Changes to this policy
            </h2>
            <p className="mt-3">
              We may update this policy from time to time. Material changes
              will be reflected by the &quot;Last updated&quot; date above.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-ink">
              Contact us
            </h2>
            <p className="mt-3">
              Questions about this policy? Email us at{" "}
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
