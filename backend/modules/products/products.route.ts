import express from "express";
import upload from "../../middlewares/multer.middleware.js";
import {
  createFullProduct,
  getProductById,
  getProducts,
} from "./products.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:slug", getProductById);
router.post("/", upload.array("images", 4), createFullProduct);

export default router;
