import Link from "next/link";
import type { Stay } from "@/lib/types";
import { buildGoLink } from "@/lib/affiliate";
import { buttonClass } from "@/components/ui/Button";
import { Visual } from "@/components/Visual";
import { BedIcon, MapPinIcon, StarIcon } from "@/components/icons";
import { formatCurrency, ratingLabel } from "@/lib/format";

export function StayCard({ stay }: { stay: Stay }) {
  const goLink = buildGoLink({
    partner: "booking",
    url: stay.deepLink,
    label: stay.city,
  });

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-hover">
      <Visual
        seed={stay.seed}
        className="h-44 w-full transition duration-500 group-hover:scale-105"
        rounded="rounded-none"
        icon={<BedIcon className="h-5 w-5" />}
      />
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-serif text-lg font-medium text-ink">{stay.name}</h3>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
              <MapPinIcon className="h-3.5 w-3.5" />
              {stay.city}, {stay.country}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="hidden text-right text-xs font-medium text-muted sm:block">
              {ratingLabel(stay.rating)}
            </span>
            <span className="flex h-9 min-w-9 items-center justify-center rounded-full bg-ink px-2 text-sm font-bold text-white">
              {stay.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-0.5 text-accent-500">
          {Array.from({ length: stay.stars }).map((_, i) => (
            <StarIcon key={i} className="h-3.5 w-3.5" />
          ))}
          <span className="ml-1.5 text-xs text-muted">{stay.type}</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {stay.amenities.slice(0, 3).map((a) => (
            <span
              key={a}
              className="rounded-md bg-canvas-muted px-2 py-0.5 text-xs text-muted ring-1 ring-line"
            >
              {a}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <div className="text-xs text-muted">
              {stay.reviews.toLocaleString()} reviews · per night
            </div>
            <div className="font-serif text-xl font-medium text-ink">
              {formatCurrency(stay.pricePerNight, stay.currency)}
            </div>
            <div className="text-xs text-muted">on {stay.partner}</div>
          </div>
          <Link
            href={goLink}
            target="_blank"
            rel="nofollow sponsored noopener"
            className={buttonClass({ variant: "accent", size: "sm" })}
          >
            View deal
          </Link>
        </div>
      </div>
    </article>
  );
}
