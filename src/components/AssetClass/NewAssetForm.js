import React from 'react';
import { Box, TextField, Button } from '@mui/material';

function NewAssetForm({ setOpen }) {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField label="Bot name" />
      <TextField label="Bot description" />
      {/* Add any other input fields */}
      <Button onClick={() => {
          // Logic to create a new org
          setOpen(false);
      }}>
          Create
      </Button>
    </Box>
  );
}

export default NewAssetForm;
