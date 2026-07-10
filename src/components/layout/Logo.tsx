import Image from "next/image";
import { cn } from "@/lib/cn";

export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  if (tone === "light") {
    return (
      <span className={cn("group inline-flex items-center gap-2.5", className)}>
        <span className="inline-block h-11 w-11 shrink-0 transition duration-300 group-hover:-rotate-6">
          <Image
            src="/brand/aervonx-mark-light.png"
            alt=""
            width={395}
            height={385}
            className="h-full w-full object-contain"
            priority
          />
        </span>
        <span className="font-serif text-2xl font-medium tracking-tight text-white">
          Aervon<span className="text-accent-400">X</span>
        </span>
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/brand/aervonx-logo.png"
        alt="AervonX"
        width={1327}
        height={394}
        className="h-12 w-auto"
        priority
      />
    </span>
  );
}
