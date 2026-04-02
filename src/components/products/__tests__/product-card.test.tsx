import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProductCard } from "@/components/products/product-card";
import type { Product } from "@/types/product";

const product: Product = {
  id: 7,
  title: "Quiet Carry Backpack",
  description: "A compact daily bag with weatherproof zips and hidden pockets.",
  category: "mens-bags",
  price: 129,
  rating: 4.7,
  stock: 11,
  brand: "Northstar",
  thumbnail: null,
  images: [],
  availabilityStatus: "In Stock",
  discountPercentage: 12,
};

describe("ProductCard", () => {
  it("renders the title, metadata, and local fallback image when thumbnail is missing", () => {
    render(<ProductCard product={product} />);

    expect(screen.getByRole("heading", { name: product.title })).toBeInTheDocument();
    expect(screen.getByText("$129")).toBeInTheDocument();
    expect(screen.getByText("Mens Bags")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: product.title })).toHaveAttribute(
      "src",
      "/fallback-product.svg",
    );
  });
});
