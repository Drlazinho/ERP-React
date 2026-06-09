import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import PersonIcon from '@mui/icons-material/Person';

export default function CardTI({ endpointRef, bgColor, yearData, monthData, dayData, setor, color, icon }) {
    return (
        <Box sx={{ width: '100%', bgcolor: bgColor, borderRadius: 2.5, position: 'relative', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ height: 'max-content', width: '100%', bgcolor: 'transparent', zIndex: 2, position: 'absolute', bottom: '80%' }}>
            <Box sx={{ width: 'max-content', bgcolor: '#fff', borderRadius: 2.5, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', margin: 'auto', paddingX: 2 }}>
                {/* Icon por page React-icons / Material Icon */}
                {/* <PersonIcon /> */}
                {icon}
                <Typography variant='body1'>{endpointRef}</Typography>
            </Box>
            </Box>    
            <Box sx={{ display: 'flex', gap: 2, margin: 'auto', marginTop: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignCenter: 'center' }}>
                    <Typography align='center' sx={{ color }}>ANO</Typography>
                    <Typography align='center' sx={{ color }}>{yearData ?? '---'}</Typography>
                </Box>
                <Divider orientation="vertical" variant="fullWidth" flexItem sx={{ width: 5, color: '#000', bgcolor: "#000" }} />
                <Box>
                    <Typography align='center' sx={{ color }}>MES</Typography>
                    <Typography align='center' sx={{ color }}>{monthData ?? '---'}</Typography>
                </Box>
                <Divider orientation="vertical" variant="fullWidth" flexItem sx={{ width: 5, color: '#000', bgcolor: "#000" }} />
                <Box>
                    <Typography align='center' sx={{ color }}>DIA</Typography>
                    <Typography align='center' sx={{ color }}>{dayData ?? '---'}</Typography>
                </Box>
            </Box>
            <Box sx={{ bgcolor: bgColor, filter: 'brightness(90%)', minWidth: '100px', width: '40%', margin: 'auto', borderRadius: '10px 10px 0 0' }}>
                <Typography align='center'sx={{ color, boxShadow: '0px -1px 5px -2px rgba(255,255,255,0.58)', borderRadius: '12px 12px 0 0' }}>{setor}</Typography>
            </Box>
        </Box>
    )
}
