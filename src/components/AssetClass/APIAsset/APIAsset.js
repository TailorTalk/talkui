import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import AssetDefaults from '../Common/AssetDefaults';
import URLInput from './URLWidget';
// import MethodInput from './MethodWidget';
import JsonInputComponent from './GenericDictInput';


const input_hint = {
    "type": "object",
    "properties": {
        "location": {
            "type": "string",
            "description": "The city and state, e.g. San Francisco, CA",
        },
        "unit": { "type": "string", "enum": ["celsius", "fahrenheit"] },
    },
    "required": ["location", "unit"],
}

function APIAsset({ asset, handleInputChange, isEditing, isCreating, orgId, bot }) {
    // console.log("Asset in text asset: ", asset)
    // console.log("Is editing in text asset: ", isEditing)
    // console.log("Is creating in text asset: ", isCreating)
    const [value, setValue] = React.useState('defaults');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (<>
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="secondary tabs example"
                style={{ marginBottom: "20px" }}
            >
                <Tab value="defaults" label="Defaults" />
                <Tab value="url" label="URL" />
                <Tab value="args" label="Args" />
            </Tabs>
            {value === 'defaults' && 
            <AssetDefaults 
                asset={asset} 
                handleInputChange={handleInputChange}
                isEditing={isCreating || isEditing}/>}
            {value === 'url' && <Box>
                <URLInput 
                    asset={asset} 
                    handleInputChange={handleInputChange}
                    isEditing={isCreating || isEditing}/>
                </Box>}
            {value === 'args' && 
            <JsonInputComponent 
            hintJson={input_hint}
            handleInputChange={handleInputChange}
            field_name={"function_schema"}
            asset={asset}
            isEditing={isCreating || isEditing}
        />}
        </Box>
    </>)
}

export default APIAsset;