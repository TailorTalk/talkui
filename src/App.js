import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';
import Assets from './pages/Assets'; 
import SignIn from './pages/SignIn';
import { useAuth } from './contexts/AuthContext'
import { QueryStringProvider } from './contexts/QueryStringContext';
import AppBarComponent from './components/AppBar/AppBarComponent';
import UploadFiles from './pages/Files'

function App() {
  const { isLoggedIn } = useAuth();
  console.log("akash", "is logged in", isLoggedIn)

  return (
    <Router>
    <QueryStringProvider>
      <div className="App">
        <AppBarComponent/>
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/chats" /> : <SignIn />} />
          <Route path="/" element={!isLoggedIn ? <Navigate to="/login" /> : <Navigate to="/assets" />} />
          <Route path="/chats" element={!isLoggedIn ? <Navigate to="/login" /> : <Chat />} />
          <Route path="/assets" element={!isLoggedIn ? <Navigate to="/login" /> : <Assets />} />
        </Routes>
      </div>
    </QueryStringProvider>
    </Router>
  );
}

export default App;
