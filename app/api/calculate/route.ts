import { NextResponse } from "next/server";
import { calculate, type Operator } from "@/lib/calculator";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { a, b, operation } = body;

    if (
      typeof a !== "number" ||
      !Number.isFinite(a) ||
      typeof b !== "number" ||
      !Number.isFinite(b)
    ) {
      return NextResponse.json(
        {
          error: "a e b devem ser números válidos",
        },
        {
          status: 400,
        }
      );
    }
     
    if (!["+", "-", "*", "/"].includes(operation)) {
      return NextResponse.json(
        {
          error: "Operação inválida",
        },
        {
          status: 400,
        }
      );
    }

    const result = calculate(
      a,
      operation as Operator,
      b
    );

    return NextResponse.json({
      result,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        error: "Erro inesperado",
      },
      {
        status: 500,
      }
    );
  }
}