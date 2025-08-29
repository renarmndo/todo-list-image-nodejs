import { createList } from "../controllers/listController.js";
import upload from "../validation/fileValidation.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

// wajib login
router.use(authenticateToken);
// routes
router.post("/list", upload.single("image"), createList);

export default router;
