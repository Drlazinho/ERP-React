import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Tooltip,
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
          <CircularProgress size={24} color="error" />
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
      formattedAmount = <CountUp end={amount} separator="." decimals={2} />;
    }

    return (
      <Typography sx={{ fontSize: '14px' }} fontWeight="bold">
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
          alignItems: 'center',
          height: '100px',
          width: '100%',
          bgcolor: '#FFFFFF',
          borderRadius: '4px',
          boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.25)',
        }}
      >
        <CardContent
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ fontSize: '12px' }} color="text.secondary">
            {title}
          </Typography>
          {renderAmount()}
          {description && (
            <Typography sx={{ fontSize: '14px' }} color="text.secondary" mt={1}>
              {description}
            </Typography>
          )}
        </CardContent>
      </Card>
    </WrapperComponent>
  );
};

export default InfoCardAmvox;
