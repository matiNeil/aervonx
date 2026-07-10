import Link from "next/link";
import type { Transfer } from "@/lib/types";
import { buildGoLink } from "@/lib/affiliate";
import { buttonClass } from "@/components/ui/Button";
import {
  ArrowRightIcon,
  CarIcon,
  ClockIcon,
  SuitcaseIcon,
  UsersIcon,
} from "@/components/icons";
import { formatCurrency, formatDuration } from "@/lib/format";

export function TransferCard({ transfer }: { transfer: Transfer }) {
  const goLink = buildGoLink({
    partner: "travelpayouts",
    url: transfer.deepLink,
    label: transfer.city,
  });

  return (
    <article className="group rounded-2xl border border-line bg-surface p-4 shadow-soft transition duration-300 hover:-translate-y-0.5 hover:shadow-card sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-canvas-muted text-ink ring-1 ring-line">
            <CarIcon className="h-5 w-5" />
          </div>
          <div>
            <div className="font-semibold text-ink">{transfer.vehicleClass}</div>
            <div className="flex items-center gap-1.5 text-xs text-muted">
              <span>{transfer.from}</span>
              <ArrowRightIcon className="h-3.5 w-3.5" />
              <span>{transfer.to}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <UsersIcon className="h-4 w-4" />
            {transfer.seats}
          </span>
          <span className="inline-flex items-center gap-1">
            <SuitcaseIcon className="h-4 w-4" />
            {transfer.bags}
          </span>
          <span className="inline-flex items-center gap-1">
            <ClockIcon className="h-4 w-4" />
            {formatDuration(transfer.durationMinutes)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-line pt-3 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
          <div className="text-right">
            <div className="text-xs text-muted">total</div>
            <div className="font-serif text-2xl font-medium text-ink">
              {formatCurrency(transfer.price, transfer.currency)}
            </div>
          </div>
          <Link
            href={goLink}
            target="_blank"
            rel="nofollow sponsored noopener"
            className={buttonClass({ variant: "accent", size: "sm" })}
          >
            Book transfer
          </Link>
        </div>
      </div>
    </article>
  );
}
