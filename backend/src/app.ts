import express from "express";
import cors from "cors";

import importRoutes from "./routes/import.routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "GrowEasy AI CSV Importer API is running",
  });
});

// Routes
app.use("/api/import", importRoutes);

export default app;