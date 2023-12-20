import React, { useState, useEffect, useRef } from "react";
import { Container, Grid, Collapse, Divider, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import BotsList from "../components/Assets/BotsList";
import AssetsDisplay from "../components/Assets/AssetDisplay";
import OrgsList from "../components/Assets/OrgsList";
import Chat from "./Chat";
import { useQueryString } from "../contexts/QueryStringContext";

function AssetsPage() {
  const [selectedOrgId, setSelectedOrgId] = useState(null);
  const [selectedBot, setSelectedBot] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [botDefaultAsset, setBotDefaultAsset] = useState(null);
  const { queryDict, updateQueryKeys, deleteQueryKeys } = useQueryString();
  // console.log("akash", "bot default asset", botDefaultAsset, selectedBot)

  const onOrgSelect = (orgId) => {
    // console.log("Org selected: ", orgId);
    setSelectedOrgId(orgId);
    setSelectedBot(null);
    deleteQueryKeys(["orgId", "botId"]);
  };

  const onBotSelect = (bot) => {
    setSelectedBot(bot);
    updateQueryKeys({ orgId: bot.org_id, botId: bot.org_chat_bot_id });
    setIsCollapsed(true);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const onAssetFetch = (assets) => {
    for (let asset of assets) {
      if (asset.asset_class === "default") {
        setBotDefaultAsset(asset);
        break;
      }
    }
  };

  // console.log("Selected bot in assets page: ", selectedBot)
  // console.log("Default asset in Assets page: ", botDefaultAsset)

  return (
    <section className="flex-1 relative flex">
      <div className="flex absolute z-10 bg-tailorBlue-500 rounded-tr-xl rounded-br-xl h-full py-6 px-4 ">
        <div className="h-full overflow-y-scroll scrollbar-hidden">
          <Collapse in={!isCollapsed} orientation="horizontal">
            <OrgsList onSelect={onOrgSelect} />
          </Collapse>
        </div>
        <div className="h-full overflow-y-scroll scrollbar-hidden">
          <Collapse in={!isCollapsed} orientation="horizontal">
            {selectedOrgId && (
              <BotsList orgId={selectedOrgId} onSelect={onBotSelect} />
            )}
          </Collapse>
        </div>

        <IconButton
          onClick={toggleCollapse}
          size="small"
          sx={{
            backgroundColor: "#FBFBFB",
            position: "absolute",
            right: "0",
            top: "50%",
            translate: "50% -50%",
            "&:hover": {
              backgroundColor: "#FBFBFB",
            },
          }}
        >
          {isCollapsed ? (
            <ChevronRightIcon color="primary" fontSize="large" />
          ) : (
            <ChevronLeftIcon color="primary" fontSize="large" />
          )}
        </IconButton>
      </div>

  
        <div className="pl-16 py-6 px-4 h-[90vh] w-1/2 overflow-auto   ">
          {selectedBot && (
            <AssetsDisplay
              orgId={selectedOrgId}
              bot={selectedBot}
              onAssetFetch={onAssetFetch}
            />
          )}
        </div>

        <div className="py-6 px-4 w-1/2 h-[90vh]">
          {queryDict.orgId &&
            queryDict.botId &&
            isCollapsed &&
            botDefaultAsset && (
              <Chat
                hideSessions={true}
                isAnAgent={!!botDefaultAsset.is_an_agent}
              />
            )}
        </div>
  
    </section>
  );
}

export default AssetsPage;
