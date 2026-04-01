import type { ProductQuery } from "@/types/product";

export const PRODUCTS_PER_PAGE = 20;

type SearchParamValue = string | string[] | undefined;

function readSingleValue(value: SearchParamValue) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

export function parseCatalogSearchParams(
  searchParams: Record<string, SearchParamValue>,
): ProductQuery {
  const rawPage = Number.parseInt(readSingleValue(searchParams.page), 10);
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
  const q = readSingleValue(searchParams.q).trim();
  const category = readSingleValue(searchParams.category).trim();

  return {
    page,
    limit: PRODUCTS_PER_PAGE,
    q,
    category,
  };
}

export function createCatalogHref({
  page,
  q,
  category,
}: Partial<Pick<ProductQuery, "page" | "q" | "category">>) {
  const params = new URLSearchParams();

  if (page && page > 1) {
    params.set("page", String(page));
  }

  if (q) {
    params.set("q", q);
  }

  if (category) {
    params.set("category", category);
  }

  const queryString = params.toString();

  return queryString ? `/?${queryString}` : "/";
}

export function hasActiveFilters({
  q,
  category,
}: Pick<ProductQuery, "q" | "category">) {
  return Boolean(q || category);
}
