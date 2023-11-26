import React, { useEffect } from 'react';
import { Box, TextField } from '@mui/material';

function TimerConfiguration({ asset, handleInputChange, isEditing, botId, orgId }) {
    // console.log("Asset in default asset: ", asset)
    // console.log("Is editing in default asset: ", isEditing)
    useEffect(() => {
        if (botId && !asset.bot_id) {
            handleInputChange(botId, 'bot_id')
        }
        if (orgId && !asset.org_id) {
            handleInputChange(orgId, 'org_id')
        }
    }, [asset, botId, orgId]);
    
    return (
        <Box display="flex" flexDirection="column" gap={2} position="relative">
            <TextField
                label="Bot id"
                value={asset.bot_id || ''}
                onChange={e => handleInputChange(e.target.value, 'bot_id')}
                disabled={!isEditing}
            />
            <TextField
                label="Org id"
                value={asset.org_id || ''}
                onChange={e => handleInputChange(e.target.value, 'org_id')}
                disabled={!isEditing}
            />
            <TextField
                label="Message at trigger"
                value={asset.message_to_trigger_bot || ''}
                onChange={e => handleInputChange(e.target.value, 'message_to_trigger_bot')}
                disabled={!isEditing}
            />
        </Box>
    );
}

export default TimerConfiguration;