import Link from "next/link";
import type { CarRental } from "@/lib/types";
import { buildGoLink } from "@/lib/affiliate";
import { buttonClass } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  KeyIcon,
  MapPinIcon,
  SuitcaseIcon,
  UsersIcon,
} from "@/components/icons";
import { formatCurrency } from "@/lib/format";

export function CarRentalCard({ car }: { car: CarRental }) {
  const goLink = buildGoLink({
    partner: "rentalcars",
    url: car.deepLink,
    label: car.city,
  });

  return (
    <article className="group rounded-2xl border border-line bg-surface p-4 shadow-soft transition duration-300 hover:-translate-y-0.5 hover:shadow-card sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-canvas-muted text-ink ring-1 ring-line">
            <KeyIcon className="h-5 w-5" />
          </div>
          <div>
            <div className="font-semibold text-ink">{car.model}</div>
            <div className="flex items-center gap-1.5 text-xs text-muted">
              <span>{car.company}</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <MapPinIcon className="h-3.5 w-3.5" />
                {car.pickupLocation}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted">
          <Badge tone="neutral">{car.carClass}</Badge>
          <span className="inline-flex items-center gap-1">
            <UsersIcon className="h-4 w-4" />
            {car.seats}
          </span>
          <span className="inline-flex items-center gap-1">
            <SuitcaseIcon className="h-4 w-4" />
            {car.bags}
          </span>
          <span>{car.transmission}</span>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-line pt-3 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
          <div className="text-right">
            <div className="text-xs text-muted">per day</div>
            <div className="font-serif text-2xl font-medium text-ink">
              {formatCurrency(car.pricePerDay, car.currency)}
            </div>
          </div>
          <Link
            href={goLink}
            target="_blank"
            rel="nofollow sponsored noopener"
            className={buttonClass({ variant: "accent", size: "sm" })}
          >
            Book car
          </Link>
        </div>
      </div>
    </article>
  );
}
