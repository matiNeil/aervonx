import Link from "next/link";
import type { HolidayPackage } from "@/lib/types";
import { buildGoLink } from "@/lib/affiliate";
import { buttonClass } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Visual } from "@/components/Visual";
import { CheckIcon, MapPinIcon } from "@/components/icons";
import { formatCurrency } from "@/lib/format";

export function PackageCard({ pkg }: { pkg: HolidayPackage }) {
  const goLink = buildGoLink({
    partner: "booking",
    url: pkg.deepLink,
    label: pkg.city,
  });

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-hover">
      <div className="relative overflow-hidden">
        <Visual seed={pkg.seed} className="h-44 w-full transition duration-500 group-hover:scale-105" rounded="rounded-none" />
        <div className="absolute left-3 top-3">
          <Badge tone="accent">{pkg.theme}</Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-serif text-lg font-medium text-ink">{pkg.title}</h3>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
          <MapPinIcon className="h-3.5 w-3.5" />
          {pkg.city}, {pkg.country} · {pkg.nights} nights
        </p>

        <ul className="mt-3 space-y-1.5">
          {pkg.inclusions.slice(0, 4).map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-ink/80">
              <CheckIcon className="h-4 w-4 shrink-0 text-emerald-600" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <div className="text-xs text-muted">from / person</div>
            <div className="font-serif text-xl font-medium text-ink">
              {formatCurrency(pkg.fromPrice, pkg.currency)}
            </div>
          </div>
          <Link
            href={goLink}
            target="_blank"
            rel="nofollow sponsored noopener"
            className={buttonClass({ variant: "accent", size: "sm" })}
          >
            View package
          </Link>
        </div>
      </div>
    </article>
  );
}
