"use client";

import { useEffect } from "react";
import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center sm:px-6">
      <h1 className="font-serif text-2xl font-medium tracking-tight text-ink sm:text-3xl">
        Something went wrong
      </h1>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
        We hit a snag loading this page. Try again, or head back and start
        over.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => unstable_retry()}
          className={buttonClass({ variant: "primary" })}
        >
          Try again
        </button>
        <Link href="/" className={buttonClass({ variant: "outline" })}>
          Back to home
        </Link>
      </div>
    </section>
  );
}
