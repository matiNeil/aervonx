import type { Metadata } from "next";
import { SearchHero } from "@/components/search/SearchHero";
import { TransferCard } from "@/components/cards/TransferCard";
import { provider } from "@/lib/providers";
import { parseSearch, type RawSearchParams } from "@/lib/params";

export const metadata: Metadata = {
  title: "Airport transfers",
  description:
    "Book reliable private and shared airport transfers worldwide — fixed prices, no surprises, with AervonX.",
};

export default async function TransfersPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const raw = await searchParams;
  const { query, initial } = parseSearch(raw);
  const transfers = await provider.searchTransfers(query);

  return (
    <>
      <SearchHero
        title="Airport transfers"
        subtitle="Pre-book a private or shared ride from the airport — fixed prices, free waiting time and a driver who meets you."
        initialTab="transfers"
        initial={initial}
      />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="mb-4 text-sm text-muted">
          {query.destination ? (
            <>
              Transfers in{" "}
              <span className="font-semibold text-ink">{query.destination}</span>
            </>
          ) : (
            <>
              <span className="font-semibold text-ink">{transfers.length}</span>{" "}
              transfer options available
            </>
          )}
        </p>
        <div className="space-y-3">
          {transfers.map((transfer) => (
            <TransferCard key={transfer.id} transfer={transfer} />
          ))}
        </div>
      </section>
    </>
  );
}
