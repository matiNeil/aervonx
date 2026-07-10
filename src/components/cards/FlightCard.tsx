import Link from "next/link";
import type { FlightOffer } from "@/lib/types";
import { buildGoLink } from "@/lib/affiliate";
import { buttonClass } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PlaneIcon } from "@/components/icons";
import {
  cabinLabel,
  formatCurrency,
  formatDuration,
  formatStops,
} from "@/lib/format";

export function FlightCard({ offer }: { offer: FlightOffer }) {
  const goLink = buildGoLink({
    partner: "skyscanner",
    url: offer.deepLink,
    label: `${offer.origin.code}-${offer.destination.code}`,
  });

  return (
    <article className="group rounded-2xl border border-line bg-surface p-4 shadow-soft transition duration-300 hover:-translate-y-0.5 hover:shadow-card sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-[10rem] items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-canvas-muted text-sm font-bold text-ink ring-1 ring-line">
            {offer.airline.code}
          </div>
          <div>
            <div className="font-semibold text-ink">{offer.airline.name}</div>
            <div className="text-xs text-muted">
              {cabinLabel(offer.cabin)} · {offer.partner}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-ink">{offer.departTime}</div>
            <div className="text-xs text-muted">{offer.origin.code}</div>
          </div>
          <div className="flex flex-col items-center text-xs text-muted">
            <span>{formatDuration(offer.durationMinutes)}</span>
            <div className="my-1 flex w-24 items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
              <span className="h-px flex-1 bg-line-strong" />
              <PlaneIcon className="h-3.5 w-3.5 rotate-90 text-muted" />
            </div>
            <span className={offer.stops === 0 ? "font-semibold text-emerald-700" : ""}>
              {formatStops(offer.stops)}
            </span>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-ink">{offer.arriveTime}</div>
            <div className="text-xs text-muted">{offer.destination.code}</div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-line pt-3 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
          <div className="text-right">
            <div className="text-xs text-muted">from</div>
            <div className="font-serif text-2xl font-medium text-ink">
              {formatCurrency(offer.price, offer.currency)}
            </div>
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

      {offer.stopCities.length > 0 ? (
        <div className="mt-3 flex items-center gap-2">
          <Badge tone="neutral">Via {offer.stopCities.join(", ")}</Badge>
        </div>
      ) : null}
    </article>
  );
}
