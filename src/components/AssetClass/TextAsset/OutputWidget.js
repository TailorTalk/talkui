import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';

function OutputWidget({ asset, handleInputChange, isEditing }) {
    console.log("Props in Asset Defaults: ", asset, "isEditing", isEditing)
    return (
        <Box display="flex" flexDirection="column" gap={2} position="relative">
            <TextField
                label="Output Short Description"
                value={asset.output_short_description}
                multiline
                rows={1}
                onChange={e => handleInputChange(e.target.value, 'output_short_description')}
                disabled={!isEditing}
            />
            <TextField
                label="Output Full Description"
                value={asset.output_description}
                multiline
                rows={3}
                onChange={e => handleInputChange(e.target.value, 'output_description')}
                disabled={!isEditing}
            />
        </Box>
    );
}

export default OutputWidget;