import { Box } from '@mui/material'
import ToastWarning from './Toast'

const ToastContainer = ({ messages }) => {
  return (
    <Box sx={{
      position: 'fixed',
      right: 0,
      top: 0,
      marginTop: '2.5rem',
      overflow: 'hidden',
      zIndex: 12000
    }}>
      {messages.map((item, index) => (
        <ToastWarning key={index} message={item} />
      ))}
    </Box>
  )
}

export default ToastContainer
