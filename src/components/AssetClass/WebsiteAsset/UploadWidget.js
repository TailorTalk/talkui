import React from 'react';
import { Box, TextField } from '@mui/material';

function UploadWidget({ asset, handleInputChange, isEditing }) {
    // console.log("Props in Upload Widget: ", asset, "isEditing", isEditing)
    return (
        <Box display="flex" flexDirection="column" gap={2} position="relative">
            <TextField
                label="URL"
                value={asset.url}
                multiline
                rows={1}
                onChange={e => handleInputChange(e.target.value, 'url')}
                disabled={!isEditing}
            />
        </Box>
    );
}

export default UploadWidget;
