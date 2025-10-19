import { NextRequest, NextResponse } from "next/server";
import { apiService } from "../../services/api.service";
import {
  CalculationRequest,
  ApiResponse,
  CalculationResult,
} from "../../types/calculation.types";

const MAX_NUMBER = 999999999999;
const MIN_NUMBER = -999999999999;

// Handler responsável por processar o cálculo enviado pelo cliente
export async function POST(request: NextRequest) {
  try {
    const body: CalculationRequest = await request.json();

    // Verifica se o tipo de cálculo foi informado
    if (!body.type) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: 'Campo "type" é obrigatório' },
        { status: 400 }
      );
    }

    // Garante que o campo "numbers" é um array válido
    if (!body.numbers || !Array.isArray(body.numbers)) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: 'Campo "numbers" deve ser um array de números',
        },
        { status: 400 }
      );
    }

    // Impede envio de array vazio
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

      // Garante que o número está dentro dos limites estabelecidos
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

    // Define os tipos de cálculo aceitos
    const validTypes = [
      "soma",
      "media",
      "mediana",
      "moda",
      "maior_numero",
      "menor_numero",
    ];

    // Rejeita tipos não suportados
    if (!validTypes.includes(body.type)) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: `Tipo de cálculo inválido: "${body.type}". Use: soma, media, mediana, moda, maior_numero ou menor_numero`,
        },
        { status: 400 }
      );
    }

    // Executa o cálculo usando o serviço central
    const result = apiService.calculate(body);

    return NextResponse.json<ApiResponse<CalculationResult>>(
      { success: true, data: result },
      { status: 200 }
    );
  } catch (error) {
    // Captura e trata qualquer erro inesperado no processamento
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
