import { CalculationType } from "../types/calculation.types";
import { CALC_TYPES } from "../constants/calculation.constants";

export const calculationUtils = {
  parseNumbers: (input: string): number[] => {
    return input
      .split(",")
      .map((n) => n.trim())
      .filter((n) => n !== "")
      .map((n) => {
        const num = parseFloat(n);
        if (isNaN(num)) throw new Error("Valores inválidos");
        return num;
      });
  },

  getTypeLabel: (type: CalculationType): string => {
    return CALC_TYPES.find((t) => t.value === type)?.label || type;
  },
};
