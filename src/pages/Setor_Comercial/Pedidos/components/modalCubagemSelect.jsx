import React, { useEffect, useState } from 'react';
import './style.css';

import logoAmvox from '@/assets/amvoxlogomarca.png';

import formatDateTotvs from '@/utils/formatDataTotvs';
import { formatCurrencyBRLnocifr } from '@/utils/formatCurrency';

import axios from 'axios';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

import planetinha from '@/assets/planetinha.png';

import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

import CloseIcon from '@mui/icons-material/Close';

import AtualizaCubagem from './modalAtualizaCubagem';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  height: '80%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'scroll',
};

const interfaceEnvioJson = {
  numeroPedido: '',
  quantidades: [
    {
      codigoProduto: '',
      quantidade: 0,
      item: '',
    },
  ],
};

const interfaceProdutos = [
  {
    codigo: '',
    descricao: '',
    item: '',
    local: '',
    quantidade: '',
    quantidadeEntregue: 0,
    valorTotal: 0,
    valorUnitario: 0,
  },
];

const interfaceLista = {
  cliente: '',
  cnpj: '',
  cubagem: false,
  data: '',
  numeroPedido: '',
  produtos: interfaceProdutos,
  valor: 0,
};

const interfaceProdutosCubagem = {
  codigo: '',
  descricaoProduto: '',
  quantidadePecasVendidas: 0,
  item: 0,
  quantidadePecasRestantes: 0,
  quantidadePecasEntregues: 0,
  cubagem: 0,
  pesoBruto: 0,
  pesoLiquido: 0,
  quantidadeVolumes: 0,
  quantidadePecas: 0,
  frete: 0,
  valor: 0,
  ipi: 0,
  valorTotal: 0,
  valorCIcms: 0,
  quantidadePecasTotais: 0,
};

const interfaceCubagem = {
  numeroPedido: '',
  cubagem: 0,
  produtos: [interfaceProdutosCubagem],
  endereco: null,
  quantidadeVolumes: 0,
  email: null,
  pesoBruto: 0,
  pesoLiquido: 0,
  cnpj: null,
  dataCarregamento: null,
  valor: 0,
  dataEntrega: null,
  totalValorPedido: 0,
  totalValorPedidocomImposto: 0,
};

export default function ModalCubagemSelect({ lista }) {
  const [open, setOpen] = React.useState(false);
  const [openCubagem, setOpenCubagem] = React.useState(false);
  const [objEnvio, setObjEnvio] = React.useState(interfaceEnvioJson);
  const [cubagem, setCubagem] = React.useState(interfaceCubagem);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseCubagem = () => setOpenCubagem(false);
  const [orderData, setOrderData] = useState(interfaceLista);

  const subRowProps = lista.row;

  useEffect(() => {
    setOrderData(lista.row);
  }, [lista]);

  useEffect(() => {
    formatObj();
  }, [open]);

  const formatObj = () => {
    const produtos = [];
    orderData.produtos.forEach((element) => {
      let objArray = {
        codigoProduto: element.codigo,
        quantidade: element.quantidade,
        item: element.item,
      };
      produtos.push(objArray);
    });
    setObjEnvio({
      ...objEnvio,
      numeroPedido: orderData.numeroPedido,
      quantidades: produtos,
    });
  };

  const handleSubmit = async (e) => {
    try {
      const response = await axios
        .post(
          `${import.meta.env.VITE_API_FABRICADEV}/Pedidos/CubagemParcial`,
          objEnvio
        )
        .then((r) => {
          setCubagem(r.data)
        });
    } catch (error) {
      console.error('deu ruim');
    }
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        startIcon={<img src={planetinha} width="35px" height="35px" />}
      >
        Cubagem
      </Button>

      <Modal open={openCubagem} onClose={handleCloseCubagem}>
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
                      {subRowProps.numeroPedido}
                      <span
                        className="title txt-upper"
                        style={{ padding: '5px', fontWeight: 'bold' }}
                      ></span>
                    </span>
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
                  <td colSpan={2}>Endereço: {cubagem.endereco}</td>
                </tr>
                <tr>
                  <td colSpan={2}>CNPJ/CGC: {cubagem.cnpj}</td>
                </tr>
                <tr>
                  <td>Peso Bruto: {cubagem.pesoBruto}</td>
                </tr>
                <tr>
                  <td>Cubagem: {cubagem.cubagem}</td>
                  <td>
                  Total Valor do Pedido:{' '}
                    {formatCurrencyBRLnocifr(
                      cubagem.totalValorPedido?.toFixed(2)
                    )}
                  </td>
                  <td>
                  Total Valor do Pedido com Imposto:{' '}
                    {formatCurrencyBRLnocifr(
                      cubagem.totalValorPedidocomImposto?.toFixed(2)
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    Carregamento:{' '}
                    {formatDateTotvs(cubagem.dataCarregamento)}
                  </td>
                  <td>
                    Entrega/Agenda: {formatDateTotvs(cubagem.dataEntrega)}
                  </td>
                </tr>
              </tbody>
            </table>

            <hr />
            <table>
              {cubagem.produtos?.length > 0 && (
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
                {cubagem.produtos?.map((item, i) => (
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
                {/* <tr>
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
                    {subRowProps.pesoBruto?.toFixed(3)}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {subRowProps.pesoLiquido?.toFixed(3)}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {subRowProps.produtos?.reduce(
                      (acc, curr) => acc + curr.quantidadeVolumes,
                      0
                    )}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {subRowProps.produtos?.reduce(
                      (acc, curr) => acc + curr.quantidadePecas,
                      0
                    )}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {formatCurrencyBRLnocifr(
                      subRowProps.produtos
                        ?.reduce((acc, curr) => acc + curr.frete, 0)
                        .toFixed(2)
                    )}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {subRowProps.cubagem?.toFixed(5)}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {formatCurrencyBRLnocifr(
                      subRowProps.totalValorPedido?.toFixed(2)
                    )}
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
                    {formatCurrencyBRLnocifr(
                      subRowProps.totalValorPedido?.toFixed(2)
                    )}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {formatCurrencyBRLnocifr(
                      subRowProps.totalValorPedidocomImposto?.toFixed(2)
                    )}
                  </td>
                </tr> */}
              </tbody>
            </table>
            <p className="text-center title pt-2">
              Obs:* VALOR TOTAL COM IMPOSTOS NÃO SE APLICA A CELULARES E
              AUTO-RADIO
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        open={open}
        onClose={handleClose}
        disableScrollLock={false}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              justifyContent: 'center',
              alignContent: 'center',
              display: 'flex',
            }}
          >
            <Typography id="modal-modal-title" variant="h5" component="h1">
              Cubagem Parcial
            </Typography>
          </Box>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            mt={2}
            mb={2}
            fontWeight={'bold'}
            sx={{ flexDirection: 'row', display: 'flex' }}
          >
            Nº Pedido:{' '}
            <Box sx={{ color: 'red', ml: 1 }}>{lista.row.numeroPedido}</Box>
          </Typography>
          <Table size="small" aria-label="purchases">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}></TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Código</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Descrição</TableCell>
                <TableCell style={{ fontWeight: 'bold' }} align="right">
                  Quant.
                </TableCell>
                <TableCell style={{ fontWeight: 'bold' }} align="right">
                  Item
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subRowProps.produtos.map((prods) => (
                <TableRow key={prods.codigo}>
                  <TableCell component="th" scope="row" align="flex-start">
                    <Button variant="outlined" color="error">
                      <CloseIcon sx={{ color: 'red' }} />
                    </Button>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {prods.codigo}
                  </TableCell>
                  <TableCell>{prods.descricao}</TableCell>
                  <TableCell align="right">
                    <AtualizaCubagem cubagem={prods}>
                      <Box>{prods.quantidade}</Box>
                    </AtualizaCubagem>
                  </TableCell>
                  <TableCell align="right">{prods.item}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box sx={{ display: 'flex', gap: 2, paddingY: 1, mt: 2 }} fullWidth>
            <Button
              variant="contained"
              color="success"
              endIcon={<SendIcon />}
              fullWidth
              onClick={() => {
                handleSubmit();
                setTimeout(() => {
                  setOpenCubagem(!openCubagem);
                }, 1500);
              }}
            >
              Enviar
            </Button>
            <Button
              variant="outlined"
              color="error"
              endIcon={<DeleteIcon />}
              fullWidth
              type="reset"
              onClick={handleClose}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
