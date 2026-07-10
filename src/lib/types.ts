/**
 * Shared domain types used across the UI and the (currently mock) data
 * providers. Keeping these provider-agnostic means real APIs — Travelpayouts,
 * Duffel, Amadeus, Booking.com — can map onto the same shapes later.
 */

export type CabinClass = "economy" | "premium" | "business" | "first";

export interface Airport {
  /** IATA code, e.g. "LHR". */
  code: string;
  city: string;
  country: string;
  /** Full airport name, e.g. "Heathrow". */
  name: string;
}

export interface Airline {
  /** IATA airline code, e.g. "BA". */
  code: string;
  name: string;
}

export interface FlightOffer {
  id: string;
  airline: Airline;
  origin: Airport;
  destination: Airport;
  /** Local display time, e.g. "08:45". */
  departTime: string;
  arriveTime: string;
  /** Total journey time in minutes. */
  durationMinutes: number;
  stops: number;
  /** Cities for any layovers, in order. */
  stopCities: string[];
  cabin: CabinClass;
  price: number;
  currency: string;
  /** Marketing partner shown on the deal (where the user is sent to book). */
  partner: string;
  /** Outbound partner URL the affiliate redirect will forward to. */
  deepLink: string;
}

export type StayType =
  | "Hotel"
  | "Apartment"
  | "Villa"
  | "Resort"
  | "Guesthouse"
  | "Lodge";

export interface Stay {
  id: string;
  name: string;
  city: string;
  country: string;
  type: StayType;
  /** Guest rating out of 10 (Booking.com style). */
  rating: number;
  reviews: number;
  /** Star rating out of 5. */
  stars: number;
  pricePerNight: number;
  currency: string;
  amenities: string[];
  /** Distance from the city centre, in km. */
  distanceFromCentreKm: number;
  partner: string;
  deepLink: string;
  /** Seed used to render a deterministic illustrative cover image. */
  seed: string;
}

export type PackageTheme =
  | "Beach"
  | "Safari"
  | "City break"
  | "Honeymoon"
  | "Adventure"
  | "Family";

export interface HolidayPackage {
  id: string;
  title: string;
  city: string;
  country: string;
  nights: number;
  /** Lead-in "from" price per person. */
  fromPrice: number;
  currency: string;
  rating: number;
  theme: PackageTheme;
  inclusions: string[];
  partner: string;
  deepLink: string;
  seed: string;
}

export type TransferClass =
  | "Shared shuttle"
  | "Standard"
  | "Executive"
  | "Luxury"
  | "Minivan";

export interface Transfer {
  id: string;
  /** Origin point, typically an airport. */
  from: string;
  /** Destination area / city. */
  to: string;
  city: string;
  country: string;
  vehicleClass: TransferClass;
  seats: number;
  bags: number;
  durationMinutes: number;
  price: number;
  currency: string;
  partner: string;
  deepLink: string;
}

export type CarClass = "Economy" | "Compact" | "SUV" | "Luxury" | "Van";

export interface CarRental {
  id: string;
  company: string;
  model: string;
  carClass: CarClass;
  city: string;
  country: string;
  /** Pickup point, typically an airport or city location. */
  pickupLocation: string;
  seats: number;
  bags: number;
  transmission: "Automatic" | "Manual";
  pricePerDay: number;
  currency: string;
  partner: string;
  deepLink: string;
}

export type TripType = "round" | "oneway";

/** Normalised query parsed from URL search params for any vertical. */
export interface SearchQuery {
  origin?: string;
  destination?: string;
  depart?: string;
  return?: string;
  tripType?: TripType;
  adults?: number;
  children?: number;
  rooms?: number;
  cabin?: CabinClass;
}

/** Raw string-typed values used to pre-fill the search form inputs. */
export interface SearchInitial {
  origin?: string;
  destination?: string;
  depart?: string;
  return?: string;
  adults?: string;
  rooms?: string;
  tripType?: TripType;
}
