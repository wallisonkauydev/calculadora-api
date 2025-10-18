import { NextRequest, NextResponse } from "next/server";
import { apiService } from "../../services/api.service";
import {
  CalculationRequest,
  ApiResponse,
  CalculationResult,
} from "../../types/calculation.types";

const MAX_NUMBER = 999999999999;
const MIN_NUMBER = -999999999999;

export async function POST(request: NextRequest) {
  try {
    const body: CalculationRequest = await request.json();

    // Valida o tipo de cálculo solicitado
    if (!body.type) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: 'Campo "type" é obrigatório' },
        { status: 400 }
      );
    }

    // Valida o array de números recebido
    if (!body.numbers || !Array.isArray(body.numbers)) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: 'Campo "numbers" deve ser um array de números',
        },
        { status: 400 }
      );
    }

    if (body.numbers.length === 0) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: "Por favor, insira pelo menos um número" },
        { status: 400 }
      );
    }

    // Valida cada número individualmente
    for (let i = 0; i < body.numbers.length; i++) {
      const num = body.numbers[i];

      if (typeof num !== "number" || isNaN(num)) {
        return NextResponse.json<ApiResponse<null>>(
          {
            success: false,
            error: `Valor inválido na posição ${
              i + 1
            }: "${num}". Use apenas números válidos.`,
          },
          { status: 400 }
        );
      }

      if (!isFinite(num)) {
        return NextResponse.json<ApiResponse<null>>(
          {
            success: false,
            error: `Número inválido na posição ${
              i + 1
            }: valor infinito não permitido`,
          },
          { status: 400 }
        );
      }

      // Garante que o número está dentro dos limites definidos
      if (num > MAX_NUMBER) {
        return NextResponse.json<ApiResponse<null>>(
          {
            success: false,
            error: `Número muito grande na posição ${
              i + 1
            }: ${num}. Limite máximo: 999.999.999.999`,
          },
          { status: 400 }
        );
      }

      if (num < MIN_NUMBER) {
        return NextResponse.json<ApiResponse<null>>(
          {
            success: false,
            error: `Número muito pequeno na posição ${
              i + 1
            }: ${num}. Limite mínimo: -999.999.999.999`,
          },
          { status: 400 }
        );
      }
    }

    // Garante que o tipo de cálculo é suportado
    const validTypes = [
      "soma",
      "media",
      "mediana",
      "moda",
      "maior_numero",
      "menor_numero",
    ];
    if (!validTypes.includes(body.type)) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: `Tipo de cálculo inválido: "${body.type}". Use: soma, media, mediana, moda, maior_numero ou menor_numero`,
        },
        { status: 400 }
      );
    }

    // Executa o cálculo via service
    const result = apiService.calculate(body);

    return NextResponse.json<ApiResponse<CalculationResult>>(
      { success: true, data: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao processar cálculo:", error);

    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Erro ao processar o cálculo. Tente novamente.",
      },
      { status: 500 }
    );
  }
}
