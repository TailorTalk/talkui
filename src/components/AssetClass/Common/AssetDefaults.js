import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';

function AssetDefaults({ asset, handleInputChange, isEditing }) {
    console.log("Props in Asset Defaults: ", asset, "isEditing", isEditing)
    return (
        <Box display="flex" flexDirection="column" gap={2} position="relative">
            <TextField
                label="Asset Name"
                value={asset.asset_name}
                onChange={e => handleInputChange(e.target.value, 'asset_name')}
                disabled={!isEditing}
            />
            <TextField
                label="Short Description"
                value={asset.asset_short_description}
                multiline
                rows={1}
                onChange={e => handleInputChange(e.target.value, 'asset_short_description')}
                disabled={!isEditing}
            />
            <TextField
                label="Full Description"
                value={asset.asset_description}
                multiline
                rows={3}
                onChange={e => handleInputChange(e.target.value, 'asset_description')}
                disabled={!isEditing}
            />
        </Box>
    );
}

export default AssetDefaults;
