import React from "react";
import { CalculationType } from "../app/types/calculation.types";
import { CALC_TYPES } from "../app/constants/calculation.constants";

interface CalculationFormProps {
  numbers: string;
  selectedType: CalculationType;
  result: number | null;
  error: string;
  loading?: boolean;
  onNumbersChange: (value: string) => void;
  onTypeChange: (type: CalculationType) => void;
  onCalculate: () => void;
}

export const CalculationForm: React.FC<CalculationFormProps> = ({
  numbers,
  selectedType,
  result,
  error,
  loading = false,
  onNumbersChange,
  onTypeChange,
  onCalculate,
}) => (
  <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">
        Nova Operação
      </h2>
      <p className="text-gray-500 text-sm">
        Insira os números separados por vírgula
      </p>
    </div>

    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Números
        </label>
        <input
          type="text"
          placeholder="Ex: 1, 2, 3, 4, 5"
          value={numbers}
          onChange={(e) => onNumbersChange(e.target.value)}
          disabled={loading}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Tipo de Cálculo
        </label>
        <div className="grid grid-cols-3 gap-3">
          {CALC_TYPES.map((type) => (
            <button
              key={type.value}
              onClick={() => onTypeChange(type.value)}
              disabled={loading}
              className={`p-4 rounded-xl border-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                selectedType === type.value
                  ? "bg-gradient-to-br from-blue-400 to-purple-400 border-purple-300 text-white shadow-md"
                  : "bg-white border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-50"
              }`}
            >
              <div className="text-2xl mb-1">{type.icon}</div>
              <div className="text-xs font-medium">{type.label}</div>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onCalculate}
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Calculando..." : "Calcular"}
      </button>

      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
          <p className="text-red-600 text-sm font-medium">{error}</p>
        </div>
      )}

      {result !== null && (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-purple-200 rounded-xl p-6 text-center">
          <p className="text-sm text-purple-600 mb-2 font-medium uppercase tracking-wide">
            Resultado
          </p>
          <p className="text-5xl font-bold text-gray-800">
            {result.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  </div>
);
