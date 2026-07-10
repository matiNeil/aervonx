"use client";

import { useMemo, useState } from "react";
import type { FlightOffer } from "@/lib/types";
import {
  filterFlights,
  flightSortOptions,
  sortFlights,
  type FlightSort,
} from "@/lib/filters";
import { FlightCard } from "@/components/cards/FlightCard";
import { formatCurrency } from "@/lib/format";

const stopChoices: { label: string; value: number | null }[] = [
  { label: "Any number of stops", value: null },
  { label: "Direct only", value: 0 },
  { label: "1 stop or fewer", value: 1 },
];

export function FlightResults({ offers }: { offers: FlightOffer[] }) {
  const airlineOptions = useMemo(() => {
    const map = new Map<string, string>();
    offers.forEach((o) => map.set(o.airline.code, o.airline.name));
    return Array.from(map, ([code, name]) => ({ code, name })).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }, [offers]);

  const priceBound = useMemo(() => {
    const prices = offers.map((o) => o.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [offers]);

  const [sort, setSort] = useState<FlightSort>("cheapest");
  const [maxStops, setMaxStops] = useState<number | null>(null);
  const [airlines, setAirlines] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(priceBound.max);

  const filtered = useMemo(
    () =>
      sortFlights(
        filterFlights(offers, {
          maxStops,
          airlines,
          maxPrice: maxPrice >= priceBound.max ? null : maxPrice,
        }),
        sort,
      ),
    [offers, maxStops, airlines, maxPrice, priceBound.max, sort],
  );

  function toggleAirline(code: string) {
    setAirlines((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code],
    );
  }

  function reset() {
    setMaxStops(null);
    setAirlines([]);
    setMaxPrice(priceBound.max);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="space-y-6">
        <div className="rounded-2xl border border-line bg-surface p-4 shadow-soft lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-ink">Filters</h2>
            <button
              type="button"
              onClick={reset}
              className="text-xs font-semibold text-accent-700 hover:underline"
            >
              Reset
            </button>
          </div>

          <div className="mt-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              Stops
            </h3>
            <div className="space-y-1.5">
              {stopChoices.map((c) => (
                <label key={c.label} className="flex items-center gap-2 text-sm text-ink/80">
                  <input
                    type="radio"
                    name="stops"
                    checked={maxStops === c.value}
                    onChange={() => setMaxStops(c.value)}
                    className="accent-ink"
                  />
                  {c.label}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              Max price: {formatCurrency(maxPrice)}
            </h3>
            <input
              type="range"
              min={priceBound.min}
              max={priceBound.max}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-ink"
            />
          </div>

          <div className="mt-5">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              Airlines
            </h3>
            <div className="max-h-56 space-y-1.5 overflow-y-auto pr-1">
              {airlineOptions.map((a) => (
                <label key={a.code} className="flex items-center gap-2 text-sm text-ink/80">
                  <input
                    type="checkbox"
                    checked={airlines.includes(a.code)}
                    onChange={() => toggleAirline(a.code)}
                    className="accent-ink"
                  />
                  {a.name}
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            <span className="font-semibold text-ink">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "result" : "results"}
          </p>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-muted">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as FlightSort)}
              className="h-10 rounded-full border border-line-strong bg-surface px-3 text-sm font-medium focus:border-ink/40 focus:outline-none focus:ring-2 focus:ring-accent-500/30"
            >
              {flightSortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </label>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line-strong bg-surface p-10 text-center">
            <p className="font-semibold text-ink">No flights match your filters</p>
            <p className="mt-1 text-sm text-muted">Try widening your price range or clearing airlines.</p>
            <button
              type="button"
              onClick={reset}
              className="mt-4 text-sm font-semibold text-accent-700 hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((offer) => (
              <FlightCard key={offer.id} offer={offer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
