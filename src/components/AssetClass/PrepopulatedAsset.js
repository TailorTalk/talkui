import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import DefaultAsset from './DefaultAsset';

function PrepopulatedAsset({ asset, setOpen, onAssetUpdate }) {
    if (asset.asset_class === "default") {
        console.log("rendering default asset: ", asset)
        return (<DefaultAsset assetDetails={asset} onAssetUpdate={onAssetUpdate}/>)
    } else {
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography> This asset class is not supported yet. </Typography>
          {/* Add any other input fields */}
          <Button onClick={() => {
              // Logic to create a new org
              setOpen(false);
          }}>
              Close
          </Button>
        </Box>
    }
}

export default PrepopulatedAsset;
