import { NextResponse } from "next/server";
import { ApiResponse } from "../../types/calculation.types";

// GET /api/historico — endpoint descontinuado, mantido apenas por compatibilidade
export async function GET() {
  return NextResponse.json<ApiResponse<null>>(
    {
      success: false,
      error:
        "Endpoint descontinuado. O histórico agora é gerenciado no cliente.",
    },
    { status: 410 } // 410 Gone → indica que o recurso foi removido intencionalmente
  );
}

// DELETE /api/historico — também descontinuado
export async function DELETE() {
  return NextResponse.json<ApiResponse<null>>(
    {
      success: false,
      error:
        "Endpoint descontinuado. O histórico agora é gerenciado no cliente.",
    },
    { status: 410 }
  );
}
