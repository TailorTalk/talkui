import React from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import AssetDefaults from '../Common/AssetDefaults'; 
import SendTemplateConfiguration from './ConfigureTool';
import JsonInputComponent from '../GenericAsset/GenericDictInput';

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

function SaveFieldsAsset({ asset, handleInputChange, isEditing, isCreating, orgId, bot }) {
    // console.log("Asset in Send template message asset: ", asset)
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
                textColor="primary"
                indicatorColor="primary"
                aria-label="secondary tabs example"
                style={{ marginBottom: "20px" }}
            >
                <Tab value="defaults" label="Defaults" />
                <Tab value="fields" label="Fields" />
                <Tab value="configure" label="Configure" />
            </Tabs>
            {value === 'defaults' &&
                <AssetDefaults
                    asset={asset}
                    handleInputChange={handleInputChange}
                    isEditing={isCreating || isEditing} />}
            {value === 'fields' &&
                <JsonInputComponent
                    hintJson={input_hint}
                    handleInputChange={handleInputChange}
                    field_name={"function_schema"}
                    asset={asset}
                    isEditing={isCreating || isEditing}
                />}
            {value === 'configure' && <Box>
                <SendTemplateConfiguration
                    asset={asset}
                    handleInputChange={handleInputChange}
                    isEditing={isCreating || isEditing}
                    botId={bot.org_chat_bot_id}
                    orgId={orgId} />
            </Box>}
        </Box>
    </>)
}

export default SaveFieldsAsset;