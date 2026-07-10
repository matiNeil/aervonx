import { airports } from "./airports";

/**
 * Human-friendly place suggestions for search autocomplete (`<datalist>`).
 * Combines airport cities with a few leisure spots that aren't airports here.
 */
const extra = ["Zanzibar", "Seychelles", "Maldives", "Mauritius"];

export const placeSuggestions: string[] = Array.from(
  new Set([
    ...airports.map((a) => `${a.city} (${a.code})`),
    ...extra,
  ]),
).sort((a, b) => a.localeCompare(b));
