import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './styles.css';
import { Box, Typography, Modal as MuiModal, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '1000px',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #333333',
  borderRadius: '8px',
  boxShadow: 10,
  justifyContent: 'center',
  alignItems: 'center',
  padding: '24px',
  overflowY: 'auto',
};

function ModalCheck({
  titleStageModal,
  dateStageModal,
  checkedState,
  readOnly,
}) {
  const [modal, setModal] = useState(false);
  const [check, setChecked] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const checked = () => {
    setChecked(!check);
    setModal(!modal);
  };

  return (
    <div>
      {check === false && !readOnly && (
        <Button onClick={toggle} className="btn-modal" size="sm" block>
          Update data
        </Button>
      )}

      <MuiModal open={modal} onClose={toggle}>
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: '24px',
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontSize: '20px', fontWeight: 'bold', color: '#333333' }}
            >
              {titleStageModal}
            </Typography>

            <Button
              type="reset"
              onClick={() => {
                toggle();
              }}
            >
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>
          <Box>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{' '}
            <strong>{dateStageModal}</strong>
            <br />
          </Box>
          <Box>
            <>
              <Button color="primary" onClick={() => checkedState(checked())}>
                Get Conclused
              </Button>{' '}
              <Button color="secondary" onClick={() => toggle()}>
                Cancel
              </Button>
            </>
            {/* {check === false ? (
              <>
                <Button color="primary" onClick={() => checkedState(checked())}>
                  Get Conclused
                </Button>{' '}
                <Button color="secondary" onClick={() => toggle()}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button color="danger" onClick={() => checkedState(checked())}>
                  Cancel Conclused
                </Button>{' '}
                <Button color="secondary" onClick={() => toggle()}>
                  Cancel
                </Button>
              </>
            )} */}
          </Box>
        </Box>
      </MuiModal>
    </div>
  );
}

export default ModalCheck;
