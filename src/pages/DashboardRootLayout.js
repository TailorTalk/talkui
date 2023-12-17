import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import FirebaseLogin from "./FirebaseLogin";
import { Link, Navigate, Outlet, NavLink } from "react-router-dom";
import { IconButton } from "@mui/material";

import { HomeRounded, SpaceDashboardRounded } from "@mui/icons-material";
import AppBarComponent from "../components/AppBar/AppBarComponent";
import Logo from "../assets/logo.svg";

const DashboardRootLayout = () => {
  const { isLoggedIn } = useAuth();
  const [sidePanelWidth, setSidePanelWidth] = useState("80px");
  return (
    <section
      className=" relative grid grid-cols-2 overflow-x-hidden transition-all duration-[0.3s]"
      style={{
        display: "grid",
        gridTemplateColumns: `${sidePanelWidth} 1fr`,
      }}
    >
      <div
        className=" py-2 max-sm:py-12 z-10 bg-[#e5e5e5] px-2 border-r-[1px] top-0 overflow-y-scroll scrollbar-hidden sticky h-screen "
        onMouseEnter={() => {
          setSidePanelWidth("240px");
        }}
        onMouseLeave={() => {
          setSidePanelWidth("80px");
        }}
      >
        <div className="flex items-center text-gray-800 px-2 overflow-x-hidden ">
          <img
            src={Logo}
            alt=""
            className="relative mt-1 mr-1 max-sm:h-10 flex-shrink-0 max-w-none"
            style={{ width: "56px" }}
          />
          <span
            class={`text-xl font-semibold font-comfortaa max-sm:text-lg w-[140px] whitespace-nowrap ${
              sidePanelWidth === "80px" ? "hidden" : ""
            }`}
          >
            Tailor Talk
          </span>
        </div>
        <ul className="flex flex-col gap-6 justify-center items-center max-sm:gap-4 py-16  ">
          <li className="w-full">
            <NavLink
              to="/assets"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              end
            >
              <div
                className={`py-2 px-4 flex items-center gap-4 w-full overflow-x-hidden hover:bg-[#fff] rounded-xl `}
              >
                <HomeRounded
                  fontSize="large"
                  sx={{
                    color: "inherit",

                    fontSize: "32px",

                    "@media (max-width: 640px)": {
                      fontSize: "24px",
                    },
                  }}
                />
                <span
                  className={`text-xl font-semibold text-black ${
                    sidePanelWidth === "80px" ? "hidden" : ""
                  }`}
                >
                  Home
                </span>
              </div>
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              end
            >
              <div
                className={`py-2 px-4 flex items-center gap-4 w-full overflow-x-hidden hover:bg-[#fff] rounded-xl `}
              >
                <SpaceDashboardRounded
                  fontSize="large"
                  sx={{
                    color: "inherit",

                    fontSize: "32px",

                    "@media (max-width: 640px)": {
                      fontSize: "24px",
                    },
                  }}
                />
                <span
                  className={`text-xl font-semibold text-black ${
                    sidePanelWidth === "80px" ? "hidden" : ""
                  }`}
                >
                  Dashboard
                </span>
              </div>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="overflow-y-scroll">
        <AppBarComponent />
        {isLoggedIn ? <Outlet /> : <Navigate to="/login" />}
      </div>
    </section>
  );
};

export default DashboardRootLayout;
