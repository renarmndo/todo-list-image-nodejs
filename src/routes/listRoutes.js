import { createList } from "../controllers/listController.js";
import uploaders from "../validation/fileValidation.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

// wajib login
router.use(authenticateToken);
// routes
router.post("/list", uploaders.upload.single("image"), createList);

export default router;
