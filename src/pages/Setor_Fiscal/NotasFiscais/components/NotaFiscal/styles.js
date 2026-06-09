import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  .content {
    font-family: 'Courier New', Courier, monospace !important;
    height: 29cm;
    width: 21cm;
    font-size: 10pt;
    margin: 0;
    padding: .4cm;
    color: black !important;
    background-color: #fff !important;
  }
  
  p {
    margin: 0;
     font-size: 8px;
  }
  
  table {
  width: 100%;
  border-collapse: collapse;
  
  text-align: center;
  table-layout: fixed;
}
 
  button{
    margin-top: 1rem;
    width: 50%;
    max-width: 500px;
    color: white;
    background-color: #800000;
    padding: .3rem;
    border-color: white;
    border-radius: 5px
  }
  
  .tabela {
    display: grid;
  }
  
  .head {
    font-size: 5pt;
    display: grid;
    grid-template-columns: 1.2cm 6.2cm 1cm 1cm 1cm .7cm 1cm 1.3cm 1.5cm 1cm 1cm 1cm 1cm 1.2cm;
    grid-template-rows: .5cm;
  }
  
  .body {
    font-size: 5pt;
  }
  
  .linha {
    display: grid;
    grid-template-columns: 1.2cm 6.2cm 1cm 1cm 1cm .7cm 1cm 1.3cm 1.5cm 1cm 1cm 1cm 1cm 1.2cm;
    grid-template-rows: .5cm;
  }
  
  .data {
    padding: .1cm;
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
    margin-bottom: .1cm;
    font-style: italic;
    font-weight: bold;
  }
  
  .definicao {
    font-size: 10pt;
    margin-bottom: .1cm;
  }
  
  .grupos {
    font-weight: bold;
    font-size: 8pt;
    text-transform: uppercase;
    font-style: italic;
    margin-top: .10cm;
  }
  
  .tamanho-quadros {
    width: 20.2cm;
  }
  
  .quadro-formatacao {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-transform: uppercase;
    margin-left: .1cm;
  }
  
  .quadro-formatacao-texto {
    display: flex;
    flex-direction: column;
    text-transform: uppercase;
    margin-left: .1cm;
  }
  
  .t-center {
    text-align: center;
  }
  
  .t-right {
    text-align: right;
  }
  
  .m-1 {
    margin: .1cm;
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
    margin-top: .1cm;
  }
  
  .mt-2 {
    margin-top: .2cm;
  }
  
  .mr-1 {
    margin-right: .1cm;
  }
  
  .ml-1 {
    margin-left: .1cm;
  }
  
  .p-1 {
    padding: 1cm;
  }
  
  .pt-1 {
    padding-right: .1cm;
  }
  
  .pr-1 {
    padding-right: .1cm;
  }
  
  .pl-1 {
    padding-left: .1cm;
  }
  
  .br {
    border-right: .5pt solid gray;
  }
  
  .bt {
    border-top: .5pt solid gray;
  }
  
  .bb {
    border-bottom: .5pt solid gray;
  }
  
  .bl {
    border-left: .5pt solid gray;
  }
  
  .b {
    border: .5pt solid gray;
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
  border-right: .5pt solid gray;
}

.text-recebimento-nfe{
  text-align: center;
  font-weight: bold;
}

.quadrado-recebimento2 {
  display: grid;
  grid-template-columns: 3.1cm 14cm 3.1cm;
  height: .7cm;
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
    grid-template-columns: 1fr 1fr 1fr 1fr;
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
    grid-template-columns: 1fr 6.86cm .76cm 4cm;
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
    grid-template-rows: .75cm;
  }
  
  
  .quadro-dados-emitente .razao-social {
    font-size: 12pt;
  }
  
  .quadro-dados-emitente .endereco p {
    font-size: 8pt;
  }
  
  .quadro-descricao-danfe .danfe {
    font-size: 12pt;
  }
  
  .quadro-descricao-danfe .entrada-saida {
    font-size: 10pt;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: .2cm;
    margin-bottom: .2cm;
  }
  
  .quadro-descricao-danfe .entrada-saida .entrada-saida-opcao {
    border-radius: .1cm;
    padding: .1cm;
  }
  
  .quadro-descricao-danfe .numero-nota .numero {
    font-size: 10pt;
  }
  
  .quadro-descricao-danfe .numero-nota {
    font-size: 8pt;
    text-align: center;
    display: flex;
    flex-direction: column;
  }
  
  .quadro-descricao-danfe .entrada-saida .opcoes {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
  
  .quadro-descricao-danfe .entrada-saida .opcoes {
    font-size: 8pt;
  }
  
  .quadro-descricao-danfe .danfe-extenso {
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
  
  .quadro-fatura-duplicata {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    font-size: 8pt;
  }
  
  .tabela-produtos {
    height: 7.5cm;
  }
`