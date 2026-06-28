import { z } from "zod";

export const productVariantSchema = z.object({
  id: z.string().optional(),
  sizeLabel: z.string().min(1),
  sku: z.string().min(1),
  price: z.number().min(0),
  compareAtPrice: z.number().nullable().optional(),
  stock: z.number().min(0),
});

export const productSectionSchema = z.object({
  id: z.string().optional(),
  type: z.enum([
    "DESCRIPTION",
    "BENEFITS",
    "HOW_IT_WORKS",
    "HOW_TO_USE",
    "PRODUCT_SAFETY",
    "SUSTAINABILITY",
    "INGREDIENTS",
  ]),
  title: z.string().optional(),
  content: z.string().min(1),
  order: z.number(),
});

const requiredFile = (label: string) =>
  z
    .instanceof(File)
    .nullable()
    .refine((file): file is File => file instanceof File, {
      message: `${label} is required`,
    });

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  categoryId: z.string().uuid("Category ID must be a valid UUID"),
  texture: z.string(),
  baseDescription: z.string(),
  isActive: z.boolean(),

  sizeLabel: z.string().min(1, "Size label is required"),
  price: z.coerce.number().min(0, "Price must be 0 or greater"),
  compareAtPrice: z.coerce.number().nullable().optional(),
  stock: z.coerce.number().int().min(0).default(0),

  primaryImage: requiredFile("Primary image"),
  hoverImage: z.instanceof(File).nullable(),

  galleryImage1: requiredFile("Gallery image 1"),
  galleryImage2: requiredFile("Gallery image 2"),
  galleryImage3: requiredFile("Gallery image 3"),

  skinTypes: z.array(z.string()).default([]),

  variants: z.array(productVariantSchema).default([]),
  sections: z.array(productSectionSchema).default([]),
});

export type ProductFormValues = z.infer<typeof productSchema>;
