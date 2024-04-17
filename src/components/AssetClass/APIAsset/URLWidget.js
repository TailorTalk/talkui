import React from 'react';
import { Box, TextField } from '@mui/material';

function URLInput({ asset, handleInputChange, isEditing }) {
    // console.log("Props in Upload Widget: ", asset, "isEditing", isEditing)
    return (
        <Box display="flex" flexDirection="column" gap={2} position="relative">
            <TextField
                label="METHOD"
                value={asset.method}
                multiline
                rows={1}
                onChange={e => handleInputChange(e.target.value, 'method')}
                disabled={!isEditing}
            />
            <TextField
                label="URL"
                value={asset.url}
                multiline
                rows={1}
                onChange={e => handleInputChange(e.target.value, 'url')}
                disabled={!isEditing}
            />
            <TextField
                label="API_TYPE"
                value={asset.api_type}
                multiline
                rows={1}
                onChange={e => handleInputChange(e.target.value, 'api_type')}
                disabled={!isEditing}
            />
        </Box>
    );
}

export default URLInput;
