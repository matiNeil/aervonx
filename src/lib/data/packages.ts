import type { HolidayPackage, PackageTheme } from "@/lib/types";

let seq = 0;

interface PackageInput {
  title: string;
  city: string;
  country: string;
  nights: number;
  fromPrice: number;
  rating: number;
  theme: PackageTheme;
  inclusions: string[];
}

function pkg(p: PackageInput): HolidayPackage {
  const id = `pk_${(++seq).toString().padStart(3, "0")}`;
  return {
    id,
    ...p,
    currency: "USD",
    partner: "Booking.com",
    deepLink: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(p.city)}`,
    seed: `${p.city}-pkg-${id}`,
  };
}

export const packages: HolidayPackage[] = [
  pkg({ title: "Victoria Falls Safari Escape", city: "Victoria Falls", country: "Zimbabwe", nights: 4, fromPrice: 845, rating: 9.2, theme: "Safari", inclusions: ["Return flights", "4★ lodge", "Falls tour", "Game drive", "Breakfast"] }),
  pkg({ title: "Zanzibar Beach & Spice", city: "Zanzibar", country: "Tanzania", nights: 7, fromPrice: 1180, rating: 9.0, theme: "Beach", inclusions: ["Return flights", "Beach resort", "Airport transfers", "Half board"] }),
  pkg({ title: "Cape Town City & Wine", city: "Cape Town", country: "South Africa", nights: 5, fromPrice: 990, rating: 8.9, theme: "City break", inclusions: ["Return flights", "4★ hotel", "Table Mountain pass", "Winelands tour"] }),
  pkg({ title: "Dubai Luxury Stopover", city: "Dubai", country: "UAE", nights: 4, fromPrice: 760, rating: 8.8, theme: "City break", inclusions: ["Return flights", "5★ hotel", "Desert safari", "Airport transfers"] }),
  pkg({ title: "Bali Honeymoon Retreat", city: "Bali", country: "Indonesia", nights: 8, fromPrice: 1490, rating: 9.4, theme: "Honeymoon", inclusions: ["Return flights", "Private pool villa", "Daily breakfast", "Couples spa"] }),
  pkg({ title: "Kenya Masai Mara Adventure", city: "Nairobi", country: "Kenya", nights: 6, fromPrice: 1320, rating: 9.1, theme: "Safari", inclusions: ["Return flights", "Safari camp", "All game drives", "Full board"] }),
  pkg({ title: "Paris Romantic Getaway", city: "Paris", country: "France", nights: 3, fromPrice: 680, rating: 8.7, theme: "City break", inclusions: ["Return flights", "Boutique hotel", "Seine cruise", "Breakfast"] }),
  pkg({ title: "Singapore Family Fun", city: "Singapore", country: "Singapore", nights: 5, fromPrice: 1240, rating: 8.9, theme: "Family", inclusions: ["Return flights", "4★ hotel", "Sentosa passes", "Airport transfers"] }),
  pkg({ title: "Istanbul Heritage Trail", city: "Istanbul", country: "Türkiye", nights: 4, fromPrice: 590, rating: 8.6, theme: "Adventure", inclusions: ["Return flights", "Old town hotel", "Bosphorus cruise", "Guided tour"] }),
];
