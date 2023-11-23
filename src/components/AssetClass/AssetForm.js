import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import SupportedTypeSelector from './SupportedTypes';
import DefaultAsset from './DefaultAsset/DefaultAsset';
import TextAsset from './TextAsset/TextAsset';
import WebsiteAsset from './WebsiteAsset/WebsiteAsset';
import CompleteFileAsset from './CompleteFileAsset/CompleteFileAsset';
import Grid from '@mui/material/Grid';
import validateTextAsset from './TextAsset/assetValidator'
import validateWebsiteAsset from './WebsiteAsset/assetValidator'
import validateCompleteFileAsset from './CompleteFileAsset/assetValidator'
import validateGenericAsset from './GenericAsset/assetValidator'
import validateSendClientMsgAsset from './SendClientMessage/assetValidator'
import validateGetClientMsgAsset from './GetClientMessage/assetValidator';
import validateTimedTriggerAsset from './TimedTrigger/assetValidator';
import validateSendTemplateAsset from './SendMessageTemplate/assetValidator';
import NoContextAsset from './NoContextAsset/NoContextAsset';
import GenericAsset from './GenericAsset/GenericAsset';
import SendClientMessage from './SendClientMessage/SendClientMessageAsset';
import GetClientMessage from './GetClientMessage/GetClientMessageAsset';
import TimedTrigger from './TimedTrigger/TimedTriggerAsset';
import SendMessageTemplate from './SendMessageTemplate/SendTemplateMessage';
import { useGlobals } from '../../contexts/GlobalsContext';

// const assetTypes = ["TEXT FILE", "WEBSITE", "COMPLETE FILE", "GENERIC ASSET", "DEFAULT", "NO CONTEXT"]
// const assetClassToType = {
//   "default": "DEFAULT",
//   "text": "TEXT FILE",
//   "website": "WEBSITE",
//   "no_context": "NO CONTEXT",
//   "complete_file": "COMPLETE FILE",
//   "generic": "GENERIC ASSET"
// }

function AssetForm({ inputAsset, onAssetUpdate, onAssetDelete, orgId, bot }) {
  const [editMode, setEditMode] = useState(false); // This is used if the component was rendered using an existing asset
  const [isEditing, setIsEditing] = useState(false); // This is used to enable/disable the input fields
  const [assetType, setAssetType] = useState(null);
  const [assetDetails, setAssetDetails] = useState(inputAsset); // This will be used to store the asset details for the asset type selected
  const [isAssetValid, setIsAssetValid] = useState(false); // This will be used to store the asset details for the asset type selected
  const { assetClasses } = useGlobals();
  const assetTypes = assetClasses ? assetClasses.asset_class_list: []
  const assetClassToType = assetClasses ? assetClasses.asset_class_dict: {}
  console.log("Asset in asset form: ", assetDetails)
  // console.log("Is editing in asset form: ", isEditing)

  const onAssetTypeSelected = (assetType) => {
    // console.log("Selected asset type: ", assetType)
    setAssetType(assetType);
    setAssetDetails(prevDetails => ({
      ...prevDetails,
      asset_class: Object.keys(assetClassToType).find(key => assetClassToType[key] === assetType)
      ,
    }));
  }

  const handleInputChange = (value, key) => {
    // console.log("Input changed: ", value, key)
    setAssetDetails(prevDetails => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (inputAsset.asset_id && editMode === false) {
      setEditMode(true);
      setAssetDetails(inputAsset);
      setAssetType(assetClassToType[inputAsset.asset_class]);
    }
    const validate = () => {
      if (assetType === "UNSTRUCTURED_TEXT") {
        const temp = validateTextAsset(assetDetails)
        setIsAssetValid(!temp)
      }
      if (assetType === "WEBSITE") {
        const temp = validateWebsiteAsset(assetDetails)
        setIsAssetValid(!temp)
      }
      if (assetType === "COMPLETE_FILE") {
        const temp = validateCompleteFileAsset(assetDetails)
        setIsAssetValid(!temp)
      }
      if (assetType === "GENERIC") {
        const temp = validateGenericAsset(assetDetails)
        setIsAssetValid(!temp)
      }
      if (assetType === "SEND_CLIENT_MESSAGE") {
        const temp = validateSendClientMsgAsset(assetDetails)
        setIsAssetValid(!temp)
      }
      if (assetType === "FETCH_CLIENT_MESSAGE") {
        const temp = validateGetClientMsgAsset(assetDetails)
        setIsAssetValid(!temp)
      }
      if (assetType === "TIMED_TRIGGER") {
        const temp = validateTimedTriggerAsset(assetDetails)
        setIsAssetValid(!temp)
      }
      if (assetType === "SEND_TEMPLATE_MESSAGE") {
        const temp = validateSendTemplateAsset(assetDetails)
        setIsAssetValid(!temp)
      }
    }
    validate()
  }, [inputAsset, editMode, assetDetails, assetType]);

  return (
    <Grid container direction="column" style={{ height: '100vh' }}>
      <Grid item xs={8} style={{overflowY: 'auto'}}>
        {/* Your content for the top 80% goes here */}
        <Box display="flex" flexDirection="column" gap={2} style={{paddingTop: '20px'}}>
          <SupportedTypeSelector
            items={editMode ? assetTypes : assetTypes.filter((item) => (item !== "DEFAULT" && item !== "NO_CONTEXT"))}
            currentItem={assetType}
            onItemSelected={onAssetTypeSelected}
            editable={!editMode} />
          {assetType === "DEFAULT" &&
            <DefaultAsset
              asset={assetDetails}
              handleInputChange={handleInputChange}
              isEditing={isEditing} />}
          {assetType === "NO_CONTEXT" &&
            <NoContextAsset
              asset={assetDetails}
              handleInputChange={handleInputChange}
              isEditing={isEditing} />}
          {assetType === "UNSTRUCTURED_TEXT" &&
            <TextAsset
              asset={assetDetails}
              handleInputChange={handleInputChange}
              isEditing={isEditing}
              isCreating={!editMode}
              orgId={orgId}
              bot={bot}/>}
          {assetType === "WEBSITE" &&
            <WebsiteAsset
              asset={assetDetails}
              handleInputChange={handleInputChange}
              isEditing={isEditing}
              isCreating={!editMode}
              orgId={orgId}
              bot={bot}/>}
          {assetType === "COMPLETE_FILE" &&
            <CompleteFileAsset
              asset={assetDetails}
              handleInputChange={handleInputChange}
              isEditing={isEditing}
              isCreating={!editMode}
              orgId={orgId}
              bot={bot}/>}
          {assetType === "GENERIC" &&
            <GenericAsset
              asset={assetDetails}
              handleInputChange={handleInputChange}
              isEditing={isEditing}
              isCreating={!editMode}
              orgId={orgId}
              bot={bot}/>
          }
          {assetType === "SEND_CLIENT_MESSAGE" &&
            <SendClientMessage
              asset={assetDetails}
              handleInputChange={handleInputChange}
              isEditing={isEditing}
              isCreating={!editMode}
              orgId={orgId}
              bot={bot}/>
          }
          {assetType === "FETCH_CLIENT_MESSAGE" &&
            <GetClientMessage
              asset={assetDetails}
              handleInputChange={handleInputChange}
              isEditing={isEditing}
              isCreating={!editMode}
              orgId={orgId}
              bot={bot}/>
          }
          {assetType === "TIMED_TRIGGER" &&
            <TimedTrigger
              asset={assetDetails}
              handleInputChange={handleInputChange}
              isEditing={isEditing}
              isCreating={!editMode}
              orgId={orgId}
              bot={bot}/>
          }
          {assetType === "SEND_TEMPLATE_MESSAGE" &&
            <SendMessageTemplate
              asset={assetDetails}
              handleInputChange={handleInputChange}
              isEditing={isEditing}
              isCreating={!editMode}
              orgId={orgId}
              bot={bot}/>
          }
        </Box>
      </Grid>
      <Grid item xs={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        <Box display="flex" flexDirection="column" gap={2}>
          {/* Your buttons for the bottom 20% go here */}
          {editMode ? <><Button onClick={() => {
            setIsEditing(!isEditing);
          }}>
            {isEditing ? "Exit Edit Mode" : "Edit"}
          </Button>
            {isEditing && <Button onClick={() => {
              // Logic to create a new org
              onAssetUpdate(assetDetails)
            }}>
              Update
            </Button>}
            {assetDetails.asset_class !== "default" && <Button 
              onClick={()=>onAssetDelete(assetDetails)}>
                Delete Asset
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
