import { CalculationResult } from "../types/calculation.types";

// Armazena o histórico em memória (não persiste entre restarts do servidor)
let memoryDatabase: CalculationResult[] = [];

export const storageService = {
  // Salvar cálculo no banco em memória
  save: (calculation: CalculationResult): void => {
    memoryDatabase.unshift(calculation); // Adiciona no início
  },

  // Obter todo o histórico
  getAll: (): CalculationResult[] => {
    return [...memoryDatabase]; // Retorna cópia
  },

  // Limpar todo o histórico
  clear: (): void => {
    memoryDatabase = [];
  },

  // Obter quantidade de registros
  count: (): number => {
    return memoryDatabase.length;
  },
};
