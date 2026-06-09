import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import CardDetalheChamada from '../CardHistory';
import LoupeIcon from '@mui/icons-material/Loupe';
import { formatDateTime } from '@/utils/formatDateInput';
import ModalDetalhes from '../modalDetalhes';
import { formatarImagem } from '@/utils/formatarImagem';
import { Image } from '@mui/icons-material';
import ButtonCloseModal from '@/components/ButtonCloseModal';
import { donwloadPDF } from '@/utils/downloadPdf';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '80%',
  height: '80%',
  overflow: 'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const initialChamado = {
  tipo: '',
  urgencia: '',
  setor: '',
  titulo: '',
  descricao: '',
  solicitante: '',
  categoria: '',
  imagem: null,
  responsavel: '',
};

const ListaDeCategoria = [
  'CONEXÃO',
  'DESENVOLVIMENTO DE SOFTWARE',
  'IMPRESSORA',
  'MANUTENÇÃO',
  'REMANEJAMENTO DE MÁQUINA',
  'SISTEMA ERP',
  'SUBSTITUIÇÃO DE EQUIPAMENTO',
  'SUPORTE A SOFTWARE',
  'TELA DE PRIVACIDADE',
  'COMPRA DE EQUIPAMENTO',
  'CRIAÇÃO DE USUÁRIO',
  'CRIAÇÃO DE EMAIL',
];

const ListaDeUrgencia = ['BAIXA', 'MÉDIA'];

const ListaDeTipo = ['INCIDENTE', 'SOLICITAÇÃO'];

const ListaDeSituacao = ['FINALIZADO', 'REPROVADA', 'EM ANDAMENTO'];

const ListaDeStatus = ['ABERTO', 'FECHADO'];

export default function ModalChamadoDetalhes({
  open,
  onClose,
  handleSubmit,
  data,
  dataDetalhes,
  openModalDet,
  handleDeleteChamadoDet,
  handleGetChamadoDet,
  listaMembros,
  handleEnviarEmail,
  userSolicitante,
}) {
  const [formData, setFormData] = React.useState(initialChamado);
  const [mostraImage, setMostraImage] = useState(false);

  const { email } = useUsuarioLocal();

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const cancelFormData = () => {
    setFormData(initialChamado);
    onClose();
  };

  const handleSubmitFormData = () => {
    const {
      id,
      status,
      situacao,
      responsavel,
      tipo,
      categoria,
      urgencia,
      titulo,
      descricao,
    } = formData;
    handleSubmit({
      id,
      status,
      situacao,
      responsavel,
      tipo,
      categoria,
      urgencia,
    });
    if (responsavel !== 'NÃO ATRIBUIDO') {
      handleEnviarEmail(formData);
    }
    setFormData(initialChamado);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ButtonCloseModal onClick={cancelFormData} />
        <Typography variant="h6" sx={{ textAlign: 'center', color: '#000' }}>
          Detalhes do Chamado
        </Typography>
        {/* <Typography variant='body1' sx={{ textAlign: 'center', color: '#000' }}>Solicitante: {email}</Typography> */}
        <Typography variant="body1" sx={{ textAlign: 'center', color: '#000' }}>
          Título: {formData.titulo}
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center', color: '#000' }}>
          ID: {formData.id}
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center', color: '#000' }}>
          Setor: {formData.setor}
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center', color: '#000' }}>
          Solicitante: {userSolicitante}
        </Typography>
        <Typography
          variant="body2"
          sx={{ textAlign: 'center', marginBottom: 2, color: '#000' }}
        >
          Abertura: {formatDateTime(formData.abertura)}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{ display: 'flex', flexDirection: 'row', gap: 2, my: 2 }}
            fullWidth
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                my: 2,
                alignItems: 'center',
                width: '50%',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
                  color: formData.status === 'FECHADO' ? '#00750c' : '#F00',
                }}
              >
                Status: {formData.status}
              </Typography>
              <FormControl variant="filled" sx={{ flex: 1 }}>
                <InputLabel id="demo-simple-select-label">
                  Alterar Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="status"
                  onChange={handleChange}
                >
                  {ListaDeStatus.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                my: 2,
                alignItems: 'center',
                width: '50%',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
                  color: formData.status === 'FECHADO' ? '#00750c' : '#F00',
                }}
              >
                Situacão:{' '}
                {formData.status === 'FECHADO'
                  ? 'FINALIZADO'
                  : formData.situacao}
              </Typography>
              <FormControl variant="filled" sx={{ flex: 1 }}>
                <InputLabel id="demo-simple-select-label">
                  Alterar Situação
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="situacao"
                  onChange={handleChange}
                  disabled={formData.status === 'FECHADO' ? true : false}
                  value={
                    formData.status === 'FECHADO'
                      ? 'FINALIZADO'
                      : formData.situacao
                  }
                >
                  {ListaDeSituacao.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <FormControl variant="filled" fullWidth required>
            {/* <InputLabel id="demo-simple-select-label">Responsável</InputLabel> */}
            <TextField
              labelId="demo-simple-select-label"
              label="Responsável"
              id="filled-basic"
              variant="filled"
              name="responsavel"
              required
              fullWidth
              value={formData.responsavel}
              onChange={handleChange}
            >
              {listaMembros?.map((item, index) => (
                <MenuItem key={index} value={item.email}>
                  {item.nome}
                </MenuItem>
              ))}
            </TextField>
            <Typography
              variant="body2"
              sx={{ textAlign: 'start', marginBottom: 2, color: '#f00' }}
            >
              Lembrete: Atribuir Responsável
            </Typography>
          </FormControl>

          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, my: 2 }}>
            <FormControl variant="filled" fullWidth required>
              <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
              >
                {ListaDeTipo.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="filled" fullWidth required>
              <InputLabel id="demo-simple-select-label">Urgência</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.urgencia}
                name="urgencia"
                onChange={handleChange}
              >
                {ListaDeUrgencia.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <TextField
            id="filled-basic"
            label="Categoria"
            variant="filled"
            fullWidth
            name="categoria"
            onChange={handleChange}
            required
            value={formData.categoria}
          />
          <Typography
            variant="body1"
            sx={{ textAlign: 'left', my: 2, color: '#000' }}
          >
            Descrição: {formData.descricao}
          </Typography>
          {formData.imagem && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
              }}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setMostraImage(!mostraImage)}
              >
                {' '}
                {mostraImage ? 'Esconder Imagem' : 'Mostrar Imagem'}
              </Button>
              {mostraImage && (
                <img
                  src={formatarImagem(formData.imagem)}
                  alt=""
                  width={'60%'}
                />
              )}
            </Box>
          )}
          <Box sx={{ display: 'flex', gap: 2, paddingY: 2 }} fullWidth>
            <Button
              variant="contained"
              color="success"
              endIcon={<SendIcon />}
              fullWidth
              type="submit"
              onClick={handleSubmitFormData}
            >
              Atualizar
            </Button>
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
          <Box sx={{}}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ textAlign: 'center', marginBottom: 2, color: '#000' }}
              >
                Detalhes do Chamado
              </Typography>
              <Button
                size="small"
                variant="contained"
                color="primary"
                type="button"
                startIcon={<LoupeIcon />}
                onClick={() => {
                  openModalDet(formData.id, formData.solicitante);
                }}
              >
                Adicionar Detalhe
              </Button>
            </Box>
            <Box
              sx={{
                overflow: 'scroll',
                height: 300,
                display: 'flex',
                gap: 1,
                flexDirection: 'column',
              }}
            >
              {dataDetalhes &&
                dataDetalhes.map((item) => (
                  <CardDetalheChamada
                    key={item.Detalhe}
                    idDetalhe={item.idDetalhe}
                    idChamado={item.idChamado}
                    descricao={item.descricao}
                    previsaoEntrega={item.previsaoEntrega}
                    previsaoInicio={item.previsaoInicio}
                    responsavelAprovacao={item.responsavelAprovacao}
                    responsavelExecucao={item.responsavelExecucao}
                    observacao={item.observacao}
                    handleDeleteChamadoDet={handleDeleteChamadoDet}
                    handleGetChamadoDet={handleGetChamadoDet}
                  />
                ))}
            </Box>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
