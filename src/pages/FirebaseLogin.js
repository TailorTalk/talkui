import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useAuth } from "../contexts/AuthContext";
import { Container, Typography, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Illustration from "../assets/illustration.svg";
import Illustration2 from "../assets/illustration2.svg";

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/assets",
  signInOptions: [GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

function FirebaseLogin() {
  const { auth, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn) {
      navigate("/assets");
    }
  }, [isLoggedIn]);

  return (
    <div className="relative mt-20 px-8 ">
      <Box className=" flex items-center gap-48 max-sm:gap-24 pt-14 max-md:flex-col-reverse justify-center">
        <div className="flex justify-start items-center">
          <img
            src={Illustration2}
            alt=""
            className="relative w-[600px] max-xl:w-[500px] max-lg:w-[400px]"
          />
        </div>

        <div className=" bg-tailorBlue-500 w-96 rounded-lg py-24 px-4 flex flex-col justify-between items-center gap-8 max-xl:w-80 max-sm:w-72  ">
          <h2 className="text-5xl font-comfortaa font-bold text-white max-sm:text-4xl">
            {" "}
            Sign In
          </h2>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={auth}
            className=" w-full py-4  rounded-lg "
          />
        </div>
      </Box>
    </div>
  );
}

export default FirebaseLogin;
