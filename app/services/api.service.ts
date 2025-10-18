import {
  CalculationRequest,
  CalculationResult,
} from "../types/calculation.types";
import { calculationService } from "./calculation.service";

export const apiService = {
  // Executa o cálculo e retorna o resultado (NÃO salva mais)
  calculate: (request: CalculationRequest): CalculationResult => {
    const calculateFn = calculationService[request.type];

    if (!calculateFn) {
      throw new Error("Tipo de cálculo inválido");
    }

    if (!Array.isArray(request.numbers) || request.numbers.length === 0) {
      throw new Error("Array de números inválido ou vazio");
    }

    const result = calculateFn(request.numbers);

    const calculation: CalculationResult = {
      id: Date.now().toString(),
      type: request.type,
      numbers: request.numbers,
      result,
      timestamp: new Date().toISOString(),
    };

    // Removido: não salva mais no servidor
    return calculation;
  },
};
