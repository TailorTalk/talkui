import React, { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import SupportedTypeSelector from '../SupportedTypes';
import assetsService from '../../../services/assets.service';
import { useNotify } from '../../../contexts/NotifyContext';


function DefaultAssetBasics({ asset, handleInputChange, isEditing }) {
    const { addMessage, addErrorMessage } = useNotify();
    const [supportedModels, setSupportedModels] = useState(null);
    console.log("Asset in default asset: ", asset)
    console.log("Is editing in default asset: ", isEditing)

    useEffect(() => {
        console.log("Fetching supported models")
        assetsService.getSupportedModels()
        .then((response) => {
            console.log("Supported models: ", response.data)
            return response.data
        })
        .then((data) => {
            if (data.success) {
                setSupportedModels(data.result)
                addMessage("Supported models fetched successfully")
            } else {
                console.log("Error in getting supported models: ", data)
                throw new Error("Error in getting supported models")
            }
        })
        .catch((error) => {
            console.log("Error in getting supported models: ", error)
            addErrorMessage("Error in getting supported models")
        })
    }, [])


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
