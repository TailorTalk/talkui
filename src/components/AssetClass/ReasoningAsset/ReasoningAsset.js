import React from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import AssetDefaults from '../Common/AssetDefaults';
import JsonInputComponent from '../GenericAsset/GenericDictInput'; 
import GenericAssetModelDetails from '../GenericAsset/ModelDetails';

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

function ReasoningAsset({ asset, handleInputChange, isEditing, isCreating, orgId, bot }) {
    // console.log("Asset in generic asset: ", asset)
    // console.log("Is editing in generic asset: ", isEditing)
    // console.log("Is creating in generic asset: ", isCreating)
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
                <Tab value="configure" label="Configure" />
                <Tab value="schema" label="Schema" />
            </Tabs>
            {value === 'defaults' &&
                <AssetDefaults
                    asset={asset}
                    handleInputChange={handleInputChange}
                    isEditing={isCreating || isEditing} />}
            {value === 'configure' && <Box>
                <GenericAssetModelDetails
                    asset={asset}
                    handleInputChange={handleInputChange}
                    isEditing={isCreating || isEditing}
                    botId={bot.org_chat_bot_id}
                    orgId={orgId} />
            </Box>}
            {value === 'schema' &&
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

export default ReasoningAsset;