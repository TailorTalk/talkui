import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';

function DatagenWidget({ asset, handleInputChange, isEditing }) {
    useEffect(() => {
        if (!asset.data_chunk_size) {
            handleInputChange(1000, 'data_chunk_size')
        }
        if (!asset.overlap_chunk_size) {
            handleInputChange(100, 'overlap_chunk_size')
        }
    }, [asset])
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
            <TextField
                type="number"
                inputProps={{ 
                    min: 0, 
                    max: 300
                }}
                defaultValue={100}
                label="Overlap chunk size"
                value={asset.overlap_chunk_size}
                onChange={e => handleInputChange(e.target.value, 'overlap_chunk_size')}
                disabled={!isEditing}
            />
        </Box>
    );
}

export default DatagenWidget;
