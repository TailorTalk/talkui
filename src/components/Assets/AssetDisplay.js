import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { IconButton, Typography, Backdrop, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from "../../contexts/AuthContext";
import assetsService from "../../services/assets.service";
import SideDrawer from '../Drawer';
import AssetCard from './AssetCard';
import AssetForm from '../AssetClass/AssetForm';
import Fab from '@material-ui/core/Fab';
import ChatIcon from '@material-ui/icons/Chat';
import { useNavigate } from 'react-router-dom';
import TextOverlay from '../Overlay/TextOverlay';
import LoadingOverlay from '../Overlay/LoadingOverlay';
import { useNotify } from '../../contexts/NotifyContext';


function AssetsDisplay({ orgId, bot, onAssetFetch }) {
    const [assets, setAssets] = useState([{ id: 1, name: "Asset 1" }, { id: 2, name: "Asset 2" }]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);
    const [failMessage, setFailMessage] = useState("");
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [assetUpdating, setAssetUpdating] = useState(false);  // to disable the submit button while the asset is being updated
    const { userInfo } = useAuth();
    const { addMessage, addErrorMessage } = useNotify();
    const navigate = useNavigate();
    // console.log("Selected bot: ", orgId, bot)
    console.log("akash", "Assets: ", assets)
    useEffect(() => {
        // fetch assets for the given bot using /get_assets
        if (bot) {
            // console.log("Fetching assets for bot: ", bot, orgId)
            setLoading(true);
            assetsService.listAssets(userInfo, orgId, bot.org_chat_bot_id)
                .then(response => {
                    // console.log("Result of list assets", response.data);
                    return response.data
                }
                )
                .then(data => {
                    setAssets(data.result.bot.assets)
                    onAssetFetch(data.result.bot.assets)
                    setLoading(false)})
                .catch(() => {
                    // console.log("Could not fetch assets");
                    setLoading(false);
                    setFailed(true);
                    setFailMessage("Could not fetch assets");
                });
        }
    }, [bot, orgId, userInfo]);

    const onAssetClick = (asset) => {
        // console.log("Clicked on asset: ", asset)
        setSelectedAsset(asset);
        setOpen(true);
    }

    const onAssetUpdate = (asset) => {
        // console.log("Updated asset: ", asset)
        setAssetUpdating(true);
        assetsService.updateAsset(userInfo, orgId, bot.org_chat_bot_id, asset.asset_id, asset)
            .then(response => {
                // console.log("Result of update asset", response.data);
                return response.data
            })
            .then(data => {
                // console.log("Fetching assets for bot: ", bot, orgId)
                return assetsService.listAssets(userInfo, orgId, bot.org_chat_bot_id)
            })
            .then(response => {
                // console.log("Result of list assets", response.data);
                return response.data
            })
            .then(data => {
                if (data.success) {
                    setAssets(data.result.bot.assets)
                } else {
                    throw new Error("Could not update asset. Backend returned success false.")
                }
            })
            .then(() => {
                addMessage("Asset updated successfully");
                setAssetUpdating(false);
                setOpen(false);
                setSelectedAsset(null);
            })
            .catch(() => {
                addErrorMessage("Could not update asset. Some error occurred.");
                // console.log("Could not update asset");
                setAssetUpdating(false);
            });
        // Logic to fire an API call to update the fields in the backend
        // For demonstration purposes, just logging the data:
        // console.log('Updated details:', asset);
    }

    const onAssetDelete = (asset) => {
        // console.log("Delete asset: ", asset)
        setAssetUpdating(true);
        assetsService.deleteAsset(userInfo, orgId, bot.org_chat_bot_id, asset.asset_id)
            .then(response => {
                // console.log("Result of delete asset", response.data);
                return response.data
            })
            .then(data => {
                // console.log("Fetching assets for bot: ", bot, orgId)
                return assetsService.listAssets(userInfo, orgId, bot.org_chat_bot_id)
            })
            .then(response => {
                // console.log("Result of list assets", response.data);
                return response.data
            })
            .then(data => setAssets(data.result.bot.assets))
            .then(() => {
                setOpen(false);
                setSelectedAsset(null);
                setAssetUpdating(false);
            })
            .catch(() => {
                // console.log("Could not delete asset");
                setAssetUpdating(false);
            });
        // Logic to fire an API call to update the fields in the backend
        // For demonstration purposes, just logging the data:
        // console.log('Deleted');
    }

    const handleChatClick = () => {
        // console.log("Chat clicked for: ", orgId, bot)
        navigate(`/chats?orgId=${orgId}&botId=${bot.org_chat_bot_id}&botName=${bot.bot_name}`)
    }

    // console.log("Selected asset: ", selectedAsset)

    return (
        <div>
            {failed && <TextOverlay message={failMessage} />}
            {loading && <LoadingOverlay message="Loading..." />}
            <Typography variant="h6" component="h2" style={{ paddingBottom: '5px', paddingTop: '22px' }}>
                {bot.bot_name}
            </Typography>
            <Typography variant="subtitle2" component="h2" style={{ paddingBottom: '22px', paddingTop: '5px' }}>
                {bot.bot_description}
            </Typography>
            <Grid container spacing={2}>
                {assets.map((asset, index) => (
                    <Grid
                        item
                        key={index}>
                        <AssetCard asset={asset} assetClick={onAssetClick} />
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
                    if (!assetUpdating) {
                        setSelectedAsset(null);
                        setOpen(false);
                    }
                }}
                heading={selectedAsset ? `Asset: ${selectedAsset.asset_name}` : `New Asset for bot: ${bot.bot_name}`}
            >
                {selectedAsset ?
                    <AssetForm
                        inputAsset={selectedAsset}
                        onAssetUpdate={onAssetUpdate}
                        orgId={orgId}
                        bot={bot}
                        onAssetDelete={onAssetDelete} /> : <AssetForm
                        inputAsset={{ "asset_id": "" }}
                        onAssetUpdate={onAssetUpdate}
                        orgId={orgId}
                        bot={bot} />}
                {assetUpdating && (
                    <Backdrop
                        sx={{
                            color: '#fff',
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        open={assetUpdating}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                )}
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