import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  useTheme,
  Divider,
} from '@mui/material';
import CountUp from 'react-countup';

type InfoCardAmvoxProps = {
  title1: string;
  value1: number;
  title2: string;
  value2: number;
  loading?: boolean;
  type?: 'money' | 'quantity';
};

const InfoFaturamento_Card: React.FC<InfoCardAmvoxProps> = ({
  title1,
  value1,
  title2,
  value2,
  loading = false,
  type = 'money',
}) => {
  const theme = useTheme();

  const renderValue = (value: number) => {
    const isMoney = type === 'money';

    return (
      <Typography align='center' variant="h6" fontWeight="bold">
        {isMoney && 'R$ '}
        <CountUp
          end={value}
          separator="."
          decimal={','}
          decimals={2}
        />
      </Typography>
    );
  };

  return (
    <Card
      variant="outlined"
      sx={{
        bgcolor: theme.palette.background.paper,
      }}
    >
      <CardContent>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={80}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="row"
            gap={2}
          >
            <Box>
              <Typography
                align="center"
                variant="subtitle2"
                color="text.secondary"
              >
                {title1}
              </Typography>
              {renderValue(value1)}
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem />

            <Box>
              <Typography
                align="center"
                variant="subtitle2"
                color="text.secondary"
              >
                {title2}
              </Typography>
              {renderValue(value2)}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default InfoFaturamento_Card;
