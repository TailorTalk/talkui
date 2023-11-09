import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Importing your main App component
import { AuthProvider } from './contexts/AuthContext';
import { NotifyProvider } from './contexts/NotifyContext';

// Render the App component into the 'root' div in index.html
ReactDOM.render(
  <React.StrictMode>
    <NotifyProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </NotifyProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
