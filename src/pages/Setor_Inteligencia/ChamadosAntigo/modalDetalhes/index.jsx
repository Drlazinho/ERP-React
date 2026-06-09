import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonCloseModal from '@/components/ButtonCloseModal';
import { UploadFile } from '@mui/icons-material';
import { GetChamadosXId } from '@/services/chamados/chamadosX.service';
import { GetChamadosDetalheId } from '@/services/chamadosDetalhe/chamadosDetalheX.service';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';

const { email } = useUsuarioLocal();

const initialNovoDetalhe = {
  idChamado: null,
  idDetalhe: null,
  descricao: '',
  // previsaoEntrega: new Date().toJSON(),
  // previsaoInicio: new Date().toJSON(),
  responsavelAprovacao: '',
  responsavelExecucao: '',
  observacao: '',
  imagemDetalhe: null,
  previsaoInicio: null,
  previsaoEntrega: null,
  emailRespDemandado: email,
  emailRespDemandante: null,
};

const initialNovoDetalheFilter = [
  {
    idChamado: null,
    idDetalhe: null,
    descricao: '',
    previsaoEntrega: new Date().toJSON(),
    previsaoInicio: new Date().toJSON(),
    responsavelAprovacao: '',
    responsavelDemandado: '',
    observacao: '',
    imagemDetalhe: null,
    emailRespDemandado: email,
    emailRespDemandante: null,
  },
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '55%',
  height: '55%',
  overflow: 'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalDetalhes({
  open,
  onClose,
  idChamadoSelecionado,
  handleSubmitDet,
  detalheSelecionado,
  handleUpdateDet,
  handleEnviarEmail,
  detalheId,
  idChamadoSel,
  listaMembros,
  emailRespDemandante,
  emailRespDemandado,
  dados,
}) {
  const [formDataDet, setFormDataDet] = useState(initialNovoDetalhe);
  const [formDataExistente, setFormDataExistente] = useState(
    initialNovoDetalheFilter
  );
  const [idDetalhes, setIdDetalhes] = useState({});

  const setDataDetalhes = () => {
    setFormDataExistente(detalheSelecionado.chamadosDetalhes);
  };

  const handleGetIdDetalhes = () => {
    GetChamadosDetalheId(idChamadoSelecionado).then((res) => {
      setIdDetalhes(res);
    });
  };

  const filtroDetalhes = () => {
    const detalheFiltrado = initialNovoDetalheFilter;
    detalheFiltrado.length = 0;
    for (const item of formDataExistente) {
      if (item.idDetalhe == detalheId) {
        detalheFiltrado.push(item);
      }
    }
    if (detalheFiltrado.length != 0) {
      setFormDataDet(() => ({
        idDetalhe: detalheFiltrado[0].idDetalhe,
        descricao: detalheFiltrado[0].descricao,
        previsaoEntrega: detalheFiltrado[0].previsaoEntrega,
        previsaoInicio: detalheFiltrado[0].previsaoInicio,
        responsavelAprovacao: detalheFiltrado[0].responsavelAprovacao,
        responsavelExecucao: detalheFiltrado[0].responsavelDemandado,
        // previsaoEntrega: detalheFiltrado[0].previsaoEntrega,
        // previsaoInicio: detalheFiltrado[0].previsaoInicio,
        observacao: detalheFiltrado[0].observacao,
        imagemDetalhe: detalheFiltrado[0].imagemDetalhe,
        emailRespDemandante: detalheFiltrado[0].emailRespDemandante,
        emailRespDemandado: email,
      }));
    }
  };

  useEffect(() => {
    if (detalheSelecionado) {
      setDataDetalhes();
      filtroDetalhes();
    }
    setFormDataDet((oldState) => ({
      ...oldState,
      idChamado: idChamadoSelecionado,
      emailRespDemandante: emailRespDemandante,
      emailRespDemandado: email,
    }));

    handleGetIdDetalhes();
  }, [
    detalheSelecionado,
    idChamadoSelecionado,
    emailRespDemandante,
    emailRespDemandado,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataDet((prevData) => ({
      ...prevData,
      [name]: value,
      // idChamado: detalheSelecionado ? idChamadoSel : idChamadoSelecionado,
      emailRespDemandante: emailRespDemandante,
      emailRespDemandado: emailRespDemandado,
      idChamado: idChamadoSelecionado,
      //idChamado: emailRespDemandante,
    }));
  };

  const formatDate = (date) => {
    if (!date) return null;
    const dateStr = date.toString();
    return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(
      6,
      8
    )}`;
  };

  const handleSubmitFormData = (e) => {
    e.preventDefault();
    handleSubmitDet(formDataDet);
    handleEnviarEmail(formDataDet);
    setFormDataDet(initialNovoDetalhe);
    onClose();
  };

  const handleSubmitUpdateFormData = () => {
    handleUpdateDet(formDataDet);
    handleEnviarEmail(formDataDet);
    setFormDataDet(initialNovoDetalhe);
    onClose();
  };

  const cancelFormData = () => {
    setFormDataDet(initialNovoDetalhe);
    onClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={style}>
          <ButtonCloseModal onClick={cancelFormData} />
          {detalheSelecionado ? (
            <Typography
              variant="h6"
              sx={{ textAlign: 'center', color: '#000' }}
            >
              Atualizar Detalhe
            </Typography>
          ) : (
            <Typography
              variant="h6"
              sx={{ textAlign: 'center', color: '#000' }}
            >
              Adicionar Detalhe:
            </Typography>
          )}
          <form onSubmit={handleSubmitFormData}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, my: 2 }}>
              <TextField
                id="filled-basic"
                label="Email do Demandante"
                variant="filled"
                fullWidth
                value={formDataDet.emailRespDemandante || ''}
                name="responsavelAprovacao"
                onChange={(e) =>
                  setFormDataDet({
                    ...formDataDet,
                    emailRespDemandante: e.target.value,
                    responsavelAprovacao: e.target.value,
                  })
                }
                required
              />
              <TextField
                id="filled-basic"
                label="Email do Responsável pela Execução"
                variant="filled"
                fullWidth
                name="responsavelExecucao"
                value={formDataDet.emailRespDemandado || ''}
                onChange={(e) =>
                  setFormDataDet({
                    ...formDataDet,
                    emailRespDemandado: e.target.value,
                    responsavelExecucao: e.target.value,
                  })
                }
                required
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, my: 2 }}>
              <TextField
                type="date"
                id="filled-basic"
                label="Previsão de início"
                InputLabelProps={{ shrink: true }}
                variant="filled"
                fullWidth
                value={formDataDet.previsaoInicio || ''}
                name="previsaoInicio"
                onChange={(e) =>
                  setFormDataDet((prev) => ({
                    ...prev,
                    previsaoInicio: e.target.value,
                  }))
                }
              />
              <TextField
                type="date"
                id="filled-basic"
                label="Previsao Entrega "
                InputLabelProps={{ shrink: true }}
                variant="filled"
                fullWidth
                name="previsaoEntrega"
                value={formDataDet.previsaoEntrega || ''}
                onChange={(e) =>
                  setFormDataDet((prev) => ({
                    ...prev,
                    previsaoEntrega: e.target.value,
                  }))
                }
              />
            </Box>
            <FormControl fullWidth>
              <TextField
                variant="filled"
                id="outlined-multiline-static"
                label="Descrição"
                name="descricao"
                placeholder="Descreva com todos os detalhes possíveis e claros"
                multiline
                rows={3}
                required
                onChange={(e) =>
                  setFormDataDet({ ...formDataDet, descricao: e.target.value })
                }
              />
            </FormControl>

            {/* Botão escolher imagem */}
            <InputLabel htmlFor="file-input">
              <input
                accept="image/jpeg, image/png, image/jpg"
                id="file-input"
                size="small"
                type="file"
                style={{ display: 'none' }}
                onChange={(e) =>
                  setFormDataDet({
                    ...formDataDet,
                    imagemDetalhe: e.target.files[0],
                  })
                }
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 2,
                  alignItems: 'center',
                  marginTop: 2,
                }}
              >
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<UploadFile />}
                >
                  Escolher Arquivo
                </Button>
                {formDataDet.imagemDetalhe && (
                  <Typography>
                    <ImageIcon /> {formDataDet.imagemDetalhe.name}
                  </Typography>
                )}
              </Box>
            </InputLabel>

            <Typography
              variant="body2"
              sx={{
                textAlign: 'center',
                marginBottom: 2,
                color:
                  formDataDet.descricao?.length < 20 ? '#f00' : 'transparent',
              }}
            >
              {formDataDet.descricao?.length < 20
                ? `Faltam ${
                    20 - formDataDet.descricao.length
                  } caracteres para o mínimo.`
                : ''}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textAlign: 'center',
                marginBottom: 2,
                color:
                  formDataDet.descricao?.length > 899 ? '#f00' : 'transparent',
              }}
            >
              {formDataDet.descricao.length > 899
                ? `O limite de caracteres foi atingido. Por favor, digite uma descrição com no máximo 900 caracteres.`
                : ''}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                textAlign: 'center',
                marginBottom: 2,
                color: '#f00',
                visibility:
                  !formDataDet.emailRespDemandado ||
                  !formDataDet.emailRespDemandante ||
                  !formDataDet.descricao
                    ? 'visible'
                    : 'hidden',
              }}
            >
              Todos os campos acima são obrigatórios
            </Typography>
            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <TextField
                variant="filled"
                id="outlined-multiline-static"
                label="Observação"
                name="observacao"
                placeholder="Descreva com todos os detalhes possíveis e claros"
                multiline
                inputProps={{ maxLength: 99 }}
                rows={2}
                value={formDataDet.observacao}
                onChange={handleChange}
              />
            </FormControl>

            <Box sx={{ display: 'flex', gap: 2, paddingY: 2 }} fullWidth>
              {detalheSelecionado ? (
                <Button
                  variant="contained"
                  color="success"
                  endIcon={<AddIcon />}
                  fullWidth
                  type="submit"
                  onClick={handleSubmitUpdateFormData}
                >
                  Atualizar
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  endIcon={<AddIcon />}
                  fullWidth
                  type="submit"
                  disabled={
                    !formDataDet.emailRespDemandado ||
                    !formDataDet.emailRespDemandante ||
                    !formDataDet.descricao ||
                    formDataDet.descricao.length < 20
                  }
                  onClick={(e) => {
                    handleSubmitFormData(e);
                  }}
                >
                  Adicionar
                </Button>
              )}
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                fullWidth
                onClick={cancelFormData}
                type="reset"
              >
                Cancelar
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
}
