import Link from "next/link";

import { createCatalogHref } from "@/lib/utils/query-params";

interface EmptyStateProps {
  q: string;
  category: string;
}

export function EmptyState({ q, category }: EmptyStateProps) {
  return (
    <section className="border border-border bg-surface-strong px-6 py-10 sm:px-10">
      <p className="eyebrow text-muted-foreground">No matches</p>
      <h2 className="mt-4 text-3xl font-semibold uppercase tracking-tight text-foreground">
        Nothing fits this edit.
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
        Widen the search or clear the current category to return to the full product
        wall.
      </p>

      <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <Link
          href={createCatalogHref({})}
          className="inline-flex min-h-[48px] items-center justify-center border border-foreground bg-[#ddd6cb] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-foreground transition hover:bg-foreground hover:text-background"
        >
          Clear filters
        </Link>
        {(q || category) && (
          <p className="text-sm text-muted-foreground">
            Current filters: {q ? `"${q}"` : "all terms"}
            {q && category ? " in " : ""}
            {category ? category.replaceAll("-", " ") : ""}
          </p>
        )}
      </div>
    </section>
  );
}
