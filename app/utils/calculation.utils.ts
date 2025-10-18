import { CalculationType } from "../types/calculation.types";
import { CALC_TYPES } from "../constants/calculation.constants";

const MAX_NUMBER = 999999999999;
const MIN_NUMBER = -999999999999;

export const calculationUtils = {
  parseNumbers: (input: string): number[] => {
    const cleaned = input.trim();

    if (cleaned === "") {
      throw new Error("Por favor, insira pelo menos um número");
    }

    // Valida caracteres permitidos
    const validPattern = /^[\d\s,.\+\-]+$/;
    if (!validPattern.test(cleaned)) {
      throw new Error(
        "Entrada inválida: use apenas números, vírgulas e sinais matemáticos (+ -)"
      );
    }

    const parts = cleaned.split(",");
    const numbers: number[] = [];

    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed === "") continue;

      const num = parseFloat(trimmed);
      if (isNaN(num)) {
        throw new Error(`Valor inválido encontrado: "${trimmed}"`);
      }

      // Garante que o número está dentro dos limites
      if (num > MAX_NUMBER) {
        throw new Error(
          `Número muito grande: ${num}. Limite máximo: 999.999.999.999`
        );
      }

      if (num < MIN_NUMBER) {
        throw new Error(
          `Número muito pequeno: ${num}. Limite mínimo: -999.999.999.999`
        );
      }

      numbers.push(num);
    }

    if (numbers.length === 0) {
      throw new Error("Por favor, insira pelo menos um número válido");
    }

    return numbers;
  },

  // Retorna o rótulo legível do tipo de cálculo
  getTypeLabel: (type: CalculationType): string => {
    return CALC_TYPES.find((t) => t.value === type)?.label || type;
  },

  // Verifica se o número está dentro dos limites permitidos
  validateNumberLimit: (num: number): boolean => {
    return num >= MIN_NUMBER && num <= MAX_NUMBER;
  },

  // Formata mensagens de erro para exibição amigável
  formatError: (error: Error): string => {
    const message = error.message;

    if (message.includes("inválido") || message.includes("Entrada inválida")) {
      return message;
    }

    if (message.includes("muito grande") || message.includes("muito pequeno")) {
      return message;
    }

    return "Erro ao processar os números. Verifique sua entrada.";
  },
};
