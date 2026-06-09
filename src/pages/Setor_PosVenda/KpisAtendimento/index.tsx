import { useState, useCallback, ChangeEvent, useEffect } from 'react';
import HeaderAmvox from '@/components/HeaderAmvox';
import DateSelectAmvox from '@/components/DateSelectAmvox';
import { Box, Tab, Tabs } from '@mui/material';
import { FaWhatsapp } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa6';
import TabelaWhatsApp from './components/TabelaWhatsApp';
import TabelaTelefone from './components/TabelaTelefone';
import TabelaMediaGeral from './components/TabelaMediaGeral';
import ModalRegistrar from './components/ModalRegistrar';
import { useFetchAtendimento } from './hooks/useFetchAtendimento';
import { useFetchMedias } from './hooks/useFetchMedias';
import { useToast } from '@/hooks/toast.hook';
import { isAxiosError } from 'axios';
import SelectAmvox from '@/components/SelectAmvox';
//import { ButtonClear } from '@/components/ButtonAmvox/ButtonsAmvox';
import { useQuery } from '@tanstack/react-query';
import { GetUsuarios } from './KpiAtendimento.service';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

interface FiltroState {
  mes: number;
  ano: number;
  idMeioComunicacao: number;
  idUsuario: number | null;
}

const KpisAtendimento = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [filtro, setFiltro] = useState<FiltroState>({
    mes: new Date().getMonth() + 1,
    ano: new Date().getFullYear(),
    idMeioComunicacao: 1,
    idUsuario: null,
  });
  const addToast = useToast();
  const { email } = useUsuarioLocal();
  const { data, loading, error, isError } = useFetchAtendimento(filtro);
  const { medias, loadingMedias } = useFetchMedias(filtro);

  useEffect(() => {
    if (isError && error) {
      let errorMessage = 'Erro ao buscar atendimentos';

      if (isAxiosError(error) && error.response?.data) {
        const data = error.response.data;

        if (typeof data === 'object' && data !== null) {
          errorMessage =
            ('title' in data && typeof data.title === 'string' && data.title) ||
            JSON.stringify(data);
        } else {
          errorMessage = JSON.stringify(data);
        }
      }

      addToast({
        type: 'danger',
        title: 'Erro ao buscar atendimentos',
        description: errorMessage,
      });
    }
  }, [isError, error, addToast]);

  const { data: agentes = [] } = useQuery<{ id: number; nome: string }[]>({
    queryKey: ['agentes', email],
    queryFn: () => GetUsuarios(email),
  });

  const handleTabChange = (_event: unknown, newValue: number) => {
    setTabIndex(newValue);
    setFiltro((prev) => ({
      ...prev,
      idMeioComunicacao: newValue === 0 ? 1 : 2,
    }));
  };

  const handleChangeMes = useCallback((value: number) => {
    setFiltro((prev) => ({ ...prev, mes: value }));
  }, []);

  const handleYearChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFiltro((prev) => ({ ...prev, ano: Number(e.target.value) }));
  }, []);

  const handleClear = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    setFiltro({
      mes: new Date().getMonth() + 1,
      ano: new Date().getFullYear(),
      idMeioComunicacao: 1,
      idUsuario: null,
    });
  };

  return (
    <Box sx={{ px: 2 }}>
      <Box
        sx={(theme) => ({
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
          },
        })}
      >
        <HeaderAmvox title="KPI's de Atendimento" />
        <ModalRegistrar />
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          margin: '20px 0',
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#fff',
          boxShadow: '0px 1px 3px 0px #ccc',
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            width: '100%',
            marginLeft: '20px',
            '& .MuiTab-root': {
              flexDirection: 'row',
              alignItems: 'center',
              gap: '8px',
              minHeight: 'auto',
              padding: '8px 16px',
              fontSize: '0.875rem',
              textTransform: 'none',
              color: '#666',
              '&.Mui-selected': {
                color: 'red',
                fontWeight: 'bold',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'red',
            },
            '& .MuiTab-iconWrapper': {
              margin: 0,
              fontSize: '1.5rem',
              '&.Mui-selected': {
                color: 'red',
              },
            },
          }}
        >
          <Tab label=" WhatsApp" icon={<FaWhatsapp />} />
          <Tab label="Telefone" icon={<FaPhone />} />
          <Tab label="Média Geral" icon={<AutoGraphIcon />} />
        </Tabs>
      </Box>
      <Box
        component={'form'}
        onSubmit={handleClear}
        sx={(theme) => ({
          mt: 2,
          display: 'flex',
          gap: 2,
          [theme.breakpoints.down(1150)]: {
            flexDirection: 'column',
          },
        })}
      >
        <DateSelectAmvox
          handleSelectedMes={handleChangeMes}
          selectedMes={filtro.mes}
          selectedYear={filtro.ano}
          handleYearChange={handleYearChange}
        />
        <SelectAmvox<{ id: number; nome: string }>
          label="Agente"
          options={agentes || []}
          getOptionLabel={(option) => option.nome}
          onChange={(_event, newValue) => {
            setFiltro({ ...filtro, idUsuario: newValue?.id || null });
          }}
          sx={{ width: '100%' }}
        />
        {/* <ButtonClear type="submit" sx={{ width: '50%' }} /> */}
      </Box>

      <Box sx={{ mt: 2 }}>
        {tabIndex === 0 ? (
          <TabelaWhatsApp data={data} loading={loading} />
        ) : tabIndex === 1 ? (
          <TabelaTelefone data={data} loading={loading} />
        ) : (
          <TabelaMediaGeral data={medias} loading={loadingMedias} />
        )}
      </Box>
    </Box>
  );
};

export default KpisAtendimento;
