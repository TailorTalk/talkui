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
      <section>
        {<Outlet />}
      </section>
    </main>
  );
};

export default Layout;
