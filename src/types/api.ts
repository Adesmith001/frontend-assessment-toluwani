export interface DummyJsonCategory {
  slug: string;
  name: string;
  url: string;
}

export interface DummyJsonProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail?: string;
  images?: string[];
  availabilityStatus?: string;
  discountPercentage?: number;
}

export interface DummyJsonProductListResponse {
  products: DummyJsonProduct[];
  total: number;
  skip: number;
  limit: number;
}
