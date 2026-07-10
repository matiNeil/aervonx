/** Pure, framework-agnostic sort & filter helpers for the result lists. */
import type { FlightOffer, Stay, StayType } from "@/lib/types";

/* ----------------------------- Flights ----------------------------- */

export type FlightSort = "cheapest" | "fastest" | "earliest";

export const flightSortOptions: { value: FlightSort; label: string }[] = [
  { value: "cheapest", label: "Cheapest" },
  { value: "fastest", label: "Fastest" },
  { value: "earliest", label: "Earliest departure" },
];

function departMinutes(time: string): number {
  const [h, m] = time.split("+")[0].split(":").map(Number);
  return h * 60 + m;
}

export interface FlightFilterState {
  maxStops: number | null;
  airlines: string[];
  maxPrice: number | null;
}

export function filterFlights(
  list: FlightOffer[],
  { maxStops, airlines, maxPrice }: FlightFilterState,
): FlightOffer[] {
  return list.filter((f) => {
    if (maxStops !== null && f.stops > maxStops) return false;
    if (airlines.length > 0 && !airlines.includes(f.airline.code)) return false;
    if (maxPrice !== null && f.price > maxPrice) return false;
    return true;
  });
}

export function sortFlights(list: FlightOffer[], sort: FlightSort): FlightOffer[] {
  const copy = [...list];
  switch (sort) {
    case "fastest":
      return copy.sort((a, b) => a.durationMinutes - b.durationMinutes);
    case "earliest":
      return copy.sort((a, b) => departMinutes(a.departTime) - departMinutes(b.departTime));
    case "cheapest":
    default:
      return copy.sort((a, b) => a.price - b.price);
  }
}

/* ------------------------------ Stays ------------------------------ */

export type StaySort = "recommended" | "price-asc" | "price-desc" | "rating";

export const staySortOptions: { value: StaySort; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price (low to high)" },
  { value: "price-desc", label: "Price (high to low)" },
  { value: "rating", label: "Guest rating" },
];

export interface StayFilterState {
  maxPrice: number | null;
  minRating: number | null;
  types: StayType[];
}

export function filterStays(
  list: Stay[],
  { maxPrice, minRating, types }: StayFilterState,
): Stay[] {
  return list.filter((s) => {
    if (maxPrice !== null && s.pricePerNight > maxPrice) return false;
    if (minRating !== null && s.rating < minRating) return false;
    if (types.length > 0 && !types.includes(s.type)) return false;
    return true;
  });
}

export function sortStays(list: Stay[], sort: StaySort): Stay[] {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.pricePerNight - b.pricePerNight);
    case "price-desc":
      return copy.sort((a, b) => b.pricePerNight - a.pricePerNight);
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    case "recommended":
    default:
      // Recommended = rating weighted by review volume.
      return copy.sort(
        (a, b) => b.rating * Math.log10(b.reviews + 10) - a.rating * Math.log10(a.reviews + 10),
      );
  }
}
