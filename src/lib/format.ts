/** Small presentation helpers shared across cards and pages. */

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** 95 -> "1h 35m", 60 -> "1h 00m". */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m.toString().padStart(2, "0")}m`;
}

export function formatStops(stops: number): string {
  if (stops <= 0) return "Direct";
  return stops === 1 ? "1 stop" : `${stops} stops`;
}

export function pluralize(count: number, singular: string, plural?: string): string {
  const word = count === 1 ? singular : plural ?? `${singular}s`;
  return `${count} ${word}`;
}

/** Booking.com-style verbal label for a /10 guest score. */
export function ratingLabel(rating: number): string {
  if (rating >= 9) return "Superb";
  if (rating >= 8.5) return "Fabulous";
  if (rating >= 8) return "Very good";
  if (rating >= 7) return "Good";
  return "Pleasant";
}

export function cabinLabel(cabin: string): string {
  return cabin.charAt(0).toUpperCase() + cabin.slice(1);
}
