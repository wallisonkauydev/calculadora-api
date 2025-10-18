import { CalculationResult } from "../types/calculation.types";

export const storageService = {
  // Não salva mais nada (histórico é no cliente)
  save: (calculation: CalculationResult): void => {
    // Removido: não salva mais no servidor
  },

  // Retorna array vazio (histórico é no cliente)
  getAll: (): CalculationResult[] => {
    return [];
  },

  // Não faz nada (histórico é no cliente)
  clear: (): void => {
    // Removido: não limpa mais no servidor
  },
};
