import { NextRequest, NextResponse } from "next/server";
import { apiService } from "../../services/api.service";
import {
  CalculationRequest,
  ApiResponse,
  CalculationResult,
} from "../../types/calculation.types";

export async function POST(request: NextRequest) {
  try {
    const body: CalculationRequest = await request.json();

    // Validação do corpo da requisição
    if (!body.type) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: 'Campo "type" é obrigatório' },
        { status: 400 }
      );
    }

    if (!body.numbers || !Array.isArray(body.numbers)) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: 'Campo "numbers" deve ser um array' },
        { status: 400 }
      );
    }

    if (body.numbers.length === 0) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: 'Array "numbers" não pode estar vazio' },
        { status: 400 }
      );
    }

    // Validar se todos os elementos são números
    const allNumbers = body.numbers.every(
      (n) => typeof n === "number" && !isNaN(n)
    );
    if (!allNumbers) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: "Todos os elementos devem ser números válidos",
        },
        { status: 400 }
      );
    }

    // Executar cálculo (apenas retorna o resultado, não salva)
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
          error instanceof Error ? error.message : "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}
