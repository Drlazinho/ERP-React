import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function CustomCardQualidade({ title, value, color, borderColor, background }) {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
        borderRadius: '8px',
        padding: '24px',
        width: '100%',
        border: borderColor,
        bgcolor: background,
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          color={color}
          variant="h8"
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            textAlign: 'center',
            mb: 1,
          }}
        >
          {title}
        </Typography>
        <Typography
          color={color}
          variant="h4"
          sx={{
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CustomCardQualidade;
