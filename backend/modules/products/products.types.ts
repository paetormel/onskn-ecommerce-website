import type { CreateProductPayload } from "./schema/product.schema.js";

export type CreateProductInput = CreateProductPayload;

export interface CreateProductResult {
  productId: string;
  message: string;
}

export interface ProductListItem {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  variants: Array<{
    sizeLabel: string;
    price: unknown;
    compareAtPrice: unknown;
  }>;
  images: Array<{
    url: string;
    type: string;
  }>;
}

export interface ProductCardDto {
  id: string;
  name: string;
  isActive: boolean;
  sizeLabel?: string;
  price?: number;
  compareAtPrice?: number | null;
  primaryImage: string;
  hoverImage: string;
}
