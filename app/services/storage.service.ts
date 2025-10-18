import { CalculationResult } from "../types/calculation.types";

export const storageService = {
  // Mantido apenas por compatibilidade — histórico agora é controlado no cliente
  save: (calculation: CalculationResult): void => {
    // Função desativada: persistência no servidor foi removida
  },

  // Retorna vazio, pois não há mais armazenamento no backend
  getAll: (): CalculationResult[] => {
    return [];
  },

  // Método placeholder — não há mais limpeza no lado do servidor
  clear: (): void => {
    // Função desativada intencionalmente
  },
};
