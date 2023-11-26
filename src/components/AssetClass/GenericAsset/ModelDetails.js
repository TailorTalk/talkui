import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import SupportedTypeSelector from '../SupportedTypes';
import { useNotify } from '../../../contexts/NotifyContext';
import assetsService from '../../../services/assets.service';
import { useGlobals } from '../../../contexts/GlobalsContext';

function GenericAssetModelDetails({ asset, handleInputChange, isEditing }) {
    const { addMessage, addErrorMessage } = useNotify();
    const { supportedModels } = useGlobals();

    useEffect(() => {
        if (asset && !asset.model_name) {
            handleInputChange(supportedModels.default_model, 'model_name')
        }
    }, [asset, supportedModels]);
    
    // console.log("Props in Asset Defaults: ", asset, "isEditing", isEditing, supportedModels)
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
            {supportedModels ? <SupportedTypeSelector
                items={supportedModels.supported_models} 
                currentItem={asset.model_name?asset.model_name:supportedModels.default_model}
                onItemSelected={(value)=>handleInputChange(value, 'model_name')}
                label = {"Model for generic asset"}
                editable= {isEditing} />: <Typography color={'red'}> Failed getting supporting models </Typography>}
            {/*<FormGroup style={{paddingLeft: '10px'}}>
                <FormControlLabel
                    control={
                    <Checkbox checked={asset.is_reasoning_tool?asset.is_reasoning_tool:false} 
                        onChange={e => handleInputChange(e.target.checked, 'is_reasoning_tool')}
                        disabled={!isEditing} />}
                    label="Is Reasoning tool (To be used with reasoning engine)"
                />
                    </FormGroup>*/}
        </Box>
    );
}

export default GenericAssetModelDetails;
