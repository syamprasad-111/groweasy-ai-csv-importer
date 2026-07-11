interface ImportButtonProps {
  onImport: () => void;
  loading: boolean;
}

export default function ImportButton({
  onImport,
  loading,
}: ImportButtonProps) {
  return (
    <button
      onClick={onImport}
      disabled={loading}
      className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 disabled:bg-gray-400"
    >
      {loading ? "Importing..." : "Confirm Import"}
    </button>
  );
}