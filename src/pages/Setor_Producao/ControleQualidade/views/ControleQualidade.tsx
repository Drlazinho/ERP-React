import { FormEvent, useState, useEffect } from 'react';
import { ButtonClear } from '@/components/ButtonAmvox/ButtonsAmvox';
import { InputDateAmvox } from '@/components/InputDateAmvox/InputDateAmvox';
import SelectAmvox from '@/components/SelectAmvox';
import InputAmvox from '@/components/InputAmvox';
import { Box, Pagination } from '@mui/material';
import { useFetchControleQualidade } from '../hooks/useFetchControleQualidade';
import { SyntheticEvent } from 'react';
import RegistrarInspecao_Form from '../components/RegistrarInspecao_Form';
import TableQualidade from '../components/TableQualidade';
import CadastrarDefeito_Form from '../components/CadastrarDefeito_Form';
import CadastrarOrigens_Form from '../components/CadastrarOrigens_Form';
import debounce from '@/utils/debounce';

interface FormValues {
  dataInicio: string | null;
  dataFinal: string | null;
  codigoProduto: string | null;
  linhaId: number | null;
  numeroDaPagina: number;
  itensPorPagina: number;
  descricao: string | null;
  idOrigem: number | null;
  armazem: string | null;
}

const initialState: FormValues = {
  dataInicio: null,
  dataFinal: null,
  codigoProduto: null,
  linhaId: null,
  numeroDaPagina: 1,
  itensPorPagina: 10,
  descricao: null,
  idOrigem: null,
  armazem: null,
};

const ControleQualidade_View = () => {
  const [filtro, setFiltro] = useState(initialState);
  const [pagina, setPagina] = useState(0);
  const {
    ControleDeQualidade,
    isLoadingControleQualidade,
    ListaProdutos,
    LinhasProducao,
    Armazens,
    Origem,
    Defeitos,
  } = useFetchControleQualidade(filtro);

  const LINHAS_LIST = (
    LinhasProducao as { esteiraID: number; nomeGalpaoLinha: string }[]
  ).map((item) => ({
    value: item.esteiraID,
    label: item.nomeGalpaoLinha,
  }));

  const ORIGENS_LIST = (Origem as { id: number; nomeOrigem: string }[]).map(
    (item) => ({
      value: item.id,
      label: item.nomeOrigem,
    })
  );

  const ARMAZENS_LIST = (Armazens as { local: string; localiz: string }[]).map(
    (item) => ({
      value: item.local,
      label: item.local + ' - ' + item.localiz,
    })
  );

  useEffect(() => {
    setPagina(filtro.numeroDaPagina - 1);
  }, [filtro.numeroDaPagina]);

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPagina(newPage - 1);
    setFiltro((prevFiltro) => ({
      ...prevFiltro,
      numeroDaPagina: newPage,
    }));
  };

  const handlerClear = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    setFiltro(initialState);
  };

  const handleLinhaChange = (_event: SyntheticEvent, value: any | null) => {
    setFiltro({
      ...filtro,
      linhaId: value?.value || null,
    });
  };
  const handleArmazemChange = (_event: SyntheticEvent, value: any | null) => {
    setFiltro({
      ...filtro,
      armazem: value?.value || null,
    });
  };
  const handleOrigemChange = (_event: SyntheticEvent, value: any | null) => {
    setFiltro({
      ...filtro,
      idOrigem: value?.value || null,
    });
  };

  return (
    <>
      <Box
        sx={(theme) => ({
          display: 'flex',
          gap: '20px',
          width: '100%',
          justifyContent: 'flex-end',
          flexWrap: 'wrap',
          [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
          },
        })}
      >
        <CadastrarDefeito_Form defeitos={Defeitos} />

        <CadastrarOrigens_Form origem={Origem} />

        <RegistrarInspecao_Form
          ListaProdutos={ListaProdutos}
          LinhasProducao={LinhasProducao}
          Armazens={Armazens}
          Origem={Origem}
          Defeitos={Defeitos}
        />
      </Box>
      <Box
        sx={{
          border: '1px solid #ccc,',
          borderRadius: '4px',
          backgroundColor: '#fff',
          boxShadow: '0px 1px 3px 0px #ccc',
          padding: '16px',
          gap: '8px',
          width: '100%',
          mt: '10px',
        }}
      >
        <Box
          component={'form'}
          onSubmit={handlerClear}
          sx={(theme) => ({
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            [theme.breakpoints.down('md')]: {
              justifyContent: 'center',
            },
          })}
        >
          <InputDateAmvox
            label="Data Inicial"
            format="YYYY-MM-DD"
            value={filtro.dataInicio}
            onChange={(e) => setFiltro({ ...filtro, dataInicio: e })}
            sx={{ maxWidth: '200px' }}
          />

          <InputDateAmvox
            label="Data Final"
            format="YYYY-MM-DD"
            value={filtro.dataFinal}
            onChange={(e) => setFiltro({ ...filtro, dataFinal: e })}
            sx={{ maxWidth: '200px' }}
          />

          <InputAmvox
            label="Descrição do Produto"
            type="text"
            name="descricao"
            onChange={(e) =>
              debounce(() => {
                setFiltro({
                  ...filtro,
                  descricao: e.target.value,
                });
              })
            }
            sx={{ maxWidth: '200px', minWidth: '200px' }}
          />

          <InputAmvox
            label="Código do Produto"
            type="text"
            name="codigoProduto"
            onChange={(e) =>
              debounce(() => {
                setFiltro({
                  ...filtro,
                  codigoProduto: e.target.value,
                });
              })
            }
            sx={{ maxWidth: '200px', minWidth: '200px' }}
          />

          <SelectAmvox
            label="Linha"
            options={LINHAS_LIST}
            value={
              LINHAS_LIST.find(
                (op: { label: string; value: number }) =>
                  op.value === filtro.linhaId
              ) || null
            }
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            onChange={handleLinhaChange}
            sx={{ maxWidth: '200px', minWidth: '200px' }}
          />

          <SelectAmvox
            label="Armazem"
            options={ARMAZENS_LIST}
            value={
              ARMAZENS_LIST.find(
                (op: { label: string; value: string }) =>
                  op.value === filtro.armazem
              ) || null
            }
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            onChange={handleArmazemChange}
            sx={{ maxWidth: '200px', minWidth: '200px' }}
          />

          <SelectAmvox
            label="Origem"
            options={ORIGENS_LIST}
            value={
              ORIGENS_LIST.find(
                (op: { label: string; value: number }) =>
                  op.value === filtro.idOrigem
              ) || null
            }
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            onChange={handleOrigemChange}
            sx={{ maxWidth: '200px', minWidth: '200px' }}
          />

          <ButtonClear type="submit" sx={{ maxWidth: '500px' }} />
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <TableQualidade
          data={ControleDeQualidade?.controles}
          loading={isLoadingControleQualidade}
          ListaProdutos={ListaProdutos}
          LinhasProducao={LinhasProducao}
          Armazens={Armazens}
          Origem={Origem}
          Defeitos={Defeitos}
        />
        <Pagination
          sx={{
            marginTop: 4,
            display: 'flex',
            justifyContent: 'center',
          }}
          count={ControleDeQualidade?.totalDePaginas}
          page={pagina + 1}
          onChange={handleChangePage}
          showFirstButton
          showLastButton
          color="primary"
        />
      </Box>
    </>
  );
};

export default ControleQualidade_View;
