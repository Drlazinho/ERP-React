import React, { useState, useEffect, useCallback } from 'react';
import debounce from '@/utils/debounce.js';
import { apiFabrica_operacao } from '@/services/apis.js';
import './styles.css';
import { formatDatetoHtmlDay } from '@/utils/formatDate.js';
import ClearIcon from '@mui/icons-material/Clear';
import HeaderAmvox from '@/components/HeaderAmvox';
import {
  Box,
  Button,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography,
  Stack,
  Pagination,
} from '@mui/material';
import TabelaApontamentoSanduicheira from './tabela/tabelaApontamentoSanduicheira.jsx';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');
import { IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FormLabel from '@mui/material/FormLabel';
import Amvoxlogopng from '@/assets/Amvoxlogopng.png';
import { useNavigate } from 'react-router';
import './styles.css';
import { buscarApontamentosSanduicheirasPorFiltro } from '@/pages/Setor_Producao/RastreabilidadeSanduicheira/apontamentoSanduicheiraService.service.js';
import { InputDateAmvox } from '@/components/InputDateAmvox/InputDateAmvox';
import SelectAmvox from '@/components/SelectAmvox/index.js';

const interfaceDadosGeral = {
  apontamentosSanduicheira: [
    {
      id: 0,
      ean: '',
      dataRegistro: '',
      linhaID: 0,
      galpaoID: 0,
      op: '',
      codigoProduto: '',
      situacaoSanduich: 0,
    },
  ],
  totalPaginas: 0,
  totalApontamentos: 0,
};

export default function RastreabilidadeSanduicheira() {
  const [apontamentoSanduicheiraLista, setApontamentoSanduicheiraLista] =
    useState(interfaceDadosGeral);
  const [numeroSanduicheiras, setNumeroSanduicheiras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eanInput, setEanInput] = useState('');
  const [produtoInput, setProdutoInput] = useState('');
  const [opInput, setOpInput] = useState('');

  const navigate = useNavigate();

  const [filtro, setFiltro] = useState({
    ean: null,
    dataInicio: formatDatetoHtmlDay(),
    dataFim: formatDatetoHtmlDay(),
    op: null,
    codigoProduto: null,
    nomeProduto: null,
    idLinha: null,
    idGalpao: null,
    pagina: 1,
    qtdPorPagina: 20,
    situacao: 0,
  });

  const [filtroTotal, setFiltroTotal] = useState({
    dataInicio: formatDatetoHtmlDay(),
    dataFim: formatDatetoHtmlDay(),
  });

  function handleBack() {
    navigate(-1);
  }

  const handleFetch = useCallback(() => {
    buscarApontamentosSanduicheirasPorFiltro(filtro)
      .then((retorno) => {
        setApontamentoSanduicheiraLista(retorno);
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro na tabela de apontamento sanduicheira !',
          description:
            'Erro ao carregar tabela de apontamentos sanduicheira, por favor tente novamente dentre de instantes !',
        });
      })
      .finally(() => setLoading(false));
  }, [filtro]);

  const handleFetchCard = async () => {
    try {
      const response = await apiFabrica_operacao.get(
        `ApontamentosSanduicheira/Cards`,
        { params: filtroTotal }
      );
      setNumeroSanduicheiras(response.data);
    } catch (err) {
      addToast({
        type: 'danger',
        title: 'Erro Tabela Sanduicheira !',
        description: 'Erro grave ',
      });
    }
  };

  useEffect(() => {
    handleFetch();
  }, [filtro]);

  useEffect(() => {
    handleFetchCard();
  }, [filtroTotal]);

  const handleClear = (e) => {
    e.preventDefault();
    setEanInput('');
    setOpInput('');
    setProdutoInput('');
    setFiltro({
      ean: '',
      dataInicio: formatDatetoHtmlDay(),
      dataFim: formatDatetoHtmlDay(),
      op: null,
      codigoProduto: null,
      nomeProduto: null,
      idLinha: null,
      idGalpao: null,
      pagina: 1,
      qtdPorPagina: 20,
      situacao: 0,
    });
  };

  const handlePageChange = (event, value) => {
    setFiltro((prevFiltro) => ({
      ...prevFiltro,
      pagina: value,
    }));
  };

  return (
    <>
      <>
        <div className="principal">
          <Box
            position={'relative'}
            sx={{ backgroundColor: '#F2F2F2' }}
            gap={2}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 2,
              }}
            >
              <HeaderAmvox
                title="Rastreabilidade da Sanduicheira"
                onBack={() => navigate(-1)}
              />
            </Box>
            <div className="listaCardApontamentoSanduicheira">
              <div className="cardApontamentoSanduicheira">
                <Typography
                  variant="h7"
                  style={{
                    fontWeight: 'bold',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                    textAlign: 'left',
                  }}
                >
                  {' '}
                  Produção Total Periodo
                </Typography>

                <FormLabel
                  style={{
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                    fontSize: '24px',
                    textAlign: 'left',
                    color: 'green',
                  }}
                >
                  {numeroSanduicheiras.producaoTotalPeriodo}
                </FormLabel>
              </div>

              <div className="cardApontamentoSanduicheira">
                <Typography
                  variant="h7"
                  style={{
                    fontWeight: 'bold',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {' '}
                  Produção Total Ano
                </Typography>

                <FormLabel
                  style={{
                    // textAlign: 'center',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                    fontSize: '24px',
                    textAlign: 'left',
                    color: 'green',
                  }}
                >
                  {numeroSanduicheiras.producaoTotalAno}
                </FormLabel>
              </div>
              <div className="cardApontamentoSanduicheira">
                <Typography
                  variant="h7"
                  style={{
                    fontWeight: 'bold',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {' '}
                  Qtd Produzido com Defeito
                </Typography>

                <FormLabel
                  style={{
                    // textAlign: 'center',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                    fontSize: '24px',
                    textAlign: 'left',
                    color: 'red',
                  }}
                >
                  {numeroSanduicheiras.qtdProduzidaComDefeito}
                </FormLabel>
              </div>
            </div>
            <div className="divGeralApontamentoSanduicheira">
              <div className="divFiltroApontamentoSanduicheira">
                <div className="divSelects">
                  <div
                    style={{
                      flexDirection: 'column',
                      paddingLeft: '10px',
                      maxWidth: '160px',
                      fontWeight: 'bold',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                      width: '100%',
                    }}
                  >
                    <InputLabel style={{ fontWeight: 'bold' }}>
                      Data Inicial
                    </InputLabel>

                    <InputDateAmvox
                      label=""
                      value={filtro.dataInicio || ''}
                      onChange={(date) => {
                        setFiltro((prev) => ({ ...prev, dataInicio: date }));
                        setFiltroTotal((prev) => ({
                          ...prev,
                          dataInicio: date,
                        }));
                        setLoading(true);
                      }}
                      format="YYYY-MM-DD"
                    />
                  </div>
                  <div
                    style={{
                      flexDirection: 'column',
                      fontWeight: 'bold',
                      maxWidth: '160px',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                      width: '100%',
                    }}
                  >
                    <InputLabel style={{ fontWeight: 'bold' }}>
                      Data Final
                    </InputLabel>
                    <InputDateAmvox
                      label=""
                      value={filtro.dataFim || ''}
                      onChange={(date) => {
                        setFiltro((prev) => ({ ...prev, dataFim: date }));
                        setFiltroTotal((prev) => ({ ...prev, dataFim: date }));
                        setLoading(true);
                      }}
                      format="YYYY-MM-DD"
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      paddingLeft: '10px',
                      fontWeight: 'bold',
                      textShadow: '1px 1px 1px rgba(0, 0, 0, 0.1)',
                      width: '100%',
                    }}
                  >
                    <InputLabel style={{ fontWeight: 'bold' }}>
                      Produto
                    </InputLabel>
                    <OutlinedInput
                      id="nomeProduto"
                      placeholder="Produto"
                      value={produtoInput}
                      onChange={(e) => {
                        const value = e.target.value;
                        setProdutoInput(value);
                        debounce(() => {
                          setFiltro((prevFiltro) => ({
                            ...prevFiltro,
                            nomeProduto: value,
                            dataInicio: null,
                            dataFim: null,
                          }));
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
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      paddingLeft: '10px',
                      fontWeight: 'bold',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                      width: '100%',
                    }}
                  >
                    <InputLabel style={{ fontWeight: 'bold' }}>EAN</InputLabel>
                    <OutlinedInput
                      id="ean"
                      placeholder="EAN"
                      value={eanInput}
                      onChange={(e) => {
                        const value = e.target.value;
                        setEanInput(value);
                        debounce(() => {
                          setFiltro((prevFiltro) => ({
                            ...prevFiltro,
                            ean: value,
                            dataInicio: null,
                            dataFim: null,
                          }));
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
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      paddingLeft: '10px',
                      fontWeight: 'bold',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                      width: '100%',
                    }}
                  >
                    <InputLabel style={{ fontWeight: 'bold' }}>OP</InputLabel>
                    <OutlinedInput
                      id="op"
                      placeholder="OP"
                      value={opInput}
                      onChange={(e) => {
                        const value = e.target.value;
                        setOpInput(value);
                        debounce(() => {
                          setFiltro((prevFiltro) => ({
                            ...prevFiltro,
                            op: value,
                            dataInicio: null,
                            dataFim: null,
                          }));
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

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      paddingLeft: '10px',
                      fontWeight: 'bold',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                      width: '100%',
                    }}
                  >
                    <InputLabel style={{ fontWeight: 'bold' }}>
                      Situação
                    </InputLabel>
                    <SelectAmvox
                      name="situacao"
                      options={[
                        { value: 1, label: 'CONFORME' },
                        { value: 2, label: 'DEFEITO' },
                      ]}
                      onChange={(event, newValue) => {
                        setFiltro((prev) => ({
                          ...prev,
                          situacao: newValue ? newValue.value : 0,
                          dataInicio: null,
                          dataFim: null,
                        }));
                      }}
                    />
                  </div>

                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      paddingRight: '25px',
                    }}
                  >
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<ClearIcon />}
                      sx={{
                        borderRadius: '8px',
                        border: '1px solid rgba(204, 204, 204, 0.80)',
                        backgroundColor: '#FFF',
                        color: 'black',
                        marginTop: '25px',
                        whiteSpace: 'nowrap',
                        '&:hover': {
                          backgroundColor: '#F0F0F0',
                        },
                      }}
                      onClick={handleClear}
                    >
                      Limpar Filtro
                    </Button>
                  </Box>
                </div>
              </div>
            </div>

            <TabelaApontamentoSanduicheira
              data={apontamentoSanduicheiraLista?.apontamentosSanduicheira}
            />
            <Stack
              spacing={2}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '25px',
              }}
            >
              <Pagination
                count={apontamentoSanduicheiraLista.totalPaginas}
                page={filtro.pagina}
                onChange={handlePageChange}
                showFirstButton
                showLastButton
                color="error"
              />
            </Stack>
          </Box>
        </div>
      </>
    </>
  );
}
