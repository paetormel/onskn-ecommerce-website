import type { CreateProductInput } from "./products.types.js";
import type { ProductVariantInput } from "./schema/product.schema.js";

function parseJsonArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (typeof value !== "string" || value.trim() === "") return [];

  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function parseStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  if (typeof value !== "string" || value.trim() === "") return [];

  try {
    const parsed: unknown = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is string => typeof item === "string");
    }
  } catch {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export function normalizeCreateProductInput(
  data: CreateProductInput
): CreateProductInput {
  const parsedVariants = parseJsonArray<ProductVariantInput>(data.variants);

  const variants: ProductVariantInput[] =
    parsedVariants.length > 0
      ? parsedVariants
      : [
          {
            sizeLabel: "100ml",
            sku: data.sku,
            price: 0,
            compareAtPrice: null,
            stock: 0,
          },
        ];

  return {
    ...data,
    variants,
    sections: parseJsonArray(data.sections),
    skin_types: parseStringArray(data.skin_types),
    images: Array.isArray(data.images) ? data.images : [],
  };
}

export function toNumber(value: unknown): number | undefined {
  if (value == null) return undefined;
  const num = Number(value);
  return Number.isFinite(num) ? num : undefined;
}
