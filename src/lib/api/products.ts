import type {
  DummyJsonCategory,
  DummyJsonProduct,
  DummyJsonProductListResponse,
} from "@/types/api";
import type { Category, Product, ProductQuery, ProductsResponse } from "@/types/product";

const BASE_URL = "https://dummyjson.com";
const PRODUCT_FIELDS = [
  "id",
  "title",
  "description",
  "category",
  "price",
  "rating",
  "stock",
  "brand",
  "thumbnail",
  "images",
  "availabilityStatus",
  "discountPercentage",
].join(",");

async function fetchDummyJson<T>(
  path: string,
  options?: RequestInit & {
    next?: {
      revalidate?: number;
      tags?: string[];
    };
  },
) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`DummyJSON request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

function normalizeProduct(product: DummyJsonProduct): Product {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    category: product.category,
    price: product.price,
    rating: product.rating,
    stock: product.stock,
    brand: product.brand,
    thumbnail: product.thumbnail ?? product.images?.[0] ?? null,
    images: product.images ?? [],
    availabilityStatus: product.availabilityStatus,
    discountPercentage: product.discountPercentage,
  };
}

function normalizeCategory(category: DummyJsonCategory | string): Category {
  if (typeof category === "string") {
    return {
      slug: category,
      name: category
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" "),
      url: `${BASE_URL}/products/category/${category}`,
    };
  }

  return category;
}

function matchesQuery(product: DummyJsonProduct, query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return [product.title, product.description, product.brand, product.category]
    .filter(Boolean)
    .some((value) => value!.toLowerCase().includes(normalizedQuery));
}

function buildListQuery(skip: number, limit: number) {
  const params = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
    select: PRODUCT_FIELDS,
  });

  return `?${params.toString()}`;
}

export async function getCategories() {
  const categories = await fetchDummyJson<Array<DummyJsonCategory | string>>(
    "/products/categories",
    {
      cache: "force-cache",
      next: { revalidate: 3600, tags: ["categories"] },
    },
  );

  return categories.map(normalizeCategory);
}

export async function getProducts({
  page,
  limit,
  q,
  category,
}: ProductQuery): Promise<ProductsResponse> {
  const skip = (page - 1) * limit;

  if (category && q) {
    const data = await fetchDummyJson<DummyJsonProductListResponse>(
      `/products/category/${encodeURIComponent(category)}${buildListQuery(0, 0)}`,
      {
        next: { revalidate: 300, tags: ["products", `category:${category}`] },
      },
    );

    const filteredProducts = data.products.filter((product) => matchesQuery(product, q));
    const pageProducts = filteredProducts
      .slice(skip, skip + limit)
      .map(normalizeProduct);

    return {
      products: pageProducts,
      total: filteredProducts.length,
      skip,
      limit,
    };
  }

  if (category) {
    const data = await fetchDummyJson<DummyJsonProductListResponse>(
      `/products/category/${encodeURIComponent(category)}${buildListQuery(skip, limit)}`,
      {
        next: { revalidate: 300, tags: ["products", `category:${category}`] },
      },
    );

    return {
      ...data,
      products: data.products.map(normalizeProduct),
    };
  }

  if (q) {
    const params = new URLSearchParams({
      q,
      limit: String(limit),
      skip: String(skip),
      select: PRODUCT_FIELDS,
    });
    const data = await fetchDummyJson<DummyJsonProductListResponse>(
      `/products/search?${params.toString()}`,
      {
        next: { revalidate: 300, tags: ["products", `search:${q}`] },
      },
    );

    return {
      ...data,
      products: data.products.map(normalizeProduct),
    };
  }

  const data = await fetchDummyJson<DummyJsonProductListResponse>(
    `/products${buildListQuery(skip, limit)}`,
    {
      next: { revalidate: 300, tags: ["products"] },
    },
  );

  return {
    ...data,
    products: data.products.map(normalizeProduct),
  };
}

export async function getProductById(id: number) {
  const product = await fetchDummyJson<DummyJsonProduct>(`/products/${id}`, {
    next: { revalidate: 300, tags: ["product", `product:${id}`] },
  });

  return normalizeProduct(product);
}
