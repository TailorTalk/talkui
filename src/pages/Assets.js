import React, {useState} from 'react';
import { Container, Grid } from '@mui/material';
import BotsList from '../components/Assets/BotsList';
import AssetsDisplay from '../components/Assets/AssetDisplay';
import OrgsList from '../components/Assets/OrgsList';

function AssetsPage() {
    const [selectedOrgId, setSelectedOrgId] = useState(null);
    const [selectedBot, setSelectedBot] = useState(null);
    console.log("Selected bot in the main page: ", selectedBot)
  
    return (
      <Container style={{margin: "0px"}}>
        <Grid container spacing={3}>
          <Grid item xs={2}> {/* Orgs list column */}
            <OrgsList onSelect={setSelectedOrgId} />
          </Grid>
          <Grid item xs={2} style={{paddingLeft: '0px'}}> {/* Bots list column */}
            {selectedOrgId && <BotsList orgId={selectedOrgId} onSelect={setSelectedBot} />}
          </Grid>
          <Grid item xs={8}> {/* Assets display column */}
            {selectedBot && <AssetsDisplay orgId={selectedOrgId} bot={selectedBot} />}
          </Grid>
        </Grid>
      </Container>
    );
}

export default AssetsPage;
