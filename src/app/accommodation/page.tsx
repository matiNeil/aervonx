import type { Metadata } from "next";
import { SearchHero } from "@/components/search/SearchHero";
import { StayResults } from "@/components/stays/StayResults";
import { provider } from "@/lib/providers";
import { parseSearch, type RawSearchParams } from "@/lib/params";

export const metadata: Metadata = {
  title: "Hotels & accommodation",
  description:
    "Compare hotels, apartments, villas and resorts and book your stay through Booking.com with AervonX.",
};

export default async function AccommodationPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const raw = await searchParams;
  const { query, initial } = parseSearch(raw);
  const stays = await provider.searchStays(query);

  return (
    <>
      <SearchHero
        title="Stays for every trip"
        subtitle="From city hotels to beach villas — compare top-rated places to stay and book on Booking.com."
        initialTab="stays"
        initial={initial}
      />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="mb-4 text-sm text-muted">
          {query.destination ? (
            <>
              Stays in{" "}
              <span className="font-semibold text-ink">{query.destination}</span>
            </>
          ) : (
            <>Top-rated stays across our destinations</>
          )}
        </p>
        <StayResults stays={stays} />
      </section>
    </>
  );
}
