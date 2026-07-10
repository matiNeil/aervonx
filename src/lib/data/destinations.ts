export interface Destination {
  city: string;
  country: string;
  /** Lead-in "from" flight price in USD. */
  fromPrice: number;
  /** Short tagline. */
  blurb: string;
  /** Default origin used when building the explore link. */
  origin: string;
  seed: string;
}

/** Featured destinations shown on the home page "trending" grid. */
export const destinations: Destination[] = [
  { city: "Cape Town", country: "South Africa", fromPrice: 264, blurb: "Table Mountain & beaches", origin: "HRE", seed: "Cape Town-dest" },
  { city: "Dubai", country: "UAE", fromPrice: 521, blurb: "Skyline, souks & desert", origin: "HRE", seed: "Dubai-dest" },
  { city: "Zanzibar", country: "Tanzania", fromPrice: 388, blurb: "White-sand island escape", origin: "HRE", seed: "Zanzibar-dest" },
  { city: "London", country: "United Kingdom", fromPrice: 788, blurb: "History meets the modern", origin: "HRE", seed: "London-dest" },
  { city: "Nairobi", country: "Kenya", fromPrice: 212, blurb: "Gateway to the savannah", origin: "HRE", seed: "Nairobi-dest" },
  { city: "Bali", country: "Indonesia", fromPrice: 642, blurb: "Temples, surf & rice fields", origin: "HRE", seed: "Bali-dest" },
  { city: "Victoria Falls", country: "Zimbabwe", fromPrice: 96, blurb: "The smoke that thunders", origin: "JNB", seed: "Victoria Falls-dest" },
  { city: "Istanbul", country: "Türkiye", fromPrice: 498, blurb: "Where two continents meet", origin: "HRE", seed: "Istanbul-dest" },
];
