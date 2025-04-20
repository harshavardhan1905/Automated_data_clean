import express from "express";
import { preprocessData } from "../controllers/preprocess-controller.js"; // Import the controller

const router = express.Router();

// Preprocess data route
router.post("/preprocess", preprocessData);

export default router;
