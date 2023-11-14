import React, { useEffect } from 'react';
import { Box, TextField } from '@mui/material';

function OutputWidget({ asset, handleInputChange, isEditing }) {
    console.log("Props in Asset Defaults: ", asset, "isEditing", isEditing)

    return (
        <Box display="flex" flexDirection="column" gap={2} position="relative">
            <TextField
                label="Instruction to the asset's model"
                value={asset.internal_instruction}
                multiline
                rows={3}
                onChange={e => handleInputChange(e.target.value, 'internal_instruction')}
                disabled={!isEditing}
            />
        </Box>
    );
}

export default OutputWidget;
