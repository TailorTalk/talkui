import React, { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import SupportedTypeSelector from '../SupportedTypes';
import assetsService from '../../../services/assets.service';
import { useNotify } from '../../../contexts/NotifyContext';
import { useGlobals } from '../../../contexts/GlobalsContext';

function DefaultAssetBasics({ asset, handleInputChange, isEditing }) {
    const { addMessage, addErrorMessage } = useNotify();
    const { supportedModels } = useGlobals();
    console.log("Asset in default asset: ", asset)
    console.log("Is editing in default asset: ", isEditing)

    return (
        <Box display="flex" flexDirection="column" gap={2} position="relative">
            <TextField
                label="Asset Name"
                value={asset.asset_name}
                onChange={e => handleInputChange(e.target.value, 'asset_name')}
                disabled={true}
            />
            <TextField
                label="Asset Description"
                value={asset.asset_description}
                multiline
                rows={2}
                onChange={e => handleInputChange(e.target.value, 'asset_description')}
                disabled={true}
            />
            <TextField
                label="System Message"
                multiline
                rows={4}
                value={asset.bot_system_message}
                onChange={e => handleInputChange(e.target.value, 'bot_system_message')}
                disabled={!isEditing}
            />
            {supportedModels && <SupportedTypeSelector
                items={supportedModels.supported_models} 
                currentItem={asset.model?asset.model:supportedModels.default_model}
                onItemSelected={(value)=>handleInputChange(value, 'model')}
                label = {"Model for your chatbot"}
                editable= {isEditing} />}

        </Box>
    );
}

export default DefaultAssetBasics;
