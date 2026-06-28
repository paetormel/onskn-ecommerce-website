import { z } from "zod";
import {
  ProductImageType,
  ProductSectionType,
} from "../../../prisma/generated/client/client.js";

const jsonArray = <T>(defaultValue: T[] = []) =>
  z.preprocess((value) => {
    if (value == null || value === "") return defaultValue;
    if (Array.isArray(value)) return value;

    if (typeof value === "string") {
      try {
        const parsed: unknown = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : defaultValue;
      } catch {
        return defaultValue;
      }
    }

    return defaultValue;
  }, z.array(z.any())) as z.ZodType<T[]>;

const stringArray = z.preprocess((value) => {
  if (value == null || value === "") return [];

  if (Array.isArray(value)) return value;

  if (typeof value === "string") {
    try {
      return JSON.parse(value) as unknown;
    } catch {
      return value
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
    }
  }

  return [];
}, z.array(z.string()));

export const productVariantSchema = z.object({
  sizeLabel: z.string().min(1),
  sku: z.string().min(1),
  price: z.coerce.number().min(0),
  compareAtPrice: z.coerce.number().nullable().optional(),
  stock: z.coerce.number().int().min(0).default(0),
});

export const productSectionSchema = z.object({
  type: z.nativeEnum(ProductSectionType),
  title: z.string().optional(),
  content: z.string().min(1),
  order: z.coerce.number().int().default(0),
});

export const uploadedImageSchema = z.object({
  url: z.string().url(),
  alt_text: z.string().optional(),
  type: z.nativeEnum(ProductImageType),
  display_order: z.number().int().optional(),
});

export const createProductSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  categoryId: z.string().min(1),
  baseDescription: z.string().default(""),
  sku: z.string().min(1),
  texture: z.string().optional(),
  isActive: z.preprocess(
    (v) => v === "true" || v === true,
    z.boolean()
  ),
  variants: jsonArray<z.infer<typeof productVariantSchema>>(),
  sections: jsonArray<z.infer<typeof productSectionSchema>>(),
  skin_types: stringArray,
  images: z.array(uploadedImageSchema).default([]),
});

export type CreateProductPayload = z.infer<typeof createProductSchema>;
export type ProductVariantInput = z.infer<typeof productVariantSchema>;
export type ProductSectionInput = z.infer<typeof productSectionSchema>;
export type UploadedImageInput = z.infer<typeof uploadedImageSchema>;
