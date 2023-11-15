import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography, Checkbox, FormControlLabel, FormControl } from '@mui/material';
import SupportedTypeSelector from '../SupportedTypes';
import { useNotify } from '../../../contexts/NotifyContext';
import assetsService from '../../../services/assets.service';

function GenericAssetModelDetails({ asset, handleInputChange, isEditing }) {
    const [supportedModels, setSupportedModels] = useState(null);
    const { addMessage, addErrorMessage } = useNotify();

    useEffect(() => {
        populateModels();
    }, [])
    
    const populateModels = () => {
        console.log("Fetching supported models")
        assetsService.getSupportedModels()
        .then((response) => {
            console.log("Supported models: ", response.data)
            return response.data
        })
        .then((data) => {
            if (data.success) {
                setSupportedModels(data.result)
                if (asset.model_name === null || asset.model_name === undefined) {
                    handleInputChange(data.result.default_model, 'model_name')
                }
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
    }
    
    console.log("Props in Asset Defaults: ", asset, "isEditing", isEditing, supportedModels)
    return (
        <Box display="flex" flexDirection="column" gap={2} position="relative">
            <TextField
                label="Instruction to the asset's model"
                value={asset.run_instruction}
                multiline
                rows={3}
                onChange={e => handleInputChange(e.target.value, 'run_instruction')}
                disabled={!isEditing}
            />
            {supportedModels && <SupportedTypeSelector
                items={supportedModels.supported_models} 
                currentItem={asset.model_name?asset.model_name:supportedModels.default_model}
                onItemSelected={(value)=>handleInputChange(value, 'model_name')}
                label = {"Model for generic asset"}
                editable= {isEditing} />}
        </Box>
    );
}

export default GenericAssetModelDetails;
