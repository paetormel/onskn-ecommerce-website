import * as productService from "./products.service.js";
import { uploadToCloudinary } from "../uploads/upload.service.js";

const uploadFile = async (file, folder = "products") => {
  return uploadToCloudinary(file.buffer, folder);
};

const parseJsonField = (value, fallback) => {
  if (value == null || value === "") return fallback;
  if (Array.isArray(value) || typeof value === "object") return value;

  try {
    return JSON.parse(value);
  } catch {
    throw new Error("Invalid JSON format in request body");
  }
};

const normalizeStringArrayField = (value) => {
  if (value == null || value === "") return [];
  if (Array.isArray(value)) return value;
  if (typeof value !== "string") return [];

  const trimmed = value.trim();
  if (!trimmed) return [];

  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item).trim()).filter(Boolean);
    }
  } catch {
    // Not JSON; fallback to comma-separated parsing below.
  }

  return trimmed
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

export const createFullProduct = async (req, res) => {
  try {
    const payload = { ...req.body };
    payload.variants = parseJsonField(payload.variants, []);
    payload.details = parseJsonField(payload.details, []);
    payload.images = parseJsonField(payload.images, []);
    payload.skin_types = normalizeStringArrayField(payload.skin_types);

    if (!Array.isArray(payload.variants)) {
      return res.status(400).json({
        success: false,
        message: "variants must be an array"
      });
    }

    if (!Array.isArray(payload.details)) {
      return res.status(400).json({
        success: false,
        message: "details must be an array"
      });
    }

    if (!Array.isArray(payload.images)) {
      return res.status(400).json({
        success: false,
        message: "images must be an array"
      });
    }

    if (Array.isArray(req.files) && req.files.length > 0) {
      const uploadedImages = await Promise.all(
        req.files.map((file, index) => uploadFile(file, "products").then((uploaded) => ({
          url: uploaded.url,
          alt_text: file.originalname ?? null,
          is_primary: index === 0,
          display_order: index
        })))
      );

      const existingImages = Array.isArray(payload.images) ? payload.images : [];
      payload.images = [...existingImages, ...uploadedImages];
    }

    const result = await productService.createFullProduct(payload);

    return res.status(201).json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error(error);

    if (error.message === "Invalid JSON format in request body") {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const data = await productService.getProducts();
    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message ?? "Failed to fetch products"
    });
  }
};

export const getProductById = async (req, res) => {
  const data = await productService.getProductById(req.params.id);

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "Not found"
    });
  }

  res.json({ success: true, data });
};
