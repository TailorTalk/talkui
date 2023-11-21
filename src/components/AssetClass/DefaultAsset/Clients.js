import React, {useEffect} from 'react';
import { Box, TextField } from '@mui/material';
import SupportedTypeSelector from '../SupportedTypes';

const SUPPORTED_CLIENTS = ["WHATSAPP"];

function Clients({ asset, handleInputChange, isEditing }) {
    // console.log("Asset in default asset: ", asset)
    // console.log("Is editing in default asset: ", isEditing)
    useEffect(() => {
        if (asset && !asset.client_type) {
            handleInputChange(SUPPORTED_CLIENTS[0], 'client_type');
        }
    }, [asset, handleInputChange]);
    
    return (
        <Box display="flex" flexDirection="column" gap={2} position="relative">
            <SupportedTypeSelector
                items={SUPPORTED_CLIENTS}
                currentItem={asset.client_type?asset.client_type:SUPPORTED_CLIENTS[0]}
                onItemSelected={value => handleInputChange(value, 'client_type')}
                label="Client Type"
                editable={isEditing} />
            <TextField
                label="WhatsApp Number"
                value={asset.client_id}
                onChange={e => handleInputChange(e.target.value, 'client_id')}
                disabled={!isEditing}
            />
            <TextField
                label="Auth token"
                value={asset.bot_whatsapp_auth_token}
                onChange={e => handleInputChange(e.target.value, 'bot_whatsapp_auth_token')}
                disabled={!isEditing}
            />
            <TextField
                label="Endpoint"
                value={asset.bot_whatsapp_endpoint}
                onChange={e => handleInputChange(e.target.value, 'bot_whatsapp_endpoint')}
                disabled={!isEditing}
            />
        </Box>
    );
}

export default Clients;
