import React from "react";
import ReactDOM from "react-dom/client";
import { DataBrowserRouter, Route } from "react-router-dom";
import ErrorPage from "./error-page";
import "./index.css";
import Contact from "./routes/contact";
import Root from "./routes/root";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DataBrowserRouter>
      <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
        <Route
          path="contacts/:contactId"
          element={<Contact />}
          errorElement={<ErrorPage />}
        />
      </Route>
    </DataBrowserRouter>
  </React.StrictMode>
);
