import React, { useEffect } from 'react';
import { Box, TextField } from '@mui/material';

function ClientConfiguration({ asset, handleInputChange, isEditing, botId }) {
    // console.log("Asset in default asset: ", asset)
    // console.log("Is editing in default asset: ", isEditing)
    useEffect(() => {
        if (botId && !asset.bot_id) {
            handleInputChange(botId, 'bot_id')
        }
    }, []);
    
    return (
        <Box display="flex" flexDirection="column" gap={2} position="relative">
            <TextField
                label="Bot id"
                value={asset.bot_id}
                onChange={e => handleInputChange(e.target.value, 'bot_id')}
                disabled={!isEditing}
            />
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
            <TextField
                label="WhatsApp Number"
                value={asset.bot_whatsapp_number}
                onChange={e => handleInputChange(e.target.value, 'bot_whatsapp_number')}
                disabled={!isEditing}
            />
        </Box>
    );
}

export default ClientConfiguration;