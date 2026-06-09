import * as React from 'react';
import ModalGuia from '../../pages/Setor_Comercial/NotasFiscaisEmitidas/components/ModalGuia';
import ShowModalGuia from '../../pages/Setor_Comercial/NotasFiscaisEmitidas/components/ModalShowGuiaAnexada';
import { LoadingButton } from '@mui/lab';

export default function ModalGuiaNF({ nf, guia, handleSubmitGuia }) {
  if (guia == false) {
    return (
      <ModalGuia numeroNotaFiscal={nf} handleSubmitGuia={handleSubmitGuia} />
    );
  } else if (guia == true) {
    return (
      <LoadingButton disabled>
        <span className="6px" style={{ color: 'black', whiteSpace: 'nowrap', }}>
          Não Necessária 
        </span>
      </LoadingButton>
    );
  } else {
    return <ShowModalGuia numeroNotaFiscal={nf} />;
  }
}
