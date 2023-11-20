import React from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import AssetDefaults from '../Common/AssetDefaults';
import ClientConfiguration from './ConfigureClient';  


function SendClientMessage({ asset, handleInputChange, isEditing, isCreating, orgId, bot }) {
    // console.log("Asset in generic asset: ", asset)
    // console.log("Is editing in generic asset: ", isEditing)
    // console.log("Is creating in generic asset: ", isCreating)
    console.log("Bot in send client msg: ", bot)
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
            </Tabs>
            {value === 'defaults' &&
                <AssetDefaults
                    asset={asset}
                    handleInputChange={handleInputChange}
                    isEditing={isCreating || isEditing} />}
            {value === 'configure' && <Box>
                <ClientConfiguration
                    asset={asset}
                    handleInputChange={handleInputChange}
                    isEditing={isCreating || isEditing}
                    botId={bot.org_chat_bot_id} />
            </Box>}
        </Box>
    </>)
}

export default SendClientMessage;