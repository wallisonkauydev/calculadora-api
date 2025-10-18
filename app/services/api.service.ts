import {
  CalculationRequest,
  CalculationResult,
} from "../types/calculation.types";
import { calculationService } from "./calculation.service";
import { storageService } from "./storage.service";

export const apiService = {
  // Executa o cálculo e salva no histórico
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

    storageService.save(calculation);
    return calculation;
  },

  // Retorna todo o histórico
  getHistory: (): CalculationResult[] => {
    return storageService.getAll();
  },

  // Limpa o histórico
  clearHistory: (): void => {
    storageService.clear();
  },
};
