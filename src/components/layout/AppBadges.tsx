"use client";

import { useState } from "react";
import { AppleIcon, GooglePlayIcon } from "@/components/icons";

const stores = [
  { key: "ios", label: "App Store", Icon: AppleIcon },
  { key: "android", label: "Google Play", Icon: GooglePlayIcon },
] as const;

export function AppBadges() {
  const [active, setActive] = useState<string | null>(null);

  function handleClick(key: string) {
    setActive(key);
    window.setTimeout(() => {
      setActive((current) => (current === key ? null : current));
    }, 2200);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {stores.map(({ key, label, Icon }) => (
        <div key={key} className="relative">
          {active === key ? (
            <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
              Coming soon
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => handleClick(key)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <Icon className="h-5 w-5" />
            {label}
          </button>
        </div>
      ))}
    </div>
  );
}
