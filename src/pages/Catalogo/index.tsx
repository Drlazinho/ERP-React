import React, { useState } from 'react';
import { FormControl, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import somUm from '../../assets/catalogo/006.jpg';
import somDois from '../../assets/catalogo/007.jpg';
import somTres from '../../assets/catalogo/008.jpg';
import somQuatro from '../../assets/catalogo/009.jpg';
import somCinco from '../../assets/catalogo/010.jpg';
import somSeis from '../../assets/catalogo/011.jpg';
import somSete from '../../assets/catalogo/012.jpg';
import somOito from '../../assets/catalogo/013.jpg';
import somNove from '../../assets/catalogo/014.jpg';
import somDez from '../../assets/catalogo/015.jpg';
import somOnze from '../../assets/catalogo/016.jpg';
import somDoze from '../../assets/catalogo/018.jpg';
import somTreze from '../../assets/catalogo/019.jpg';
import somQuatorze from '../../assets/catalogo/020.jpg';
import somQuinze from '../../assets/catalogo/021.jpg';
import somDezesseis from '../../assets/catalogo/022.jpg';
import somDezessete from '../../assets/catalogo/023.jpg';
import larUm from '../../assets/catalogo/026.jpg';
import larDois from '../../assets/catalogo/027.jpg';
import larTres from '../../assets/catalogo/028.jpg';
import larQuatro from '../../assets/catalogo/029.jpg';
import larCinco from '../../assets/catalogo/030.jpg';
import larSeis from '../../assets/catalogo/032.jpg';
import larSete from '../../assets/catalogo/033.jpg';
import larOito from '../../assets/catalogo/034.jpg';
import larNove from '../../assets/catalogo/035.jpg';
import larDez from '../../assets/catalogo/036.jpg';
import larOnze from '../../assets/catalogo/037.jpg';
import larDoze from '../../assets/catalogo/038.jpg';
import larTreze from '../../assets/catalogo/039.jpg';
import larQuatorze from '../../assets/catalogo/040.jpg';
import larQuinze from '../../assets/catalogo/041.jpg';
import larDezesseis from '../../assets/catalogo/042.jpg';
import larDezessete from '../../assets/catalogo/043.jpg';
import larDezoito from '../../assets/catalogo/044.jpg';
import larDezenove from '../../assets/catalogo/045.jpg';
import larVinte from '../../assets/catalogo/046.jpg';
import climaUm from '../../assets/catalogo/048.jpg';
import climaDois from '../../assets/catalogo/049.jpg';
import climaTres from '../../assets/catalogo/050.jpg';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import HeaderAmvox from '@/components/HeaderAmvox';

interface Product {
  title: string;
  src: string;
}

interface CustomTabPanelProps {
  children?: React.ReactNode;
  index: string | number;
  value: string | number;
}

function CustomTabPanel(props: CustomTabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export function Catalogo() {
  const [categoria, setCategoria] = useState('todos');
  const [filtro, setFiltro] = useState('');
  const navigate = useNavigate();

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setCategoria(newValue);
  };

  const handleBack = () => {
    navigate('/principal/');
  };

  const CatalogoTodos: Product[] = [
    { title: 'ACA1601 Festa II', src: somUm },
    {
      title:
        'ACA1101 DUPLO 8 BLACK | ACA2201 PESADÃO BLACK | ACA1402 TITAN BLACK',
      src: somDois,
    },
    { title: 'ACA1101 DUPLO 8 BLACK | ACA2201 PESADÃO BLACK', src: somTres },
    { title: 'ACA1402 TITAN BLACK', src: somQuatro },
    { title: 'AHP01 ONE', src: somCinco },
    { title: 'AHP01 ONE', src: somSeis },
    { title: 'ACA2900 NEW X', src: somSete },
    { title: 'ACA600 BAGVOX', src: somOito },
    { title: 'ACA221 GIGANTE II | ACA480 VIPER II | ACA255 HIT', src: somNove },
    { title: 'ACA550 STRONDO II | ACA800 GLADIADOR', src: somDez },
    { title: 'ACA2000 PARTY VOX PRIME | ACA1100 DEZOITÃO', src: somOnze },
    { title: 'ACA1300 NEW X | ACA1900 NEW X', src: somDoze },
    { title: 'ACA251 NEW X | ACA1000 NEW X', src: somTreze },
    { title: 'ASB0201 SOUNDBAR', src: somQuatorze },
    { title: 'ASB0201 SOUNDBAR', src: somQuinze },
    {
      title: 'AHP0812 BOOSTER X GAMER | AHP0608 BOOSTER X SPORT',
      src: somDezesseis,
    },
    { title: 'AHP2401 BOOSTER X | AHP1209 BOOSTER X', src: somDezessete },
    { title: 'ARF1412 OVEN AIRFRYER', src: larUm },
    { title: 'ARF1255 M BLACK | ARF1255 M INOX AIRFRYER', src: larDois },
    { title: 'ARF1250 AIR FRYER', src: larTres },
    {
      title:
        'ARF1222 - 2 EM 1 AIR FRYER OVEN | ARF1255 AIR FRYER | AES350 ESPREMEDOR DE FRUTAS',
      src: larQuatro,
    },
    {
      title:
        'ARF1205 AIR FRYER | ARF1245 AIR FRYER | AMS800 SANDUICHEIRA E GRILL',
      src: larCinco,
    },
    { title: 'APR400 MIXER', src: larSeis },
    { title: 'AMG113 MÁQUINA DE GELO', src: larSete },
    { title: 'ALQ0209 LIQUIDIFICADOR', src: larOito },
    { title: 'ACF227 INOX CAFETEIRA | ACF 927 INOX CAFETEIRA', src: larNove },
    { title: 'AKL0150 CHALEIRA ELÉTRICA', src: larDez },
    { title: 'APS050 PANELA DE PRESSÃO ELÉTRICA', src: larOnze },
    { title: 'AFC1000 FECHADURA ELETRÔNICA', src: larDoze },
    {
      title: 'AFC1000 FECHADURA ELETRÔNICA | AFC 2000 FECHADURA ELETRÔNICA',
      src: larTreze,
    },
    { title: 'ASP060 MOP ELÉTRICO', src: larQuatorze },
    { title: 'ASP1101 ASPIRADOR DE PÓ - 2 EM 1', src: larQuinze },
    {
      title:
        'AF1907 FERRO A SECO | AF2110 FERRO CERÂMICO | AF1606 FERRO A VAPOR | AF006 FERRO VERTICAL',
      src: larDezesseis,
    },
    {
      title: 'ABB510 BLACK BEBEDOURO | ABB510 BRANCO BEBEDOURO',
      src: larDezessete,
    },
    {
      title:
        'APR1001 BLACK MINI PROCESSADOR | APR1001 RED MINI PROCESSADOR | ABB240 BEBEDOURO | ABB240 BLACK BEBEDOURO',
      src: larDezoito,
    },
    {
      title:
        'AMS500 RED SANDUICHEIRA | AMS500 BLACK SANDUICHEIRA | AMS370 BLACK SANDUICHEIRA | AMS370 RED SANDUICHEIRA',
      src: larDezenove,
    },
    { title: 'APC027 PIPOQUEIRA ELÉTRICA', src: larVinte },
    { title: 'ACL130 CLIMATIZADOR', src: climaUm },
    {
      title:
        'ACL9022 CLIMATIZADOR | ACL9022 BRANCO CLIMATIZADOR | ACL4022 - BRANCO CLIMATIZADOR',
      src: climaDois,
    },
    {
      title: 'ACL018 BRANCO CLIMATIZADOR | ACL018 CLIMATIZADOR',
      src: climaTres,
    },
  ];

  const CatalogoSom: Product[] = [
    { title: 'ACA1601 Festa II', src: somUm },
    {
      title:
        'ACA1101 DUPLO 8 BLACK | ACA2201 PESADÃO BLACK | ACA1402 TITAN BLACK',
      src: somDois,
    },
    { title: 'ACA1101 DUPLO 8 BLACK | ACA2201 PESADÃO BLACK', src: somTres },
    { title: 'ACA1402 TITAN BLACK', src: somQuatro },
    { title: 'AHP01 ONE', src: somCinco },
    { title: 'AHP01 ONE', src: somSeis },
    { title: 'ACA2900 NEW X', src: somSete },
    { title: 'ACA600 BAGVOX', src: somOito },
    { title: 'ACA221 GIGANTE II | ACA480 VIPER II | ACA255 HIT', src: somNove },
    { title: 'ACA550 STRONDO II | ACA800 GLADIADOR', src: somDez },
    { title: 'ACA2000 PARTY VOX PRIME | ACA1100 DEZOITÃO', src: somOnze },
    { title: 'ACA1300 NEW X | ACA1900 NEW X', src: somDoze },
    { title: 'ACA251 NEW X | ACA1000 NEW X', src: somTreze },
    { title: 'ASB0201 SOUNDBAR', src: somQuatorze },
    { title: 'ASB0201 SOUNDBAR', src: somQuinze },
    {
      title: 'AHP0812 BOOSTER X GAMER | AHP0608 BOOSTER X SPORT',
      src: somDezesseis,
    },
    { title: 'AHP2401 BOOSTER X | AHP1209 BOOSTER X', src: somDezessete },
  ];

  const CatalogoLar: Product[] = [
    { title: 'ARF1412 OVEN AIRFRYER', src: larUm },
    { title: 'ARF1255 M BLACK | ARF1255 M INOX AIRFRYER', src: larDois },
    { title: 'ARF1250 AIR FRYER', src: larTres },
    {
      title:
        'ARF1222 - 2 EM 1 AIR FRYER OVEN | ARF1255 AIR FRYER | AES350 ESPREMEDOR DE FRUTAS',
      src: larQuatro,
    },
    {
      title:
        'ARF1205 AIR FRYER | ARF1245 AIR FRYER | AMS800 SANDUICHEIRA E GRILL',
      src: larCinco,
    },
    { title: 'APR400 MIXER', src: larSeis },
    { title: 'AMG113 MÁQUINA DE GELO', src: larSete },
    { title: 'ALQ0209 LIQUIDIFICADOR', src: larOito },
    { title: 'ACF227 INOX CAFETEIRA | ACF 927 INOX CAFETEIRA', src: larNove },
    { title: 'AKL0150 CHALEIRA ELÉTRICA', src: larDez },
    { title: 'APS050 PANELA DE PRESSÃO ELÉTRICA', src: larOnze },
    { title: 'AFC1000 FECHADURA ELETRÔNICA', src: larDoze },
    {
      title: 'AFC1000 FECHADURA ELETRÔNICA | AFC 2000 FECHADURA ELETRÔNICA',
      src: larTreze,
    },
    { title: 'ASP060 MOP ELÉTRICO', src: larQuatorze },
    { title: 'ASP1101 ASPIRADOR DE PÓ - 2 EM 1', src: larQuinze },
    {
      title:
        'AF1907 FERRO A SECO | AF2110 FERRO CERÂMICO | AF1606 FERRO A VAPOR | AF006 FERRO VERTICAL',
      src: larDezesseis,
    },
    {
      title: 'ABB510 BLACK BEBEDOURO | ABB510 BRANCO BEBEDOURO',
      src: larDezessete,
    },
    {
      title:
        'APR1001 BLACK MINI PROCESSADOR | APR1001 RED MINI PROCESSADOR | ABB240 BEBEDOURO | ABB240 BLACK BEBEDOURO',
      src: larDezoito,
    },
    {
      title:
        'AMS500 RED SANDUICHEIRA | AMS500 BLACK SANDUICHEIRA | AMS370 BLACK SANDUICHEIRA | AMS370 RED SANDUICHEIRA',
      src: larDezenove,
    },
    { title: 'APC027 PIPOQUEIRA ELÉTRICA', src: larVinte },
  ];

  const CatalogoClima: Product[] = [
    { title: 'ACL130 CLIMATIZADOR', src: climaUm },
    {
      title:
        'ACL9022 CLIMATIZADOR | ACL9022 BRANCO CLIMATIZADOR | ACL4022 - BRANCO CLIMATIZADOR',
      src: climaDois,
    },
    {
      title: 'ACL018 BRANCO CLIMATIZADOR | ACL018 CLIMATIZADOR',
      src: climaTres,
    },
  ];

  const listas: Record<string, Product[]> = {
    audio: CatalogoSom,
    lar: CatalogoLar,
    clima: CatalogoClima,
    todos: CatalogoTodos,
  };

  const produtosFiltradosPorCategoria: Product[] = listas[categoria] || [];

  const produtosFiltrados: Product[] = filtro
    ? CatalogoTodos.filter((produto) =>
        produto.title.toUpperCase().includes(filtro.toUpperCase())
      )
    : listas[filtro] || [];

  return (
    <div style={{ background: 'rgb(39, 38, 38)' }}>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', bgcolor: '#c2c2c2' }}
      >
        <HeaderAmvox title={'Bem vindos ao catálogo Amvox 2024'} />
      </Box>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <FormControl
          variant="filled"
          sx={{ background: '#fff', borderRadius: 2, width: '90%' }}
        >
          <TextField
            type="text"
            variant="filled"
            label="Nome Do Produto"
            size="small"
            value={filtro}
            onChange={(e) => {
              setFiltro(e.target.value);
            }}
          />
        </FormControl>
        <Tabs
          value={categoria}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="basic tabs example"
          sx={{ background: '#fff', borderRadius: 2 }}
        >
          <Tab value={'todos'} label="Todos" />
          <Tab value={'audio'} label="Áudio" />
          <Tab value={'lar'} label="Lar" />
          <Tab value={'clima'} label="Clima" />
        </Tabs>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleBack}
        startIcon={<KeyboardBackspaceIcon />}
      >
        Voltar para p/ Home
      </Button>

      <CustomTabPanel value={categoria} index={categoria}>
        <Box>
          {produtosFiltrados &&
            produtosFiltrados.map((i, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '2rem',
                    color: 'white',
                    marginTop: '45px',
                    marginBottom: '15px',
                    textAlign: 'center',
                  }}
                >
                  {i.title}
                </span>
                <img style={{ width: '70%', height: '70%' }} src={i.src} />
              </div>
            ))}
          {filtro.length == 0 &&
            produtosFiltradosPorCategoria.map((i, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '2rem',
                    color: 'white',
                    marginTop: '45px',
                    marginBottom: '15px',
                    textAlign: 'center',
                  }}
                >
                  {i.title}
                </span>
                <img style={{ width: '70%', height: '70%' }} src={i.src} />
              </div>
            ))}
        </Box>
      </CustomTabPanel>
    </div>
  );
}
