import { z } from 'zod';

export const variantSchema = z.object({
    size_label: z.string().min(1),
    sku: z.string().min(1),
    stock_quantity: z.number().int().nonnegative(),
    price_override: z.number().nonnegative().optional()
});

export const imageSchema = z.object({
    url: z.string().url(),
    alt_text: z.string().optional(),
    is_primary: z.boolean().optional(),
    display_order: z.number().int().optional()
});

export const detailSchema = z.object({
    section_name: z.string().min(1),
    content: z.string().min(1),
    display_order: z.number().int().optional()
});

export const createProductSchema = z.object({
    name: z.string().min(1),
    sku: z.string().min(1),
    slug: z.string().min(1),

    description: z.string().optional(),
    long_description: z.string().optional(),

    base_price: z.number().positive(),
    compare_at_price: z.number().positive().optional(),

    texture: z.string().optional(),
    skin_types: z.array(z.string()).optional(),

    variants: z.array(variantSchema).optional(),
    images: z.array(imageSchema).optional(),
    details: z.array(detailSchema).optional()
});