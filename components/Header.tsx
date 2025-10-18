import React from "react";
import { Calculator } from "lucide-react";

// Cabeçalho principal da aplicação — exibe título e ícone
export const Header = () => (
  <div className="mb-10 text-center">
    <div className="inline-flex items-center gap-3 mb-3">
      {/* Ícone estilizado dentro de um container gradiente */}
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center shadow-lg">
        <Calculator className="w-7 h-7 text-white" />
      </div>

      {/* Título da aplicação */}
      <h1 className="text-4xl font-bold text-gray-800">Calculadora API</h1>
    </div>
  </div>
);
