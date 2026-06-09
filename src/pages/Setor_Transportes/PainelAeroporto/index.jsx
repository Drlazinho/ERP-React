import { useCallback, useEffect, useState } from 'react';
import HeaderAmvox from '@/components/HeaderAmvox';
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton,
  Modal,
  FormLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router';
import { TabelaRecebimento } from './TabelaRecebimento/TabelaRecebimento';
import { consultaContainer } from '@/services/recebimentoPermanenciaContainer.service';
import { consultaExpedicaoCarga } from '@/services/recebimentoPermanenciaContainer.service';
import { TabelaExpedicao } from './TabelaExpedicao/TabelaExpedicao';
import { apiFabrica, apiFabrica_operacao } from '@/services/apis';

import { AtualizaImagemTransportadora } from '@/services/recebimentoPermanenciaContainer.service';
import { AdicionarExpedicao } from '@/services/recebimentoPermanenciaContainer.service';
import { consultaTransportadora } from '@/services/recebimentoPermanenciaContainer.service';
import { useToast } from '@/hooks/toast.hook';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import ReactFileReader from 'react-file-reader';
import { FiCamera } from 'react-icons/fi';
import './styles.css';
import { formatDateVisual } from '@/utils/formatDateInput';
import moment from 'moment/moment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid #333333',
  borderRadius: '16px',
  boxShadow: 10,
  justifyContent: 'center',
  alignItems: 'center',
  p: 4,
  overflowY: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
};

const interfaceCadastroExpedicao = {
  status: '',
  transportadora: '',
  tipO_CARGA: '',
  cubagem: 0,
  veiculo: '',
  uf: '',
  destino: '',
  doca: '',
  chegada: '',
  prioridade: '',
  motorista: '',
};

const interfaceCadastroImagem = {
  a4_COD: '',
  logO_TRANS: '',
};

const interfaceTransportadora = {
  a4_FILIAL: '',
  a4_COD: '',
  a4_NOME: '',
  a4_NREDUZ: '',
  a4_VIA: '',
  a4_END: '',
  a4_MUN: '',
  a4_BAIRRO: '',
  a4_COD_MUN: '',
  a4_EST: '',
  a4_CEP: '',
  a4_DDD: '',
  a4_TEL: '',
  a4_CGC: '',
  a4_EMAIL: '',
  deletado: '',
};

const interfaceStatusCadastro = [
  {
    id: 1,
    status: 'EM DOCA',
  },
  {
    id: 2,
    status: 'EM CARREGAMENTO',
  },
  {
    id: 3,
    status: 'EM DESCARGA',
  },
  {
    id: 4,
    status: 'ACESSANDO O PATIO',
  },
  {
    id: 5,
    status: 'LIBERADO',
  },
  {
    id: 6,
    status: 'CANCELADO',
  },
  {
    id: 7,
    status: 'AGUARD. SEPARAÇÃO',
  },
];

const interfacePrioridade = [
  {
    id: 1,
    status: 'Alta',
  },
  {
    id: 2,
    status: 'Média',
  },
  {
    id: 3,
    status: 'Baixa',
  },
];

export default function PainelAeroporto() {
  const [recebimentoContainerLista, setRecebimentoContainerLista] = useState(
    []
  );
  interfaceCadastroImagem;
  const [listaExpedicao, setListaExpedicao] = useState([]);
  const { addToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [showModalImagem, setShowModalImagem] = useState(false);
  const [cadastroImagem, setCadastroImagem] = useState(interfaceCadastroImagem);
  const [cadastroExpedicao, setCadastroExpedicao] = useState(
    interfaceCadastroExpedicao
  );
  const [statusObj, setStatusObj] = useState(interfaceStatusCadastro);
  const [prioridadeObj, setPrioridadeObj] = useState(interfacePrioridade);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingImagem, setIsLoadingImagem] = useState(false);

  const [transportadoraObj, setTransportadoraObj] = useState([
    interfaceTransportadora,
  ]);
  const navigate = useNavigate();
  const handleLogoClick = () => navigate('/principal');
  const [filtro, setFiltro] = useState({
    id: 0,
    produto: null,
    bl: null,
    data: moment().format('yyyy-MM-DD'),
    nf: null,
    numeroDaPagina: 1,
    itensPorPagina: 100,
  });

  const [filtroExpedicao] = useState({
    Doca: '',
    DataChegada: moment().format('yyyy-MM-DD'),
    Status: '',
  });

  const handleCloseCadastroExpedicao = () => {
    setShowModal(!showModal);
    setCadastroExpedicao(interfaceCadastroExpedicao);
  };

  const handleCloseCadastroImagem = () => {
    setShowModalImagem(!showModalImagem);
    setCadastroImagem(interfaceCadastroImagem);
  };

  const inputTextHandler = (e) => {
    const { name, value } = e.target;

    setCadastroExpedicao({ ...cadastroExpedicao, [name]: value });
  };

  const handleFiles = (files) => {
    setCadastroImagem({
      ...cadastroImagem,
      logO_TRANS: files.base64,
    });
  };

  const AtualizarImagem = useCallback((obj) => {
    setIsLoadingImagem(true);
    const url = obj.logO_TRANS;
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], 'ImgLogo', { type: 'image/png' });

        const formData = new FormData();
        formData.append('A4_COD', obj.a4_COD);
        formData.append('LOGO_TRANS', file);
        apiFabrica_operacao
          .put(`Transportadora_sa4`, formData)
          .then((r) => {
            setIsLoadingImagem(false);
            setTimeout(() => {
              handleFetch();
            }, 2000);
            handleCloseCadastroImagem();
            addToast({
              type: 'success',
              title: 'Sucesso ao Atualizar Imagem!',
            });
          })
          .catch((err) => {
            addToast({
              type: 'warning',
              title: 'Erro ao Atualizar Imagem!',
            });
          });
      });
  });

  const AdicionaExpedicaoFunc = useCallback((obj) => {
    setIsLoading(true);
    try {
      AdicionarExpedicao(obj);
    } catch (err) {
      setIsLoading(false);
      addToast({
        type: 'warning',
        title: 'Erro ao cadastrar carregamento!',
      });
    } finally {
      setTimeout(() => {
        handleFetch();
      }, 2000);
      setIsLoading(false);
      handleCloseCadastroExpedicao();
      addToast({
        type: 'success',
        title: 'Sucesso ao cadastrar carregamento!',
      });
    }
  });

  const handleFetch = useCallback(() => {
    consultaContainer(filtro)
      .then((retorno) => {
        setRecebimentoContainerLista(retorno);
      })
      .catch((error) => {
        addToast({
          type: 'danger',
          title: 'Erro',
          description: error.response,
        });
      });

    consultaTransportadora()
      .then((retorno) => {
        setTransportadoraObj(retorno);
      })
      .catch((error) => {
        addToast({
          type: 'danger',
          title: 'Erro',
          description: error.response,
        });
      });

    consultaExpedicaoCarga(filtroExpedicao)
      .then((retorno) => {
        setListaExpedicao(retorno);
      })
      .catch((error) => {
        addToast({
          type: 'danger',
          title: 'Erro',
          description: error.response,
        });
      });
  }, [filtro]);

  const MINUTE_MS = 20000;

  useEffect(() => {
    const interval = setInterval(() => {
      handleFetch();
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    handleFetch();
  }, [filtro]);

  return (
    <div>
      <Modal
        open={showModal}
        onClose={handleCloseCadastroExpedicao}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: '800px', height: '600px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography
              id="modal-modal-title"
              sx={{ fontSize: '20px', fontWeight: 'bold', color: '#333333' }}
            >
              Cadastrar Carregamento
            </Typography>

            <Button
              type="reset"
              onClick={handleCloseCadastroExpedicao}
              variant="text"
            >
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>
          <Box
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              gap: '10px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '32%',
              }}
            >
              <FormLabel
                sx={{ fontWeight: 'bold', fontSize: '12px', color: '#333' }}
              >
                Status
              </FormLabel>
              <Select
                size="small"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={cadastroExpedicao.status}
                label="Status"
                onChange={(e) =>
                  setCadastroExpedicao({
                    ...cadastroExpedicao,
                    status: e.target.value,
                  })
                }
                sx={{ borderRadius: '8px', width: '100%' }}
              >
                {statusObj.map((item) => (
                  <MenuItem key={item.id} value={item.status}>
                    {item.status}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '32%',
                marginBottom: '32px',
              }}
            >
              <FormLabel
                sx={{ fontWeight: 'bold', fontSize: '12px', color: '#333' }}
              >
                Transportadora
              </FormLabel>
              <Select
                size="small"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={cadastroExpedicao.transportadora}
                label="Access"
                onChange={(e) =>
                  setCadastroExpedicao({
                    ...cadastroExpedicao,
                    transportadora: e.target.value,
                  })
                }
                sx={{ borderRadius: '8px', width: '100%' }}
              >
                {transportadoraObj.map((item) => (
                  <MenuItem key={item.a4_COD} value={item.a4_COD}>
                    {`${item.a4_NOME}`}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '32%',
                marginBottom: '32px',
              }}
            >
              <FormLabel
                sx={{ fontWeight: 'bold', fontSize: '12px', color: '#333' }}
              >
                Tipo carga
              </FormLabel>
              <TextField
                size="small"
                type="text"
                id="tipO_CARGA"
                name="tipO_CARGA"
                value={cadastroExpedicao.tipO_CARGA}
                onChange={inputTextHandler}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '32%',
                marginBottom: '32px',
              }}
            >
              <FormLabel
                sx={{ fontWeight: 'bold', fontSize: '12px', color: '#333' }}
              >
                Cubagem
              </FormLabel>
              <TextField
                size="small"
                type="number"
                id="cubagem"
                name="cubagem"
                value={cadastroExpedicao.cubagem}
                onChange={inputTextHandler}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '32%',
                marginBottom: '32px',
              }}
            >
              <FormLabel
                sx={{ fontWeight: 'bold', fontSize: '12px', color: '#333' }}
              >
                Veículo
              </FormLabel>
              <TextField
                size="small"
                type="text"
                id="veiculo"
                name="veiculo"
                value={cadastroExpedicao.veiculo}
                onChange={inputTextHandler}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '32%',
                marginBottom: '32px',
              }}
            >
              <FormLabel
                sx={{ fontWeight: 'bold', fontSize: '12px', color: '#333' }}
              >
                UF
              </FormLabel>
              <TextField
                size="small"
                label="Uf"
                type="text"
                id="uf"
                name="uf"
                inputProps={{ maxLength: 2 }}
                value={cadastroExpedicao.uf}
                onChange={inputTextHandler}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '32%',
                marginBottom: '32px',
              }}
            >
              <FormLabel
                sx={{ fontWeight: 'bold', fontSize: '12px', color: '#333' }}
              >
                Destino/Cliente
              </FormLabel>
              <TextField
                size="small"
                type="text"
                id="destino"
                name="destino"
                value={cadastroExpedicao.destino}
                onChange={inputTextHandler}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '32%',
                marginBottom: '32px',
              }}
            >
              <FormLabel
                sx={{ fontWeight: 'bold', fontSize: '12px', color: '#333' }}
              >
                Doca
              </FormLabel>
              <TextField
                size="small"
                type="text"
                id="doca"
                name="doca"
                value={cadastroExpedicao.doca}
                onChange={inputTextHandler}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '32%',
                marginBottom: '32px',
              }}
            >
              <FormLabel
                sx={{ fontWeight: 'bold', fontSize: '12px', color: '#333' }}
              >
                Motorista
              </FormLabel>
              <TextField
                size="small"
                type="text"
                id="motorista"
                name="motorista"
                value={cadastroExpedicao.motorista}
                onChange={inputTextHandler}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '32%',
                marginBottom: '32px',
              }}
            >
              <FormLabel
                sx={{ fontWeight: 'bold', fontSize: '12px', color: '#333' }}
              >
                Chegada
              </FormLabel>
              <input
                step="2"
                id="chegada"
                type="datetime-local"
                name="chegada"
                value={formatDateVisual(cadastroExpedicao.chegada)}
                onChange={inputTextHandler}
                style={{
                  width: '100%',
                  height: '32px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  padding: '8px',
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '32%',
                marginBottom: '32px',
              }}
            >
              <FormLabel
                sx={{ fontWeight: 'bold', fontSize: '12px', color: '#333' }}
              >
                Prioridade
              </FormLabel>
              <Select
                size="small"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={cadastroExpedicao.prioridade}
                label="Prioridade"
                onChange={(e) =>
                  setCadastroExpedicao({
                    ...cadastroExpedicao,
                    prioridade: e.target.value,
                  })
                }
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                }}
              >
                {prioridadeObj.map((item) => (
                  <MenuItem key={item.id} value={item.status}>
                    {item.status}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </Box>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
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
                AdicionaExpedicaoFunc(cadastroExpedicao);
              }}
            >
              <span>Salvar</span>
            </LoadingButton>
          </div>
        </Box>
      </Modal>

      <Modal open={showModalImagem} onClose={handleCloseCadastroImagem}>
        <Box sx={{ ...style, width: '600px', height: '350px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography
              id="modal-modal-title"
              sx={{ fontSize: '18px', fontWeight: 'bold', color: '#333333' }}
            >
              Atualizar Imagem da Transportadora
            </Typography>

            <Button
              type="reset"
              onClick={handleCloseCadastroImagem}
              variant="text"
            >
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>
          <Box
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: '15px',
              marginTop: '24px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '50%',
                marginBottom: '24px',
              }}
            >
              <FormLabel
                sx={{ fontWeight: 'bold', fontSize: '12px', color: '#333' }}
              >
                Selecione a Transportadora
              </FormLabel>
              <Select
                size="small"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={cadastroImagem.a4_COD}
                label="Access"
                onChange={(e) =>
                  setCadastroImagem({
                    ...cadastroImagem,
                    a4_COD: e.target.value,
                  })
                }
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                }}
              >
                {transportadoraObj.map((item) => (
                  <MenuItem key={item.a4_COD} value={item.a4_COD}>
                    {`${item.a4_MUN} ${' - '} ${item.a4_NREDUZ}`}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '32%',
                marginBottom: '24px',
                alignItems: 'center',
              }}
            >
              <FormLabel
                sx={{ fontWeight: 'bold', fontSize: '12px', color: '#333' }}
              >
                Selecionar Imagem
              </FormLabel>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  width: '150px',
                  height: '100px',
                }}
              >
                <ReactFileReader
                  className="botaoUpload"
                  fileTypes={['.png', '.jpg']}
                  base64={true}
                  handleFiles={handleFiles}
                >
                  <FiCamera style={{ width: 30, height: 30 }} as={Button} />
                </ReactFileReader>
              </div>
            </div>
            <>
              {cadastroImagem.logO_TRANS ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '32%',
                    alignItems: 'center',
                  }}
                >
                  <FormLabel>Imagem Selecionada</FormLabel>
                  <img
                    width="150"
                    height="60"
                    src={`${cadastroImagem.logO_TRANS}`}
                  />
                </div>
              ) : (
                <></>
              )}
            </>
          </Box>
          <div
            style={{
              margin: 'auto',
            }}
          >
            <LoadingButton
              loading={isLoadingImagem}
              style={{
                backgroundColor: 'green',
                color: 'white',
                width: '100%',
                marginTop: '20px',
                marginBottom: '20px',
              }}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              onClick={() => {
                AtualizarImagem(cadastroImagem);
              }}
            >
              <span>Atualizar</span>
            </LoadingButton>
          </div>
        </Box>
      </Modal>

      <>
        <Box
          position={'relative'}
          gap={2}
          sx={{ width: '98%', margin: '0 auto' }}
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
            <HeaderAmvox title="Painel Aeroporto" onBack={() => navigate(-1)} />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Typography
                sx={{ fontWeight: '700', color: '#333', fontSize: '24px' }}
              >
                PARTIDAS
              </Typography>
            </Box>
            <Box
              style={{
                display: 'flex',
              }}
            >
              <Button
                style={{
                  backgroundColor: '#007aff',
                  borderRadius: '16px',
                  fontSize: '12px',
                }}
                className="ms-2"
                variant="contained"
                size="small"
                onClick={() => {
                  navigate('/transporte/historicoPartidas');
                }}
              >
                Histórico de Partidas
              </Button>
              <Button
                style={{
                  backgroundColor: '#007aff',
                  borderRadius: '16px',
                  fontSize: '12px',
                }}
                className="ms-2"
                variant="contained"
                size="small"
                onClick={() => {
                  setShowModal(!showModal);
                }}
              >
                Cadastrar Carregamento
              </Button>

              <Button
                style={{
                  backgroundColor: '#007aff',
                  borderRadius: '16px',
                  padding: '5px',
                  fontSize: '12px',
                }}
                className="ms-2"
                variant="contained"
                size="small"
                onClick={() => {
                  setShowModalImagem(!showModalImagem);
                }}
              >
                Atualizar imagem
              </Button>
            </Box>
          </Box>

          <TabelaExpedicao
            listaExpedicao={listaExpedicao}
            handleFetch={handleFetch}
          />

          <Box
            margin={1}
            display={'flex'}
            paddingTop={3}
            justifyContent={'flex-start'}
            alignItems={'center'}
            gap={2}
          >
            <Typography
              sx={{ fontWeight: '700', color: '#333', fontSize: '24px' }}
            >
              CHEGADAS
            </Typography>
          </Box>
          <Box sx={{ borderRadius: '10px' }}>
            <TabelaRecebimento
              listaRecebimento={recebimentoContainerLista}
              handleFetch={handleFetch}
            />
          </Box>
          <Box
            margin={1}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={2}
          ></Box>
        </Box>
      </>
    </div>
  );
}
