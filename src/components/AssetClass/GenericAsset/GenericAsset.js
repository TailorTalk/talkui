import React from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import AssetDefaults from '../Common/AssetDefaults';
import GenericAssetModelDetails from './ModelDetails';
import JsonInputComponent from './GenericDictInput';

const input_hint = {
    "type": "object",
    "properties": {
        "location": {
            "type": "string",
            "description": "The city and state, e.g. San Francisco, CA",
        },
        "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
    },
    "required": ["location"],
}
const output_hint = {"temperature": "The temperature of the provided city in the provided unit"}

function GenericAsset({ asset, handleInputChange, isEditing, isCreating, orgId, bot }) {
    console.log("Asset in generic asset: ", asset)
    console.log("Is editing in generic asset: ", isEditing)
    console.log("Is creating in generic asset: ", isCreating)
    const [value, setValue] = React.useState('defaults');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (<>
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
                style={{ marginBottom: "20px" }}
            >
                <Tab value="defaults" label="Defaults" />
                <Tab value="model_details" label="Model" />
                <Tab value="input" label="Input" />
                <Tab value="output" label="Output" />
            </Tabs>
            {value === 'defaults' && 
            <AssetDefaults 
                asset={asset} 
                handleInputChange={handleInputChange}
                isEditing={isCreating || isEditing}/>}
            {value === 'model_details' && <Box>
                <GenericAssetModelDetails 
                    asset={asset} 
                    handleInputChange={handleInputChange}
                    isEditing={isCreating || isEditing}/>
                </Box>}
            {value === 'input' && 
                <JsonInputComponent
                    hintJson={input_hint}
                    handleInputChange={handleInputChange}
                    field_name={"function_schema"}
                    asset={asset} 
                />}
            {value === 'output' && 
                <JsonInputComponent
                    hintJson={output_hint}
                    handleInputChange={handleInputChange}
                    field_name={"output_schema"}
                    asset={asset} 
                />}
        </Box>
    </>)
}

export default GenericAsset;