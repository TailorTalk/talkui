import React, { useState, useEffect } from 'react';
import { Grid, Paper } from '@mui/material';
import { Modal, IconButton, TextField, Button, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from "../../contexts/AuthContext";
import assetsService from "../../services/assets.service";
import { styled } from '@mui/system';
import SideDrawer from '../Drawer';
import DefaultAsset from '../AssetClass/DefaultAsset';
import AssetCard from './AssetCard';
import NewAssetForm from '../AssetClass/NewAssetForm';
import PrepopulatedAsset from '../AssetClass/PrepopulatedAsset';

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
        setOpen(false)
        setSelectedAsset(null)
        // Logic to fire an API call to update the fields in the backend
        // For demonstration purposes, just logging the data:
        console.log('Updated details:', asset);
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
                <PrepopulatedAsset 
                    asset={selectedAsset} 
                    setOpen={setOpen}
                    onAssetUpdate={onAssetUpdate}/>: <NewAssetForm setOpen={setOpen}/>}
            </SideDrawer>
        </div>
    );
}

export default AssetsDisplay;