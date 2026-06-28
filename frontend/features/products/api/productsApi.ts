import type {
  ProductDetail,
  ProductRecord,
} from "~/features/products/types/product.types";
import { api } from "~/shared/lib/axios";

type ProductsResponse = {
  success: boolean;
  data: ProductRecord[];
};

type ProductDetailResponse = {
  success: boolean;
  data: ProductDetailApiPayload;
};

type ProductDetailApiPayload = {
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
  variants: Array<{
    id: string;
    sizeLabel: string;
    sku: string;
    price: unknown;
    compareAtPrice: unknown;
    stock: number;
  }>;
  images: Array<{
    id: string;
    url: string;
    type: ProductDetail["images"][number]["type"];
  }>;
  sections: Array<{
    id: string;
    type: ProductDetail["sections"][number]["type"];
    title?: string | null;
    content: string;
    order: number;
  }>;
  skinTypes: Array<{
    skinType: {
      id: string;
      name: string;
    };
  }>;
};

function toNumber(value: unknown): number {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

function normalizeProductDetail(payload: ProductDetailApiPayload): ProductDetail {
  return {
    id: payload.id,
    name: payload.name,
    slug: payload.slug,
    texture: payload.texture,
    baseDescription: payload.baseDescription,
    isActive: payload.isActive,
    category: payload.category,
    variants: (payload.variants ?? []).map((variant) => ({
      id: variant.id,
      sizeLabel: variant.sizeLabel,
      sku: variant.sku,
      price: toNumber(variant.price),
      compareAtPrice:
        variant.compareAtPrice != null ? toNumber(variant.compareAtPrice) : null,
      stock: variant.stock ?? 0,
    })),
    images: payload.images ?? [],
    sections: [...(payload.sections ?? [])].sort((a, b) => a.order - b.order),
    skinTypes: (payload.skinTypes ?? []).map((item) => item.skinType.name),
  };
}

export async function fetchProducts(): Promise<ProductRecord[]> {
  const response = await api.get<ProductsResponse>(`/products`);
  return response.data.data ?? [];
}

export async function fetchProductBySlug(slug: string): Promise<ProductDetail> {
  const response = await api.get<ProductDetailResponse>(`/products/${slug}`);
  return normalizeProductDetail(response.data.data);
}

export const fetchProductById = fetchProductBySlug;

export type ProductDisplayImage = {
  src: string;
  alt: string;
  type: ProductDetail["images"][number]["type"];
};

export function getProductDisplayImages(
  product: ProductDetail
): ProductDisplayImage[] {
  const byType = (type: ProductDetail["images"][number]["type"]) =>
    product.images.find((image) => image.type === type)?.url ?? "";

  const primary = byType("PRIMARY");
  const hover = byType("HOVER");
  const gallery = product.images
    .filter((image) => image.type === "GALLERY")
    .map((image) => image.url);

  const images: ProductDisplayImage[] = [];

  if (primary) {
    images.push({
      src: primary,
      alt: `${product.name} primary`,
      type: "PRIMARY",
    });
  }

  if (hover) {
    images.push({
      src: hover,
      alt: `${product.name} hover`,
      type: "HOVER",
    });
  }

  gallery.forEach((url, index) => {
    images.push({
      src: url,
      alt: `${product.name} gallery ${index + 1}`,
      type: "GALLERY",
    });
  });

  if (images.length === 0) {
    return product.images.map((image, index) => ({
      src: image.url,
      alt: `${product.name} image ${index + 1}`,
      type: image.type,
    }));
  }

  return images;
}

export function formatSectionTitle(
  type: ProductDetail["sections"][number]["type"],
  title?: string | null
) {
  if (title?.trim()) return title;
  return type.replace(/_/g, " ");
}
