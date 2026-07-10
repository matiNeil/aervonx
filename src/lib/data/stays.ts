import type { Stay, StayType } from "@/lib/types";

function bookingDeepLink(city: string): string {
  return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(city)}`;
}

let seq = 0;

interface StayInput {
  name: string;
  city: string;
  country: string;
  type: StayType;
  rating: number;
  reviews: number;
  stars: number;
  pricePerNight: number;
  amenities: string[];
  distanceFromCentreKm: number;
}

function stay(p: StayInput): Stay {
  const id = `st_${(++seq).toString().padStart(3, "0")}`;
  return {
    id,
    ...p,
    currency: "USD",
    partner: "Booking.com",
    deepLink: bookingDeepLink(p.city),
    seed: `${p.city}-${id}`,
  };
}

export const stays: Stay[] = [
  stay({ name: "Atlantis The Palm", city: "Dubai", country: "UAE", type: "Resort", rating: 9.1, reviews: 18420, stars: 5, pricePerNight: 410, amenities: ["Pool", "Spa", "Beachfront", "Free WiFi", "Breakfast"], distanceFromCentreKm: 12.4 }),
  stay({ name: "Rove Downtown", city: "Dubai", country: "UAE", type: "Hotel", rating: 8.6, reviews: 9210, stars: 3, pricePerNight: 96, amenities: ["Pool", "Gym", "Free WiFi", "24h reception"], distanceFromCentreKm: 1.1 }),

  stay({ name: "The Silo Hotel", city: "Cape Town", country: "South Africa", type: "Hotel", rating: 9.4, reviews: 3120, stars: 5, pricePerNight: 520, amenities: ["Rooftop pool", "Spa", "Sea view", "Free WiFi", "Bar"], distanceFromCentreKm: 2.0 }),
  stay({ name: "Camps Bay Retreat", city: "Cape Town", country: "South Africa", type: "Villa", rating: 9.0, reviews: 1450, stars: 4, pricePerNight: 240, amenities: ["Pool", "Mountain view", "Free parking", "Free WiFi"], distanceFromCentreKm: 6.3 }),

  stay({ name: "Victoria Falls Hotel", city: "Victoria Falls", country: "Zimbabwe", type: "Hotel", rating: 9.2, reviews: 5240, stars: 5, pricePerNight: 305, amenities: ["Falls view", "Pool", "Garden", "Breakfast", "Bar"], distanceFromCentreKm: 1.4 }),
  stay({ name: "Shearwater Explorers Village", city: "Victoria Falls", country: "Zimbabwe", type: "Lodge", rating: 8.4, reviews: 1980, stars: 3, pricePerNight: 88, amenities: ["Pool", "Restaurant", "Free WiFi", "Family rooms"], distanceFromCentreKm: 2.2 }),

  stay({ name: "Zanzibar Pearl Beach Resort", city: "Zanzibar", country: "Tanzania", type: "Resort", rating: 9.0, reviews: 2670, stars: 4, pricePerNight: 198, amenities: ["Beachfront", "Pool", "Spa", "Breakfast", "Airport shuttle"], distanceFromCentreKm: 0.3 }),

  stay({ name: "Sankara Nairobi", city: "Nairobi", country: "Kenya", type: "Hotel", rating: 8.8, reviews: 6120, stars: 5, pricePerNight: 165, amenities: ["Rooftop pool", "Spa", "Gym", "Free WiFi", "Bar"], distanceFromCentreKm: 3.0 }),

  stay({ name: "The Maslow", city: "Johannesburg", country: "South Africa", type: "Hotel", rating: 8.5, reviews: 4310, stars: 4, pricePerNight: 120, amenities: ["Pool", "Gym", "Free parking", "Free WiFi", "Restaurant"], distanceFromCentreKm: 9.5 }),

  stay({ name: "The Hoxton, Shoreditch", city: "London", country: "United Kingdom", type: "Hotel", rating: 8.9, reviews: 11240, stars: 4, pricePerNight: 270, amenities: ["Central", "Free WiFi", "Bar", "Restaurant"], distanceFromCentreKm: 1.8 }),
  stay({ name: "Soho Garden Apartments", city: "London", country: "United Kingdom", type: "Apartment", rating: 8.7, reviews: 2890, stars: 4, pricePerNight: 215, amenities: ["Kitchen", "Central", "Free WiFi", "Self check-in"], distanceFromCentreKm: 0.9 }),

  stay({ name: "Hôtel Le Marais", city: "Paris", country: "France", type: "Hotel", rating: 8.8, reviews: 5670, stars: 4, pricePerNight: 230, amenities: ["Central", "Breakfast", "Free WiFi", "Bar"], distanceFromCentreKm: 1.2 }),

  stay({ name: "Ubud Jungle Villas", city: "Bali", country: "Indonesia", type: "Villa", rating: 9.3, reviews: 4120, stars: 4, pricePerNight: 145, amenities: ["Private pool", "Jungle view", "Breakfast", "Free WiFi"], distanceFromCentreKm: 3.5 }),
  stay({ name: "Seminyak Beach Suites", city: "Bali", country: "Indonesia", type: "Resort", rating: 8.9, reviews: 3360, stars: 4, pricePerNight: 132, amenities: ["Beachfront", "Pool", "Spa", "Breakfast"], distanceFromCentreKm: 0.6 }),

  stay({ name: "Sultanahmet Palace", city: "Istanbul", country: "Türkiye", type: "Hotel", rating: 8.6, reviews: 7240, stars: 4, pricePerNight: 110, amenities: ["Old town", "Breakfast", "Free WiFi", "Hammam"], distanceFromCentreKm: 0.5 }),

  stay({ name: "Marina Bay Signature", city: "Singapore", country: "Singapore", type: "Hotel", rating: 9.0, reviews: 9980, stars: 5, pricePerNight: 320, amenities: ["Infinity pool", "City view", "Gym", "Free WiFi"], distanceFromCentreKm: 1.0 }),

  stay({ name: "Manhattan Skyline Suites", city: "New York", country: "United States", type: "Apartment", rating: 8.7, reviews: 6450, stars: 4, pricePerNight: 295, amenities: ["Kitchen", "City view", "Gym", "Free WiFi"], distanceFromCentreKm: 2.4 }),
];
