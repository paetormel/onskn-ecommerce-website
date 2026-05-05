export interface ProductImageProps {
  src: string;
  alt: string;
}

export interface ProductCardProps {
  primaryImage: string;
  hoverImage: string;
  productId?: string;
  name: string;
  price: number;
  sizeLabel?: string;
}

export type ProductRecord = {
  product_id: number;
  name: string;
  sku: string;
  slug: string;
  description: string;
  long_description: string;
  base_price: number;
  compare_at_price: number | null;
  texture: string | null;
  skin_types: string | null;
  primary_image_url: string | null;
  hover_image_url: string | null;
};

export type CreateProductInput = {
  name: string;
  sku: string;
  slug: string;
  description: string;
  longDescription: string;
  basePrice: number;
  compareAtPrice?: number | null;
  texture?: string;
  skinTypes?: string;
  sizeLabel?: string;
  primaryImageFile: File;
  hoverImageFile?: File | null;
};
