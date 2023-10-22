import React, { useEffect, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import SupportedTypeSelector from './SupportedTypes';
import DefaultAsset from './DefaultAsset/DefaultAsset';
import TextAsset from './TextAsset/TextAsset';
import Grid from '@mui/material/Grid';
import { useAuth } from '../../contexts/AuthContext';
import assetsService from '../../services/assets.service';
import validateTextAsset from './TextAsset/assetValidator'

const assetTypes = ["TEXT FILE", "WEBSITE", "DEFAULT"]
const assetClassToType = {
  "default": "DEFAULT",
  "text": "TEXT FILE",
  "website": "WEBSITE"
}

function AssetForm({ inputAsset, onAssetUpdate, orgId, bot }) {
  const [editMode, setEditMode] = useState(false); // This is used if the component was rendered using an existing asset
  const [isEditing, setIsEditing] = useState(false); // This is used to enable/disable the input fields
  const [assetType, setAssetType] = useState(null);
  const [assetDetails, setAssetDetails] = useState(inputAsset); // This will be used to store the asset details for the asset type selected
  const [isAssetValid, setIsAssetValid] = useState(false); // This will be used to store the asset details for the asset type selected
  const { userInfo } = useAuth();
  
  console.log("Asset in asset form: ", assetDetails)
  console.log("Is editing in asset form: ", isEditing)

  const onAssetTypeSelected = (assetType) => {
    console.log("Selected asset type: ", assetType)
    setAssetType(assetType);
    setAssetDetails(prevDetails => ({
      ...prevDetails,
      ["asset_class"]: Object.keys(assetClassToType).find(key => assetClassToType[key] === assetType)
      ,
    }));
  }

  const handleInputChange = (value, key) => {
    setAssetDetails(prevDetails => ({
      ...prevDetails,
      [key]: value,
    }));
    //let assetIsValid = assetValidator(assetDetails)
    if (assetType === "TEXT FILE") {
      const temp = validateTextAsset(assetDetails)
      setIsAssetValid(!temp)
    }
  };

  useEffect(() => {
    if (inputAsset.asset_id) {
      setEditMode(true);
      setAssetDetails(inputAsset);
      setAssetType(assetClassToType[inputAsset.asset_class]);
    }
  }, [inputAsset]);

  return (
    <Grid container direction="column" style={{ height: '100vh' }}>
      <Grid item xs={8} style={{overflowY: 'auto'}}>
        {/* Your content for the top 80% goes here */}
        <Box display="flex" flexDirection="column" gap={2} style={{paddingTop: '20px'}}>
          <SupportedTypeSelector
            items={editMode ? assetTypes : assetTypes.filter((item) => item !== "DEFAULT")}
            currentItem={assetType}
            onItemSelected={onAssetTypeSelected}
            editable={!editMode} />
          {assetType === "DEFAULT" &&
            <DefaultAsset
              asset={assetDetails}
              handleInputChange={handleInputChange}
              isEditing={isEditing} />}
          {assetType === "TEXT FILE" &&
            <TextAsset
              asset={assetDetails}
              handleInputChange={handleInputChange}
              isEditing={isEditing}
              isCreating={!editMode}
              orgId={orgId}
              bot={bot}/>}
          {assetType === "WEBSITE" &&
            <TextField
              label="Website" />}
        </Box>
      </Grid>
      <Grid item xs={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        <Box display="flex" flexDirection="column" gap={2}>
          {/* Your buttons for the bottom 20% go here */}
          {editMode ? <><Button onClick={() => {
            // Logic to create a new org
            setIsEditing(!isEditing);
          }}>
            {isEditing ? "Exit Edit Mode" : "Edit"}
          </Button>
            {isEditing && <Button onClick={() => {
              // Logic to create a new org
              onAssetUpdate(assetDetails)
            }}>
              Update
            </Button>}</> : assetType && <Button 
              disabled={!isAssetValid}
              onClick={() => {
                // Logic to add new asset
                onAssetUpdate(assetDetails);
                //setOpen(false);
              }}>
              Create asset
            </Button>}
        </Box>
      </Grid>
    </Grid>
  );
}

export default AssetForm;
