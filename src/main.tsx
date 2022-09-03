import React from "react";
import ReactDOM from "react-dom/client";
import { DataBrowserRouter, Route } from "react-router-dom";
import ErrorPage from "./error-page";
import "./index.css";
import Root from "./routes/root";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DataBrowserRouter>
      <Route path="/" element={<Root />} errorElement={<ErrorPage />} />
    </DataBrowserRouter>
  </React.StrictMode>
);
