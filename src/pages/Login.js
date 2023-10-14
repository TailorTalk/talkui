// src/components/Login/index.js

import React from 'react';
import { useEffect } from 'react';
import jwt_decode from "jwt-decode"
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
   const { login, userInfo } = useAuth();

   const handleCallbackResponse = (response) => {
      console.log("Encoded JWT ID token: ", response.credential);
      var userObject = jwt_decode(response.credential);
      login(userObject);
   }

   useEffect(() => {
      /* global google */
      google.accounts.id.initialize({
         client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
         callback: handleCallbackResponse
      });

      google.accounts.id.renderButton(
         document.getElementById("signInDiv"),
         { theme: "outline", size: "large" }
      )

      google.accounts.id.prompt()
   }, [])


   return (
      <div>
         <h1>Login</h1>
         <div id="signInDiv"></div>
         { userInfo && 
         <div>
            <img src={userInfo.picture} referrerPolicy="no-referrer"></img>
            <h3>{userInfo.name}</h3>
         </div>
         }
      </div>
   );
};

export default Login;
