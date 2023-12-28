import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/assets");
    }
  }, [isLoggedIn]);
  return <main>{<Outlet />}</main>;
};

export default Layout;
