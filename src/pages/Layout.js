import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const Layout = () => {
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

 

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else if (pathname === "/") {
      navigate("/home");
    }
  }, [isLoggedIn]);

  return <main>{<Outlet />}</main>;
};

export default Layout;
