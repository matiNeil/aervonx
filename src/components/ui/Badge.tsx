import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "neutral" | "brand" | "accent" | "success";

const tones: Record<BadgeTone, string> = {
  neutral: "bg-canvas-muted text-muted ring-1 ring-line",
  brand: "bg-brand-50 text-brand-700 ring-1 ring-brand-100",
  accent: "bg-accent-500 text-white",
  success: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
