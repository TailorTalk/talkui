import React from "react";
import { useAuth } from "../contexts/AuthContext";
import FirebaseLogin from "./FirebaseLogin";
import { Link, Navigate, Outlet } from "react-router-dom";
import { IconButton } from "@mui/material";
import {
  Chat,
  DataUsage,
  GridView,
  Groups,
  HomeMaxRounded,
  HomeRounded,
  HomeTwoTone,
  Language,
  LocalShipping,
  MonitorHeart,
  Settings,
  SmartToy,
  SmartToyOutlined,
  SpaceDashboardRounded,
  SpaceDashboardTwoTone,
} from "@mui/icons-material";

const DashboardRootLayout = () => {
  const { isLoggedIn } = useAuth();
  return (
    <section className="dashboard-layout">
      <div className=" p-8 border-r-2 sticky top-16 overflow-y-scroll scrollbar-hidden h-screen   ">
        <ul className="flex flex-col gap-8 justify-center items-center max-sm:gap-6 py-16 ">
          <li>
            <Link
              to="/assets"
            >
              <IconButton>
                <HomeRounded
                  fontSize="large"
                  className="activeIcon"
                  sx={{
                    color:"#4764FC",
                    "@media (max-width: 640px)": {
                      fontSize: "24px",
                    },
                  }}
                />
              </IconButton>
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
              <IconButton>
                <SpaceDashboardRounded
                  fontSize="large"
                  sx={{
                    "@media (max-width: 640px)": {
                      fontSize: "24px",
                    },
                  }}
                />
              </IconButton>
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-20">
        {isLoggedIn ? <Outlet /> : <Navigate to="/login" />}
      </div>
    </section>
  );
};

export default DashboardRootLayout;
