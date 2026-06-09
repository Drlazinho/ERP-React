# Fábrica ERP v2 Remake

Uma aplicação web moderna em **React** construída para atuar como portal administrativo (ERP) e painel de inteligência comercial, integrando processos fiscais, comerciais, de pós-venda e suporte técnico.

---

## 🛠️ Stack Tecnológica

* **Core:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/) (para build rápido e hot-reload)
* **UI & Estilização:** [Material UI (MUI v6)](https://mui.com/) + Styled Components + Bootstrap (legado)
* **Gerenciamento de Estado & HTTP:** [Axios](https://axios-http.com/) + [TanStack React Query v5](https://tanstack.com/query/latest)
* **Formulários e Validações:** React Hook Form + [Zod](https://zod.dev/)
* **Gráficos & Dashboards:** ApexCharts + Recharts
* **Utilitários Fiscais:** jsPDF + html2canvas (para geração de notas fiscais em PDF), xml2js

---

## ⚙️ Variáveis de Ambiente

As chaves de API e URLs de ambiente estão desacopladas do código-fonte por motivos de segurança.

1. Duplique o arquivo `.env.example` e renomeie-o para `.env` ou `.env.development`:
   ```bash
   cp .env.example .env.development
   ```
2. Preencha as URLs de cada serviço nos locais correspondentes:
   * **APIs de Integração:** `VITE_API_FABRICA`, `VITE_API_FACTORY`, `VITE_API_INTELIGENCIA`, etc.
   * **Credenciais de Terceiros:** `VITE_INVERTEXTO_TOKEN` (geração de código de barras).

---

## 🚀 Como Iniciar o Projeto

### 1. Instalação das Dependências
Para instalar as dependências, execute:
```bash
npm install
```
*Caso ocorra algum conflito de dependências antigas em fase de depreciação, utilize:*
```bash
npm install --legacy-peer-deps
```

### 2. Executar em Desenvolvimento
```bash
npm run dev
```

### 3. Build e Teste de Produção
Para compilar o código de produção:
```bash
npm run build
```
Para testar localmente o resultado compilado:
```bash
npm run preview
```

---

## 📈 Diretrizes de Desenvolvimento e Manutenção

* **Migração para TypeScript:** O projeto está em transição. Novos arquivos devem ser criados obrigatoriamente como `.ts` ou `.tsx`. Arquivos legados em `.js` ou `.jsx` devem ser tipados gradualmente.
* **Manutenção de Dependências:**
  * **Concluído:** Remoção da biblioteca depreciada `@material/core`.
  * **Ponto de Atenção:** Revisar no futuro as dependências de formatação e utilitários (`date-fns`, `html2canvas`, `jspdf`, `react-file-reader`) para garantir compatibilidade com as atualizações das libs principais.
