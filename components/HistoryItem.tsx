import React from "react";
import { CalculationResult } from "../app/types/calculation.types";
import { calculationUtils } from "../app/utils/calculation.utils";

interface HistoryItemProps {
  calculation: CalculationResult; // resultado individual armazenado no histórico
}

// Componente que exibe um item do histórico de cálculos
export const HistoryItem: React.FC<HistoryItemProps> = ({ calculation }) => (
  <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
    {/* Cabeçalho: tipo de cálculo */}
    <div className="flex justify-between items-start mb-3">
      <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider bg-white px-2 py-1 rounded-lg">
        {calculationUtils.getTypeLabel(calculation.type)}{" "}
        {/* Exibe rótulo legível */}
      </span>
    </div>

    {/* Números de entrada */}
    <div className="text-sm text-gray-600 mb-2">
      <span className="font-medium">Entrada:</span>{" "}
      <span className="text-gray-700">[{calculation.numbers.join(", ")}]</span>
    </div>

    {/* Resultado formatado */}
    <div className="flex items-baseline gap-2">
      <span className="text-sm text-gray-600 font-medium">Resultado:</span>
      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {calculation.result.toFixed(2)} {/* Exibição com duas casas decimais */}
      </span>
    </div>
  </div>
);
