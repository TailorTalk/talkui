import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography, Checkbox, FormControlLabel, FormControl } from '@mui/material';
import SupportedTypeSelector from '../SupportedTypes';
import { useNotify } from '../../../contexts/NotifyContext';
import  { useGlobals } from '../../../contexts/GlobalsContext';

function DatagenWidget({ asset, handleInputChange, isEditing }) {
    const { supportedModels } = useGlobals();
    const { addMessage, addErrorMessage } = useNotify();

    const handleChange = (event) => {
        console.log('Handle change called')
        handleInputChange(event.target.checked, 'use_model');
    };

    
    console.log("Props in Asset Defaults: ", asset, "isEditing", isEditing, supportedModels)
    return (
        <Box display="flex" flexDirection="column" gap={2} position="relative">
            <FormControl fullWidth style={{paddingLeft: '10px'}}>
                <FormControlLabel control={
                    <Checkbox 
                        checked={asset.use_model?asset.use_model:false}
                        onChange={handleChange}
                        disabled= {!isEditing}
                        inputProps={{ 'aria-label': 'controlled' }}/>
                    } label="Uses models"/>
            </FormControl>
            {supportedModels ? asset.use_model && <SupportedTypeSelector
                items={supportedModels.supported_models} 
                currentItem={asset.model_name?asset.model_name:supportedModels.default_model}
                onItemSelected={(value)=>handleInputChange(value, 'model_name')}
                label = {"Model for your chatbot"}
                editable= {isEditing} />: <Typography color={'red'}> Failed getting supporting models </Typography>}
        </Box>
    );
}

export default DatagenWidget;
