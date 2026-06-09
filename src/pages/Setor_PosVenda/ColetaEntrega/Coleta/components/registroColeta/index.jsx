import React, { useCallback, useEffect, useRef, useState } from 'react';
import { buscarMunicipiosPorUF } from '@/services/municipiosPorUf.service';
import { useToast } from '@/hooks/toast.hook';
import debounce from '@/utils/debounce';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { estadosBrasileiros } from '@/utils/estadosBrasileiros';
import { consultaProdutos } from '@/services/produtos/produtos.service';
import Select from 'react-select';
import { Box, TextField, Typography, Button } from '@mui/material';
import './style.css';

const registroInicial = {
  protocolo: '',
  clienteDocumento: '',
  clienteNome: '',
  classificacao: '',
  observacao: '',
  uf: '',
  municipio: '',
  destino: '',
  notaFiscal: '',
  produtos: [
    {
      protocolo: '',
      codigoProduto: '',
      quantidade: 0,
    },
  ],
};

const registroInicialArquivo = {
  protocolo: '',
  anexo1: '',
  anexo2: '',
  anexo3: '',
};

const col4Styles = {
  flexGrow: 1,
  flexBasis: '25%',
  maxWidth: '25%',
};

export default function RegistroColetaNewForm(props) {
  const [registroInfo, setRegistroInfo] = useState(registroInicial);
  const [produtosLista, setProdutosLista] = useState([]);
  const [registroDeProdutos, setRegistroDeProdutos] = useState({
    protocolo: '',
    codigoProduto: '',
    quantidade: 0,
  });
  const [listaDeRegistroProduto, setListaRegistroProduto] = useState([]);
  const [adicionado, setAdicionado] = useState(false);
  const [filtroProdutos, setFiltroProdutos] = useState([]);
  const [nomeDoProduto, setNomeDoProduto] = useState([]);

  const [itemTabelaProdutos, setItemTabelaProdutos] = useState({});
  const [tabelaProdutos, setTabelaProdutos] = useState([]);

  const [municipioLista, setMunicipioLista] = useState([]);
  const [estado, setEstado] = useState([]);
  const [valorSelected, setValorSelected] = useState('');
  const { addToast } = useToast();

  const [registroInfoArquivo, setRegistroInfoArquivo] = useState(
    registroInicialArquivo
  );

  const [imagePreview1, setImagePreview1] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);
  const [imagePreview3, setImagePreview3] = useState(null);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (option) => {
    setSelectedOption(option);
  };

  const valorRef = useRef(null);

  const handleClearFormProduto = (e) => {
    e.preventDefault();
    e.target.reset();
  };

  const inputTextHandler = (e) => {
    const { name, value } = e.target;
    setRegistroInfo({ ...registroInfo, [name]: value });
  };

  const handleClear = (e) => {
    e.preventDefault();
    props.cancelarRegistro();
    setRegistroInfo(registroInicial);
    setRegistroInfoArquivo(registroInicialArquivo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.registrarColeta(registroInfo, registroInfoArquivo);
    setRegistroInfo(registroInicial);
  };

  useEffect(() => {
    handleFetchMunicipios();
  }, [estado]);

  const handleFetchNomeProdutos = useCallback(() => {
    try {
      consultaProdutos().then((retorno) => {
        setProdutosLista(
          retorno.map((item) => ({
            value: item.codigo,
            label: item.apelido,
          }))
        );
      });
    } catch (error) {
      addToast({
        type: 'danger',
        title: 'Erro ao listar os produtos',
        description:
          'Erro ao listar os produtos, por favor tente novamente dentre de instantes',
      });
    }
  }, []);

  const handleFetchNomeProdutosParaVisualizacao = useCallback(() => {
    try {
      consultaProdutos({ codigo: registroDeProdutos.codigoProduto }).then(
        (retorno) => {
          setNomeDoProduto(retorno.value.apelido);
        }
      );
    } catch (error) {
      addToast({
        type: 'danger',
        title: 'Erro ao listar os produtos',
        description:
          'Erro ao listar os produtos, por favor tente novamente dentre de instantes',
      });
    } finally {
      setItemTabelaProdutos({
        ...itemTabelaProdutos,
        nomeProduto: nomeDoProduto,
      });
    }
  }, [registroDeProdutos]);

  useEffect(() => {
    handleFetchNomeProdutosParaVisualizacao();
  }, [registroDeProdutos]);

  useEffect(() => {
    handleFetchNomeProdutos();
    valorRef.current.value = 0;
  }, []);

  const handleFetchMunicipios = useCallback(() => {
    buscarMunicipiosPorUF(estado)
      .then((res) => {
        setMunicipioLista(res.data);
      })
      .catch(() =>
        addToast({
          type: 'danger',
          title: 'Erro ao Listar os Municípios',
          description:
            'Erro ao Listar os Municípios - por favor tente novamente dentre de instantes !',
        })
      );
  }, [estado]);

  const handleSelectedValue = (selectedOption) => {
    setRegistroDeProdutos({
      ...registroDeProdutos,
      codigoProduto: selectedOption.value,
    });
    setItemTabelaProdutos({
      ...itemTabelaProdutos,
      codigo: selectedOption.value,
    });
    setFiltroProdutos(selectedOption.value);
    setValorSelected(selectedOption.value);
  };

  const destinoLista = [
    'ALTAMIRA-PA',
    'ANANINDEUA-PA',
    'ARAGUAINA-TO',
    'BELEM-PA',
    'BELO HORIZONTE-MG ',
    'BREU BRANCO-PA',
    'BREVES-PA',
    'CAJAMAR-SP',
    'CAMAÇARI-BA',
    'CAPANEMA-PA',
    'CASTANHAL-PA ',
    'CASTELO-ES',
    'CRISSIUMAL-RS',
    'CUIABA-MT',
    'CURITIBA-PR',
    'FLORIANOPOLIS-SC',
    'FORTALEZA-CE',
    'IMPERATRIZ-MA',
    'JUAZEIRO DO NORTE-CE',
    'MANAUS-AM MARABA-PA',
    'MOGI-GUAÇU-SP',
    'NACAPA-AP',
    'NOVO HAMBURGO-RS',
    'OURO PRETO DO OESTE-RO',
    'PARAUAPEBAS-PA',
    'ROLIM DE MOURA-RO',
  ];

  const adicionarProdutoNaTabela = (e) => {
    e.preventDefault();
    // adicionarRegistroDeProdutoLista()
    tabelaProdutos.push(itemTabelaProdutos);
    listaDeRegistroProduto.push(registroDeProdutos);
    setRegistroInfo({ ...registroInfo, produtos: listaDeRegistroProduto });
    valorRef.current.value = 0;
    setValorSelected('');
    handleFetchNomeProdutosParaVisualizacao();
    setAdicionado(true);
  };

  function removerItemArray(array, item) {
    const index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      newArray.push({
        protocolo: registroInfo.protocolo,
        codigoProduto: array[i].codigo,
        quantidade: parseInt(array[i].quantidade),
      });
    }
    setRegistroInfo({ ...registroInfo, produtos: newArray });
    return array;
  }

  const deletarItemDaTabelaERegistro = (item, e) => {
    e.preventDefault();
    removerItemArray(tabelaProdutos, item);
    const novaListaDeRegistroDeProduto = listaDeRegistroProduto.filter(
      (produtoRegistrado) => produtoRegistrado.codigoProduto !== item.codigo
    );
    setListaRegistroProduto(novaListaDeRegistroDeProduto);
    handleFetchNomeProdutosParaVisualizacao();
  };

  const listaDeEstadosUf = estadosBrasileiros.map((item) => {
    const nomeSigla = item.value + ' - ' + item.label;
    return {
      value: item.value,
      label: nomeSigla,
    };
  });

  const listadeDestino = destinoLista.map((item) => ({
    value: item,
    label: item,
  }));

  const listaDeMunicipiosUf = municipioLista.map((item) => ({
    value: item.nome,
    label: item.nome,
  }));

  const handleSelectChangeUF = (selectedOption) => {
    setEstado(selectedOption.value);
    setRegistroInfo({ ...registroInfo, uf: selectedOption.value });
  };

  const handleSelectChangeDestino = (selectedOption) => {
    setRegistroInfo({ ...registroInfo, destino: selectedOption.value });
  };

  const handleSelectChangeMunicipio = (selectedOption) => {
    setRegistroInfo({ ...registroInfo, municipio: selectedOption.value });
  };

  return (
    <form>
      <div className="row" style={{ paddingBottom: '1rem' }}>
        <Typography
          variant="h6"
          sx={{ color: '#AA0000', paddingBottom: '10px' }}
        >
          Registro
        </Typography>
        <Box sx={col4Styles}>
          <TextField
            id="outlined-basic"
            label="Protocolo"
            variant="outlined"
            name="protocolo"
            size="small"
            defaultValue={registroInfo?.PROTOCOLO}
            onChange={(e) => {
              debounce(() => {
                setRegistroDeProdutos({
                  ...registroDeProdutos,
                  protocolo: e.target.value,
                });
                setRegistroInfo({ ...registroInfo, protocolo: e.target.value });
                setRegistroInfoArquivo({
                  ...registroInfoArquivo,
                  protocolo: e.target.value,
                });
              }, 2000);
            }}
            type="number"
            placeholder="Protocolo"
            required
            fullWidth
          />
        </Box>

        <Box sx={col4Styles}>
          <TextField
            id="outlined-basic"
            label="Nota Fiscal"
            variant="outlined"
            name="notaFiscal"
            size="small"
            defaultValue={registroInfo?.NOTA_FISCAL}
            onChange={(e) => {
              setRegistroInfo({ ...registroInfo, notaFiscal: e.target.value });
            }}
            type="number"
            placeholder="Nota Fiscal"
            required
            fullWidth
          />
        </Box>

        <Box sx={col4Styles}>
          <TextField
            id="outlined-basic"
            label="Nome"
            variant="outlined"
            name="clienteNome"
            size="small"
            defaultValue={registroInfo?.CLIENTE_NOME}
            onChange={inputTextHandler}
            type="text"
            placeholder="Nome"
            required
            fullWidth
          />
        </Box>

        <Box sx={col4Styles}>
          <TextField
            id="clienteDocumento"
            label="CPF/CNPJ"
            variant="outlined"
            name="clienteDocumento"
            size="small"
            defaultValue={registroInfo?.CLIENTE_DOCUMENTO}
            onChange={inputTextHandler}
            placeholder="CPF/CNPJ"
            type="number"
            required
            fullWidth
          />
        </Box>
      </div>

      <div className="row py-2" style={{ paddingBottom: '2rem' }}>
        <div className="col-4">
          <div className="form-label">
            <Select
              options={listaDeEstadosUf}
              onChange={handleSelectChangeUF}
              placeholder="Selecione o Estado *"
            />
          </div>
        </div>

        <div className="col-4">
          <div className="form-label">
            <Select
              aria-required
              options={listaDeMunicipiosUf}
              onChange={handleSelectChangeMunicipio}
              placeholder="Selecione um Município *"
            />
          </div>
        </div>

        <div className="col-4">
          <div className="form-label">
            <Select
              aria-required
              options={listadeDestino}
              onChange={handleSelectChangeDestino}
              placeholder="Selecione um Destino *"
            />
          </div>
        </div>
      </div>
      <Box sx={{ width: '24%', paddingBottom: '15px' }}>
        <div className="form-label">
          <label>Classificação</label>
          <select
            name="classificacao"
            className="form-select"
            aria-label="Floating label select example"
            onChange={inputTextHandler}
            placeholder="Selecione a Classificação"
          >
            <option selected disabled>
              Escolha uma classificação *
            </option>
            <option value="CONSUMIDOR">CONSUMIDOR</option>
            <option value="POSTO">POSTO</option>
            <option value="REVENDA">REVENDA</option>
          </select>
        </div>
      </Box>
      <label>Observação:</label>
      <div className="form-label">
        <textarea
          className="form-control"
          name="observacao"
          defaultValue={registroInfo?.OBSERVACAO}
          onChange={inputTextHandler}
          id="floatingTextarea2"
          style={{ height: '160px' }}
        ></textarea>
      </div>
      <Typography variant="h6" sx={{ color: '#AA0000', paddingBottom: '10px' }}>
        Produtos
      </Typography>
      {/* PRODUTOS */}
      <fieldset
        className="row py-2 border my-2 mx-1"
        style={{ borderRadius: '10px' }}
      >
        <form onSubmit={handleClearFormProduto}>
          <div className="row d-flex align-items-end">
            <div className="col-3">
              <label className="form-label">Produtos</label>
              <Select
                options={produtosLista}
                onChange={handleSelectedValue}
                placeholder={'Produtos'}
                disabled={registroInfo.protocolo === ''}
              />
            </div>
            <div className="col-3">
              <label className="form-label">Código</label>
              <input
                name="codigoProduto"
                id="codigoProduto"
                defaultValue={registroDeProdutos.codigoProduto}
                type="text"
                className="form-control"
                placeholder="Código"
                disabled
              />
            </div>
            <div className="col-3">
              <label className="form-label">Quantidade</label>
              <input
                name="quantidade"
                id="quantidade"
                defaultValue={itemTabelaProdutos?.quantidade}
                ref={valorRef}
                onChange={(e) => {
                  setRegistroDeProdutos({
                    ...registroDeProdutos,
                    quantidade: parseInt(e.target.value),
                  });
                  setItemTabelaProdutos({
                    ...itemTabelaProdutos,
                    quantidade: e.target.value,
                  });
                }}
                type="number"
                className="form-control"
                disabled={valorSelected === ''}
              />
            </div>
            <div className="col-3">
              <Button
                onClick={adicionarProdutoNaTabela}
                disabled={
                  registroDeProdutos.codigoProduto === '' ||
                  valorSelected === ''
                }
                style={{
                  border: '2px solid blue',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  color: 'blue',
                }}
                startIcon={<AddIcon />}
              >
                Adicionar
              </Button>
            </div>
          </div>
          <div className="row mt-3 px-4 py-2">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" style={{ width: '70%', textAlign: 'left' }}>
                    Produto
                  </th>
                  <th scope="col" style={{ textAlign: 'left' }}>
                    Código
                  </th>

                  <th scope="col" style={{ textAlign: 'center' }}>
                    Quantidade
                  </th>

                  <th scope="col" style={{ textAlign: 'left' }}>
                    Deletar
                  </th>
                </tr>
              </thead>
              <tbody>
                {tabelaProdutos.map((item) => (
                  <tr key={item.codigo} scope="row">
                    <td style={{ textAlign: 'left' }}>{item.nomeProduto}</td>
                    <td style={{ textAlign: 'left' }}>{item.codigo}</td>

                    <td style={{ textAlign: 'center' }}>{item.quantidade}</td>
                    <td style={{ textAlign: 'left' }}>
                      <Button
                        onClick={(e) => deletarItemDaTabelaERegistro(item, e)}
                        style={{
                          border: '2px solid red',
                          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                          transition:
                            'transform 0.2s ease, box-shadow 0.2s ease',
                        }}
                      >
                        <DeleteIcon
                          style={{ fontSize: '18px', color: 'red' }}
                        />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </fieldset>

      <fieldset
        className="border my-2 mx-1 px-1 pb-4 row"
        style={{ borderRadius: '10px', paddingTop: '12px' }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '16px',
            color: '#AA0000',
            marginBottom: '24px',
          }}
        >
          Imagem
          <span style={{ fontSize: '12px', color: '#333' }}>
            {''} (Somente arquivos tipo JPEG ou PNG)
          </span>
        </Typography>
        <div className="col-4">
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '14px',
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
              fontSize: '14px',
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
              fontSize: '14px',
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

      {/* Buttons */}
      <div className="d-flex justify-content-between mt-2">
        <small />
        <div className="d-flex" style={{ gap: '12px' }}>
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
            disabled={!adicionado}
          >
            Salvar
          </Button>
        </div>
      </div>
    </form>
  );
}
