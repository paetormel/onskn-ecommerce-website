export const PRODUCT_IMAGE_TYPES = ["PRIMARY", "HOVER", "GALLERY"] as const;
export type ProductImageType = (typeof PRODUCT_IMAGE_TYPES)[number];

export const PRODUCT_SECTION_TYPES = [
  "DESCRIPTION",
  "BENEFITS",
  "HOW_IT_WORKS",
  "HOW_TO_USE",
  "PRODUCT_SAFETY",
  "SUSTAINABILITY",
  "INGREDIENTS",
] as const;
export type ProductSectionType = (typeof PRODUCT_SECTION_TYPES)[number];

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

export interface ProductImageBase {
  url: string;
  type: ProductImageType;
}

export interface ProductImage extends ProductImageBase {
  id: string;
}

export interface ProductImageDraft extends ProductImageBase {
  id?: string;
}

export interface ProductSectionBase {
  type: ProductSectionType;
  content: string;
  order: number;
}

export interface ProductSection extends ProductSectionBase {
  id?: string;
  title?: string;
}

export interface ProductDetailSection extends ProductSectionBase {
  id: string;
  title?: string | null;
}

export interface ProductVariantBase {
  sizeLabel: string;
  sku: string;
  price: number;
  compareAtPrice?: number | null;
  stock: number;
}

export interface ProductVariant extends ProductVariantBase {
  id?: string;
}

export interface ProductDetailVariant extends ProductVariantBase {
  id: string;
  compareAtPrice: number | null;
}

export interface CategoryOption {
  id: string;
  name: string;
}

export interface ProductDetail {
  id: string;
  name: string;
  slug: string;
  texture: string | null;
  baseDescription: string;
  isActive: boolean;
  category: CategoryOption;
  variants: ProductDetailVariant[];
  images: ProductImage[];
  sections: ProductDetailSection[];
  skinTypes: string[];
}

export type ProductDetailApiVariant = Omit<ProductDetailVariant, "price" | "compareAtPrice"> & {
  price: unknown;
  compareAtPrice: unknown;
};

export type ProductDetailApiPayload = Omit<
  ProductDetail,
  "variants" | "images" | "sections" | "skinTypes"
> & {
  variants: ProductDetailApiVariant[];
  images: ProductImage[];
  sections: ProductDetailSection[];
  skinTypes: Array<{
    skinType: CategoryOption;
  }>;
};

export type ProductDisplayImage = {
  src: string;
  alt: string;
  type: ProductImageType;
};
