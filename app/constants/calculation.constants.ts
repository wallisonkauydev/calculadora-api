import { CalcType } from "../types/calculation.types";

// Lista de tipos de cálculo disponíveis na aplicação
export const CALC_TYPES: CalcType[] = [
  { value: "soma", label: "Soma", icon: "+" }, // soma simples
  { value: "media", label: "Média", icon: "μ" }, // média aritmética
  { value: "mediana", label: "Mediana", icon: "Md" }, // valor central
  { value: "moda", label: "Moda", icon: "Mo" }, // valor mais frequente
  { value: "maior_numero", label: "Maior", icon: "↑" }, // maior valor
  { value: "menor_numero", label: "Menor", icon: "↓" }, // menor valor
];

// Chave padrão usada para armazenar histórico no sessionStorage
export const STORAGE_KEY = "calculatorHistory";
