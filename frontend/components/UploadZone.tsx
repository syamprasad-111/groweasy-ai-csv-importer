"use client";

import { ChangeEvent, DragEvent } from "react";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
}

export default function UploadZone({
  onFileSelect,
}: UploadZoneProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="border-2 border-dashed rounded-xl p-10 text-center hover:border-blue-500 transition"
    >
      <p className="text-lg font-medium mb-4">
        Drag & Drop CSV here
      </p>

      <p className="mb-4 text-gray-500">
        or
      </p>

      <input
        type="file"
        accept=".csv"
        onChange={handleChange}
      />
    </div>
  );
}