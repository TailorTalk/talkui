import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography, Checkbox, FormControlLabel, FormControl } from '@mui/material';
import SupportedTypeSelector from '../SupportedTypes';
import { useNotify } from '../../../contexts/NotifyContext';
import assetsService from '../../../services/assets.service';
import { useGlobals } from '../../../contexts/GlobalsContext';

function GenericAssetModelDetails({ asset, handleInputChange, isEditing }) {
    const { addMessage, addErrorMessage } = useNotify();
    const { supportedModels } = useGlobals();
    
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
