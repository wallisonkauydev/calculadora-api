# 🧮 Calculadora API

Sistema full-stack de cálculos matemáticos com API REST e interface web moderna.

---

## 📖 Sobre o Sistema

A **Calculadora API** é um sistema que permite realizar operações matemáticas através de uma API REST, com interface web interativa. O histórico de cálculos é armazenado em memória no servidor durante a execução.

### ✨ Funcionalidades

- **6 tipos de cálculos disponíveis:**

  - **Soma**: Soma de todos os números
  - **Média**: Média aritmética simples
  - **Mediana**: Valor central da lista ordenada
  - **Moda**: Valor mais frequente
  - **Maior Número**: Retorna o maior valor
  - **Menor Número**: Retorna o menor valor

- **Histórico Compartilhado**: Histórico armazenado em memória no servidor
- **Validações Robustas**: Limites de segurança e detecção de entradas inválidas
- **API REST**: Endpoints para cálculo e histórico
- **Interface Moderna**: Design responsivo com feedback visual

---

## 🛠️ Stack Tecnológica e Justificativas

### Frontend

#### **Next.js 14 (App Router)**

**Escolha:** Framework React full-stack que unifica frontend e backend.

**Justificativas:**

- ✅ **API Routes integradas**: Backend e frontend no mesmo projeto
- ✅ **Deploy simplificado**: Integração nativa com Vercel
- ✅ **TypeScript first-class**: Suporte completo e tipagem forte

---

#### **TypeScript**

**Escolha:** Superset do JavaScript com tipagem estática.

**Justificativas:**

- ✅ **Detecção de erros em tempo de desenvolvimento**: Reduz bugs em produção
- ✅ **Autocomplete e IntelliSense**: Aumenta produtividade

---

#### **Tailwind CSS**

**Escolha:** Framework CSS utility-first.

**Justificativas:**

- ✅ **Desenvolvimento rápido**: Classes utilitárias prontas
- ✅ **Sem CSS customizado**: Menos arquivos e complexidade
- ✅ **Design consistente**: Sistema de design embutido (spacing, colors)

---

#### **shadcn/ui**

**Escolha:** Coleção de componentes acessíveis.

**Justificativas:**

- ✅ **Componentes copiados para o projeto**: Total controle e customização
- ✅ **Integração com Tailwind**: Estilização consistente

---

### Backend

#### **Next.js API Routes**

**Escolha:** Rotas de API serverless integradas ao Next.js.

**Justificativas:**

- ✅ **Deploy unificado**: Frontend e backend juntos
- ✅ **Edge runtime disponível**: Performance global
- ✅ **Sem configuração de servidor**: Menos infraestrutura
- ✅ **TypeScript compartilhado**: Reutiliza tipos entre front e back

---

### Persistência

#### **In-Memory Storage (Servidor)**

**Escolha:** Armazenamento em memória no servidor.

**Justificativas:**

- ✅ **Simplicidade**: Não requer configuração de banco de dados
- ✅ **Performance**: Acesso instantâneo aos dados
- ✅ **Sem custo adicional**: Não precisa de infraestrutura extra
- ✅ **Adequado para o requisito**: Persistência temporária em memória

**Nota:** O histórico é limpo ao reiniciar o servidor (comportamento esperado para armazenamento em memória).

---

## 🔌 API em Produção

### URL Base (Produção)

```
https://calculadora-api-nine.vercel.app/
```

### Endpoints Disponíveis

#### 1. POST `/api/calculo`

Realiza um cálculo matemático e retorna o resultado. O cálculo é automaticamente salvo no histórico do servidor.

**Headers:**

```
Content-Type: application/json
```

**Request Body:**

```json
{
  "type": "soma" | "media" | "mediana" | "moda" | "maior_numero" | "menor_numero",
  "numbers": [1, 2, 3, 4, 5]
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "1697558400000",
    "type": "soma",
    "numbers": [1, 2, 3, 4, 5],
    "result": 15,
    "timestamp": "2025-10-19T12:00:00.000Z"
  }
}
```

**Response (400 Bad Request):**

```json
{
  "success": false,
  "error": "Entrada inválida: use apenas números, vírgulas e sinais matemáticos (+ -)"
}
```

**Response (500 Internal Server Error):**

```json
{
  "success": false,
  "error": "Erro ao processar o cálculo. Tente novamente."
}
```

---

#### 2. GET `/api/history`

Retorna todo o histórico de cálculos realizados armazenados no servidor.

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "id": "1697558400000",
      "type": "soma",
      "numbers": [1, 2, 3, 4, 5],
      "result": 15,
      "timestamp": "2025-10-19T12:00:00.000Z"
    },
    {
      "id": "1697558300000",
      "type": "media",
      "numbers": [10, 20, 30],
      "result": 20,
      "timestamp": "2025-10-19T11:59:00.000Z"
    }
  ]
}
```

**Response (500 Internal Server Error):**

```json
{
  "success": false,
  "error": "Erro ao buscar histórico"
}
```

---

#### 3. DELETE `/api/history`

Limpa todo o histórico de cálculos do servidor.

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "message": "Histórico limpo com sucesso"
  }
}
```

**Response (500 Internal Server Error):**

```json
{
  "success": false,
  "error": "Erro ao limpar histórico"
}
```

---

## 🚀 Usando a API em Produção

### Insomnia / Postman

#### Teste 1: POST /api/calculo

**Configuração:**

- **Método**: `POST`
- **URL**: `https://calculadora-api-nine.vercel.app/api/calculo`
- **Headers**: `Content-Type: application/json`

**Body (JSON) - Exemplo 1 (Soma):**

```json
{
  "type": "soma",
  "numbers": [1, 2, 3, 4, 5]
}
```

**Resposta esperada:**

```json
{
  "success": true,
  "data": {
    "id": "1697558400000",
    "type": "soma",
    "numbers": [1, 2, 3, 4, 5],
    "result": 15,
    "timestamp": "2025-10-19T12:00:00.000Z"
  }
}
```

---

#### Teste 2: GET /api/history

**Configuração:**

- **Método**: `GET`
- **URL**: `https://calculadora-api-nine.vercel.app/api/history`

**Resposta esperada:**

```json
{
  "success": true,
  "data": [
    {
      "id": "1697558400500",
      "type": "menor_numero",
      "numbers": [15, 42, 8, 23, 50],
      "result": 8,
      "timestamp": "2025-10-19T12:05:00.000Z"
    },
    {
      "id": "1697558400400",
      "type": "maior_numero",
      "numbers": [15, 42, 8, 23, 50],
      "result": 50,
      "timestamp": "2025-10-19T12:04:00.000Z"
    }
  ]
}
```

**Nota:** O histórico retorna os cálculos do mais recente para o mais antigo.

---

#### Teste 3: DELETE /api/history

**Configuração:**

- **Método**: `DELETE`
- **URL**: `https://calculadora-api-nine.vercel.app/api/history`

**Resposta esperada:**

```json
{
  "success": true,
  "data": {
    "message": "Histórico limpo com sucesso"
  }
}
```

**Nota:** Após executar este endpoint, o GET /api/history retornará um array vazio.

---

## 📊 Validações e Limites

### Regras de Validação

| Validação             | Regra                                                | Erro Retornado                                             |
| --------------------- | ---------------------------------------------------- | ---------------------------------------------------------- |
| Caracteres permitidos | Apenas números, vírgulas, pontos, espaços, `+` e `-` | "Entrada inválida: use apenas números..."                  |
| Limite máximo         | 999.999.999.999                                      | "Número muito grande: X. Limite máximo: 999.999.999.999"   |
| Limite mínimo         | -999.999.999.999                                     | "Número muito pequeno: X. Limite mínimo: -999.999.999.999" |
| Array vazio           | Mínimo 1 número                                      | "Por favor, insira pelo menos um número válido"            |
| Tipo inválido         | Deve ser um dos 6 tipos                              | "Tipo de cálculo inválido: X"                              |

---

## 💻 Rodando o Projeto Localmente

### Pré-requisitos

- Node.js 18+
- npm, yarn ou pnpm

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/tadeujorge/calculadora-api.git
cd calculadora-api

# 2. Instale as dependências
npm install

# 3. Configure shadcn/ui
npx shadcn@latest init
npx shadcn@latest add card button input alert

# 4. Execute em desenvolvimento
npm run dev

# 5. Acesse no navegador
# http://localhost:3000
```

### Scripts

```bash
npm run dev      # Desenvolvimento (http://localhost:3000)
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Linter
```

---

## 📁 Estrutura do Projeto

```
app/
├── api/
│   ├── calculo/
│   │   └── route.ts           # POST /api/calculo
│   └── history/
│       └── route.ts           # GET /api/history | DELETE /api/history
├── components/
│   ├── Header.tsx
│   ├── CalculationForm.tsx
│   ├── HistoryPanel.tsx
│   └── HistoryItem.tsx
├── services/
│   ├── calculation.service.ts      # Lógica dos cálculos
│   ├── storage.service.ts          # Armazenamento em memória (servidor)
│   └── api.service.ts              # Orquestração
├── types/
│   └── calculation.types.ts        # Interfaces TypeScript
├── constants/
│   └── calculation.constants.ts    # Tipos de cálculo
├── utils/
│   └── calculation.utils.ts        # Validações e helpers
└── page.tsx                         # Página principal
```

---

## 📊 Tipos de Cálculo

| Tipo           | Descrição                | Exemplo     |
| -------------- | ------------------------ | ----------- |
| `soma`         | Soma de todos os números | [1,2,3] → 6 |
| `media`        | Média aritmética         | [1,2,3] → 2 |
| `mediana`      | Valor central            | [1,2,3] → 2 |
| `moda`         | Valor mais frequente     | [1,1,2] → 1 |
| `maior_numero` | Maior valor              | [1,5,3] → 5 |
| `menor_numero` | Menor valor              | [1,5,3] → 1 |

---
