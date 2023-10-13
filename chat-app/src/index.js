import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Importing your main App component
import { AuthProvider } from './contexts/AuthContext';  

// Render the App component into the 'root' div in index.html
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
