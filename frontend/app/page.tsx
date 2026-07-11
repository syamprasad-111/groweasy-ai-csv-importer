"use client";

import { useState } from "react";

import UploadZone from "@/components/UploadZone";
import CSVPreviewTable from "@/components/CSVPreviewTable";
import ImportButton from "@/components/ImportButton";
import Loader from "@/components/Loader";
import SummaryCards from "@/components/SummaryCards";
import ResultTable from "@/components/ResultTable";

import { parseCSV } from "@/lib/parseCsv";
import { uploadCSV } from "@/services/api";

import { ImportResponse } from "@/types/crm";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [previewRows, setPreviewRows] = useState<
    Record<string, string>[]
  >([]);

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<ImportResponse | null>(null);

  const [error, setError] = useState("");

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);

    // Reset previous import
    setResult(null);
    setError("");

    try {
      const rows = await parseCSV(file);
      setPreviewRows(rows);
    } catch (err) {
      console.error(err);
      setError("Failed to parse CSV.");
    }
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);
      setError("");

      const response = await uploadCSV(selectedFile);

      setResult(response);
    } catch (err) {
      console.error(err);
      setError("Import failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-7xl p-8">

      <h1 className="mb-8 text-4xl font-bold">
        GrowEasy AI CSV Importer
      </h1>

      <UploadZone onFileSelect={handleFileSelect} />

      {selectedFile && (
        <div className="mt-6 rounded-lg border p-4">

          <p className="font-semibold">
            Selected File
          </p>

          <p>{selectedFile.name}</p>

          <p className="mt-2">
            Total Rows: {previewRows.length}
          </p>

        </div>
      )}

      <CSVPreviewTable rows={previewRows} />

      {selectedFile && !result && (
        <ImportButton
          onImport={handleImport}
          loading={loading}
        />
      )}

      {loading && <Loader />}

      {error && (
        <p className="mt-6 text-red-500">
          {error}
        </p>
      )}

      {result && (
        <>
          <SummaryCards result={result} />
          <ResultTable result={result} />
        </>
      )}

      {/* Result components will be added in the next step */}

    </main>
  );
}