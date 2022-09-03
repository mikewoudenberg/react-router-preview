import React from "react";
import ReactDOM from "react-dom/client";
import { DataBrowserRouter, Route } from "react-router-dom";
import ErrorPage from "./error-page";
import "./index.css";
import Contact, { loader as contactLoader } from "./routes/contact";
import Root, {
  action as rootAction,
  loader as rootLoader,
} from "./routes/root";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DataBrowserRouter>
      <Route
        path="/"
        element={<Root />}
        errorElement={<ErrorPage />}
        loader={rootLoader}
        action={rootAction}
      >
        <Route
          path="contacts/:contactId"
          element={<Contact />}
          errorElement={<ErrorPage />}
          loader={contactLoader}
        />
      </Route>
    </DataBrowserRouter>
  </React.StrictMode>
);
