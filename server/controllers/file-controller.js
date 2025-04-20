import fs from "fs";

import { exec } from "child_process";
import { fileURLToPath } from "url";
import path ,{ dirname, join } from "path";


export  const handleUpload = (req, res) => {
  const { title } = req.body; // Get title from request body
  const filePath = req.file.path;

  // Dummy preprocessing: Read file content and send back first 100 characters
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const preview = content.slice(0, 100); // Get first 100 chars

    res.json({
      title, // Include the title from the form
      filename: req.file.originalname,
      message: "File uploaded and processed",
      preview, // Send the preview of the content
    });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ message: "Error processing file", error });
  }
};




// New controller to list files
export const listFiles = (req, res) => {
  const uploadDir = path.join(process.cwd(), "uploads");

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Failed to read uploads directory", error: err });
    }

      const csvFiles = files.filter(file => file.endsWith(".csv"));
      console.log("CSV files:", csvFiles); // Log the CSV files for debugging
      
      res
        .status(200)
        .json({ success: true, message: "Product added to cart", files: csvFiles });
    
  });
};



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Now this will work fine:


export const getFileDetails = (req, res) => {
  const filename = req.params.filename;
  const filePath = join(__dirname, "../uploads", filename);
  const pythonScriptPath = path.join(__dirname, "../python/analyze_file.py");

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  const command = `python3 "${pythonScriptPath}" "${filePath}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Python script error:", stderr);
      return res.status(500).json({ error: "Error analyzing file" });
    }

    try {
      const result = JSON.parse(stdout);
      if (result.error) {
        return res.status(400).json(result);
      }

      // Separate details and preview for frontend
      const { preview, ...details } = result;

      res.json({ details, preview });
    } catch (e) {
      console.error("JSON parsing failed:", e);
      res.status(500).json({ error: "Failed to parse analysis result" });
    }
  });
};


