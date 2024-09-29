import React from 'react';
import { Modal as MuiModal, Box, Typography, Button } from '@mui/material';

const Modal = ({ open, handleClose, title, content, onConfirm }) => {
  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box className="modal">
        <Typography id="modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          {content}
        </Typography>
        <Button onClick={onConfirm}  sx={{ mt: 2, color:"var(--primary-text-color)" }}>
          OK
        </Button>
      </Box>
    </MuiModal>
  );
};

export default Modal;
