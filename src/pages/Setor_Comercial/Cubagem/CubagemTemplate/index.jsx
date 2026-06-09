import React from 'react';

import './style.css';
import logoAmvox from '@/assets/amvoxlogomarca.png';
import { useState } from 'react';

import { gerarPdf } from '@/utils/gerarPdf';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';

import { Box, Modal, Button } from '@mui/material';
import { formatCurrencyBRLnocifr } from '@/utils/formatCurrency';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  height: '95vh',
  bgcolor: 'background.paper',
  border: '1px solid #333333',
  borderRadius: '16px',
  boxShadow: 10,
  justifyContent: 'center',
  alignItems: 'center',
  p: 4,
  overflowY: 'auto',
  overflowX: 'auto',
  '@media (max-width: 770px)': {
    width: '80%',
  },
};

const CubagemTemplate = ({ data, isSearched }) => {
  const [dados, setDados] = useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const { nome, email } = useUsuarioLocal();

  const handleClose = () => {
    setOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        sx={{ flex: '0 1 350px', height: '42px' }}
        disabled={!isSearched}
        onClick={handleOpen}
      >
        Visualizar Impressão
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflow: 'auto' }}
      >
        <Box sx={style}>
          <Box
            display={'flex'}
            flexDirection={'row'}
            gap={4}
            marginTop={'30px'}
            sx={{ '@media (max-width: 770px)': { flexDirection: 'column' } }}
          >
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={() => {
                gerarPdf(
                  document.getElementById('nota'),
                  'Cubagem- Nº ' + data.numeroPedido
                );
              }}
              style={{
                width: '100%',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              {' '}
              Baixar Cubagem(PDF){' '}
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                handlePrint();
              }}
              style={{
                width: '100%',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              Imprimir
            </Button>
            <Button
              size="small"
              onClick={handleClose}
              variant="contained"
              color="success"
              style={{
                width: '100%',
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
                    <td
                      colSpan="3"
                      className="txt-center font-12 valign-middle"
                    >
                      REISTAR INDÚSTRIA E COMÉRCIO DE ELETRÔNICOS LTDA
                      <img className="amvox_logo" src={logoAmvox} alt="Amvox" />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '100cm' }} className="txt-center">
                      <span className="title">
                        RELATÓRIO GERAL DE CUBAGEM{' '}
                        {new Date().toLocaleDateString('pt-BR')} - Nº Pedido{' '}
                        {''}
                        {data.numeroPedido}
                        <span
                          className="title txt-upper"
                          style={{ padding: '5px', fontWeight: 'bold' }}
                        ></span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="txt-center">
                      <span className="title">Responsável: {nome}</span>
                      <span className="title"> | E-mail: {email}</span>
                    </td>
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
                    <td colSpan={2}>Endereço: {data.endereco}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>CNPJ/CGC: {data.cnpj}</td>
                  </tr>
                  <tr>
                    <td>Peso Liquido: {data.pesoLiquido}</td>
                    <td>Peso Bruto: {data.pesoBruto}</td>
                  </tr>
                  <tr>
                    <td>Cubagem: {data.cubagem}</td>
                    <td>Volume: {data.quantidadeVolumes}</td>
                  </tr>
                  <tr>
                    <td>
                      Valor NF Sem Impostos:{' '}
                      {formatCurrencyBRLnocifr(
                        data.totalValrPedidoSemImpostos?.toFixed(2)
                      )}
                    </td>
                    <td>
                      Valor NF Com Impostos:{' '}
                      {formatCurrencyBRLnocifr(data.totalValorPedidocomImposto)}
                    </td>
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
                  <tr>
                    <th colSpan={1}>Modelo</th>
                    <th>T.Peso Bruto</th>
                    <th>T.Peso Liq.</th>
                    <th>Qtde Vol.</th>
                    <th>Qtde Pçs.</th>
                    <th>Tot Frete.</th>
                    <th>T.Cubagem</th>
                    <th style={{ textAlign: 'center' }}>T.R$</th>
                  </tr>
                  {data.produtos?.map((item, i) => (
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
                        {formatCurrencyBRLnocifr(
                          item.valorSemImpostos?.toFixed(2)
                        )}
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
                    <td style={{ textAlign: 'center' }}>{data.pesoBruto}</td>
                    <td style={{ textAlign: 'center' }}>{data.pesoLiquido}</td>
                    <td style={{ textAlign: 'center' }}>
                      {data.produtos?.reduce(
                        (acc, curr) => acc + curr.quantidadeVolumes,
                        0
                      )}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {data.produtos?.reduce(
                        (acc, curr) => acc + curr.quantidadePecas,
                        0
                      )}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {formatCurrencyBRLnocifr(
                        data.produtos
                          ?.reduce((acc, curr) => acc + curr.frete, 0)
                          .toFixed(2)
                      )}
                    </td>
                    <td style={{ textAlign: 'center' }}>{data.cubagem}</td>
                    <td style={{ textAlign: 'center' }}>
                      {formatCurrencyBRLnocifr(data.totalValrPedidoSemImpostos)}
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
                      {formatCurrencyBRLnocifr(data.totalValrPedidoSemImpostos)}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {formatCurrencyBRLnocifr(data.totalValorPedidocomImposto)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <table>
                <thead>
                  <th style={{ textAlign: 'center' }}>Programado</th>
                  <th style={{ textAlign: 'center' }}>Re-despacho</th>
                  <th style={{ textAlign: 'center' }}>Venda Ordem</th>
                  <th style={{ textAlign: 'center' }}>Suframa</th>
                  <th style={{ textAlign: 'center' }}>Agendado</th>
                  <th style={{ textAlign: 'center' }}>Paletizado</th>
                  <th style={{ textAlign: 'center' }}>Bonificado</th>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: 'center' }}>
                      {data.programado || 'Não'}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {data.despacho || 'Não'}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {data.vendaOrdem || 'Não'}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {data.suframa ? 'Sim' : 'Não'}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {data.agendado ? 'Sim' : 'Não'}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {data.paletizado ? 'Sim' : 'Não'}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {data.bonificado ? 'Sim' : 'Não'}
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
        </Box>
      </Modal>
    </div>
  );
};
export default CubagemTemplate;
