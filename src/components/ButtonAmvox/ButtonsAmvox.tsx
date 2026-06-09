import React from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';
import { Save, Cancel, Delete } from '@mui/icons-material';
import { RiFileExcel2Fill } from 'react-icons/ri';
import { LinkProps } from 'react-router'

interface BotaoProps extends Omit<ButtonProps, 'children'> {
  children?: React.ReactNode;
  title?: string;
}

const baseStyle = {
  width: '100%',
  maxHeight: 32,
};

export const ButtonClear: React.FC<BotaoProps> = ({ onClick, ...props }) => (
  <Button
    size="small"
    variant="contained"
    color="warning"
    startIcon={<Delete />}
    sx={baseStyle}
    onClick={onClick}
    {...props}
  >
    Limpar
  </Button>
);

// Botão Importar Excel
export const ButtonExcel: React.FC<BotaoProps> = ({ onClick, ...props }) => (
  <Button
    size="small"
    variant="contained"
    color="success"
    startIcon={<RiFileExcel2Fill />}
    sx={baseStyle}
    onClick={onClick}
    {...props}
  >
    Excel
  </Button>
);

// Botão Cancelar
export const ButtonCancel: React.FC<BotaoProps> = ({ onClick, ...props }) => (
  <Button
    size="small"
    variant="outlined"
    color="warning"
    type="reset"
    startIcon={<Cancel />}
    sx={baseStyle}
    onClick={onClick}
    {...props}
  >
    Cancelar
  </Button>
);

// Botão Salvar
export const ButtonSave: React.FC<BotaoProps> = ({ onClick, ...props }) => (
  <Button
    size="small"
    variant="contained"
    type="submit"
    startIcon={<Save />}
    sx={{ ...baseStyle, bgcolor: '#AA0000', color: '#fff' }}
    onClick={onClick}
    {...props}
  >
    Salvar
  </Button>
);

export const ButtonRegister: React.FC<BotaoProps & { loading?: boolean }> = ({
  onClick,
  loading = false,
  title = 'Registrar',
  ...props
}) => (
  <Button
    size="small"
    variant="contained"
    type="submit"
    startIcon={!loading && <Save />}
    sx={baseStyle}
    onClick={onClick}
    disabled={loading}
    {...props}
  >
    {loading ? <CircularProgress size={20} color="inherit" /> : title}
  </Button>
);

export const ButtonCustom: React.FC<BotaoProps & Partial<LinkProps>> = ({
  onClick,
  title = 'Necessita de Título',
  sx,
  ...props
}) => (
  <Button
    size="small"
    variant="contained"
    type="submit"
    startIcon={<Save />}
    sx={{ ...baseStyle, ...sx }}
    onClick={onClick}
    {...props}
  >
    {title}
  </Button>
);
