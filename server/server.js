import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fileRoutes from "./routes/file-routes.js";
import preprocessRoutes from "./routes/preprocess-route.js";

dotenv.config();

const app = express();

// Middleware setup
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON requests
app.use("/uploads", express.static("uploads")); // Serve files from the 'uploads' folder
app.use("/api/files", fileRoutes);
app.use("/api/",preprocessRoutes)// Use the routes for file upload

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
