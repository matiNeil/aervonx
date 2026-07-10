import type { Metadata } from "next";
import { SearchHero } from "@/components/search/SearchHero";
import { CarRentalCard } from "@/components/cards/CarRentalCard";
import { provider } from "@/lib/providers";
import { parseSearch, type RawSearchParams } from "@/lib/params";

export const metadata: Metadata = {
  title: "Car rentals",
  description:
    "Compare and book self-drive car rentals worldwide — economy to luxury, with AervonX.",
};

export default async function CarRentalsPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const raw = await searchParams;
  const { query, initial } = parseSearch(raw);
  const cars = await provider.searchCarRentals(query);

  return (
    <>
      <SearchHero
        title="Car rentals"
        subtitle="Self-drive rentals from trusted providers — economy runabouts to luxury SUVs, picked up right where you land."
        initialTab="car-rentals"
        initial={initial}
      />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="mb-4 text-sm text-muted">
          {query.destination ? (
            <>
              Cars in{" "}
              <span className="font-semibold text-ink">{query.destination}</span>
            </>
          ) : (
            <>
              <span className="font-semibold text-ink">{cars.length}</span>{" "}
              cars available
            </>
          )}
        </p>
        <div className="space-y-3">
          {cars.map((car) => (
            <CarRentalCard key={car.id} car={car} />
          ))}
        </div>
      </section>
    </>
  );
}
