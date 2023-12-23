import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import AssetDefaults from '../Common/AssetDefaults';
import FileUpload from './UploadWidget';
import DatagenWidget from './DatagenWidget';
import OutputWidget from './OutputWidget';


function WebsiteAsset({ asset, handleInputChange, isEditing, isCreating, orgId, bot }) {
    // console.log("Asset in website asset: ", asset)
    // console.log("Is editing in website asset: ", isEditing)
    // console.log("Is creating in website asset: ", isCreating)
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
                <Tab value="upload" label="Upload" />
                <Tab value="datagen" label="Datagen" />
                <Tab value="output" label="Output" />
            </Tabs>
            {value === 'defaults' && 
            <AssetDefaults 
                asset={asset} 
                handleInputChange={handleInputChange}
                isEditing={isCreating || isEditing}/>}
            {value === 'upload' && <Box>
                <FileUpload 
                    asset={asset} 
                    handleInputChange={handleInputChange}
                    isEditing={isCreating || isEditing}/>
                </Box>}
            {value === 'datagen' && 
            <DatagenWidget 
                asset={asset} 
                handleInputChange={handleInputChange}
                isEditing={isCreating || isEditing}/>}
            {value === 'output' && 
            <OutputWidget 
                asset={asset} 
                handleInputChange={handleInputChange}
                isEditing={isCreating || isEditing}/>}
        </Box>
    </>)
}

export default WebsiteAsset;