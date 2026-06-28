export interface ProductImageProps {
  src: string;
  alt: string;
}

export interface ProductCardProps {
  primaryImage: string;
  hoverImage: string;
  productSlug?: string;
  name: string;
  price?: number;
  compareAtPrice?: number | null;
  sizeLabel?: string;
}

export type ProductRecord = {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  sizeLabel?: string;
  price?: number;
  compareAtPrice?: number | null;
  primaryImage: string;
  hoverImage: string;
};

export type ProductSectionType =
  | "DESCRIPTION"
  | "BENEFITS"
  | "HOW_IT_WORKS"
  | "HOW_TO_USE"
  | "PRODUCT_SAFETY"
  | "SUSTAINABILITY"
  | "INGREDIENTS";

export type ProductImageType = "PRIMARY" | "HOVER" | "GALLERY";

export interface ProductDetailImage {
  id: string;
  url: string;
  type: ProductImageType;
}

export interface ProductDetailSection {
  id: string;
  type: ProductSectionType;
  title?: string | null;
  content: string;
  order: number;
}

export interface ProductDetailVariant {
  id: string;
  sizeLabel: string;
  sku: string;
  price: number;
  compareAtPrice: number | null;
  stock: number;
}

export interface ProductDetail {
  id: string;
  name: string;
  slug: string;
  texture: string | null;
  baseDescription: string;
  isActive: boolean;
  category: {
    id: string;
    name: string;
  };
  variants: ProductDetailVariant[];
  images: ProductDetailImage[];
  sections: ProductDetailSection[];
  skinTypes: string[];
}

export type CreateProductInput = {
  name: string;
  slug: string;
  categoryId: string;
  baseDescription: string;
  isActive: boolean;
  primaryImageFile: File;
  hoverImageFile?: File | null;
  sku?: string;
  description?: string;
  longDescription?: string;
  basePrice?: number;
  compareAtPrice?: number | null;
  texture?: string;
  skinTypes?: string;
  sizeLabel?: string;
};
