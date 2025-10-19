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

export default function CalculadoraAPI() {
  const [numbers, setNumbers] = useState<string>("");
  const [selectedType, setSelectedType] = useState<CalculationType>("soma");
  const [result, setResult] = useState<number | null>(null);
  const [history, setHistory] = useState<CalculationResult[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Carrega o histórico inicial da API ao montar o componente
  useEffect(() => {
    loadHistory();
  }, []);

  // Busca o histórico de cálculos da API
  const loadHistory = async () => {
    try {
      const response = await fetch("/api/history");
      const data = await response.json();

      if (data.success && data.data) {
        setHistory(data.data);
      }
    } catch (err) {
      console.error("Erro ao carregar histórico:", err);
    }
  };

  // Executa o cálculo via API
  const handleCalculate = async () => {
    setError("");
    setResult(null);
    setLoading(true);

    try {
      // Converte a string de entrada em um array de números válidos
      const numbersArray = calculationUtils.parseNumbers(numbers);

      if (numbersArray.length === 0) {
        setError("Por favor, insira pelo menos um número");
        setLoading(false);
        return;
      }

      const request: CalculationRequest = {
        type: selectedType,
        numbers: numbersArray,
      };

      // Envia a requisição de cálculo para o backend
      const response = await fetch("/api/calculo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();

      if (data.success && data.data) {
        setResult(data.data.result); // Exibe o resultado do cálculo
        await loadHistory(); // Atualiza o histórico após novo cálculo
      } else {
        setError(data.error || "Erro ao calcular. Tente novamente.");
      }
    } catch (err) {
      // Exibe uma mensagem amigável de erro
      if (err instanceof Error) {
        setError(calculationUtils.formatError(err));
      } else {
        setError("Erro ao processar o cálculo. Verifique sua entrada.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Limpa o histórico de cálculos armazenado na API
  const handleClearHistory = async () => {
    try {
      const response = await fetch("/api/history", {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setHistory([]);
        setResult(null);
      }
    } catch (err) {
      console.error("Erro ao limpar histórico:", err);
    }
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
            <HistoryPanel history={history} onClear={handleClearHistory} />
          </div>
        </div>
      </div>

      {/* Estilização da barra de rolagem */}
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
