import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import AssetDefaults from '../Common/AssetDefaults';

function NoContextAsset({ asset, handleInputChange, isEditing }) {
    console.log("Asset in default asset: ", asset)
    console.log("Is editing in default asset: ", isEditing)
    return (
        <Box display="flex" flexDirection="column" gap={2} position="relative">
            <TextField
                label="Asset Name"
                value={asset.asset_name}
                onChange={e => handleInputChange(e.target.value, 'asset_name')}
                disabled={true}
            />
            <TextField
                label="Display Description"
                value={asset.asset_description}
                rows={2}
                onChange={e => handleInputChange(e.target.value, 'asset_description')}
                disabled={true}
            />
            <TextField
                label="Asset Tool Name"
                value={asset.asset_tool_name}
                onChange={e => handleInputChange(e.target.value, 'asset_tool_name')}
                disabled={true}
            />
            <TextField
                label="Asset tool Short Description"
                value={asset.asset_tool_short_description}
                multiline
                rows={1}
                onChange={e => handleInputChange(e.target.value, 'asset_tool_short_description')}
                disabled={!isEditing}
            />
            <TextField
                label="Asset tool full Description"
                value={asset.asset_tool_description}
                multiline
                rows={3}
                onChange={e => handleInputChange(e.target.value, 'asset_tool_description')}
                disabled={!isEditing}
            />
        </Box>
    );
}

export default NoContextAsset;