import type { Request, Response } from "express";
import "multer";
import { ProductImageType } from "../../prisma/generated/client/client.js";
import prisma from "../../src/lib/prisma.js";
import { getUploadedFiles } from "../../middlewares/multer.utils.js";
import {
  removeFromCloudinary,
  uploadToCloudinary,
} from "./upload.service.js";
import type { CloudinaryUploadResult } from "./upload.types.js";

const resolveImageType = (index: number): ProductImageType => {
  if (index === 0) return ProductImageType.PRIMARY;
  if (index === 1) return ProductImageType.HOVER;
  return ProductImageType.GALLERY;
};

export const uploadImages = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { product_id } = req.body as { product_id?: string };
  const files = getUploadedFiles(req, "images");

  if (!product_id) {
    res.status(400).json({
      success: false,
      message: "product_id is required",
    });
    return;
  }

  if (files.length === 0) {
    res.status(400).json({
      success: false,
      message: "No files uploaded",
    });
    return;
  }

  const product = await prisma.product.findUnique({
    where: { id: product_id },
    select: { id: true },
  });

  if (!product) {
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
    return;
  }

  const uploads: CloudinaryUploadResult[] = [];

  try {
    for (const file of files) {
      const uploaded = await uploadToCloudinary(file.buffer, "products");
      uploads.push(uploaded);
    }

    const inserted = await prisma.$transaction(
      uploads.map((uploaded, index) =>
        prisma.productImage.create({
          data: {
            productId: product.id,
            url: uploaded.url,
            publicId: uploaded.public_id,
            type: resolveImageType(index),
          },
        })
      )
    );

    res.status(201).json({
      success: true,
      data: inserted,
    });
  } catch (err) {
    await Promise.allSettled(
      uploads.map((uploaded) => removeFromCloudinary(uploaded.public_id))
    );

    console.error("Upload Images Error:", err);

    res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
};
