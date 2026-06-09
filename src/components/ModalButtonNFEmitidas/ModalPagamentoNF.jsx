import * as React from 'react';
import { ModalPagamento } from '../../pages/Setor_Comercial/NotasFiscaisEmitidas/components/ModalPagamento';
import { LoadingButton } from '@mui/lab';

export default function ModalPagamentoNF({
  pagamento,
  guia,
  nf,
  updateTabela,
}) {
  if (pagamento == false && guia == true) {
    return (
      <LoadingButton>
        <ModalPagamento numeroNotaFiscal={nf} updateTabela={updateTabela} />
      </LoadingButton>
    );
  } else if (pagamento == true && guia == true) {
    return (
      <LoadingButton>
        <span className="6px" style={{ color: 'black', whiteSpace: 'nowrap' }}>
          PAGAMENTO EFETUADO
        </span>
      </LoadingButton>
    );
  } else {
    return (
      <LoadingButton disabled>
        <span className="6px" style={{ color: 'black', whiteSpace: 'nowrap' }}>
          AGUARDANDO GUIA
        </span>
      </LoadingButton>
    );
  }
}
