import React, { useEffect, useState } from 'react';
import './styles.css';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  getDay,
  parse,
} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import HeaderAmvox from '@/components/HeaderAmvox';
import {
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Typography,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { buscaCalendario } from '@/pages/Setor_Fiscal/Faturamento/faturamento.service';

const Calendario = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [apiData, setApiData] = useState([]);
  const [dataMap, setDataMap] = useState({});

  const selectedMonth = currentDate.getMonth() + 1;
  const selectedYear = currentDate.getFullYear();

  const months = [
    { value: 1, name: 'Janeiro' },
    { value: 2, name: 'Fevereiro' },
    { value: 3, name: 'Março' },
    { value: 4, name: 'Abril' },
    { value: 5, name: 'Maio' },
    { value: 6, name: 'Junho' },
    { value: 7, name: 'Julho' },
    { value: 8, name: 'Agosto' },
    { value: 9, name: 'Setembro' },
    { value: 10, name: 'Outubro' },
    { value: 11, name: 'Novembro' },
    { value: 12, name: 'Dezembro' },
  ];

  const years = Array.from(
    { length: 20 },
    (_, i) => today.getFullYear() - 10 + i
  );

  useEffect(() => {
    const map = {};
    apiData.forEach((item) => {
      const dayStr = item.dataEmissao.split(' ')[0];
      const day = parseInt(dayStr.split('/')[0], 10);
      map[day] = {
        faturamentoAnoAtual: item.faturamentoAnoAtual,
        faturamentoAnoAnterior: item.faturamentoAnoAnterior,
        diferenca: item.diferenca,
        variacao: item.variacao,
      };
    });
    setDataMap(map);
  }, [apiData]);

  const handleMonthChange = (e) => {
    const newMonth = Number(e.target.value);
    const newDate = new Date(selectedYear, newMonth - 1, 1);
    setCurrentDate(newDate);
    fetchDataForMonth(newDate);
  };

  const handleYearChange = (e) => {
    const newYear = Number(e.target.value);
    const newDate = new Date(newYear, selectedMonth - 1, 1);
    setCurrentDate(newDate);
    fetchDataForMonth(newDate);
  };

  const nextMonth = () => {
    const newDate = addMonths(currentDate, 1);
    setCurrentDate(newDate);
    fetchDataForMonth(newDate);
  };

  const prevMonth = () => {
    const newDate = subMonths(currentDate, 1);
    setCurrentDate(newDate);
    fetchDataForMonth(newDate);
  };

  const fetchDataForMonth = (date) => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const monthYear = `${year}-${month.toString().padStart(2, '0')}`;

    buscaCalendario(monthYear).then((response) => {
      setApiData(response);
    });
  };

  useEffect(() => {
    fetchDataForMonth(currentDate);
  }, [currentDate]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weeks = [];
  let week = [];

  for (let i = 0; i < getDay(monthStart); i++) {
    week.push(null);
  }

  daysInMonth.forEach((day) => {
    week.push(day);

    if (week.length === 7 || day.getDate() === monthEnd.getDate()) {
      weeks.push(week);
      week = [];
    }
  });

  if (week.length > 0) {
    while (week.length < 7) {
      week.push(null);
    }
    weeks.push(week);
  }

  const formatCurrency = (value) => {
    if (value === 0) return '0,00';
    if (!value) return 'sem faturamento';
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatPercentage = (value) => {
    if (value === 0) return '0%';
    if (!value) return 'sem faturamento';
    return `${value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}%`;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
      <HeaderAmvox title="Calendário" />
      <div className="calendar-financeiro">
        <div className="calendar-header">
          <IconButton onClick={prevMonth} aria-label="Mês anterior">
            <ChevronLeft />
          </IconButton>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel>Mês</InputLabel>
              <Select
                value={selectedMonth}
                label="Mês"
                onChange={handleMonthChange}
              >
                {months.map((month) => (
                  <MenuItem key={month.value} value={month.value}>
                    {month.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel>Ano</InputLabel>
              <Select
                value={selectedYear}
                label="Ano"
                onChange={handleYearChange}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <IconButton onClick={nextMonth} aria-label="Próximo mês">
            <ChevronRight />
          </IconButton>
        </div>

        <table className="calendar-table">
          <thead>
            <tr>
              {[
                'DOMINGO',
                'SEGUNDA',
                'TERÇA',
                'QUARTA',
                'QUINTA',
                'SEXTA',
                'SÁBADO',
              ].map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((day, dayIndex) => {
                  if (!day) {
                    return <td key={dayIndex} className="empty-day"></td>;
                  }

                  const isCurrentMonth = isSameMonth(day, currentDate);
                  const dayNumber = day.getDate();
                  const dayData = dataMap[dayNumber];

                  return (
                    <td
                      key={dayIndex}
                      className={`day 
                      ${isCurrentMonth ? 'current-month' : 'other-month'} 
                      `}
                      onClick={() => isCurrentMonth && setSelectedDate(day)}
                    >
                      <div className="day-number">{format(day, 'd')}</div>
                      <div className="financial-data--yellow">
                        {dayData ? (
                          <div className="box">
                            <div>Valor Ano Atual:</div>
                            <div>
                              {formatCurrency(dayData.faturamentoAnoAtual)}
                            </div>
                          </div>
                        ) : (
                          'sem faturamento'
                        )}
                      </div>
                      <div className="financial-data--blue">
                        {dayData ? (
                          <div className="box">
                            <div>Valor Ano Anterior:</div>
                            <div>
                              {formatCurrency(dayData.faturamentoAnoAnterior)}
                            </div>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className="financial-data--orange">
                        {dayData ? (
                          <div className="box">
                            <div>Diferença:</div>
                            <div>{formatCurrency(dayData.diferenca)}</div>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className="financial-data--green">
                        {dayData ? (
                          <div className="box">
                            <div>Variação:</div>
                            <div>{formatPercentage(dayData.variacao)}</div>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Box>
  );
};

export default Calendario;
