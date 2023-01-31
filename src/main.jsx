import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router";
import UserProvider from "./context/UserProvider";
import "./index.css";
import { router } from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
    <CssBaseline />
  </React.StrictMode>
);
