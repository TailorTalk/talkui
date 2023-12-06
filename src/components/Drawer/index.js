// SideDrawer.js
import React from 'react';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

// Styled component for heading
const Heading = styled(Typography)({
  padding: '16px',
});

function SideDrawer({ open, onClose, heading, children }) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          width: '50%',
        },
      }}
    >
      {heading && <Heading variant="h6">{heading}</Heading>}
      <div style={{padding: '16px'}}>
      {children} {/* Render the passed child components here */}
      </div>
    </Drawer>
  );
}

export default SideDrawer;
