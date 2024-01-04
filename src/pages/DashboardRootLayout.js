import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import AppBarComponent from "../components/AppBar/AppBarComponent";
import SidePanel from "../components/SidePanel/SidePanel";
import ErrorBoundary from "../utils/ErrorBoundary";
import { useSnackbar } from "notistack";

// import { SidePanel } from "../components/Sidepanel/SidePanel";

const DashboardRootLayout = () => {
  const { isLoggedIn } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isLoggedIn) {
      // console.log(userInfo.name);
      enqueueSnackbar("Logged in successfully", {
        variant: "success",
      });
    } else {
      enqueueSnackbar("Login resulted in error. Try logging in again", {
        variant: "error",
      });
    }
  }, []);

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

        <Outlet />
      </div>
    </section>
  );
};

export default DashboardRootLayout;
