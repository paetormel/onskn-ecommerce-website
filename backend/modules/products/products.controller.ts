import type { Request, Response } from "express";
import { ZodError } from "zod";
import "multer";
import { ProductImageType } from "../../prisma/generated/client/client.js";

import * as productService from "./products.service.js";
import { uploadToCloudinary } from "../uploads/upload.service.js";
import {
  createProductSchema,
  type UploadedImageInput,
} from "./schema/product.schema.js";
import type { ProductCardDto } from "./products.types.js";
import { toNumber } from "./products.mapper.js";
import { getUploadedFiles } from "../../middlewares/multer.utils.js";

export const createFullProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const payload = createProductSchema.parse(req.body);
    const files = getUploadedFiles(req, "images");

    if (files.length === 0) {
      res.status(400).json({
        success: false,
        message: "At least one product image is required",
      });
      return;
    }

    const images: UploadedImageInput[] = await Promise.all(
      files.map(async (file, index) => {
        const uploaded = await uploadToCloudinary(file.buffer, "products");

        const type: ProductImageType =
          index === 0
            ? ProductImageType.PRIMARY
            : index === 1
              ? ProductImageType.HOVER
              : ProductImageType.GALLERY;

        return {
          url: uploaded.url,
          publicId: uploaded.public_id,
          alt_text: file.originalname,
          type,
          display_order: index,
        };
      })
    );

    const result = await productService.createFullProduct({
      ...payload,
      images,
    });

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.flatten(),
      });
      return;
    }

    const err = error as Error;
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getProducts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = (await productService.getProducts()) ?? [];

    const data: ProductCardDto[] = products.map((product) => {
      const images = product.images ?? [];
      const variants = product.variants ?? [];

      const primaryImage = images.find(
        (img) => img.type === ProductImageType.PRIMARY
      );
      const hoverImage = images.find(
        (img) => img.type === ProductImageType.HOVER
      );
      const variant = variants[0];

      return {
        id: product.id,
        slug: product.slug,
        name: product.name,
        isActive: product.isActive,
        sizeLabel: variant?.sizeLabel,
        price: toNumber(variant?.price),
        compareAtPrice: toNumber(variant?.compareAtPrice) ?? null,
        primaryImage: primaryImage?.url ?? "",
        hoverImage: hoverImage?.url ?? "",
      };
    });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    const err = error as Error;
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch products",
    });
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const slug = req.params.slug ?? req.params.id;

    if (!slug || Array.isArray(slug)) {
      res.status(400).json({
        success: false,
        message: "Invalid product slug",
      });
      return;
    }

    const product = await productService.getProductById(slug);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Not found",
      });
      return;
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    const err = error as Error;
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
