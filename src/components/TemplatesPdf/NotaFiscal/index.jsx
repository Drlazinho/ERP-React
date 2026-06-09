import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button,
  Typography
} from '@mui/material';
import styles from './NotaFiscalTemplate.module.css';
import logo from '../../../assets/amvoxlogosemritmopng.png';
import { gerarPdf } from '../../../utils/gerarPdf';
import formatCnpj from '../../../utils/formatCnpj';
import formatDateTotvs from '../../../utils/formatDataTotvs';
import { formatNumeroNfe } from '../../../utils/formatNfeNumero';
import formatCEP from '../../../utils/formatCEP';
import { buscarNotaFiscalPDF } from '../../../services/notafiscal.service';
import { useToast } from '../../../hooks/toast.hook';
import { formatCurrencyBRLnocifr } from '../../../utils/formatCurrency';

const Linhas = ({ item }) => {
  return (
    <div className={styles.linha}>
      <div className={`${styles.data} ${styles.tCenter} ${styles.br}`}>{item?.prO_CODIGO}</div>
      <div className={`${styles.data} ${styles.pl1} ${styles.br}`}>{item?.prO_DESCRI}</div>
      <div className={`${styles.data} ${styles.ncm} ${styles.tCenter} ${styles.br}`}>{item?.prO_NCM}</div>
      <div className={`${styles.data} ${styles.pl1} ${styles.br}`}></div>
      <div className={`${styles.data} ${styles.tCenter} ${styles.br}`}>{item?.nF_CFOP}</div>
      <div className={`${styles.data} ${styles.pl1} ${styles.br}`}>{item?.prO_UM}</div>
      <div className={`${styles.data} ${styles.tCenter} ${styles.br}`}>{item?.nF_QUANT},0000</div>
      <div className={`${styles.data} ${styles.tRight} ${styles.br}`}>
        {formatCurrencyBRLnocifr(item?.nF_PRECO)}
      </div>
      <div className={`${styles.data} ${styles.tRight} ${styles.br}`}>
        {formatCurrencyBRLnocifr(item?.nF_VALBRUT)}
      </div>
      <div className={`${styles.data} ${styles.tRight} ${styles.br}`}>
        {formatCurrencyBRLnocifr(item?.nF_BASEICM)}
      </div>
      <div className={`${styles.data} ${styles.tRight} ${styles.br}`}>
        {formatCurrencyBRLnocifr(item?.nF_VALICMS)}
      </div>
      <div className={`${styles.data} ${styles.tCenter} ${styles.br}`}>
        {formatCurrencyBRLnocifr(item?.nF_VALIPI)}
      </div>
      <div className={`${styles.data} ${styles.tRight} ${styles.br}`}>
        {formatCurrencyBRLnocifr(item?.nF_ALQICMS)}
      </div>
      <div className={`${styles.data} ${styles.tRight}`}>
        {Number(item?.nF_ALQIPI).toFixed(2)} %
      </div>
    </div>
  );
};

const NotaFiscalTemplate = () => {
  const { documento } = useParams();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [dados, setDados] = useState({});
  const [barcode, setBarcode] = useState('');
  const [fatura, setFatura] = useState([]);
  const [itens, setItens] = useState([]);

  useEffect(() => {
    buscarNotaFiscalPDF(documento)
      .then((retorno) => {
        setDados(retorno);
        setItens(retorno.produtos);
        setFatura(retorno.fatura);
        setBarcode(
          `https://api.invertexto.com/v1/barcode?token=${import.meta.env.VITE_INVERTEXTO_TOKEN}&text=${retorno.nF_CHAVE}&type=code128&font=0`
        );
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro ao CARREGAR!',
          description: 'Erro ao carregar DADOS da Nota Fiscal, por favor tente novamente dentre de instantes !',
        });
      });
  }, [documento, addToast]);

  return (
    <Box className={styles.container}>
      <Box className={styles.actions}>
        <Button 
          variant="contained" 
          onClick={() => gerarPdf(document.getElementById('nfe'), formatNumeroNfe(dados.nF_NRO))}
          className={styles.pdfButton}
        >
          Gerar PDF
        </Button>
        <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
          Voltar
        </Button>
      </Box>

      <Box id="nfe" className={styles.content}>
        {/* Cabeçalho de Recebimento */}
        <Box className={`${styles.cabecalhoRecebimento} ${styles.b}`}>
          <Box className={styles.quadradoRecebimento}>
            <Box className={styles.textRecebimentoReistar}>
              <Typography variant="body2">
                RECEBEMOS DE REISTAR INDUSTRIA E COMERCIO DE ELETRONICOS LTDA OS
                PRODUTOS CONSTANTES DA NOTA FISCAL INDICADA AO LADO
              </Typography>
            </Box>
            <Box className={styles.textRecebimentoNfe}>
              <Typography variant="body2">NF-e</Typography>
            </Box>
          </Box>
          <Box className={styles.quadradoRecebimento2}>
            <Box className={styles.bt}>
              <Typography variant="body2">DATA DE RECEBIMENTO</Typography>
            </Box>
            <Box className={`${styles.br} ${styles.bl} ${styles.bt}`}>
              <Typography variant="body2">IDENTIFICAÇÃO E ASSINATURA DO RECEBEDOR</Typography>
            </Box>
            <Box className={styles.pl1}>
              <Typography variant="body2">
                N {formatNumeroNfe(dados.nF_NRO)} <br />
                SÉRIE {dados.nF_SERIE}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Cabeçalho Principal */}
        <Box className={`${styles.cabecalho} ${styles.b}`}>
          {/* Dados do Emitente */}
          <Box className={`${styles.quadroDadosEmitente} ${styles.br} ${styles.tLeft} ${styles.flex} ${styles.flexC} ${styles.justifyCenter}`}>
            <Box>
              <Box className={styles.logo}>
                <img className={styles.logoImg} src={logo} alt="logo" />
              </Box>

              <Box className={`${styles.razaoSocialHead} ${styles.mt2}`}>
                <Typography variant="body2" className={styles.razaoSocial}>Identificação do emitente</Typography>
                <Typography variant="body1" className={styles.razaoSocialText}>{dados.amV_RAZAOSOCIAL}</Typography>
              </Box>

              <Box className={`${styles.endereco} ${styles.mt1} ${styles.tLeft} ${styles.mb2}`}>
                <Typography variant="body2" className={styles.logradouro}>{dados.amV_ENDERECO}</Typography>
                <Typography variant="body2" className={styles.bairro}>
                  {dados.amV_BAIRRO}, CEP: {formatCEP(dados.amV_CEP)}
                </Typography>
                <Typography variant="body2" className={styles.municipio}>
                  {dados.amV_MUNICIPIO}, Fone: {dados.amV_FONE}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Descrição DANFE */}
          <Box className={`${styles.quadroDescricaoDanfe} ${styles.br} ${styles.tCenter}`}>
            <Box className={styles.entradaSaida}>
              <Box className={styles.opcoes}>
                <Typography variant="h6" className={styles.danfe}>DANFE</Typography>
                <Typography variant="caption" className={styles.danfeLegenda}>
                  DOCUMENTO AUXILIAR DA NOTA FISCAL ELETRÔNICA
                </Typography>
                <Box className={styles.containerEntradaSaida}>
                  <Box className={styles.entradaSaidaOptions}>
                    <Typography variant="body2"><strong>0 - ENTRADA</strong></Typography>
                    <Typography variant="body2"><strong>1 - SAIDA</strong></Typography>
                  </Box>
                </Box>
                <Typography variant="body1" className={styles.entradaSaidaOpcao}>1</Typography>
              </Box>
            </Box>
            <Box className={styles.numeroNota}>
              <Typography variant="body1" className={styles.numero}>
                Nº {formatNumeroNfe(dados.nF_NRO)}
              </Typography>
              <Typography variant="body2" className={styles.serie}>SÉRIE: {dados.nF_SERIE}</Typography>
              <Typography variant="body2">FOLHA: 1/1</Typography>
            </Box>
          </Box>

          {/* Código de Barras */}
          <Box className={`${styles.quadroCodigoBarrasChave} ${styles.tCenter}`}>
            <Box className={`${styles.codigoBarras} ${styles.flex} ${styles.alignCenter} ${styles.justifyCenter} ${styles.bb}`}>
              <img alt="" src={barcode} className={styles.barcodeImage} />
            </Box>
            <Box className={styles.chaveAcesso}>
              <Typography variant="caption" className={styles.labelDemaisCampos}>chave de acesso </Typography>
              <Typography variant="body1" className={styles.chave}>{dados.nF_CHAVE}</Typography>
            </Box>
            <Box className={`${styles.infosNotaFiscalSite} ${styles.tCenter} ${styles.flex} ${styles.alignCenter} ${styles.justifyCenter} ${styles.bt}`}>
              <Typography variant="caption">
                <strong>
                  Consulta de autenticidade no portal da NF-e
                  www.nfe.fazenda.gov.br/portal ou site da SEFAZ Autorizada
                </strong>
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Natureza da Operação e Protocolo */}
        <Box className={`${styles.quadroCodigoBarrasDados} ${styles.rowH} ${styles.bb} ${styles.bl} ${styles.br}`}>
          <Box className={`${styles.naturezaOperacao} ${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>natureza da operação</Typography>
            <Typography variant="body2" className={styles.definicao}>{dados.nF_NATOPER}</Typography>
          </Box>
          <Box className={`${styles.protocoloAutorizacao} ${styles.quadroFormatacao} ${styles.tCenter}`}>
            <Typography variant="caption" className={styles.label}>PROTOCOLO DE AUTORIZAÇÃO DE USO</Typography>
            <Typography variant="body2" className={styles.definicao}>------</Typography>
          </Box>
        </Box>

        {/* Documentos */}
        <Box className={`${styles.quadroDocumentos} ${styles.rowH} ${styles.bb} ${styles.bl} ${styles.br}`}>
          <Box className={`${styles.inscricaoEstadual} ${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>inscrição estadual</Typography>
            <Typography variant="body2" className={styles.definicao}>{dados.amV_INSC_EST}</Typography>
          </Box>
          <Box className={`${styles.inscricaoEstadual2} ${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>INSC.EST.DO SUBST.TRIBUTÁRIO</Typography>
            <Typography variant="body2" className={styles.definicao}>-----</Typography>
          </Box>
          <Box className={`${styles.cnpj} ${styles.quadroFormatacao}`}>
            <Typography variant="caption" className={styles.label}>cnpj</Typography>
            <Typography variant="body2" className={styles.definicao}>{formatCnpj(dados.amV_CNPJ)}</Typography>
          </Box>
        </Box>

        {/* Destinatário/Remetente */}
        <Box className={styles.grupos}>
          <Typography variant="caption">destinatário/remetente</Typography>
        </Box>
        <Box className={`${styles.quadroDestinatarioRemetente} ${styles.rowH} ${styles.b}`}>
          <Box className={`${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>nome/razão social</Typography>
            <Typography variant="body2" className={styles.definicao}>{dados.clI_NOME}</Typography>
          </Box>
          <Box className={`${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>cnpj/cpf</Typography>
            <Typography variant="body2" className={styles.tCenter}>{formatCnpj(dados.clI_CNPJ)}</Typography>
          </Box>
          <Box className={styles.quadroFormatacao}>
            <Typography variant="caption" className={styles.label}>DATA DE EMISSÃO</Typography>
            <Typography variant="body2" className={styles.tCenter}>{formatDateTotvs(dados.nF_EMISSAO)}</Typography>
          </Box>
        </Box>

        {/* Endereço 1 */}
        <Box className={`${styles.quadroEndereco1} ${styles.rowH} ${styles.bb} ${styles.bl} ${styles.br}`}>
          <Box className={`${styles.logradouro} ${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>endereço</Typography>
            <Typography variant="body2" className={styles.definicao}>{dados.clI_ENDERE}</Typography>
          </Box>
          <Box className={`${styles.bairro} ${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>bairro</Typography>
            <Typography variant="body2" className={styles.bairro}>{dados.clI_BAIRRO}</Typography>
          </Box>
          <Box className={`${styles.cep} ${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>cep</Typography>
            <Typography variant="body2" className={styles.definicao}>{formatCEP(dados.clI_CEP)}</Typography>
          </Box>
          <Box className={`${styles.dataSaida} ${styles.quadroFormatacao}`}>
            <Typography variant="caption" className={styles.label}>data saída/entrada</Typography>
            <Typography variant="body2" className={styles.tCenter}>{formatDateTotvs(dados.nF_ENTREGA)} ---</Typography>
          </Box>
        </Box>

        {/* Endereço 2 */}
        <Box className={`${styles.quadroEndereco2} ${styles.rowH} ${styles.bb} ${styles.bl} ${styles.br}`}>
          <Box className={`${styles.municipio} ${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>municipio</Typography>
            <Typography variant="body2" className={styles.definicao}>{dados.clI_MUNIC}</Typography>
          </Box>
          <Box className={`${styles.fone} ${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>fone/fax</Typography>
            <Typography variant="body2" className={styles.definicao}>{dados.clI_TEL}</Typography>
          </Box>
          <Box className={`${styles.uf} ${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>uf</Typography>
            <Typography variant="body2" className={styles.definicao}>{dados.clI_UF}</Typography>
          </Box>
          <Box className={`${styles.inscricaoEstadual} ${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>inscricao estadual</Typography>
            <Typography variant="body2" className={styles.definicao}>{dados.clI_INSC_EST}</Typography>
          </Box>
          <Box className={`${styles.horaSaida} ${styles.quadroFormatacao}`}>
            <Typography variant="caption" className={styles.label}>hora de saída</Typography>
            <Typography variant="body2" className={styles.tCenter}>{dados.horaEmissao}</Typography>
          </Box>
        </Box>

        {/* Fatura */}
        <Box className={styles.grupos}>
          <Typography variant="caption">fatura</Typography>
        </Box>
        <Box className={`${styles.quadroFaturaDuplicata} ${styles.rowH} ${styles.b}`}>
          {fatura.map((item, index) => (
            <Box key={index} className={`${styles.br} ${styles.faturaBloco}`}>
              <Typography variant="body2">{item.faT_PARCELA}</Typography>
              <Typography variant="body2">{item.faT_VALOR}</Typography>
              <Typography variant="body2">{item.faT_VENCTO}</Typography>
            </Box>
          ))}
        </Box>

        {/* Cálculo do Imposto */}
        <Box className={styles.grupos}>
          <Typography variant="caption">cálculo do imposto</Typography>
        </Box>
        <Box className={`${styles.quadroCalculoImpostos} ${styles.rowH} ${styles.tamanhoQuadros} ${styles.b}`}>
          <Box className={`${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>BASE DE CÁLCULO DO ICMS</Typography>
            <Typography variant="body2" className={styles.tRight}>
              {formatCurrencyBRLnocifr(dados.nF_BASEICM)}
            </Typography>
          </Box>
          <Box className={`${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>VALOR DO ICMS</Typography>
            <Typography variant="body2" className={styles.tRight}>
              {formatCurrencyBRLnocifr(dados.nF_VALICMS)}
            </Typography>
          </Box>
          <Box className={`${styles.BCIMSSUB} ${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>
              BASE DE CÁLCULO DO ICMS SUBSTITUIÇÃO
            </Typography>
            <Typography variant="body2" className={styles.textSub}>
              {formatCurrencyBRLnocifr(dados.nF_BRICMS)}
            </Typography>
          </Box>
          <Box className={`${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>VALOR DO ICMS SUBSTITUIÇÃO</Typography>
            <Typography variant="body2" className={styles.tRight}>
              {formatCurrencyBRLnocifr(dados.nF_ICMSRET)}
            </Typography>
          </Box>
          <Box className={styles.quadroFormatacao}>
            <Typography variant="caption" className={styles.label}>VALOR TOTAL DOS PRODUTOS</Typography>
            <Typography variant="body2" className={styles.tRight}>
              {formatCurrencyBRLnocifr(dados.nF_TOTITEM)}
            </Typography>
          </Box>
        </Box>

        {/* Frete */}
        <Box className={`${styles.quadroFrete} ${styles.tamanhoQuadros} ${styles.rowH} ${styles.bb} ${styles.bl} ${styles.br}`}>
          <Box className={`${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>VALOR DO FRETE</Typography>
            <Typography variant="body2" className={styles.tRight}>
              {formatCurrencyBRLnocifr(dados.nF_VALFRET)}
            </Typography>
          </Box>
          <Box className={`${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>VALOR DO seguro</Typography>
            <Typography variant="body2" className={styles.tRight}>
              {formatCurrencyBRLnocifr(dados.nF_SEGURO)}
            </Typography>
          </Box>
          <Box className={`${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>desconto</Typography>
            <Typography variant="body2" className={styles.tRight}>
              {formatCurrencyBRLnocifr(dados.nF_DESCONTO)}
            </Typography>
          </Box>
          <Box className={`${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>outras despesas acessórias</Typography>
            <Typography variant="body2" className={styles.tRight}>
              {formatCurrencyBRLnocifr(dados.nF_DESPESA)}
            </Typography>
          </Box>
          <Box className={`${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>VALOR DO ipi</Typography>
            <Typography variant="body2" className={styles.tRight}>
              {formatCurrencyBRLnocifr(dados.nF_VALIPI)}
            </Typography>
          </Box>
          <Box className={styles.quadroFormatacao}>
            <Typography variant="caption" className={styles.label}>VALOR total da nota</Typography>
            <Typography variant="body2" className={styles.tRight}>
              {formatCurrencyBRLnocifr(dados.nF_VALBRUT)}
            </Typography>
          </Box>
        </Box>

        {/* Transportador */}
        <Box className={styles.grupos}>
          <Typography variant="caption">transportador/volumes transportados</Typography>
        </Box>
        <Box className={`${styles.quadroTransportador} ${styles.rowH} ${styles.tamanhoQuadros} ${styles.b}`}>
          <Box className={`${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>razão social</Typography>
            <Typography variant="body2" className={styles.definicao}>{dados.transP_RZSOCIAL}</Typography>
          </Box>
          <Box className={`${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>FRETE POR CONTA</Typography>
            <Typography variant="body2" className={styles.definicao}>{dados.transP_FERPORCONTA}</Typography>
          </Box>
          <Box className={`${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>código ant</Typography>
            <Typography variant="body2" className={styles.definicao}>{dados.transP_ANTT}</Typography>
          </Box>
          <Box className={`${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>placa do veículo</Typography>
            <Typography variant="body2" className={styles.definicao}>{dados.transP_PLACA}</Typography>
          </Box>
          <Box className={`${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>uf</Typography>
            <Typography variant="body2" className={styles.definicao}>{dados.transP_ESTADO}</Typography>
          </Box>
          <Box className={styles.quadroFormatacao}>
            <Typography variant="caption" className={styles.label}>cpf/cnpj</Typography>
            <Typography variant="body2">{formatCnpj(dados.transP_CNPJ)}</Typography>
          </Box>
        </Box>

        {/* Endereço Transportadora */}
        <Box className={`${styles.quadroEndTransportadora} ${styles.rowH} ${styles.tamanhoQuadros} ${styles.br} ${styles.bl} ${styles.bb}`}>
          <Box className={`${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>endereço</Typography>
            <Typography variant="body2" className={styles.definicao}>{dados.transP_ENDERECO}</Typography>
          </Box>
          <Box className={`${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>municipio</Typography>
            <Typography variant="body2" className={styles.definicao}>{dados.transP_MUNICIPIO}</Typography>
          </Box>
          <Box className={`${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>uf</Typography>
            <Typography variant="body2" className={styles.definicao}>{dados.transP_ESTADO}</Typography>
          </Box>
          <Box className={styles.quadroFormatacao}>
            <Typography variant="caption" className={styles.label}>inscrição estadual</Typography>
            <Typography variant="body2" className={styles.definicao}>{dados.transP_INCEST}</Typography>
          </Box>
        </Box>

        {/* Peso e Medidas */}
        <Box className={`${styles.quadroPesoMedidas} ${styles.rowH} ${styles.tamanhoQuadros} ${styles.br} ${styles.bl} ${styles.bb}`}>
          <Box className={`${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>quantidade</Typography>
            <Typography variant="body2" className={styles.definicao}>{dados.transP_VOLUME1}</Typography>
          </Box>
          <Box className={`${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>espécie</Typography>
            <Typography variant="body2" className={styles.definicao}>{dados.transP_ESPECI1}</Typography>
          </Box>
          <Box className={`${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>marca</Typography>
            <Typography variant="body2" className={styles.definicao}>{dados.transP_MARCA}</Typography>
          </Box>
          <Box className={`${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>numeração</Typography>
            <Typography variant="body2" className={styles.definicao}>{dados.transP_NUMERACAO}</Typography>
          </Box>
          <Box className={`${styles.quadroFormatacao} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>peso bruto</Typography>
            <Typography variant="body2" className={styles.definicao}>
              {Number(dados.transP_PESOBRUTO).toFixed(2) + '0'}
            </Typography>
          </Box>
          <Box className={styles.quadroFormatacao}>
            <Typography variant="caption" className={styles.label}>peso liquido</Typography>
            <Typography variant="body2" className={styles.definicao}>
              {Number(dados.transP_PESOLIQUIDO).toFixed(2) + '0'}
            </Typography>
          </Box>
        </Box>

        {/* Produtos */}
        <Box className={styles.grupos}>
          <Typography variant="caption">dados do produto/serviços</Typography>
        </Box>
        <Box className={`${styles.tabelaProdutos} ${styles.b}`}>
          <Box className={styles.tabela}>
            <Box className={`${styles.head} ${styles.tCenter} ${styles.bb}`}>
              <Box className={`${styles.br} ${styles.flex} ${styles.alignCenter} ${styles.justifyCenter}`}>
                <Typography variant="caption"><b>CÓDIGO PRODUTO</b></Typography>
              </Box>
              <Box className={`${styles.br} ${styles.flex} ${styles.alignCenter} ${styles.justifyCenter}`}>
                <Typography variant="caption"><b>DESCRIÇÃO DO PRODUTO/SERVIÇO</b></Typography>
              </Box>
              <Box className={`${styles.br} ${styles.flex} ${styles.alignCenter} ${styles.justifyCenter}`}>
                <Typography variant="caption"><b>NCM/SH</b></Typography>
              </Box>
              <Box className={`${styles.br} ${styles.flex} ${styles.alignCenter} ${styles.justifyCenter}`}>
                <Typography variant="caption"><b>CST</b></Typography>
              </Box>
              <Box className={`${styles.br} ${styles.flex} ${styles.alignCenter} ${styles.justifyCenter}`}>
                <Typography variant="caption"><b>CFOP</b></Typography>
              </Box>
              <Box className={`${styles.br} ${styles.flex} ${styles.alignCenter} ${styles.justifyCenter}`}>
                <Typography variant="caption"><b>UN</b></Typography>
              </Box>
              <Box className={`${styles.br} ${styles.flex} ${styles.alignCenter} ${styles.justifyCenter}`}>
                <Typography variant="caption"><b>QUANT.</b></Typography>
              </Box>
              <Box className={`${styles.br} ${styles.flex} ${styles.alignCenter} ${styles.justifyCenter}`}>
                <Typography variant="caption"><b>V.UNITÁRIO</b></Typography>
              </Box>
              <Box className={`${styles.br} ${styles.flex} ${styles.alignCenter} ${styles.justifyCenter}`}>
                <Typography variant="caption"><b>V.TOTAL</b></Typography>
              </Box>
              <Box className={`${styles.br} ${styles.flex} ${styles.alignCenter} ${styles.justifyCenter}`}>
                <Typography variant="caption"><b>BC.ICMS</b></Typography>
              </Box>
              <Box className={`${styles.br} ${styles.flex} ${styles.alignCenter} ${styles.justifyCenter}`}>
                <Typography variant="caption"><b>V.ICMS</b></Typography>
              </Box>
              <Box className={`${styles.br} ${styles.flex} ${styles.alignCenter} ${styles.justifyCenter}`}>
                <Typography variant="caption"><b>V.IPI</b></Typography>
              </Box>
              <Box className={`${styles.br} ${styles.flex} ${styles.alignCenter} ${styles.justifyCenter}`}>
                <Typography variant="caption"><b>A.ICMS</b></Typography>
              </Box>
              <Box className={`${styles.flex} ${styles.alignCenter} ${styles.justifyCenter}`}>
                <Typography variant="caption"><b>A.IPI</b></Typography>
              </Box>
            </Box>
            <Box className={styles.body}>
              {itens.map((item, i) => (
                <Linhas key={i} item={item} />
              ))}
            </Box>
          </Box>
        </Box>

        {/* ISSQN */}
        <Box className={styles.grupos}>
          <Typography variant="caption">CÁLCULO DO ISSQN</Typography>
        </Box>
        <Box className={`${styles.quadroFaturaDuplicata2} ${styles.rowH} ${styles.b}`}>
          <Box className={`${styles.br} ${styles.flex} ${styles.justifyBetween}`}>
            <Typography variant="caption" className={styles.label}>Inscrição municipal</Typography>
          </Box>
          <Box className={styles.br}>
            <Typography variant="caption" className={styles.label}>Valor total dos serviços</Typography>
          </Box>
          <Box className={styles.br}>
            <Typography variant="caption" className={styles.label}>base de cálculo do ISSQN</Typography>
          </Box>
          <Box>
            <Typography variant="caption" className={styles.label}>Valor do ISSQN</Typography>
          </Box>
        </Box>

        {/* Dados Adicionais */}
        <Box className={styles.grupos}>
          <Typography variant="caption">dados adicionais</Typography>
        </Box>
        <Box className={`${styles.quadroDadosAdicionais} ${styles.b}`}>
          <Box className={`${styles.quadroFormatacaoTexto} ${styles.br}`}>
            <Typography variant="caption" className={styles.label}>informaçôes complementares</Typography>
            <Typography variant="body2" className={`${styles.definicao} ${styles.ft5}`}></Typography>
          </Box>
          <Box className={styles.quadroFormatacaoTexto}>
            <Typography variant="caption" className={styles.label}>reservado ao fisco</Typography>
            <Typography variant="body2" className={styles.definicao}></Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NotaFiscalTemplate;