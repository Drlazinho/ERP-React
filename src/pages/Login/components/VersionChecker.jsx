import { useEffect, useState } from 'react'
import './styles.css'
import { Box, Button, Typography } from '@mui/material'
import { Update } from '@mui/icons-material'

const VersionChecker = () => {
    const [showUpdateMessage, setShowUpdateMessage] = useState(false)

    useEffect(() => {
        const currentVersion = import.meta.env.VITE_REACT_APP_VERSION
        const cachedVersion = localStorage.getItem('appVersion')

        if (cachedVersion !== currentVersion) {
            setShowUpdateMessage(true) // Mostra o aviso
        }
    }, [])

    const handleUpdate = () => {
        localStorage.setItem('appVersion', import.meta.env.VITE_REACT_APP_VERSION)
        window.location.reload(true) // Força o reload
    }

    if (!showUpdateMessage) return null

    return (
        <Box sx={{
            position: 'absolute', background: 'linear-gradient(90deg, #964242, #333, #964242)',
            width: '100%', height: '5rem', backgroundSize: '200% 200%',
            color: '#fff', zIndex: 2, top: 0, opacity: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', animation: 'slide-down 1s ease .5s forwards,bg-gradient 2s ease infinite',
            '@keyframes bg-gradient': {
                '50%': {
                    backgroundPosition: '100% 50%',
                },
            },
            '@keyframes slide-down': {
                '0%': {
                    transform: 'translateY(-100px)',
                },
                '100%': {
                    transform: 'translateY(0)',
                    opacity: 1
                },
            },
            gap: 2,
            paddingInline: '1rem',
        }}>
            <Typography>Uma nova versão está disponível!</Typography>
            <Button variant='contained' startIcon={< Update />} onClick={handleUpdate}>Atualize</Button>
        </Box>

    )
}

export default VersionChecker