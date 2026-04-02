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
        className="flex h-full flex-col transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none"
      >
        <div className="relative aspect-4/5 overflow-hidden border border-border bg-[#ede7de]">
          <ProductImage
            src={product.thumbnail}
            alt={product.title}
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2 border-x border-b border-border bg-surface-strong px-3 py-3">
          <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            {formatCategoryLabel(product.category)}
          </p>
          <h2 className="line-clamp-2 text-[15px] font-semibold uppercase tracking-[0.01em] text-foreground sm:text-base">
            {product.title}
          </h2>
          <p className="line-clamp-1 text-xs text-muted-foreground">
            {product.brand ?? product.description}
          </p>
          <div className="mt-auto flex items-end justify-between gap-4 pt-1">
            <p className="text-sm font-semibold text-foreground">{formatCurrency(product.price)}</p>
            <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              {formatRating(product.rating)}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}
