import React from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import AssetDefaults from '../Common/AssetDefaults';
import TimerConfiguration from './ConfigureTimer';  


function TimedTrigger({ asset, handleInputChange, isEditing, isCreating, orgId, bot }) {
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
            </Tabs>
            {value === 'defaults' &&
                <AssetDefaults
                    asset={asset}
                    handleInputChange={handleInputChange}
                    isEditing={isCreating || isEditing} />}
            {value === 'configure' && <Box>
                <TimerConfiguration
                    asset={asset}
                    handleInputChange={handleInputChange}
                    isEditing={isCreating || isEditing}
                    botId={bot.org_chat_bot_id}
                    orgId={orgId} />
            </Box>}
        </Box>
    </>)
}

export default TimedTrigger;