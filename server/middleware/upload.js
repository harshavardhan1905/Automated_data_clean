import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // Save file in 'uploads' folder
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname), // Set a unique filename
});

const upload = multer({ storage });

export default upload;
