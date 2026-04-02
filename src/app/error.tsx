"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[calc(100svh-6rem)] w-full max-w-4xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <section className="w-full border border-border bg-surface-strong p-8 sm:p-12">
        <p className="eyebrow text-muted-foreground">Catalog unavailable</p>
        <h1 className="mt-4 text-4xl font-semibold uppercase tracking-tight text-foreground">
          The product feed did not load.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          Retry the request or clear the current edit to return to the default catalog
          view.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-[48px] items-center justify-center border border-foreground bg-[#ddd6cb] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-foreground transition hover:bg-foreground hover:text-background"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex min-h-[48px] items-center justify-center border border-border px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] text-foreground transition hover:border-foreground"
          >
            Reset filters
          </Link>
        </div>
      </section>
    </div>
  );
}
