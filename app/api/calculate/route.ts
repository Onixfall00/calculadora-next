import { NextResponse } from "next/server";
import { calculate, type Operator } from "@/lib/calculator";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { a, b, operation } = body;

    const result = calculate(
      Number(a),
      operation as Operator,
      Number(b)
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