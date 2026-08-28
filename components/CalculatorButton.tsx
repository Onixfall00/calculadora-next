interface CalculatorButtonProps {
  label: string;
  onClick: () => void;
  variant?: "number" | "operator" | "action";
  className?: string;
}

export default function CalculatorButton({
  label,
  onClick,
  variant = "number",
  className = "",
}: CalculatorButtonProps) {
  const baseClasses =
    "rounded-xl p-4 text-xl font-bold transition hover:opacity-80 active:scale-95";

  const variantClasses = {
    number: "bg-gray-700 text-white",
    operator: "bg-orange-500 text-white",
    action: "bg-gray-400 text-black",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {label}
    </button>
  );
}