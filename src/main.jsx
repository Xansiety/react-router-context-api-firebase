import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import UserProvider from "./context/UserProvider";
import "./index.css";
import { router } from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
