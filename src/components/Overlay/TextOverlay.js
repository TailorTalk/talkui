import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const TextOverlay = ({ message }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bgcolor="background.paper"
      zIndex="modal"
    >
      <Paper elevation={3} sx={{ padding: '20px', borderRadius: '4px', backgroundColor: 'error.main', color: 'common.white' }}>
        <Typography variant="h6">{message}</Typography>
      </Paper>
    </Box>
  );
};

export default TextOverlay;
