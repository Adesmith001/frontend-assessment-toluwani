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
      <section className="surface-panel-strong w-full rounded-[36px] p-8 sm:p-12">
        <p className="eyebrow text-muted-foreground">Catalog unavailable</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">
          The product feed did not load this time.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          Retry the request or clear the filters to return to the default catalog view.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:border-accent/30 hover:text-accent"
          >
            Reset filters
          </Link>
        </div>
      </section>
    </div>
  );
}
