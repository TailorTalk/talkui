import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';

function AssetDefaults({ assetDetails, onAssetUpdate }) {

    const handleInputChange = (e, key) => {
        let temp = { ...assetDetails };
        temp[key] = e.target.value;
        onAssetUpdate(temp);
    };

    return (
        <Box display="flex" flexDirection="column" gap={2} position="relative">
            <TextField
                label="Asset Name"
                value={assetDetails.asset_name}
                onChange={e => handleInputChange(e, 'asset_name')}
                disabled={false}
            />
            <TextField
                label="Short Description"
                value={assetDetails.asset_short_description}
                multiline
                rows={1}
                onChange={e => handleInputChange(e, 'asset_short_description')}
                disabled={false}
            />
            <TextField
                label="Full Description"
                value={assetDetails.asset_description}
                multiline
                rows={3}
                onChange={e => handleInputChange(e, 'asset_description')}
                disabled={false}
            />
        </Box>
    );
}

export default AssetDefaults;
