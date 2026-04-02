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

  const quickPickCategories = categories.slice(0, 6);

  return (
    <section className="space-y-6">
      <label className="block space-y-2">
        <span className="eyebrow text-muted-foreground">Search products</span>
        <div className="flex items-center gap-3 border border-border bg-[#dfd8cf] px-4 py-3">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4 shrink-0 text-foreground"
          >
            <path
              d="m17 17 3.5 3.5M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.7"
            />
          </svg>
          <input
            aria-label="Search products"
            type="search"
            name="q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
      </label>

      <div className="space-y-4 border-t border-border pt-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Filters</h2>
          <span
            aria-live="polite"
            className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground"
          >
            {isPending ? "Syncing" : "URL live"}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => updateCategory("")}
            className={`min-h-[40px] border px-3 text-[11px] font-semibold uppercase tracking-[0.12em] transition ${
              selectedCategory
                ? "border-border bg-surface-strong text-foreground hover:border-foreground"
                : "border-foreground bg-foreground text-background"
            }`}
          >
            All
          </button>
          {quickPickCategories.map((category) => {
            const isActive = selectedCategory === category.slug;

            return (
              <button
                key={category.slug}
                type="button"
                onClick={() => updateCategory(category.slug)}
                className={`min-h-[40px] border px-3 text-[11px] font-semibold uppercase tracking-[0.12em] transition ${
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-surface-strong text-foreground hover:border-foreground"
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>

        <label className="block space-y-2">
          <span className="eyebrow text-muted-foreground">Category</span>
          <select
            aria-label="Category"
            name="category"
            value={selectedCategory}
            onChange={(event) => updateCategory(event.target.value)}
            className="w-full border border-border bg-surface-strong px-4 py-3 text-sm text-foreground outline-none transition hover:border-foreground"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-center justify-between gap-4 border-t border-dashed border-border pt-4">
          <p className="text-xs leading-5 text-muted-foreground">
            Search and category stay in the URL, so every filtered view is shareable.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSelectedCategory("");
              startTransition(() => {
                router.replace(createCatalogHref({}), { scroll: false });
              });
            }}
            className="shrink-0 border border-border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition hover:border-foreground"
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}
