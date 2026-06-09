import React from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';

const EspecificacaoEstrutura = () => {
  return (
    <>
      <Box
        sx={{
          borderBottom: '1px solid #ccc',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          background: '#fafafa',
          padding: '20px',
          borderRadius: '8px',
          color: '#333333',
          width: '100%',
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '12px',
          }}
        >
          Estrutura do Serial Number:
        </Typography>

        <Box
          sx={{
            marginTop: '20px',
            borderBottom: '1px solid #ccc',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            background: '#ffffff',
            padding: '10px',
            borderRadius: '8px',
          }}
        >
          <Typography sx={{ fontSize: '14px' }}>
            "000503A56” + “C” + “000010” + “C” + “25” + “001” + “I” + “0000001"
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <Stack direction="row" spacing={1}>
            <Chip label="1" size="medium" color="default" />
            <Box>
              <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                Código do produto (000503A56)
              </Typography>
              <Typography sx={{ fontSize: '12px' }}>
                Sequência alfanumérica de nove dígitos gerada pelo Protheus para
                identificar o produto.
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Chip label="2" size="medium" color="default" />
            <Box>
              <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                Voltagem (C)
              </Typography>
              <Typography sx={{ fontSize: '12px' }}>
                Uma letra que identifica a voltagem do produto, exemplo “C” que
                neste caso é igual a bivolt.
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Chip label="3" size="medium" color="default" />
            <Box>
              <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                Fornecedor (000010)
              </Typography>
              <Typography sx={{ fontSize: '12px' }}>
                Seis dígitos que representam o código do fornecedor.
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Chip label="4" size="medium" color="default" />
            <Box>
              <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                Mês (C)
              </Typography>
              <Typography sx={{ fontSize: '12px' }}>
                Uma letra que representa o mês de fabricação, neste exemplo é o
                mês de Março.
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Chip label="5" size="medium" color="default" />
            <Box>
              <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                Ano (25)
              </Typography>
              <Typography sx={{ fontSize: '12px' }}>
                Dois dígitos que representam o ano de fabricação.
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Chip label="6" size="medium" color="default" />
            <Box>
              <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                Lote (001)
              </Typography>
              <Typography sx={{ fontSize: '12px' }}>
                Três dígitos numéricos representando o lote de fabricação.
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Chip label="7" size="medium" color="default" />
            <Box>
              <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                Nacionalidade (I)
              </Typography>
              <Typography sx={{ fontSize: '12px' }}>
                Uma letra que identifica a nacionalidade do produto, exemplo “I”
                de importado.
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Chip label="8" size="medium" color="default" />
            <Box>
              <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                Sequência crescente (0000001)
              </Typography>
              <Typography sx={{ fontSize: '12px' }}>
                Um número de sete dígitos que começa em "000001" e cresce
                sequencialmente.
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: '20px',
          borderBottom: '1px solid #ccc',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          background: '#fafafa',
          padding: '20px',
          borderRadius: '8px',
          color: '#333333',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '12px',
          }}
        >
          Exemplo de Serial Number gerado:
        </Typography>
        <Typography sx={{ fontSize: '14px' }}>
          “000503A56C000013E25001I0002500”
        </Typography>
      </Box>
    </>
  );
};

export default EspecificacaoEstrutura;
