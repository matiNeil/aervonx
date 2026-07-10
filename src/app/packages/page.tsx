import type { Metadata } from "next";
import { SearchHero } from "@/components/search/SearchHero";
import { PackageCard } from "@/components/cards/PackageCard";
import { provider } from "@/lib/providers";
import { parseSearch, type RawSearchParams } from "@/lib/params";

export const metadata: Metadata = {
  title: "Holiday packages",
  description:
    "Flight + hotel holiday packages — beach, safari, city breaks and more, bundled for great value with AervonX.",
};

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const raw = await searchParams;
  const { query, initial } = parseSearch(raw);
  const packages = await provider.searchPackages(query);

  return (
    <>
      <SearchHero
        title="Holiday packages"
        subtitle="Flight + hotel bundles handpicked for value — from beach escapes to safari adventures."
        initialTab="packages"
        initial={initial}
      />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="mb-4 text-sm text-muted">
          <span className="font-semibold text-ink">{packages.length}</span>{" "}
          {packages.length === 1 ? "package" : "packages"} available
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>
    </>
  );
}
