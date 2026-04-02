import Link from "next/link";

import { formatCategoryLabel, formatCurrency, formatRating } from "@/lib/utils/format";
import type { Product } from "@/types/product";

import { ProductImage } from "./product-image";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <article className="group h-full">
      <Link
        href={`/products/${product.id}`}
        className="surface-panel-strong flex h-full flex-col overflow-hidden rounded-[28px] transition-transform duration-300 hover:-translate-y-1 hover:border-accent/30 focus-visible:-translate-y-1 focus-visible:border-accent/40 focus-visible:outline-none"
      >
        <div className="relative aspect-4/3 overflow-hidden bg-[linear-gradient(135deg,rgba(49,94,255,0.08),rgba(255,255,255,0.6))]">
          <ProductImage
            src={product.thumbnail}
            alt={product.title}
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#172033]/28 to-transparent" />
        </div>

        <div className="flex flex-1 flex-col gap-5 p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="eyebrow text-muted-foreground">
              {formatCategoryLabel(product.category)}
            </span>
            <span className="rounded-full border border-border bg-background/80 px-3 py-1 font-mono text-xs text-muted-foreground">
              {formatRating(product.rating)} rating
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="line-clamp-2 text-xl font-semibold tracking-tight text-foreground">
              {product.title}
            </h2>
            <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
              {product.description}
            </p>
          </div>

          <div className="mt-auto flex items-end justify-between gap-4 border-t border-border/80 pt-4">
            <div>
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="text-lg font-semibold text-foreground">
                {formatCurrency(product.price)}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-muted-foreground">Stock</p>
              <p className="text-sm font-medium text-foreground">
                {product.stock} units
              </p>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
