import express from "express";
import upload from "../../middlewares/multer.middleware.js";
import { uploadImages } from "./upload.controller.js";

const router = express.Router();

router.post("/", upload.array("images", 5), uploadImages);

export default router;
