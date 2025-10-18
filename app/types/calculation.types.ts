// Define os tipos possíveis de cálculos aceitos pela aplicação
export type CalculationType =
  | "mediana"
  | "maior_numero"
  | "menor_numero"
  | "media"
  | "soma"
  | "moda";

// Estrutura esperada na requisição enviada à API
export interface CalculationRequest {
  type: CalculationType; // tipo de cálculo escolhido
  numbers: number[]; // lista de números a processar
}

// Estrutura do resultado retornado após o cálculo
export interface CalculationResult {
  id: string; // identificador único do cálculo
  type: CalculationType; // tipo executado
  numbers: number[]; // números processados
  result: number; // resultado final
  timestamp: string; // data/hora do cálculo
}

// Modelo usado para exibir tipos de cálculo com rótulo e ícone
export interface CalcType {
  value: CalculationType;
  label: string;
  icon: string;
}

// Estrutura genérica para respostas da API
export interface ApiResponse<T> {
  success: boolean; // indica sucesso ou falha
  data?: T; // dados retornados (se sucesso)
  error?: string; // mensagem de erro (se falha)
}
