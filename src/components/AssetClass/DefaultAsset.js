import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';

function DefaultAsset({ assetDetails, onAssetUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [asset, setAsset] = useState(assetDetails);
    console.log("Asset in default asset: ", asset)

    const handleInputChange = (e, key) => {
        setAsset(prevDetails => ({
            ...prevDetails,
            [key]: e.target.value,
        }));
    };

    useEffect(() => {
        if (!assetDetails) {
            console.log("Setting asset to in use effect: ", assetDetails)
            setAsset(assetDetails);
        }
    }, [assetDetails]);

    const handleUpdate = () => {
        // Logic to fire an API call to update the fields in the backend
        // For demonstration purposes, just logging the data:
        console.log('Updated details:', asset);
    };

    return (
        <Box display="flex" flexDirection="column" gap={2} position="relative">
            <TextField
                label="Asset Name"
                value={asset.asset_name}
                onChange={e => handleInputChange(e, 'bot_name')}
                disabled={true}
            />
            <TextField
                label="Asset Description"
                value={asset.asset_description}
                multiline
                rows={2}
                onChange={e => handleInputChange(e, 'bot_description')}
                disabled={true}
            />
            <TextField
                label="System Message"
                multiline
                rows={4}
                value={asset.bot_system_message}
                onChange={e => handleInputChange(e, 'bot_system_message')}
                disabled={!isEditing}
            />
            <TextField
                label="WhatsApp Number"
                value={asset.bot_whatsapp_number}
                onChange={e => handleInputChange(e, 'bot_whatsapp_number')}
                disabled={!isEditing}
            />
            <TextField
                label="WhatsApp ID"
                value={asset.bot_whatsapp_id}
                onChange={e => handleInputChange(e, 'bot_whatsapp_id')}
                disabled={!isEditing}
            />
            <Button onClick={() => {
                // Logic to create a new org
                setIsEditing(!isEditing);
            }}>
                {isEditing?"Exit Edit Mode":"Edit"}
            </Button>
            {isEditing && <Button onClick={() => {
                // Logic to create a new org
                onAssetUpdate(asset)
            }}>
                Update
            </Button>}
        </Box>
    );
}

export default DefaultAsset;
