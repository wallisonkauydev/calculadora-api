import {
  CalculationRequest,
  CalculationResult,
} from "../types/calculation.types";
import { calculationService } from "./calculation.service";
import { storageService } from "./storage.service";

export const apiService = {
  // Executa o cálculo de acordo com o tipo solicitado e armazena o resultado no histórico.
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
      id: Date.now().toString(), // ID único baseado no timestamp atual
      type: request.type,
      numbers: request.numbers,
      result,
      timestamp: new Date().toISOString(),
    };

    // Persiste o resultado no histórico local
    storageService.save(calculation);

    return calculation;
  },

  // Retorna todos os cálculos armazenados no histórico.
  getHistory: (): CalculationResult[] => {
    return storageService.getAll();
  },

  // Remove todos os registros do histórico de cálculos.
  clearHistory: (): void => {
    storageService.clear();
  },
};
