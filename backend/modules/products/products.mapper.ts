import type { CreateProductInput } from "./products.types.js";
import type { ProductVariantInput } from "./schema/product.schema.js";

export function normalizeCreateProductInput(
  data: CreateProductInput
): CreateProductInput {
  const variants: ProductVariantInput[] =
    data.variants?.length > 0
      ? data.variants
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
    sections: data.sections ?? [],
    skin_types: data.skin_types ?? [],
    images: data.images ?? [],
  };
}

export function toNumber(value: unknown): number | undefined {
  if (value == null) return undefined;
  const num = Number(value);
  return Number.isFinite(num) ? num : undefined;
}
