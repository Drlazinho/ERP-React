import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { SxProps, useTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

type CustomDatePickerProps = {
  label: string;
  value: string | null;

  onChange?: (date: string) => void;
  format?: 'YYYY' | 'YYYY-MM' | 'YYYY-MM-DD' | 'YYYY.MM.DD';
  sx?: SxProps;
  error?: boolean;
  helperText?: string;
};

type CombinedDatePickerProps = CustomDatePickerProps;

export const InputDateAmvox: React.FC<CombinedDatePickerProps> = ({
  label,
  value,
  onChange,
  format = 'YYYY-MM-DD',
  sx = {},
  error,
  helperText,
  ...rest
}) => {
  const theme = useTheme();

  const handleChange = (date: Dayjs | null) => {
    if (onChange) {
      if (date) {
        onChange(date.format(format));
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <DatePicker
        label={label}
        value={value ? dayjs(value.toString(), 'YYYYMMDD') : null}
        onChange={handleChange}
        {...rest}
        views={
          format === 'YYYY'
            ? ['year']
            : format === 'YYYY-MM'
            ? ['year', 'month']
            : ['year', 'month', 'day']
        }
        format={
          format === 'YYYY'
            ? 'YYYY'
            : format === 'YYYY-MM'
            ? 'MM/YYYY'
            : 'DD/MM/YYYY'
        }
        slotProps={{
          textField: {
            fullWidth: true,
            size: 'small',
            error: error,
            helperText: helperText,
            sx: {
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                  borderRadius: 1,
                },
                '&:hover fieldset': {
                  borderColor: '#666',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#007bff',
                },
              },
              ...sx,
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};
