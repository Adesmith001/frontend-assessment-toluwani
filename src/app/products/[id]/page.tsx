import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/products/breadcrumbs";
import { ProductImage } from "@/components/products/product-image";
import { getProductById } from "@/lib/api/products";
import { formatCategoryLabel, formatCurrency, formatRating } from "@/lib/utils/format";
import { createCatalogHref } from "@/lib/utils/query-params";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

function getValidatedId(id: string) {
  const parsedId = Number.parseInt(id, 10);

  if (!Number.isFinite(parsedId) || parsedId <= 0) {
    notFound();
  }

  return parsedId;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const product = await getProductById(getValidatedId(id));

    return {
      title: product.title,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: product.thumbnail ? [product.thumbnail] : [],
      },
    };
  } catch {
    return {
      title: "Product not found",
      description: "The requested product could not be loaded.",
    };
  }
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductById(getValidatedId(id));
  const gallery = product.images.length > 0 ? product.images : [product.thumbnail].filter(Boolean);

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 pb-14 pt-6 sm:px-6 lg:px-8 lg:pt-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground transition hover:text-foreground"
      >
        <span aria-hidden="true" className="text-lg leading-none">
          &larr;
        </span>
        Back
      </Link>

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/" },
          {
            label: formatCategoryLabel(product.category),
            href: createCatalogHref({ category: product.category }),
          },
          { label: product.title },
        ]}
      />

      <section className="grid gap-8 xl:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.42fr)]">
        <div className="space-y-4">
          <div className="relative aspect-4/5 overflow-hidden border border-border bg-[#ede7de]">
            <ProductImage
              src={product.thumbnail}
              alt={product.title}
              priority
              sizes="(max-width: 1280px) 100vw, 60vw"
              className="object-cover"
            />
          </div>

          {gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {gallery.slice(0, 3).map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="relative h-24 w-20 shrink-0 overflow-hidden border border-border bg-[#ede7de] sm:h-28 sm:w-24"
                >
                  <ProductImage
                    src={image}
                    alt={`${product.title} preview ${index + 1}`}
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-8 xl:sticky xl:top-28">
          <div className="border-t border-border pt-5 xl:border-t-0 xl:pt-0">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  {formatCategoryLabel(product.category)}
                </p>
                <h1 className="mt-3 max-w-md text-3xl font-semibold uppercase tracking-tight text-foreground sm:text-4xl">
                  {product.title}
                </h1>
              </div>
              <p className="text-3xl font-semibold tracking-tight text-foreground">
                {formatCurrency(product.price)}
              </p>
            </div>

            <p className="mt-4 text-sm font-medium text-muted-foreground">
              MRP incl. of all taxes
            </p>
            <p className="mt-6 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
              {product.description}
            </p>

            <dl className="mt-8 border-y border-border">
              <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-4 border-b border-border py-4 text-sm">
                <dt className="text-muted-foreground">Brand</dt>
                <dd className="font-medium text-foreground">
                  {product.brand ?? "XIV QR Edition"}
                </dd>
              </div>
              <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-4 border-b border-border py-4 text-sm">
                <dt className="text-muted-foreground">Rating</dt>
                <dd className="font-medium text-foreground">{formatRating(product.rating)}</dd>
              </div>
              <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-4 border-b border-border py-4 text-sm">
                <dt className="text-muted-foreground">Stock</dt>
                <dd className="font-medium text-foreground">{product.stock} available</dd>
              </div>
              <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-4 py-4 text-sm">
                <dt className="text-muted-foreground">Availability</dt>
                <dd className="font-medium text-foreground">
                  {product.availabilityStatus ?? "In catalog"}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-3">
              <button
                type="button"
                className="inline-flex min-h-13 items-center justify-center border border-foreground bg-[#ddd6cb] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-foreground transition hover:bg-foreground hover:text-background"
              >
                Add to bag
              </button>
              <Link
                href={createCatalogHref({ category: product.category })}
                className="inline-flex min-h-13 items-center justify-center border border-border px-6 py-3 text-sm font-medium uppercase tracking-[0.14em] text-foreground transition hover:border-foreground"
              >
                More from {formatCategoryLabel(product.category)}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
