import React from 'react';
import { Dialog, DialogContent, CircularProgress, Box, Typography, Slide } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ModalLoading(props) {
  return (
    <Dialog
      open={!props.show}
      maxWidth="sm"
      TransitionComponent={Transition}
    >
      <DialogContent>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          width="100%"
        >
          <CircularProgress color='error' />
          <Typography variant="h4" mt={2}>
            Carregando...
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}