"use client";

import { ImportResponse } from "@/types/crm";

interface ResultTableProps {
  result: ImportResponse;
}

export default function ResultTable({
  result,
}: ResultTableProps) {
  const headers =
    result.records.length > 0
      ? Object.keys(result.records[0])
      : [];

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">
        Parsed CRM Records
      </h2>

      {result.records.length > 0 ? (
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-auto max-h-[500px]">
            <table className="min-w-full border-collapse">
              <thead className="sticky top-0 bg-white text-black z-10">
                <tr>
                  {headers.map((header) => (
                    <th
                      key={header}
                      className="border px-4 py-3 text-left whitespace-nowrap font-semibold bg-white text-black"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {result.records.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 hover:text-black"
                  >
                    {headers.map((header) => (
                      <td
                        key={header}
                        className="border px-4 py-2 whitespace-nowrap"
                      >
                        {row[header as keyof typeof row]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-gray-500">
          No records imported.
        </p>
      )}

      {result.skippedRecords.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">
            Skipped Records
          </h2>

          <div className="space-y-3">
            {result.skippedRecords.map((item, index) => (
              <div
                key={index}
                className="rounded-lg border border-red-200 bg-red-50 p-4 text-black"
              >
                <p className="font-medium text-red-700">
                  {item.reason}
                </p>

                <pre className="mt-2 overflow-auto text-xs text-black">
                  {JSON.stringify(item.original, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}