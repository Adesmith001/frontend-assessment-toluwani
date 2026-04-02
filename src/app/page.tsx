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
    <div className="mx-auto w-full max-w-screen-2xl px-4 pb-14 pt-6 sm:px-6 lg:px-8 lg:pt-8">
      <section className="grid gap-10 xl:grid-cols-[280px_minmax(0,1fr)] xl:items-start">
        <div className="space-y-8 xl:sticky xl:top-28">
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Home / Products</p>
            <div className="border-t border-border pt-5">
              <h1 className="text-4xl font-semibold uppercase tracking-tight text-foreground sm:text-5xl">
                Products
              </h1>
              <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                A server-first product wall with shareable filters, lean interactions,
                and a retail-inspired editorial surface.
              </p>
            </div>
          </div>

          <ExplorerControls
            categories={categories}
            initialQuery={query.q}
            initialCategory={query.category}
          />
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-muted-foreground">Current selection</p>
              <p className="mt-2 text-base font-medium text-foreground">
                {query.category ? formatCategoryLabel(query.category) : "All categories"}
                {query.q ? ` / ${query.q}` : ""}
              </p>
            </div>
            <div className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
              {formatProductCount(productsResponse.total)}
              <span className="ml-3">
                {hasActiveFilters(query) ? "Filtered view" : "Full edit"}
              </span>
            </div>
          </div>

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
      </section>
    </div>
  );
}
