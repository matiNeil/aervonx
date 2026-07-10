/**
 * Affiliate link helpers.
 *
 * The booking model is redirect/commission: every "Book"/"View deal" action
 * routes through the internal `/go` handler, which stamps the configured
 * affiliate marker onto the outbound partner URL and forwards the user there.
 *
 * `buildGoLink` is used by UI cards; `applyAffiliateMarker` is used by the
 * `/go` route handler (see app/go/route.ts).
 */
import { siteConfig } from "@/config/site";

export type PartnerKey = "booking" | "skyscanner" | "travelpayouts" | "generic";

export interface GoLinkOptions {
  partner: PartnerKey;
  /** Absolute https URL of the partner deep link. */
  url: string;
  /** Optional human label, useful for analytics/sub-ids later. */
  label?: string;
}

/** Build an internal `/go` URL that the redirect handler will resolve. */
export function buildGoLink({ partner, url, label }: GoLinkOptions): string {
  const params = new URLSearchParams({ partner, u: url });
  if (label) params.set("label", label);
  return `/go?${params.toString()}`;
}

/**
 * Append the configured affiliate marker(s) for `partner` onto `rawUrl`.
 * Returns `null` when the URL is missing or not http(s) — the handler then
 * falls back to a safe destination.
 */
export function applyAffiliateMarker(
  partner: string,
  rawUrl: string | null,
): string | null {
  if (!rawUrl) return null;

  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;

  const { affiliate } = siteConfig;
  switch (partner) {
    case "booking":
      url.searchParams.set("aid", affiliate.bookingAid);
      url.searchParams.set("label", affiliate.defaultSubId);
      break;
    case "skyscanner":
    case "travelpayouts":
      url.searchParams.set("marker", affiliate.travelpayoutsMarker);
      break;
    default:
      url.searchParams.set("subid", affiliate.defaultSubId);
  }
  return url.toString();
}
