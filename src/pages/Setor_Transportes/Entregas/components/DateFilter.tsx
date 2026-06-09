import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Grid2,
} from '@mui/material';
import { InputDateAmvox } from '@/components/InputDateAmvox/InputDateAmvox';

type DateFilterProps = {
  onChange?: (payload: {
    filterType: 'emissao' | 'previsao' | 'saida';
    start: string | null;
    end: string | null;
  }) => void;
   valueStart?: string;
  valueEnd?: string;
  valueFilterType?: 'emissao' | 'previsao' | 'saida';
  handlerClear: () => void
};

const DateFilter: React.FC<DateFilterProps> = ({ onChange, valueFilterType, valueStart, valueEnd, handlerClear }) => {
  const [dateType, setDateType] = useState<'month' | 'day'>('month');
  const [filterType, setFilterType] = useState<'emissao' | 'previsao' | 'saida'>(valueFilterType || 'emissao');
  const [startDate, setStartDate] = useState<string>(valueStart || '');
  const [endDate, setEndDate] = useState<string>(valueEnd || '');

    useEffect(() => {
    if (valueFilterType) setFilterType(valueFilterType);
  }, [valueFilterType]);

  useEffect(() => {
    if (valueStart !== undefined) setStartDate(valueStart);
  }, [valueStart]);

  useEffect(() => {
    if (valueEnd !== undefined) setEndDate(valueEnd);
  }, [valueEnd]);

  const handleDateTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateType(event.target.value as 'month' | 'day');
  };

  const handleFilterTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterType(event.target.value as 'emissao' | 'previsao' | 'saida');
    handlerClear()
  };

  const handleStartDateChange = (val: string) => {
    setStartDate(val);
    onChange?.({ filterType, start: val, end: endDate });
  };

  const handleEndDateChange = (val: string) => {
    setEndDate(val);
    onChange?.({ filterType, start: startDate, end: val });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'end',  }} gap={2}>
      {/* Date granularity selection */}
      <FormControl component="fieldset">
        <FormLabel component="legend">Tipo</FormLabel>
        <RadioGroup row value={dateType} onChange={handleDateTypeChange}>
          <FormControlLabel value="month" control={<Radio />} label="Mês" />
          <FormControlLabel value="day" control={<Radio />} label="Dia" />
        </RadioGroup>
      </FormControl>

       <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <InputDateAmvox
            label="Data Inicial"
            value={startDate}
            onChange={handleStartDateChange}
            format={dateType === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD'}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <InputDateAmvox
            label="Data Final"
            value={endDate}
            onChange={handleEndDateChange}
            format={dateType === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD'}
          />
        </Grid2>
      </Grid2>

      {/* Filter type selection */}
      <FormControl component="fieldset">
        <FormLabel component="legend">Filtrar por</FormLabel>
        <RadioGroup row value={filterType} onChange={handleFilterTypeChange}>
          <FormControlLabel
            value="emissao"
            control={<Radio />}
            label="Emissão"
          />
          <FormControlLabel
            value="previsao"
            control={<Radio />}
            label="Previsão"
          />
          <FormControlLabel value="saida" control={<Radio />} label="Saída" />
        </RadioGroup>
      </FormControl>

      {/* Date inputs */}
     
    </Box>
  );
};

export default DateFilter;
