import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import AppBarComponent from "../components/AppBar/AppBarComponent";
import SidePanel from "../components/SidePanel/SidePanel";
import ErrorBoundary from "../utils/ErrorBoundary";

// import { SidePanel } from "../components/Sidepanel/SidePanel";

const DashboardRootLayout = () => {
  const { isLoggedIn } = useAuth();

  return (
    <section
      className=" relative grid grid-cols-2 overflow-x-hidden transition-all duration-[0.3s] h-screen"
      style={{
        display: "grid",
        gridTemplateColumns: `auto 1fr`,
      }}
    >
      <SidePanel />

      <div className="flex flex-col h-screen">
        <AppBarComponent />

        {isLoggedIn ? <Outlet /> : <Navigate to="/login" />}
      </div>
    </section>
  );
};

export default DashboardRootLayout;
