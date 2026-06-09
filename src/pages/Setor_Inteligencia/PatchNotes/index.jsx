import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Modal as MuiModal,
  FormLabel,
  Typography,
} from '@mui/material';

import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import HeaderAmvox from '@/components/HeaderAmvox';
import ArchiveIcon from '@mui/icons-material/Archive';
import CircularProgress from '@mui/material/CircularProgress';
import LoadingButton from '@mui/lab/LoadingButton';

import { useNavigate } from 'react-router';
import { IconButton, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import {
  getPatchNotes,
  postPatchNotes,
  deletePatchNotes,
  atualizarPatchNotes,
} from '@/pages/Setor_Inteligencia/PatchNotes/patchNotes.service';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useToast } from '@/hooks/toast.hook';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import './styles.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '800px',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #333333',
  borderRadius: '8px',
  boxShadow: 10,
  justifyContent: 'center',
  alignItems: 'center',
  padding: '24px',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
};

const interfaceCadastroPatch = {
  rev: '',
  descricao: '',
  bannerAtualizacao: '',
};

const interfaceListaPatches = {
  id: 0,
  rev: '',
  descricao: '',
  bannerAtualizacao: '',
};

export default function PatchNotes() {
  const [cadastroPatch, setCadastroPatch] = useState(interfaceCadastroPatch);
  const [listaPatches, setListaPatches] = useState([interfaceListaPatches]);
  const [objUpdate, setObjUpdate] = useState(interfaceListaPatches);
  const [showModal, setShowModal] = useState(false);
  const [showModalAtualizar, setShowModalAtualizar] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loaderCard, setLoaderCard] = useState(true);
  const navigate = useNavigate();

  const { addToast } = useToast();

  function handleBack() {
    navigate('/principal');
  }

  const inputTextHandler = (e) => {
    const { name, value } = e.target;
    setCadastroPatch({ ...cadastroPatch, [name]: value });
  };

  const inputTextHandlerAtt = (e) => {
    const { name, value } = e.target;
    setObjUpdate({ ...objUpdate, [name]: value });
  };

  const handlePatch = useCallback(() => {
    getPatchNotes().then((res) => {
      setListaPatches(res);
    });
  });

  const deletePatch = useCallback(() => {
    setIsLoading(true);
    deletePatchNotes(objUpdate.id)
      .then((res) => {
        setIsLoading(false);
        handleCloseDT();
        addToast({
          type: 'success',
          title: 'Sucesso ao deletar Patch!',
        });
        handlePatch();
      })
      .catch((er) => {
        setIsLoading(false);
        addToast({
          type: 'warning',
          title: 'Erro ao deletar Patch!',
        });
      });
  });

  const cadastrarPatchNotes = useCallback(() => {
    const formData = new FormData();
    formData.append('rev', cadastroPatch.rev);
    formData.append('descricao', cadastroPatch.descricao);
    formData.append('AnexaImagem', cadastroPatch.bannerAtualizacao);
    setIsLoading(true);
    postPatchNotes(formData)
      .then((res) => {
        setIsLoading(false);
        handleClose();
        addToast({
          type: 'success',
          title: 'Sucesso ao cadastrar Patch!',
        });
        handlePatch();
      })
      .catch((er) => {
        setIsLoading(false);
        addToast({
          type: 'warning',
          title: 'Erro ao cadastrar Patch!',
        });
      });
  });

  const atualizarPatch = useCallback(() => {
    setIsLoading(true);
    atualizarPatchNotes(objUpdate)
      .then((res) => {
        setIsLoading(false);
        handleCloseDT();
        addToast({
          type: 'success',
          title: 'Sucesso ao atualizar Patch!',
        });
        handlePatch();
      })
      .catch((er) => {
        setIsLoading(false);
        addToast({
          type: 'warning',
          title: 'Erro ao atualizar Patch!',
        });
      });
  });

  const handleClose = () => {
    setShowModal(!showModal);
    setCadastroPatch(interfaceCadastroPatch);
  };

  const handleCloseDT = () => {
    setShowModalAtualizar(false);
    setShowModalDelete(false);
    setObjUpdate(interfaceListaPatches);
  };

  useEffect(() => {
    handlePatch();
  }, []);

  useEffect(() => {
    setLoaderCard(false);
  }, [listaPatches.length > 1]);

  return (
    <>
      <MuiModal open={showModal} onClose={handleClose}>
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: '24px',
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontSize: '16px', fontWeight: 'bold', color: '#333333' }}
            >
              Cadastrar Patch
            </Typography>

            <Button
              type="reset"
              onClick={() => {
                handleClose();
              }}
            >
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>
          <Box
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '15px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '60%',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '30%',
                }}
              >
                <FormLabel style={{ textAlign: 'center' }}>Rev</FormLabel>
                <TextField
                  type="text"
                  id="rev"
                  name="rev"
                  value={cadastroPatch.rev}
                  onChange={inputTextHandler}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '70%',
                  alignItems: 'center',
                }}
              >
                <FormLabel style={{ textAlign: 'center', marginTop: '10px' }}>
                  Descrição
                </FormLabel>
                <TextField
                  type="text"
                  id="descricao"
                  multiline
                  rows={3}
                  fullWidth
                  name="descricao"
                  value={cadastroPatch.descricao}
                  onChange={inputTextHandler}
                />
              </div>
            </div>
            <br />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '50%',
                alignItems: 'center',
              }}
            >
              <FormLabel>Banner</FormLabel>
              <input
                className="form-control"
                name="Imagem"
                type="file"
                accept="image/png, image/jpeg"
                id="formFile"
                defaultValue={cadastroPatch.bannerAtualizacao}
                onChange={(e) =>
                  setCadastroPatch({
                    ...cadastroPatch,
                    bannerAtualizacao: e.target.files[0],
                  })
                }
              />
            </div>
          </Box>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <LoadingButton
              loading={isLoading}
              style={{
                backgroundColor: 'green',
                color: 'white',
                width: '200px',
                marginTop: '20px',
                marginBottom: '20px',
              }}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              onClick={() => {
                cadastrarPatchNotes();
              }}
            >
              <span>Cadastrar Patch</span>
            </LoadingButton>
          </div>
        </Box>
      </MuiModal>

      <MuiModal open={showModalAtualizar} onClose={handleCloseDT}>
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: '24px',
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontSize: '16px', fontWeight: 'bold', color: '#333333' }}
            >
              Atualizar Patch {objUpdate.rev}
            </Typography>

            <Button
              type="reset"
              onClick={() => {
                handleCloseDT();
              }}
            >
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>
          <Box
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              gap: '15px',
            }}
          >
            <div
              style={{ display: 'flex', flexDirection: 'column', width: '32%' }}
            >
              <FormLabel style={{ textAlign: 'center' }}>Rev</FormLabel>
              <TextField
                type="text"
                id="rev"
                name="rev"
                value={objUpdate.rev}
                onChange={inputTextHandlerAtt}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '32%',
                alignItems: 'center',
              }}
            >
              <FormLabel>Descrição</FormLabel>
              <TextField
                type="text"
                id="descricao"
                name="descricao"
                value={objUpdate.descricao}
                onChange={inputTextHandlerAtt}
              />
            </div>
          </Box>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <LoadingButton
              loading={isLoading}
              style={{
                backgroundColor: 'green',
                color: 'white',
                width: '200px',
                marginTop: '20px',
                marginBottom: '20px',
              }}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              onClick={() => {
                atualizarPatch();
              }}
            >
              <span>Cadastrar Patch</span>
            </LoadingButton>
          </div>
        </Box>
      </MuiModal>

      <MuiModal open={showModalDelete} onClose={handleCloseDT}>
        <Box sx={{ ...style, width: '400px' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: '24px',
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontSize: '16px', fontWeight: 'bold', color: '#333333' }}
            >
              Deletar Patch {objUpdate.rev}
            </Typography>

            <Button
              type="reset"
              onClick={() => {
                handleCloseDT();
              }}
            >
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <LoadingButton
              loading={isLoading}
              style={{
                backgroundColor: 'red',
                color: 'white',
                width: '200px',
                marginTop: '20px',
                marginBottom: '20px',
              }}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              onClick={() => {
                deletePatch();
              }}
            >
              <span>Apagar</span>
            </LoadingButton>
          </div>
        </Box>
      </MuiModal>

      <div className="principal">
        <Box position={'relative'} sx={{ backgroundColor: '#F2F2F2' }} gap={2}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 2,
            }}
          >
            <HeaderAmvox title="Patch Notes" onBack={() => navigate(-1)} />
          </Box>

          <Box
            style={{
              display: 'flex',
              flexDirection: 'row-reverse',
            }}
            sx={{ pr: 5, pb: 1 }}
          >
            <Button
              variant="text"
              size="small"
              sx={{ textDecoration: 'underline', color: 'black' }}
              onClick={() => {
                setShowModal(true);
              }}
            >
              Cadastrar Patch
            </Button>
          </Box>

          <div className="divGeral">
            {loaderCard ? (
              <div className="d-flex justify-content-center">
                <CircularProgress color="inherit" />
              </div>
            ) : (
              <div>
                {listaPatches.map((item) => {
                  return (
                    <>
                      <Card key={item.id} sx={{ minWidth: 275 }}>
                        <CardContent>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Typography variant="h5" component="div">
                              Rev - {item.rev}
                            </Typography>
                            <Box>
                              <IconButton
                                size="medium"
                                onClick={() => {
                                  setObjUpdate(item);
                                  setShowModalAtualizar(true);
                                }}
                              >
                                <EditIcon fontSize="medium" color="black" />
                              </IconButton>

                              <IconButton
                                size="medium"
                                onClick={() => {
                                  setObjUpdate(item);
                                  setShowModalDelete(true);
                                }}
                              >
                                <DeleteForeverIcon
                                  fontSize="medium"
                                  color="error"
                                />
                              </IconButton>
                            </Box>
                          </Box>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Descrição
                          </Typography>
                          <Typography variant="body2">
                            {item.descricao}
                          </Typography>
                        </CardContent>
                      </Card>
                      <br />
                    </>
                  );
                })}
              </div>
            )}
          </div>
        </Box>

        <footer className="footerPage">Amvox 2024</footer>
      </div>
    </>
  );
}
