import type { Airport } from "@/lib/types";

/** A curated set of hub & leisure airports used by the mock flight data. */
export const airports: Airport[] = [
  { code: "HRE", city: "Harare", country: "Zimbabwe", name: "Robert Gabriel Mugabe Intl" },
  { code: "VFA", city: "Victoria Falls", country: "Zimbabwe", name: "Victoria Falls" },
  { code: "BUQ", city: "Bulawayo", country: "Zimbabwe", name: "Joshua Mqabuko Nkomo Intl" },
  { code: "JNB", city: "Johannesburg", country: "South Africa", name: "O. R. Tambo Intl" },
  { code: "CPT", city: "Cape Town", country: "South Africa", name: "Cape Town Intl" },
  { code: "NBO", city: "Nairobi", country: "Kenya", name: "Jomo Kenyatta Intl" },
  { code: "DAR", city: "Dar es Salaam", country: "Tanzania", name: "Julius Nyerere Intl" },
  { code: "LOS", city: "Lagos", country: "Nigeria", name: "Murtala Muhammed Intl" },
  { code: "ACC", city: "Accra", country: "Ghana", name: "Kotoka Intl" },
  { code: "DXB", city: "Dubai", country: "UAE", name: "Dubai Intl" },
  { code: "DOH", city: "Doha", country: "Qatar", name: "Hamad Intl" },
  { code: "IST", city: "Istanbul", country: "Türkiye", name: "Istanbul" },
  { code: "LHR", city: "London", country: "United Kingdom", name: "Heathrow" },
  { code: "CDG", city: "Paris", country: "France", name: "Charles de Gaulle" },
  { code: "AMS", city: "Amsterdam", country: "Netherlands", name: "Schiphol" },
  { code: "JFK", city: "New York", country: "United States", name: "John F. Kennedy Intl" },
  { code: "SIN", city: "Singapore", country: "Singapore", name: "Changi" },
  { code: "DPS", city: "Bali", country: "Indonesia", name: "Ngurah Rai Intl" },
];

const byCode = new Map(airports.map((a) => [a.code.toLowerCase(), a]));

/**
 * Resolve a free-text query (IATA code or city name) to an airport.
 * Falls back to a partial city/country match.
 */
export function findAirport(query?: string | null): Airport | undefined {
  if (!query) return undefined;
  const q = query.trim().toLowerCase();
  if (!q) return undefined;
  if (byCode.has(q)) return byCode.get(q);
  return (
    airports.find((a) => a.city.toLowerCase() === q) ??
    airports.find(
      (a) =>
        a.city.toLowerCase().includes(q) ||
        a.code.toLowerCase().includes(q) ||
        a.country.toLowerCase().includes(q),
    )
  );
}

export function airportLabel(a: Airport): string {
  return `${a.city} (${a.code})`;
}
