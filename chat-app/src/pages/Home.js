// src/pages/Home.js

import React from 'react';
import { useAuth } from '../contexts/AuthContext'

function Home() {
  const { userInfo, logout } = useAuth()
  console.log(userInfo)
  return (
    <div>
      { userInfo && 
         <div>
            <h1>Welcome {userInfo.given_name}</h1>
            <button onClick={logout} >Sign out</button>
         </div>
      }
    </div>
  );
}

export default Home;
