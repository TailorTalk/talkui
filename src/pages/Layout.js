import React, { useEffect } from "react";
import AppBarComponent from "../components/AppBar/AppBarComponent";
import { IconButton } from "@mui/material";
import {
  Chat,
  DataUsage,
  GridView,
  Groups,
  Language,
  LocalShipping,
  MonitorHeart,
  Settings,
  SmartToy,
  SmartToyOutlined,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";

import { Navigate, Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const { auth, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn) {
      navigate("/assets");
    }
  }, [isLoggedIn]);
  return (
    <main>
      <AppBarComponent />
      <section>
        {<Outlet />}

        {/* <div className=" p-8 border-r-2 sticky top-16 overflow-y-scroll scrollbar-hidden h-screen   ">
          <ul className="flex flex-col gap-8 justify-center items-center max-sm:gap-6 mt-16 ">
            <li>
              <IconButton>
                <SmartToy
                  fontSize="large"
                  color="primary"
                  sx={{
                    "@media (max-width: 640px)": {
                      fontSize: "24px",
                    },
                  }}
                />
              </IconButton>
            </li>
            <li>
              <IconButton>
                <Groups
                  fontSize="large"
                  sx={{
                    "@media (max-width: 640px)": {
                      fontSize: "24px",
                    },
                  }}
                />
              </IconButton>
            </li>
            <li>
              <IconButton>
                <DataUsage
                  fontSize="large"
                  sx={{
                    "@media (max-width: 640px)": {
                      fontSize: "24px",
                    },
                  }}
                />
              </IconButton>
            </li>
            <li>
              <IconButton>
                <LocalShipping
                  fontSize="large"
                  sx={{
                    "@media (max-width: 640px)": {
                      fontSize: "24px",
                    },
                  }}
                />
              </IconButton>
            </li>
            <li>
              <IconButton>
                <MonitorHeart
                  fontSize="large"
                  sx={{
                    "@media (max-width: 640px)": {
                      fontSize: "24px",
                    },
                  }}
                />
              </IconButton>
            </li>
            <li>
              <IconButton>
                <Language
                  fontSize="large"
                  sx={{
                    "@media (max-width: 640px)": {
                      fontSize: "24px",
                    },
                  }}
                />
              </IconButton>
            </li>
            <li>
              <IconButton>
                <Chat
                  fontSize="large"
                  sx={{
                    "@media (max-width: 640px)": {
                      fontSize: "24px",
                    },
                  }}
                />
              </IconButton>
            </li>
            <li>
              <IconButton>
                <Settings
                  fontSize="large"
                  sx={{
                    "@media (max-width: 640px)": {
                      fontSize: "24px",
                    },
                  }}
                />
              </IconButton>
            </li>
          </ul>
        </div> */}
      </section>
    </main>
  );
};

export default Layout;
