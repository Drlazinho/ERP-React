# Fabrica-v2-remake

### ✅ Requisitos | Recomendações
- Node.js 22.13.0v
- React 18, React 17
- Typescript
- Vite.js
- NPM

### Linguagens de programação
* js - Temporário
* jsx - Temporário
* ts 
* tsx 

### Documentação em desenvolvimento:
* https://amvox-com.gitbook.io/untitled

<div style="  padding: 20px;
    margin: 20px 0;
    border: 1px solid #fffb00 ;
        background-color: #2e2b12;
    border-left-width: 6px !important;
    border-radius: 3px;
">
🚧 IMPORTANT : É recomendado que todos os arquivos sejam convertidos para Typescript para melhor desenvolvimento e manuteção.
</div>

##

### Instalação
Recomendado:
````
npm i
````
Caso o comando acima não funcionar, use o comando abaixo
````
npm i --legacy-peer-deps
or
npm i --force
````
<div style="  padding: 20px;
    margin: 20px 0;
    border: 1px solid #d9534f;
    background-color: #2e1312;
    border-left-width: 6px !important;
    border-radius: 3px;
">
 🚨~ Caso o primeiro comando não funcione, avisa o time de desenvolvimento e deixe em observação as dependências que estão depreciadas e levando ao uso de <code>--force</code> or <code>---legacy-peer-deps</code>
</div>

### Execução
````
npm run dev
````
### Build | Test Build
````
1. npm run build
````
Após o sucesso da build é aconselhável executar o comando abaixo para verificar a aplicação
````
2. npm run preview
````

##

### 📑 Observações
PONTOS A RESOLVER:
- Atualizar o código de acordo com novas versões das libs. **risco baixo ou nenhum**
    - @Material/Ui
    - Swiper

PONTOS RESOLVIDOS:
- Libs que estão depreciadas ou em fase de depreciação - **risco médio-alta**
    - @Material/Core - Depreciada desde 2021, ver documentação de origem.

- A seguintes libs precisarão serem revisadas após solução das libs depreciada. - **risco baixo-médio** 
    - date-fns
    - react-gauge-component
    - html2canvas
    - jspdf
    - react-file-reader

### testes do gitbook
testando
