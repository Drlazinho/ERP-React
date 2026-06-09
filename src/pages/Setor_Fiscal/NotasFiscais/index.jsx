import React, { useCallback, useEffect, useState, useContext } from 'react';
import LayoutNovo from '../../../components/LayoutNovo';
import FiscalTabela from './FiscalTabela';
import { Box, Grid, TextField, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import debounce from '../../../utils/debounce';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');
import DeleteIcon from '@mui/icons-material/Delete';

import {
  BuscarFilial,
  BuscarNotaFiscal,
  RetornarPdfNotaFiscal,
} from '../../../services/fiscal.Service';
import formatDataBarra from '../../../utils/formatDataBarra';
import ExcelButton from './components/ExcelButton';
import {
  reverseFormatToPonto,
  formatToPonto,
} from './components/NotaFiscal/formatToPonto';
import { NotaPdfFiscal } from '../../../hooks/nota-fiscal-pdf.hook';
import { donwloadGzipPDF, donwloadPDF } from '../../../utils/downloadPdf';
import { useToast } from '../../../hooks/toast.hook';
import { InputDateAmvox } from '../../../components/InputDateAmvox/InputDateAmvox';
import { IMaskInput } from 'react-imask';
import HeaderAmvox from '@/components/HeaderAmvox';

const TextMaskCNPJ = React.forwardRef(function TextMaskCNPJ(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="00.000.000/0000-00"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value, mask) => {
        const unformattedValue = value.replace(/\D/g, '');
        onChange({ target: { name: props.name, value: unformattedValue } });
      }}
      overwrite
    />
  );
});

export default function NotasFiscais() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataFilial, setDataFilial] = useState([]);

  const mesAtual = dayjs().format('YYYY.MM.DD');

  const [filtro, setFiltro] = useState({
    cnpj: null,
    chaveNotaFiscal: null,
    cnpjEmissor: null,
    nomeEmissor: null,
    dataEmissao: mesAtual,
    horaEmissao: null,
    dataAutorizacao: null,
    modelo: null,
    emitida: null,
    xml: null,
  });
  const [filtroFilial, setFiltroFilial] = useState({
    nome: null,
    cnpj: null,
  });
  const { infoNota, consultarNotaPdf } = useContext(NotaPdfFiscal);

  const { addToast } = useToast();

  const filtroConvertido = {
    ...filtro,
    dataEmissao: filtro.dataEmissao
      ? dayjs(filtro.dataEmissao, 'YYYY-MM-DD').format('YYYY.MM.DD')
      : null,
  };

  const handleFetchFilial = useCallback(() => {
    BuscarFilial(filtroFilial)
      .then((dados) => setDataFilial(dados))
      .catch(() => {});
  }, [filtroFilial]);

  useEffect(() => {
    handleFetchFilial();
  }, [filtroFilial]);

  const handleFetch = useCallback(() => {
    setLoading(true);

    BuscarNotaFiscal(filtroConvertido)
      .then((dados) => setData(dados))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [filtroConvertido]);

  useEffect(() => {
    handleFetch();
  }, [filtro]);
  const handleClear = (e) => {
    e.preventDefault();
    e.target.reset();
    setFiltro({
      cnpj: null,
      chaveNotaFiscal: null,
      cnpjEmissor: null,
      nomeEmissor: null,
      dataEmissao: formatToPonto(),
      horaEmissao: null,
      dataAutorizacao: null,
      modelo: null,
      emitida: null,
      xml: null,
    });
  };

  const donwloadNotaPdf = (value) => {
    RetornarPdfNotaFiscal(value).then((res) => {
      donwloadPDF(res, value);
    });
  };

  return (
    <>
      <Box position={'relative'}>
        <HeaderAmvox title={'Notas Fiscais Contra Amvox'} />
        <form onSubmit={handleClear}>
          <Grid container columnSpacing={2} rowSpacing={1} sx={{ p: 1 }}>
            <Grid item xs={6} sm={3} md={2} xl={1.5}>
              <InputDateAmvox
                label="Data Emissão"
                value={filtro.dataEmissao || ''}
                onChange={(date) =>
                  setFiltro((prev) => ({ ...prev, dataEmissao: date }))
                }
                format="YYYY.MM.DD"
              />
            </Grid>
            <Grid item xs={6} sm={3} md={2} xl={1.5}>
              <TextField
                label="Cnpj Emissor"
                size="small"
                variant="filled"
                fullWidth
                sx={{ bgcolor: '#fff', borderRadius: 2 }}
                onChange={(e) =>
                  debounce(() => {
                    setFiltro({
                      ...filtro,
                      cnpjEmissor: e.target.value,
                      dataEmissao: null,
                    });
                  }, 1000)
                }
                InputProps={{
                  inputComponent: TextMaskCNPJ,
                }}
              />
            </Grid>
            <Grid item xs={6} sm={3} md={2} xl={1.5}>
              <TextField
                label="Nome"
                size="small"
                variant="filled"
                fullWidth
                sx={{ bgcolor: '#fff', borderRadius: 2 }}
                onChange={(e) =>
                  debounce(() => {
                    setFiltro({
                      ...filtro,
                      nomeEmissor: e.target.value,
                      dataEmissao: null,
                    });
                  }, 1000)
                }
              />
            </Grid>
            <Grid item xs={6} sm={3} md={2} xl={1.5}>
              <TextField
                label="N.F"
                size="small"
                variant="filled"
                fullWidth
                sx={{ bgcolor: '#fff', borderRadius: 2 }}
                onChange={(e) =>
                  debounce(() => {
                    setFiltro({
                      ...filtro,
                      chaveNotaFiscal: e.target.value,
                      dataEmissao: null,
                    });
                  }, 2500)
                }
              />
            </Grid>
            <Grid item xs={6} sm={3} md={2} xl={1.5}>
              <Button
                fullWidth
                variant="contained"
                size="medium"
                color="warning"
                startIcon={<DeleteIcon />}
                type="submit"
              >
                <Typography variant="subtitle1">Clear</Typography>
              </Button>
            </Grid>
            <Grid item xs={6} sm={3} md={2} xl={1.5}>
              <ExcelButton dataApi={data} filtroNameFile={filtro.dataEmissao} />
            </Grid>
          </Grid>
        </form>

        <FiscalTabela
          dataFilial={dataFilial}
          data={data}
          loading={loading}
          consultarNotaPdf={consultarNotaPdf}
          donwloadNotaPdf={donwloadNotaPdf}
        />
      </Box>
    </>
  );
}
