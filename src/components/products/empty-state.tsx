import Link from "next/link";

import { createCatalogHref } from "@/lib/utils/query-params";

interface EmptyStateProps {
  q: string;
  category: string;
}

export function EmptyState({ q, category }: EmptyStateProps) {
  return (
    <section className="surface-panel-strong rounded-[32px] p-8 text-center sm:p-12">
      <p className="eyebrow text-muted-foreground">No matches</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
        Nothing fits this slice of the catalog.
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
        Try widening your search or clearing the current filter to get back to the
        full product collection.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href={createCatalogHref({})}
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
        >
          Clear filters
        </Link>
        {(q || category) && (
          <p className="text-sm text-muted-foreground">
            Current filters: {q ? `“${q}”` : "all terms"}
            {q && category ? " in " : ""}
            {category ? category.replaceAll("-", " ") : ""}
          </p>
        )}
      </div>
    </section>
  );
}
