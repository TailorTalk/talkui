import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {  Navigate, Outlet, NavLink } from "react-router-dom";
import { HomeRounded, SpaceDashboardRounded } from "@mui/icons-material";
import AppBarComponent from "../components/AppBar/AppBarComponent";
import Logo from "../assets/logo.svg";
// import { SidePanel } from "../components/Sidepanel/SidePanel";


const DashboardRootLayout = () => {
  const { isLoggedIn } = useAuth();
  const [openSidePanel, setOpenSidePanel] = useState(false);
  return (
    <section
      className=" relative grid grid-cols-2 overflow-x-hidden transition-all duration-[0.3s] h-screen"
      style={{
        display: "grid",
        gridTemplateColumns: `auto 1fr`,
      }}
    >
      {/* <SidePanel /> */}
      <div
        className={`p-4 bg-tailorLigthGrey border-r-[1px] overflow-y-scroll scrollbar-hidden h-full transition-all duration-500 ${
          openSidePanel ? "w-[240px]" : "w-[102px]"
        }`}
        onClick={(event) => {
          setOpenSidePanel((prev) => !prev);
        }}

      >
        <div
          className={` flex gap-2 items-center w-full overflow-x-hidden   `}
        >
         <img
            src={Logo}
            alt=""
            className="relative mt-1 mr-1 max-sm:h-10 flex-shrink-0 max-w-none ml-4"
            style={{ width: "50px" }}
          />
          
            <span className={`text-xl font-semibold text-black font-[Comfortaa] mr-4 transition-all duration-[0.5s] whitespace-nowrap ${openSidePanel?'opacity-1':"opacity-0"} `}>Tailor Talk</span>
        
        </div>
        {/* <div className="flex items-center text-gray-800 px-2 overflow-x-hidden ">
          <img
            src={Logo}
            alt=""
            className="relative mt-1 mr-1 max-sm:h-10 flex-shrink-0 max-w-none"
            style={{ width: "56px" }}
          />
        </div> */}
        <ul className="flex flex-col gap-6 justify-center items-center max-sm:gap-4 py-16  ">
          <li className="w-full" onClick={(e)=>{e.stopPropagation()}}>
            <NavLink
              to="/assets"
              className={({ isActive }) => (isActive ? "active" : 'text-[#717171]')}
              end
            >
              <div
                className={`py-2 px-4 flex gap-2 items-center w-full overflow-x-hidden  `}
              >
                <HomeRounded fontSize="large" />
              
                  <span className={`text-xl font-semibold  transition-all duration-[0.5s]  ${openSidePanel?'opacity-1':"opacity-0"}  `}>
                    Home
                  </span>
                
              </div>
            </NavLink>
          </li>
          <li className="w-full" onClick={(e)=>{e.stopPropagation()}}>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active" : 'text-[#717171]')}
              end
            >
              <div
                className={`py-2 px-4 flex gap-2 items-center w-full overflow-x-hidden `}
              >
                <SpaceDashboardRounded fontSize="large" />
                
                  <span className={`text-xl font-semibold  transition-all duration-[0.5s]  ${openSidePanel?'opacity-1':"opacity-0"} `}>
                    Dashboard
                  </span>

              </div>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="flex flex-col h-screen">
        <AppBarComponent />
        {isLoggedIn ? <Outlet /> : <Navigate to="/login" />}
      </div>
    </section>
  );
};

export default DashboardRootLayout;
