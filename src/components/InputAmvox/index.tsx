import React from 'react';
import {
  TextFieldProps,
  InputAdornment,
  IconButton,
  useTheme,
  TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface CustomInputProps extends Omit<TextFieldProps, 'variant'> {
  label: string;
  variant?: 'standard' | 'outlined' | 'filled';
  isPassword?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const InputAmvox: React.FC<CustomInputProps> = ({
  label,
  variant = 'outlined',
  isPassword = false,
  startIcon,
  endIcon,
  size = 'small',
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const theme = useTheme();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      sx={{
        bgcolor: theme.palette.background.paper,
      }}
      label={label}
      variant={variant}
      size={size}
      fullWidth
      type={isPassword && !showPassword ? 'password' : 'text'}
      InputProps={{
        startAdornment: startIcon && (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ),
        endAdornment: isPassword ? (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ) : endIcon ? (
          <InputAdornment position="end">{endIcon}</InputAdornment>
        ) : undefined,
      }}
      {...props}
    />
  );
};

export default InputAmvox;
