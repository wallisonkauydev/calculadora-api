import React from "react";
import { History, Trash2 } from "lucide-react";
import { CalculationResult } from "../app/types/calculation.types";
import { HistoryItem } from "./HistoryItem";

interface HistoryPanelProps {
  history: CalculationResult[]; // lista de resultados armazenados
  onClear: () => void; // callback para limpar o histórico
}

// Painel lateral responsável por exibir o histórico de cálculos
export const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  onClear,
}) => (
  <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 h-full">
    {/* Cabeçalho do painel */}
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <History className="w-5 h-5 text-blue-500" />
          Histórico
        </h2>
        <p className="text-gray-500 text-xs mt-1">
          {history.length} {history.length === 1 ? "operação" : "operações"}
        </p>
      </div>

      {/* Botão de limpar histórico (visível apenas se houver registros) */}
      {history.length > 0 && (
        <button
          onClick={onClear}
          className="p-2 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-all"
          title="Limpar histórico"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      )}
    </div>

    {/* Corpo do painel: lista de itens ou estado vazio */}
    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
      {history.length === 0 ? (
        // Estado vazio (nenhum cálculo feito)
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
            <History className="w-8 h-8 text-purple-400" />
          </div>
          <p className="text-gray-400 text-sm">Nenhum cálculo realizado</p>
        </div>
      ) : (
        // Renderiza cada item do histórico
        history.map((calc) => <HistoryItem key={calc.id} calculation={calc} />)
      )}
    </div>
  </div>
);
