import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Tab, Tabs } from '@mui/material';

function Clients({ asset, handleInputChange, isEditing }) {
    console.log("Asset in default asset: ", asset)
    console.log("Is editing in default asset: ", isEditing)
    
    return (
        <Box display="flex" flexDirection="column" gap={2} position="relative">
            <TextField
                label="WhatsApp Number"
                value={asset.bot_whatsapp_number}
                onChange={e => handleInputChange(e.target.value, 'bot_whatsapp_number')}
                disabled={!isEditing}
            />
            <TextField
                label="WhatsApp ID"
                value={asset.bot_whatsapp_id}
                onChange={e => handleInputChange(e.target.value, 'bot_whatsapp_id')}
                disabled={!isEditing}
            />
        </Box>
    );
}

export default Clients;
