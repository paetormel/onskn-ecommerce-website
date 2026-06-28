import type { Product, ProductImage, ProductVariant } from "~/features/admin-dashboard/types/product.type";

export interface ProductImageProps {
  src: string;
  alt: string;
}

export interface ProductCardProps {
  primaryImage: string;
  hoverImage: string;
  productId?: string;
  name: string;
  price?: number;
  compareAtPrice?: number | null;
  sizeLabel?: string;
}
export type ProductRecord = {
  id: string;
  name: string;
  isActive: boolean;
  sizeLabel?: string;
  price?: number;
  compareAtPrice?: number | null;
  primaryImage: string;
  hoverImage: string;
};

export type CreateProductInput = {
  name: string;
  slug: string;
  categoryId: string;
  baseDescription: string;
  isActive: boolean;
  primaryImageFile: File;
  hoverImageFile?: File | null;
  // Legacy compatibility for the current backend endpoint.
  sku?: string;
  description?: string;
  longDescription?: string;
  basePrice?: number;
  compareAtPrice?: number | null;
  texture?: string;
  skinTypes?: string;
  sizeLabel?: string;
};
