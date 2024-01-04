import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import assetsService from "../services/assets.service";
import orgsService from "../services/orgs.service";

const initialState = {
  orgs: {
    organisations: [],
    organisationId: "",
    status: "idle",
  },
  bots: {
    bots: [],
    botId: "",
    botChatId: "",
    status: "idle",
  },
  error: {
    hasError: false,
    error: "",
  },
};

export const fetchOrgs = createAsyncThunk(
  "orgs/fetchOrgs",
  async ({ email, userName }) => {
    try {

      console.log(userName, email);
      const response = await orgsService.listOrgs({
        email,
        userName,
      });

      const orgsArray = response.data.result.orgs.map((org) => org.name);

      return orgsArray;
    } catch (err) {
      console.log(err);
      return Promise.reject("Not able to fetch");
    }
  }
);

export const fetchBots = createAsyncThunk(
  "fetchBots",
  async (orgId, email, name) => {
    try {

      const response = await assetsService.listBots({ email, name}, orgId);
      const botsArray = response?.data?.result?.bots?.map((bot) => ({
        botName: bot?.bot_name,
        botChatId: bot?.org_chat_bot_id,
      }));
console.log(botsArray);
      return botsArray;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
);

const organisationSlice = createSlice({
  name: "organisation",
  initialState,

  reducers: {
    setBotId: function (state, action) {
      state.bots.botId = action.payload;
      const botIndex = state.bots.bots.findIndex(
        (bot) => bot.botName === action.payload
      );
      state.bots.botChatId = state.bots.bots[botIndex].botChatId;
    },
    setOrgId: function (state, action) {
      state.orgs.organisationId = action.payload;
    },
  },

  extraReducers: function (builder) {
    builder
      .addCase(fetchOrgs.pending, (state, action) => {
        state.orgs.status = "loading";
      })
      .addCase(fetchOrgs.fulfilled, (state, action) => {
        state.orgs.status = "succeeded";
        state.orgs.organisations = action.payload;
        state.orgs.organisationId = action.payload[0];
      })
      .addCase(fetchBots.pending, (state, action) => {
        state.bots.status = "loading";
      })

      .addCase(fetchBots.fulfilled, (state, action) => {
        state.bots.status = "succeeded";
        state.bots.bots = action.payload;
        state.bots.botId = action.payload[0]?.botName?action.payload[0]?.botName:"";
        state.bots.botChatId = action.payload[0]?.botChatId;
      });
  },
});

export const { setBotId, setOrgId } = organisationSlice.actions;
export default organisationSlice.reducer;