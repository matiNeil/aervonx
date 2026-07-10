import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center sm:px-6">
      <span className="font-serif text-6xl font-medium text-accent-500">404</span>
      <h1 className="mt-4 font-serif text-2xl font-medium tracking-tight text-ink sm:text-3xl">
        This page has taken off without you
      </h1>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
        We couldn&apos;t find what you were looking for. It may have moved,
        or the link might be out of date.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className={buttonClass({ variant: "primary" })}>
          Back to home <ArrowRightIcon className="h-4 w-4" />
        </Link>
        <Link href="/support" className={buttonClass({ variant: "outline" })}>
          Visit support centre
        </Link>
      </div>
    </section>
  );
}
