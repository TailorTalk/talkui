import React, { useEffect, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import SupportedTypeSelector from './SupportedTypes';
import DefaultAsset from './DefaultAsset/DefaultAsset';
import TextAsset from './TextAsset/TextAsset';

const assetTypes = ["TEXT FILE", "WEBSITE", "DEFAULT"]
const assetClassToType = {
  "default": "DEFAULT",
  "text": "TEXT FILE",
  "website": "WEBSITE"
}

function AssetForm({ inputAsset, setOpen, onAssetUpdate }) {
  const [editMode, setEditMode] = useState(false); // This is used if the component was rendered using an existing asset
  const [isEditing, setIsEditing] = useState(false); // This is used to enable/disable the input fields
  const [assetType, setAssetType] = useState(null);
  const [assetDetails, setAssetDetails] = useState(inputAsset); // This will be used to store the asset details for the asset type selected
  console.log("Asset in asset form: ", assetDetails)

  const onAssetTypeSelected = (assetType) => {
    console.log("Selected asset type: ", assetType)
    setAssetType(assetType);
    setAssetDetails(prevDetails => ({
      ...prevDetails,
      ["asset_class"]: Object.keys(assetClassToType).find(key => assetClassToType[key] === assetType)
      ,
    }));
  }

  const handleInputChange = (e, key) => {
    setAssetDetails(prevDetails => ({
      ...prevDetails,
      [key]: e.target.value,
    }));
  };

  useEffect(() => {
    if (inputAsset) {
      setEditMode(true);
      setAssetDetails(inputAsset);
      setAssetType(assetClassToType[inputAsset.asset_class]);
    }
  }, [inputAsset]);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <SupportedTypeSelector
        items={editMode?assetTypes:assetTypes.filter((item) => item !== "DEFAULT")}
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
          isEditing={isEditing}/>}
      {assetType === "WEBSITE" &&
        <TextField
          label="Website" />}
      {/* Add any other input fields */}
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
        </Button>}</> : assetType && <Button onClick={() => {
          // Logic to create a new org
          setOpen(false);
        }}>
          Create asset
        </Button>}
    </Box>
  );
}

export default AssetForm;
