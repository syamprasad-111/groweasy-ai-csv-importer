import { ImportResponse } from "@/types/crm";

interface SummaryCardsProps {
  result: ImportResponse;
}

export default function SummaryCards({
  result,
}: SummaryCardsProps) {
  const cards = [
    {
      title: "Total Rows",
      value: result.totalRows,
    },
    {
      title: "Imported",
      value: result.imported,
    },
    {
      title: "Skipped",
      value: result.skipped,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-lg border bg-white p-6 shadow-sm text-black"
        >
          <h3 className="text-gray-600 text-sm font-medium">
            {card.title}
          </h3>

          <p className="text-3xl font-bold mt-2 text-black">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}