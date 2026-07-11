import { Router } from "express";
import { upload } from "../config/multer";
import { importCSV } from "../controllers/import.controller";

const router = Router();

router.post("/", upload.single("file"), importCSV);

export default router;