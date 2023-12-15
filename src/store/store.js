import { configureStore } from "@reduxjs/toolkit";
import organisationReducer from "./OrganisationSlice";

const store = configureStore({
  reducer: {
    organisation: organisationReducer,
  },
});

export default store;
