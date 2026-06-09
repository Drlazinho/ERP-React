import { useEffect, useState } from 'react';
import { useToast } from '../../../../../hooks/toast.hook';
import useUsuarioLocal from '../../../../../hooks/usuarioLocal.hook';

const notaInicial = {
    NOTA: '',
    DATA_VENCIMENTO: '',
    SETOR_ORIGEM: '',
    ANEXO: '',
    OBSERVACAO: '',
    ID_APROV: 0,
    ID_TIPO: 0,
    ID_USER: 0,
  };

  const listaIdAprov = [
    {
      label: 'Gilberto Artur - Prod/Adm/Ti',
      value: 3,
      email: 'artur@amvox.com.br'
    },
    {
      label: 'Lucas Souza - Pos-Venda',
      value: 19,
      email: 'gerenciaposvendas@amvox.com.br'
    },
    {
      label: 'Alexandro Teixeira - Fiscal',
      value: 40,
      email: 'fiscal@amvox.com.br'
    },
    {
      label: 'Calebe Moraes - Financeiro',
      value: 97,
      email: 'gerentefinanceiro@amvox.com.br'
    },
    {
      label: 'Priscila Souza - Pós-Venda',
      value: 50,
      email: 'supervisoraatendimento@amvox.com.br'
    },
  ];


  export default function RegistroNotaModal(props) {
    const [enabled, setEnable] = useState(false);
    const [notaFiscalInfo, setNotaFiscalInfo] = useState(notaInicial);
    const [emailDestino, setEmailDestino] = useState('')
  
    const { addToast } = useToast();
  
    const { nome, id, setor } = useUsuarioLocal();
  
    useEffect(() => {
      if (props.notaFiscalSelecionada) {
        setNotaFiscalInfo(props.notaFiscalSelecionada);
      }
    }, [props.notaFiscalSelecionada]);
  
    const inputTextHandler = (e) => {
      const { name, value } = e.target;
      setNotaFiscalInfo({
        ...notaFiscalInfo,
        [name]: value,
        ID_USER: id,
      });
    };
  
    const handleCancelar = (e) => {
      e.preventDefault();
  
      props.cancelarNota();
  
      setNotaFiscalInfo(notaInicial);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      props.adicionarNovaNota(notaFiscalInfo, emailDestino);
      setNotaFiscalInfo(notaInicial);
    };
  
    const handleSelectChangeTipoNota = (selectedOption) => {
      setNotaFiscalInfo({
        ...notaFiscalInfo,
        ID_TIPO: selectedOption.value,
      });
    };
  
    const handleSelectChangeSetor = (selectedOption) => {
      setNotaFiscalInfo({
        ...notaFiscalInfo,
        SETOR_ORIGEM: selectedOption.value,
      });
    };
    const handleSelectChangeAprovID = (selectedOption) => {
      setNotaFiscalInfo({
        ...notaFiscalInfo,
        ID_APROV: selectedOption.value,
      });
      setEmailDestino(selectedOption.email)
    };
  
    const selectTipoNotaLista = props.protocoloTipo.map((item) => ({
      value: item.id,
      label: item.descricao,
    }));
  
    const selectSetorLista = setorSelect.map((item) => ({
      value: item.nome,
      label: item.nome,
    }));


 








  {/* <div className="col-sm-6 col-12">
              <label className="form-label">Data de Vencimento*</label>
              <input
                name="DATA_VENCIMENTO"
                value={notaFiscalInfo?.DATA_VENCIMENTO}
                onChange={inputTextHandler}
                id="dataVencimento"
                type="datetime-local"
                className="form-control"
                required
              />
            </div> */}
            {/* <div className="col-sm-6 col-12">
              <label className="form-label">Setor Origem</label>
              <Select
                aria-required
                options={selectSetorLista}
                onChange={handleSelectChangeSetor}
                placeholder="Setor"
              />
            </div> */}

            {/* <div className="col-sm-6 col-12">
              <label className="form-label">Tipo</label>
              <Select
                aria-required
                options={selectTipoNotaLista}
                onChange={handleSelectChangeTipoNota}
                placeholder="Tipo"
              />
            </div> */}
            {/* <div className="col-sm-6 col-12">
              <label className="form-label">Aprovador</label>
              <Select
                aria-required
                options={listaIdAprov}
                onChange={handleSelectChangeAprovID}
                placeholder="Tipo"
              />
            </div> */}
        }