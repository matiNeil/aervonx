/**
 * Data provider layer.
 *
 * The UI only ever talks to a `TravelProvider`. Today that's `mockProvider`
 * (in-memory sample data), but a real provider — Travelpayouts, Duffel,
 * Amadeus, Booking.com — can implement the same interface and be swapped in
 * by changing `activeProvider` below. The async signatures mean no page or
 * component needs to change when that happens.
 */
import type {
  CarRental,
  FlightOffer,
  HolidayPackage,
  SearchQuery,
  Stay,
  Transfer,
} from "@/lib/types";
import { flights } from "@/lib/data/flights";
import { stays } from "@/lib/data/stays";
import { packages } from "@/lib/data/packages";
import { transfers } from "@/lib/data/transfers";
import { carRentals } from "@/lib/data/car-rentals";
import { findAirport } from "@/lib/data/airports";

export interface TravelProvider {
  readonly name: string;
  searchFlights(query: SearchQuery): Promise<FlightOffer[]>;
  searchStays(query: SearchQuery): Promise<Stay[]>;
  searchPackages(query: SearchQuery): Promise<HolidayPackage[]>;
  searchTransfers(query: SearchQuery): Promise<Transfer[]>;
  searchCarRentals(query: SearchQuery): Promise<CarRental[]>;
}

/** Resolve a free-text place query to a comparable city name (lowercase). */
function toCity(query?: string): string | undefined {
  if (!query) return undefined;
  const trimmed = query.trim();
  if (!trimmed) return undefined;
  return (findAirport(trimmed)?.city ?? trimmed).toLowerCase();
}

function matchesPlace(code: string, city: string, query?: string): boolean {
  if (!query) return true;
  const ap = findAirport(query);
  if (ap) return ap.code === code;
  const q = query.trim().toLowerCase();
  return city.toLowerCase().includes(q) || code.toLowerCase().includes(q);
}

export const mockProvider: TravelProvider = {
  name: "mock",

  async searchFlights(query) {
    let results = flights.filter(
      (f) =>
        matchesPlace(f.origin.code, f.origin.city, query.origin) &&
        matchesPlace(f.destination.code, f.destination.city, query.destination),
    );
    // Never show an empty board in the demo — fall back to all inventory.
    if (results.length === 0) results = flights;
    return [...results].sort((a, b) => a.price - b.price);
  },

  async searchStays(query) {
    const city = toCity(query.destination);
    let results = stays;
    if (city) {
      const filtered = stays.filter((s) => s.city.toLowerCase().includes(city));
      results = filtered.length ? filtered : stays;
    }
    return [...results].sort((a, b) => b.rating - a.rating);
  },

  async searchPackages(query) {
    const city = toCity(query.destination);
    let results = packages;
    if (city) {
      const filtered = packages.filter((p) =>
        p.city.toLowerCase().includes(city),
      );
      results = filtered.length ? filtered : packages;
    }
    return [...results].sort((a, b) => b.rating - a.rating);
  },

  async searchTransfers(query) {
    const needle = toCity(query.destination ?? query.origin);
    let results = transfers;
    if (needle) {
      const filtered = transfers.filter(
        (t) =>
          t.city.toLowerCase().includes(needle) ||
          t.from.toLowerCase().includes(needle) ||
          t.to.toLowerCase().includes(needle),
      );
      results = filtered.length ? filtered : transfers;
    }
    return [...results].sort((a, b) => a.price - b.price);
  },

  async searchCarRentals(query) {
    const needle = toCity(query.destination ?? query.origin);
    let results = carRentals;
    if (needle) {
      const filtered = carRentals.filter(
        (c) =>
          c.city.toLowerCase().includes(needle) ||
          c.pickupLocation.toLowerCase().includes(needle),
      );
      results = filtered.length ? filtered : carRentals;
    }
    return [...results].sort((a, b) => a.pricePerDay - b.pricePerDay);
  },
};

/** The active provider. Swap this to go live with a real integration. */
export const provider: TravelProvider = mockProvider;
