// routes/image.router.js

import express from "express";
import { generateImage } from "../controller/image.controller.js";

const router = express.Router();

// POST endpoint for image generation
router.post("/generate-image", generateImage);

export default router;