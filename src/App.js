import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';
import Assets from './pages/Assets'; 
import FirebaseLogin from './pages/FirebaseLogin';
import { useAuth } from './contexts/AuthContext'
import { QueryStringProvider } from './contexts/QueryStringContext';
import AppBarComponent from './components/AppBar/AppBarComponent';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const { isLoggedIn } = useAuth();
  console.log("akash", "is logged in", isLoggedIn)

  return (
    <Router>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <QueryStringProvider>
      <div className="App">
        <AppBarComponent/>
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/assets" /> : <FirebaseLogin />} />
          <Route path="/" element={!isLoggedIn ? <Navigate to="/login" /> : <Navigate to="/assets" />} />
          <Route path="/chats" element={!isLoggedIn ? <Navigate to="/login" /> : <Chat />} />
          <Route path="/assets" element={!isLoggedIn ? <Navigate to="/login" /> : <Assets />} />
        </Routes>
      </div>
    </QueryStringProvider>
    </GoogleOAuthProvider>;
    </Router>
  );
}

export default App;
