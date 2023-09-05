import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { RouterProvider } from "react-router-dom";
import { useRouter } from "./hooks/useRouter.tsx";

const { router } = useRouter();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <App />
  </React.StrictMode>
);
