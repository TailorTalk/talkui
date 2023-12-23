import React from 'react';
import { Box, TextField, Checkbox } from '@mui/material';


function AssetDefaults({ asset, handleInputChange, isEditing }) {
    // console.log("Props in Asset Defaults: ", asset, "isEditing", isEditing)
    return (
        <Box display="flex" flexDirection="column" gap={2} position="relative">
            <Box display="flex" alignItems="center">
                <Checkbox
                    checked={asset.disabled || false}
                    onChange={e => handleInputChange(e.target.checked, 'disabled')}
                    disabled={!isEditing}
                />
                <span>Disable from regular execution</span>
            </Box>
            <Box display="flex" alignItems="center">
                <Checkbox
                    checked={asset.exclude_from_history || false}
                    onChange={e => handleInputChange(e.target.checked, 'exclude_from_history')}
                    disabled={!isEditing}
                />
                <span>Exclude from history</span>
            </Box>
            <div className='flex flex-col gap-8'>
            <TextField
                label="Asset Tool Name"
                value={asset.asset_tool_name || ''}
                onChange={e => handleInputChange(e.target.value, 'asset_tool_name')}
                disabled={!isEditing}
            />
            <TextField
                label="Asset tool Short Description"
                value={asset.asset_tool_short_description || ''}
                multiline
                rows={1}
                onChange={e => handleInputChange(e.target.value, 'asset_tool_short_description')}
                disabled={!isEditing}
            />
            <TextField
                label="Asset tool full Description"
                value={asset.asset_tool_description || ''}
                multiline
                rows={3}
                onChange={e => handleInputChange(e.target.value, 'asset_tool_description')}
                disabled={!isEditing}
            />
            </div>
        </Box>
    );
}

export default AssetDefaults;
