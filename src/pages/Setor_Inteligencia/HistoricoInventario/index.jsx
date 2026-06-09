import { useCallback, useEffect, useState } from "react";
import HistoricoMovimentacaoEquipamentoTabela from "./tabelaHistoricoMovimentacaoEquipamento";
import { buscarinvEquipamentoColaborador } from "@/pages/Setor_Inteligencia/Inventario/invEquipamento.service";
import { useToast } from "@/hooks/toast.hook";
import { Add, ComputerOutlined, KeyboardReturn } from "@mui/icons-material";
import { Button,  Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

export default function HistoricoInventario () {

const [listaEquipamento, setListaEquipamento] = useState({});
const { addToast } = useToast();

const handleLista = useCallback(() =>{
    buscarinvEquipamentoColaborador().then((res) => {
        setListaEquipamento(res);
    }).catch((error) => {
        addToast({
          type: 'danger',
          title: 'Erro ao atualizar Equipamento!',
          description: error.response.data.message,
        });
      });
}, []);

useEffect(() => {
    handleLista();
  }, []);

    return(
        <>
             <Box sx={{ position: 'relative' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
                textShadow: '-1px -1px 6px #000000',
                color: 'rgb(248, 249, 250)',
                p: [2],
              }}
            >
              <ComputerOutlined size={28} />
              <Typography variant="h4">Histórico Inventario Equipamento</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <Link to={-1}>
              <Button
                variant="contained"
                color="error"
                sx={{
                  '@media (max-width: 600px)': { width: '90%' },
                  marginBottom: '5px',
                }}
                startIcon={<KeyboardReturn />}
              >
                Inventario
              </Button>
              </Link>
              </Box>
            
            <HistoricoMovimentacaoEquipamentoTabela data={listaEquipamento}/>
            </Box>
        </>
    )

}