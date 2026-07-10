"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { SearchInitial } from "@/lib/types";
import { cn } from "@/lib/cn";
import { placeSuggestions } from "@/lib/data/places";
import {
  BedIcon,
  CarIcon,
  PackageIcon,
  PlaneIcon,
  SearchIcon,
} from "@/components/icons";

export type SearchTab = "flights" | "stays" | "packages" | "transfers";

const tabs: { key: SearchTab; label: string; icon: ReactNode }[] = [
  { key: "flights", label: "Flights", icon: <PlaneIcon className="h-4 w-4" /> },
  { key: "stays", label: "Stays", icon: <BedIcon className="h-4 w-4" /> },
  { key: "packages", label: "Packages", icon: <PackageIcon className="h-4 w-4" /> },
  { key: "transfers", label: "Transfers", icon: <CarIcon className="h-4 w-4" /> },
];

const inputClass =
  "h-12 w-full rounded-xl border border-line-strong bg-surface px-3 text-sm text-ink placeholder:text-muted/70 focus:border-ink/40 focus:outline-none focus:ring-2 focus:ring-accent-500/30";
const labelClass = "mb-1 block text-xs font-semibold text-muted";

function travellerOptions() {
  return Array.from({ length: 8 }, (_, i) => i + 1);
}

export function SearchForm({
  initialTab = "flights",
  initial,
  className,
}: {
  initialTab?: SearchTab;
  initial?: SearchInitial;
  className?: string;
}) {
  const router = useRouter();
  const placesId = useId();
  const [tab, setTab] = useState<SearchTab>(initialTab);

  const [origin, setOrigin] = useState(initial?.origin ?? "");
  const [destination, setDestination] = useState(initial?.destination ?? "");
  const [depart, setDepart] = useState(initial?.depart ?? "");
  const [ret, setRet] = useState(initial?.return ?? "");
  const [adults, setAdults] = useState(initial?.adults ?? "1");
  const [tripType, setTripType] = useState<"round" | "oneway">(
    initial?.tripType ?? "round",
  );

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    const add = (key: string, value: string) => {
      const v = value.trim();
      if (v) params.set(key, v);
    };

    if (tab === "flights") {
      add("origin", origin);
      add("destination", destination);
      add("depart", depart);
      if (tripType === "round") add("return", ret);
      add("adults", adults);
      add("tripType", tripType);
      router.push(`/flights?${params.toString()}`);
    } else if (tab === "stays") {
      add("destination", destination);
      add("depart", depart);
      add("return", ret);
      add("adults", adults);
      router.push(`/accommodation?${params.toString()}`);
    } else if (tab === "packages") {
      add("destination", destination);
      add("depart", depart);
      add("adults", adults);
      router.push(`/packages?${params.toString()}`);
    } else {
      add("destination", destination);
      add("depart", depart);
      add("adults", adults);
      router.push(`/transfers?${params.toString()}`);
    }
  }

  return (
    <div
      className={cn(
        "w-full rounded-3xl bg-surface/95 p-3 shadow-2xl ring-1 ring-ink/[0.06] backdrop-blur sm:p-4",
        className,
      )}
    >
      {/* Tabs */}
      <div className="mb-3 flex gap-1 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              "inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition",
              tab === t.key
                ? "bg-ink text-white shadow-sm"
                : "text-muted hover:bg-canvas-muted hover:text-ink",
            )}
            aria-pressed={tab === t.key}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {tab === "flights" ? (
        <div className="mb-3 flex gap-1">
          {(["round", "oneway"] as const).map((tt) => (
            <button
              key={tt}
              type="button"
              onClick={() => setTripType(tt)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                tripType === tt
                  ? "bg-accent-500/15 text-accent-700"
                  : "text-muted hover:text-ink",
              )}
            >
              {tt === "round" ? "Return" : "One way"}
            </button>
          ))}
        </div>
      ) : null}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-12">
          {tab === "flights" ? (
            <>
              <div className="col-span-2 md:col-span-3">
                <label className={labelClass} htmlFor="f-origin">From</label>
                <input id="f-origin" list={placesId} className={inputClass} placeholder="City or airport" value={origin} onChange={(e) => setOrigin(e.target.value)} />
              </div>
              <div className="col-span-2 md:col-span-3">
                <label className={labelClass} htmlFor="f-dest">To</label>
                <input id="f-dest" list={placesId} className={inputClass} placeholder="City or airport" value={destination} onChange={(e) => setDestination(e.target.value)} />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className={labelClass} htmlFor="f-depart">Depart</label>
                <input id="f-depart" type="date" className={inputClass} value={depart} onChange={(e) => setDepart(e.target.value)} />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className={labelClass} htmlFor="f-return">Return</label>
                <input id="f-return" type="date" className={cn(inputClass, tripType === "oneway" && "opacity-50")} value={ret} onChange={(e) => setRet(e.target.value)} disabled={tripType === "oneway"} />
              </div>
              <div className="col-span-2 md:col-span-2">
                <label className={labelClass} htmlFor="f-adults">Travellers</label>
                <select id="f-adults" className={inputClass} value={adults} onChange={(e) => setAdults(e.target.value)}>
                  {travellerOptions().map((n) => (
                    <option key={n} value={n}>{n} traveller{n > 1 ? "s" : ""}</option>
                  ))}
                </select>
              </div>
            </>
          ) : null}

          {tab === "stays" ? (
            <>
              <div className="col-span-2 md:col-span-4">
                <label className={labelClass} htmlFor="s-dest">Destination</label>
                <input id="s-dest" list={placesId} className={inputClass} placeholder="Where are you going?" value={destination} onChange={(e) => setDestination(e.target.value)} />
              </div>
              <div className="col-span-1 md:col-span-3">
                <label className={labelClass} htmlFor="s-in">Check-in</label>
                <input id="s-in" type="date" className={inputClass} value={depart} onChange={(e) => setDepart(e.target.value)} />
              </div>
              <div className="col-span-1 md:col-span-3">
                <label className={labelClass} htmlFor="s-out">Check-out</label>
                <input id="s-out" type="date" className={inputClass} value={ret} onChange={(e) => setRet(e.target.value)} />
              </div>
              <div className="col-span-2 md:col-span-2">
                <label className={labelClass} htmlFor="s-guests">Guests</label>
                <select id="s-guests" className={inputClass} value={adults} onChange={(e) => setAdults(e.target.value)}>
                  {travellerOptions().map((n) => (
                    <option key={n} value={n}>{n} guest{n > 1 ? "s" : ""}</option>
                  ))}
                </select>
              </div>
            </>
          ) : null}

          {tab === "packages" ? (
            <>
              <div className="col-span-2 md:col-span-6">
                <label className={labelClass} htmlFor="p-dest">Destination</label>
                <input id="p-dest" list={placesId} className={inputClass} placeholder="Beach, safari, city break…" value={destination} onChange={(e) => setDestination(e.target.value)} />
              </div>
              <div className="col-span-1 md:col-span-3">
                <label className={labelClass} htmlFor="p-depart">Departing</label>
                <input id="p-depart" type="date" className={inputClass} value={depart} onChange={(e) => setDepart(e.target.value)} />
              </div>
              <div className="col-span-1 md:col-span-3">
                <label className={labelClass} htmlFor="p-adults">Travellers</label>
                <select id="p-adults" className={inputClass} value={adults} onChange={(e) => setAdults(e.target.value)}>
                  {travellerOptions().map((n) => (
                    <option key={n} value={n}>{n} traveller{n > 1 ? "s" : ""}</option>
                  ))}
                </select>
              </div>
            </>
          ) : null}

          {tab === "transfers" ? (
            <>
              <div className="col-span-2 md:col-span-6">
                <label className={labelClass} htmlFor="t-dest">City or airport</label>
                <input id="t-dest" list={placesId} className={inputClass} placeholder="e.g. Dubai or DXB" value={destination} onChange={(e) => setDestination(e.target.value)} />
              </div>
              <div className="col-span-1 md:col-span-3">
                <label className={labelClass} htmlFor="t-date">Pick-up date</label>
                <input id="t-date" type="date" className={inputClass} value={depart} onChange={(e) => setDepart(e.target.value)} />
              </div>
              <div className="col-span-1 md:col-span-3">
                <label className={labelClass} htmlFor="t-adults">Passengers</label>
                <select id="t-adults" className={inputClass} value={adults} onChange={(e) => setAdults(e.target.value)}>
                  {travellerOptions().map((n) => (
                    <option key={n} value={n}>{n} passenger{n > 1 ? "s" : ""}</option>
                  ))}
                </select>
              </div>
            </>
          ) : null}
        </div>

        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent-500 px-8 text-base font-semibold text-white shadow-lg shadow-accent-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-accent-600 hover:shadow-xl hover:shadow-accent-600/25 sm:w-auto"
          >
            <SearchIcon className="h-5 w-5" />
            Search
          </button>
        </div>
      </form>

      <datalist id={placesId}>
        {placeSuggestions.map((p) => (
          <option key={p} value={p} />
        ))}
      </datalist>
    </div>
  );
}
