import Link from "next/link";
import { SearchForm } from "@/components/search/SearchForm";
import { Visual } from "@/components/Visual";
import { FlightCard } from "@/components/cards/FlightCard";
import { StayCard } from "@/components/cards/StayCard";
import { PackageCard } from "@/components/cards/PackageCard";
import { buttonClass } from "@/components/ui/Button";
import { provider } from "@/lib/providers";
import { destinations } from "@/lib/data/destinations";
import { siteConfig } from "@/config/site";
import { formatCurrency } from "@/lib/format";
import {
  ArrowRightIcon,
  HelpIcon,
  SearchIcon,
  ShieldIcon,
  StarIcon,
  TagIcon,
} from "@/components/icons";

const valueProps = [
  {
    icon: <SearchIcon className="h-5 w-5" />,
    title: "Compare in one search",
    text: "Hundreds of airlines and travel sites, ranked by price and value.",
  },
  {
    icon: <TagIcon className="h-5 w-5" />,
    title: "No booking fees",
    text: "Searching and comparing on AervonX is always free.",
  },
  {
    icon: <ShieldIcon className="h-5 w-5" />,
    title: "Trusted partners",
    text: "Book securely with airlines and Booking.com — never a middleman.",
  },
  {
    icon: <HelpIcon className="h-5 w-5" />,
    title: "Real human support",
    text: `Questions? Email us at ${siteConfig.contact.email} — see our FAQs for quick answers.`,
  },
];

const steps = [
  { n: "1", title: "Search", text: "Tell us where and when. We scan flights, stays, packages and transfers in seconds." },
  { n: "2", title: "Compare", text: "Filter and sort by price, duration, rating and more to find your best option." },
  { n: "3", title: "Book with our partner", text: "We send you to the airline or Booking.com to pay securely — we earn a small commission at no extra cost to you." },
];

export default async function HomePage() {
  const featuredFlights = (await provider.searchFlights({})).slice(0, 4);
  const popularStays = (await provider.searchStays({})).slice(0, 3);
  const featuredPackages = (await provider.searchPackages({})).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.10),transparent_55%)]" />
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-400/15 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-accent-500/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white ring-1 ring-white/15 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
              </span>
              Flights · Stays · Packages · Transfers
            </span>
            <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              The whole trip,{" "}
              <span className="italic text-accent-300">one search.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-200 sm:text-lg">
              Discover the world with AervonX. Book flights, premium stays,
              curated holiday experiences, airport transfers and car rentals
              through one seamless travel platform designed to take you
              further.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-brand-200">
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-flex text-accent-400">
                  <StarIcon className="h-4 w-4" />
                </span>
                4.8/5 from 12,000+ travellers
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldIcon className="h-4 w-4 text-accent-400" />
                100+ trusted partners
              </span>
            </div>
          </div>
          <div className="mt-9">
            <SearchForm initialTab="flights" />
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {valueProps.map((v) => (
            <div key={v.title} className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-canvas-muted text-ink ring-1 ring-line">
                {v.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-ink">{v.title}</h3>
                <p className="mt-0.5 text-xs text-muted">{v.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending destinations */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeader
          title="Trending destinations"
          subtitle="Popular spots travellers are booking right now"
          href="/flights"
          linkLabel="All flights"
        />
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {destinations.map((d) => (
            <Link
              key={d.city}
              href={`/flights?destination=${encodeURIComponent(d.city)}`}
              className="group"
            >
              <div className="overflow-hidden rounded-2xl shadow-soft ring-1 ring-ink/5 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-hover">
                <Visual
                  seed={d.seed}
                  rounded="rounded-none"
                  className="aspect-[4/3] w-full transition duration-500 group-hover:scale-[1.04]"
                  label={d.city}
                  sublabel={d.country}
                />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-muted">{d.blurb}</span>
                <span className="text-sm font-semibold text-ink">
                  from {formatCurrency(d.fromPrice)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured flights */}
      <section className="bg-canvas-muted">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeader
            title="Top flight deals"
            subtitle="Hand-picked low fares across our network"
            href="/flights"
            linkLabel="See all flights"
          />
          <div className="mt-6 space-y-3">
            {featuredFlights.map((o) => (
              <FlightCard key={o.id} offer={o} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular stays */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeader
          title="Popular places to stay"
          subtitle="Top-rated hotels, villas and apartments"
          href="/accommodation"
          linkLabel="All stays"
        />
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popularStays.map((s) => (
            <StayCard key={s.id} stay={s} />
          ))}
        </div>
      </section>

      {/* Packages */}
      <section className="bg-canvas-muted">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeader
            title="Holiday packages"
            subtitle="Flight + hotel bundles for less"
            href="/packages"
            linkLabel="All packages"
          />
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPackages.map((p) => (
              <PackageCard key={p.id} pkg={p} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works + about */}
      <section
        id="how-it-works"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div id="about" className="max-w-2xl">
          <h2 className="font-serif text-2xl font-medium tracking-tight text-ink sm:text-3xl">
            How AervonX works
          </h2>
          <p className="mt-2 text-muted">
            AervonX is a travel comparison service. We bring together fares and
            prices from airlines and partners like Booking.com so you can find
            the best deal — then send you to them to book. We earn a commission
            on completed bookings, at no extra cost to you.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-line bg-surface p-6 shadow-soft">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
                {s.n}
              </div>
              <h3 className="mt-4 font-semibold text-ink">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative flex flex-col items-start justify-between gap-4 overflow-hidden rounded-3xl bg-brand-950 px-6 py-9 text-white shadow-glow ring-1 ring-white/10 sm:flex-row sm:items-center sm:px-10">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-accent-500/15 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_50%)]" />
          <div className="relative">
            <h2 className="font-serif text-xl font-medium">Need a hand planning your trip?</h2>
            <p className="mt-1 text-sm text-brand-200">
              Our team is here to help you find and book the right deal.
            </p>
          </div>
          <div className="relative flex flex-wrap gap-3">
            <Link href="/support" className={buttonClass({ variant: "accent" })}>
              <HelpIcon className="h-4 w-4" /> Visit support centre
            </Link>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className={buttonClass({ variant: "white" })}
            >
              Email us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeader({
  title,
  subtitle,
  href,
  linkLabel,
}: {
  title: string;
  subtitle: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="font-serif text-2xl font-medium tracking-tight text-ink sm:text-3xl">{title}</h2>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      </div>
      <Link
        href={href}
        className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-ink hover:text-accent-700 sm:inline-flex"
      >
        {linkLabel}
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}
