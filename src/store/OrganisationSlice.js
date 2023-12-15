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
    status: "idle",
  },
};

export const fetchOrgs = createAsyncThunk("fetchOrgs", async () => {
  try {
    const response = await axios.get(ORGS_URL, {
      headers: {
        "X-User-Email": "lokesh1129ece@gmail.com",
        "X-User-Name": "Lokesh Singh",
      },
    });

    const orgsArray = response.data.result.orgs.map((org) => org.name);

    return orgsArray;
  } catch (err) {
    return err.message;
  }
});

export const fetchBots = createAsyncThunk("fetchBots", async (orgId) => {
  try {
    const response = await axios.get(BOTS_URL, {
      headers: {
        "X-User-Email": "lokesh1129ece@gmail.com",
        "X-User-Name": "Lokesh Singh",
        "X-Org-Id": `${orgId}`,
      },
    });
    const botsArray = response.data.result.bots.map((bot) => bot?.bot_name);

    return botsArray;
  } catch (err) {
    return err.message;
  }
});

const organisationSlice = createSlice({
  name: "organisation",
  initialState,

  reducers: {
    // setOrganisationsDetails: function (state, action) {
    //   // state.organisationDetails = action.payload;
    //   // const orgs = action.payload.map((org) => org.organisationId);
    //   // state.organisations = orgs;
    //   // state.organisationId = orgs[0];
    //   // state.bots = action.payload[0].bots;
    //   // state.botId = action.payload[0].bots[0];
    //   state.organisations = action.payload;
    //   state.organisationId = action.payload[0];
    // },
    // setBots: function (state, action) {
    //   state.bots = action.payload;
    //   state.botId = action.payload[0];
    // },
    setBotId: function (state, action) {
      state.bots.botId = action.payload;
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
        state.bots.botId = action.payload[0];
      });
  },
});

export const { setBotId,setOrgId } = organisationSlice.actions;
export default organisationSlice.reducer;
