import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import {
  IconButton,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../../contexts/AuthContext";
import assetsService from "../../services/assets.service";
import SideDrawer from "../Drawer";
import AssetCard from "./AssetCard";
import AssetForm from "../AssetClass/AssetForm";
import { Fab } from "@mui/material";
import { Chat } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import TextOverlay from "../Overlay/TextOverlay";
import LoadingOverlay from "../Overlay/LoadingOverlay";
import { useNotify } from "../../contexts/NotifyContext";
import { useSnackbar } from "notistack";

function AssetsDisplay({ orgId, bot, onAssetFetch }) {
  const [assets, setAssets] = useState([
    { id: 1, name: "Asset 1" },
    { id: 2, name: "Asset 2" },
  ]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [failMessage, setFailMessage] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [assetUpdating, setAssetUpdating] = useState(false); // to disable the submit button while the asset is being updated
  const { userInfo } = useAuth();
  const { addMessage, addErrorMessage } = useNotify();
  const navigate = useNavigate();
  const {enqueueSnackbar,closeSnackbar} = useSnackbar();
  // console.log("Selected bot: ", orgId, bot)
  // console.log("akash", "Assets: ", assets)
  useEffect(() => {
    // fetch assets for the given bot using /get_assets
    if (bot) {
      // console.log("Fetching assets for bot: ", bot, orgId)
      setLoading(true);
      assetsService
        .listAssets(userInfo, orgId, bot.org_chat_bot_id)
        .then((response) => {
          // console.log("Result of list assets", response.data);
          return response.data;
        })
        .then((data) => {
          setAssets(data.result.bot.assets);
          onAssetFetch(data.result.bot.assets);
          setLoading(false);
        })
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
  };

  const onAssetUpdate = (asset) => {
    // console.log("Updated asset: ", asset)
    setAssetUpdating(true);
    assetsService
      .updateAsset(userInfo, orgId, bot.org_chat_bot_id, asset.asset_id, asset)
      .then((response) => {
        // console.log("Result of update asset", response.data);
        return response.data;
      })
      .then((data) => {
        // console.log("Fetching assets for bot: ", bot, orgId)
        return assetsService.listAssets(userInfo, orgId, bot.org_chat_bot_id);
      })
      .then((response) => {
        // console.log("Result of list assets", response.data);
        return response.data;
      })
      .then((data) => {
        if (data.success) {
          setAssets(data.result.bot.assets);
        } else {
          throw new Error(
            "Could not update asset. Backend returned success false."
          );
        }
      })
      .then(() => {
        // addMessage("Asset updated successfully");
        enqueueSnackbar("Asset updated successfully", {
          variant: "success",
        });
        setAssetUpdating(false);
        setOpen(false);
        setSelectedAsset(null);
      })
      .catch(() => {
        // addErrorMessage("Could not update asset. Some error occurred.");
        enqueueSnackbar("Could not update asset. Some error occurred.", {
          variant: "error",
        });
        // console.log("Could not update asset");
        setAssetUpdating(false);
      });
    // Logic to fire an API call to update the fields in the backend
    // For demonstration purposes, just logging the data:
    // console.log('Updated details:', asset);
  };

  const onAssetDelete = (asset) => {
    // console.log("Delete asset: ", asset)
    setAssetUpdating(true);
    assetsService
      .deleteAsset(userInfo, orgId, bot.org_chat_bot_id, asset.asset_id)
      .then((response) => {
        // console.log("Result of delete asset", response.data);
        return response.data;
      })
      .then((data) => {
        // console.log("Fetching assets for bot: ", bot, orgId)
        return assetsService.listAssets(userInfo, orgId, bot.org_chat_bot_id);
      })
      .then((response) => {
        // console.log("Result of list assets", response.data);
        return response.data;
      })
      .then((data) => setAssets(data.result.bot.assets))
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
  };

  const handleChatClick = () => {
    // console.log("Chat clicked for: ", orgId, bot)
    navigate(
      `/chats?orgId=${orgId}&botId=${bot.org_chat_bot_id}&botName=${bot.bot_name}`
    );
  };

  // console.log("Selected asset: ", selectedAsset)

  return (
    <div className="flex flex-col gap-9 max-2xl:gap-8">
      {failed && <TextOverlay message={failMessage} />}

      <h2 className="relative text-3xl  text-camelCase">
        {bot.bot_name}{" "}
        <span className="relative text-2xl max-2xl:text-xl text-tailorGrey-500">
          by <p className="text-camelCase inline-block">{orgId}</p>
        </span>{" "}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
          justifyItems: "center",
          alignItems: "center",
          gridAutoRows: "minmax(280px, 300px)",
          flexBasis: 0,
        }}
      >
        {assets.map((asset, index) => (
          <AssetCard asset={asset} assetClick={onAssetClick} />
        ))}

        <IconButton
          onClick={() => {
            setSelectedAsset(null);
            setOpen(true);
          }}
        >
          <Fab
            sx={{
              backgroundColor: "rgb(249 250 251)",
              "&:hover": { backgroundColor: "rgb(249 250 251)" },
            }}
          >
            <AddIcon sx={{ color: "#4764FC" }} />
          </Fab>
        </IconButton>
      </div>

      {loading && <LoadingOverlay />}

      <SideDrawer
        open={open}
        onClose={() => {
          if (!assetUpdating) {
            setSelectedAsset(null);
            setOpen(false);
          }
        }}
        // heading={
        //   selectedAsset
        //     ? `Asset: `
        //     : `New Asset for bot: ${bot.bot_name}`
        // }
      >
        {selectedAsset ? (
          <AssetForm
            heading={selectedAsset.asset_name ? selectedAsset.asset_name:selectedAsset.asset_tool_name}
            inputAsset={selectedAsset}
            onAssetUpdate={onAssetUpdate}
            orgId={orgId}
            bot={bot}
            onAssetDelete={onAssetDelete}
          />
        ) : (
          <AssetForm
            heading={bot.bot_name}
            inputAsset={{ asset_id: "" }}
            onAssetUpdate={onAssetUpdate}
            orgId={orgId}
            bot={bot}
          />
        )}
        {assetUpdating && (
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            open={assetUpdating}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </SideDrawer>
    </div>
  );
}

export default AssetsDisplay;
