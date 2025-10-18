"use client";

import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { CalculationForm } from "../components/CalculationForm";
import { HistoryPanel } from "../components/HistoryPanel";
import {
  CalculationType,
  CalculationRequest,
  CalculationResult,
} from "./types/calculation.types";
import { calculationUtils } from "./utils/calculation.utils";
import { clientStorageService } from "./services/storage.client.service";

export default function CalculadoraAPI() {
  // Estados controlados da UI e resultado
  const [numbers, setNumbers] = useState<string>("");
  const [selectedType, setSelectedType] = useState<CalculationType>("soma");
  const [result, setResult] = useState<number | null>(null);
  const [history, setHistory] = useState<CalculationResult[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Carrega o histórico previamente salvo no sessionStorage ao montar
  useEffect(() => {
    const storedHistory = clientStorageService.getAll();
    setHistory(storedHistory);
  }, []);

  // Dispara cálculo via API e persiste no sessionStorage em caso de sucesso
  const handleCalculate = async () => {
    setError("");
    setResult(null);
    setLoading(true);

    try {
      // Normaliza/valida a entrada de números
      const numbersArray = calculationUtils.parseNumbers(numbers);

      if (numbersArray.length === 0) {
        setError("Insira pelo menos um número");
        setLoading(false);
        return;
      }

      const request: CalculationRequest = {
        type: selectedType,
        numbers: numbersArray,
      };

      // POST /api/calculo: endpoint de cálculo (somente processamento, sem persistência no servidor)
      const response = await fetch("/api/calculo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();

      if (data.success && data.data) {
        // Persiste o resultado no sessionStorage (lado cliente) e atualiza estado local
        clientStorageService.save(data.data);
        setResult(data.data.result);
        setHistory(clientStorageService.getAll());
      } else {
        setError(data.error || "Erro ao calcular");
      }
    } catch (err) {
      // Superfície de erro simples para UX previsível
      setError(err instanceof Error ? err.message : "Erro ao calcular");
    } finally {
      setLoading(false);
    }
  };

  // Limpa histórico local (sessionStorage) e estado relacionado
  const handleClearHistory = () => {
    clientStorageService.clear();
    setHistory([]);
    setResult(null);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 p-4 md:p-8"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto">
        <Header />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Formulário principal: entrada, tipo de cálculo e disparo da ação */}
            <CalculationForm
              numbers={numbers}
              selectedType={selectedType}
              result={result}
              error={error}
              loading={loading}
              onNumbersChange={setNumbers}
              onTypeChange={setSelectedType}
              onCalculate={handleCalculate}
            />
          </div>

          <div className="lg:col-span-1">
            {/* Painel lateral de histórico com ação de limpar */}
            <HistoryPanel history={history} onClear={handleClearHistory} />
          </div>
        </div>
      </div>

      {/* Estilização discreta da barra de rolagem para painéis com overflow */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(243, 244, 246, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #93c5fd, #c4b5fd);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #60a5fa, #a78bfa);
        }
      `}</style>
    </div>
  );
}
