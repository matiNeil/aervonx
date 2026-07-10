import type { Metadata } from "next";
import { SearchHero } from "@/components/search/SearchHero";
import { FlightResults } from "@/components/flights/FlightResults";
import { provider } from "@/lib/providers";
import { parseSearch, routeSummary, type RawSearchParams } from "@/lib/params";

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

  return (
    <>
      <SearchHero
        title="Find cheap flights"
        subtitle="Compare fares from hundreds of airlines — we earn a commission when you book, so searching stays free."
        initialTab="flights"
        initial={initial}
      />
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
