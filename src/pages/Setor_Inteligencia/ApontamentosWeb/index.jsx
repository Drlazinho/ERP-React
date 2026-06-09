import {
  Box,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import './styles.css';

import SidebarNovo from '@/components/LayoutNovo/SidebarNovo';

import HeaderAmvox from '@/components/HeaderAmvox';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { useToast } from '@/hooks/toast.hook';
import Loader from '@/components/Loader';
import { buscaApontamentos } from '@/pages/Setor_Inteligencia/ApontamentosWeb/apontamentosWeb.service';

import TableApontamentos from './ApontamentosTable';
import ModalCadastroInicial from './ModalCadastrarApontamento/index';
import { useEffect, useState } from 'react';

export default function ApontamentosWeb() {
  const [data, setData] = useState([]);
  const [totalMin, setTotalMin] = useState([]);
  const [loading, setLoading] = useState(false);
  const { nome, id } = useUsuarioLocal();

  const { addToast } = useToast();

  const navigate = useNavigate();

  const AtualizarTabela = () => {
    handleFetchApontamentos();
  };
  const handleFetchApontamentos = async () => {
    setLoading(true);
    try {
      await buscaApontamentos(id).then((response) => {
        setData(response.apontamento);
        setTotalMin(response.totalMinutos);
      });
    } catch (error) {
      addToast({
        type: 'danger',
        title: 'Erro!',
        description: 'Erro ao buscar apontamentos !',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchApontamentos();
  }, []);

  return (
    <div className="principal">
      <Box position={'relative'} sx={{ backgroundColor: '#F2F2F2' }} gap={2}>
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
            title="Apontamentos na Web"
            onBack={() => navigate(-1)}
          />
        </Box>
        <div className="divGeral" style={{ width: '95%', margin: '0 auto' }}>
          <div className="divConsultar">
            <div
              style={{
                display: 'flex',
                width: '100%',
                paddingLeft: '15px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Typography sx={{ textAlign: 'center', color: 'black' }}>
                Colaborador:
              </Typography>
              <Typography
                sx={{
                  textAlign: 'center',
                  color: '#333',
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                {nome}
              </Typography>
            </div>
          </div>
          <Box className="divConsultar">
            <div
              style={{
                display: 'flex',
                width: '100%',
                paddingLeft: '15px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Typography sx={{ textAlign: 'center', color: 'black' }}>
                Total Minutos
              </Typography>
              <Typography
                sx={{
                  textAlign: 'center',
                  color: '#333',
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                {totalMin}
              </Typography>
            </div>
          </Box>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <ModalCadastroInicial
              nome={nome}
              handleFetchApontamentos={AtualizarTabela}
            />
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
          <TableApontamentos
            nome={nome}
            isUsuario={id}
            data={data}
            handleFetchApontamentos={AtualizarTabela}
            loading={loading}
          />
        </Box>
      </Box>
    </div>
  );
}
