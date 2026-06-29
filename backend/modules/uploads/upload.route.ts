import express from "express";
import upload from "../../middlewares/multer.middleware.js";
import { authMiddleware, requireAdmin } from "../auth/auth.middleware.js";
import { uploadImages } from "./upload.controller.js";

const router = express.Router();

router.use(authMiddleware, requireAdmin);
router.post("/", upload.array("images", 5), uploadImages);

export default router;
