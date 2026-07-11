"use client";

interface CSVPreviewTableProps {
  rows: Record<string, string>[];
}

export default function CSVPreviewTable({
  rows,
}: CSVPreviewTableProps) {
  if (!rows.length) return null;

  const headers = Object.keys(rows[0]);

  const previewRows = rows.slice(0, 20);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">
        CSV Preview
      </h2>

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
              {previewRows.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 hover:text-black"
                >
                  {headers.map((header) => (
                    <td
                      key={header}
                      className="border px-4 py-2 whitespace-nowrap"
                    >
                      {row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {rows.length > 20 && (
        <p className="mt-3 text-sm text-gray-500">
          Showing first 20 of {rows.length} rows.
        </p>
      )}
    </div>
  );
}