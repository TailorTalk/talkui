import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';
import Assets from './pages/Assets';
import FirebaseLogin from './pages/FirebaseLogin';
import { GlobalsProvider } from './contexts/GlobalsContext';
import { useAuth } from './contexts/AuthContext'
import { QueryStringProvider } from './contexts/QueryStringContext';
import AppBarComponent from './components/AppBar/AppBarComponent';

function App() {
  const { isLoggedIn } = useAuth();
  console.log("akash", "is logged in", isLoggedIn)

  return (
    <Router>
      <GlobalsProvider>
        <QueryStringProvider>
          <div className="App">
            <AppBarComponent />
            <Routes>
              <Route path="/login" element={isLoggedIn ? <Navigate to="/assets" /> : <FirebaseLogin />} />
              <Route path="/" element={!isLoggedIn ? <Navigate to="/login" /> : <Navigate to="/assets" />} />
              <Route path="/chats" element={!isLoggedIn ? <Navigate to="/login" /> : <Chat />} />
              <Route path="/assets" element={!isLoggedIn ? <Navigate to="/login" /> : <Assets />} />
            </Routes>
          </div>
        </QueryStringProvider>
        </GlobalsProvider>
    </Router>
  );
}

export default App;
