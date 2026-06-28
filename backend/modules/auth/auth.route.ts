import express from "express";
import {
  login,
  logout,
  meController,
  registerUser,
} from "./auth.controller.js";
import { authMiddleware } from "./auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.get("/me", authMiddleware, meController);

export default router;
