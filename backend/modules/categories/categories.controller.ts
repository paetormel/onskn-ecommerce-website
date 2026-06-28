import type { Request, Response } from "express";
import * as categoryService from "./categories.service.js";

export const getCategories = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await categoryService.getCategories();

    res.json({ success: true, data: categories });
  } catch (error) {
    const err = error as Error;
    console.error("[categories] getCategories failed:", err);

    res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch categories",
    });
  }
};
