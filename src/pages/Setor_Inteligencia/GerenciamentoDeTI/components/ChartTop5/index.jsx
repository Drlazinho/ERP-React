import React from 'react'
import { ColumnData, Container, ContainerGroupColumn, Title } from './style'
import { Rating, Typography } from '@mui/material'
import { setorSelect } from '@/repositories/setor'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export default function ChartTop5({ data = null }) {

    const setorRetorno = (value) => {
        const setores = setorSelect.find((setor) => setor.valor === value)
        return setores.nome
    }

    return (
        <Container>
            <Title>Top 5 Acessos User</Title>
            <ContainerGroupColumn>
                <ColumnData bgColor={'#381d2a'} positionValue={4}>
                    <div className='content_data'>
                        <Typography variant='body1' color='#000' align='center'>{data ? data[3].nome : '...'}</Typography>
                        <Typography variant='body1' color='#000' align='center'>{data ? setorRetorno(data[3].setor) : '...'}</Typography>
                        <Typography variant='body1' color='#000' align='center'>{data ? data[3].quantidadeAcesso + ' Acessos' : '...'} </Typography>
                    </div>
                    <div className='header_podium'></div>
                    <div className='footer_podium'>

                        <p className='number_classification'>4</p>
                    </div>
                </ColumnData>
                <ColumnData bgColor={'#3e6990'} positionValue={2}>
                    <div className='content_data'>
                        <Typography variant='body1' color='#000' align='center'>{data ? data[1].nome : '...'}</Typography>
                        <Typography variant='body1' color='#000' align='center'>{data ? setorRetorno(data[1].setor) : '...'}</Typography>
                        <Typography variant='body1' color='#000' align='center'>{data ? data[1].quantidadeAcesso + ' Acessos' : '...'} </Typography>
                    </div>
                    <div className='header_podium'></div>
                    <div className='footer_podium'>
                        <p className='number_classification'>2</p>
                    </div>
                </ColumnData>
                <ColumnData bgColor={'#aabd8c'} positionValue={1}>
                    <div className='content_data'>
                        <Typography variant='body1' color='#000' align='center'>{data ? data[0].nome : '...'}</Typography>
                        <Typography variant='body1' color='#000' align='center'>{data ? setorRetorno(data[0].setor) : '...'}</Typography>
                        <Typography variant='body1' color='#000' align='center'>{data ? data[0].quantidadeAcesso + ' Acessos' : '...'} </Typography>
                    </div>
                    <div className='header_podium'></div>
                    <div className='footer_podium'>
                        <p className='number_classification'>1</p>
                        <EmojiEventsIcon fontSize='large' color='warning'/>
                    </div>
                </ColumnData>
                <ColumnData bgColor={'#e9e3b4'} positionValue={3}>
                    <div className='content_data'>
                        <Typography variant='body1' color='#000' align='center'>{data ? data[2].nome : '...'}</Typography>
                        <Typography variant='body1' color='#000' align='center'>{data ? setorRetorno(data[2].setor) : '...'}</Typography>
                        <Typography variant='body1' color='#000' align='center'>{data ? data[2].quantidadeAcesso + ' Acessos' : '...'} </Typography>
                    </div>
                    <div className='header_podium'></div>
                    <div className='footer_podium'>
                        <p className='number_classification'>3</p>
                    </div>
                </ColumnData>
                <ColumnData bgColor={'#f39b6d'} positionValue={5}>
                    <div className='content_data'>
                        <Typography variant='body1' color='#000' align='center'>{data ? data[4].nome : '...'}</Typography>
                        <Typography variant='body1' color='#000' align='center'>{data ? setorRetorno(data[4].setor) : '...'}</Typography>
                        <Typography variant='body1' color='#000' align='center'>{data ? data[4].quantidadeAcesso + ' Acessos' : '...'} </Typography>
                    </div>
                    <div className='header_podium'></div>
                    <div className='footer_podium'>
                        <p className='number_classification'>5</p>
                    </div>
                </ColumnData>
            </ContainerGroupColumn>
        </Container>
    )
}
