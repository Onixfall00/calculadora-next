interface CalculatorDisplayProps {
  value: string;
  error?: string | null;
}

export default function CalculatorDisplay({
  value,
  error,
}: CalculatorDisplayProps) {
  return (
    <div className="mb-4 rounded-xl bg-gray-900 p-4 text-right">
      {error ? (
        <div className="text-sm font-semibold text-red-400">
          {error}
        </div>
      ) : (
        <div className="break-all text-4xl font-bold text-white">
          {value}
        </div>
      )}
    </div>
  );
}