import { Box } from '@mui/joy';
import {
  InputLabel,
  Modal,
  OutlinedInput,
  TextField,
  FormLabel,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ButtonCloseModal from '../../../../components/ButtonCloseModal';

import useUsuarioLocal from '../../../../hooks/usuarioLocal.hook';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './styles.css';
import TabelaTitulosEmAberto from '../TabelaTitulosEmAberto';
import TabelaFaturamento from '../TabelaFaturamento';
import moment from 'moment';
import { Button } from '@mui/material';
import debounce from '../../../../utils/debounce';
import CircularProgress from '@mui/material/CircularProgress';
import { useDebounce } from '@/hooks/debounce.hook';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  backgroundColor: 'white',
  borderRadius: '30px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexWrap: 'wrap',
  border: '2px solid grey',
  justifyContent: 'center',
};

export default function ModalVisualizacao({
  open,
  onClose,
  dataVisualizacao,
  dataFaturamento,
  dataTitulosEmAberto,
  dataContato,
  dataGeral,
  setFiltroTitulosEmAberto,
  setFiltroFaturamento,
  filtroTitulosEmAberto,
  filtroFaturamento,
  handleClear,
  loading,
  loading2,
  formatCurrencyBRL,
}) {
  const [obj, setObj] = useState();
  const { id } = useUsuarioLocal();
  const [selecionado, setSelecionado] = useState('titulosEmAberto');

  const handleChangeSelect = (event, novaSelecao) => {
    setSelecionado(novaSelecao);
  };

  const formatPhoneNumber = (phone) => {
    if (!phone) return '';

    const cleaned = phone.toString().replace(/\D/g, '');

    if (cleaned.length === 10) {
      return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    } else if (cleaned.length === 11) {
      return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }

    return phone;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setObj((prevData) => ({
      ...prevData,
      [name]: value,
      idUsuario: id,
    }));
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{
        style: {
          backdropFilter: 'blur(0.9px)',
          backgroundColor: 'rgba(0, 0, 0, 0)',
        },
      }}
    >
      <Box
        sx={(theme) => ({
          ...style,
          maxHeight: '80vh',
          overflowY: 'auto',
          [theme.breakpoints.down(1340)]: {
            width: '1000px',
          },
          [theme.breakpoints.down(1040)]: {
            width: '800px',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': {
              width: '2px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '10px',
            },
          },
          [theme.breakpoints.down(920)]: {
            width: '600px',
          },
          [theme.breakpoints.down(700)]: {
            width: '400px',
          },
          [theme.breakpoints.down(500)]: {
            width: '300px',
          },
        })}
      >
        <ButtonCloseModal onClick={() => onClose()} />

        <div className="divGeralVisualizar">
          <div className="divInfosPrincipal">
            <label style={{ color: 'grey', textAlign: 'center' }}>Código</label>
            <label style={{ fontSize: '15px', textAlign: 'center' }}>
              {dataVisualizacao?.codigo}
            </label>
          </div>
          <div className="divInfos">
            <label style={{ color: 'grey', textAlign: 'center' }}>
              Cliente
            </label>
            <label style={{ fontSize: '15px', textAlign: 'center' }}>
              {dataVisualizacao?.nome}
            </label>
          </div>
          <div className="divInfos">
            <label style={{ color: 'grey', textAlign: 'center' }}>
              Nome Reduzido
            </label>
            <label style={{ fontSize: '15px', textAlign: 'center' }}>
              {dataVisualizacao?.nomeReduzido}
            </label>
          </div>
          <div className="divInfos">
            <label style={{ color: 'grey', textAlign: 'center' }}>Loja</label>
            <label style={{ fontSize: '15px', textAlign: 'center' }}>
              {dataVisualizacao?.loja}
            </label>
          </div>
          <div className="divInfos">
            <label style={{ color: 'grey', textAlign: 'center' }}>
              CNPJ/CPF
            </label>
            <label style={{ fontSize: '15px', textAlign: 'center' }}>
              {dataVisualizacao?.cnpj}
            </label>
          </div>
        </div>

        <Box
          sx={{
            display: 'flex',
            gap: '40px',
            width: '100%',
            paddingTop: '15px',
            paddingBottom: '15px',
          }}
        >
          <ToggleButtonGroup
            color="primary"
            value={selecionado}
            exclusive
            onChange={handleChangeSelect}
            aria-label="Platform"
            style={{ flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <ToggleButton
              style={{ borderRadius: '30px' }}
              value="titulosEmAberto"
            >
              Títulos em aberto
            </ToggleButton>
            <ToggleButton style={{ borderRadius: '30px' }} value="faturamento">
              Faturamento
            </ToggleButton>
            <ToggleButton style={{ borderRadius: '30px' }} value="contato">
              Contato
            </ToggleButton>
            <ToggleButton style={{ borderRadius: '30px' }} value="geral">
              Geral
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        {selecionado == 'titulosEmAberto' ? (
          <div className="divInfoAcima">
            <Box
              sx={(theme) => ({
                display: 'flex',
                gap: '40px',
                alignItems: 'center',
                [theme.breakpoints.down(900)]: {
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  marginBottom: '20px',
                },
              })}
            >
              <div className="itemFiltro">
                <InputLabel style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  Nota Fiscal
                </InputLabel>
                <OutlinedInput
                  type="text"
                  value={filtroTitulosEmAberto?.numeroNF}
                  onChange={(e) =>
                    setFiltroTitulosEmAberto({
                      ...filtroTitulosEmAberto,
                      codigoCliente: dataVisualizacao?.codigo,
                      numeroNF: e.target.value,
                    })
                  }
                  sx={{
                    bgcolor: '#fff',
                    borderRadius: 2,
                    '& .MuiOutlinedInput-input': {
                      padding: '10px 14px',
                    },
                    '& .MuiOutlinedInput-root': {
                      height: 40,
                    },
                  }}
                />
              </div>
              <div className="itemFiltro">
                <InputLabel style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  Data de Emissão
                </InputLabel>
                <OutlinedInput
                  type="date"
                  value={
                    filtroTitulosEmAberto?.dataEmissao
                      ? moment(
                          filtroTitulosEmAberto.dataEmissao,
                          'DD/MM/YYYY'
                        ).format('YYYY-MM-DD')
                      : ''
                  }
                  onChange={(e) => {
                    const novaData = moment(e.target.value).format(
                      'DD/MM/YYYY'
                    );
                    setFiltroTitulosEmAberto({
                      ...filtroTitulosEmAberto,
                      codigoCliente: filtroTitulosEmAberto.codigoCliente,
                      dataEmissao: novaData,
                    });
                  }}
                  sx={{
                    bgcolor: '#fff',
                    borderRadius: 2,
                    '& .MuiOutlinedInput-input': {
                      padding: '10px 14px',
                    },
                    '& .MuiOutlinedInput-root': {
                      height: 40,
                    },
                  }}
                />
              </div>
              <div className="itemFiltro">
                <InputLabel style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  Data de Vencimento
                </InputLabel>
                <OutlinedInput
                  type="date"
                  value={
                    filtroTitulosEmAberto?.dataVencimento
                      ? moment(
                          filtroTitulosEmAberto.dataVencimento,
                          'DD/MM/YYYY'
                        ).format('YYYY-MM-DD')
                      : ''
                  }
                  onChange={(e) => {
                    const novaData = moment(e.target.value).format(
                      'DD/MM/YYYY'
                    );
                    setFiltroTitulosEmAberto({
                      ...filtroTitulosEmAberto,
                      codigoCliente: dataVisualizacao?.codigo,
                      dataVencimento: novaData,
                    });
                  }}
                  sx={{
                    bgcolor: '#fff',
                    borderRadius: 2,
                    '& .MuiOutlinedInput-input': {
                      padding: '10px 14px',
                    },
                    '& .MuiOutlinedInput-root': {
                      height: 40,
                    },
                  }}
                />
              </div>
              <div className="itemFiltro">
                <Button
                  variant="contained"
                  onClick={handleClear}
                  sx={{ mt: 3 }}
                >
                  Limpar Filtros
                </Button>
              </div>
            </Box>

            <Box sx={{ width: '100%', overflowX: 'auto' }}>
              <TabelaTitulosEmAberto
                formatCurrencyBRL={formatCurrencyBRL}
                data={dataTitulosEmAberto}
                loading={loading}
              />
            </Box>
          </div>
        ) : (
          ''
        )}

        {selecionado == 'faturamento' ? (
          <div className="divInfoAcima">
            <Box sx={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              <div className="itemFiltro">
                <InputLabel style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  Num. Título
                </InputLabel>
                <OutlinedInput
                  type="text"
                  onChange={(e) =>
                    setFiltroFaturamento({
                      ...filtroFaturamento,
                      codigoCliente: dataVisualizacao?.codigo,
                      numeroTitulo: e.target.value,
                    })
                  }
                  sx={{
                    bgcolor: '#fff',
                    borderRadius: 2,
                    '& .MuiOutlinedInput-input': {
                      padding: '10px 14px',
                    },
                    '& .MuiOutlinedInput-root': {
                      height: 40,
                    },
                  }}
                />
              </div>
              <div className="itemFiltro">
                <InputLabel style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  Data de Emissão
                </InputLabel>
                <OutlinedInput
                  type="date"
                  onChange={(e) =>
                    debounce(() => {
                      setFiltroFaturamento({
                        ...filtroFaturamento,
                        codigoCliente: dataVisualizacao?.codigo,
                        dataEmissao: moment(e.target.value).format(
                          'DD/MM/YYYY'
                        ),
                      });
                    })
                  }
                  sx={{
                    bgcolor: '#fff',
                    borderRadius: 2,
                    '& .MuiOutlinedInput-input': {
                      padding: '10px 14px',
                    },
                    '& .MuiOutlinedInput-root': {
                      height: 40,
                    },
                  }}
                />
              </div>
            </Box>
            <Box sx={{ width: '100%', overflowX: 'auto' }}>
              <TabelaFaturamento
                data={dataFaturamento}
                loading={loading2}
                formatCurrencyBRL={formatCurrencyBRL}
              />
            </Box>
          </div>
        ) : (
          ''
        )}

        {selecionado == 'contato' ? (
          <div className="divInfoAcima">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '40px',
              }}
            >
              <Box className="itemInfo">
                <label style={{ color: 'grey' }}>Vendedor: </label>
                <label>{dataContato?.vendedor}</label>
              </Box>
              <Box className="itemInfo">
                <label style={{ color: 'grey' }}>E-mail: </label>
                <label>{dataContato?.emailVendedor}</label>
              </Box>
              <Box className="itemInfo">
                <label style={{ color: 'grey' }}>Telefone: </label>
                <label>{formatPhoneNumber(dataContato?.telefone)}</label>
              </Box>

              <Box className="itemInfo">
                <label style={{ color: 'grey' }}>Cidade: </label>
                <label>{dataContato?.cidade}</label>
              </Box>

              <Box className="itemInfo">
                <label style={{ color: 'grey' }}>Uf: </label>
                <label>{dataContato?.estado}</label>
              </Box>
              <Box className="itemInfo">
                <label style={{ color: 'grey' }}>Responsável: </label>
                <label>{dataContato?.responsavel}</label>
              </Box>
            </Box>
          </div>
        ) : (
          ''
        )}

        {selecionado == 'geral' ? (
          <div className="divInfoAcima">
            <Box sx={{ display: 'flex', gap: '40px', flexDirection: 'row' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '40px',
                  flexWrap: 'wrap',
                }}
              >
                <Box className="itemInfo">
                  <label style={{ color: 'grey' }}>Limite de Crédito: </label>
                  <label>{dataGeral?.limiteCredito}</label>
                </Box>
                <Box className="itemInfo">
                  <label style={{ color: 'grey' }}>Lim Cred Sec: </label>
                  <label>{dataGeral?.limiteCreditoSecundario}</label>
                </Box>
                <Box className="itemInfo">
                  <label style={{ color: 'grey' }}>Saldo Histórico: </label>
                  <label>{dataGeral?.saldoHistorico}</label>
                </Box>
                <Box className="itemInfo">
                  <label style={{ color: 'grey' }}>Saldo LC Sec: </label>
                  <label>{dataGeral?.saldoLCSecundario}</label>
                </Box>
                <Box className="itemInfo">
                  <label style={{ color: 'grey' }}>Maior Compra: </label>
                  <label>{formatCurrencyBRL(dataGeral?.maiorCompra)}</label>
                </Box>
                <Box className="itemInfo">
                  <label style={{ color: 'grey' }}>Títulos em atraso: </label>
                  <label>{formatCurrencyBRL(dataGeral?.titulosEmAtraso)}</label>
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '40px',
                  flexWrap: 'wrap',
                }}
              >
                <Box className="itemInfo">
                  <label style={{ color: 'grey' }}>Grau de Risco: </label>
                  <label>{dataGeral?.grauDeRisco}</label>
                </Box>

                <Box className="itemInfo">
                  <label style={{ color: 'grey' }}>Venc Lim. Créd: </label>
                  <label>{dataGeral?.vencimentoLimiteCredito}</label>
                </Box>
                <Box className="itemInfo">
                  <label style={{ color: 'grey' }}>Primeira Compra: </label>
                  <label>{dataGeral?.primeiraCompra}</label>
                </Box>
                <Box className="itemInfo">
                  <label style={{ color: 'grey' }}>Última Compra: </label>
                  <label>{dataGeral?.ultimaCompra}</label>
                </Box>
                <Box className="itemInfo">
                  <label style={{ color: 'grey' }}>Maior Atraso: </label>
                  <label>{dataGeral?.maiorAtraso}</label>
                </Box>
                <Box className="itemInfo">
                  <label style={{ color: 'grey' }}>Média de Atraso: </label>
                  <label>{dataGeral?.mediaAtraso}</label>
                </Box>
              </Box>
            </Box>
          </div>
        ) : (
          ''
        )}
      </Box>
    </Modal>
  );
}
