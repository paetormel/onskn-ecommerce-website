import type {
  ProductDetail,
  ProductDetailApiPayload,
  ProductDisplayImage,
  ProductRecord,
} from "~/features/products/types/product.types";
import type { ApiResponse } from "~/shared/types/api.types";
import { api } from "~/shared/lib/axios";

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
  const response = await api.get<ApiResponse<ProductRecord[]>>(`/products`);
  return response.data.data ?? [];
}

export async function fetchProductBySlug(slug: string): Promise<ProductDetail> {
  const response = await api.get<ApiResponse<ProductDetailApiPayload>>(
    `/products/${slug}`
  );
  return normalizeProductDetail(response.data.data);
}

export const fetchProductById = fetchProductBySlug;

export function getProductDisplayImages(
  product: ProductDetail
): ProductDisplayImage[] {
  const byType = (type: ProductDisplayImage["type"]) =>
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
