import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';

function DatagenWidget({ asset, handleInputChange, isEditing }) {
    console.log("Props in Asset Defaults: ", asset, "isEditing", isEditing)
    return (
        <Box display="flex" flexDirection="column" gap={2} position="relative">
            <TextField
                type="number"
                inputProps={{ 
                    min: 300, 
                    max: 3000
                }}
                defaultValue={1000}
                label="Chunk size"
                value={asset.data_chunk_size}
                onChange={e => handleInputChange(e.target.value, 'data_chunk_size')}
                disabled={!isEditing}
            />
        </Box>
    );
}

export default DatagenWidget;
