import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { ButtonsPagesPrincipal } from '../../../pages/Principal/components/PagesSystem';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, MenuItem, Tooltip, Menu } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const MenuLateralIcons = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [setoresFiltrados, setSetoresFiltrados] = useState(
    ButtonsPagesPrincipal
  );

  const [anchorEl, setAnchorEl] = useState({});
  const open = (index) => Boolean(anchorEl[index]);

  const handleClick = (event, index) => {
    setAnchorEl((prev) => ({ ...prev, [index]: event.currentTarget }));
  };

  const handleClose = (index) => {
    setAnchorEl((prev) => ({ ...prev, [index]: null }));
  };

  return (
    <div>
      <Box
        sx={{
          backgroundColor: '#fff',
          width: '40px',
          height: '100vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            width: '0px',
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }}
      >
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1,
            marginBottom: 2,
          }}
        >
          <IconButton
            onClick={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(!isOpen)}
          >
            <MenuIcon sx={{ color: '#333', fontSize: '1.5rem' }} />
          </IconButton>
          <IconButton
            onClick={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(!isOpen)}
          >
            <SearchIcon sx={{ color: '#333', fontSize: '1.5rem' }} />
          </IconButton>
        </Box>
        <Box>
          {setoresFiltrados.map((setor, index) => {
            const isActive =
              location.pathname === `/${setor.to}` ||
              setor.paginasDoSetor?.some(
                (pagina) => location.pathname === `/${pagina.to}`
              );

            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  marginBottom: 2,
                }}
              >
                <Tooltip title={setor.setorNome} placement="right-start">
                  <IconButton
                    key={setor.idNome}
                    onClick={(event) => {
                      handleClick(event, index);
                      if (setor.to) navigate(`/${setor.to}`);
                    }}
                    sx={{
                      color: isActive ? '#AA0000' : '#333',
                      fontSize: '1.5rem',
                      '&:hover': {
                        cursor: 'pointer',
                        backgroundColor: 'transparent',
                        color: '#AA0000',
                        transition: 'all 0.1s ease-in-out',
                      },
                    }}
                  >
                    {setor.img}
                  </IconButton>
                </Tooltip>

                <Menu
                  anchorEl={anchorEl[index]}
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
                      return (
                        <MenuItem
                          key={pagina.label}
                          onClick={() => {
                            navigate(`/${pagina.to}`);
                          }}
                          sx={{
                            textAlign: 'center',
                            backgroundColor: '#fff',
                            color: '#333',
                            '&:hover': {
                              backgroundColor: '#e0e0e0',
                              color: '#AA0000',
                              padding: '10px',
                              transform: 'scale(0.9)',
                              transition: 'transform 0.3s ease-in-out',
                              borderRadius: '10px',
                              zIndex: 1,
                              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                            },
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
        </Box>
      </Box>
    </div>
  );
};

export default MenuLateralIcons;
