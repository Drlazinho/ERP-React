import { useCallback, useEffect, useMemo, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { NavLink, useLocation } from 'react-router-dom';
import './style.css';
import { Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import useUsuarioLocal from '../../../hooks/usuarioLocal.hook';
import { ButtonsPagesPrincipal } from '../../../pages/Principal/components/PagesSystem';
import { BsChevronCompactUp } from 'react-icons/bs';
import { Box, IconButton, InputBase, Paper, Button } from '@mui/material';
import MenuLateralIcons from '../MenuLateralIcons';

const Menu = (item, index, filtro, filterOpenSubmenu) => {
  const location = useLocation();
  const linkAtivo = useMemo(() => {
    return item.to === item.active;
  }, [item]);

  const itemCorrespondeAoFiltro =
    item.setorNome.toLowerCase().includes(filtro.toLowerCase()) ||
    (item.paginasDoSetor &&
      item.paginasDoSetor.some((subItem) =>
        subItem.label.toLowerCase().includes(filtro.toLowerCase())
      ));

  if (!itemCorrespondeAoFiltro) {
    return null; // Não renderizar o item se não corresponder ao filtro
  }

  const linkAtivoSetor =
    location.pathname === `/${item.to}` ||
    item.paginasDoSetor?.some(
      (pagina) => location.pathname === `/${pagina.to}`
    );

  return (
    <div className="d-flex w-100" key={index}>
      <div
        className="setorColorItemMenu"
        style={{ background: item.setorColor }}
      ></div>
      <div className={`menu-item ${linkAtivo && 'menu-item-ativo'}`}>
        <NavLink to={item.to && `/${item.to}`} disabled={!item.to}>
          {({ isActive }) => {
            const [open, setOpen] = useState(false);

            return (
              <>
                <button
                  type="button"
                  className={
                    linkAtivoSetor ? 'link-btn-active' : 'link-btn-inactive'
                  }
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  <div className="data">
                    <div
                      className="img"
                      style={{
                        color: linkAtivoSetor ? '#AA0000' : '#333',
                      }}
                    >
                      <p>{item.img}</p>
                    </div>
                    <p style={{ color: linkAtivoSetor ? '#AA0000' : '' }}>
                      {item.setorNome}
                    </p>
                  </div>
                  {!item.to && (
                    <BsChevronCompactUp
                      className={
                        !open
                          ? 'chevron-submenu-opened'
                          : 'chevron-submenu-closed'
                      }
                    />
                  )}
                </button>

                <div className="submenu-drop">
                  {item.paginasDoSetor.map((item, index) => (
                    <NavLink
                      key={index}
                      to={`/${item.to}`}
                      className={
                        !open && !filterOpenSubmenu && 'submenu-invisible'
                      }
                    >
                      {({ isActive }) => (
                        <button
                          type="button"
                          className={
                            isActive ? 'link-btn-active' : 'link-btn-inactive'
                          }
                        >
                          <div className="data">
                            <p className="labelPage">{item.label}</p>
                          </div>
                        </button>
                      )}
                    </NavLink>
                  ))}
                </div>
              </>
            );
          }}
        </NavLink>
      </div>
    </div>
  );
};

const SidebarNovo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [filtro, setFiltro] = useState('');
  const [filterOpenSubmenu, setFilterOpenSubmenu] = useState(false);
  const { setor } = useUsuarioLocal();

  // Manipulador para atualizar o estado do filtro
  const handleFiltroChange = (e) => {
    setFilterOpenSubmenu(true);
    setFiltro(e.target.value);
  };

  return (
    <Box className={`${isOpen ? 'sidebar-open-dad' : 'sidebar-close-dad'}`}>
      <Box
        className={`sidebar-novo ${isOpen ? 'sidebar-open' : 'sidebar-close'}`}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Box className="buttonsMenuSidebar">
          <Tooltip title="Menu">
            <Box
              className={setor === 12 ? 'clip-path-disabled' : 'clip-path'}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen && <GiHamburgerMenu color="#333333" size={24} />}
            </Box>
          </Tooltip>
        </Box>
        <Paper
          component={'form'}
          sx={{ width: '80%', display: 'flex', flexDirection: 'row', ml: 4 }}
        >
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder="Pesquisar Página"
            inputProps={{ 'aria-label': 'pesquisar página' }}
            value={filtro}
            onChange={handleFiltroChange}
            size="small"
          />
          <IconButton
            type="button"
            sx={{ p: '10px' }}
            aria-label="search"
            onClick={() => {
              setFilterOpenSubmenu(false);
              setFiltro('');
            }}
          >
            {filtro !== '' ? <CloseIcon /> : <SearchIcon />}
          </IconButton>
        </Paper>
        <Box id="links">
          <Box className="menu">
            {ButtonsPagesPrincipal.map((item, index) =>
              Menu(item, index, filtro, filterOpenSubmenu)
            )}
          </Box>
        </Box>
      </Box>

      {!isOpen && (
        <MenuLateralIcons isOpen={isOpen} setIsOpen={setIsOpen} setor={setor} />
      )}
    </Box>
  );
};

export default SidebarNovo;
