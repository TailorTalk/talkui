import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { orgData } from "../utils/data";
import axios from "axios";

const ORGS_URL =
  "https://tailortalk-preview.up.railway.app/maestro_chat/org/v1/list_orgs";
const BOTS_URL =
  "https://tailortalk-preview.up.railway.app/maestro_chat/asset/v1/list_bots";

const initialState = {
  orgs: {
    organisations: [],
    organisationId: "",
    status: "idle",
  },
  bots: {
    bots: [],
    botId: "",
    botChatId:"",
    status: "idle",
  },
};

export const fetchOrgs = createAsyncThunk("fetchOrgs", async (email,name) => {
  try {
    const response = await axios.get(ORGS_URL, {
      headers: {
        "X-User-Email": email,
        "X-User-Name": name,
      },
    });

    const orgsArray = response.data.result.orgs.map((org) => org.name);

    return orgsArray;
  } catch (err) {
    return err.message;
  }
});

export const fetchBots = createAsyncThunk("fetchBots", async (orgId,email,name) => {
  try {
    const response = await axios.get(BOTS_URL, {
      headers: {
        "X-User-Email": email,
        "X-User-Name": name,
        "X-Org-Id": `${orgId}`,
      },
    });

    const botsArray = response.data.result.bots.map((bot) => ({
      botName: bot?.bot_name,
      botChatId: bot?.org_chat_bot_id,
    }));
    // console.log(botsArray);

    return botsArray;
  } catch (err) {
    return err.message;
  }
});

const organisationSlice = createSlice({
  name: "organisation",
  initialState,

  reducers: {
    setBotId: function (state, action) {
      state.bots.botId = action.payload;
      const botIndex = state.bots.bots.findIndex(bot=>bot.botName === action.payload);
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
        state.bots.botId = action.payload[0]?.botName;
        state.bots.botChatId = action.payload[0]?.botChatId;
      });
  },
});

export const { setBotId, setOrgId } = organisationSlice.actions;
export default organisationSlice.reducer;
