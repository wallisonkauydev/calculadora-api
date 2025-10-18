# 🧮 Calculadora API

Sistema full-stack de cálculos matemáticos com API REST e interface web.

## 📖 Sobre o Sistema

A **Calculadora API** é um sistema que permite realizar operações matemáticas através de uma API REST, com interface web interativa para facilitar o uso. O histórico de cálculos é armazenado localmente no navegador de cada usuário, garantindo privacidade.

### ✨ Funcionalidades

- **6 tipos de cálculos disponíveis:**
  - **Soma**: Soma de todos os números
  - **Média**: Média aritmética simples
  - **Mediana**: Valor central da lista ordenada
  - **Moda**: Valor mais frequente
  - **Maior Número**: Retorna o maior valor
  - **Menor Número**: Retorna o menor valor

- **Histórico Individual**: Cada usuário tem seu próprio histórico armazenado no navegador (sessionStorage)
- **Interface Moderna**: Design clean com cores pastel azul e roxo
- **API REST**: Endpoint documentado e pronto para integração

---

## 🛠️ Stack

### Frontend
- **[Next.js 14]** - Framework React full-stack com App Router
- **[TypeScript]** - Tipagem estática para maior segurança
- **[Tailwind CSS]** - Framework CSS utility-first
- **[shadcn/ui]** - Componentes UI acessíveis e customizáveis
- **[Lucide React]** - Biblioteca de ícones moderna

### Backend
- **[Next.js API Routes]** - Rotas de API serverless
- **TypeScript** - Validações e tipagem no servidor

### Persistência
- **SessionStorage (Cliente)** - Armazena histórico no navegador do usuário
- **In-Memory (Servidor)** - Não persiste dados entre usuários (stateless)

---

## 🔌 API Documentation

### Endpoint: POST `/api/calculo`

Realiza um cálculo matemático e retorna o resultado.

#### Request

```json
{
  "type": "soma" | "media" | "mediana" | "moda" | "maior_numero" | "menor_numero",
  "numbers": [1, 2, 3, 4, 5]
}
```

#### Response (Sucesso)

```json
{
  "success": true,
  "data": {
    "id": "1697558400000",
    "type": "soma",
    "numbers": [1, 2, 3, 4, 5],
    "result": 15,
    "timestamp": "2025-10-17T12:00:00.000Z"
  }
}
```

#### Response (Erro)

```json
{
  "success": false,
  "error": "Campo 'type' é obrigatório"
}
```

#### Validações

- `type`: Obrigatório, deve ser um dos 6 tipos válidos
- `numbers`: Obrigatório, array não vazio de números válidos

---

## 🧪 Testando a API no Insomnia

### 1. Configurando a Requisição

#### Passo 1: Criar Nova Request
- Clique em `+` → `New HTTP Request`
- Dê um nome: `Calcular Soma`

#### Passo 2: Configurar o Método e URL
- **Método**: `POST`
- **URL**: `https://calculadora-api-nine.vercel.app/api/calculo`

- **Método**: `GET`
- **URL**: `https://calculadora-api-nine.vercel.app/api/history`

#### Passo 3: Configurar o Body
- Selecione a aba `Body`
- Escolha `JSON`
- Cole o seguinte JSON:

```json
{
  "type": "soma",
  "numbers": [1, 2, 3, 4, 5]
}
```

#### Passo 4: Enviar a Requisição
- Clique no botão `Send`
- Veja a resposta no painel direito

---

## 💻 Rodando o Projeto Localmente

### Pré-requisitos

- **Node.js 18+** instalado
- **npm**, **yarn** ou **pnpm**

### Passo a Passo

#### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/calculadora-api.git
cd calculadora-api
```

#### 2. Instale as dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

#### 3. Execute o servidor de desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

#### 4. Acesse no navegador

Abra [http://localhost:3000] para ver a aplicação rodando.

---

## 📂 Estrutura do Projeto

```
app/
├── api/
│   ├── calculo/
│   │   └── route.ts           # POST /api/calculo
│   └── history/
│       └── route.ts           # GET /api/history
├── components/
│   ├── Header.tsx
│   ├── CalculationForm.tsx
│   ├── HistoryPanel.tsx
│   └── HistoryItem.tsx
├── services/
│   ├── calculation.service.ts
│   ├── storage.service.ts
│   ├── storage.client.service.ts
│   └── api.service.ts
├── types/
│   └── calculation.types.ts
├── constants/
│   └── calculation.constants.ts
├── utils/
│   └── calculation.utils.ts
└── page.tsx
```

---

## 🎨 Interface do Usuário

A interface possui:
- **Formulário de cálculo** com seleção visual dos tipos
- **Campo de entrada** para números separados por vírgula
- **Exibição do resultado** em destaque
- **Painel de histórico** com todos os cálculos realizados na sessão
- **Design responsivo** que funciona em desktop e mobile

---

## 🔒 Privacidade

O histórico de cálculos é armazenado **apenas no navegador do usuário** (sessionStorage), garantindo que:
- ✅ Cada usuário vê apenas seus próprios cálculos
- ✅ Nenhum dado é compartilhado entre usuários
- ✅ O histórico é limpo ao fechar o navegador/aba
