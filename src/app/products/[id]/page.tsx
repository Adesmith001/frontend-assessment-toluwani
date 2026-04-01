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
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <Breadcrumbs
        items={[
          { label: "Catalog", href: "/" },
          {
            label: formatCategoryLabel(product.category),
            href: createCatalogHref({ category: product.category }),
          },
          { label: product.title },
        ]}
      />

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
        <div className="space-y-4">
          <div className="surface-panel-strong relative overflow-hidden rounded-[36px] p-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,_rgba(49,94,255,0.08),_rgba(255,255,255,0.68))]">
              <ProductImage
                src={product.thumbnail}
                alt={product.title}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {gallery.length > 1 && (
            <div className="grid gap-4 sm:grid-cols-3">
              {gallery.slice(0, 3).map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="surface-panel-strong relative overflow-hidden rounded-[24px] p-3"
                >
                  <div className="relative aspect-square overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,_rgba(49,94,255,0.06),_rgba(255,255,255,0.7))]">
                    <ProductImage
                      src={image}
                      alt={`${product.title} preview ${index + 1}`}
                      sizes="(max-width: 768px) 33vw, 20vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="surface-panel-strong rounded-[36px] p-8 sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow text-muted-foreground">
              {formatCategoryLabel(product.category)}
            </span>
            {product.brand && (
              <span className="rounded-full border border-border bg-background/80 px-3 py-1 font-mono text-xs text-muted-foreground">
                {product.brand}
              </span>
            )}
          </div>

          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {product.title}
          </h1>
          <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
            {product.description}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-border bg-background/70 p-5">
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                {formatCurrency(product.price)}
              </p>
            </div>
            <div className="rounded-[24px] border border-border bg-background/70 p-5">
              <p className="text-sm text-muted-foreground">Rating</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                {formatRating(product.rating)}
              </p>
            </div>
          </div>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-border bg-background/70 p-5">
              <dt className="text-sm text-muted-foreground">Stock</dt>
              <dd className="mt-2 text-lg font-semibold text-foreground">{product.stock}</dd>
            </div>
            <div className="rounded-[24px] border border-border bg-background/70 p-5">
              <dt className="text-sm text-muted-foreground">Availability</dt>
              <dd className="mt-2 text-lg font-semibold text-foreground">
                {product.availabilityStatus ?? "In catalog"}
              </dd>
            </div>
            <div className="rounded-[24px] border border-border bg-background/70 p-5">
              <dt className="text-sm text-muted-foreground">Discount</dt>
              <dd className="mt-2 text-lg font-semibold text-foreground">
                {product.discountPercentage
                  ? `${product.discountPercentage.toFixed(0)}% off`
                  : "No active discount"}
              </dd>
            </div>
            <div className="rounded-[24px] border border-border bg-background/70 p-5">
              <dt className="text-sm text-muted-foreground">Category</dt>
              <dd className="mt-2 text-lg font-semibold text-foreground">
                {formatCategoryLabel(product.category)}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
            >
              Back to catalog
            </Link>
            <Link
              href={createCatalogHref({ category: product.category })}
              className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:border-accent/30 hover:text-accent"
            >
              See more in this category
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
