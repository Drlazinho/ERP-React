import React, { useEffect, useState } from 'react'

import { useNavigate, useLocation } from 'react-router'
import {
  Box,
  Tabs,
  Tab,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
} from '@mui/material'
import Amvoxlogopng from '../../assets/Amvoxlogopng.png'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import dayjs from 'dayjs'
import './styles.css'
import { Link } from 'react-router-dom'
import UsuarioGrafico from './Graficos/UsuariosGrafico'
import UserTableLog from './Table/RequisicoesUsarioTable'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import SearchIcon from '@mui/icons-material/Search'
import {
  acumuladosLoginsRequest,
  logsRequest,
} from './logMonitoramento.service'
import debounce from '../../../utils/debounce'
import { InputDateAmvox } from '../../../components/InputDateAmvox/InputDateAmvox'

const Idata = {
  nomeColaborador: null,
  dataInicial: null,
  dataFinal: null,
}

export default function UserMonitoramento() {
  const [value, setValue] = useState('/inteligencia/usermonitoramento')
  const [filtro, setFiltro] = useState(Idata)
  const [dataFiltro, setDataFiltro] = useState({})
  const [data, setData] = useState({})

  const [inputValue, setInputValue] = useState(filtro.nomeColaborador)

  const handleChangeSearch = (e) => {
    const changeValue = e.target.value
    setInputValue(changeValue)
    debounce(() => {
      setFiltro((prev) => ({ ...prev, nomeColaborador: changeValue }))
    })
  }

  const handleClear = () => {
    setFiltro({ dataInicial: null, dataFinal: null, nomeColaborador: '' })
    setInputValue('')
  }

  const handleFetchUserLogs = () => {
    logsRequest(filtro)
      .then((response) => {
        setData(response)
      })
      .catch((_err) => {
      })
  }

  const handleFetchdata = () => {
    acumuladosLoginsRequest(filtro)
      .then((response) => {
        setDataFiltro(response)
      })
      .catch((_err) => {
      })
  }

  useEffect(() => {
    handleFetchUserLogs()
    handleFetchdata()
  }, [filtro])

  const navigate = useNavigate()

  const location = useLocation()

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prevValue) =>
        prevValue === '/inteligencia/usermonitoramento'
          ? '/inteligencia/monitoramento'
          : '/inteligencia/usermonitoramento'
      )
      navigate(
        value === '/inteligencia/usermonitoramento'
          ? '/inteligencia/monitoramento'
          : '/inteligencia/usermonitoramento'
      )
    }, 300000)

    return () => clearInterval(interval)
  }, [navigate, location.pathname])

  useEffect(() => {
    if (location.pathname === '/inteligencia/usermonitoramento') {
      setValue('/inteligencia/usermonitoramento')
    } else {
      setValue('/inteligencia/monitoramento')
    }
  }, [location.pathname])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className="principal">
      <Box padding={5}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => navigate('/inteligencia/')}>
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
            <Box sx={{ ml: '150px', mr: '16px', mt: '-10px' }}>
              <Box sx={{ position: 'absolute', display: 'flex', mt: '-20px' }}>
                Usuário
              </Box>
              <TextField
                variant="outlined"
                placeholder="Pesquisar"
                size="small"
                value={inputValue}
                onChange={handleChangeSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  display: 'flex',
                  height: '30px',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'gray',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'gray',
                  },
                }}
              />
            </Box>
            <Box
              sx={{ maxWidth: '350px', maxHeight: '100px', display: 'flex' }}
            >
              <Box sx={{ position: 'absolute', display: 'flex', mt: '-20px' }}>
                Período
              </Box>
              <Box>
                <InputDateAmvox
                  format='YYYY-MM-DD'
                  value={filtro.dataInicial || ''}
                  label='De'
                  onChange={(date) => { setFiltro({ ...filtro, dataInicial: date }) }}
                />
              </Box>
              <Box>
                <InputDateAmvox
                  format='YYYY-MM-DD'
                  value={filtro.dataFinal || ''}
                  label='Até'
                  onChange={(date) => { setFiltro({ ...filtro, dataFinal: date }) }}
                />
              </Box>
            </Box>
            <IconButton onClick={handleClear}>
              <DeleteForeverIcon sx={{ color: 'red' }} />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box>
            <Typography>Quantidade de Logins</Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                alignSelf: 'stretch',
                boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                mb: '16px',
                borderRadius: '16px',
              }}
            >
              <Box className="user-container">
                <UsuarioGrafico data={dataFiltro} />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              padding: '24px',
              alignSelf: 'stretch',
              borderRadius: '16px',
              bgcolor: '#fff',
              boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
              flexDirection: 'column',
            }}
          >
            <Typography>Requisições por usuário</Typography>
            <Box>
              <UserTableLog data={data} />
            </Box>
          </Box>
        </Box>
      </Box>
      <footer className="footerPage">Amvox 2024</footer>
    </div>
  )
}
