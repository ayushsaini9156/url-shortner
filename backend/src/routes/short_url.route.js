import express from 'express';
import { createShortUrl } from "../controllers/short_url.controller.js";

const router = express.Router();

// This route will be accessible at /api/create
router.post('/', createShortUrl);

export default router;
