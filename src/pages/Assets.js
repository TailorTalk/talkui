import React, { useState } from "react";
import AssetsDisplay from "../components/Assets/AssetDisplay";
import Chat from "../components/Chat/Chat";
import { useQueryString } from "../contexts/QueryStringContext";
import OrgsAndBotsSidePanel from "../components/SidePanel/OrgsAndBotsSidePanel";
import { Button, Chip } from "@mui/material";
import { ChatRounded, Done } from "@mui/icons-material";

function AssetsPage() {
  const [selectedOrgId, setSelectedOrgId] = useState(null);
  const [selectedBot, setSelectedBot] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [botDefaultAsset, setBotDefaultAsset] = useState(null);
  const [collapseChat, setCollapseChat] = useState(false);
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
    setIsCollapsed((prev) => !prev);
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
      <OrgsAndBotsSidePanel
        isCollapsed={isCollapsed}
        onOrgSelect={onOrgSelect}
        selectedOrgId={selectedOrgId}
        onBotSelect={onBotSelect}
        toggleCollapse={toggleCollapse}
      />

      <div className=" max-2xl:pl-12   pl-12 pb-4 h-[93vh] flex-1 overflow-y-scroll scrollbar-hidden">
        {isCollapsed && selectedBot && (
          <AssetsDisplay
            orgId={selectedOrgId}
            bot={selectedBot}
            onAssetFetch={onAssetFetch}
          />
        )}
      </div>

      <div
        className={` px-4  h-[93vh] ${
          collapseChat ? "w-0" : "w-1/2"
        } transition-all duration-[0.5s]`}
      >
        {queryDict.orgId &&
          queryDict.botId &&
          isCollapsed &&
          botDefaultAsset && (
            <Chat
              hideSessions={true}
              isAnAgent={!!botDefaultAsset.is_an_agent}
              hide={collapseChat}
            />
          )}
      </div>
      {/* <Button
        variant="outlined"
        sx={{ position: "absolute", right: collapseChat?"0":"32px",top:"8px",transition:"all 0.3s" }}
        onClick={() => {
          setCollapseChat((prev) => !prev);
        }}
      >
        {collapseChat?"Open Chat":"Close Chat"}
      </Button> */}
      {queryDict.orgId && queryDict.botId && isCollapsed && botDefaultAsset && (
        <Chip
          label={collapseChat ? "Open Chat" : "Close Chat"}
          onClick={() => {
            setCollapseChat((prev) => !prev);
          }}
         
          
          sx={{
            position: "absolute",
            right: collapseChat ? "-15px" : "32px",
            top: "12px",
            transition: "all 0.3s",
            padding:"8px 4px",
            paddingRight:"10px"
          }}
          color="primary"
        />
      )}
    </section>
  );
}

export default AssetsPage;
