import { CalculationResult } from "../types/calculation.types";

// Serviço responsável por armazenar o histórico de cálculos em memória.
let memoryDatabase: CalculationResult[] = [];

export const storageService = {
  // Salva um novo cálculo no banco em memória.
  save: (calculation: CalculationResult): void => {
    // Adiciona no início da lista (ordem: mais recente → mais antigo)
    memoryDatabase.unshift(calculation);
  },

  // Retorna uma cópia completa do histórico de cálculos.
  getAll: (): CalculationResult[] => {
    return [...memoryDatabase];
  },

  // Remove todos os registros do histórico em memória.
  clear: (): void => {
    memoryDatabase = [];
  },

  // Retorna a quantidade de registros armazenados.
  count: (): number => {
    return memoryDatabase.length;
  },
};
