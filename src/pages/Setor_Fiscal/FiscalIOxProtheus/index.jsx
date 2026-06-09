import { useState, useEffect } from 'react';
import './styles.css';
import ClearIcon from '@mui/icons-material/Clear';
import {
  Box,
  Button,
  FormLabel,
  TextField,
  InputLabel,
  OutlinedInput,
  IconButton,
} from '@mui/material';
import { BuscarNotas } from '@/pages/Setor_Fiscal/FiscalIOxProtheus/fiscalIOxProtheus.service';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Amvoxlogopng from '../../../assets/Amvoxlogopng.png';
import { useNavigate } from 'react-router';
import './styles.css';
import LayoutNovo from '@/components/LayoutNovo';
import TableComparacaoFiscalioxProtheus from './TableComparacaoFiscalioxProtheus';
import { useToast } from '@/hooks/toast.hook';
import Loader from '@/components/Loader';
import { formatDatetoHtmlDay } from '@/utils/formatDate';
import HeaderAmvox from '@/components/HeaderAmvox';

const debounce = (fn, time = 500) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), time);
  };
};

export default function FiscalIOXProtheus() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState({
    chaveNfe: '',
    DataInicio: formatDatetoHtmlDay(),
  });
  const [data, setData] = useState([]);
  const { addToast } = useToast();

  function handleBack() {
    navigate('/principal/');
  }

  const handleClear = () => {
    setFiltro({
      chaveNfe: '',
      DataInicio: formatDatetoHtmlDay(),
    });
  };

  const handleBuscarNotas = () => {
    setLoading(true);

    const params = {
      chaveNfe: filtro.chaveNfe,
      DataInicio: filtro.DataInicio,
    };

    BuscarNotas(params)
      .then((response) => {
        setData(response);

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        addToast({
          type: 'danger',
          title: 'Erro',
          description: 'Ocorreu um erro ao buscar as notas ' + error,
        });
      });
  };

  useEffect(() => {
    handleBuscarNotas();
  }, [filtro]);

  return (
    <>
      <Box className="principal">
        <Box
          position={'relative'}
          sx={{
            backgroundColor: '#F2F2F2',
          }}
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
              title="Notas Fiscais Emitidas Contra Amvox X Protheus"
              onBack={() => navigate(-1)}
            />
          </Box>

          <Box className="divGeralNotasEmitidas">
            <Box className="divConsultarNotasFiscais">
              <Box
                style={{
                  flexDirection: 'column',
                  paddingLeft: '10px',
                  maxWidth: '160px',
                  fontWeight: 'bold',
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                  width: '100%',
                }}
              >
                <FormLabel sx={{ fontWeight: 'bold' }}>Data Emissão</FormLabel>
                <TextField
                  size="small"
                  type="date"
                  fullWidth
                  sx={{
                    backgroundColor: '#fff',
                    display: 'flex',
                    width: '168px',
                    '& .MuiInputBase-root': {
                      height: '43px',
                      borderRadius: '8px',
                      '&:focus-within': {
                        border: '1px solid lightgray',
                      },
                    },
                  }}
                  value={filtro.DataInicio}
                  onChange={(e) =>
                    setFiltro({
                      ...filtro,
                      DataInicio: e.target.value,
                    })
                  }
                  inputProps={{
                    style: { height: '48px', width: '100%' },
                  }}
                />
              </Box>

              <Box
                sx={(theme) => ({
                  display: 'flex',
                  flexDirection: 'column',
                  paddingLeft: '10px',
                  fontWeight: 'bold',
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                  width: '100%',
                  [theme.breakpoints.down('1000')]: {
                    maxWidth: '180px',
                  },
                })}
              >
                <InputLabel style={{ fontWeight: 'bold' }}>
                  N° da chave
                </InputLabel>
                <OutlinedInput
                  type="number"
                  size="large"
                  placeholder="N° da chave"
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
                  value={filtro.chaveNfe}
                  onChange={(e) =>
                    setFiltro({
                      ...filtro,
                      chaveNfe: e.target.value,
                    })
                  }
                />
              </Box>

              <Box
                sx={(theme) => ({
                  display: 'flex',
                  flexDirection: 'column',

                  [theme.breakpoints.down('940')]: { marginLeft: '10px' },
                })}
              >
                <Button
                  size="large"
                  variant="outlined"
                  startIcon={<ClearIcon />}
                  sx={{
                    borderRadius: '8px',
                    border: '1px solid rgba(204, 204, 204, 0.80)',
                    backgroundColor: '#FFF',
                    color: 'black',
                    marginTop: '20px',
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
            </Box>
          </Box>
          <Box
            sx={{
              width: '96%',
              margin: 'auto',
              overflowX: 'auto',
              marginTop: 2,
              borderRadius: '8px',
              border: '1px solid rgba(204, 204, 204, 0.80)',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            }}
          >
            {loading ? (
              <Loader />
            ) : (
              <TableComparacaoFiscalioxProtheus data={data} />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
