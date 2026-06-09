import { useToast } from '@/hooks/toast.hook'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { PostMotorista } from '../recebimentoContainer.service'

export default function useRegistroMotorista() {
  const { addToast } = useToast()

      const { mutateAsync: RegistrarMotorista, isPending: isPendingMotorista, error: errorMotorista, isSuccess } = useMutation({
        mutationFn: PostMotorista,
      })
    
      useEffect(() => {
        if (errorMotorista) {
          addToast({
            type: 'error',
            title: 'Erro ao registrar motorista',
            description: errorMotorista.message,
          })
        }
      }, [errorMotorista])
      
      useEffect(() => {
        if (isSuccess) {
          addToast({
            type: 'success',
            title: 'Sucesso ao registrar motorista',
            description: isSuccess,
          })
        }
      }, [isSuccess])


  return { RegistrarMotorista, isPendingMotorista }
}
