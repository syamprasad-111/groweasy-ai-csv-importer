import { Request, Response } from "express";
import fs from "fs";

import { parseCSV } from "../services/csv.service";
import { createBatches } from "../services/batch.service";
import { extractCRMRecords } from "../services/ai.service";
import { validateCRMRecords } from "../services/validation.service";

export const importCSV = async (
  req: Request,
  res: Response
): Promise<void> => {
  let filePath: string | null = null;

  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "CSV file is required",
      });
      return;
    }

    filePath = req.file.path;

    const rows = await parseCSV(filePath);

    if (rows.length === 0) {
      res.status(400).json({
        success: false,
        message: "CSV file contains no records",
      });
      return;
    }

    const batches = createBatches(rows);

    const importedRecords: any[] = [];
    const skippedRecords: any[] = [];

    for (const batch of batches) {
      const aiResponse = await extractCRMRecords(batch);

      const validated = validateCRMRecords(
        aiResponse.records
      );

      importedRecords.push(...validated);

      skippedRecords.push(
        ...aiResponse.skippedRecords
      );
    }

    res.status(200).json({
      success: true,
      totalRows: rows.length,
      imported: importedRecords.length,
      skipped: skippedRecords.length,
      records: importedRecords,
      skippedRecords,
    });
  } catch (error) {
    console.error("CSV Import Error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Unknown import error";

    res.status(500).json({
      success: false,
      message: "CSV import failed",
      error: message,
    });
  } finally {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};