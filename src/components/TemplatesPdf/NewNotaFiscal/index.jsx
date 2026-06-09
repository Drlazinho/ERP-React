import { useEffect, useState } from 'react';
import { apiFabrica } from '../../../services/apis';
import { useParams } from 'react-router';
import { gerarPdf } from '../../../utils/gerarPdf';

import { Container } from './styles';
import formatCnpj from '../../../utils/formatCnpj';
import formatDateTotvs from '../../../utils/formatDataTotvs';
import { formatNumeroNfe } from '../../../utils/formatNfeNumero';
import formatCEP from '../../../utils/formatCEP';
import { buscarNotaFiscalPDF } from '../../../services/notafiscal.service';
import { useToast } from '../../../hooks/toast.hook';
import { formatCurrencyBRLnocifr } from '../../../utils/formatCurrency';

const Linhas = (props) => {
  return (
    <div className="linha">
      <div className="data t-center br">{props.item?.codigo}</div>
      <div className="data pl-1 br">{props.item?.descricao}</div>
      <div className="data t-center br"></div>
      <div className="data t-center br"></div>
      <div className="data t-center br"></div>
      <div className="data t-center br"></div>
      <div className="data t-center br">
        {formatCurrencyBRLnocifr(props.item?.quantidade)}00
      </div>
      <div className="data t-right br">
        {formatCurrencyBRLnocifr(props.item?.valorVenda)}0000
      </div>
      <div className="data t-right br">
        {formatCurrencyBRLnocifr(props.item?.valorTotal)}
      </div>
      <div className="data t-right br">
        {formatCurrencyBRLnocifr(props.item?.valorTotal)}
      </div>
      <div className="data t-right br"></div>
      <div className="data t-center br">
        {formatCurrencyBRLnocifr(props.item?.valorIpi)}
      </div>
      <div className="data t-right br"></div>
      <div className="data t-right">{Number(props.item?.ipi).toFixed(2)} %</div>
    </div>
  );
};

const NotaFiscalTemplate = () => {
  const { documento } = useParams();

  const { addToast } = useToast();

  const [dados, setDados] = useState({});
  const [barcode, setBarcode] = useState('');

  const [itens, setItens] = useState([]);

  useEffect(() => {
    buscarNotaFiscalPDF(documento)
      .then((retorno) => {
        setDados(retorno);
        setItens(retorno.produtos);
        setBarcode(
          `https://api.invertexto.com/v1/barcode?token=${import.meta.env.VITE_INVERTEXTO_TOKEN}&text=${retorno.chaveNFe}&type=code128&font=0`
        );
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro ao CARREGAR!',
          description:
            'Erro ao carregar DADOS da Nota Fiscal, por favor tente novamente dentre de instantes !',
        });
      });
  }, [documento]);

  return (
    <Container>
      <button
        onClick={() =>
          gerarPdf(
            document.getElementById('nfe'),
            formatNumeroNfe(dados.numeroNota)
          )
        }
      >
        Gerar PDF
      </button>
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
            </div>
            <div className="br bl bt">
              <p>IDENTIFICAÇÃO E ASSINATURA DO RECEBEDOR</p>
            </div>
            <div className="pl-1">
              N {formatNumeroNfe(dados.numeroNota)} <br />
              SÉRIE 1
            </div>
          </div>
        </div>
        <div className="cabecalho b">
          <div className="quadro-dados-emitente br t-center flex flex-c justify-center">
            <strong className="razao-social">
              REISTAR INDUSTRIA E COM. ELETRONICOS LTDA.
            </strong>
            <div className="endereco mt-2">
              <p className="logradouro">RUA B QUADRA D LOTE 4</p>
              <p className="bairro">JARDIM LIMOEIRO - 42801-170</p>
              <p className="cidade">CAMAÇARI - BA</p>
              <p className="contato">Fone: 713649-8900</p>
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
                Nº {formatNumeroNfe(dados.numeroNota)}
              </strong>
              <strong className="serie">SÉRIE: 1</strong>
              <strong className="folhas">FOLHA: 1/1</strong>
            </div>
          </div>
          <div className="quadro-codigo-barras-chave t-center">
            <div
              className="codigo-barras flex align-center justify-center
                        bb"
            >
              <img alt="" src={barcode} />
            </div>
            <div className="chave-acesso">
              <strong className="label-demais-campos">chave de acesso</strong>
              <strong className="chave">{dados.chaveNFe}</strong>
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
            <strong className="label">natureza da operação</strong>
            <p className="definicao">VENDA PRODUCAO ESTAB</p>
          </div>
          <div className="protocolo-autorizacao quadro-formatacao t-center">
            <strong className="label">PROTOCOLO DE AUTORIZAÇÃO DE USO</strong>
            <p className="definicao"></p>
          </div>
        </div>
        <div className="quadro-documentos row-h bb bl br">
          <div className="inscricao-estadual quadro-formatacao br">
            <strong className="label">inscrição estadual</strong>
            <p className="definicao">068644763</p>
          </div>
          <div className="inscricao-estadual-2 quadro-formatacao br ">
            <strong className="label">INSC.EST.DO SUBST.TRIBUTÁRIO</strong>
            <p className="definicao"></p>
          </div>
          <div className="cnpj quadro-formatacao">
            <strong className="label">cnpj</strong>
            <p className="definicao">05.949.989/0002-89</p>
          </div>
        </div>
        <div className="grupos">destinatário/remetente</div>
        <div className="quadro-destinatario-remetente row-h b">
          <div className="quadro-formatacao br">
            <strong className="label">nome/razão social</strong>
            <p className="definicao">{dados.cliente}</p>
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">cnpj/cpf</strong>
            <p className="t-center">{formatCnpj(dados.cnpjCliente)}</p>
          </div>
          <div className="quadro-formatacao">
            <strong className="label">DATA DE EMISSÃO</strong>
            <p className="t-center">{formatDateTotvs(dados.emissao)}</p>
          </div>
        </div>
        <div className="quadro-endereco1 row-h bb bl br">
          <div className="logradouro quadro-formatacao br">
            <strong className="label">endereço</strong>
            <p className="definicao">{dados.logradouro}</p>
          </div>
          <div className="bairro quadro-formatacao br">
            <strong className="label">bairro</strong>
            <p className="definicao">{dados.bairro}</p>
          </div>
          <div className="cep quadro-formatacao br">
            <strong className="label">cep</strong>
            <p className="definicao">{formatCEP(dados.cep)}</p>
          </div>
          <div className="data-saida quadro-formatacao">
            <strong className="label">data saída/entrada</strong>
            <p className="t-center">{formatDateTotvs(dados.saida)}</p>
          </div>
        </div>
        <div className="quadro-endereco2 row-h bb bl br">
          <div className="municipio quadro-formatacao br">
            <strong className="label">municipio</strong>
            <p className="definicao">{dados.municipio}</p>
          </div>
          <div className="fone quadro-formatacao br">
            <strong className="label">fone/fax</strong>
            <p className="definicao">
              {dados.ddd}
              {dados.telefone}
            </p>
          </div>
          <div className="uf quadro-formatacao br">
            <strong className="label">uf</strong>
            <p className="definicao">{dados.estado}</p>
          </div>
          <div className="inscricao-estadual quadro-formatacao br">
            <strong className="label">inscricao estadual</strong>
            <p className="definicao">{dados.inscricaoEstadual}</p>
          </div>
          <div className="hora-saida quadro-formatacao">
            <strong className="label">hora de saída</strong>
            <p className="t-center">{dados.horaEmissao}:00</p>
          </div>
        </div>
        <div className="grupos">fatura/duplicata</div>
        <div className="quadro-fatura-duplicata row-h b">
          <div className="br flex justify-between">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="br"></div>
          <div className="br"></div>
          <div></div>
        </div>
        <div className="grupos">calculo do imposto</div>
        <div className="quadro-calculo-impostos row-h tamanho-quadros b">
          <div className="quadro-formatacao br">
            <strong className="label">BASE DE CÁLCULO DO ICMS</strong>
            <p className="t-right">
              {formatCurrencyBRLnocifr(dados.valorBaseIcm)}
            </p>
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">VALOR DO ICMS</strong>
            <p className="t-right">0,00</p>
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">
              BASE DE CÁLCULO DO ICMS SUBSTITUIÇÃO
            </strong>
            <p className="t-right">0,00</p>
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">VALOR DO ICMS SUBSTITUIÇÃO</strong>
            <p className="t-right">0,00</p>
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">VALOR APROXIMADO DOS TRIBUTOS</strong>
            <p className="t-right">0,00</p>
          </div>
          <div className="quadro-formatacao">
            <strong className="label">VALOR TOTAL DOS PRODUTOS</strong>
            <p className="t-right">
              {formatCurrencyBRLnocifr(dados.valorTotalProdutos)}
            </p>
          </div>
        </div>
        <div className="quadro-frete tamanho-quadros row-h bb bl br">
          <div className="quadro-formatacao br">
            <strong className="label">VALOR DO FRETE</strong>
            <p className="t-right">0,00</p>
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">VALOR DO seguro</strong>
            <p className="t-right">0,00</p>
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">desconto</strong>
            <p className="t-right">0,00</p>
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">outras despesas acessórias</strong>
            <p className="t-right">0,00</p>
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">VALOR DO ipi</strong>
            <p className="t-right">{formatCurrencyBRLnocifr(dados.valorIpi)}</p>
          </div>
          <div className="quadro-formatacao">
            <strong className="label">VALOR total da nota</strong>
            <p className="t-right">
              {formatCurrencyBRLnocifr(dados.valorTotalNota)}
            </p>
          </div>
        </div>
        <div className="grupos">transportador/volumes transportados</div>
        <div className="quadro-transportador row-h tamanho-quadros b">
          <div className="quadro-formatacao br">
            <strong className="label">razão social</strong>
            <p className="definicao">{dados.transportadora}</p>
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
            <strong className="label">uf</strong>
            <p className="definicao"></p>
          </div>
          <div className="quadro-formatacao">
            <strong className="label">cpf/cnpj</strong>
            <p></p>
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
            <strong className="label">municipio</strong>
            <p className="definicao"></p>
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">uf</strong>
            <p className="definicao"></p>
          </div>
          <div className="quadro-formatacao">
            <strong className="label">inscrição estadual</strong>
            <p className="definicao"></p>
          </div>
        </div>
        <div
          className="quadro-peso-medidas row-h tamanho-quadros br bl
                bb"
        >
          <div className="quadro-formatacao br">
            <strong className="label">quantidade</strong>
            <p className="definicao"></p>
          </div>
          <div className="quadro-formatacao br">
            <strong className="label">espécie</strong>
            <p className="definicao"></p>
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
            <p className="definicao">
              {Number(dados.pesoBrutoTotal).toFixed(2) + '0'}
            </p>
          </div>
          <div className="quadro-formatacao">
            <strong className="label">peso liquido</strong>
            <p className="definicao">
              {Number(dados.pesoLiquidoTotal).toFixed(2) + '0'}
            </p>
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
            <div className="body">
              {itens.map((item, i) => (
                <Linhas key={i} item={item} />
              ))}
            </div>
          </div>
        </div>
        <div className="grupos">dados adicionais</div>
        <div className="quadro-dados-adicionais b">
          <div className="quadro-formatacao-texto br">
            <strong className="label">informaçôes complementares</strong>
            <p className="definicao ft5"></p>
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
