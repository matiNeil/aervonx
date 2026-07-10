import type { Airline, CabinClass, FlightOffer } from "@/lib/types";
import { airports } from "./airports";

const A = Object.fromEntries(airports.map((a) => [a.code, a]));

export const airlines: Airline[] = [
  { code: "ET", name: "Ethiopian Airlines" },
  { code: "KQ", name: "Kenya Airways" },
  { code: "SA", name: "South African Airways" },
  { code: "EK", name: "Emirates" },
  { code: "QR", name: "Qatar Airways" },
  { code: "BA", name: "British Airways" },
  { code: "KL", name: "KLM" },
  { code: "TK", name: "Turkish Airlines" },
  { code: "WB", name: "RwandAir" },
  { code: "FZ", name: "flydubai" },
  { code: "SQ", name: "Singapore Airlines" },
  { code: "AF", name: "Air France" },
];

const AL = Object.fromEntries(airlines.map((a) => [a.code, a]));

function flightDeepLink(from: string, to: string): string {
  return `https://www.skyscanner.net/transport/flights/${from.toLowerCase()}/${to.toLowerCase()}/`;
}

/** Add minutes to a "HH:MM" time, annotating "+1" when it crosses midnight. */
function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + minutes;
  const dayOffset = Math.floor(total / (24 * 60));
  const mins = ((total % (24 * 60)) + 24 * 60) % (24 * 60);
  const hh = Math.floor(mins / 60)
    .toString()
    .padStart(2, "0");
  const mm = (mins % 60).toString().padStart(2, "0");
  return dayOffset > 0 ? `${hh}:${mm}+${dayOffset}` : `${hh}:${mm}`;
}

let seq = 0;

interface OfferInput {
  from: string;
  to: string;
  airline: string;
  depart: string;
  durationMinutes: number;
  stops: number;
  stopCities?: string[];
  price: number;
  cabin?: CabinClass;
}

function offer(p: OfferInput): FlightOffer {
  return {
    id: `fl_${(++seq).toString().padStart(3, "0")}`,
    airline: AL[p.airline],
    origin: A[p.from],
    destination: A[p.to],
    departTime: p.depart,
    arriveTime: addMinutes(p.depart, p.durationMinutes),
    durationMinutes: p.durationMinutes,
    stops: p.stops,
    stopCities: p.stopCities ?? [],
    cabin: p.cabin ?? "economy",
    price: p.price,
    currency: "USD",
    partner: "Skyscanner",
    deepLink: flightDeepLink(p.from, p.to),
  };
}

/**
 * Deterministic mock flight inventory. Built from explicit route definitions so
 * results are stable between server render and client interactions.
 */
export const flights: FlightOffer[] = [
  // Harare ↔ Johannesburg
  offer({ from: "HRE", to: "JNB", airline: "SA", depart: "07:30", durationMinutes: 115, stops: 0, price: 189 }),
  offer({ from: "HRE", to: "JNB", airline: "KQ", depart: "13:45", durationMinutes: 330, stops: 1, stopCities: ["Nairobi"], price: 158 }),
  offer({ from: "HRE", to: "JNB", airline: "ET", depart: "16:20", durationMinutes: 410, stops: 1, stopCities: ["Addis Ababa"], price: 142 }),

  // Harare ↔ Dubai
  offer({ from: "HRE", to: "DXB", airline: "FZ", depart: "09:10", durationMinutes: 545, stops: 0, price: 612 }),
  offer({ from: "HRE", to: "DXB", airline: "KQ", depart: "14:05", durationMinutes: 780, stops: 1, stopCities: ["Nairobi"], price: 548 }),
  offer({ from: "HRE", to: "DXB", airline: "ET", depart: "22:30", durationMinutes: 860, stops: 1, stopCities: ["Addis Ababa"], price: 521 }),

  // Harare ↔ London
  offer({ from: "HRE", to: "LHR", airline: "EK", depart: "09:10", durationMinutes: 1090, stops: 1, stopCities: ["Dubai"], price: 894 }),
  offer({ from: "HRE", to: "LHR", airline: "QR", depart: "19:40", durationMinutes: 1180, stops: 1, stopCities: ["Doha"], price: 845 }),
  offer({ from: "HRE", to: "LHR", airline: "ET", depart: "13:25", durationMinutes: 1320, stops: 1, stopCities: ["Addis Ababa"], price: 788 }),

  // Harare ↔ Cape Town
  offer({ from: "HRE", to: "CPT", airline: "SA", depart: "06:45", durationMinutes: 250, stops: 1, stopCities: ["Johannesburg"], price: 264 }),
  offer({ from: "HRE", to: "CPT", airline: "KQ", depart: "12:15", durationMinutes: 520, stops: 1, stopCities: ["Nairobi"], price: 312 }),

  // Victoria Falls ↔ Johannesburg
  offer({ from: "VFA", to: "JNB", airline: "SA", depart: "11:00", durationMinutes: 100, stops: 0, price: 176 }),
  offer({ from: "VFA", to: "JNB", airline: "ET", depart: "15:30", durationMinutes: 395, stops: 1, stopCities: ["Addis Ababa"], price: 205 }),

  // Johannesburg ↔ London
  offer({ from: "JNB", to: "LHR", airline: "BA", depart: "19:15", durationMinutes: 690, stops: 0, price: 742 }),
  offer({ from: "JNB", to: "LHR", airline: "EK", depart: "13:40", durationMinutes: 1015, stops: 1, stopCities: ["Dubai"], price: 689 }),
  offer({ from: "JNB", to: "LHR", airline: "KL", depart: "21:05", durationMinutes: 985, stops: 1, stopCities: ["Amsterdam"], price: 654 }),

  // Johannesburg ↔ Dubai
  offer({ from: "JNB", to: "DXB", airline: "EK", depart: "08:25", durationMinutes: 485, stops: 0, price: 521 }),
  offer({ from: "JNB", to: "DXB", airline: "QR", depart: "15:10", durationMinutes: 760, stops: 1, stopCities: ["Doha"], price: 487 }),

  // Nairobi ↔ London
  offer({ from: "NBO", to: "LHR", airline: "KQ", depart: "23:30", durationMinutes: 525, stops: 0, price: 588 }),
  offer({ from: "NBO", to: "LHR", airline: "BA", depart: "08:55", durationMinutes: 540, stops: 0, price: 631 }),
  offer({ from: "NBO", to: "LHR", airline: "TK", depart: "04:20", durationMinutes: 845, stops: 1, stopCities: ["Istanbul"], price: 512 }),

  // Lagos ↔ London
  offer({ from: "LOS", to: "LHR", airline: "BA", depart: "10:30", durationMinutes: 390, stops: 0, price: 624 }),
  offer({ from: "LOS", to: "LHR", airline: "TK", depart: "16:45", durationMinutes: 760, stops: 1, stopCities: ["Istanbul"], price: 498 }),

  // Cape Town ↔ Dubai
  offer({ from: "CPT", to: "DXB", airline: "EK", depart: "16:35", durationMinutes: 585, stops: 0, price: 642 }),
  offer({ from: "CPT", to: "DXB", airline: "QR", depart: "19:50", durationMinutes: 870, stops: 1, stopCities: ["Doha"], price: 588 }),

  // Dubai ↔ New York
  offer({ from: "DXB", to: "JFK", airline: "EK", depart: "08:30", durationMinutes: 840, stops: 0, price: 968 }),
  offer({ from: "DXB", to: "JFK", airline: "TK", depart: "03:15", durationMinutes: 1120, stops: 1, stopCities: ["Istanbul"], price: 812 }),

  // London ↔ New York
  offer({ from: "LHR", to: "JFK", airline: "BA", depart: "11:20", durationMinutes: 485, stops: 0, price: 498 }),
  offer({ from: "LHR", to: "JFK", airline: "AF", depart: "07:05", durationMinutes: 760, stops: 1, stopCities: ["Paris"], price: 432 }),

  // Singapore ↔ London
  offer({ from: "SIN", to: "LHR", airline: "SQ", depart: "23:55", durationMinutes: 855, stops: 0, price: 815 }),
  offer({ from: "SIN", to: "LHR", airline: "QR", depart: "01:40", durationMinutes: 1150, stops: 1, stopCities: ["Doha"], price: 742 }),
];
