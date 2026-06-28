import express from "express";
import { getCategories } from "./categories.controller.js";

const router = express.Router();

router.get("/", getCategories);

export default router;
