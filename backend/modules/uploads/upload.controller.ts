import type { Request, Response } from "express";
import "multer";
import { getUploadedFiles } from "../../middlewares/multer.utils.js";
import { uploadToCloudinary } from "./upload.service.js";
import { query } from "../../config/db.js";

interface UploadedImageRow {
  id: string;
  product_id: string;
  url: string;
  public_id: string;
}

export const uploadImages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
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

    const uploads = await Promise.all(
      files.map((file) => uploadToCloudinary(file.buffer, "products"))
    );

    const inserted: UploadedImageRow[] = [];

    for (const img of uploads) {
      const result = await query(
        `INSERT INTO product_images (product_id, url, public_id)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [product_id, img.url, img.public_id]
      );

      inserted.push(result.rows[0] as UploadedImageRow);
    }

    res.status(201).json({
      success: true,
      data: inserted,
    });
  } catch (err) {
    console.error("Upload Images Error:", err);

    res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
};
