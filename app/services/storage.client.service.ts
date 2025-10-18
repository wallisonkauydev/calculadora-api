import { CalculationResult } from "../types/calculation.types";

const STORAGE_KEY = "calculatorHistory";

export const clientStorageService = {
  // Salvar cálculo no sessionStorage do navegador
  save: (calculation: CalculationResult): void => {
    try {
      const current = clientStorageService.getAll();
      const updated = [calculation, ...current];
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Erro ao salvar no sessionStorage:", e);
    }
  },

  // Obter todo o histórico do sessionStorage
  getAll: (): CalculationResult[] => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Erro ao ler do sessionStorage:", e);
      return [];
    }
  },

  // Limpar todo o histórico do sessionStorage
  clear: (): void => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Erro ao limpar sessionStorage:", e);
    }
  },
};
