import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingOverlay = () => {
  return (
    <Box
      sx={{
        position: 'fixed', // Use 'fixed' or 'absolute' depending on the use case
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent backdrop
        zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure it's above other content
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingOverlay;
