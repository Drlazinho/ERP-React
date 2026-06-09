import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  FormControl,
  Button,
} from '@mui/material';
import formatDateTotvs from '@/utils/formatDataTotvs';
const registroInicialArquivo = {
  ANEXO1: '',
  ANEXO2: '',
  ANEXO3: '',
};

export default function RegistroImagensForm(props) {
  const [registroInfo, setRegistroInfo] = useState({});
  const [registroInfoArquivo, setRegistroInfoArquivo] = useState(
    registroInicialArquivo
  );
  const [imagePreview1, setImagePreview1] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);
  const [imagePreview3, setImagePreview3] = useState(null);

  useEffect(() => {
    if (props.registroSelecionado) {
      const { cliente, protocolo, situacao, notaFiscal, dataRegistro } =
        props.registroSelecionado;
      setRegistroInfoArquivo({ ...registroInfoArquivo, protocolo });
      setRegistroInfo({
        ...registroInfo,
        cliente,
        protocolo,
        situacao,
        notaFiscal,
        dataRegistro,
      });
    }
  }, [props.registroSelecionado]);

  const handleClear = (e) => {
    e.preventDefault();
    props.cancelarRegistro();
    setRegistroInfo(registroInicial);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.registroSelecionado) {
      props.registrarImagemColeta(registroInfoArquivo);
    }
  };

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            marginBottom: '24px',
            width: '100%',
            textAlign: 'start',
            flex: '1 1 auto',
          }}
        >
          <Typography
            sx={{
              color: '#AA0000',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            Registro
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            borderRadius: '4px',
            marginBottom: '24px',
          }}
        >
          <Box
            sx={{
              border: '1px solid #B5B5B5',
              padding: '10px',
              borderRadius: '4px 0 0 4px',
              flex: '0 1 110px',
            }}
          >
            <Typography
              sx={{ fontWeight: 'bold', marginRight: '5px', fontSize: '12px' }}
            >
              Registro:
            </Typography>
          </Box>
          <Box
            sx={{
              border: '1px solid #B5B5B5',
              padding: '10px',
              borderRadius: '0 4px 4px 0',
              flex: '0 1 250px',
            }}
          >
            {/* dado mokado */}
            <Typography sx={{ fontSize: '14px' }}>
              {formatDateTotvs(registroInfo?.dataRegistro)}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl sx={{ width: '100%' }}>
            <TextField
              size="small"
              id="outlined-basic"
              label="Protocolo"
              value={registroInfo?.protocolo}
              type="number"
              sx={{ flex: '1 1 auto' }}
              placeholder="Protocolo"
              disabled
            />
          </FormControl>

          <FormControl sx={{ width: '100%' }}>
            <TextField
              size="small"
              id="outlined-basic"
              label="Nota Fiscal"
              value={registroInfo?.notaFiscal}
              type="number"
              sx={{ flex: '1 1 auto' }}
              placeholder="Nota Fiscal"
              disabled
            />
          </FormControl>

          <FormControl sx={{ width: '100%' }}>
            <TextField
              size="small"
              id="outlined-basic"
              label="Classificação"
              value={registroInfo?.situacao}
              sx={{ flex: '1 1 auto' }}
              placeholder="Classificação"
              disabled
            />
          </FormControl>
        </Box>
        <Box sx={{ width: '100%', marginTop: '24px' }}>
          <FormControl sx={{ width: '100%' }}>
            <TextField
              size="small"
              id="outlined-basic"
              label="Nome"
              value={registroInfo?.cliente}
              sx={{ flex: '1 1 auto', width: '100%' }}
              placeholder="Nome"
              disabled
            />
          </FormControl>
        </Box>
        <fieldset className="border my-4 mx-1 px-1 pb-4 row p-3">
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '12px',
              color: '#AA0000',
              marginBottom: '24px',
            }}
          >
            Evidências
            <span style={{ fontSize: '12px', color: '#333' }}>
              (Aceita somente arquivos tipo JPEG ou PNG)
            </span>
          </Typography>
          <div className="col-4">
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '12px',
                marginBottom: '10px',
              }}
            >
              1. Nota Fiscal
            </Typography>
            <input
              className="form-control"
              name="contrato"
              type="file"
              accept="image/png, image/jpeg"
              id="formFile"
              onChange={(e) => {
                const file = e.target.files[0];
                setRegistroInfoArquivo({
                  ...registroInfoArquivo,
                  anexo1: file,
                });
                const imageURL = URL.createObjectURL(file);
                setImagePreview1(imageURL);
              }}
            />
            {imagePreview1 && (
              <div>
                <img
                  src={imagePreview1}
                  alt="Pré-visualização da Nota Fiscal"
                  style={{ width: '100%', marginTop: '10px' }}
                />
              </div>
            )}
          </div>
          <div className="col-4">
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '12px',
                marginBottom: '10px',
              }}
            >
              2. Comprovante de Residência
            </Typography>
            <input
              className="form-control"
              name="contrato"
              type="file"
              accept="image/png, image/jpeg"
              id="formFile"
              onChange={(e) => {
                const file = e.target.files[0];
                setRegistroInfoArquivo({
                  ...registroInfoArquivo,
                  anexo2: file,
                });
                const imageURL = URL.createObjectURL(file);
                setImagePreview2(imageURL);
              }}
            />
            {imagePreview2 && (
              <div>
                <img
                  src={imagePreview2}
                  alt="Pré-visualização do Comprovante de Residência"
                  style={{ width: '100%', marginTop: '10px' }}
                />
              </div>
            )}
          </div>
          <div className="col-4">
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '12px',
                marginBottom: '10px',
              }}
            >
              3. Imagem do Produto
            </Typography>
            <input
              className="form-control"
              name="contrato"
              type="file"
              accept="image/png, image/jpeg"
              id="formFile"
              onChange={(e) => {
                const file = e.target.files[0];
                setRegistroInfoArquivo({
                  ...registroInfoArquivo,
                  anexo3: file,
                });
                const imageURL = URL.createObjectURL(file);
                setImagePreview3(imageURL);
              }}
            />
            {imagePreview3 && (
              <div>
                <img
                  src={imagePreview3}
                  alt="Pré-visualização do Produto"
                  style={{ width: '100%', marginTop: '10px' }}
                />
              </div>
            )}
          </div>
        </fieldset>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            margin: '10px 24px',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            size="large"
            onClick={handleClear}
            variant="outlined"
            color="inherit"
          >
            Cancelar
          </Button>
          <Button
            size="large"
            onClick={handleSubmit}
            variant="contained"
            color="success"
          >
            Salvar Atualizações
          </Button>
        </Box>
      </Box>
    </div>
  );
}
