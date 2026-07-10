"use client";

import { useMemo, useState } from "react";
import type { Stay, StayType } from "@/lib/types";
import {
  filterStays,
  sortStays,
  staySortOptions,
  type StaySort,
} from "@/lib/filters";
import { StayCard } from "@/components/cards/StayCard";
import { formatCurrency } from "@/lib/format";

const ratingChoices: { label: string; value: number | null }[] = [
  { label: "Any rating", value: null },
  { label: "Very good · 8+", value: 8 },
  { label: "Superb · 9+", value: 9 },
];

export function StayResults({ stays }: { stays: Stay[] }) {
  const typeOptions = useMemo(
    () => Array.from(new Set(stays.map((s) => s.type))).sort(),
    [stays],
  );

  const priceBound = useMemo(() => {
    const prices = stays.map((s) => s.pricePerNight);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [stays]);

  const [sort, setSort] = useState<StaySort>("recommended");
  const [maxPrice, setMaxPrice] = useState<number>(priceBound.max);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [types, setTypes] = useState<StayType[]>([]);

  const filtered = useMemo(
    () =>
      sortStays(
        filterStays(stays, {
          maxPrice: maxPrice >= priceBound.max ? null : maxPrice,
          minRating,
          types,
        }),
        sort,
      ),
    [stays, maxPrice, priceBound.max, minRating, types, sort],
  );

  function toggleType(t: StayType) {
    setTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  function reset() {
    setMaxPrice(priceBound.max);
    setMinRating(null);
    setTypes([]);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside>
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
              Max price / night: {formatCurrency(maxPrice)}
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
              Guest rating
            </h3>
            <div className="space-y-1.5">
              {ratingChoices.map((c) => (
                <label key={c.label} className="flex items-center gap-2 text-sm text-ink/80">
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === c.value}
                    onChange={() => setMinRating(c.value)}
                    className="accent-ink"
                  />
                  {c.label}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              Property type
            </h3>
            <div className="space-y-1.5">
              {typeOptions.map((t) => (
                <label key={t} className="flex items-center gap-2 text-sm text-ink/80">
                  <input
                    type="checkbox"
                    checked={types.includes(t)}
                    onChange={() => toggleType(t)}
                    className="accent-ink"
                  />
                  {t}
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
            {filtered.length === 1 ? "property" : "properties"}
          </p>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-muted">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as StaySort)}
              className="h-10 rounded-full border border-line-strong bg-surface px-3 text-sm font-medium focus:border-ink/40 focus:outline-none focus:ring-2 focus:ring-accent-500/30"
            >
              {staySortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </label>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line-strong bg-surface p-10 text-center">
            <p className="font-semibold text-ink">No stays match your filters</p>
            <p className="mt-1 text-sm text-muted">Try raising your price cap or clearing types.</p>
            <button
              type="button"
              onClick={reset}
              className="mt-4 text-sm font-semibold text-accent-700 hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((stay) => (
              <StayCard key={stay.id} stay={stay} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
