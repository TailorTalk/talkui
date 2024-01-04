import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import assetsService from "../services/assets.service";
import orgsService from "../services/orgs.service";

const initialState = {
  orgs: {
    organisations: [],
    selectedOrg: {},
    status: "idle",
  },
  bots: {
    bots: [],
    selectedBot: {},
    status: "idle",
  },
};

export const fetchOrgs = createAsyncThunk(
  "orgsAndBots/fetchOrgs",
  async (userInfo) => {
    // console.log(userName, email);
    const response = await orgsService.listOrgs(userInfo);
    const orgsArray = response.data.result.orgs;
    return orgsArray;
  }
);

export const fetchBots = createAsyncThunk(
  "orgsAndBots/fetchBots",
  async (orgId, userInfo) => {
    const response = await assetsService.listBots(userInfo, orgId);
    const botsArray = response.data.result.bots;

    return botsArray;
  }
);

const organisationSlice = createSlice({
  name: "orgsAndBots",
  initialState,

  reducers: {
    setSelectedBot: function (state, action) {
      const botName = action.payload;
      const selectedBot = state.bots.bots.filter(
        (bot) => bot.bot_name === botName
      );
      state.bots.status = "succeeded";
      state.bots.selectedBot =  selectedBot[0] === undefined?{}:selectedBot[0];
    },
    setSelectedOrg: function (state, action) {
      const orgName = action.payload;
      
      const selectedOrg = state.orgs.organisations.filter(
        (org) => org.name === orgName
      );
      console.log(selectedOrg);
      state.orgs.status = "succeeded";
      state.orgs.selectedOrg = selectedOrg[0];
    },
  },

  extraReducers: function (builder) {
    builder
      .addCase(fetchOrgs.pending, (state) => {
        state.orgs.status = "pending";
      })
      .addCase(fetchOrgs.fulfilled, (state, action) => {
        state.orgs.status = "succeeded";
        state.orgs.organisations = action.payload;
        state.orgs.selectedOrg = action.payload[0] ? action.payload[0] : {};
      })
      .addCase(fetchBots.pending, (state, action) => {
        state.bots.status = "pending";
      })

      .addCase(fetchBots.fulfilled, (state, action) => {
        state.bots.status = "succeeded";
        state.bots.bots = action.payload;
        state.bots.selectedBot = action.payload[0] ? action.payload[0] : {};
      });
  },
});

export const botsAndSelectedBot = (state) => {
  console.log(state.organisation);
  return {
    bots: state.organisation.bots.bots,
    selectedBot: state.organisation.bots.selectedBot,
    botStatus: state.organisation.bots.status,
  };
};
export const orgsAndSelectedOrg = (state) => {
  console.log(state.organisation);
  return {
    orgs: state.organisation.orgs.organisations,
    selectedOrg: state.organisation.orgs.selectedOrg,
    orgStatus: state.organisation.orgs.status,
  };
};
export const { setSelectedBot, setSelectedOrg } = organisationSlice.actions;
export default organisationSlice.reducer;
