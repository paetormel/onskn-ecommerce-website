import { z } from "zod";
import {
  PRODUCT_SECTION_TYPES,
  type ProductSectionType,
} from "~/features/products/types/product.types";

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
  type: z.enum(PRODUCT_SECTION_TYPES),
  title: z.string().optional(),
  content: z.string().min(1),
  order: z.number(),
});

export const ACCORDION_SECTION_FIELDS = [
  { key: "sectionBenefits", type: "BENEFITS", label: "Benefits", order: 0 },
  {
    key: "sectionHowItWorks",
    type: "HOW_IT_WORKS",
    label: "How It Works",
    order: 1,
  },
  {
    key: "sectionHowToUse",
    type: "HOW_TO_USE",
    label: "How To Use",
    order: 2,
  },
  {
    key: "sectionProductSafety",
    type: "PRODUCT_SAFETY",
    label: "Product Safety",
    order: 3,
  },
  {
    key: "sectionSustainability",
    type: "SUSTAINABILITY",
    label: "Sustainability",
    order: 4,
  },
  {
    key: "sectionIngredients",
    type: "INGREDIENTS",
    label: "Ingredients",
    order: 5,
  },
] as const satisfies ReadonlyArray<{
  key: string;
  type: ProductSectionType;
  label: string;
  order: number;
}>;

export type AccordionSectionFieldKey =
  (typeof ACCORDION_SECTION_FIELDS)[number]["key"];

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
  price: z.number().min(0, "Price must be 0 or greater"),
  compareAtPrice: z.number().nullable().optional(),
  stock: z.number().int().min(0),

  primaryImage: requiredFile("Primary image"),
  hoverImage: z.instanceof(File).nullable(),

  galleryImage1: requiredFile("Gallery image 1"),
  galleryImage2: requiredFile("Gallery image 2"),

  skinTypes: z.array(z.string()),

  variants: z.array(productVariantSchema),

  sectionBenefits: z.string().optional(),
  sectionHowItWorks: z.string().optional(),
  sectionHowToUse: z.string().optional(),
  sectionProductSafety: z.string().optional(),
  sectionSustainability: z.string().optional(),
  sectionIngredients: z.string().optional(),
});

export type ProductFormInput = z.input<typeof productSchema>;
export type ProductFormValues = z.output<typeof productSchema>;
