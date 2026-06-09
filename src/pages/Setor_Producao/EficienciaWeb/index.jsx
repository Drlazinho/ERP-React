import React, { useCallback, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Input,
  IconButton,
  FormLabel,
  Modal as MuiModal,
  Typography,
} from '@mui/material';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import SidebarNovo from '@/components/LayoutNovo/SidebarNovo';
import Amvoxlogopng from '@/assets/Amvoxlogopng.png';
import GraficoEficienciaDiaria from './GraficosEficienciaWeb/graficoEficienciaDiaria';
import GraficoEficienciaMensal from './GraficosEficienciaWeb/graficoEficienciaMensal';
import GraficoEficienciaPorLinha from './GraficosEficienciaWeb/graficoEficienciaPorLinha';
import { cadastrarMetas } from '@/pages/Setor_Producao/EficienciaWeb/eficienciaWeb.service';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router';
import SaveIcon from '@mui/icons-material/Save';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useToast } from '@/hooks/toast.hook';
import './styles.css';
import CloseIcon from '@mui/icons-material/Close';
import HeaderAmvox from '@/components/HeaderAmvox'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '1000px',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #333333',
  borderRadius: '8px',
  boxShadow: 10,
  justifyContent: 'center',
  alignItems: 'center',
  padding: '24px',
  overflowY: 'auto',
};

const interfaceCadastroMeta = {
  ano_Det: 0,
  mes_Det: 0,
  valor_Mes: 0,
};

export default function EficienciaWeb() {
  const [cadastroMeta, setCadastroMeta] = useState(interfaceCadastroMeta);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [filtroDiario, setFiltroDiario] = useState({
    de: '',
    ate: '',
  });
  const [filtroLinha, setFiltroLinha] = useState(null);
  const navigate = useNavigate();

  const { addToast } = useToast();

  function handleBack() {
    navigate('/principal');
  }

  const inputTextHandlerAtualizacao = (e) => {
    const { name, value } = e.target;
    setCadastroMeta({ ...cadastroMeta, [name]: value });
  };

  const cadastrarMeta = useCallback(() => {
    setIsLoading(true);
    cadastrarMetas(cadastroMeta)
      .then((res) => {
        setIsLoading(false);
        handleClose();
        addToast({
          type: 'success',
          title: 'Sucesso ao cadastrar Meta!',
        });
        setReload(true);
      })
      .catch((er) => {
        setIsLoading(false);
        addToast({
          type: 'warning',
          title: 'Erro ao cadastrar Meta!',
        });
      });
  });

  const handleClose = () => {
    setShowModal(!showModal);
    setCadastroMeta(interfaceCadastroMeta);
  };

  return (
    <>
      <MuiModal open={showModal} onClose={handleClose}>
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: '24px',
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontSize: '20px', fontWeight: 'bold', color: '#333333' }}
            >
              Cadastrar Meta
            </Typography>

            <Button
              type="reset"
              onClick={() => {
                handleClose();
              }}
            >
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>
          <Box
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              gap: '15px',
            }}
          >
            <div
              style={{ display: 'flex', flexDirection: 'column', width: '32%' }}
            >
              <FormLabel style={{ textAlign: 'center' }}>Ano da meta</FormLabel>
              <TextField
                type="number"
                id="ano_Det"
                name="ano_Det"
                value={cadastroMeta.ano_Det}
                onChange={inputTextHandlerAtualizacao}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '32%',
                alignItems: 'center',
              }}
            >
              <FormLabel>Mês da meta</FormLabel>
              <TextField
                type="text"
                id="mes_Det"
                name="mes_Det"
                value={cadastroMeta.mes_Det}
                onChange={inputTextHandlerAtualizacao}
              />
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'column', width: '32%' }}
            >
              <FormLabel style={{ textAlign: 'center' }}>
                Valor da meta
              </FormLabel>
              <TextField
                type="number"
                id="valor_Mes"
                name="valor_Mes"
                value={cadastroMeta.valor_Mes}
                onChange={inputTextHandlerAtualizacao}
              />
            </div>
          </Box>
          <div
            style={{
              margin: 'auto',
            }}
          >
            <LoadingButton
              loading={isLoading}
              style={{
                backgroundColor: 'green',
                color: 'white',
                width: '200px',
                marginTop: '20px',
                marginBottom: '20px',
              }}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              onClick={() => {
                cadastrarMeta();
              }}
            >
              <span>Cadastrar Meta</span>
            </LoadingButton>
          </div>
        </Box>
      </MuiModal>

      <div className="principal">
        <div className="sidebar">
          <SidebarNovo />
        </div>
        <Box position={'relative'} sx={{ backgroundColor: '#F2F2F2' }} gap={2}>
          <Box
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              pl: 4,
            }}
          >
            <IconButton onClick={handleBack}>
              <ChevronLeftIcon />
            </IconButton>
            <img src={Amvoxlogopng} alt="Amvox" className="imgAmvox"></img>
            <Box
              sx={{
                display: 'inline-table',
                justifyContent: 'space-between',
                alignItems: 'center',
                pr: 2,
              }}
            >
              <HeaderAmvox title={'Eficiencia Web'} />
            </Box>
          </Box>

          <Box
            style={{
              display: 'flex',
              flexDirection: 'row-reverse',
            }}
            sx={{ pr: 5, pb: 1 }}
          >
            <Button
              variant="text"
              size="small"
              sx={{ textDecoration: 'underline', color: 'black' }}
              onClick={() => {
                setShowModal(true);
              }}
            >
              Cadastrar Meta
            </Button>
          </Box>

          <div className="divGeral">
            <div className="divConsultar">
              <div className="divSelects">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '20%',
                    alignItems: 'center',
                    paddingLeft: '15px',
                  }}
                >
                  <FormLabel style={{ textAlign: 'center' }}>De</FormLabel>
                  <Input
                    type="date"
                    value={filtroDiario.de}
                    onChange={(e) => {
                      setFiltroDiario({
                        ...filtroDiario,
                        de: e.target.value,
                      });
                    }}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '20%',
                    alignItems: 'center',
                    paddingLeft: '15px',
                  }}
                >
                  <FormLabel style={{ textAlign: 'center' }}>Ate</FormLabel>
                  <Input
                    type="date"
                    value={filtroDiario.ate}
                    onChange={(e) => {
                      setFiltroDiario({
                        ...filtroDiario,
                        ate: e.target.value,
                      });
                    }}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '30%',
                    alignItems: 'center',
                    paddingLeft: '25px',
                  }}
                >
                  <FormLabel style={{ textAlign: 'center' }}>Linha</FormLabel>
                  <Input
                    type="number"
                    id="linha"
                    name="linha"
                    value={filtroLinha}
                    onChange={(e) => {
                      setFiltroLinha(e.target.value);
                    }}
                  />
                </div>
                {/* <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: 'end',
                    width: '30%',
                    paddingLeft: '25px',
                  }}
                >
                  <Button
                    component="label"
                    size="small"
                    startIcon={<ArchiveIcon />}
                    sx={{ color: 'grey' }}
                  >
                    Exportar Para Excel
                  </Button>
                </div> */}
              </div>
            </div>
          </div>

          <Box
            margin={1}
            paddingTop={3}
            justifyContent={'center'}
            alignItems={'center'}
            gap={2}
            pr={4}
            pl={4}
          >
            <GraficoEficienciaMensal />
            <GraficoEficienciaDiaria filtro={filtroDiario} reload={reload} />
            <GraficoEficienciaPorLinha filtro={filtroLinha} reload={reload} />
          </Box>
          <Box
            margin={1}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={2}
          ></Box>
        </Box>
        <footer className="footerPage">Amvox 2024</footer>
      </div>
    </>
  );
}
