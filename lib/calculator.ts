export type Operator = "+" | "-" | "*" | "/";

export function calculate(
  firstNumber: number,
  operator: Operator,
  secondNumber: number
): number {
  switch (operator) {
    case "+":
      return firstNumber + secondNumber;

    case "-":
      return firstNumber - secondNumber;

    case "*":
      return firstNumber * secondNumber;

    case "/":
      if (secondNumber === 0) {
        throw new Error("Não é possível dividir por zero");
      }

      return firstNumber / secondNumber;

    default:
      throw new Error("Operação inválida");
  }
}