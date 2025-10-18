import { CalculationResult } from "../types/calculation.types";

const STORAGE_KEY = "calculatorHistory";

export const clientStorageService = {
  // Armazena o cálculo mais recente no sessionStorage (mantendo histórico anterior)
  save: (calculation: CalculationResult): void => {
    try {
      const current = clientStorageService.getAll(); // busca histórico existente
      const updated = [calculation, ...current]; // adiciona novo cálculo no topo
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Erro ao salvar no sessionStorage:", e);
    }
  },

  // Retorna todos os cálculos armazenados localmente
  getAll: (): CalculationResult[] => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : []; // se não houver nada, retorna array vazio
    } catch (e) {
      console.error("Erro ao ler do sessionStorage:", e);
      return [];
    }
  },

  // Remove completamente o histórico salvo no navegador
  clear: (): void => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Erro ao limpar sessionStorage:", e);
    }
  },
};
