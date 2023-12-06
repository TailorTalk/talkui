import React, { useState } from 'react';
import { Container, Grid, Collapse, Divider, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BotsList from '../components/Assets/BotsList';
import AssetsDisplay from '../components/Assets/AssetDisplay';
import OrgsList from '../components/Assets/OrgsList';
import Chat from './Chat';
import { useQueryString } from '../contexts/QueryStringContext';

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
  }

  const onBotSelect = (bot) => {
    setSelectedBot(bot);
    updateQueryKeys({ orgId: bot.org_id, botId: bot.org_chat_bot_id });
    setIsCollapsed(true);
  }

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
  }

  // console.log("Selected bot in assets page: ", selectedBot)
  // console.log("Default asset in Assets page: ", botDefaultAsset)

  return (
    <Container style={{ margin: "0px"}} maxWidth="false">
      <Grid container style={{ margin: '0px' }} maxWidth="false">
        <Grid item xs={isCollapsed?false:2} >
          <Collapse in={!isCollapsed} orientation="horizontal">
            <OrgsList onSelect={onOrgSelect} />
          </Collapse>
        </Grid>
        <Grid item xs={isCollapsed?false:2} >
          <Collapse in={!isCollapsed} orientation="horizontal">
            {selectedOrgId && <BotsList orgId={selectedOrgId} onSelect={onBotSelect} />}
          </Collapse>
        </Grid>
        <Grid item xs={0.2} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'  }}>
          <IconButton onClick={toggleCollapse} size="small">
            {isCollapsed ? <ChevronRightIcon  sx={{ color: "#4764FC" }}/> : <ChevronLeftIcon sx={{ color: "#4764FC" }} />}
          </IconButton>
        </Grid>
        <Grid item xs={isCollapsed?6.8:7.8} style={{overflowY: 'auto', maxHeight: '100vh', paddingLeft: '10px' }}>
          {selectedBot && <AssetsDisplay orgId={selectedOrgId} bot={selectedBot} onAssetFetch={onAssetFetch}/>}
        </Grid>
        <Grid item xs={isCollapsed?5:false} style={{paddingLeft: '10px'}}>
          {queryDict.orgId && 
          queryDict.botId && 
          isCollapsed && botDefaultAsset &&
          <Chat hideSessions={true} isAnAgent={!!botDefaultAsset.is_an_agent}/>}
        </Grid>
      </Grid>
    </Container>
  )
}

export default AssetsPage;
