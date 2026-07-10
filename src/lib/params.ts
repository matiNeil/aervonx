import type { SearchInitial, SearchQuery, TripType } from "@/lib/types";

/** Next.js App Router `searchParams` shape. */
export type RawSearchParams = Record<string, string | string[] | undefined>;

function one(value: string | string[] | undefined): string | undefined {
  const v = Array.isArray(value) ? value[0] : value;
  const trimmed = v?.trim();
  return trimmed ? trimmed : undefined;
}

function tripType(value: string | undefined): TripType | undefined {
  return value === "oneway" || value === "round" ? value : undefined;
}

/**
 * Normalise raw `searchParams` into both a typed `SearchQuery` (for the data
 * provider) and a `SearchInitial` (to pre-fill the search form inputs).
 */
export function parseSearch(raw: RawSearchParams): {
  query: SearchQuery;
  initial: SearchInitial;
} {
  const origin = one(raw.origin);
  const destination = one(raw.destination);
  const depart = one(raw.depart);
  const ret = one(raw.return);
  const adults = one(raw.adults);
  const rooms = one(raw.rooms);
  const tt = tripType(one(raw.tripType));

  const query: SearchQuery = {
    origin,
    destination,
    depart,
    return: ret,
    tripType: tt,
    adults: adults ? Number(adults) : undefined,
    rooms: rooms ? Number(rooms) : undefined,
  };

  const initial: SearchInitial = {
    origin,
    destination,
    depart,
    return: ret,
    adults,
    rooms,
    tripType: tt,
  };

  return { query, initial };
}

/** Human-readable summary of the active route, e.g. "Harare → Dubai". */
export function routeSummary(query: SearchQuery): string | null {
  if (query.origin && query.destination) return `${query.origin} → ${query.destination}`;
  if (query.destination) return query.destination;
  if (query.origin) return query.origin;
  return null;
}
