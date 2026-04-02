"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { createCatalogHref } from "@/lib/utils/query-params";
import type { Category } from "@/types/product";

interface ExplorerControlsProps {
  categories: Category[];
  initialQuery: string;
  initialCategory: string;
}

export function ExplorerControls({
  categories,
  initialQuery,
  initialCategory,
}: ExplorerControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const debouncedQuery = useDebouncedValue(query, 350);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    const currentQuery = searchParams.get("q") ?? "";

    if (debouncedQuery === currentQuery) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams.toString());

    if (debouncedQuery) {
      nextParams.set("q", debouncedQuery);
    } else {
      nextParams.delete("q");
    }

    nextParams.delete("page");

    startTransition(() => {
      const href = nextParams.toString() ? `${pathname}?${nextParams.toString()}` : pathname;
      router.replace(href, { scroll: false });
    });
  }, [debouncedQuery, pathname, router, searchParams]);

  function updateCategory(nextCategory: string) {
    setSelectedCategory(nextCategory);

    const nextParams = new URLSearchParams(searchParams.toString());

    if (nextCategory) {
      nextParams.set("category", nextCategory);
    } else {
      nextParams.delete("category");
    }

    nextParams.delete("page");

    startTransition(() => {
      const href = nextParams.toString() ? `${pathname}?${nextParams.toString()}` : pathname;
      router.replace(href, { scroll: false });
    });
  }

  return (
    <section className="surface-panel rounded-[32px] p-5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow text-muted-foreground">Explore</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
            Search by product name and narrow by category.
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span
            aria-live="polite"
            className={`rounded-full border px-3 py-1 font-mono text-xs transition ${
              isPending
                ? "border-accent/30 bg-accent/10 text-accent"
                : "border-border bg-background/70 text-muted-foreground"
            }`}
          >
            {isPending ? "Updating..." : "URL synced"}
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(220px,0.6fr)_auto]">
        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground">Search products</span>
          <input
            type="search"
            name="q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for phones, skincare, shoes..."
            className="w-full rounded-[20px] border border-border bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-accent/40 focus:ring-4 focus:ring-accent/10"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground">Category</span>
          <select
            name="category"
            value={selectedCategory}
            onChange={(event) => updateCategory(event.target.value)}
            className="w-full rounded-[20px] border border-border bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent/40 focus:ring-4 focus:ring-accent/10"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-end">
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSelectedCategory("");
              startTransition(() => {
                router.replace(createCatalogHref({}), { scroll: false });
              });
            }}
            className="inline-flex w-full items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition hover:border-accent/30 hover:text-accent lg:w-auto"
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}
