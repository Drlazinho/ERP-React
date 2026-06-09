import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import LayoutNovo from '@/components/LayoutNovo';
import { useEffect, useState } from 'react';
import { GetChamadosXSolicitantes } from '@/services/chamados/chamadosX.service';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import ModalCadastro from './Components/ModalCadastro';
import TableMeusChamados from './Components/Table';
import HeaderAmvox from '@/components/HeaderAmvox';
import SelectAmvox from '@/components/SelectAmvox';

const filtros = [
  { id: 0, nome: 'Todos' },
  { id: 1, nome: 'Fechado' },
  { id: 2, nome: 'Aberto' },
];

export default function MeusChamadosRemake() {
  const navigate = useNavigate();
  const { email } = useUsuarioLocal();
  const [data, setData] = useState([]);
  const [filtroAtivo, setFiltroAtivo] = useState(0);

  const atualizarTabela = () => {
    handleChamados(filtroAtivo);
  };

  const handleChamados = (statusId) => {
    setFiltroAtivo(statusId);
    GetChamadosXSolicitantes(email, statusId).then((res) => {
      setData(res);
    });
  };

  useEffect(() => {
    handleChamados(0);
  }, []);

  return (
    <LayoutNovo>
      <Box sx={{ position: 'relative', padding: '0 30px' }}>
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
            title="Help Amvox - Meus Chamados"
            onBack={() => navigate(-1)}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            mb: '16px',
            gap: '32px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '8px',
              bgcolor: 'white',
              width: '100%',
              borderRadius: '16px',
              padding: '12px',
            }}
          >
            <Typography variant="body1">Filtros: </Typography>
            {filtros.map((item) => (
              <Button
                key={item.id}
                variant="contained"
                onClick={() => handleChamados(item.id)}
                sx={{
                  borderRadius: '16px',
                  bgcolor: filtroAtivo === item.id ? '#1976d2' : '#E3E3E3',
                  color: filtroAtivo === item.id ? '#FFF' : '#333',
                  textTransform: 'capitalize',
                }}
              >
                {item.nome}
              </Button>
            ))}
          </Box>
          <Box>
            <ModalCadastro handleChamados={() => handleChamados(filtroAtivo)} />
          </Box>
        </Box>

        <Box>
          <TableMeusChamados dadosTabela={data} upDate={atualizarTabela} />
        </Box>
      </Box>
    </LayoutNovo>
  );
}
