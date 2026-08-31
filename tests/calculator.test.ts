import { describe, expect, it } from "vitest";
import { calculate } from "../lib/calculator";

describe("calculate", () => {
  it("deve somar dois números", () => {
    expect(calculate(10, "+", 20)).toBe(30);
  });

  it("deve subtrair dois números", () => {
    expect(calculate(20, "-", 5)).toBe(15);
  });

  it("deve multiplicar dois números", () => {
    expect(calculate(10, "*", 5)).toBe(50);
  });

  it("deve dividir dois números", () => {
    expect(calculate(10, "/", 4)).toBe(2.5);
  });

  it("deve impedir divisão por zero", () => {
    expect(() => calculate(10, "/", 0)).toThrow(
      "Não é possível dividir por zero"
    );
  });
});