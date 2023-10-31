import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import UserAuthProvider from "./context/userAuth.jsx";
import UserDataProvider from "./context/userData.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserAuthProvider>
      <UserDataProvider>
        <App />
        <ToastContainer />
      </UserDataProvider>
    </UserAuthProvider>
  </React.StrictMode>
);
