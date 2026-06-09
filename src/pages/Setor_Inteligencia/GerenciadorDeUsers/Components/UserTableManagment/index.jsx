import React, { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import LockResetIcon from '@mui/icons-material/LockReset';
import { Box, Button, Tooltip } from '@mui/material';

const UserTableManagment = ({
  data,
  bloquearUsuario,
  handleModalUpdateUsuario,
  updateSenhaUsuario,
}) => {
  const formattedData = data.map((item) => ({
    id: item.id,
    nome: item.nome,
    email: item.email,
    setor: item.setor,
    nivel: item.nivel,
    statusPerfil: item.nivel.id !== 0 ? 'Ativo' : 'Bloqueado',
  }));
  
  const columns = useMemo(
    () => [
      {
        accessorKey: 'nome',
        header: 'Nome',
        size: 150,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 200,
      },
      {
        accessorKey: 'setor',
        header: 'Setor',
        size: 150,
        Cell: ({ cell }) => (
          <>
            <Box>
              {cell.row.original.setor.id} - {cell.row.original.setor.setor}
            </Box>
          </>
        ),
      },
      {
        accessorKey: 'nivel',
        header: 'Nível',
        size: 150,
        Cell: ({ cell }) => (
          <>
            <Box>
              {cell.row.original.nivel.id} - {cell.row.original.nivel.nivel}
            </Box>
          </>
        ),
      },
      {
        accessorKey: 'statusPerfil',
        header: 'Status Perfil',
        size: 150,
        Cell: ({ cell }) => {
          const row = cell.row.original;
          return (
            <>
              <div
                style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}
              >
                <Button
                  variant="contained"
                  sx={{
                    textTransform: 'capitalize',
                    bgcolor: ` ${
                      cell.row.original.nivel.id === 0 ? '#d9534f' : '#5bc0de'
                    }`,
                    fontFamily: 'Poppins, sans-serif',
                    transition:
                      'background-color 0.5s ease, transform 0.3s ease-in-out',
                    '&:hover': {
                      bgcolor: ` ${
                        cell.row.original.nivel.id === 0 ? '#d9534f' : '#5bc0de'
                      }`,
                      transform: 'scale(1.1)',
                      fontFamily: 'Poppins, sans-serif',
                      transition:
                        'background-color 0.5s ease, transform 0.3s ease-in-out',
                    },
                  }}
                  size="small"
                  onClick={() => handleModalUpdateUsuario(row)}
                >
                  Atualizar
                </Button>
                {cell.getValue() === 'Ativo' ? (
                  <Tooltip title="Usuário LIBERADO para Gestão Web" arrow>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: '#52bf90',
                        '&:hover': {
                          bgcolor: '#419873',
                          color: '#FFF',
                          transform: 'scale(1.1)',
                          fontFamily: 'Poppins, sans-serif',
                          transition:
                            'background-color 0.5s ease, transform 0.3s ease-in-out',
                        },
                      }}
                      size="small"
                      onClick={() => bloquearUsuario(row)}
                    >
                      <LockOpenIcon />
                    </Button>
                  </Tooltip>
                ) : (
                  <Tooltip title="Usuário BLOQUEADO para Gestão Web" arrow>
                    <Button variant="text" color="error" size="small" disabled>
                      <LockPersonIcon sx={{ color: '#A00' }} />
                    </Button>
                  </Tooltip>
                )}
              </div>
            </>
          );
        },
      },
      {
        accessorKey: 'id',
        header: 'Redefinir Senha',
        size: 250,
        Cell: ({ cell }) => {
          const isBlocked = cell.row.original.nivel.id === 0;

          return (
            <div>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  display: 'flex',
                  border: `2px solid ${isBlocked ? '#d9534f' : '#5bc0de'}`,
                  color: isBlocked ? '#d9534f' : '#5bc0de',
                  '&:hover': {
                    border: `2px solid ${isBlocked ? '#d9534f' : '#5bc0de'}`,
                    color: isBlocked ? '#d9534f' : '#5bc0de',
                    transform: 'scale(1.1)',
                    fontFamily: 'Poppins, sans-serif',
                    transition:
                      'background-color 0.5s ease, transform 0.3s ease-in-out',
                  },
                }}
                onClick={() => updateSenhaUsuario(cell.row.original.email)}
              >
                <LockResetIcon />
              </Button>
            </div>
          );
        },
      },
    ],
    [bloquearUsuario, handleModalUpdateUsuario, updateSenhaUsuario]
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={formattedData}
      enableSorting
      enableStickyHeader={true}
      enableColumnPinning={true}
    />
  );
};

export default UserTableManagment;
