import { NextResponse } from "next/server";
import { apiService } from "../../services/api.service";
import { ApiResponse, CalculationResult } from "../../types/calculation.types";

export async function GET() {
  try {
    const history = apiService.getHistory();

    return NextResponse.json<ApiResponse<CalculationResult[]>>(
      { success: true, data: history },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao buscar histórico:", error);

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

// Endpoint opcional para limpar histórico
export async function DELETE() {
  try {
    apiService.clearHistory();

    return NextResponse.json<ApiResponse<{ message: string }>>(
      { success: true, data: { message: "Histórico limpo com sucesso" } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao limpar histórico:", error);

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
