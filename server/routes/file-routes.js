import express from "express";
import upload from "../middleware/upload.js"; // Import the upload middleware

// Import the controller
 import { getFileDetails, handleUpload, listFiles } from "../controllers/file-controller.js";

const router = express.Router();

// POST route for file upload, including 'title' and 'csv' (file)
router.post("/upload", upload.single("csv"), handleUpload);
// New GET route to list uploaded files
router.get("/listfiles", listFiles);

router.get("/:filename/details", getFileDetails);

export default router;
