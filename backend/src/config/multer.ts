import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  if (path.extname(file.originalname).toLowerCase() !== ".csv") {
    return cb(new Error("Only CSV files are allowed"));
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
});