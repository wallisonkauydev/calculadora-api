import { CalculationType } from "../types/calculation.types";
import { CALC_TYPES } from "../constants/calculation.constants";

export const calculationUtils = {
  // Converte a string de entrada em um array de números válidos
  parseNumbers: (input: string): number[] => {
    return input
      .split(",") // separa por vírgulas
      .map((n) => n.trim()) // remove espaços extras
      .filter((n) => n !== "") // ignora campos vazios
      .map((n) => {
        const num = parseFloat(n);
        if (isNaN(num)) throw new Error("Valores inválidos"); // valida se é número
        return num;
      });
  },

  // Retorna o rótulo legível (ex: "Soma", "Media") com base no tipo de cálculo
  getTypeLabel: (type: CalculationType): string => {
    return CALC_TYPES.find((t) => t.value === type)?.label || type;
  },
};
