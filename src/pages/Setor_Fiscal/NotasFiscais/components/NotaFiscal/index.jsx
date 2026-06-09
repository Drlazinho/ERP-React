import { useContext } from 'react';
import { Container } from './styles';
import formatDateBarra from '../../../../../utils/formatDateBarra';
import formatCnpj from './formatCnpj';
import formatCEP from './formatCEP';

import { NotaPdfFiscal } from '../../../../hooks/nota-fiscal-pdf/nota-fiscal-pdf.hook';
import formatdhRecbto from './formatdhRecbto';
import formatPhoneNumber from './formatTelefone';
const NotaFiscalTemplate = () => {
  const { nota, barCode } = useContext(NotaPdfFiscal);
  const ListaDeProdutos = nota?.nfeProc?.NFe[0]?.infNFe[0]?.det.map(
    (item, index) => {

      const oCSTtratamento = () => {
        if(item.imposto[0]?.ICMS[0]?.ICMSSN900) {
          return item.imposto[0]?.ICMS[0]?.ICMSSN900[0]?.CSOSN?? ''
        }
        else {
          return''
        }
      }

      return {
        id: index,
        codigoProduto: item.prod[0]?.cProd ?? '',
        descricaoProduto: item.prod[0]?.xProd ?? '',
        ncm: item.prod[0].NCM ?? '',
        oCST: oCSTtratamento(),
        cfop: item.prod[0]?.CFOP ?? '',
        unid: item.prod[0]?.uCom ?? '',
        qtde: item.prod[0]?.qCom ?? '',
        valorUnitario: item.prod[0]?.vUnCom ?? '',
        valorTotal: item.prod[0]?.vProd ?? '',
        // baseICMS: item.imposto[0]?.ICMS[0]?.ICMSSN900?.vBC ?? '',
        // valorICMS: item.imposto[0]?.ICMS[0]?.ICMSSN900?.vICMS ?? '',
        // valorIPI: item.imposto[0]?.IPI[0]?.IPITrib[0]?.vIPI ?? '',
        // aliqICMS: item.imposto[0]?.ICMS[0]?.ICMSSN900?.pICMS ?? '',
        // aliqIPI: item.imposto[0]?.IPI[0]?.IPITrib[0]?.pIPI ?? '',
      };
    }
  );

  return (
    <Container>
      <div id="nfe" className="content" style={{ marginTop: '20px' }}>
        <div className="cabecalho-recebimento b">
          <div className="quadrado-recebimento">
            <div className="text-recebimento-reistar">
              <p>
                RECEBEMOS DE RESITAR INDUSTRIA E COMERCIO DE ELETRONICOS LTDA OS
                PRODUTOS CONSTANTES DA NOTA FISCAL INDICADA AO LADO
              </p>
            </div>
            <div className="text-recebimento-nfe">
              <p>NF-e</p>
            </div>
          </div>
          <div className="quadrado-recebimento2">
            <div className="bt">
              <p>DATA DE RECEBIMENTO</p>
              <p className="text-center"></p>
            </div>
            <div className="br bl bt">
              <p>IDENTIFICAÇÃO E ASSINATURA DO RECEBEDOR</p>
            </div>
            <div className="pl-1">
              {/* FORMATAR AKI TAMBEM? */}
              N°{nota?.nfeProc.NFe[0].infNFe[0].$.Id.slice(28, 37)} <br />
              SÉRIE 1
            </div>
          </div>
        </div>
        <div className="cabecalho b">
          <div className="quadro-dados-emitente br t-center flex flex-c justify-center">
            <strong className="razao-social">
              {nota?.nfeProc.NFe[0].infNFe[0].emit[0].xNome[0]}
              <br />
            </strong>
            <div className="endereco mt-2 ">
              {/* ESTILIZAR O TEXTO DO ENDERECO */}
              <p className="logradouro">
                {
                  nota?.nfeProc?.NFe[0]?.infNFe[0]?.emit[0]?.enderEmit[0]
                    ?.xLgr[0]
                }
                ,
                {
                  nota?.nfeProc?.NFe[0]?.infNFe[0]?.dest[0]?.enderDest[0]
                    ?.nro[0]
                }
                ,
                {nota?.nfeProc?.NFe[0]?.infNFe[0]?.emit[0]?.enderEmit[0]
                  ?.xCpl ?? ''}
                {
                  nota?.nfeProc?.NFe[0]?.infNFe[0]?.emit[0]?.enderEmit[0]
                    ?.xBairro[0]
                }
                ,
                {
                  nota?.nfeProc?.NFe[0]?.infNFe[0]?.dest[0]?.enderDest[0]
                    ?.CEP[0]
                }
                ,
                {
                  nota?.nfeProc?.NFe[0]?.infNFe[0]?.dest[0]?.enderDest[0]
                    ?.xMun[0]
                }{' '}
                -{' '}
                {nota?.nfeProc?.NFe[0]?.infNFe[0]?.dest[0]?.enderDest[0]?.UF[0]}
              </p>{' '}
              {/* FORMATAR CONTATO */}
              {/* <p className="contato">{formatPhoneNumber(nota?.nfeProc.NFe[0].infNFe[0].emit[0].enderEmit[0].fone)?? ''}</p> */}
            </div>
          </div>
          <div className="quadro-descricao-danfe br t-center">
            <div className="entrada-saida">
              <div className="opcoes">
                <strong>0 - ENTRADA</strong>
                <strong>1 - SAIDA</strong>
              </div>
              <strong className="entrada-saida-opcao b">1</strong>
            </div>
            <div className="numero-nota">
              <strong className="numero">
                {/* FORMATAR AKI */}
                Nº {nota?.nfeProc.NFe[0].infNFe[0].$.Id.slice(28, 37)}
              </strong>
              {/* FORMATAR */}
              <strong className="serie">
                SÉRIE: 00{nota?.nfeProc.NFe[0].infNFe[0].ide[0].serie[0]}
              </strong>
              <strong className="folhas">FOLHA: 1/1</strong>
            </div>
          </div>
          <div className="quadro-codigo-barras-chave t-center">
            <div
              className="codigo-barras flex align-center justify-center
                        bb"
            >
              <img alt="" src={barCode} />
            </div>
            <div className="chave-acesso">
              <strong className="label-demais-campos">chave de acesso</strong>
              <strong className="chave">
                {' '}
                {nota?.nfeProc?.protNFe[0]?.infProt[0]?.chNFe[0]}
              </strong>
            </div>
            <div
              className="infos-nota-fiscal-site t-center flex
                        align-center justify-center bt"
            >
              <strong>
                Consulta de autenticidade no portal da NF-e
                www.nfe.fazenda.gov.br/portal
              </strong>
            </div>
          </div>
        </div>

        <div className="quadro-codigo-barras-dados row-h bb bl br">
          <div className="natureza-operacao quadro-formatacao br">
            <strong className="label">NATUREZA DA OPERAÇÃO</strong>
            <p className="definicao">
              {nota?.nfeProc.NFe[0].infNFe[0].ide[0].natOp[0]}
            </p>
          </div>
          <div className="protocolo-autorizacao quadro-formatacao t-center">
            <strong className="label">PROTOCOLO DE AUTORIZAÇÃO DE USO</strong>
            <p
              className="text-start"
              style={{ Width: '100%', fontSize: '8px' }}
            >
              {/* FORMATAR */}
              {nota?.nfeProc.protNFe[0].infProt[0].nProt[0]} -{' '}
              {formatdhRecbto(nota?.nfeProc.protNFe[0].infProt[0].dhRecbto[0])}
            </p>
          </div>
        </div>
        <div className="quadro-documentos row-h bb bl br">
          <div className="inscricao-estadual quadro-formatacao br">
            <strong className="label">inscrição estadual</strong>
            <p className="definicao">
              {nota?.nfeProc.NFe[0].infNFe[0].emit[0].IE[0]}
            </p>
          </div>
          <div className="inscricao-estadual-2 quadro-formatacao br ">
            <strong className="label">INSC.EST.DO SUBST.TRIBUTÁRIO</strong>
            <p className="definicao"> </p>
          </div>
          <div className="cnpj quadro-formatacao">
            <strong className="label">cnpj</strong>
            <p className="definicao">
              {formatCnpj(nota?.nfeProc.NFe[0].infNFe[0].emit[0].CNPJ[0])}
            </p>
          </div>
        </div>

        <div className="grupos">destinatário/remetente</div>
        <div className="quadro-destinatario-remetente row-h b">
          <div className="quadro-formatacao br">
            <strong className="label">nome/razão social</strong>
            <p className="definicao">
              {nota?.nfeProc.NFe[0].infNFe[0].dest[0].xNome[0]}
            </p>
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">cnpj/cpf</strong>
            <p className="t-center definicao">
              {/* {nota?.nfeProc.NFe[0].infNFe[0].dest[0].CNPJ? formatCnpj(nota?.nfeProc.NFe[0].infNFe[0].dest[0].CNPJ?? '') : nota?.nfeProc.NFe[0].dest[0].CPF?? ''} */}
            </p>
          </div>
          <div className="quadro-formatacao">
            <strong className="label">DATA DE EMISSÃO</strong>
            <p className="t-center fs-6">
              {formatDateBarra(
                nota?.nfeProc.NFe[0].infNFe[0].ide[0].dhEmi[0].slice(0, 10)
              )}{' '}
            </p>
          </div>
        </div>
        <div className="quadro-endereco1 row-h bb bl br">
          <div className="logradouro quadro-formatacao br">
            <strong className="label">endereço</strong>
            <p className="definicao">
              {nota?.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].xLgr[0]}{' '}
            </p>
          </div>
          <div className="bairro quadro-formatacao br">
            <strong className="label">bairro</strong>
            <p className="definicao">
              {nota?.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].xBairro[0]}{' '}
            </p>
          </div>
          <div className="cep quadro-formatacao br">
            <strong className="label">cep</strong>
            <p className="definicao">
              {formatCEP(
                nota?.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].CEP[0]
              )}{' '}
            </p>
          </div>
          <div className="data-saida quadro-formatacao">
            <strong className="label">data saída/entrada</strong>
            <p className="t-center definicao">
              {/* {formatDateBarra(
          nota?.nfeProc.NFe[0].infNFe[0].ide[0]?.dhSaiEnt?.slice(0, 10)?? ''
        )}{' '} */}
            </p>
          </div>
        </div>
        <div className="quadro-endereco2 row-h bb bl br">
          <div className="municipio quadro-formatacao br">
            <strong className="label">municipio</strong>
            <p className="definicao">
              {nota?.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].xMun[0]}{' '}
            </p>
          </div>
          {/* AJUSTAR LAYOUT - TROCAR UF COM TELEFONE */}

          <div className="fone quadro-formatacao br">
            <strong className="label">fone/fax</strong>
            <p className="definicao">
              {nota?.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0]?.fone ?? ''}
            </p>
          </div>
          <div className="uf quadro-formatacao br">
            <strong className="label">uf</strong>
            <p className="definicao">
              {nota?.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].UF ?? ''}
            </p>
          </div>
          <div className="inscricao-estadual quadro-formatacao br">
            <strong className="label">inscricao estadual</strong>
            <p className="definicao">
              {nota?.nfeProc.NFe[0].infNFe[0].dest[0]?.IE ?? ''}{' '}
            </p>
          </div>
          <div className="hora-saida quadro-formatacao">
            <strong className="label">hora de saída</strong>
            <p className="t-center definicao">
              {' '}
              {nota?.nfeProc.NFe[0].infNFe[0].ide[0]?.dhSaiEnt?.slice(11, 19) ??
                ''}
            </p>
          </div>
        </div>
        <div className="grupos">calculo do imposto</div>
        <div className="quadro-calculo-impostos row-h tamanho-quadros b">
          <div className="quadro-formatacao br">
            <strong className="label">BASE DE CÁLCULO DO ICMS</strong>
            <p className="t-right">
              {nota?.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vBC[0]}
            </p>
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">VALOR DO ICMS</strong>
            <p className="t-right definicao">
              {nota?.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vICMS[0]}
            </p>
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">
              BASE DE CÁLCULO DO ICMS SUBSTITUIÇÃO
            </strong>
            <p className="t-right " style={{ fontSize: '10px' }}>
              0,00
            </p>
            <br />
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">VALOR DO ICMS SUBSTITUIÇÃO</strong>
            <p className="t-right definicao">
              {nota?.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vBCST ?? ''}
            </p>
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">VALOR APROXIMADO DOS TRIBUTOS</strong>
            <p className="t-right definicao">
              {nota?.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vPIS}
            </p>
          </div>
          <div className="quadro-formatacao">
            <strong className="label">VALOR TOTAL DOS PRODUTOS</strong>
            <p className="t-right definicao">
              {nota?.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vProd ?? ''}
            </p>
          </div>
        </div>
        <div className="quadro-frete tamanho-quadros row-h bb bl br">
          <div className="quadro-formatacao br">
            <strong className="label">VALOR DO FRETE</strong>
            <p className="t-right definicao">
              {nota?.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vFrete[0]}
            </p>
          </div>
          <div className="quadro-formatacao br">
            <strong className="label ">VALOR DO seguro</strong>
            <p className="t-right definicao">
              {nota?.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vSeg[0]}
            </p>
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">desconto</strong>
            <p className="t-right">
              {nota?.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vDesc[0]}
            </p>
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">outras despesas acessórias</strong>
            <p className="t-right">
              {nota?.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vOutro[0]}
            </p>
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">VALOR DO ipi</strong>
            <p className="t-right definicao">
              {' '}
              {nota?.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vIPI[0]}
            </p>
          </div>
          <div className="quadro-formatacao">
            <strong className="label">VALOR total da nota</strong>
            <p className="t-right definicao">
              {nota?.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vNF[0]}
            </p>
          </div>
        </div>
        <div className="grupos">transportador/volumes transportados</div>
        <div className="quadro-transportador row-h tamanho-quadros b">
          <div className="quadro-formatacao br">
            <strong className="label">razão social</strong>
            <p className="definicao">
              {nota?.nfeProc?.NFe[0]?.infNFe[0]?.transp?.transporta?.xNome ??
                ''}
            </p>
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">FRETE POR CONTA</strong>
            <p className="definicao"></p>
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">código ant</strong>
            <p className="definicao"></p>
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">placa do veículo</strong>
            <p className="definicao"></p>
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">
              {nota?.nfeProc.NFe[0].infNFe[0].emit[0].enderEmit[0].UF[0]}
            </strong>
            <p className="definicao"></p>
          </div>
          <div className="quadro-formatacao">
            <strong className="label">cpf/cnpj</strong>
            <p>
              {nota?.nfeProc?.NFe[0]?.infNFe[0]?.transp[0]?.transporta
                ? nota?.nfeProc?.NFe[0]?.infNFe[0]?.transp[0]?.transporta[0]
                    ?.CNPJ
                : ''}
            </p>
          </div>
        </div>
        <div
          className="quadro-end-transportadora row-h tamanho-quadros br bl
        bb"
        >
          <div className="quadro-formatacao br">
            <strong className="label">endereço</strong>
            <p className="definicao"></p>
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">
              {nota?.nfeProc.NFe[0].infNFe[0].emit[0].enderEmit[0].cMun[0]}
            </strong>
            <p className="definicao"></p>
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">uf</strong>
            <p className="definicao">
              {nota?.nfeProc.NFe[0].infNFe[0].emit[0].enderEmit[0].UF[0]}
            </p>
          </div>
          <div className="quadro-formatacao">
            <strong className="label">inscrição estadual</strong>
            <p className="definicao">
              {/* {nota?.nfeProc.NFe[0].infNFe[0].transp[0].transporta[0].IE[0]} */}
            </p>
          </div>
        </div>
        <div
          className="quadro-peso-medidas row-h tamanho-quadros br bl
        bb"
        >
          <div className="quadro-formatacao br">
            <strong className="label">quantidade</strong>
            {/* <p className="definicao">{nota?.nfeProc.NFe[0].infNFe[0].transp[0]?.vol?.qVol?? ''}</p> */}
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">espécie</strong>
            {/* <p className="definicao">{nota?.nfeProc.NFe[0].infNFe[0].transp[0]?.vol?.esp?? ''}</p> */}
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">marca</strong>
            <p className="definicao"></p>
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">numeração</strong>
            <p className="definicao"></p>
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">peso bruto</strong>
            {/* <p className="definicao">{nota?.nfeProc.NFe[0].infNFe[0].transp[0].vol[0].pesoB?? ''} KG</p> */}
          </div>
          <div className="quadro-formatacao">
            <strong className="label">peso liquido</strong>
            {/* <p className="definicao"> {nota?.nfeProc.NFe[0].infNFe[0].transp[0].vol[0].pesoL?? ''} KG</p> */}
          </div>
        </div>
        <div className="grupos">dados do produto/serviços</div>
        <div className="tabela-produtos b">
          <div className="tabela">
            <div className="head t-center bb">
              <div className="br flex align-center justify-center">
                <p>CÓDIGO PRODUTO</p>
              </div>
              <div className="br flex align-center justify-center">
                <p>DESCRIÇÃO DO PRODUTO/SERVIÇO</p>
              </div>
              <div className="br flex align-center justify-center">
                <p>NCM/SH</p>
              </div>
              <div className="br flex align-center justify-center">
                <p>CST</p>
              </div>
              <div className="br flex align-center justify-center">
                <p>CFOP</p>
              </div>
              <div className="br flex align-center justify-center">
                <p>UN</p>
              </div>
              <div className="br flex align-center justify-center">
                <p>QUANT.</p>
              </div>
              <div className="br flex align-center justify-center">
                <p>V.UNITÁRIO</p>
              </div>
              <div className="br flex align-center justify-center">
                <p>V.TOTAL</p>
              </div>
              <div className="br flex align-center justify-center">
                <p>BC.ICMS</p>
              </div>
              <div className="br flex align-center justify-center">
                <p>V.ICMS</p>
              </div>
              <div className="br flex align-center justify-center">
                <p>V.IPI</p>
              </div>
              <div className="br flex align-center justify-center">
                <p>A.ICMS</p>
              </div>
              <div className="flex align-center justify-center">
                <p>A.IPI</p>
              </div>
            </div>
          </div>
          <tr>
            <table>
              <tbody className="   h-100">
                <tr className="  ">
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
                {nota && ListaDeProdutos.map((item) => (
                  <tr className="linha" key={item.id}>
                    <td className="border-0">
                      <p>
                        {item.codigoProduto[0]}
                      </p>
                    </td>
                    <td>
                      <p>
                        {item.descricaoProduto[0]}
                      </p>
                    </td>
                    <td className="  h-100 border-start">
                      <p className="border-start">
                       {item.ncm[0]}
                      </p>
                    </td>
                    <td>
                      <p>{item.oCST[0]}</p>
                    </td>
                    <td>
                      <p>{item.cfop[0]}</p>
                    </td>
                    <td>
                      <p>{item.unid[0]}</p>
                    </td>
                    <td>
                      <p>{item.qtde[0]}</p>
                    </td>
                    <td>
                      <p>{item.valorUnitario[0]}</p>
                    </td>
                    <td>
                      <p>{item.valorTotal[0]}</p>
                    </td>
                    {/* <td>
                      <p>{item.baseICMS[0]}</p>
                    </td>
                    <td>
                      <p>{item.valorICMS[0]}</p>
                    </td>
                    <td>
                      <p>{item.valorIPI[0]}</p>
                    </td>
                    <td>
                      <p>{item.aliqICMS[0]}</p>
                    </td>
                    <td>
                      <p>{item.aliqIPI[0]}</p>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </tr>
        </div>
        <div className="grupos">dados adicionais</div>
        <div className="quadro-dados-adicionais b">
          <div className="quadro-formatacao-texto br">
            <strong className="label">informaçôes complementares</strong>
            {/* <p className="definicao ft5">{nota?.nfeProc.NFe[0].infNFe[0].infAdic[0].infAdFisco[0]}</p> */}
            <p>Protocolo: {nota?.nfeProc.protNFe[0].infProt[0].nProt[0]}</p>
          </div>
          <div className="quadro-formatacao-texto">
            <strong className="label">reservado ao fisco</strong>
            <p className="definicao"></p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default NotaFiscalTemplate;
