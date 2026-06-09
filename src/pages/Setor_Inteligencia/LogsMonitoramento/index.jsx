import { useEffect, useState } from 'react';
import './styles.css';

import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router';

import Amvoxlogopng from '../../assets/Amvoxlogopng.png';
import Dot from '../../assets/dot.png';

import {
  Box,
  IconButton,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LogsTable from './Table/LogsTable';
import ErrosTable from './Table/ErrosTable';
import ReqGrafico from './Graficos/ReqGrafico';
import DonutGrafico from './Graficos/DonutGrafico';
import ColunaGrafico from './Graficos/ColunasGrafico';
import TopEndPointsTable from './Table/TopEndPointsTable';
import PagesTable from './Table/PagesTable';
import { indicadoresRequest } from './logMonitoramento.service';
import { InputDateAmvox } from '../../../components/InputDateAmvox/InputDateAmvox';

const Idata = {
  qtdLogsPeriodo: null,
  qtdLogsErroPeriodo: null,
  qtdUsuariosAtivosPeriodo: null,
};

export default function LogsMonitoramento() {
  const [value, setValue] = useState('/inteligencia/monitoramento');

  const [data, setData] = useState(Idata);

  const handleFetchStatus = () => {
    indicadoresRequest({})
      .then((response) => {
        setData(response);
      })
      .catch((err) => {
      });
  };

  useEffect(() => {
    handleFetchStatus();
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prevValue) =>
        prevValue === '/inteligencia/monitoramento'
          ? '/inteligencia/usermonitoramento'
          : '/inteligencia/monitoramento'
      );
      navigate(
        value === '/inteligencia/monitoramento'
          ? '/inteligencia/usermonitoramento'
          : '/inteligencia/monitoramento'
      );
    }, 300000);

    return () => clearInterval(interval);
  }, [navigate, location.pathname]);

  useEffect(() => {
    if (location.pathname === '/inteligencia/usermonitoramento') {
      setValue('/inteligencia/usermonitoramento');
    } else {
      setValue('/inteligencia/monitoramento');
    }
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="principal">
      <Box
        sx={{
          display: 'flex',
          minWidth: '100%',
          minHeight: '100%',
          flexDirection: 'column',
          padding: 6,
          alignSelf: 'stretch',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignSelf: 'stretch',
          }}
        >
          <IconButton
            onClick={() => {
              navigate('/inteligencia/');
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <img src={Amvoxlogopng} alt="Amvox" className="imgAmvox" />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box className="poppins-bold" sx={{ mr: '400px' }}>
              Monitoramento
            </Box>
            <Box>
              <Tabs
                value={location.pathname}
                onChange={handleChange}
                textColor="black"
                sx={{
                  '& .MuiTabs-indicator': {
                    backgroundColor: 'black',
                  },
                }}
                aria-label="secondary tabs example"
              >
                <Tab
                  label="Geral"
                  sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}
                  value="/inteligencia/monitoramento"
                  component={Link}
                  to="/inteligencia/monitoramento"
                />
                <Tab
                  label="Usuários"
                  sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}
                  value="/inteligencia/usermonitoramento"
                  component={Link}
                  to="/inteligencia/usermonitoramento"
                />
              </Tabs>
            </Box>
            <Box
              sx={{
                maxWidth: '350px',
                maxHeight: '100px',
                display: 'flex',
                ml: '445px',
              }}
            >
              <Box sx={{ position: 'absolute', display: 'flex', mt: '-20px' }}>
                Período
              </Box>
              <Box>
                <InputDateAmvox
                  format="YYYY-MM-DD"
                  value={''}
                  label="De"
                  onChange={(date) => {
                  }}
                />{' '}
              </Box>
              <Box>
                <InputDateAmvox
                  format="YYYY-MM-DD"
                  value={''}
                  label="Até"
                  onChange={(date) => {
                  }}
                />{' '}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Typography>Status Codes</Typography>
            <Box sx={{ display: 'flex' }}>
              <Box className="cardStatudCode">
                <Typography className="fontCardStatus">2xx</Typography>
                <Typography
                  className="fontCardStatusNumber"
                  color={'#344BFD'}
                  variant="h4"
                >
                  0
                </Typography>
              </Box>
              <Box className="cardStatudCode">
                <Typography className="fontCardStatus">3xx</Typography>
                <Typography
                  className="fontCardStatusNumber"
                  color={'#FB0'}
                  variant="h4"
                >
                  0
                </Typography>
              </Box>
              <Box className="cardStatudCode">
                <Typography className="fontCardStatus">4xx</Typography>
                <Typography
                  className="fontCardStatusNumber"
                  color={'#F77D26'}
                  variant="h4"
                >
                  0
                </Typography>
              </Box>
              <Box className="cardStatudCode">
                <Typography className="fontCardStatus">5xx</Typography>
                <Typography
                  className="fontCardStatusNumber"
                  color={'#FB0102'}
                  variant="h4"
                >
                  0
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Box className="cardStatudCode" sx={{ flexDirection: 'row' }}>
                <PeopleAltOutlinedIcon />
                <img src={Dot} />
                <Typography className="fontCardStatus" variant="h5">
                  {data.qtdUsuariosAtivosPeriodo}
                </Typography>
              </Box>
              <Box className="cardStatudCode">
                <Typography className="fontCard">Apdex Score</Typography>
                <Typography color={'green'} variant="h5">
                  0
                </Typography>
              </Box>
              <Box className="cardStatudCode">
                <Typography className="fontCard">Tempo médio</Typography>
                <Typography className="fontCardStatus" variant="h5">
                  0
                </Typography>
              </Box>
              <Box className="cardStatudCode">
                <Typography className="fontCard">Requisições totais</Typography>
                <Typography className="fontCardStatus" variant="h5">
                  {data.qtdLogsPeriodo}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box className="cardGrafReqEnd" sx={{ display: 'flex' }}>
              <Typography className="fontCardTitle">Requisições</Typography>
              <Box
                sx={{
                  display: 'flex',
                  ml: '120px',
                }}
              >
                <DonutGrafico />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Box className="cardCarregamento" sx={{ display: 'flex' }}>
              <PagesTable />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
          }}
        >
          <Box className="cardGrafReqEnd" sx={{ display: 'flex' }}>
            <Typography className="fontCardTitle">
              Acessos nos últimos 7 dias
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <ReqGrafico />
            </Box>
          </Box>
          <Box
            className="cardGrafReqEnd"
            sx={{ display: 'flex', width: '100%' }}
          >
            <Typography className="fontCardTitle">
              Requisições por setor
            </Typography>
            <Box
              sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
            >
              <ColunaGrafico />
            </Box>
          </Box>
          <Box
            className="cardGrafReqEnd"
            sx={{ display: 'flex', width: '100%' }}
          >
            <Typography className="fontCardTitle">Top Endpoints</Typography>
            <TopEndPointsTable />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            mt: '16px',
            width: '100%',
            height: '420px',
          }}
        >
          <Box
            className="cardLogs"
            sx={{ display: 'flex', width: '100%', mr: '24px' }}
          >
            <Typography className="fontCardTitle">Logs</Typography>
            <LogsTable />
          </Box>
          <Box className="cardErros" sx={{ display: 'flex' }}>
            <Typography className="fontCardTitle">Erros</Typography>
            <ErrosTable />
          </Box>
        </Box>
      </Box>
      <footer className="footerPage">Amvox 2024</footer>
    </div>
  );
}
