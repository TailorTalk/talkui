import React, { useState } from "react";
import {  Collapse,  IconButton } from "@mui/material";
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
    setIsCollapsed((prev)=>!prev);
  };

  const onAssetFetch = (assets) => {
    for (let asset of assets) {
      if (asset.asset_class === "default") {
        setBotDefaultAsset(asset);
        break;
      }
    }
  };

  return (
    <section className="flex-1 relative flex gap-2">
      <div className="flex absolute z-10 bg-tailorBlue-500 rounded-tr-xl rounded-br-xl h-full   py-6 px-[10px] ">
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
            boxShadow: "0px 5px 4px 0px rgba(0, 0, 0, 0.2 )",
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
            <ChevronRightIcon color="primary" fontSize="medium" />
          ) : (
            <ChevronLeftIcon color="primary" fontSize="medium" />
          )}
        </IconButton>
      </div>

      <div className=" max-2xl:pl-12   pl-12 pb-4 h-[92vh] flex-1 overflow-y-scroll scrollbar-hidden">
        { isCollapsed &&selectedBot && (
          <AssetsDisplay
            orgId={selectedOrgId}
            bot={selectedBot}
            onAssetFetch={onAssetFetch}
          />
        )}
      </div>

      <div
        className={` px-4  h-[92vh] flex-1`}
      >
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
