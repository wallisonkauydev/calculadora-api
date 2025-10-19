import { NextResponse } from "next/server";
import { storageService } from "../../services/storage.service";

// define o runtime e desabilita cache dinâmico para compatibilidade no App Router
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// retorna todos os cálculos armazenados no histórico
export async function GET() {
  try {
    const history = storageService.getAll();
    return NextResponse.json({ success: true, data: history }, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Erro ao obter histórico";
    // loga o objeto bruto para debug, sem afetar a resposta ao cliente
    console.error("Erro ao obter histórico:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// remove todos os registros do histórico
export async function DELETE() {
  try {
    storageService.clear();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Erro ao limpar histórico";
    console.error("Erro ao limpar histórico:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
