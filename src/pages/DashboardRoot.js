import React from "react";
import Dashboard from "./Dashboard";
import DashboardTableContextProvider from "../contexts/DashboardTableContext";

const DashboardRoot = () => {
  return (
    <DashboardTableContextProvider>
      <Dashboard />
    </DashboardTableContextProvider>
  );
};

export default DashboardRoot;
