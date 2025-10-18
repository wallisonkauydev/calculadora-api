export type CalculationType =
  | "mediana"
  | "maior_numero"
  | "menor_numero"
  | "media"
  | "soma"
  | "moda";

export interface CalculationRequest {
  type: CalculationType;
  numbers: number[];
}

export interface CalculationResult {
  id: string;
  type: CalculationType;
  numbers: number[];
  result: number;
  timestamp: string;
}

export interface CalcType {
  value: CalculationType;
  label: string;
  icon: string;
}

// Resposta da API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
