import type { CarClass, CarRental } from "@/lib/types";

let seq = 0;

interface CarRentalInput {
  company: string;
  model: string;
  carClass: CarClass;
  city: string;
  country: string;
  pickupLocation: string;
  seats: number;
  bags: number;
  transmission: "Automatic" | "Manual";
  pricePerDay: number;
}

function carRental(p: CarRentalInput): CarRental {
  return {
    id: `cr_${(++seq).toString().padStart(3, "0")}`,
    ...p,
    currency: "USD",
    partner: "RentalCars",
    deepLink: "https://www.rentalcars.com/",
  };
}

export const carRentals: CarRental[] = [
  carRental({ company: "Avis", model: "Toyota Corolla or similar", carClass: "Economy", city: "Dubai", country: "UAE", pickupLocation: "Dubai Intl Airport (DXB)", seats: 5, bags: 2, transmission: "Automatic", pricePerDay: 22 }),
  carRental({ company: "Hertz", model: "Nissan Patrol or similar", carClass: "SUV", city: "Dubai", country: "UAE", pickupLocation: "Dubai Intl Airport (DXB)", seats: 7, bags: 4, transmission: "Automatic", pricePerDay: 58 }),

  carRental({ company: "Europcar", model: "VW Polo or similar", carClass: "Compact", city: "Cape Town", country: "South Africa", pickupLocation: "Cape Town Intl Airport (CPT)", seats: 5, bags: 2, transmission: "Manual", pricePerDay: 19 }),
  carRental({ company: "Avis", model: "Toyota Fortuner or similar", carClass: "SUV", city: "Cape Town", country: "South Africa", pickupLocation: "Cape Town Intl Airport (CPT)", seats: 5, bags: 4, transmission: "Automatic", pricePerDay: 44 }),

  carRental({ company: "Europcar", model: "Toyota Hilux or similar", carClass: "SUV", city: "Victoria Falls", country: "Zimbabwe", pickupLocation: "Victoria Falls Airport (VFA)", seats: 5, bags: 3, transmission: "Manual", pricePerDay: 52 }),
  carRental({ company: "Hertz", model: "Toyota Corolla or similar", carClass: "Economy", city: "Nairobi", country: "Kenya", pickupLocation: "Jomo Kenyatta Airport (NBO)", seats: 5, bags: 2, transmission: "Automatic", pricePerDay: 24 }),

  carRental({ company: "Avis", model: "BMW 3 Series or similar", carClass: "Luxury", city: "Johannesburg", country: "South Africa", pickupLocation: "O. R. Tambo Airport (JNB)", seats: 5, bags: 3, transmission: "Automatic", pricePerDay: 74 }),
  carRental({ company: "Sixt", model: "Mercedes V-Class or similar", carClass: "Van", city: "London", country: "United Kingdom", pickupLocation: "Heathrow Airport (LHR)", seats: 7, bags: 6, transmission: "Automatic", pricePerDay: 96 }),

  carRental({ company: "Sixt", model: "VW Golf or similar", carClass: "Compact", city: "Paris", country: "France", pickupLocation: "Charles de Gaulle Airport (CDG)", seats: 5, bags: 3, transmission: "Manual", pricePerDay: 38 }),
  carRental({ company: "Avis", model: "Toyota Avanza or similar", carClass: "Compact", city: "Bali", country: "Indonesia", pickupLocation: "Ngurah Rai Airport (DPS)", seats: 7, bags: 3, transmission: "Automatic", pricePerDay: 21 }),
  carRental({ company: "Europcar", model: "Fiat Egea or similar", carClass: "Economy", city: "Istanbul", country: "Türkiye", pickupLocation: "Istanbul Airport (IST)", seats: 5, bags: 2, transmission: "Manual", pricePerDay: 27 }),
  carRental({ company: "Hertz", model: "Mercedes E-Class or similar", carClass: "Luxury", city: "Singapore", country: "Singapore", pickupLocation: "Changi Airport (SIN)", seats: 5, bags: 3, transmission: "Automatic", pricePerDay: 118 }),
  carRental({ company: "Enterprise", model: "Chevrolet Malibu or similar", carClass: "Economy", city: "New York", country: "United States", pickupLocation: "John F. Kennedy Airport (JFK)", seats: 5, bags: 3, transmission: "Automatic", pricePerDay: 46 }),
];
