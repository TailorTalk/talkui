import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';

function DefaultAsset({ asset, handleInputChange, isEditing }) {
    console.log("Asset in default asset: ", asset)

    return (
        <Box display="flex" flexDirection="column" gap={2} position="relative">
            <TextField
                label="Asset Name"
                value={asset.asset_name}
                onChange={e => handleInputChange(e, 'asset_name')}
                disabled={true}
            />
            <TextField
                label="Asset Description"
                value={asset.asset_description}
                multiline
                rows={2}
                onChange={e => handleInputChange(e, 'asset_description')}
                disabled={true}
            />
            <TextField
                label="System Message"
                multiline
                rows={4}
                value={asset.bot_system_message}
                onChange={e => handleInputChange(e, 'bot_system_message')}
                disabled={!isEditing}
            />
            <TextField
                label="WhatsApp Number"
                value={asset.bot_whatsapp_number}
                onChange={e => handleInputChange(e, 'bot_whatsapp_number')}
                disabled={!isEditing}
            />
            <TextField
                label="WhatsApp ID"
                value={asset.bot_whatsapp_id}
                onChange={e => handleInputChange(e, 'bot_whatsapp_id')}
                disabled={!isEditing}
            />
        </Box>
    );
}

export default DefaultAsset;
