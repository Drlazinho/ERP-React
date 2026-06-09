import { useCallback } from 'react';
import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  FormLabel,
  Tabs,
  Typography,
  Pagination,
} from '@mui/material';
import HeaderAmvox from '@/components/HeaderAmvox';
import TableEtiquetas from './Components/TableEtiquetas';
import { GetObterQrCode, ExportarExcel } from './GerarCodigoBarra.service';
import { useToast } from '@/hooks/toast.hook';
import { useDebounce } from '@/hooks/debounce.hook';
import AdicionarQrCodeForm from './Components/AdicionarQrCodeForm';
import TabelaListaInovacao from './Components/TabelaListaInovacao';
import { ButtonExcel } from '@/components/ButtonAmvox/ButtonsAmvox';
import ButtonHelp from './Components/ButtonHelp';

const style = {
  width: '100%',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #ccc',
  borderRadius: '10px',
  boxShadow: 1,
  alignItems: 'center',
  marginTop: 3,
  p: 4,
  overflowY: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
};

const GeradorInovacao = () => {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const [data, setData] = useState([]);
  const [filtros, setFiltros] = useState({
    NumeroDaPagina: 1,
    GruposPorPagina: 5,
  });

  const debouncedFiltros = useDebounce(filtros, 500);

  const handleFiltro = (e, value) => {
    setFiltros((prev) => ({ ...prev, NumeroDaPagina: value }));
  };

  const handleClear = () => {
    setFiltros({
      lote: '',
      codProduto: '',
      codFornecedor: '',
      dtGeraQr: null,
      proforma: '',
      nomeProduto: '',
      NumeroDaPagina: 1,
      GruposPorPagina: 5,
    });
  };

  const update = () => {
    handleObterQrCode();
  };

  const handleObterQrCode = useCallback(async () => {
    try {
      setLoading(true);
      const response = await GetObterQrCode(debouncedFiltros);

      setData(response);
    } catch (error) {
      let errorMessage = 'Erro ao editar meta';

      if (error.response && error.response.data) {
        if (typeof error.response.data === 'object') {
          errorMessage =
            JSON.stringify(error.response.data) ||
            error.message ||
            error.response.data.title;
        } else {
          errorMessage = error.response.data;
        }
      }

      addToast({
        type: 'danger',
        title: 'Erro',
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }, [addToast, debouncedFiltros]);

  useEffect(() => {
    handleObterQrCode();
  }, [handleObterQrCode, debouncedFiltros]);

  const handleExportarExcel = async () => {
    try {
      const blob = await ExportarExcel(filtros);

      if (blob.size === 0) {
        throw new Error('Arquivo recebido está vazio');
      }

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `Relatorio-QrCode-${new Date().toISOString().slice(0, 10)}.xlsx`
      );

      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      addToast({
        type: 'danger',
        description: error.message || 'Erro ao gerar relatório Excel',
      });

      console.error('Falha no download:', {
        error: error.message,
        stack: error.stack,
        name: error.name,
      });
    }
  };

  return (
    <Box sx={{ paddingInline: 2, paddingBottom: '500px' }}>
      <Box
        sx={(theme) => ({
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          [theme.breakpoints.down(850)]: {
            flexDirection: 'column',
          },
        })}
      >
        <HeaderAmvox title="Gerador Inovação" />

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <ButtonHelp />
          <ButtonExcel
            color="success"
            sx={{ width: 200 }}
            onClick={handleExportarExcel}
          />
          <AdicionarQrCodeForm update={update} />
        </Box>
      </Box>

      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <Typography>Filtros:</Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel>Data de geração:</FormLabel>
            <TextField
              type="date"
              id="outlined-basic"
              variant="outlined"
              size="small"
              name="dtGeraQr"
              value={filtros.dtGeraQr || ''}
              onChange={(e) => {
                setFiltros({
                  ...filtros,
                  dtGeraQr: e.target.value,
                  NumeroDaPagina: 1,
                });
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel>Proforma:</FormLabel>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              name="codFornecedor"
              value={filtros.proforma}
              onChange={(e) => {
                setFiltros({
                  ...filtros,
                  proforma: e.target.value,
                  NumeroDaPagina: 1,
                });
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel>Nome do Produto:</FormLabel>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              name="nomeProduto"
              value={filtros.nomeProduto}
              onChange={(e) => {
                setFiltros({
                  ...filtros,
                  nomeProduto: e.target.value,
                  NumeroDaPagina: 1,
                });
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel>Código do Produto:</FormLabel>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              name="codProduto"
              value={filtros.codProduto}
              onChange={(e) => {
                setFiltros({
                  ...filtros,
                  codProduto: e.target.value,
                  NumeroDaPagina: 1,
                });
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel>Código do Fornecedor:</FormLabel>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              name="codFornecedor"
              value={filtros.codFornecedor}
              onChange={(e) => {
                setFiltros({
                  ...filtros,
                  codFornecedor: e.target.value,
                  NumeroDaPagina: 1,
                });
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel>Lote:</FormLabel>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              name="lote"
              value={filtros.lote}
              onChange={(e) => {
                setFiltros({
                  ...filtros,
                  lote: e.target.value,
                  NumeroDaPagina: 1,
                });
              }}
            />
          </Box>

          <Button
            variant="contained"
            color="inherit"
            onClick={handleClear}
            sx={{
              ml: 2,
              mt: 2,
              color: '#AA0000',
              width: '200px',
              height: '40px',
            }}
          >
            Limpar
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 4, overflow: 'auto', width: '100%' }}>
        <TabelaListaInovacao data={data.listaQrcode} loading={loading} />
        <Pagination
          sx={{
            marginTop: 4,
            display: 'flex',
            justifyContent: 'center',
          }}
          count={data.totalPaginas}
          onChange={handleFiltro}
          showFirstButton
          showLastButton
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default GeradorInovacao;
