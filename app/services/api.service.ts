import {
  CalculationRequest,
  CalculationResult,
} from "../types/calculation.types";
import { calculationService } from "./calculation.service";

export const apiService = {
  // Realiza o cálculo com base no tipo solicitado e retorna o resultado
  calculate: (request: CalculationRequest): CalculationResult => {
    // Seleciona dinamicamente a função correspondente ao tipo de cálculo
    const calculateFn = calculationService[request.type];

    if (!calculateFn) {
      throw new Error("Tipo de cálculo inválido"); // valida tipo inexistente
    }

    if (!Array.isArray(request.numbers) || request.numbers.length === 0) {
      throw new Error("Array de números inválido ou vazio"); // evita execução com dados inválidos
    }

    // Executa a função de cálculo específica
    const result = calculateFn(request.numbers);

    // Monta o objeto padronizado de resultado
    const calculation: CalculationResult = {
      id: Date.now().toString(), // gera ID único com timestamp
      type: request.type,
      numbers: request.numbers,
      result,
      timestamp: new Date().toISOString(),
    };

    // Nota: resultado não é mais persistido no servidor
    return calculation;
  },
};
