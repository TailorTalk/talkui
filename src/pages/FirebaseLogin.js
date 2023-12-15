import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Box} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Illustration from "../assets/illustration.svg";
import Illustration2 from "../assets/illustration2.svg";
import googleIcon from "../assets/google.png";

// // Configure FirebaseUI.
// const uiConfig = {
//   signInFlow: "popup",
//   signInSuccessUrl: "/assets",
//   signInOptions: [GoogleAuthProvider.PROVIDER_ID],
//   callbacks: {
//     signInSuccessWithAuthResult: () => false,
//   },
// };

function FirebaseLogin() {
  const { isLoggedIn, googleSignIn } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn) {
      navigate("/assets");
    }
  }, [isLoggedIn]);

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative mt-20 px-8 ">
      <Box className=" flex items-center gap-48 max-sm:gap-24 pt-14 max-lg:flex-col-reverse justify-center">
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
          {/* <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={auth}
            className=" w-full py-4  rounded-lg "
          /> */}

        
            <button
              className="flex gap-4 items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none"
              onClick={handleGoogleSignIn}
            >
              <img src={googleIcon} alt="google icon" width={20} height={20} />
              <span className="text-base font-roboto font-medium">
                Continue with Google
              </span>
            </button>
        
        </div>
      </Box>
    </div>
  );
}

export default FirebaseLogin;
