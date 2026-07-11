import type { Metadata } from "next";
import Link from "next/link";
import { SearchHero } from "@/components/search/SearchHero";
import { FlightResults } from "@/components/flights/FlightResults";
import { provider } from "@/lib/providers";
import { parseSearch, routeSummary, type RawSearchParams } from "@/lib/params";
import { buildGoLink } from "@/lib/affiliate";
import { buttonClass } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Cheap flights",
  description:
    "Compare cheap flights from hundreds of airlines and book the best fare for your trip with AervonX.",
};

export default async function FlightsPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const raw = await searchParams;
  const { query, initial } = parseSearch(raw);
  const offers = await provider.searchFlights(query);
  const summary = routeSummary(query);
  const kiwiGoLink = buildGoLink({
    partner: "travelpayouts",
    url: "https://kiwi.tpo.lu/UvoO6APd",
    label: "flights-kiwi",
  });

  return (
    <>
      <SearchHero
        title="Find cheap flights"
        subtitle="Compare fares from hundreds of airlines — we earn a commission when you book, so searching stays free."
        initialTab="flights"
        initial={initial}
      />
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-surface p-4 shadow-soft sm:flex-row sm:items-center sm:p-5">
          <div>
            <div className="font-semibold text-ink">Search all of Kiwi.com&apos;s fares</div>
            <p className="mt-0.5 text-sm text-muted">
              Flexible routes and virtual interlining, powered by our partner Kiwi.com.
            </p>
          </div>
          <Link
            href={kiwiGoLink}
            target="_blank"
            rel="nofollow sponsored noopener"
            className={buttonClass({ variant: "accent", size: "sm", className: "shrink-0" })}
          >
            Book on Kiwi.com
          </Link>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="mb-4 text-sm text-muted">
          {summary ? (
            <>
              Showing fares for{" "}
              <span className="font-semibold text-ink">{summary}</span>
            </>
          ) : (
            <>Showing our top fares across popular routes</>
          )}
        </p>
        <FlightResults offers={offers} />
      </section>
    </>
  );
}
