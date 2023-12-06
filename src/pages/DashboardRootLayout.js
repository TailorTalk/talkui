import React from "react";
import { useAuth } from "../contexts/AuthContext";
import FirebaseLogin from "./FirebaseLogin";
import { Link, Navigate, Outlet, NavLink } from "react-router-dom";
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
      <div className=" py-8 px-2 border-r-[1px] sticky top-0 overflow-y-scroll scrollbar-hidden h-screen ">
        <ul className="flex flex-col gap-8 justify-center items-center max-sm:gap-6 py-16  ">
          <li>
          
              <NavLink
                to="/assets"
                className={({ isActive }) => (isActive ? "active" : undefined)}
                end
              >
                <HomeRounded
                  fontSize="large"
                  sx={{
                    color: "inherit",
                    "@media (max-width: 1280px)": {
                      fontSize: "28px",
                    },
                    "@media (max-width: 640px)": {
                      fontSize: "24px",
                    },
                  }}
                />
              </NavLink>
           
          </li>
          <li>
          
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? "active" : undefined)}
                end
              >
                <SpaceDashboardRounded
                  fontSize="large"
                  sx={{
                    "@media (max-width: 1280px)": {
                      fontSize: "28px",
                    },
                    "@media (max-width: 640px)": {
                      fontSize: "24px",
                    },
                  }}
                />
              </NavLink>
        
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
