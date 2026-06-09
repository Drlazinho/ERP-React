import { ChangeEvent, FormEvent, useState } from 'react';
import {
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Dialog,
  Grid2,
  DialogTitle,
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from '@mui/material';
import {
  ButtonCancel,
  ButtonRegister,
  ButtonSave,
} from '@/components/ButtonAmvox/ButtonsAmvox';
import InputAmvox from '@/components/InputAmvox';
import { InputDateAmvox } from '@/components/InputDateAmvox/InputDateAmvox';
import SelectAmvox from '@/components/SelectAmvox';
import { useRegistroContainer } from '../hooks/useRegistroContainer';
import { IMaskInput } from 'react-imask';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const containerInicial = {
  CONTAINER: '',
  LACRE: '',
  BL: '',
  STATUS: '',
  DOCA: '',
  TRANSPORTADORA: '',
  DECLARACAO_IMPORTACAO: '',
  NF: '000',
  DATA: '',
  COD_PRODUTOS: [
    {
      codigoDeProduto: '',
      qtdVolumes: '',
    },
  ],
  PREVISAO_CHEGADA: '',
  CHEGADA: '',
  INICIO_OP: '',
  FINAL_OP: '',
  CONHECIMENTO: '',
  VOLUMES_NF: '',
  VOLUMES_RECEBIDOS: '',
  CONFORME: '',
  MOTORISTAID: 0,
  OBSERVACAO: '',
  DESCARREGADOR: '',
  CONFERENTE: '',
  LOCAL: '',
};

type OptionType = {
  value: string;
  label: string;
};

type ItemTabelaType = {
  codigoDeProduto: string;
  qtdVolumes: number;
};

type TabelaProdutos = {
  codigoDeProduto: string;
  qtdVolumes: number;
};

export default function CadastroContainer_Form() {
  const {
    ListaProdutos,
    ListaMotorista,
    RegistarContainer,
    isPendingContainer,
  } = useRegistroContainer();
  const LOCAL_LIST = [
    { value: 'MATRIZ', label: 'MATRIZ' },
    { value: 'CORDEBRAS', label: 'CORDEBRAS' },
    { value: 'LOGIC', label: 'LOGIC' },
  ];

  const DESCARREGADOR_LIST = [
    { value: 'TERCEIROS', label: 'TERCEIROS' },
    { value: 'LOGÍSTICA', label: 'LOGÍSTICA' },
  ];

  const PRODUTOS_LIST = ListaProdutos.map(
    (item: { codigo: string; apelido: string }) => ({
      value: item.codigo,
      label: item.apelido,
    })
  );

  const MOTORISTA_LIST = ListaMotorista.map(
    (item: { id: number; nome: string; cnh: string }) => ({
      value: item.id,
      label: item.nome + ' - CNH: ' + item.cnh,
    })
  );

  const [open, setOpen] = useState(false);
  const [containerInfo, setContainerInfo] = useState(containerInicial);
  const [itemTabela, setItemTabela] = useState<ItemTabelaType>({
    codigoDeProduto: '',
    qtdVolumes: 0,
  });
  const [tabelaProdutos, setTabelaProdutos] = useState<TabelaProdutos[]>([]);
  const [selectedProduto, setSelectedProduto] = useState<OptionType | null>(
    null
  );

  const adicionarTabela = () => {
    if (itemTabela.codigoDeProduto && itemTabela.qtdVolumes) {
      const itemJaExistente = tabelaProdutos.some(
        (item) => item.codigoDeProduto === itemTabela.codigoDeProduto
      );

      if (itemJaExistente) {
        alert(
          'Este código ou descrição já foi adicionado! Escolha valores diferentes.'
        );
        return;
      }

      setTabelaProdutos((prev) => [
        ...prev,
        {
          codigoDeProduto: itemTabela.codigoDeProduto,
          qtdVolumes: itemTabela.qtdVolumes,
        },
      ]);

      setItemTabela({
        codigoDeProduto: '',
        qtdVolumes: 0,
      });
      setSelectedProduto(null);
    }
  };
  const deletarItemDaTabela = (index: number) => {
    setTabelaProdutos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleShow = () => {
    setOpen(!open);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContainerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange =
    (name: string) => (_: any, option: OptionType | null) => {
      setContainerInfo((prev) => ({ ...prev, [name]: option?.value }));
    };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (tabelaProdutos.length === 0) {
      alert('Adicione pelo menos um produto à tabela.');
      return;
    }

    const containerParaEnviar = {
      ...containerInfo,
      COD_PRODUTOS: tabelaProdutos,
    };

    RegistarContainer(containerParaEnviar).then(() => {
      handleShow();
    });

    setContainerInfo(containerInicial);
    setTabelaProdutos([]);
  };

  return (
    <>
      <ButtonRegister title="Cadastrar Container" onClick={handleShow} />
      <Dialog maxWidth={'md'} open={open} onClose={handleShow}>
        <DialogTitle>
          <Typography variant="h5">Cadastrar Container</Typography>
        </DialogTitle>
        <Grid2
          component={'form'}
          container
          spacing={2}
          onSubmit={handleSubmit}
          sx={{ p: 2 }}
        >
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <SelectAmvox<OptionType>
              label="Produto"
              options={PRODUTOS_LIST}
              value={selectedProduto}
              onChange={(
                _event: React.SyntheticEvent,
                value: OptionType | null
              ) => {
                setSelectedProduto(value);
                if (value) {
                  setItemTabela({
                    ...itemTabela,
                    codigoDeProduto: value.value,
                  });
                }
              }}
              getOptionLabel={(option: OptionType) => option.label}
              isOptionEqualToValue={(option: OptionType, value: OptionType) =>
                option.value === value.value
              }
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <InputAmvox
              name="qtdVolumes"
              label="Qtd. Volumes"
              value={itemTabela.qtdVolumes}
              onChange={(e) => {
                setItemTabela({
                  ...itemTabela,
                  qtdVolumes: Number(e.target.value),
                });
              }}
              required
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={adicionarTabela}
              startIcon={<AddIcon />}
              sx={{ height: '40px' }}
              disabled={!itemTabela.codigoDeProduto || !itemTabela.qtdVolumes}
            >
              Adicionar
            </Button>
          </Grid2>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              padding: '12px',
              alignItems: 'flex-start',
              gap: '14px',
              borderRadius: '16px',
              border: '1px solid #ccc',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Typography sx={{ fontWeight: 'bold', color: '#333' }}>
                Lista de Produtos
              </Typography>
            </Box>
            <Box
              sx={{
                borderRadius: '8px',
                border: '1px solid #ccc',
                display: 'flex',
              }}
            >
              <TableContainer
                style={{
                  maxHeight: 300,
                  overflowY: 'auto',
                }}
              >
                <Table
                  stickyHeader
                  sx={{ maxHeight: 336, width: 600 }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableCell align="center">Código</TableCell>
                    <TableCell align="center">Qtd. Volumes</TableCell>
                    <TableCell align="center">Ação</TableCell>
                  </TableHead>
                  <TableBody>
                    {tabelaProdutos.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">
                          {item.codigoDeProduto}
                        </TableCell>
                        <TableCell align="center">{item.qtdVolumes}</TableCell>

                        <TableCell align="center">
                          <IconButton>
                            <DeleteOutlineIcon
                              onClick={() => deletarItemDaTabela(index)}
                              color="error"
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <InputAmvox
              name="CONTAINER"
              label="Container"
              value={containerInfo.CONTAINER}
              onChange={handleChange}
              required
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <InputAmvox
              name="LACRE"
              label="Lacre"
              value={containerInfo.LACRE}
              onChange={handleChange}
              required
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <InputAmvox
              name="BL"
              label="BL"
              value={containerInfo.BL}
              onChange={handleChange}
              required
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <InputAmvox
              name="STATUS"
              label="Status"
              value={containerInfo.STATUS}
              onChange={handleChange}
              required
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <InputAmvox
              name="DOCA"
              label="Doca"
              value={containerInfo.DOCA}
              onChange={handleChange}
              required
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <InputAmvox
              name="TRANSPORTADORA"
              label="Transportadora"
              value={containerInfo.TRANSPORTADORA}
              onChange={handleChange}
              required
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <InputAmvox
              name="DECLARACAO_IMPORTACAO"
              label="Declaração Importação"
              value={containerInfo.DECLARACAO_IMPORTACAO}
              onChange={handleChange}
              InputProps={{
                inputComponent: IMaskInput as any,
                inputProps: {
                  mask: '00/0000000-0',
                  overwrite: true,
                },
              }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <InputAmvox
              name="NF"
              label="Nota Fiscal"
              value={containerInfo.NF}
              onChange={handleChange}
              required
              inputProps={{ maxLength: 9 }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <InputDateAmvox
              label="Data"
              format="YYYY-MM-DD"
              value={containerInfo.DATA || ''}
              onChange={(date) =>
                setContainerInfo({
                  ...containerInfo,
                  DATA: date,
                })
              }
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 4 }}>
            <InputAmvox
              name="PREVISAO_CHEGADA"
              label="Previsão de Chegada"
              value={containerInfo.PREVISAO_CHEGADA}
              onChange={handleChange}
              type="time"
              required
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <InputAmvox
              name="CHEGADA"
              label="Chegada"
              value={containerInfo.CHEGADA}
              onChange={handleChange}
              type="time"
              required
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <InputAmvox
              name="INICIO_OP"
              label="Início da Operação"
              value={containerInfo.INICIO_OP}
              onChange={handleChange}
              type="time"
              required
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <InputAmvox
              name="FINAL_OP"
              label="Final da Operação"
              value={containerInfo.FINAL_OP}
              onChange={handleChange}
              type="time"
              required
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <InputAmvox
              name="CONHECIMENTO"
              label="Conhecimento"
              value={containerInfo.CONHECIMENTO}
              onChange={handleChange}
              required
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <InputAmvox
              name="VOLUMES_NF"
              label="Volumes NF"
              value={containerInfo.VOLUMES_NF}
              onChange={handleChange}
              type="number"
              required
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <Typography variant="subtitle1" gutterBottom>
              Conforme?
            </Typography>
            <RadioGroup
              row
              name="CONFORME"
              value={containerInfo.CONFORME}
              onChange={handleChange}
            >
              <FormControlLabel value="1" control={<Radio />} label="Sim" />
              <FormControlLabel value="0" control={<Radio />} label="Não" />
            </RadioGroup>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 4 }}>
            <SelectAmvox
              label="Local"
              options={LOCAL_LIST}
              onChange={handleSelectChange('LOCAL')}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 4 }}>
            <SelectAmvox
              label="Descarregador"
              options={DESCARREGADOR_LIST}
              onChange={handleSelectChange('DESCARREGADOR')}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 4 }}>
            <InputAmvox
              name="CONFERENTE"
              label="Conferente"
              value={containerInfo.CONFERENTE}
              onChange={handleChange}
              required
            />
          </Grid2>

          <Typography variant="h6">Motorista</Typography>
          <Grid2 size={{ xs: 12 }}>
            <SelectAmvox
              label="Motorista"
              options={MOTORISTA_LIST}
              onChange={handleSelectChange('MOTORISTAID')}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <TextField
              name="OBSERVACAO"
              label="Observação"
              multiline
              rows={3}
              fullWidth
              value={containerInfo.OBSERVACAO}
              onChange={handleChange}
            />
          </Grid2>

          <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
            <ButtonCancel onClick={handleShow} />
            <ButtonSave type="submit" loading={isPendingContainer} />
          </Box>
        </Grid2>
      </Dialog>
    </>
  );
}
