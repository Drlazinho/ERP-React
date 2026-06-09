// components/ImagePreviewCard.tsx
import React from 'react'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import foto from '@/assets/produtos/sem-foto.png'

const ImagePreview_Card = React.memo(({ image }) => {
  return (
    <Card
      elevation={4}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.3s',
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Imagem do Produto
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        width="100%"
        height={400}
        image={image || foto}
        alt="Produto"
        sx={{ objectFit: 'contain', p: 1 }}
        loading="lazy"
      />
    </Card>
  )
})

export default ImagePreview_Card
