import dynamic from "next/dynamic";

import { EmptyState } from "@/components/products/empty-state";
import { ExplorerControlsSkeleton } from "@/components/products/explorer-controls-skeleton";
import { Pagination } from "@/components/products/pagination";
import { ProductGrid } from "@/components/products/product-grid";
import { getCategories, getProducts } from "@/lib/api/products";
import { formatCategoryLabel, formatProductCount } from "@/lib/utils/format";
import {
  PRODUCTS_PER_PAGE,
  hasActiveFilters,
  parseCatalogSearchParams,
} from "@/lib/utils/query-params";

const ExplorerControls = dynamic(
  () =>
    import("@/components/products/explorer-controls").then(
      (mod) => mod.ExplorerControls,
    ),
  {
    loading: () => <ExplorerControlsSkeleton />,
  },
);

interface HomePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const query = parseCatalogSearchParams(resolvedSearchParams);
  const [categories, productsResponse] = await Promise.all([
    getCategories(),
    getProducts(query),
  ]);
  const totalPages = Math.max(1, Math.ceil(productsResponse.total / PRODUCTS_PER_PAGE));

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.6fr)] lg:items-end">
        <div className="space-y-4">
          <p className="eyebrow text-muted-foreground">Assessment build</p>
          <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Browse a polished product catalog with shareable filters and server-first
            rendering.
          </h1>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            The explorer keeps product discovery lightweight and predictable, with URL
            state, resilient async handling, and a clean detail route for deeper context.
          </p>
        </div>

        <div className="surface-panel-strong rounded-[32px] p-6">
          <p className="eyebrow text-muted-foreground">Current view</p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-3xl font-semibold tracking-tight text-foreground">
                {formatProductCount(productsResponse.total)}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {query.category
                  ? `Focused on ${formatCategoryLabel(query.category)}`
                  : "All product categories"}
                {query.q ? ` matching “${query.q}”` : ""}
              </p>
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
              {hasActiveFilters(query) ? "Filtered catalog" : "Full catalog"}
            </p>
          </div>
        </div>
      </section>

      <ExplorerControls
        categories={categories}
        initialQuery={query.q}
        initialCategory={query.category}
      />

      {productsResponse.products.length > 0 ? (
        <>
          <ProductGrid products={productsResponse.products} />
          <Pagination
            currentPage={query.page}
            totalPages={totalPages}
            q={query.q}
            category={query.category}
          />
        </>
      ) : (
        <EmptyState q={query.q} category={query.category} />
      )}
    </div>
  );
}
