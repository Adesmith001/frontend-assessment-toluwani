import Image from "next/image";

interface ProductImageProps {
  src: string | null;
  alt: string;
  priority?: boolean;
  sizes: string;
  className?: string;
}

export function ProductImage({
  src,
  alt,
  priority = false,
  sizes,
  className,
}: ProductImageProps) {
  return (
    <Image
      src={src ?? "/fallback-product.svg"}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
