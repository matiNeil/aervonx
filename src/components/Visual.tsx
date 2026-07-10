import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * A deterministic, self-contained "photo" stand-in.
 *
 * Real travel photography would be served via a CDN + `next/image`, but for a
 * hermetic MVP we derive a distinct, attractive gradient from a seed string so
 * every destination/stay gets a stable, unique cover with zero network calls.
 */
function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Curated, low-saturation gradient pairs that read as moody, premium travel
 * imagery — deep navies, teals, plum and warm bronze/gold — instead of a full
 * rainbow. Selected deterministically per seed for stable, on-brand covers.
 */
const premiumGradients: readonly (readonly [string, string])[] = [
  ["#1c2b4a", "#0a0f1e"], // midnight navy
  ["#26384f", "#101a2b"], // steel blue
  ["#143a3a", "#0a1f20"], // deep teal
  ["#1f3338", "#0c1719"], // slate teal
  ["#2c2f4a", "#11121f"], // indigo
  ["#3a2a4d", "#160f24"], // plum
  ["#5e4a24", "#241a0c"], // bronze / gold
  ["#3b2f2a", "#1a120e"], // warm espresso
];

/** Subtle film-grain texture (SVG noise) layered over gradients for depth. */
const grainDataUri =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`,
  );

export function Visual({
  seed,
  label,
  sublabel,
  icon,
  className,
  rounded = "rounded-2xl",
}: {
  seed: string;
  label?: string;
  sublabel?: string;
  icon?: ReactNode;
  className?: string;
  rounded?: string;
}) {
  const h = hashString(seed);
  const [from, to] = premiumGradients[h % premiumGradients.length];
  const angle = 115 + (h % 50);

  return (
    <div
      className={cn("relative overflow-hidden", rounded, className)}
      style={{
        backgroundImage: `linear-gradient(${angle}deg, ${from}, ${to})`,
      }}
      aria-hidden={!label}
    >
      {/* Soft directional sheen for depth, plus a fine grain texture. */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.14),transparent_45%)]" />
      <div
        className="absolute inset-0 opacity-[0.10] mix-blend-overlay"
        style={{ backgroundImage: `url("${grainDataUri}")` }}
      />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />

      {icon ? (
        <div className="absolute right-3 top-3 text-white/75">{icon}</div>
      ) : null}

      {label || sublabel ? (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent p-3.5">
          {label ? (
            <div className="font-serif text-base font-medium italic leading-tight text-white drop-shadow-sm sm:text-lg">
              {label}
            </div>
          ) : null}
          {sublabel ? (
            <div className="mt-0.5 text-[0.7rem] uppercase tracking-wide text-white/70">
              {sublabel}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
