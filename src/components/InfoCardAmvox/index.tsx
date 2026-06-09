import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Tooltip,
  useTheme,
} from '@mui/material';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';

type InfoCardProps = {
  title: string;
  amount: number;
  description?: string;
  loader?: boolean;
  link?: string;
  type: 'money' | 'quantity';
  currency?: 'BRL' | 'USD';
  isPercentage?: boolean;
};

const InfoCardAmvox: React.FC<InfoCardProps> = ({
  title,
  amount = 0,
  description,
  loader,
  link,
  type,
  currency = 'BRL',
  isPercentage = false,
}) => {
  const theme = useTheme();

  const getCurrencySymbol = (currency: 'BRL' | 'USD') => {
    const symbols: Record<typeof currency, string> = {
      BRL: 'R$',
      USD: 'U$',
    };
    return symbols[currency];
  };

  const renderAmount = () => {
    if (loader) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={30}
        >
          <CircularProgress size={24} />
        </Box>
      );
    }

    let formattedAmount;
    if (type === 'money') {
      formattedAmount = (
        <>
          {getCurrencySymbol(currency)}{' '}
          <CountUp end={amount} separator="." decimal="," decimals={2} />
        </>
      );
    } else {
      formattedAmount = <CountUp end={amount} separator="." />;
    }

    return (
      <Typography variant="h5" fontWeight="bold">
        {formattedAmount}
        {isPercentage && ' %'}
      </Typography>
    );
  };

  const WrapperComponent = ({ children }: { children: React.ReactNode }) =>
    link ? (
      <Tooltip title={`Ir para ${link}`} arrow aria-label={`Ir para ${link}`}>
        <Box component={Link} to={link} sx={{ textDecoration: 'none' }}>
          {children}
        </Box>
      </Tooltip>
    ) : (
      <>{children}</>
    );

  return (
    <WrapperComponent>
      <Card
        variant="outlined"
        sx={{
          p: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '6.25rem',
          bgcolor: theme.palette.background.paper,
        }}
      >
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="subtitle1" color="text.secondary">
            {title}
          </Typography>
          {renderAmount()}
          {description && (
            <Typography variant="caption" color="text.secondary" mt={1}>
              {description}
            </Typography>
          )}
        </CardContent>
      </Card>
    </WrapperComponent>
  );
};

export default InfoCardAmvox;
