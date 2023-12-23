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
import validateToolChainAsset from './ToolChain/assetValidator';
import validateReasoningAsset from './ReasoningAsset/assetValidator';
import validateSaveFieldsAsset from './SaveFieldsAsset/assetValidator';
import NoContextAsset from './NoContextAsset/NoContextAsset';
import GenericAsset from './GenericAsset/GenericAsset';
import SendClientMessage from './SendClientMessage/SendClientMessageAsset';
import GetClientMessage from './GetClientMessage/GetClientMessageAsset';
import TimedTrigger from './TimedTrigger/TimedTriggerAsset';
import SendMessageTemplate from './SendMessageTemplate/SendTemplateMessage';
import { useGlobals } from '../../contexts/GlobalsContext';
import ToolChainTool from './ToolChain/ToolChainTool';
import ReasoningAsset from './ReasoningAsset/ReasoningAsset';
import SaveFieldsAsset from './SaveFieldsAsset/SaveFields';
import { formatString } from '../../utils/utils';

// const assetTypes = ["TEXT FILE", "WEBSITE", "COMPLETE FILE", "GENERIC ASSET", "DEFAULT", "NO CONTEXT"]
// const assetClassToType = {
//   "default": "DEFAULT",
//   "text": "TEXT FILE",
//   "website": "WEBSITE",
//   "no_context": "NO CONTEXT",
//   "complete_file": "COMPLETE FILE",
//   "generic": "GENERIC ASSET"
// }

function AssetForm({ inputAsset, onAssetUpdate, onAssetDelete, orgId, bot ,heading}) {
  const [editMode, setEditMode] = useState(false); // This is used if the component was rendered using an existing asset
  const [isEditing, setIsEditing] = useState(false); // This is used to enable/disable the input fields
  const [assetType, setAssetType] = useState(null);
  const [assetDetails, setAssetDetails] = useState(inputAsset); // This will be used to store the asset details for the asset type selected
  const [isAssetValid, setIsAssetValid] = useState(false); // This will be used to store the asset details for the asset type selected
  const { assetClasses } = useGlobals();
  const assetTypes = assetClasses ? assetClasses.asset_class_list: []
  const assetClassToType = assetClasses ? assetClasses.asset_class_dict: {}
  // console.log("Asset in asset form: ", assetDetails)
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
      if (assetType === "TOOL_CHAIN") {
        const temp = validateToolChainAsset(assetDetails)
        setIsAssetValid(!temp)
      }
      if (assetType === "REASONING_TOOL") {
        const temp = validateReasoningAsset(assetDetails)
        setIsAssetValid(!temp)
      }
      if (assetType === "SAVE_FIELDS") {
        const temp = validateSaveFieldsAsset(assetDetails)
        setIsAssetValid(!temp)
      }
    }
    validate()
  }, [inputAsset, editMode, assetDetails, assetType]);

  const formTitle = heading?formatString(heading):""

  return (
    <div >
      <div className='py-2 pb-[16px]'>
      <h2 className='text-2xl'>{formTitle}</h2>
      </div>
    <Grid container direction="column" >
      <Grid item xs={8} style={{overflowY: 'auto',backgroundColor:"rgb(249 250 251)" ,padding:'20px',borderRadius:'10px', border:'1px solid rgb(209 213 219)'}}>
        {/* Your content for the top 80% goes here */}
        <Box display="flex" flexDirection="column" gap={2}>
          <SupportedTypeSelector
            items={editMode ? assetTypes : assetTypes.filter((item) => (item !== "DEFAULT" && item !== "NO_CONTEXT"))}
            currentItem={assetType}
            onItemSelected={onAssetTypeSelected}
            editable={!editMode} />
          {assetType === "DEFAULT" &&
            <DefaultAsset
              asset={assetDetails}
              handleInputChange={handleInputChange}
              isEditing={isEditing}
              bot={bot}
              orgId={orgId} />}
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
          {assetType === "TOOL_CHAIN" &&
            <ToolChainTool
              asset={assetDetails}
              handleInputChange={handleInputChange}
              isEditing={isEditing}
              isCreating={!editMode}
              orgId={orgId}
              bot={bot}/>
          }
          {assetType === "REASONING_TOOL" &&
            <ReasoningAsset
              asset={assetDetails}
              handleInputChange={handleInputChange}
              isEditing={isEditing}
              isCreating={!editMode}
              orgId={orgId}
              bot={bot}/>
          }
          {assetType === "SAVE_FIELDS" &&
            <SaveFieldsAsset
              asset={assetDetails}
              handleInputChange={handleInputChange}
              isEditing={isEditing}
              isCreating={!editMode}
              orgId={orgId}
              bot={bot}/>
          }
        </Box>
      </Grid>
      <Grid item xs={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',marginTop:"30px" }}>

        <Box display="flex" flexDirection="row" gap={2}>
          {/* Your buttons for the bottom 20% go here */}
          {editMode ? <><Button sx={{fontWeight:400}} variant='outlined' onClick={() => {
            setIsEditing(!isEditing);
          }}>
            {isEditing ? "Exit Edit Mode" : "Edit"}
          </Button>
            {isEditing && <Button variant='outlined' color='success' onClick={() => {
              // Logic to create a new org
              onAssetUpdate(assetDetails)
            }}>
              Update
            </Button>}
            {assetDetails.asset_class !== "default" && <Button sx={{fontWeight:400}} color='error'  variant='outlined'
              onClick={()=>onAssetDelete(assetDetails)}>
                Delete
              </Button>}</> : assetType && <Button color='success' variant='outlined'
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
    </div>
  );
}

export default AssetForm;
