import { NextResponse } from "next/server";
import { ApiResponse } from "../../types/calculation.types";

export async function GET() {
  return NextResponse.json<ApiResponse<null>>(
    {
      success: false,
      error:
        "Endpoint descontinuado. O histórico agora é gerenciado no cliente.",
    },
    { status: 410 }
  );
}

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
