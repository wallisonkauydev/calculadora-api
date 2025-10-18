import { CalcType } from "../types/calculation.types";

export const CALC_TYPES: CalcType[] = [
  { value: "soma", label: "Soma", icon: "+" },
  { value: "media", label: "Média", icon: "μ" },
  { value: "mediana", label: "Mediana", icon: "Md" },
  { value: "moda", label: "Moda", icon: "Mo" },
  { value: "maior_numero", label: "Maior", icon: "↑" },
  { value: "menor_numero", label: "Menor", icon: "↓" },
];

export const STORAGE_KEY = "calculatorHistory";
