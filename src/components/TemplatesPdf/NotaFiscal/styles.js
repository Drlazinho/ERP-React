import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  .content {
    font-family: 'Courier New', Courier, monospace !important;
    height: 31cm;
    width: 21cm;
    font-size: 10pt;
    margin: 0;
    padding: 0.4cm;
    color: black !important;
    background-color: #fff !important;
  }

  p {
    margin: 0;
    padding: 0;
  }

  hr {
    border-style: dashed;
  }

  button {
    margin-top: 1rem;
    width: 50%;
    max-width: 500px;
    color: white;
    background-color: #800000;
    padding: 0.3rem;
    border-color: white;
    border-radius: 5px;
  }

  .tabela {
    display: grid;
  }

  .head {
    font-size: 5pt;
    display: grid;
    grid-template-columns: 1.2cm 6.2cm 1cm 1cm 1cm 0.7cm 1cm 1.3cm 1.5cm 1cm 1cm 1cm 1cm 1.2cm;
    grid-template-rows: 0.5cm;
  }

  .body {
    font-size: 5pt;
    display: flex;
    flex-direction: column;
  }

  .linha {
    display: grid;
    grid-template-columns: 1.2cm 6.2cm 1cm 1cm 1cm 0.7cm 1cm 1.3cm 1.5cm 1cm 1cm 1cm 1cm 1.2cm;
    grid-template-rows: 0.5cm;
  }

  .data {
    padding: 0.1cm;
  }

  .label {
    text-transform: uppercase;
    font-size: 5pt;
    text-align: left;
    font-style: italic;
    font-weight: bold;
  }

  .label-demais-campos {
    font-size: 6pt;
    text-transform: uppercase;
    text-align: left;
    margin-bottom: 0.1cm;
    font-style: italic;
    font-weight: bold;
  }

  .definicao {
    font-size: 10pt;
    margin-bottom: 0.1cm;
  }

  .grupos {
    font-weight: bold;
    font-size: 8pt;
    text-transform: uppercase;
    font-style: italic;
    margin-top: 0.1cm;
  }

  .tamanho-quadros {
    width: 20.2cm;
  }

  .quadro-formatacao {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-transform: uppercase;
    margin-left: 0.1cm;
  }

  .quadro-formatacao-texto {
    display: flex;
    flex-direction: column;
    text-transform: uppercase;
    margin-left: 0.1cm;
  }

  .t-center {
    text-align: center;
  }

  .t-right {
    text-align: right;
  }

  .m-1 {
    margin: 0.1cm;
  }

  .flex {
    display: flex;
  }

  .flex-c {
    flex-direction: column;
  }

  .align-center {
    align-items: center;
  }

  .justify-center {
    justify-content: center;
  }

  .justify-between {
    justify-content: space-between;
  }

  .mt-1 {
    margin-top: 0.1cm;
  }

  .mt-2 {
    margin-top: 0.2cm;
  }

  .mr-1 {
    margin-right: 0.1cm;
  }

  .ml-1 {
    margin-left: 0.1cm;
  }

  .p-1 {
    padding: 1cm;
  }

  .pt-1 {
    padding-right: 0.1cm;
  }

  .pr-1 {
    padding-right: 0.1cm;
  }

  .pl-1 {
    padding-left: 0.1cm;
  }

  .br {
    border-right: 0.5pt solid gray;
  }

  .bt {
    border-top: 0.5pt solid gray;
  }

  .bb {
    border-bottom: 0.5pt solid gray;
  }

  .bl {
    border-left: 0.5pt solid gray;
  }

  .b {
    border: 0.5pt solid gray;
  }

  .ft5 {
    font-size: 6pt;
  }

  .quadrado-recebimento {
    display: grid;
    grid-template-columns: 17.1cm 3.1cm;
    font-size: 6pt;
  }

  .text-recebimento-reistar {
    border-right: 0.5pt solid gray;
  }

  .text-recebimento-nfe {
    text-align: center;
    font-weight: bold;
  }

  .quadrado-recebimento2 {
    display: grid;
    grid-template-columns: 3.1cm 14cm 3.1cm;
    height: 0.7cm;
    font-size: 6pt;
    font-weight: bold;
  }

  .cabecalho {
    display: grid;
    height: 3.48cm;
    grid-template-columns: 6.8cm 3.4cm 10cm;
    grid-template-rows: 3.48cm;
  }

  .row-h {
    grid-template-rows: 0.85cm;
  }

  .quadro-codigo-barras-dados {
    display: grid;
    grid-template-columns: 12.2cm 1fr;
  }

  .quadro-endereco1 {
    display: grid;
    grid-template-columns: 10.16cm 4.83cm 2.67cm 1fr;
  }

  .quadro-endereco2 {
    display: grid;
    grid-template-columns: 7.11cm 4.06cm 1.14cm 5.33cm 1fr;
  }

  .quadro-documentos {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .quadro-destinatario-remetente {
    display: grid;
    grid-template-columns: 12.32cm 5.33cm 1fr;
  }

  .quadro-fatura-duplicata {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    font-size: 6pt;
    padding: 3px;
  }

  .faturaBloco {
    margin-left: 5px;
  }

  .quadro-calculo-impostos,
  .quadro-frete {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }

  .quadro-transportador {
    display: grid;
    grid-template-columns: 1fr 2.79cm 2.2cm 2.29cm 0.76cm 4cm;
  }

  .quadro-end-transportadora {
    display: grid;
    grid-template-columns: 1fr 6.86cm 0.76cm 4cm;
  }

  .quadro-peso-medidas {
    display: grid;
    grid-template-columns: 2.5cm 1fr 1fr 1fr 2.5cm 2.5cm;
  }

  .quadro-dados-adicionais {
    display: grid;
    grid-template-columns: 17.05cm 3.55cm;
    grid-template-rows: 3.5cm;
  }

  .quadro-canhoto {
    display: grid;
    grid-template-columns: 16.1cm 1fr;
    grid-template-rows: 1.6cm;
  }

  .grupo-um {
    height: 0.85cm;
  }

  .item2 {
    display: grid;
    grid-template-columns: 4.5cm 11.6cm;
    grid-template-rows: 0.75cm;
  }

  .quadro-dados-emitente .razao-social {
    font-size: 8pt;
    width: 170px;
  }

  .razao-social-head {
    width: 130px;
    margin-left: 113px;
  }

  .BCIMSSUB {
    position: relative;
  }

  .textSub {
    position: absolute;
    top: 12px;
    left: 90px;
  }

  .quadro-dados-emitente .endereco p {
    font-size: 7pt;
    width: 170px;
    margin-left: 110px;
  }

  .quadro-descricao-danfe {
    position: relative;
  }

  .danfe {
    font-size: 12pt;
    position: absolute;
    top: 0;
    left: 35px;
  }

  .danfe-legenda {
    position: absolute;
    top: 23px;
    left: 2px;
  }

  .containerEntradaSaida {
    position: absolute;
    display: flex;
    top: 55px;
    left: 30px;
  }

  .entradaSaida {
    display: flex;
    flex-direction: column;
  }

  .entrada-saida-opcao {
    position: absolute;
    top: 55px;
    left: 95px;
  }

  .entrada-saida {
    font-size: 10pt;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 2px;
    margin-top: 0.2cm;
    margin-bottom: 0.2cm;
  }

  .numero-nota {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 4px;
    left: 24px;
  }

  .entrada-saida .entrada-saida-opcao {
    border-radius: 0.1cm;
    padding: 0.1cm;
  }

  .numero-nota {
    font-size: 8pt;
  }

  .entrada-saida .opcoes {
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  .entrada-saida {
    font-size: 8pt;
  }

  .opcoes {
    font-size: 6pt;
  }

  .razaoSocial {
    font-size: 10pt;
  }

  .bairro {
    font-size: 9pt;
  }

  .danfe-extenso {
    font-size: 6pt;
  }

  .quadro-codigo-barras-chave .codigo-barras {
    height: 1.48cm;
  }

  .quadro-codigo-barras-chave .codigo-barras img {
    height: 1cm;
  }

  .quadro-codigo-barras-chave .chave-acesso {
    font-size: 8pt;
    display: flex;
    flex-direction: column;
  }

  .quadro-codigo-barras-chave .infos-nota-fiscal-site {
    height: 1.15cm;
    font-size: 8pt;
  }

  .quadro-fatura-duplicata2 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    font-size: 8pt;
  }

  .tabela-produtos {
    display: flex;
    flex-direction: column;
  }

  .danfe {
    text-align: center;
    align-items: center;
  }

  .logoImg {
    max-width: 100px;
    max-height: 60px;
    width: auto;
    height: auto;
  }

  .logo {
    display: flex;
    flex-wrap: wrap;
    width: 90px;
    position: absolute;
    margin-top: 32px;
    margin-left: 5px;
  }
`;
