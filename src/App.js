import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';
import SignIn from './pages/SignIn';
import { useAuth } from './contexts/AuthContext'
import AppBarComponent from './components/AppBar/AppBarComponent';
import UploadFiles from './pages/Files'

function App() {
  const { isLoggedIn } = useAuth();
  console.log("akash", "is logged in", isLoggedIn)

  return (
    <Router>
      <div className="App">
        <AppBarComponent/>
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/chats" /> : <SignIn />} />
          <Route path="/" element={!isLoggedIn ? <Navigate to="/login" /> : <Navigate to="/files" />} />
          <Route path="/files" element={!isLoggedIn ? <Navigate to="/login" /> : <UploadFiles />} />
          <Route path="/chats" element={!isLoggedIn ? <Navigate to="/login" /> : <Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;