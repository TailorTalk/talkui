import React, { useState, useEffect, useRef } from "react";
import { Container, Grid, Collapse, Divider, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import BotsList from "../components/Assets/BotsList";
import AssetsDisplay from "../components/Assets/AssetDisplay";
import OrgsList from "../components/Assets/OrgsList";
import Chat from "./Chat";
import { useQueryString } from "../contexts/QueryStringContext";
import { Height } from "@mui/icons-material";
import React, { useState, useEffect, useRef } from "react";
import { Container, Grid, Collapse, Divider, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import BotsList from "../components/Assets/BotsList";
import AssetsDisplay from "../components/Assets/AssetDisplay";
import OrgsList from "../components/Assets/OrgsList";
import Chat from "./Chat";
import { useQueryString } from "../contexts/QueryStringContext";
import { Height } from "@mui/icons-material";

function AssetsPage() {
  const [selectedOrgId, setSelectedOrgId] = useState(null);
  const [selectedBot, setSelectedBot] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [botDefaultAsset, setBotDefaultAsset] = useState(null);
  const { queryDict, updateQueryKeys, deleteQueryKeys } = useQueryString();
  const chatWindowRef = useRef();
  // console.log("akash", "bot default asset", botDefaultAsset, selectedBot)

  const onOrgSelect = (orgId) => {
    // console.log("Org selected: ", orgId);
    setSelectedOrgId(orgId);
    setSelectedBot(null);
    deleteQueryKeys(["orgId", "botId"]);
  };
  };

  const onBotSelect = (bot) => {
    setSelectedBot(bot);
    updateQueryKeys({ orgId: bot.org_id, botId: bot.org_chat_bot_id });
    setIsCollapsed(true);
  };
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
  };

  // console.log("Selected bot in assets page: ", selectedBot)
  // console.log("Default asset in Assets page: ", botDefaultAsset)

  return (
    <section >
      <div className="flex relative">
        <div className="flex absolute z-10 bg-tailorBlue-500 rounded-tr-md rounded-br-md h-[90vh] ">
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
          <div className="bg-tailor-500 flex items-center">
            <IconButton
              onClick={toggleCollapse}
              size="small"
              sx={{
                backgroundColor: "#fff",
                marginRight:'-20px',
                "&:hover": {
                  backgroundColor: "#fff",
                },
              }}
            >
              {isCollapsed ? (
                <ChevronRightIcon sx={{ color: "#4764FC" }} fontSize="large" />
              ) : (
                <ChevronLeftIcon sx={{ color: "#4764FC" }} fontSize="large" />
              )}
            </IconButton>
          </div>
        </div>
        <div className="flex-1 pl-16">
          {selectedBot && (
            <AssetsDisplay
              orgId={selectedOrgId}
              bot={selectedBot}
              onAssetFetch={onAssetFetch}
            />
          )}
        </div>
        <div className="flex-1">
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
      </div>
    </section>
  );
}

export default AssetsPage;
