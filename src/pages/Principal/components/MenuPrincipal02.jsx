import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  IconButton,
  Menu,
  Tooltip,
  Typography,
  MenuItem,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ButtonsPagesPrincipal } from './PagesSystem';
import styles from './../styles.module.css';
import { buscarParametrizacaoPage } from '../../Setor_Inteligencia/GerenciamentoDeInformacoes/gerenciamentoDeInformacoes.service';
import { v4 as uuidv4 } from 'uuid';

const MenuPrincipal02 = () => {
  const navigate = useNavigate();
  const [setoresFiltrados, setSetoresFiltrados] = useState([]);
  const [statusCards, setStatusCards] = useState([]);
  const [anchorEl, setAnchorEl] = useState({});

  const open = (index) => Boolean(anchorEl[index]);

  const handleClick = (event, index) => {
    setAnchorEl((prev) => ({ ...prev, [index]: event.currentTarget }));
  };

  const handleClose = (index) => {
    setAnchorEl((prev) => ({ ...prev, [index]: null }));
  };

  useEffect(() => {
    const setoresEspecificos = ButtonsPagesPrincipal.filter((setor) =>
      [
        'comercial',
        'comercialInt',
        'estoque',
        'financeiro',
        'fiscal',
        'importacao',
        'Transporte',
        'posvenda',
        'producao',
        'recepcao',
      ].includes(setor.idNome)
    );

    buscarParametrizacaoPage().then((res) => {
      setStatusCards(res);
    });

    setSetoresFiltrados(setoresEspecificos);
  }, []);

  return (
    <div className={styles.navBar}>
      {setoresFiltrados.map((setor, index) => {
        const uniqueId = setor.id || uuidv4();

        return (
          <Box key={uniqueId}>
            <Tooltip title={setor.setorNome}>
              <IconButton
                onClick={(event) => handleClick(event, index)}
                size="small"
                sx={{
                  color: 'black',
                  ml: 2,
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
                aria-controls={
                  open(index) ? `account-menu-${uniqueId}` : undefined
                }
                aria-haspopup="true"
                aria-expanded={open(index) ? 'true' : undefined}
                data-testid={`botao-${uniqueId}`}
              >
                <Typography
                  sx={{
                    minWidth: 80,
                  }}
                  className={styles.text}
                >
                  {setor.setorNome}
                </Typography>
                <KeyboardArrowDownIcon />
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorEl[index]}
              id={`account-menu-${uniqueId}`}
              open={open(index)}
              onClose={() => handleClose(index)}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              {setor.paginasDoSetor &&
                setor.paginasDoSetor.map((pagina) => {
                  const menuItemId = pagina.id || uuidv4();

                  return (
                    <MenuItem
                      key={menuItemId}
                      data-testid={`menu-item-${menuItemId}`}
                      onClick={(event) => {
                        let toFiltrado = pagina.to.toUpperCase();
                        let resultado = statusCards.find(
                          (item) => item.descricao === toFiltrado
                        );

                        event.stopPropagation();

                        if (resultado && resultado.status === 0) {
                          navigate('/manutencao');
                        } else {
                          navigate(`/${pagina.to}`);
                        }
                      }}
                    >
                      <strong>{pagina.label}</strong>
                    </MenuItem>
                  );
                })}
            </Menu>
          </Box>
        );
      })}
    </div>
  );
};

export default MenuPrincipal02;
