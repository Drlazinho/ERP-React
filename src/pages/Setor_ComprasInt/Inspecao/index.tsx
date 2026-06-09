import { useState, useEffect, useCallback } from 'react'
import { InspetorTabela } from '@/components/Tabela/InspetorTabela'

import Loader from '@/components/Loader'
import InputAmvox  from '@/components/InputAmvox'
import HeaderAmvox from '@/components/HeaderAmvox'
import { Box, Button, Grid } from '@mui/material'
import { useDebounce } from '@/hooks/debounce.hook'
import { useFornecedores } from './useFornecedores'
import { useToast } from '@/hooks/toast.hook'

export default function Inspecao() {
  const [filtro, setFiltro] = useState({ fornecedor: '', doc: '' })
  const filtroDebounced = useDebounce(filtro, 500)
  const { addToast } = useToast()

  const handleDocChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(prev => ({ ...prev, doc: event.target.value }));
  }, [])
  
  const handleFornecedorChange = useCallback((event: React.ChangeEvent<HTMLInputElement>)=> {
    setFiltro(prev => ({ ...prev, fornecedor: event.target.value  }))
  }, [])

  const handleClear = () => {
    setFiltro({ fornecedor: '', doc: '' })
  }

  const { data, isLoading, isError } = useFornecedores(filtroDebounced)

  useEffect(() => {
    if (isError) {
      addToast({
        type: 'danger',
        title: '',
        description: 'Erro grave - Informações não carregadas',
      })
    }
  }, [isError])

  return (
    <Box sx={{ px: 2 }}>
        <HeaderAmvox title='Inspection / 检查'/>
        <Grid container spacing={2} alignItems="flex-end" sx={{ mt: 2 }}>
        <Grid sx={{ sx: 12 , md: 4}}>
          <InputAmvox
            label="Pro Forma"
            placeholder="Pro forma"
            name="doc"
            value={filtro.doc}
            onChange={handleDocChange}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid sx={{ sx: 12 , md: 4}}>
          <InputAmvox
            label="Fornecedor"
            placeholder="Fornecedor"
            name="fornecedor"
            value={filtro.fornecedor}
            onChange={handleFornecedorChange}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid sx={{ sx: 12 , md: 4}}>
          <Button
            fullWidth
            variant="outlined"
            color="error"
            onClick={handleClear}
            startIcon={<i className="fas fa-trash" />}
          >
            Clear
          </Button>
        </Grid>
      </Grid>

        <div className="row">
          <div className="col-md-12 mt-4">
            <div style={{ height: 600, width: '100%', overflow: 'scroll' }}>
              {isLoading ? (
                <Loader />
              ) : (
                <InspetorTabela inspecao={data ?? []} />
              )}
            </div>
          </div>
        </div>
    </Box>
  )
}
