import express from "express";
import uploaders from "../validation/fileValidation.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { createTemplate } from "../controllers/templateController.js";
import { generateSurat } from "../controllers/buatSurat.js";

const router = express.Router();

router.use(authenticateToken);

router.post(
  "/template",
  uploaders.uploadTem.single("template"),
  createTemplate
);

router.get("/surat/:id", generateSurat);

export default router;
