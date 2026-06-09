import { useNavigate, useParams } from 'react-router';
import './style.css';
import logoAmvox from '../../../assets/amvoxlogomarca.png';
import { useEffect, useState } from 'react';
import { consultaContainerNota } from '../../../services/recebimentoPermanenciaContainer.service';
import formatDateTotvs from '../../../utils/formatDataTotvs';
import { gerarPdf } from '../../../utils/gerarPdf';
import { Button } from '@mui/material';
import { formatNumeroNfe } from '../../../utils/formatNfeNumero';
import { useToast } from '../../../hooks/toast.hook';
import { buscarPedidoImpressaoCubagem } from '../../../pages/Setor_Comercial/Pedidos/pedidos.service';
import { Box } from '@mui/material';
import { formatCurrencyBRLnocifr } from '../../../utils/formatCurrency';

const ControleCubagemTemplate = () => {
  const { documento } = useParams();
  const navigate = useNavigate();

  const { addToast } = useToast();

  const [dados, setDados] = useState({});

  useEffect(() => {
    buscarPedidoImpressaoCubagem(documento)
      .then((retorno) => {
        setDados(retorno.pedidosCubagemResponse);
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Não identificado',
          description: 'Não há cubagem disponível para essa nota!',
        });
      });
  }, [documento]);

  return (
    <>
      <Box display={'flex'} flexDirection={'row'} gap={4} marginTop={'30px'}>
        <Button
          onClick={() =>
            gerarPdf(
              document.getElementById('nota'),
              'Cubagem- Nº ' + dados.numeroPedido
            )
          }
          variant="contained"
          style={{
            width: '50%',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          {' '}
          Baixar Cubagem (PDF){' '}
        </Button>
        <Button
          onClick={() => navigate(-1)}
          variant="contained"
          style={{
            width: '50%',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          {' '}
          Voltar{' '}
        </Button>
      </Box>
      <div id="nota" className="page notaArea">
        <div className="boxFields" style={{ paddingTop: '20px' }}>
          <table cellPadding="0" cellSpacing="0" border="1">
            <tbody>
              <tr>
                <td colSpan="3" className="txt-center font-12 valign-middle">
                  REISTAR INDÚSTRIA E COMÉRCIO DE ELETRÔNICOS LTDA
                  <img className="amvox_logo" src={logoAmvox} alt="Amvox" />
                </td>
              </tr>
              <tr>
                <td style={{ width: '100cm' }} className="txt-center">
                  <span className="title">
                    RELATÓRIO GERAL DE CUBAGEM{' '}
                    {new Date().toLocaleDateString('pt-BR')} - Nº Pedido {''}
                    {dados.numeroPedido}
                    <span
                      className="title txt-upper"
                      style={{ padding: '5px', fontWeight: 'bold' }}
                    ></span>
                  </span>
                </td>
                {/* <td rowSpan="2" className="tserie txt-center">
                </td> */}
              </tr>
            </tbody>
          </table>
          <hr />

          <table>
            <tbody>
              <tr>
                <th colSpan={2} className="text-center">
                  DESTINO
                </th>
              </tr>
              <tr>
                <td colSpan={2}>Endereço: {dados.endereco}</td>
              </tr>
              <tr>
                <td colSpan={2}>CNPJ/CGC: {dados.cnpj}</td>
              </tr>
              <tr>
                <td>Volume: {dados.quantidadeVolumes}</td>
                <td>Peso Bruto: {dados.pesoBruto}</td>
              </tr>
              <tr>
                <td>Cubagem: {dados.cubagem}</td>
                <td>
                  Valor NF:{' '}
                  {formatCurrencyBRLnocifr(dados.totalValorNF?.toFixed(2))}
                </td>
              </tr>
              <tr>
                <td>Carregamento: {formatDateTotvs(dados.dataCarregamento)}</td>
                <td>Entrega/Agenda: {formatDateTotvs(dados.dataEntrega)}</td>
              </tr>
            </tbody>
          </table>

          <hr />
          <table>
            {dados.produtos?.length > 0 && (
              <thead>
                <th>Modelo</th>
                <th>Peso Bruto</th>
                <th>Peso Liq.</th>
                <th>Qtde Vol.</th>
                <th>Qtde pçs.</th>
                <th>Frete</th>
                <th>Cubagem</th>
                <th style={{ textAlign: 'center' }}>R$</th>
              </thead>
            )}
            <tbody>
              {dados.produtos?.map((item, i) => (
                <tr key={i}>
                  <td>{item.descricaoProduto}</td>
                  <td style={{ textAlign: 'center' }}>
                    {item.pesoBruto?.toFixed(3)}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {item.pesoLiquido?.toFixed(3)}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {item.quantidadeVolumes}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {item.quantidadePecas}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {formatCurrencyBRLnocifr(item.frete?.toFixed(3))}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {item.cubagem?.toFixed(6)}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {formatCurrencyBRLnocifr(item.valorTotal?.toFixed(2))}
                  </td>
                </tr>
              ))}
              <tr>
                <th colSpan={1}></th>
                <th>T.Peso Bruto</th>
                <th>T.Peso Liq.</th>
                <th>Qtde Vol.</th>
                <th>Qtde Pçs.</th>
                <th>Tot Frete.</th>
                <th>T.Cubagem</th>
                <th style={{ textAlign: 'center' }}>T.R$</th>
              </tr>
              <tr>
                <td colSpan={1}></td>
                <td style={{ textAlign: 'center' }}>
                  {dados.pesoBruto?.toFixed(3)}
                </td>
                <td style={{ textAlign: 'center' }}>
                  {dados.pesoLiquido?.toFixed(3)}
                </td>
                <td style={{ textAlign: 'center' }}>
                  {dados.produtos?.reduce(
                    (acc, curr) => acc + curr.quantidadeVolumes,
                    0
                  )}
                </td>
                <td style={{ textAlign: 'center' }}>
                  {dados.produtos?.reduce(
                    (acc, curr) => acc + curr.quantidadePecas,
                    0
                  )}
                </td>
                <td style={{ textAlign: 'center' }}>
                  {formatCurrencyBRLnocifr(
                    dados.produtos
                      ?.reduce((acc, curr) => acc + curr.frete, 0)
                      .toFixed(2)
                  )}
                </td>
                <td style={{ textAlign: 'center' }}>
                  {dados.cubagem?.toFixed(5)}
                </td>
                <td style={{ textAlign: 'center' }}>
                  {formatCurrencyBRLnocifr(dados.totalValorPedido?.toFixed(2))}
                </td>
              </tr>
              <tr>
                <th colSpan={6}></th>
                <th>TT S/Imp</th>
                <th>TT C/Imp</th>
              </tr>
              <tr>
                <td colSpan={6}></td>
                <td style={{ textAlign: 'center' }}>
                  {formatCurrencyBRLnocifr(dados.totalValorPedido?.toFixed(2))}
                </td>
                <td style={{ textAlign: 'center' }}>
                  {formatCurrencyBRLnocifr(
                    dados.totalValorPedidocomImposto?.toFixed(2)
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <p className="text-center title pt-2">
            Obs:* VALOR TOTAL COM IMPOSTOS NÃO SE APLICA A CELULARES E
            AUTO-RADIO
          </p>
        </div>
      </div>
    </>
  );
};
export default ControleCubagemTemplate;
