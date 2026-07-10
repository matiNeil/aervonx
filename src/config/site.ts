/**
 * Central site configuration — the single source of truth for branding,
 * navigation, contact details, and affiliate identifiers.
 *
 * Swap real affiliate IDs in here once partner accounts are approved; nothing
 * else in the app needs to change.
 */

export interface NavItem {
  label: string;
  href: string;
  /** Short description used in menus / footers. */
  description?: string;
}

export const siteConfig = {
  name: "AervonX",
  legalName: "AervonX Travel",
  tagline: "Compare cheap flights, hotels, holiday packages & airport transfers",
  description:
    "Discover the world with AervonX. Book flights, premium stays, curated holiday experiences, airport transfers and car rentals through one seamless travel platform designed to take you further.",
  // Used for metadataBase / canonical URLs. Update to the live domain.
  url: "https://aervonx.com",
  contact: {
    email: "support@aervonx.com",
  },
  poweredBy: "ForgeStackX",
  /** Primary navigation — the five booking verticals. */
  nav: [
    { label: "Flights", href: "/flights", description: "Compare fares from 100s of airlines" },
    { label: "Accommodation", href: "/accommodation", description: "Hotels, villas & apartments" },
    { label: "Holiday Packages", href: "/packages", description: "Flight + hotel bundles" },
    { label: "Airport Transfers", href: "/transfers", description: "Private & shared rides" },
    { label: "Car Rentals", href: "/car-rentals", description: "Self-drive, economy to luxury" },
  ] satisfies NavItem[],
  /**
   * Affiliate markers/IDs appended to outbound partner links by the `/go`
   * redirect handler. These are placeholders — replace with your real IDs.
   */
  affiliate: {
    // Travelpayouts / Aviasales style marker (flights & some transfers).
    travelpayoutsMarker: "aervonx-000000",
    // Booking.com partner affiliate id (`aid`).
    bookingAid: "0000000",
    // Generic fallback marker / sub-id.
    defaultSubId: "aervonx",
  },
  social: {
    facebook: "#",
    instagram: "#",
    x: "#",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export const navItems: readonly NavItem[] = siteConfig.nav;
