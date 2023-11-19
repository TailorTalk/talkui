import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import DefaultAssetBasics from './Basics'
import Clients from "./Clients"
import Suggestions from './Suggestions';

function DefaultAsset({ asset, handleInputChange, isEditing }) {
    // console.log("Asset in default asset: ", asset)
    // console.log("Is editing in default asset: ", isEditing)
    const [value, setValue] = React.useState('defaults');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box display="flex" flexDirection="column" gap={2} position="relative">
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
                style={{ marginBottom: "20px" }}
            >
                <Tab value="defaults" label="Defaults" />
                <Tab value="questions" label="Suggestions" />
                <Tab value="clients" label="Clients" />
            </Tabs>
            {value === 'defaults' &&
                <DefaultAssetBasics
                    asset={asset}
                    handleInputChange={handleInputChange}
                    isEditing={isEditing} />}
            {value === 'questions' && <Box>
                <Suggestions
                    asset={asset}
                    handleInputChange={handleInputChange}
                    isEditing={isEditing} />
            </Box>}
            {value === 'clients' && <Box>
                <Clients
                    asset={asset}
                    handleInputChange={handleInputChange}
                    isEditing={isEditing} />
            </Box>}
        </Box>
    );
}

export default DefaultAsset;
