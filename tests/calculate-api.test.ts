import { describe, expect, it } from "vitest";
import { POST } from "../app/api/calculate/route";

describe("POST /api/calculate", () => {
  it("deve retornar o resultado da soma", async () => {
    const request = new Request("http://localhost/api/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        a: 10,
        operation: "+",
        b: 20,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({
      result: 30,
    });
  });

  it("deve rejeitar números enviados como texto", async () => {
    const request = new Request("http://localhost/api/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        a: "10",
        operation: "+",
        b: 20,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      error: "a e b devem ser números válidos",
    });
  });

  it("deve rejeitar uma operação inválida", async () => {
    const request = new Request("http://localhost/api/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        a: 10,
        operation: "%",
        b: 20,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      error: "Operação inválida",
    });
  });

  it("deve impedir divisão por zero", async () => {
    const request = new Request("http://localhost/api/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        a: 10,
        operation: "/",
        b: 0,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      error: "Não é possível dividir por zero",
    });
  });
});