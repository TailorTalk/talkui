import React, { useState, useEffect } from 'react';
import { Grid, Paper } from '@mui/material';
import { Modal, IconButton, TextField, Button, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from "../../contexts/AuthContext";
import assetsService from "../../services/assets.service";
import { styled } from '@mui/system';
import SideDrawer from '../Drawer';
import AssetCard from './AssetCard';
import AssetForm from '../AssetClass/AssetForm';
import Fab from '@material-ui/core/Fab';
import ChatIcon from '@material-ui/icons/Chat';
import { useNavigate } from 'react-router-dom';

const ModalContent = styled(Box)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,  // or whatever width you desire
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: 2
});

function AssetsDisplay({ orgId, bot }) {
    const [assets, setAssets] = useState([{ id: 1, name: "Asset 1" }, { id: 2, name: "Asset 2" }]);
    const [open, setOpen] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    console.log("Selected bot: ", orgId, bot)
    console.log("Assets: ", assets)
    useEffect(() => {
        // fetch assets for the given bot using /get_assets
        if (bot) {
            console.log("Fetching assets for bot: ", bot, orgId)
            assetsService.listAssets(userInfo, orgId, bot.org_chat_bot_id)
            .then(response => {
                console.log("Result of list assets", response.data);
                return response.data
            }
            )
            .then(data => setAssets(data.result.bot.assets));
        }
    }, [bot, orgId]);

    const onAssetClick = (asset) => {
        console.log("Clicked on asset: ", asset)
        setSelectedAsset(asset);
        setOpen(true);
    }

    const onAssetUpdate = (asset) => {
        console.log("Updated asset: ", asset)
        assetsService.updateAsset(userInfo, orgId, bot.org_chat_bot_id, asset.asset_id, asset)
        .then(response => {
            console.log("Result of update asset", response.data);
            return response.data
        })
        .then(data => {
            console.log("Fetching assets for bot: ", bot, orgId)
            return assetsService.listAssets(userInfo, orgId, bot.org_chat_bot_id)
        })
        .then(response => {
            console.log("Result of list assets", response.data);
            return response.data
        })
        .then(data => setAssets(data.result.bot.assets))
        .then(()=>{
            setOpen(false);
            setSelectedAsset(null);}
        );
        // Logic to fire an API call to update the fields in the backend
        // For demonstration purposes, just logging the data:
        console.log('Updated details:', asset);
    }

    const onAssetDelete = (asset) => {
        console.log("Delete asset: ", asset)
        assetsService.deleteAsset(userInfo, orgId, bot.org_chat_bot_id, asset.asset_id)
        .then(response => {
            console.log("Result of delete asset", response.data);
            return response.data
        })
        .then(data => {
            console.log("Fetching assets for bot: ", bot, orgId)
            return assetsService.listAssets(userInfo, orgId, bot.org_chat_bot_id)
        })
        .then(response => {
            console.log("Result of list assets", response.data);
            return response.data
        })
        .then(data => setAssets(data.result.bot.assets))
        .then(()=>{
            setOpen(false);
            setSelectedAsset(null);}
        );
        // Logic to fire an API call to update the fields in the backend
        // For demonstration purposes, just logging the data:
        console.log('Deleted');
    }

    const handleChatClick = () => {
        console.log("Chat clicked for: ", orgId, bot)
        navigate(`/chats?orgId=${orgId}&botId=${bot.org_chat_bot_id}`)
    }

    console.log("Selected asset: ", selectedAsset)

    return (
        <div>
            <Typography variant="h6" component="h2" style={{ paddingBottom: '5px', paddingTop: '22px' }}>
                {bot.bot_name}
            </Typography>
            <Typography variant="subtitle2" component="h2" style={{ paddingBottom: '22px', paddingTop: '5px' }}>
                {bot.bot_description}
            </Typography>
            <Grid container spacing={2}>
                {assets.map(asset => (
                    <Grid item key={asset.id}>
                        <AssetCard asset={asset} assetClick={onAssetClick}/>
                    </Grid>
                ))}
            </Grid>
            <IconButton 
                onClick={() => {
                    setSelectedAsset(null);
                    setOpen(true);
                    }} 
                style={{ marginTop: '22px' }}>
                <AddIcon />
            </IconButton>
            <SideDrawer
                open={open}
                onClose={() => {
                    setSelectedAsset(null);
                    setOpen(false);}}
                heading={selectedAsset?`Asset: ${selectedAsset.asset_name}`:`New Asset for bot: ${bot.bot_name}`}
            >
                {selectedAsset ? 
                <AssetForm 
                    inputAsset={selectedAsset} 
                    onAssetUpdate={onAssetUpdate}
                    orgId={orgId}
                    bot={bot}
                    onAssetDelete={onAssetDelete}/>: <AssetForm 
                        inputAsset={{"asset_id": ""}}
                        onAssetUpdate={onAssetUpdate}
                        orgId={orgId}
                        bot={bot}/>}
            </SideDrawer>
            <Fab 
        color="primary" 
        aria-label="chat" 
        style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000  // ensure it's on top of other elements
        }}
        onClick={handleChatClick}  // Optionally add a click handler
    >
        <ChatIcon />
    </Fab>
        </div>
    );
}

export default AssetsDisplay;