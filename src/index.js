import React from "react";
import ReactDOM from "react-dom";
import App from "./App"; // Importing your main App component
import { AuthProvider } from "./contexts/AuthContext";
import { NotifyProvider } from "./contexts/NotifyContext";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";

// Render the App component into the 'root' div in index.html
ReactDOM.render(
  <React.StrictMode>
    <NotifyProvider>
      <AuthProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthProvider>
    </NotifyProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
