"use client";

import { useState } from "react";
import { calculate, type Operator } from "@/lib/calculator";
import CalculatorButton from "@/components/CalculatorButton";
import CalculatorDisplay from "@/components/CalculatorDisplay";

export default function Home() {
  const [display, setDisplay] = useState("0");
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [waitingForSecondNumber, setWaitingForSecondNumber] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justCalculated, setJustCalculated] = useState(false);

  const numberButtons = [
    "7",
    "8",
    "9",
    "4",
    "5",
    "6",
    "1",
    "2",
    "3",
    "0",
  ];

  const operatorButtons: Operator[] = ["/", "*", "-", "+"];

  function handleNumber(value: string) {
    setError(null);

    if (waitingForSecondNumber || justCalculated) {
      setDisplay(value);
      setWaitingForSecondNumber(false);
      setJustCalculated(false);
      return;
    }

    setDisplay((current) => {
      if (current === "0") {
        return value;
      }

      return current + value;
    });
  }

  function handleOperator(nextOperator: Operator) {
    setError(null);
    setJustCalculated(false);

    const currentNumber = Number(display);

    if (firstNumber === null) {
      setFirstNumber(currentNumber);
    } else if (operator !== null && !waitingForSecondNumber) {
      try {
        const result = calculate(firstNumber, operator, currentNumber);

        setDisplay(String(result));
        setFirstNumber(result);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Ocorreu um erro inesperado.");
        }

        handleClear();
        return;
      }
    }

    setOperator(nextOperator);
    setWaitingForSecondNumber(true);
  }

  async function handleEquals() {
    if (firstNumber === null || operator === null || waitingForSecondNumber) {
      return;
    }

    try {
      setError(null);

      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          a: firstNumber,
          b: Number(display),
          operation: operator,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao realizar o cálculo");
      }

      setDisplay(String(data.result));
      setFirstNumber(null);
      setOperator(null);
      setWaitingForSecondNumber(false);
      setJustCalculated(true);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Ocorreu um erro inesperado.");
      }
    }
  }

  function handleClear() {
    setDisplay("0");
    setFirstNumber(null);
    setOperator(null);
    setWaitingForSecondNumber(false);
    setJustCalculated(false);
    setError(null);
  }

  function handleDecimal() {
    setError(null);

    if (waitingForSecondNumber || justCalculated) {
      setDisplay("0.");
      setWaitingForSecondNumber(false);
      setJustCalculated(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay((current) => current + ".");
    }
  }

  function handleToggleSign() {
    setError(null);

    if (display === "0") {
      return;
    }

    setDisplay((current) => String(-Number(current)));
  }

  function handlePercentage() {
    setError(null);

    setDisplay((current) => {
      const value = Number(current);

      if (!Number.isFinite(value)) {
        return current;
      }

      return String(value / 100);
    });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-80 rounded-2xl bg-black p-4 shadow-2xl">
        <CalculatorDisplay value={display} error={error} />

        <div className="grid grid-cols-4 gap-2">
          <CalculatorButton
            label="C"
            variant="action"
            onClick={handleClear}
          />

          <CalculatorButton
            label="+/-"
            variant="action"
            onClick={handleToggleSign}
          />

          <CalculatorButton
            label="%"
            variant="action"
            onClick={handlePercentage}
          />

          <CalculatorButton
            label="÷"
            variant="operator"
            onClick={() => handleOperator(operatorButtons[0])}
          />

          {numberButtons.slice(0, 3).map((number) => (
            <CalculatorButton
              key={number}
              label={number}
              onClick={() => handleNumber(number)}
            />
          ))}

          <CalculatorButton
            label="×"
            variant="operator"
            onClick={() => handleOperator(operatorButtons[1])}
          />

          {numberButtons.slice(3, 6).map((number) => (
            <CalculatorButton
              key={number}
              label={number}
              onClick={() => handleNumber(number)}
            />
          ))}

          <CalculatorButton
            label="-"
            variant="operator"
            onClick={() => handleOperator(operatorButtons[2])}
          />

          {numberButtons.slice(6, 9).map((number) => (
            <CalculatorButton
              key={number}
              label={number}
              onClick={() => handleNumber(number)}
            />
          ))}

          <CalculatorButton
            label="+"
            variant="operator"
            onClick={() => handleOperator(operatorButtons[3])}
          />

          <CalculatorButton
            label="0"
            className="col-span-2"
            onClick={() => handleNumber("0")}
          />

          <CalculatorButton
            label="."
            onClick={handleDecimal}
          />

          <CalculatorButton
            label="="
            variant="operator"
            onClick={handleEquals}
          />
        </div>
      </div>
    </main>
  );
}