import type { Transfer, TransferClass } from "@/lib/types";

let seq = 0;

interface TransferInput {
  from: string;
  to: string;
  city: string;
  country: string;
  vehicleClass: TransferClass;
  seats: number;
  bags: number;
  durationMinutes: number;
  price: number;
}

function transfer(p: TransferInput): Transfer {
  return {
    id: `tr_${(++seq).toString().padStart(3, "0")}`,
    ...p,
    currency: "USD",
    partner: "Kiwitaxi",
    deepLink: "https://kiwitaxi.com/",
  };
}

export const transfers: Transfer[] = [
  transfer({ from: "Dubai Intl (DXB)", to: "Downtown Dubai", city: "Dubai", country: "UAE", vehicleClass: "Standard", seats: 3, bags: 3, durationMinutes: 25, price: 28 }),
  transfer({ from: "Dubai Intl (DXB)", to: "Palm Jumeirah", city: "Dubai", country: "UAE", vehicleClass: "Luxury", seats: 3, bags: 3, durationMinutes: 35, price: 72 }),

  transfer({ from: "Cape Town Intl (CPT)", to: "V&A Waterfront", city: "Cape Town", country: "South Africa", vehicleClass: "Standard", seats: 3, bags: 2, durationMinutes: 30, price: 24 }),
  transfer({ from: "Cape Town Intl (CPT)", to: "Camps Bay", city: "Cape Town", country: "South Africa", vehicleClass: "Executive", seats: 3, bags: 3, durationMinutes: 40, price: 46 }),

  transfer({ from: "Victoria Falls (VFA)", to: "Falls hotels", city: "Victoria Falls", country: "Zimbabwe", vehicleClass: "Shared shuttle", seats: 8, bags: 1, durationMinutes: 25, price: 12 }),
  transfer({ from: "Victoria Falls (VFA)", to: "Falls hotels", city: "Victoria Falls", country: "Zimbabwe", vehicleClass: "Standard", seats: 4, bags: 3, durationMinutes: 20, price: 30 }),

  transfer({ from: "Jomo Kenyatta (NBO)", to: "Nairobi CBD", city: "Nairobi", country: "Kenya", vehicleClass: "Standard", seats: 3, bags: 2, durationMinutes: 45, price: 26 }),
  transfer({ from: "O. R. Tambo (JNB)", to: "Sandton", city: "Johannesburg", country: "South Africa", vehicleClass: "Executive", seats: 3, bags: 3, durationMinutes: 35, price: 38 }),

  transfer({ from: "Heathrow (LHR)", to: "Central London", city: "London", country: "United Kingdom", vehicleClass: "Standard", seats: 4, bags: 3, durationMinutes: 55, price: 64 }),
  transfer({ from: "Heathrow (LHR)", to: "Central London", city: "London", country: "United Kingdom", vehicleClass: "Minivan", seats: 7, bags: 7, durationMinutes: 60, price: 96 }),

  transfer({ from: "Charles de Gaulle (CDG)", to: "Central Paris", city: "Paris", country: "France", vehicleClass: "Standard", seats: 3, bags: 3, durationMinutes: 50, price: 58 }),
  transfer({ from: "Ngurah Rai (DPS)", to: "Seminyak", city: "Bali", country: "Indonesia", vehicleClass: "Standard", seats: 3, bags: 2, durationMinutes: 30, price: 16 }),
  transfer({ from: "Istanbul (IST)", to: "Sultanahmet", city: "Istanbul", country: "Türkiye", vehicleClass: "Standard", seats: 3, bags: 3, durationMinutes: 50, price: 34 }),
  transfer({ from: "Changi (SIN)", to: "Marina Bay", city: "Singapore", country: "Singapore", vehicleClass: "Executive", seats: 3, bags: 3, durationMinutes: 25, price: 42 }),
  transfer({ from: "John F. Kennedy (JFK)", to: "Manhattan", city: "New York", country: "United States", vehicleClass: "Standard", seats: 3, bags: 3, durationMinutes: 55, price: 78 }),
];
