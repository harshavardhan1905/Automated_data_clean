import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

// Get the current directory (equivalent to __dirname in CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const preprocessData = (req, res) => {
  const { missingHandleMethod, outlierHandling, fileName } = req.body;

  console.log("Received data:", req.body); // Log the received data for debugging

  if (!fileName) {
    return res.status(400).json({ error: "No file selected." });
  }

  // Construct path for the file in the uploads folder
  const filePath = path.join(__dirname, "../uploads", fileName);

  // Construct path for the Python script
  const pythonScriptPath = path.join(__dirname, "../python/preprocess.py");

  // Create command to run Python script with arguments
  const command = `python3 "${pythonScriptPath}" "${filePath}" "${missingHandleMethod}" "${outlierHandling}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Error processing Python script:", stderr);
      return res.status(500).json({ error: "Error processing file" });
    }

    try {
      // Parse Python output (it should be a valid JSON string now)
      const result = JSON.parse(stdout);
      res.json(result); // Return result to frontend
    } catch (e) {
      console.error("Error parsing Python output:", e);
      res
        .status(500)
        .json({
          error: "Failed to parse Python result. Output may not be valid JSON.",
        });
    }
  });
};
