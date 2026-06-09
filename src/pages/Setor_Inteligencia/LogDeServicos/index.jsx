import { useCallback, useState } from 'react';
import { getLogServicos } from '@/pages/Setor_Inteligencia/LogDeServicos/logServico.service';
import { useToast } from '@/hooks/toast.hook';
import { useEffect } from 'react';
import LogServicosTabela from '@/components/Tabela/LogServicosTabela';
import { Box, Typography } from '@mui/material';

export default function LogServicos() {
  const [listaLog, setListaLog] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToast } = useToast();

  const handleFetch = useCallback(() => {
    getLogServicos()
      .then((retorno) => {
        setListaLog(retorno.value.log);
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro LogServico',
          description: 'Erro ao carregar TABELA de Log Serviços',
        });
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          textShadow: '-1px -1px 6px #000000',
          color: 'rgb(248, 249, 250)',
          padding: '0 20px',
        }}
      >
        <Typography variant="h4">Situação dos Serviços</Typography>
        <LogServicosTabela data={listaLog} />
      </Box>
    </>
  );
}
